/**
 * Types mirroring supabase/migrations. Kept hand written rather than generated
 * because the DB is not provisioned yet; once it is, replace the row types here
 * with `supabase gen types typescript` output. The draft types below are UI state
 * and stay hand written either way.
 */

import type { TalentTypeValue } from "./vocab"

export type Fluency = "native" | "fluent" | "conversational" | "basic"
export type UnionStatus = "sag_aftra" | "sag_eligible" | "aea" | "non_union" | "other"
export type Availability = "full_time" | "weekends" | "project_based" | "limited"
export type RepresentationTier = "marketplace" | "rising" | "core" | "marquee"
export type ProfileStatus = "draft" | "submitted" | "verified" | "active" | "suspended" | "inactive"
export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected"
export type MediaKind = "headshot" | "portfolio" | "reel" | "resume" | "comp_card" | "audio" | "other"

export type BookingStatus =
  | "inquiry" | "shortlisted" | "offered" | "accepted" | "declined"
  | "confirmed" | "completed" | "paid" | "cancelled"

export type CommissionStatus = "pending" | "invoiced" | "collected" | "waived" | "refunded"

export interface LanguageSkill {
  language: string
  fluency: Fluency
}

export interface PlatformAccount {
  platform: string
  handle: string
  url?: string
  followers: number
  engagementRate?: number
}

export interface DeliverableRate {
  deliverable: string
  rateCents: number
}

// ---------------------------------------------------------------------------
// Questionnaire draft. This is the shape held in the form and persisted for
// save and resume. It is intentionally all optional: a talent can leave at any
// point and come back, so no field can be assumed present until submit.
// ---------------------------------------------------------------------------

export interface UniversalAnswers {
  legalName?: string
  stageName?: string
  email?: string
  phone?: string

  city?: string
  region?: string
  country?: string
  willingToTravel?: boolean
  travelRadiusKm?: number
  willingToRelocate?: boolean

  /** Private. Never shown to bookers. */
  dateOfBirth?: string
  presentsAgeMin?: number
  presentsAgeMax?: number

  genderIdentity?: string
  gendersPortrayable?: string[]
  ethnicity?: string[]
  ethnicitiesPortrayable?: string[]

  languages?: LanguageSkill[]
  accents?: string[]

  heightCm?: number
  build?: string

  unionStatus?: UnionStatus
  /** The un-repped signal. False here is the core market. */
  hasRepresentation?: boolean
  representationDetails?: string

  bookingTypes?: string[]
  rateMinCents?: number
  rateMaxCents?: number
  rateNotes?: string
  availability?: Availability

  socials?: Record<string, string>
}

export interface ActorAnswers {
  roleTypes?: string[]
  playsAgeMin?: number
  playsAgeMax?: number
  specialSkills?: string[]
  reelUrl?: string
  imdbUrl?: string
  comfortIntimate?: boolean
  comfortViolence?: boolean
  comfortNudity?: boolean
  comfortNotes?: string
  willSelfTape?: boolean
  performanceModes?: string[]
}

export interface InfluencerAnswers {
  platforms?: PlatformAccount[]
  niches?: string[]
  contentFormats?: string[]
  avgEngagementRate?: number
  audienceAgeRanges?: string[]
  audienceGenderSplit?: Record<string, number>
  audienceGeos?: string[]
  pastBrandPartnerships?: string[]
  deliverableRates?: DeliverableRate[]
}

export interface ModelAnswers {
  modelTypes?: string[]
  bustCm?: number
  waistCm?: number
  hipsCm?: number
  dressSize?: string
  suitSize?: string
  shoeSize?: string
  hairColor?: string
  eyeColor?: string
  runwayExperience?: boolean
  printExperience?: boolean
  agencyRepresentation?: string
  portfolioUrl?: string
  notableCredits?: string
  comfortSwimwear?: boolean
  comfortLingerie?: boolean
  comfortImplied?: boolean
  comfortNudity?: boolean
  comfortNotes?: string
}

