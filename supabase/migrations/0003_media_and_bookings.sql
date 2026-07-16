-- Media, bookers, bookings, messaging, shortlists, saved searches.

create type media_kind as enum (
  'headshot', 'portfolio', 'reel', 'resume', 'comp_card', 'audio', 'other'
);

create type booker_kind as enum ('brand', 'producer', 'casting', 'agency', 'other');

-- Booking lifecycle. Commission is captured from 'confirmed' onward.
create type booking_status as enum (
  'inquiry',      -- booker reached out, talent has not responded
  'shortlisted',  -- booker saved to a shortlist, no offer yet
  'offered',      -- terms proposed
  'accepted',     -- talent accepted, not yet locked
  'declined',
  'confirmed',    -- locked. commission is owed from here.
  'completed',    -- work delivered
  'paid',         -- talent paid out, commission collected
  'cancelled'
);

create type commission_status as enum ('pending', 'invoiced', 'collected', 'waived', 'refunded');

-- ---------------------------------------------------------------------------
-- Media
-- ---------------------------------------------------------------------------

create table talent_media (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references talent_profiles(id) on delete cascade,
  kind media_kind not null,

  -- Supabase Storage object path. Never a raw public URL: media is served through
  -- signed URLs so an unsigned profile's headshots are not publicly enumerable.
  storage_path text not null,
  external_url text,

  caption text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,

  width integer,
  height integer,
  bytes bigint,
  content_type text,

  created_at timestamptz not null default now()
);

create unique index talent_media_one_primary
  on talent_media (profile_id, kind)
  where is_primary;

alter table talent_actor_details
  add constraint talent_actor_resume_fk
  foreign key (resume_media_id) references talent_media(id) on delete set null;

-- ---------------------------------------------------------------------------
-- Bookers
-- ---------------------------------------------------------------------------

create table booker_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind booker_kind not null default 'brand',
  company_name text,
  contact_name text,
  email text,
  phone text,
  website text,
  verified verification_status not null default 'unverified',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

-- ---------------------------------------------------------------------------
-- Bookings. This is where the commission is captured.
-- ---------------------------------------------------------------------------

create table bookings (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references talent_profiles(id) on delete restrict,
  booker_id uuid not null references booker_profiles(id) on delete restrict,

  project_name text,
  project_brief text,
  deliverables text,
  usage_terms text,
  location text,
  starts_on date,
  ends_on date,
  constraint booking_dates_valid check (
    starts_on is null or ends_on is null or starts_on <= ends_on
  ),

  amount_cents bigint check (amount_cents >= 0),
  currency text not null default 'USD',

  -- Snapshot of the talent's rate at the moment the booking was created. Copied,
  -- never joined: moving a talent from marketplace (10%) to core (20%) must not
  -- retroactively change what was owed on bookings already struck at 10%.
  commission_rate_pct numeric(5,2) not null
    check (commission_rate_pct >= 0 and commission_rate_pct <= 100),

  -- Explicit ::bigint casts: round() yields numeric, and a stored generated column
  -- will not silently narrow numeric to bigint for you.
  commission_amount_cents bigint
    generated always as (round(amount_cents * commission_rate_pct / 100.0)::bigint) stored,
  talent_payout_cents bigint
    generated always as ((amount_cents - round(amount_cents * commission_rate_pct / 100.0))::bigint) stored,

  commission_status commission_status not null default 'pending',
  commission_collected_at timestamptz,

  status booking_status not null default 'inquiry',
  confirmed_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  cancellation_reason text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column bookings.commission_rate_pct is
  'Snapshot of talent_profiles.commission_rate_pct at creation. Never backfill this.';
comment on column bookings.commission_amount_cents is
  'Generated. This is the 10% (or tier rate) BookTalent earns on the booking.';

-- Stamp the rate from the profile at insert. Explicit rate wins so an admin can
-- negotiate a one-off without re-tiering the talent.
create or replace function stamp_commission_rate()
returns trigger language plpgsql as $$
begin
  if new.commission_rate_pct is null then
    select commission_rate_pct into new.commission_rate_pct
      from talent_profiles where id = new.profile_id;
  end if;
  return new;
end;
$$;

create trigger bookings_stamp_commission
  before insert on bookings
  for each row execute function stamp_commission_rate();

-- An amount is required before a booking can be confirmed, otherwise commission
-- silently computes against null and the platform earns nothing on real work.
-- OLD is unassigned in an INSERT trigger, so every reference to it must sit behind
-- a TG_OP guard rather than relying on OR short circuiting.
create or replace function require_amount_on_confirm()
returns trigger language plpgsql as $$
declare
  entering_confirmed boolean;
  entering_completed boolean;
begin
  if new.status in ('confirmed', 'completed', 'paid') and new.amount_cents is null then
    raise exception 'bookings.amount_cents is required before status %', new.status;
  end if;

  if tg_op = 'INSERT' then
    entering_confirmed := new.status = 'confirmed';
    entering_completed := new.status = 'completed';
  else
    entering_confirmed := new.status = 'confirmed' and old.status is distinct from 'confirmed';
    entering_completed := new.status = 'completed' and old.status is distinct from 'completed';
  end if;

  if entering_confirmed then
    new.confirmed_at := coalesce(new.confirmed_at, now());
  end if;
  if entering_completed then
    new.completed_at := coalesce(new.completed_at, now());
  end if;
  if new.status = 'cancelled' then
    new.cancelled_at := coalesce(new.cancelled_at, now());
  end if;

  return new;
end;
$$;

create trigger bookings_guard_confirm
  before insert or update on bookings
  for each row execute function require_amount_on_confirm();

create trigger bookings_updated_at before update on bookings
  for each row execute function set_updated_at();
create trigger booker_profiles_updated_at before update on booker_profiles
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Messaging. Scoped to a booking so all contact is on platform, which is what
-- makes the commission enforceable rather than a handshake.
-- ---------------------------------------------------------------------------

create table booking_messages (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid not null references bookings(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (length(trim(body)) > 0),
  attachment_path text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index booking_messages_thread on booking_messages (booking_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Shortlists + saved searches
-- ---------------------------------------------------------------------------

create table shortlists (
  id uuid primary key default uuid_generate_v4(),
  booker_id uuid not null references booker_profiles(id) on delete cascade,
  name text not null default 'Untitled shortlist',
  project_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table shortlist_items (
  shortlist_id uuid not null references shortlists(id) on delete cascade,
  profile_id uuid not null references talent_profiles(id) on delete cascade,
  note text,
  added_at timestamptz not null default now(),
  primary key (shortlist_id, profile_id)
);

create table saved_searches (
  id uuid primary key default uuid_generate_v4(),
  booker_id uuid not null references booker_profiles(id) on delete cascade,
  name text not null,
  -- Same shape the search RPC accepts, so a saved search replays exactly.
  filters jsonb not null default '{}'::jsonb,
  notify_on_new_matches boolean not null default false,
  last_run_at timestamptz,
  created_at timestamptz not null default now()
);

create trigger shortlists_updated_at before update on shortlists
  for each row execute function set_updated_at();
