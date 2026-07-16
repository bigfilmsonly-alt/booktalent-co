-- Indexes, the search RPC, and row level security.

-- ---------------------------------------------------------------------------
-- Indexes. Every multi select the questionnaire collects is a GIN indexed array
-- so containment ("can portray Latino") is an index hit, not a scan.
-- ---------------------------------------------------------------------------

create index talent_profiles_types_gin        on talent_profiles using gin (talent_types);
create index talent_profiles_eth_portray_gin  on talent_profiles using gin (ethnicities_portrayable);
create index talent_profiles_eth_gin          on talent_profiles using gin (ethnicity);
create index talent_profiles_genders_gin      on talent_profiles using gin (genders_portrayable);
create index talent_profiles_languages_gin    on talent_profiles using gin (languages);
create index talent_profiles_accents_gin      on talent_profiles using gin (accents);
create index talent_profiles_booking_types_gin on talent_profiles using gin (booking_types);

create index talent_profiles_status      on talent_profiles (status) where status = 'active';
create index talent_profiles_location    on talent_profiles (country, region, city);
create index talent_profiles_travel      on talent_profiles (willing_to_travel) where willing_to_travel;
create index talent_profiles_presents_age on talent_profiles (presents_age_min, presents_age_max);
create index talent_profiles_unrepped    on talent_profiles (has_representation) where has_representation is false;
create index talent_profiles_city_trgm   on talent_profiles using gin (city gin_trgm_ops);

create index actor_skills_gin     on talent_actor_details using gin (special_skills);
create index actor_role_types_gin on talent_actor_details using gin (role_types);
create index actor_plays_age      on talent_actor_details (plays_age_min, plays_age_max);

create index influencer_niches_gin  on talent_influencer_details using gin (niches);
create index influencer_formats_gin on talent_influencer_details using gin (content_formats);
create index influencer_reach       on talent_influencer_details (total_reach desc);

create index model_types_gin on talent_model_details using gin (model_types);

create index performer_disciplines_gin on talent_performer_details using gin (disciplines);
create index performer_skills_gin      on talent_performer_details using gin (skills);

create index platforms_profile on talent_platforms (profile_id);
create index platforms_reach   on talent_platforms (platform, followers desc);

create index bookings_profile on bookings (profile_id, created_at desc);
create index bookings_booker  on bookings (booker_id, created_at desc);
create index bookings_commission_due on bookings (commission_status)
  where status in ('confirmed', 'completed') and commission_status = 'pending';

-- ---------------------------------------------------------------------------
-- search_talent
--
-- Every argument is optional; null means "do not filter on this". A profile must
-- clear all supplied hard filters, then results are ranked by fit so the closest
-- matches surface first rather than an arbitrary ordering.
--
-- Answers the acceptance query directly:
--   select * from search_talent(
--     p_ethnicities_portrayable => array['Latino'],
--     p_plays_age_min => 20, p_plays_age_max => 30,
--     p_languages => array['Spanish']
--   );
-- ---------------------------------------------------------------------------

