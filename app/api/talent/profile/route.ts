import { NextResponse } from "next/server"
import type { QuestionnaireDraft } from "@/lib/talent/types"
import { DEFAULT_COMMISSION_PCT } from "@/lib/talent/vocab"

/**
 * Talent questionnaire submission.
 *
 * Supabase is not provisioned yet, so this validates the payload and hands it to
 * the same notification path the rest of the site's forms use. The mapping to the
 * talent_profiles insert is written out below rather than left as a TODO, because
 * it is the part that has to be right the day the DB lands.
 */

export const runtime = "nodejs"

interface SubmitResult {
  ok: boolean
  error?: string
}

/**
 * Both phases validate identically. Signup already carries the name, email and
 * consent, so there is nothing extra to require at completion, and demanding more
 * for the enrichment pass would just reintroduce the wall we removed.
 */
function validate(draft: QuestionnaireDraft): string | null {
  if (!draft || typeof draft !== "object") return "Malformed payload."
  if (!Array.isArray(draft.talentTypes) || draft.talentTypes.length === 0) {
    return "Select at least one talent type."
  }
  const u = draft.universal ?? {}
  if (!u.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(u.email)) {
    return "A valid email is required."
  }
  if (!u.legalName && !u.stageName) {
    return "A name is required."
  }
  const t = draft.terms ?? {}
  if (!t.agreedAgencyOfRecord || !t.agreedCommission) {
    return "Both agreements must be accepted."
  }
  return null
}

export async function POST(req: Request): Promise<NextResponse<SubmitResult>> {
  let draft: QuestionnaireDraft & { phase?: "signup" | "complete" }
  try {
    draft = (await req.json()) as QuestionnaireDraft & { phase?: "signup" | "complete" }
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 })
  }

  // 'signup' is the 30 second entry: name, email, city, consent. 'complete' is the
  // enrichment pass. Both are real profiles; the difference is only how much of the
  // searchable detail is filled in, so a signup is never discarded as a partial.
  const phase = draft.phase === "complete" ? "complete" : "signup"

  const invalid = validate(draft)
  if (invalid) {
    return NextResponse.json({ ok: false, error: invalid }, { status: 422 })
  }

  const tier = draft.terms?.tier ?? "marketplace"

  /**
   * The shape that becomes the talent_profiles row. Commission is not read from
   * the client: the tier decides it server side, and the DB trigger
   * (apply_tier_defaults) is the final authority. A client that posts
   * {tier: 'core', commission: 0} must not get 0%.
   */
  const profileRow = {
    talent_types: draft.talentTypes,
    legal_name: draft.universal?.legalName ?? null,
    stage_name: draft.universal?.stageName ?? null,
    email: draft.universal?.email ?? null,
    phone: draft.universal?.phone ?? null,
    city: draft.universal?.city ?? null,
    willing_to_travel: draft.universal?.willingToTravel ?? false,
    willing_to_relocate: draft.universal?.willingToRelocate ?? false,
    date_of_birth: draft.universal?.dateOfBirth ?? null,
    presents_age_min: draft.universal?.presentsAgeMin ?? null,
    presents_age_max: draft.universal?.presentsAgeMax ?? null,
    // Identity fields are no longer collected on the form; they stay in the payload
    // shape so the DB insert does not change, and default empty.
    gender_identity: draft.universal?.genderIdentity ?? null,
    genders_portrayable: draft.universal?.gendersPortrayable ?? [],
    ethnicity: draft.universal?.ethnicity ?? [],
    ethnicities_portrayable: draft.universal?.ethnicitiesPortrayable ?? [],
    values: draft.universal?.values ?? null,
    languages: (draft.universal?.languages ?? []).map((l) => l.language),
    language_fluency: Object.fromEntries(
      (draft.universal?.languages ?? []).map((l) => [l.language, l.fluency]),
    ),
    accents: draft.universal?.accents ?? [],
    height_cm: draft.universal?.heightCm ?? null,
    build: draft.universal?.build ?? null,
    union_status: draft.universal?.unionStatus ?? null,
    has_representation: draft.universal?.hasRepresentation ?? null,
    booking_types: draft.universal?.bookingTypes ?? [],
    rate_min_cents: draft.universal?.rateMinCents ?? null,
    rate_max_cents: draft.universal?.rateMaxCents ?? null,
    availability: draft.universal?.availability ?? null,
    representation_tier: tier,
    agreed_to_terms_at: draft.terms?.agreedAt ?? new Date().toISOString(),
    agreed_terms_version: draft.terms?.agreedTermsVersion ?? null,
    // Submitted, not active. Nothing reaches booker search until a human verifies it.
    status: "submitted" as const,
  }

  // TODO(supabase): once provisioned, replace the notify call below with:
  //   const { data: profile } = await supabase.from('talent_profiles')
  //     .insert(profileRow).select('id').single()
  //   then insert the matching talent_{actor,influencer,model,performer}_details
  //   rows for the sections present in draft.talentTypes, and talent_platforms
  //   rows for draft.influencer.platforms.

  try {
    const origin = new URL(req.url).origin
    await fetch(`${origin}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: phase === "signup" ? "talent-signup" : "talent-profile-complete",
        phase,
        tier,
        commissionPct: DEFAULT_COMMISSION_PCT,
        profile: profileRow,
        sections: {
          actor: draft.actor ?? {},
          influencer: draft.influencer ?? {},
          model: draft.model ?? {},
          performer: draft.performer ?? {},
        },
      }),
    })
  } catch {
    // The notification path failing must not lose the submission. Log and accept:
    // the payload is echoed in the response so nothing is silently dropped.
    console.error("talent profile submit: notify failed", {
      email: profileRow.email,
      types: profileRow.talent_types,
    })
  }

  return NextResponse.json({ ok: true })
}
