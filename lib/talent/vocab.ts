/**
 * Canonical option lists for the talent questionnaire.
 *
 * This file is the single source of truth for every multi select in the product.
 * The questionnaire renders from it and the booker search filters render from it,
 * so the two can never drift into offering different vocabularies for the same
 * field. The DB stores these as text[] rather than enums precisely so this list
 * can grow without a migration.
 */

/**
 * Order is deliberate. Reality leads because it is the one vertical BookTalent has
 * actually earned: 100+ reality shows produced, real network relationships, a real
 * production arm. Everything below it is a credible offer; reality is a track record.
 * This list drives both the homepage chips and the questionnaire's first question,
 * so the order is the priority signal in both places.
 */
export const TALENT_TYPES = [
  { value: "reality", label: "Reality TV", hint: "Competition, docuseries, franchise" },
  { value: "actor", label: "Actor", hint: "Film, television, theater, commercial" },
  { value: "influencer", label: "Influencer / Creator", hint: "Social platforms, UGC, brand content" },
  { value: "model", label: "Model", hint: "Fashion, commercial, editorial, fitness" },
  { value: "musician", label: "Musician", hint: "Recording artist, DJ, producer" },
  { value: "athlete", label: "Athlete", hint: "Professional, Olympic, collegiate" },
  { value: "comedian", label: "Comedian", hint: "Stand up, sketch, improv" },
  { value: "host", label: "Host", hint: "Television, podcast, live events" },
  { value: "chef", label: "Chef / Food", hint: "Culinary, cookbook, food content" },
  { value: "visual_artist", label: "Visual Artist", hint: "Paint, sculpt, tattoo, photo" },
  { value: "other", label: "Other Performer", hint: "Dancer, voice, variety, specialty" },
] as const

export type TalentTypeValue = (typeof TALENT_TYPES)[number]["value"]

/**
 * Which conditional sections a given set of types unlocks. A person who checks
 * Actor and Model sees both sections; the four section keys map 1:1 to the
 * talent_*_details tables.
 */
export const SECTION_FOR_TYPE: Record<TalentTypeValue, "actor" | "influencer" | "model" | "performer"> = {
  actor: "actor",
  influencer: "influencer",
  model: "model",
  musician: "performer",
  reality: "performer",
  athlete: "performer",
  comedian: "performer",
  host: "performer",
  chef: "performer",
  visual_artist: "performer",
  other: "performer",
}

// ---------------------------------------------------------------------------
// Universal
// ---------------------------------------------------------------------------

export const GENDER_IDENTITIES = [
  "Woman", "Man", "Non binary", "Transgender woman", "Transgender man",
  "Genderfluid", "Agender", "Prefer to self describe", "Prefer not to say",
]

/** Kept separate from identity: what a booker can cast you as. */
export const GENDER_PRESENTATIONS = ["Woman", "Man", "Non binary", "Androgynous"]

/**
 * Ethnicity vocabulary. Used for two distinct questions: what you are, and what
 * you can authentically portray. A Filipino performer may credibly read as Latino
 * or Pacific Islander, and casting searches the portrayable set, not the identity.
 */
export const ETHNICITIES = [
  "Black / African descent", "White / European descent", "Latino / Hispanic",
  "East Asian", "South Asian", "Southeast Asian", "Filipino",
  "Middle Eastern / North African", "Native American / Indigenous",
  "Pacific Islander", "Caribbean", "Mixed / Multiracial",
]

export const LANGUAGES = [
  "English", "Spanish", "Mandarin", "Cantonese", "French", "German", "Italian",
  "Portuguese", "Russian", "Arabic", "Hindi", "Urdu", "Bengali", "Punjabi",
  "Japanese", "Korean", "Vietnamese", "Tagalog", "Thai", "Polish", "Dutch",
  "Greek", "Hebrew", "Turkish", "Swahili", "American Sign Language",
]

export const FLUENCY_LEVELS = [
  { value: "native", label: "Native" },
  { value: "fluent", label: "Fluent" },
  { value: "conversational", label: "Conversational" },
  { value: "basic", label: "Basic" },
] as const

export const ACCENTS = [
  "General American", "New York", "Southern American", "Boston", "Midwestern",
  "Received Pronunciation", "Cockney", "Northern English", "Scottish", "Irish",
  "Welsh", "Australian", "New Zealand", "South African", "French", "German",
  "Italian", "Spanish", "Mexican", "Argentine", "Brazilian", "Russian",
  "Indian", "Middle Eastern", "Caribbean", "Nigerian", "Jamaican",
]

export const BUILDS = [
  "Slim", "Athletic", "Average", "Muscular", "Curvy", "Plus", "Petite", "Tall",
]

export const UNION_STATUSES = [
  { value: "sag_aftra", label: "SAG-AFTRA member" },
  { value: "sag_eligible", label: "SAG eligible" },
  { value: "aea", label: "Actors' Equity (AEA)" },
  { value: "non_union", label: "Non union" },
  { value: "other", label: "Other union" },
] as const

export const BOOKING_TYPES = [
  { value: "paid", label: "Paid bookings", hint: "Standard rate work" },
  { value: "collab", label: "Collaborations", hint: "Revenue share or mutual promo" },
  { value: "ugc", label: "UGC", hint: "Content for a brand to run as ads" },
  { value: "trade", label: "Trade", hint: "Product or service in exchange" },
] as const

