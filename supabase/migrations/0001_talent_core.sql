-- BookTalent core talent schema.
--
-- Design notes:
--   * Talent can be more than one type, so type specific fields live in optional
--     1:1 detail tables rather than nullable columns on one wide row.
--   * Every multi select from the questionnaire is a text[] with a GIN index so it
--     is directly filterable. The "can portray / can play" fields are deliberately
--     separate from the "actually is" fields: a Filipino performer may authentically
--     portray Latino and Pacific Islander, and bookers search the portrayable set.
--   * Free text vocab (ethnicities, languages, skills) is kept as text[] rather than
--     enums. These lists change often and an enum migration per addition is a trap.
--     The canonical option lists live in lib/talent/vocab.ts and are validated there.

create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ---------------------------------------------------------------------------
-- Enums (only for genuinely closed sets)
-- ---------------------------------------------------------------------------

create type talent_type as enum (
  'actor', 'model', 'influencer', 'musician', 'reality',
  'athlete', 'comedian', 'chef', 'visual_artist', 'host', 'other'
);

create type fluency_level as enum ('native', 'fluent', 'conversational', 'basic');

create type union_status as enum (
  'sag_aftra', 'sag_eligible', 'aea', 'non_union', 'other'
);

create type availability_type as enum (
  'full_time', 'weekends', 'project_based', 'limited'
);

-- Representation tiers. 'marketplace' is the free default and the core market:
-- talent with no existing agent. Paid tiers are opt in management.
create type representation_tier as enum ('marketplace', 'rising', 'core', 'marquee');

create type profile_status as enum (
  'draft', 'submitted', 'verified', 'active', 'suspended', 'inactive'
);

create type verification_status as enum ('unverified', 'pending', 'verified', 'rejected');

-- ---------------------------------------------------------------------------
-- talent_profiles: the universal section (Step 2), answered by everyone
-- ---------------------------------------------------------------------------

create table talent_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text unique,

  -- Step 1: what kind of talent are you (multi select, drives conditional sections)
  talent_types talent_type[] not null default '{}',

  -- Identity
  legal_name text,
  stage_name text,

  -- Contact. Exposed to bookers only through an active booking; see RLS in 0003.
  email text,
  phone text,

  -- Location + mobility
  city text,
  region text,
  country text default 'US',
  willing_to_travel boolean default false,
  travel_radius_km integer,
  willing_to_relocate boolean default false,

  -- Age. date_of_birth is private and never exposed to bookers (RLS in 0003).
  -- presents_age_* is the range they read as on camera and IS searchable.
  date_of_birth date,
  presents_age_min integer check (presents_age_min between 0 and 120),
  presents_age_max integer check (presents_age_max between 0 and 120),
  constraint presents_age_range_valid check (
    presents_age_min is null or presents_age_max is null
    or presents_age_min <= presents_age_max
  ),

  -- Identity vs. portrayable. Both searchable; bookers filter on the portrayable set.
  gender_identity text,
  genders_portrayable text[] not null default '{}',
  ethnicity text[] not null default '{}',
  ethnicities_portrayable text[] not null default '{}',

  -- Languages. Names live in a plain text[] so "speaks Spanish" is a cheap array
  -- containment hit; fluency per language rides alongside as jsonb for display and
  -- for the stricter "fluent or native in Spanish" filter.
  languages text[] not null default '{}',
  language_fluency jsonb not null default '{}'::jsonb,
  accents text[] not null default '{}',

  -- Physical
  height_cm integer check (height_cm between 30 and 280),
  build text,

  -- Professional
  union_status union_status,

  -- The un repped signal. This is the core market: talent with no representation.
  has_representation boolean,
  representation_details text,

  -- Commercial
  booking_types text[] not null default '{}',
  rate_min_cents bigint check (rate_min_cents >= 0),
  rate_max_cents bigint check (rate_max_cents >= 0),
  rate_currency text default 'USD',
  rate_notes text,
  availability availability_type,

  -- What the talent will and will not put their name behind. Brand-safety signal.
  values text,

  socials jsonb not null default '{}'::jsonb,

  -- Representation + commission. commission_rate_pct is the CURRENT rate; it is
  -- snapshotted onto each booking at creation so retier-ing never rewrites history.
  representation_tier representation_tier not null default 'marketplace',
  commission_rate_pct numeric(5,2) not null default 10.00
    check (commission_rate_pct >= 0 and commission_rate_pct <= 100),
  monthly_fee_cents bigint not null default 0 check (monthly_fee_cents >= 0),

  -- Terms acceptance: agency of record + commission consent (Step 4)
  agreed_to_terms_at timestamptz,
  agreed_terms_version text,

  status profile_status not null default 'draft',

  -- Verification is manual to start (Step 4). These are the hooks.
  identity_verification verification_status not null default 'unverified',
  socials_verification verification_status not null default 'unverified',
  verified_at timestamptz,
  verified_by uuid references auth.users(id),
  verification_notes text,

  -- Save and resume: which steps are done, plus partial answers for steps in flight.
  completed_steps text[] not null default '{}',
  draft_data jsonb not null default '{}'::jsonb,
  last_step text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column talent_profiles.date_of_birth is
  'Private. Never exposed to bookers. Bookers filter on presents_age_min/max instead.';
comment on column talent_profiles.has_representation is
  'Identifies the un-repped majority, which is the core market for the free tier.';
comment on column talent_profiles.commission_rate_pct is
  'Current rate. Snapshotted onto bookings.commission_rate_pct at booking creation.';

-- Auto-touch updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger talent_profiles_updated_at
  before update on talent_profiles
  for each row execute function set_updated_at();

-- Keep commission_rate_pct and monthly_fee_cents consistent with the tier unless
-- an admin has deliberately overridden them. Defaults per tier:
--   marketplace  $0/mo   10%   (free, the default path)
--   rising       $750/mo 25%
--   core         $1500/mo 20%
--   marquee      $0/mo   20%
create or replace function apply_tier_defaults()
returns trigger language plpgsql as $$
declare
  tier_changed boolean;
begin
  -- OLD is unassigned on INSERT, so guard on TG_OP rather than leaning on OR
  -- short circuit evaluation to keep the OLD reference from being reached.
  if tg_op = 'INSERT' then
    tier_changed := true;
  else
    tier_changed := new.representation_tier is distinct from old.representation_tier;
  end if;

  if tier_changed then
    select rate, fee into new.commission_rate_pct, new.monthly_fee_cents
    from (values
      ('marketplace'::representation_tier, 10.00::numeric(5,2), 0::bigint),
      ('rising',                           25.00, 75000),
      ('core',                             20.00, 150000),
      ('marquee',                          20.00, 0)
    ) as t(tier, rate, fee)
    where t.tier = new.representation_tier;
  end if;
  return new;
end;
$$;

create trigger talent_profiles_tier_defaults
  before insert or update of representation_tier on talent_profiles
  for each row execute function apply_tier_defaults();
