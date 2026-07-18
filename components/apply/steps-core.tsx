"use client"

/**
 * Steps 1, 2 and 4. The conditional Step 3 sections live in steps-conditional.tsx.
 */

import {
  TALENT_TYPES, GENDER_PRESENTATIONS, CASTING_LOOKS, LANGUAGES,
  FLUENCY_LEVELS, ACCENTS, BUILDS, UNION_STATUSES, BOOKING_TYPES, AVAILABILITY,
  REPRESENTATION_TIERS, TERMS_VERSION,
} from "@/lib/talent/vocab"
import type { QuestionnaireDraft, LanguageSkill, Fluency } from "@/lib/talent/types"
import { Field, TextInput, TextArea, ChipMulti, ChipSingle, YesNo, Checkbox, RangeInput } from "./fields"

type Patch = (fn: (d: QuestionnaireDraft) => void) => void

const toggle = (list: string[] | undefined, v: string): string[] => {
  const cur = list ?? []
  return cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]
}

// ---------------------------------------------------------------------------
// STEP 1 — What kind of talent are you?
// ---------------------------------------------------------------------------

export function StepTypes({ draft, patch }: { draft: QuestionnaireDraft; patch: Patch }) {
  return (
    <>
      <Field
        label="What kind of talent are you?"
        hint="Select everything that applies. Most working talent is more than one thing, and picking more than one only opens up more of the questions that get you found."
      >
        <ChipMulti
          options={TALENT_TYPES}
          selected={draft.talentTypes}
          onToggle={(v) =>
            patch((d) => {
              d.talentTypes = toggle(d.talentTypes, v) as QuestionnaireDraft["talentTypes"]
            })
          }
        />
      </Field>
      {draft.talentTypes.length === 0 && (
        <p className="text-[12px] text-mjcc-muted">Pick at least one to continue.</p>
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// STEP 2 — Essentials. This is the whole signup.
//
// Everything here is the minimum to create a real lead with consent: who you are,
// how to reach you, where you are, and agreement to the commission. It is four
// fields and two checkboxes, and it submits. The old version asked 23 questions
// before capturing an email, so anyone who quit partway left nothing behind.
// Enrichment happens after, when they have already committed.
// ---------------------------------------------------------------------------

export function StepEssentials({ draft, patch }: { draft: QuestionnaireDraft; patch: Patch }) {
  const u = draft.universal
  const t = draft.terms
  const tier = REPRESENTATION_TIERS.find((x) => x.value === (t.tier ?? "marketplace"))!

  return (
    <>
      <Field label="Your name" hint="However you are known professionally.">
        <TextInput
          value={u.stageName}
          onChange={(v) => patch((d) => { d.universal.stageName = v })}
          placeholder="Jane Rivera"
        />
      </Field>

      <Field label="Email" hint="Where bookings come in. We do not sell it or spam you.">
        <TextInput
          type="email"
          inputMode="email"
          value={u.email}
          onChange={(v) => patch((d) => { d.universal.email = v })}
          placeholder="you@email.com"
        />
      </Field>

      <Field label="City" hint="Bookers search by market.">
        <TextInput value={u.city} onChange={(v) => patch((d) => { d.universal.city = v })} placeholder="Miami" />
      </Field>

      <Field label="Will you travel for work?">
        <YesNo value={u.willingToTravel} onChange={(v) => patch((d) => { d.universal.willingToTravel = v })} />
      </Field>

      <div className="mb-8 border border-mjcc-gold/30 p-5">
        <p className="text-[13px] text-white font-bold mb-1">The deal</p>
        <p className="text-[12px] text-mjcc-muted mb-4 leading-relaxed">
          Free to join. We take {tier.commission}% when you book work through BookTalent, and nothing
          if you do not. Work you find on your own stays entirely yours.
        </p>
        <div className="space-y-1">
          <Checkbox
            checked={t.agreedAgencyOfRecord}
            onChange={(v) => patch((d) => { d.terms.agreedAgencyOfRecord = v })}
            label="BookTalent acts as my agency of record for work booked through this platform."
          />
          <Checkbox
            checked={t.agreedCommission}
            onChange={(v) =>
              patch((d) => {
                d.terms.agreedCommission = v
                d.terms.agreedTermsVersion = TERMS_VERSION
                d.terms.agreedAt = v ? new Date().toISOString() : undefined
              })
            }
            label={`I agree to ${tier.commission}% commission on work booked through BookTalent.`}
          />
        </div>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// PROFILE DETAILS — everything that makes you findable. Shown after signup.
// ---------------------------------------------------------------------------

export function StepDetails({ draft, patch }: { draft: QuestionnaireDraft; patch: Patch }) {
  const u = draft.universal
  const langs: LanguageSkill[] = u.languages ?? []

  const toggleLanguage = (name: string) =>
    patch((d) => {
      const cur = d.universal.languages ?? []
      d.universal.languages = cur.some((l) => l.language === name)
        ? cur.filter((l) => l.language !== name)
        : [...cur, { language: name, fluency: "fluent" as Fluency }]
    })

  const setFluency = (name: string, fluency: Fluency) =>
    patch((d) => {
      d.universal.languages = (d.universal.languages ?? []).map((l) =>
        l.language === name ? { ...l, fluency } : l,
      )
    })

  return (
    <>
      {/* Name, email, city and travel are already captured at signup. */}
      <Field label="Legal name" hint="For contracts and payment. Never shown publicly." optional>
        <TextInput value={u.legalName} onChange={(v) => patch((d) => { d.universal.legalName = v })} placeholder="Jane Rivera" />
      </Field>

      <Field label="Phone" optional>
        <TextInput type="tel" inputMode="tel" value={u.phone} onChange={(v) => patch((d) => { d.universal.phone = v })} placeholder="(305) 555 0134" />
      </Field>

      <Field label="Would you relocate for the right booking?" optional>
        <YesNo value={u.willingToRelocate} onChange={(v) => patch((d) => { d.universal.willingToRelocate = v })} />
      </Field>

      <Field
        label="Date of birth"
        hint="Private. This is never shown to bookers and never appears on your profile. We hold it for contracts and to confirm you are eligible to work."
      >
        <TextInput type="date" value={u.dateOfBirth} onChange={(v) => patch((d) => { d.universal.dateOfBirth = v })} />
      </Field>

      <Field
        label="Age range you present as"
        hint="What you read as on camera, which is often not your real age. This is what bookers actually search."
      >
        <RangeInput
          min={u.presentsAgeMin}
          max={u.presentsAgeMax}
          onMin={(v) => patch((d) => { d.universal.presentsAgeMin = v })}
          onMax={(v) => patch((d) => { d.universal.presentsAgeMax = v })}
        />
      </Field>

      {/* Same principle as casting looks below: we ask what you play, not how you
          identify. Gender identity is sensitive data we do not need to book work. */}
      <Field label="Gender you play on camera" hint="Select every gender you credibly present as for a role. This is what bookers cast on.">
        <ChipMulti options={GENDER_PRESENTATIONS} selected={u.gendersPortrayable ?? []} onToggle={(v) => patch((d) => { d.universal.gendersPortrayable = toggle(d.universal.gendersPortrayable, v) })} />
      </Field>

      {/* One question, and it is about castable range, not identity. We deliberately
          do not ask talent to declare their ethnicity: it is sensitive data we do not
          need to make a booking, and framing this as "what can you play" is both the
          more comfortable question to answer and the one bookers actually search. */}
      <Field
        label="What do you read as on camera?"
        hint="This is about range, not labels. Pick every look you are credibly cast as, or could play. Plenty of people read as more than one, and the wider and truer your range, the more rooms you get into. Casting directors search on exactly this."
      >
        <ChipMulti options={CASTING_LOOKS} selected={u.ethnicitiesPortrayable ?? []} onToggle={(v) => patch((d) => { d.universal.ethnicitiesPortrayable = toggle(d.universal.ethnicitiesPortrayable, v) })} />
      </Field>

      {/* "What you stand for." Values are becoming a real matching axis for brands,
          and letting talent name what they will and will not put their name behind is
          both a differentiator and a brand-safety signal. Optional and free text. */}
      <Field
        label="What you stand for"
        hint="Brands increasingly match on values. Tell us what you will put your name behind, and what you will not touch, so we only bring you work that fits."
        optional
      >
        <TextArea
          value={u.values}
          onChange={(v) => patch((d) => { d.universal.values = v })}
          placeholder="Causes you support, categories you avoid, the thing you will not compromise on."
          rows={3}
        />
      </Field>

      <Field label="Languages you speak" hint="Set your fluency for each one you pick.">
        <ChipMulti options={LANGUAGES} selected={langs.map((l) => l.language)} onToggle={toggleLanguage} />
        {langs.length > 0 && (
          <div className="mt-4 space-y-3 border-l border-mjcc-gold/30 pl-4">
            {langs.map((l) => (
              <div key={l.language} className="flex items-center justify-between gap-3">
                <span className="text-[13px] text-white font-semibold shrink-0">{l.language}</span>
                <div className="flex gap-1 flex-wrap justify-end">
                  {FLUENCY_LEVELS.map((f) => (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setFluency(l.language, f.value)}
                      className={`px-2.5 py-1.5 text-[11px] font-semibold border transition-colors min-h-[32px] ${
                        l.fluency === f.value
                          ? "border-mjcc-gold text-mjcc-gold"
                          : "border-white/15 text-mjcc-muted hover:border-white/40"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Field>

      <Field label="Accents you can perform" optional>
        <ChipMulti options={ACCENTS} selected={u.accents ?? []} onToggle={(v) => patch((d) => { d.universal.accents = toggle(d.universal.accents, v) })} />
      </Field>

      <Field label="Height" hint="In centimetres.">
        <TextInput type="number" inputMode="numeric" value={u.heightCm} onChange={(v) => patch((d) => { d.universal.heightCm = v === "" ? undefined : Number(v) })} placeholder="170" />
      </Field>

      <Field label="General build">
        <ChipSingle options={BUILDS} value={u.build} onSelect={(v) => patch((d) => { d.universal.build = v })} />
      </Field>

      <Field label="Union status">
        <ChipSingle options={UNION_STATUSES} value={u.unionStatus} onSelect={(v) => patch((d) => { d.universal.unionStatus = v as typeof d.universal.unionStatus })} />
      </Field>

      <Field
        label="Do you currently have an agent or manager?"
        hint="There is no wrong answer. Most of the talent we represent came to us with nobody in their corner, and that is exactly who this was built for."
      >
        <YesNo value={u.hasRepresentation} onChange={(v) => patch((d) => { d.universal.hasRepresentation = v })} />
      </Field>

      {u.hasRepresentation && (
        <Field label="Who represents you?" hint="So we do not cut across an existing deal." optional>
          <TextInput value={u.representationDetails} onChange={(v) => patch((d) => { d.universal.representationDetails = v })} placeholder="Agency or manager name" />
        </Field>
      )}

      <Field label="What kind of work are you open to?">
        <ChipMulti options={BOOKING_TYPES} selected={u.bookingTypes ?? []} onToggle={(v) => patch((d) => { d.universal.bookingTypes = toggle(d.universal.bookingTypes, v) })} />
      </Field>

      <Field label="Rate expectations" hint="A range in US dollars per booking. A starting point, not a commitment." optional>
        <RangeInput
          min={u.rateMinCents ? u.rateMinCents / 100 : undefined}
          max={u.rateMaxCents ? u.rateMaxCents / 100 : undefined}
          onMin={(v) => patch((d) => { d.universal.rateMinCents = v === undefined ? undefined : Math.round(v * 100) })}
          onMax={(v) => patch((d) => { d.universal.rateMaxCents = v === undefined ? undefined : Math.round(v * 100) })}
          unit="USD"
        />
      </Field>

      <Field label="Availability">
        <ChipSingle options={AVAILABILITY} value={u.availability} onSelect={(v) => patch((d) => { d.universal.availability = v as typeof d.universal.availability })} />
      </Field>
    </>
  )
}

// ---------------------------------------------------------------------------
// STEP 4 — Media, verification, terms
// ---------------------------------------------------------------------------

export function StepMediaTerms({ draft, patch }: { draft: QuestionnaireDraft; patch: Patch }) {
  const t = draft.terms

  return (
    <>
      <Field
        label="Reel, portfolio, or showreel link"
        hint="A link is fine to start. You can upload files once your profile is live."
        optional
      >
        <TextInput type="url" inputMode="url" value={draft.media.reelUrl} onChange={(v) => patch((d) => { d.media.reelUrl = v })} placeholder="https://" />
      </Field>

      <div className="mb-8 border border-white/15 p-5">
        <p className="text-[13px] text-white font-bold mb-2">Photos and files</p>
        <p className="text-[12px] text-mjcc-muted leading-relaxed">
          Upload is not switched on yet. Submit what you have and we will email you a secure link for
          headshots, portfolio, and resume before your profile goes live. Nothing here blocks you from
          finishing.
        </p>
      </div>

      <Field label="How we represent you" hint="Choose the tier that fits. You can change this later.">
        <ChipSingle
          columns={1}
          options={REPRESENTATION_TIERS.map((r) => ({
            value: r.value,
            label: `${r.label}. ${r.price}, ${r.commission}% commission`,
            hint: r.summary,
          }))}
          value={t.tier ?? "marketplace"}
          onSelect={(v) => patch((d) => { d.terms.tier = v as typeof d.terms.tier })}
        />
      </Field>

      <Field label="Anything else we should know?" optional>
        <TextArea value={draft.performer.notableWork} onChange={(v) => patch((d) => { d.performer.notableWork = v })} placeholder="Credits, links, context, whatever helps us place you." rows={4} />
      </Field>
    </>
  )
}