export const AVAILABILITY = [
  { value: "full_time", label: "Full time", hint: "Available for extended bookings" },
  { value: "weekends", label: "Weekends", hint: "Weekend work only" },
  { value: "project_based", label: "Project based", hint: "Around other commitments" },
  { value: "limited", label: "Limited", hint: "Selective, case by case" },
] as const

// ---------------------------------------------------------------------------
// Actor
// ---------------------------------------------------------------------------

export const ACTOR_ROLE_TYPES = [
  "Lead", "Supporting", "Character", "Comedic", "Dramatic", "Action",
  "Romantic", "Villain", "Ensemble", "Guest star", "Background",
]

export const ACTOR_SPECIAL_SKILLS = [
  "Stage combat", "Stunts", "Horseback riding", "Firearms handling", "Swordplay",
  "Martial arts", "Dance: ballet", "Dance: hip hop", "Dance: ballroom", "Dance: tap",
  "Singing", "Improv", "Motion capture", "Teleprompter", "Swimming", "Skiing",
  "Snowboarding", "Surfing", "Skateboarding", "Gymnastics", "Yoga", "Boxing",
  "Driving: manual", "Driving: motorcycle", "Piano", "Guitar", "Drums", "Violin",
  "Puppetry", "Magic", "Juggling", "Sign language",
]

export const PERFORMANCE_MODES = [
  { value: "on_camera", label: "On camera" },
  { value: "voice", label: "Voice only" },
  { value: "both", label: "Both" },
] as const

// ---------------------------------------------------------------------------
// Influencer / Creator
// ---------------------------------------------------------------------------

export const PLATFORMS = [
  "Instagram", "TikTok", "YouTube", "X", "Twitch", "Facebook",
  "LinkedIn", "Pinterest", "Snapchat", "Substack", "Podcast",
]

export const CONTENT_NICHES = [
  "Beauty", "Fashion", "Fitness", "Food", "Comedy", "Gaming", "Lifestyle",
  "Finance", "Travel", "Parenting", "Home", "Tech", "Music", "Sports",
  "Wellness", "Business", "Education", "Pets", "Automotive", "Art", "LGBTQ+",
]

export const CONTENT_FORMATS = [
  "Short video", "Long video", "Photo", "Live", "UGC for brands",
  "Podcast", "Newsletter", "Stream", "Blog",
]

export const AUDIENCE_AGE_RANGES = ["13-17", "18-24", "25-34", "35-44", "45-54", "55+"]

export const DELIVERABLE_TYPES = [
  "Instagram post", "Instagram reel", "Instagram story", "TikTok video",
  "YouTube integration", "YouTube dedicated", "UGC package", "Live appearance",
  "Event appearance", "Whitelisting rights", "Usage rights extension",
]

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

export const MODEL_TYPES = [
  "Fashion / Runway", "Commercial", "Editorial", "Fitness", "Promotional",
  "Hand / Parts", "Plus", "Petite", "Catalog / E-commerce", "Swimwear",
  "Lingerie", "Beauty", "Fine art",
]

export const HAIR_COLORS = ["Black", "Brown", "Blonde", "Red", "Auburn", "Grey", "White", "Dyed / Other"]
export const EYE_COLORS = ["Brown", "Blue", "Green", "Hazel", "Grey", "Amber"]

// ---------------------------------------------------------------------------
// Other performer
// ---------------------------------------------------------------------------

export const PERFORMER_DISCIPLINES = [
  "Host", "Musician", "Singer", "DJ", "Producer", "Dancer", "Voice actor",
  "Comedian", "Chef", "Visual artist", "Athlete", "Magician", "Circus / Variety",
  "Speaker", "Podcaster", "Drag performer",
]

export const MUSIC_GENRES = [
  "Pop", "R&B / Soul", "Hip hop / Rap", "Country", "Rock", "Electronic",
  "Latin", "K-pop", "Indie / Alternative", "Gospel", "Jazz", "Classical",
  "Reggae", "Afrobeats", "Metal", "Folk",
]

export const ART_MEDIUMS = [
  "Painting", "Sculpture", "Photography", "Tattoo", "Murals", "Mixed media",
  "Digital art", "Illustration", "Ceramics", "Street art",
]

export const CULINARY_BACKGROUNDS = [
  "Culinary school trained", "Restaurant chef", "Cookbook author",
  "Food content creator", "Competition show contestant", "Private chef",
  "Catering", "Pastry", "Sommelier / Beverage",
]

// ---------------------------------------------------------------------------
// Representation tiers
// ---------------------------------------------------------------------------

export const REPRESENTATION_TIERS = [
  {
    value: "marketplace",
    label: "Marketplace",
    price: "Free",
    commission: 10,
    summary: "Build a profile, get found, get booked. We take 10% when you book. Nothing otherwise.",
    isDefault: true,
  },
  {
    value: "rising",
    label: "Rising",
    price: "$750 / month",
    commission: 25,
    summary: "Career development and portfolio building for emerging talent.",
    isDefault: false,
  },
  {
    value: "core",
    label: "Core",
    price: "$1,500 / month",
    commission: 20,
    summary: "Dedicated management and active brand outreach on your behalf.",
    isDefault: false,
  },
  {
    value: "marquee",
    label: "Marquee",
    price: "Free",
    commission: 20,
    summary: "Invitation only. Priority brand matching for headline talent.",
    isDefault: false,
  },
] as const

/** The commission every marketplace booking is struck at. */
export const DEFAULT_COMMISSION_PCT = 10
export const TERMS_VERSION = "2026-07-16"