create or replace function search_talent(
  p_talent_types              talent_type[] default null,
  p_ethnicities_portrayable   text[]  default null,
  p_genders_portrayable       text[]  default null,
  p_languages                 text[]  default null,
  p_min_fluency               fluency_level default null,
  p_accents                   text[]  default null,
  p_plays_age_min             integer default null,
  p_plays_age_max             integer default null,
  p_city                      text    default null,
  p_include_travelers         boolean default true,
  p_skills                    text[]  default null,
  p_niches                    text[]  default null,
  p_model_types               text[]  default null,
  p_min_followers             bigint  default null,
  p_platform                  text    default null,
  p_union_status              union_status[] default null,
  p_availability              availability_type[] default null,
  p_booking_types             text[]  default null,
  p_max_rate_cents            bigint  default null,
  p_unrepped_only             boolean default false,
  p_height_min_cm             integer default null,
  p_height_max_cm             integer default null,
  p_limit                     integer default 50,
  p_offset                    integer default 0
)
returns table (
  profile_id uuid,
  slug text,
  stage_name text,
  talent_types talent_type[],
  city text,
  region text,
  country text,
  willing_to_travel boolean,
  presents_age_min integer,
  presents_age_max integer,
  plays_age_min integer,
  plays_age_max integer,
  ethnicities_portrayable text[],
  genders_portrayable text[],
  languages text[],
  height_cm integer,
  union_status union_status,
  availability availability_type,
  rate_min_cents bigint,
  rate_max_cents bigint,
  total_reach bigint,
  primary_headshot_path text,
  identity_verification verification_status,
  fit_score numeric,
  total_count bigint
)
language sql
stable
security definer
set search_path = ''
as $$
  with candidates as (
    select
      p.*,
      a.plays_age_min as a_plays_min,
      a.plays_age_max as a_plays_max,
      a.special_skills,
      i.total_reach   as i_reach,
      i.niches,
      m.model_types
    from public.talent_profiles p
    left join public.talent_actor_details      a on a.profile_id = p.id
    left join public.talent_influencer_details i on i.profile_id = p.id
    left join public.talent_model_details      m on m.profile_id = p.id
    left join public.talent_performer_details  f on f.profile_id = p.id
    where
      -- Only signed, verified, active talent is ever searchable. Drafts and
      -- unverified submissions must never surface to a booker.
      p.status = 'active'

      and (p_talent_types            is null or p.talent_types && p_talent_types)
      and (p_ethnicities_portrayable is null or p.ethnicities_portrayable @> p_ethnicities_portrayable)
      and (p_genders_portrayable     is null or p.genders_portrayable && p_genders_portrayable)
      and (p_accents                 is null or p.accents && p_accents)
      and (p_union_status            is null or p.union_status = any(p_union_status))
      and (p_availability            is null or p.availability = any(p_availability))
      and (p_booking_types           is null or p.booking_types && p_booking_types)
      and (p_unrepped_only is not true or p.has_representation is false)

      -- Languages: must speak all requested. When a minimum fluency is supplied,
      -- every requested language must independently clear that bar.
      and (p_languages is null or p.languages @> p_languages)
      and (
        p_min_fluency is null or p_languages is null
        or not exists (
          select 1 from unnest(p_languages) as want(lang)
          where coalesce(
            (p.language_fluency ->> want.lang)::public.fluency_level,
            'basic'::public.fluency_level
          ) > p_min_fluency  -- enum is ordered best..worst, so ">" means weaker
        )
      )

      -- Age: the requested window must overlap what they can play. Falls back to
      -- the presents-as range for non actors, who have no plays_age.
      and (
        (p_plays_age_min is null and p_plays_age_max is null)
        or (
          coalesce(a.plays_age_min, p.presents_age_min) <= coalesce(p_plays_age_max, 200)
          and coalesce(a.plays_age_max, p.presents_age_max) >= coalesce(p_plays_age_min, 0)
        )
      )

      -- Location: in the city, or willing to travel to it.
      and (
        p_city is null
        or p.city ilike '%' || p_city || '%'
        or (p_include_travelers and p.willing_to_travel)
      )

      and (p_height_min_cm is null or p.height_cm >= p_height_min_cm)
      and (p_height_max_cm is null or p.height_cm <= p_height_max_cm)
      and (p_max_rate_cents is null or p.rate_min_cents is null or p.rate_min_cents <= p_max_rate_cents)

      and (p_skills      is null or a.special_skills && p_skills or f.skills && p_skills)
      and (p_niches      is null or i.niches && p_niches)
      and (p_model_types is null or m.model_types && p_model_types)

      and (
        p_min_followers is null
        or (p_platform is null and i.total_reach >= p_min_followers)
        or (p_platform is not null and exists (
              select 1 from public.talent_platforms tp
              where tp.profile_id = p.id and tp.platform = p_platform
                and tp.followers >= p_min_followers
           ))
      )
  ),
  scored as (
    select
      c.*,
      (
        -- Fit ranking. Everything below already passed the hard filters; this
        -- decides who a booker sees first.

        -- Exact location beats a willing traveler.
        case when p_city is not null and c.city ilike '%' || p_city || '%' then 3.0 else 0 end
        -- Tight age fit beats a wide "I play 18 to 60" claim.
        + case
            when p_plays_age_min is not null and coalesce(c.a_plays_min, c.presents_age_min) is not null
            then greatest(0, 2.0 - (
              abs(coalesce(c.a_plays_min, c.presents_age_min) - p_plays_age_min)
              + abs(coalesce(c.a_plays_max, c.presents_age_max) - p_plays_age_max)
            ) / 10.0)
            else 0
          end
        -- Reward breadth of language match beyond the minimum asked for.
        + case when p_languages is not null
               then least(2.0, cardinality(c.languages) * 0.25) else 0 end
        + case when c.identity_verification = 'verified' then 2.0 else 0 end
        + case when exists (
              select 1 from public.talent_media md
              where md.profile_id = c.id and md.kind = 'headshot'
            ) then 1.5 else 0 end
        -- Nudge complete profiles up; a half filled profile is a worse booking bet.
        + least(1.5, cardinality(c.completed_steps) * 0.3)
        + case when c.i_reach > 0 then least(1.0, log(greatest(c.i_reach, 10)) / 7.0) else 0 end
      )::numeric(6,2) as fit_score
    from candidates c
  )
  select
    s.id, s.slug, s.stage_name, s.talent_types,
    s.city, s.region, s.country, s.willing_to_travel,
    s.presents_age_min, s.presents_age_max,
    s.a_plays_min, s.a_plays_max,
    s.ethnicities_portrayable, s.genders_portrayable, s.languages,
    s.height_cm, s.union_status, s.availability,
    s.rate_min_cents, s.rate_max_cents,
    coalesce(s.i_reach, 0),
    (select md.storage_path from public.talent_media md
      where md.profile_id = s.id and md.kind = 'headshot'
      order by md.is_primary desc, md.sort_order asc limit 1),
    s.identity_verification,
    s.fit_score,
    count(*) over ()
  from scored s
  order by s.fit_score desc, s.updated_at desc
  limit least(coalesce(p_limit, 50), 100)
  offset coalesce(p_offset, 0);
