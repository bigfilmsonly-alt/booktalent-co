"use client"

/**
 * Step 3. Each section renders only when Step 1 selected a type that maps to it,
 * via SECTION_FOR_TYPE. Someone who checked Actor and Model gets both, in order,
 * and never sees the model measurements if they only checked Actor.
 */

import {
  ACTOR_ROLE_TYPES, ACTOR_SPECIAL_SKILLS, PERFORMANCE_MODES,
  PLATFORMS, CONTENT_NICHES, CONTENT_FORMATS, AUDIENCE_AGE_RANGES, DELIVERABLE_TYPES,
  MODEL_TYPES, HAIR_COLORS, EYE_COLORS,
  PERFORMER_DISCIPLINES, MUSIC_GENRES, ART_MEDIUMS, CULINARY_BACKGROUNDS,
} from "@/lib/talent/vocab"
import type { QuestionnaireDraft, PlatformAccount } from "@/lib/talent/types"
import { Field, TextInput, TextArea, ChipMulti, ChipSingle, YesNo, Checkbox, RangeInput } from "./fields"

type Patch = (fn: (d: QuestionnaireDraft) => void) => void

const toggle = (list: string[] | undefined, v: string): string[] => {
  const cur = list ?? []
  return cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]
}

/** Consent fields are grouped and labelled plainly. A booker can never surface
 *  talent for work they have not affirmatively agreed to here. */
function ComfortBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 border border-white/15 p-5">
      <p className="text-[13px] text-white font-bold mb-1">Comfort levels</p>
      <p className="text-[12px] text-mjcc-muted mb-4 leading-relaxed">
        Nothing is checked by default and nothing here is required. You will never be surfaced for work
        you have not agreed to, and you can change these any time.
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ACTOR
// ---------------------------------------------------------------------------

export function SectionActor({ draft, patch }: { draft: QuestionnaireDraft; patch: Patch }) {
  const a = draft.actor
  return (
    <>
      <Field label="Roles you play">
        <ChipMulti options={ACTOR_ROLE_TYPES} selected={a.roleTypes ?? []} onToggle={(v) => patch((d) => { d.actor.roleTypes = toggle(d.actor.roleTypes, v) })} />
      </Field>

      <Field
        label="Age range you play"
        hint="Can differ from both your real age and the age you present as. Casting searches this."
      >
        <RangeInput
          min={a.playsAgeMin}
          max={a.playsAgeMax}
          onMin={(v) => patch((d) => { d.actor.playsAgeMin = v })}
          onMax={(v) => patch((d) => { d.actor.playsAgeMax = v })}
        />
      </Field>

      <Field label="Special skills" hint="Every one of these is searchable. Be thorough." optional>
        <ChipMulti options={ACTOR_SPECIAL_SKILLS} selected={a.specialSkills ?? []} onToggle={(v) => patch((d) => { d.actor.specialSkills = toggle(d.actor.specialSkills, v) })} />
      </Field>

      <Field label="Reel or demo link" optional>
        <TextInput type="url" inputMode="url" value={a.reelUrl} onChange={(v) => patch((d) => { d.actor.reelUrl = v })} placeholder="https://" />
      </Field>

      <Field label="IMDb profile" optional>
        <TextInput type="url" inputMode="url" value={a.imdbUrl} onChange={(v) => patch((d) => { d.actor.imdbUrl = v })} placeholder="https://imdb.com/name/" />
      </Field>

      <Field label="Will you self tape?">
        <YesNo value={a.willSelfTape} onChange={(v) => patch((d) => { d.actor.willSelfTape = v })} />
      </Field>

      <Field label="On camera, voice, or both?">
        <ChipSingle options={PERFORMANCE_MODES} value={(a.performanceModes ?? [])[0]} onSelect={(v) => patch((d) => { d.actor.performanceModes = [v] })} />
      </Field>

      <ComfortBlock>
        <Checkbox checked={a.comfortIntimate} onChange={(v) => patch((d) => { d.actor.comfortIntimate = v })} label="Intimate scenes" hint="Always with an intimacy coordinator on set." />
        <Checkbox checked={a.comfortViolence} onChange={(v) => patch((d) => { d.actor.comfortViolence = v })} label="Violence or stage combat" />
        <Checkbox checked={a.comfortNudity} onChange={(v) => patch((d) => { d.actor.comfortNudity = v })} label="Nudity" hint="Rider required before any booking." />
      </ComfortBlock>

      <Field label="Notes on comfort levels" optional>
        <TextArea value={a.comfortNotes} onChange={(v) => patch((d) => { d.actor.comfortNotes = v })} placeholder="Anything you want a booker to know upfront." rows={3} />
      </Field>
    </>
  )
}