export interface PerformerAnswers {
  disciplines?: string[]
  skills?: string[]
  specialties?: string[]
  /** Vertical specific credentials keyed by discipline (genre, league, medium...). */
  credentials?: Record<string, unknown>
  notableWork?: string
  mediaLinks?: string[]
}

export interface MediaAnswers {
  headshotPaths?: string[]
  portfolioPaths?: string[]
  reelUrl?: string
  resumePath?: string
}

export interface TermsAnswers {
  tier?: RepresentationTier
  agreedAgencyOfRecord?: boolean
  agreedCommission?: boolean
  agreedTermsVersion?: string
  agreedAt?: string
}

export interface QuestionnaireDraft {
  talentTypes: TalentTypeValue[]
  universal: UniversalAnswers
  actor: ActorAnswers
  influencer: InfluencerAnswers
  model: ModelAnswers
  performer: PerformerAnswers
  media: MediaAnswers
  terms: TermsAnswers

  completedSteps: string[]
  lastStep?: string
  updatedAt?: string
}

export const emptyDraft = (): QuestionnaireDraft => ({
  talentTypes: [],
  universal: {},
  actor: {},
  influencer: {},
  model: {},
  performer: {},
  media: {},
  terms: {},
  completedSteps: [],
})

// ---------------------------------------------------------------------------
// Booker search
// ---------------------------------------------------------------------------

/** Mirrors the search_talent() RPC signature. Keys are the p_* params minus prefix. */
export interface TalentSearchFilters {
  talentTypes?: TalentTypeValue[]
  ethnicitiesPortrayable?: string[]
  gendersPortrayable?: string[]
  languages?: string[]
  minFluency?: Fluency
  accents?: string[]
  playsAgeMin?: number
  playsAgeMax?: number
  city?: string
  includeTravelers?: boolean
  skills?: string[]
  niches?: string[]
  modelTypes?: string[]
  minFollowers?: number
  platform?: string
  unionStatus?: UnionStatus[]
  availability?: Availability[]
  bookingTypes?: string[]
  maxRateCents?: number
  unreppedOnly?: boolean
  heightMinCm?: number
  heightMaxCm?: number
  limit?: number
  offset?: number
}

export interface TalentSearchResult {
  profileId: string
  slug: string | null
  stageName: string | null
  talentTypes: TalentTypeValue[]
  city: string | null
  region: string | null
  country: string | null
  willingToTravel: boolean
  presentsAgeMin: number | null
  presentsAgeMax: number | null
  playsAgeMin: number | null
  playsAgeMax: number | null
  ethnicitiesPortrayable: string[]
  gendersPortrayable: string[]
  languages: string[]
  heightCm: number | null
  unionStatus: UnionStatus | null
  availability: Availability | null
  rateMinCents: number | null
  rateMaxCents: number | null
  totalReach: number
  primaryHeadshotPath: string | null
  identityVerification: VerificationStatus
  fitScore: number
  totalCount: number
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export interface Booking {
  id: string
  profileId: string
  bookerId: string
  projectName: string | null
  amountCents: number | null
  currency: string
  /** Snapshot at creation. Never recomputed from the profile's current tier. */
  commissionRatePct: number
  commissionAmountCents: number | null
  talentPayoutCents: number | null
  commissionStatus: CommissionStatus
  status: BookingStatus
  createdAt: string
}

/**
 * The platform's cut. Mirrors the generated column in 0003_media_and_bookings.sql
 * so the UI can preview a commission before the row exists. Rounds half away from
 * zero to match Postgres round(numeric), which JS Math.round does not do for .5
 * on negative values; amounts are non negative here so the two agree.
 */
export const commissionCents = (amountCents: number, ratePct: number): number =>
  Math.round((amountCents * ratePct) / 100)

export const payoutCents = (amountCents: number, ratePct: number): number =>
  amountCents - commissionCents(amountCents, ratePct)