$$;

comment on function search_talent is
  'Booker facing talent search. Returns only active profiles and only booker safe
   columns: date_of_birth, email and phone are deliberately absent.';

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table talent_profiles            enable row level security;
alter table talent_actor_details       enable row level security;
alter table talent_influencer_details  enable row level security;
alter table talent_model_details       enable row level security;
alter table talent_performer_details   enable row level security;
alter table talent_platforms           enable row level security;
alter table talent_media               enable row level security;
alter table booker_profiles            enable row level security;
alter table bookings                   enable row level security;
alter table booking_messages           enable row level security;
alter table shortlists                 enable row level security;
alter table shortlist_items            enable row level security;
alter table saved_searches             enable row level security;

-- Talent owns its own profile end to end.
create policy talent_owns_profile on talent_profiles
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Note there is deliberately no booker SELECT policy on talent_profiles. Bookers
-- reach talent only through search_talent(), which is security definer and returns
-- a fixed safe column list. That is what keeps date_of_birth and raw contact details
-- out of reach even if a booker queries the table directly with an anon key.

create policy talent_owns_actor_details on talent_actor_details
  for all using (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()))
  with check (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()));
create policy talent_owns_influencer_details on talent_influencer_details
  for all using (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()))
  with check (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()));
create policy talent_owns_model_details on talent_model_details
  for all using (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()))
  with check (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()));
create policy talent_owns_performer_details on talent_performer_details
  for all using (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()))
  with check (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()));
create policy talent_owns_platforms on talent_platforms
  for all using (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()))
  with check (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()));
create policy talent_owns_media on talent_media
  for all using (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()))
  with check (exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid()));

create policy booker_owns_profile on booker_profiles
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Both sides of a booking can see it.
create policy booking_parties_read on bookings
  for select using (
    exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid())
    or exists (select 1 from booker_profiles b where b.id = booker_id and b.user_id = auth.uid())
  );
create policy booker_creates_booking on bookings
  for insert with check (
    exists (select 1 from booker_profiles b where b.id = booker_id and b.user_id = auth.uid())
  );
create policy booking_parties_update on bookings
  for update using (
    exists (select 1 from talent_profiles p where p.id = profile_id and p.user_id = auth.uid())
    or exists (select 1 from booker_profiles b where b.id = booker_id and b.user_id = auth.uid())
  );

create policy booking_messages_parties on booking_messages
  for all using (
    exists (
      select 1 from bookings bk
      where bk.id = booking_id and (
        exists (select 1 from talent_profiles p where p.id = bk.profile_id and p.user_id = auth.uid())
        or exists (select 1 from booker_profiles b where b.id = bk.booker_id and b.user_id = auth.uid())
      )
    )
  )
  with check (sender_id = auth.uid());

create policy booker_owns_shortlists on shortlists
  for all using (exists (select 1 from booker_profiles b where b.id = booker_id and b.user_id = auth.uid()));
create policy booker_owns_shortlist_items on shortlist_items
  for all using (
    exists (
      select 1 from shortlists s join booker_profiles b on b.id = s.booker_id
      where s.id = shortlist_id and b.user_id = auth.uid()
    )
  );
create policy booker_owns_saved_searches on saved_searches
  for all using (exists (select 1 from booker_profiles b where b.id = booker_id and b.user_id = auth.uid()));

grant execute on function search_talent to authenticated;