// ---------------------------------------------------------------------------
// INFLUENCER / CREATOR
// ---------------------------------------------------------------------------

export function SectionInfluencer({ draft, patch }: { draft: QuestionnaireDraft; patch: Patch }) {
  const i = draft.influencer
  const platforms: PlatformAccount[] = i.platforms ?? []

  const togglePlatform = (name: string) =>
    patch((d) => {
      const cur = d.influencer.platforms ?? []
      d.influencer.platforms = cur.some((p) => p.platform === name)
        ? cur.filter((p) => p.platform !== name)
        : [...cur, { platform: name, handle: "", followers: 0 }]
    })

  const setPlatform = (name: string, field: keyof PlatformAccount, value: string | number) =>
    patch((d) => {
      d.influencer.platforms = (d.influencer.platforms ?? []).map((p) =>
        p.platform === name ? { ...p, [field]: value } : p,
      )
    })

  const totalReach = platforms.reduce((sum, p) => sum + (Number(p.followers) || 0), 0)

  return (
    <>
      <Field label="Platforms you are on" hint="Add your handle and follower count for each.">
        <ChipMulti options={PLATFORMS} selected={platforms.map((p) => p.platform)} onToggle={togglePlatform} />
        {platforms.length > 0 && (
          <div className="mt-4 space-y-4 border-l border-mjcc-gold/30 pl-4">
            {platforms.map((p) => (
              <div key={p.platform}>
                <p className="text-[12px] text-white font-bold mb-2">{p.platform}</p>
                <div className="grid grid-cols-2 gap-2">
                  <TextInput value={p.handle} onChange={(v) => setPlatform(p.platform, "handle", v)} placeholder="@handle" />
                  <TextInput type="number" inputMode="numeric" value={p.followers || ""} onChange={(v) => setPlatform(p.platform, "followers", Number(v) || 0)} placeholder="Followers" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Field>

      {totalReach > 0 && (
        <div className="mb-8 border border-white/15 px-4 py-3 flex justify-between items-center">
          <span className="text-[12px] text-mjcc-muted uppercase tracking-wider font-semibold">Total reach</span>
          <span className="font-mono text-[15px] text-mjcc-gold font-bold">{totalReach.toLocaleString()}</span>
        </div>
      )}

      <Field label="Average engagement rate" hint="A percentage. Leave blank if you are not sure." optional>
        <TextInput type="number" inputMode="decimal" value={i.avgEngagementRate} onChange={(v) => patch((d) => { d.influencer.avgEngagementRate = v === "" ? undefined : Number(v) })} placeholder="4.2" />
      </Field>

      <Field label="Your content niches">
        <ChipMulti options={CONTENT_NICHES} selected={i.niches ?? []} onToggle={(v) => patch((d) => { d.influencer.niches = toggle(d.influencer.niches, v) })} />
      </Field>

      <Field label="Formats you produce">
        <ChipMulti options={CONTENT_FORMATS} selected={i.contentFormats ?? []} onToggle={(v) => patch((d) => { d.influencer.contentFormats = toggle(d.influencer.contentFormats, v) })} />
      </Field>

      <Field label="Your audience age ranges" hint="The bands that make up most of your audience." optional>
        <ChipMulti options={AUDIENCE_AGE_RANGES} selected={i.audienceAgeRanges ?? []} onToggle={(v) => patch((d) => { d.influencer.audienceAgeRanges = toggle(d.influencer.audienceAgeRanges, v) })} />
      </Field>

      <Field label="Top audience geographies" hint="Comma separated. Countries or cities." optional>
        <TextInput
          value={(i.audienceGeos ?? []).join(", ")}
          onChange={(v) => patch((d) => { d.influencer.audienceGeos = v.split(",").map((s) => s.trim()).filter(Boolean) })}
          placeholder="United States, Mexico, Brazil"
        />
      </Field>

      <Field label="Past brand partnerships" hint="Comma separated. This is one of the strongest signals a booker looks for." optional>
        <TextInput
          value={(i.pastBrandPartnerships ?? []).join(", ")}
          onChange={(v) => patch((d) => { d.influencer.pastBrandPartnerships = v.split(",").map((s) => s.trim()).filter(Boolean) })}
          placeholder="Nike, Sephora, Chipotle"
        />
      </Field>

      <Field label="Deliverables you offer" optional>
        <ChipMulti
          options={DELIVERABLE_TYPES}
          selected={(i.deliverableRates ?? []).map((d) => d.deliverable)}
          onToggle={(v) =>
            patch((d) => {
              const cur = d.influencer.deliverableRates ?? []
              d.influencer.deliverableRates = cur.some((x) => x.deliverable === v)
                ? cur.filter((x) => x.deliverable !== v)
                : [...cur, { deliverable: v, rateCents: 0 }]
            })
          }
        />
      </Field>
    </>
  )
}

// ---------------------------------------------------------------------------
// MODEL
// ---------------------------------------------------------------------------

export function SectionModel({ draft, patch }: { draft: QuestionnaireDraft; patch: Patch }) {
  const m = draft.model
  const num = (v: string) => (v === "" ? undefined : Number(v))
  return (
    <>
      <Field label="What kind of modelling do you do?">
        <ChipMulti options={MODEL_TYPES} selected={m.modelTypes ?? []} onToggle={(v) => patch((d) => { d.model.modelTypes = toggle(d.model.modelTypes, v) })} />
      </Field>

      <Field label="Measurements" hint="In centimetres. Height is on the previous step." optional>
        <div className="grid grid-cols-3 gap-2">
          <TextInput type="number" inputMode="numeric" value={m.bustCm} onChange={(v) => patch((d) => { d.model.bustCm = num(v) })} placeholder="Bust" />
          <TextInput type="number" inputMode="numeric" value={m.waistCm} onChange={(v) => patch((d) => { d.model.waistCm = num(v) })} placeholder="Waist" />
          <TextInput type="number" inputMode="numeric" value={m.hipsCm} onChange={(v) => patch((d) => { d.model.hipsCm = num(v) })} placeholder="Hips" />
        </div>
      </Field>

      <Field label="Sizes" optional>
        <div className="grid grid-cols-3 gap-2">
          <TextInput value={m.dressSize} onChange={(v) => patch((d) => { d.model.dressSize = v })} placeholder="Dress" />
          <TextInput value={m.suitSize} onChange={(v) => patch((d) => { d.model.suitSize = v })} placeholder="Suit" />
          <TextInput value={m.shoeSize} onChange={(v) => patch((d) => { d.model.shoeSize = v })} placeholder="Shoe" />
        </div>
      </Field>

      <Field label="Hair colour" optional>
        <ChipSingle options={HAIR_COLORS} value={m.hairColor} onSelect={(v) => patch((d) => { d.model.hairColor = v })} />
      </Field>

      <Field label="Eye colour" optional>
        <ChipSingle options={EYE_COLORS} value={m.eyeColor} onSelect={(v) => patch((d) => { d.model.eyeColor = v })} />
      </Field>

      <Field label="Runway experience?">
        <YesNo value={m.runwayExperience} onChange={(v) => patch((d) => { d.model.runwayExperience = v })} />
      </Field>

      <Field label="Print experience?">
        <YesNo value={m.printExperience} onChange={(v) => patch((d) => { d.model.printExperience = v })} />
      </Field>

      <Field label="Portfolio or comp card link" optional>
        <TextInput type="url" inputMode="url" value={m.portfolioUrl} onChange={(v) => patch((d) => { d.model.portfolioUrl = v })} placeholder="https://" />
      </Field>

      <Field label="Agency representation" hint="If an agency already represents you for modelling." optional>
        <TextInput value={m.agencyRepresentation} onChange={(v) => patch((d) => { d.model.agencyRepresentation = v })} placeholder="Wilhelmina, IMG, Ford, Next" />
      </Field>

      <Field label="Notable credits or campaigns" optional>
        <TextArea value={m.notableCredits} onChange={(v) => patch((d) => { d.model.notableCredits = v })} placeholder="Publications, campaigns, shows." rows={3} />
      </Field>

      <ComfortBlock>
        <Checkbox checked={m.comfortSwimwear} onChange={(v) => patch((d) => { d.model.comfortSwimwear = v })} label="Swimwear" />
        <Checkbox checked={m.comfortLingerie} onChange={(v) => patch((d) => { d.model.comfortLingerie = v })} label="Lingerie" />
        <Checkbox checked={m.comfortImplied} onChange={(v) => patch((d) => { d.model.comfortImplied = v })} label="Implied nude" />
        <Checkbox checked={m.comfortNudity} onChange={(v) => patch((d) => { d.model.comfortNudity = v })} label="Nudity" hint="Rider required before any booking." />
      </ComfortBlock>
    </>
  )
}

// ---------------------------------------------------------------------------
// OTHER PERFORMER
// ---------------------------------------------------------------------------

export function SectionPerformer({ draft, patch }: { draft: QuestionnaireDraft; patch: Patch }) {
  const p = draft.performer
  const disciplines = p.disciplines ?? []
  const cred = (p.credentials ?? {}) as Record<string, string | string[]>

  const setCred = (key: string, value: string | string[]) =>
    patch((d) => {
      d.performer.credentials = { ...(d.performer.credentials ?? {}), [key]: value }
    })

  const has = (...names: string[]) => names.some((n) => disciplines.includes(n))

  return (
    <>
      <Field label="Your discipline" hint="Select everything that applies.">
        <ChipMulti options={PERFORMER_DISCIPLINES} selected={disciplines} onToggle={(v) => patch((d) => { d.performer.disciplines = toggle(d.performer.disciplines, v) })} />
      </Field>

      {/* Discipline specific credentials. Shown only for what was picked above. */}
      {has("Musician", "Singer", "DJ", "Producer") && (
        <Field label="Music genre" optional>
          <ChipMulti
            options={MUSIC_GENRES}
            selected={(cred.genres as string[]) ?? []}
            onToggle={(v) => setCred("genres", toggle((cred.genres as string[]) ?? [], v))}
          />
        </Field>
      )}

      {has("Musician", "Singer", "DJ", "Producer") && (
        <Field label="Spotify or Apple Music link" optional>
          <TextInput type="url" inputMode="url" value={(cred.streamingUrl as string) ?? ""} onChange={(v) => setCred("streamingUrl", v)} placeholder="https://" />
        </Field>
      )}

      {has("Visual artist") && (
        <Field label="Art medium" optional>
          <ChipMulti
            options={ART_MEDIUMS}
            selected={(cred.mediums as string[]) ?? []}
            onToggle={(v) => setCred("mediums", toggle((cred.mediums as string[]) ?? [], v))}
          />
        </Field>
      )}

      {has("Chef") && (
        <Field label="Culinary background" optional>
          <ChipMulti
            options={CULINARY_BACKGROUNDS}
            selected={(cred.culinary as string[]) ?? []}
            onToggle={(v) => setCred("culinary", toggle((cred.culinary as string[]) ?? [], v))}
          />
        </Field>
      )}

      {has("Athlete") && (
        <>
          <Field label="Sport" optional>
            <TextInput value={(cred.sport as string) ?? ""} onChange={(v) => setCred("sport", v)} placeholder="Track and field" />
          </Field>
          <Field label="League or organisation" optional>
            <TextInput value={(cred.league as string) ?? ""} onChange={(v) => setCred("league", v)} placeholder="NFL, UFC, Olympics, NCAA" />
          </Field>
        </>
      )}

      <Field label="Relevant skills and specialties" hint="Comma separated. These are searchable." optional>
        <TextInput
          value={(p.skills ?? []).join(", ")}
          onChange={(v) => patch((d) => { d.performer.skills = v.split(",").map((s) => s.trim()).filter(Boolean) })}
          placeholder="Improv, crowd work, teleprompter, live band"
        />
      </Field>

      <Field label="Links to your work" hint="Comma separated." optional>
        <TextInput
          value={(p.mediaLinks ?? []).join(", ")}
          onChange={(v) => patch((d) => { d.performer.mediaLinks = v.split(",").map((s) => s.trim()).filter(Boolean) })}
          placeholder="https://"
        />
      </Field>
    </>
  )
}
