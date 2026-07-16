-- Conditional questionnaire sections (Step 3).
--
-- One optional 1:1 table per talent type. A person who checks both Actor and Model
-- gets a row in each, which a single wide table with nullable columns cannot express
-- cleanly. Presence of a row is driven by talent_profiles.talent_types.

-- ---------------------------------------------------------------------------
-- IF ACTOR
-- ---------------------------------------------------------------------------

create table talent_actor_details (
  profile_id uuid primary key references talent_profiles(id) on delete cascade,

  role_types text[] not null default '{}',

  -- The age they can PLAY, which is not their real age and not necessarily the
  -- age they present as day to day. This is the field casting actually searches.
  plays_age_min integer check (plays_age_min between 0 and 120),
  plays_age_max integer check (plays_age_max between 0 and 120),
  constraint plays_age_range_valid check (
    plays_age_min is null or plays_age_max is null or plays_age_min <= plays_age_max
  ),

  special_skills text[] not null default '{}',

  reel_url text,
  imdb_url text,
  resume_media_id uuid,

  -- Comfort levels. Stored explicitly so a booker can never surface talent for
  -- work they have not consented to, and so consent is auditable.
  comfort_intimate boolean default false,
  comfort_violence boolean default false,
  comfort_nudity boolean default false,
  comfort_notes text,

  will_self_tape boolean default true,
  performance_modes text[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- IF INFLUENCER / CREATOR
-- ---------------------------------------------------------------------------

create table talent_influencer_details (
  profile_id uuid primary key references talent_profiles(id) on delete cascade,

  niches text[] not null default '{}',
  content_formats text[] not null default '{}',

  -- Denormalized rollups from talent_platforms, maintained by trigger below.
  -- Denormalized because "total reach over 500K" is a hot filter and should not
  -- require aggregating child rows on every search.
  total_reach bigint not null default 0,
  avg_engagement_rate numeric(5,2) check (avg_engagement_rate >= 0),

  audience_age_ranges text[] not null default '{}',
  audience_gender_split jsonb not null default '{}'::jsonb,
  audience_geos text[] not null default '{}',

  past_brand_partnerships text[] not null default '{}',
  deliverable_rates jsonb not null default '[]'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Per platform rows so "over 100K on TikTok specifically" is answerable, which a
-- single total_reach number cannot do.
create table talent_platforms (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references talent_profiles(id) on delete cascade,
  platform text not null,
  handle text,
  url text,
  followers bigint not null default 0 check (followers >= 0),
  engagement_rate numeric(5,2) check (engagement_rate >= 0),
  verified verification_status not null default 'unverified',
  created_at timestamptz not null default now(),
  unique (profile_id, platform)
);

-- Keep total_reach in step with the platform rows.
create or replace function refresh_total_reach()
returns trigger language plpgsql as $$
declare
  target uuid := coalesce(new.profile_id, old.profile_id);
begin
  update talent_influencer_details
     set total_reach = (
           select coalesce(sum(followers), 0) from talent_platforms where profile_id = target
         ),
         updated_at = now()
   where profile_id = target;
  return null;
end;
$$;

create trigger talent_platforms_rollup
  after insert or update or delete on talent_platforms
  for each row execute function refresh_total_reach();

-- ---------------------------------------------------------------------------
-- IF MODEL
-- ---------------------------------------------------------------------------

create table talent_model_details (
  profile_id uuid primary key references talent_profiles(id) on delete cascade,

  model_types text[] not null default '{}',

  -- Height lives on talent_profiles (everyone answers it). These are the
  -- model specific measurements.
  bust_cm integer check (bust_cm between 30 and 250),
  waist_cm integer check (waist_cm between 30 and 250),
  hips_cm integer check (hips_cm between 30 and 250),
  dress_size text,
  suit_size text,
  shoe_size text,
  hair_color text,
  eye_color text,

  runway_experience boolean default false,
  print_experience boolean default false,
  agency_representation text,
  portfolio_url text,
  notable_credits text,

  comfort_swimwear boolean default false,
  comfort_lingerie boolean default false,
  comfort_implied boolean default false,
  comfort_nudity boolean default false,
  comfort_notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- IF OTHER PERFORMER (host, musician, dancer, DJ, voice, comedian, chef, artist,
-- athlete). Kept as one flexible table rather than eight thin ones: these verticals
-- share a shape (discipline + skills + credits + links) and splitting them would
-- add joins without adding a single answerable question.
-- ---------------------------------------------------------------------------

create table talent_performer_details (
  profile_id uuid primary key references talent_profiles(id) on delete cascade,

  disciplines text[] not null default '{}',
  skills text[] not null default '{}',
  specialties text[] not null default '{}',

  -- Vertical specific credentials, keyed by discipline. Kept as jsonb because a
  -- chef's "cuisine specialty" and an athlete's "league" share no columns and
  -- neither is a primary search axis; discipline and skills are.
  credentials jsonb not null default '{}'::jsonb,

  notable_work text,
  media_links text[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger talent_actor_details_updated_at before update on talent_actor_details
  for each row execute function set_updated_at();
create trigger talent_influencer_details_updated_at before update on talent_influencer_details
  for each row execute function set_updated_at();
create trigger talent_model_details_updated_at before update on talent_model_details
  for each row execute function set_updated_at();
create trigger talent_performer_details_updated_at before update on talent_performer_details
  for each row execute function set_updated_at();
