/**
 * Natural language search parsing.
 *
 * A booker types how they talk: "black actor, male", "asian comedian in LA",
 * "latina who plays 20-30 and speaks spanish". This turns that into the structured
 * filters search_talent() takes.
 *
 * The important call: "looking for a black actor" is a casting brief, not a census
 * question. It means someone who reads as Black on camera, so ethnicity terms map to
 * `ethnicitiesPortrayable`, never to `ethnicity`. That is the whole reason those are
 * two separate fields. A Filipino performer who can credibly play Latino should
 * surface for "latino", and would not if we matched on identity.
 *
 * Everything here is deterministic and testable. No model call, no embedding, no
 * network. A booker gets an answer in the same keystroke.
 */

import type { TalentSearchFilters } from "./types"
import type { TalentTypeValue } from "./vocab"

// ---------------------------------------------------------------------------
// Vocabularies. Keys are what people type; values are what the DB stores.
// ---------------------------------------------------------------------------

const ETHNICITY_SYNONYMS: Record<string, string[]> = {
  black: ["Black / African descent"],
  african: ["Black / African descent"],
  "african american": ["Black / African descent"],
  aa: ["Black / African descent"],
  white: ["White / European descent"],
  caucasian: ["White / European descent"],
  european: ["White / European descent"],
  latino: ["Latino / Hispanic"],
  latina: ["Latino / Hispanic"],
  latinx: ["Latino / Hispanic"],
  hispanic: ["Latino / Hispanic"],
  mexican: ["Latino / Hispanic"],
  // "asian" is broad in casting briefs. Match every Asian bucket rather than
  // guessing which one they meant and silently dropping the rest.
  asian: ["East Asian", "South Asian", "Southeast Asian", "Filipino"],
  "east asian": ["East Asian"],
  chinese: ["East Asian"],
  japanese: ["East Asian"],
  korean: ["East Asian"],
  "south asian": ["South Asian"],
  indian: ["South Asian"],
  pakistani: ["South Asian"],
  "southeast asian": ["Southeast Asian"],
  vietnamese: ["Southeast Asian"],
  thai: ["Southeast Asian"],
  filipino: ["Filipino"],
  filipina: ["Filipino"],
  "middle eastern": ["Middle Eastern / North African"],
  arab: ["Middle Eastern / North African"],
  mena: ["Middle Eastern / North African"],
  "north african": ["Middle Eastern / North African"],
  "native american": ["Native American / Indigenous"],
  indigenous: ["Native American / Indigenous"],
  "pacific islander": ["Pacific Islander"],
  polynesian: ["Pacific Islander"],
  samoan: ["Pacific Islander"],
  hawaiian: ["Pacific Islander"],
  caribbean: ["Caribbean"],
  jamaican: ["Caribbean"],
  mixed: ["Mixed / Multiracial"],
  biracial: ["Mixed / Multiracial"],
  multiracial: ["Mixed / Multiracial"],
  ambiguous: ["Mixed / Multiracial"],
  "racially ambiguous": ["Mixed / Multiracial"],
}

const GENDER_SYNONYMS: Record<string, string[]> = {
  male: ["Man"],
  man: ["Man"],
  men: ["Man"],
  guy: ["Man"],
  guys: ["Man"],
  female: ["Woman"],
  woman: ["Woman"],
  women: ["Woman"],
  girl: ["Woman"],
  girls: ["Woman"],
  "non binary": ["Non binary"],
  nonbinary: ["Non binary"],
  enby: ["Non binary"],
  androgynous: ["Androgynous"],
}

/**
 * Gendered role nouns. "actress" carries both the type and the gender, and a booker
 * who types it means both. Handled before the plain type list so the gender is not lost.
 */
const GENDERED_TYPE_TERMS: Record<string, { type: TalentTypeValue; gender: string }> = {
  actress: { type: "actor", gender: "Woman" },
  actresses: { type: "actor", gender: "Woman" },
  hostess: { type: "host", gender: "Woman" },
  comedienne: { type: "comedian", gender: "Woman" },
}

const TYPE_SYNONYMS: Record<string, TalentTypeValue> = {
  actor: "actor", actors: "actor", acting: "actor", thespian: "actor",
  model: "model", models: "model", modeling: "model", modelling: "model",
  influencer: "influencer", influencers: "influencer", creator: "influencer",
  creators: "influencer", ugc: "influencer", "content creator": "influencer",
  musician: "musician", musicians: "musician", artist: "musician",
  singer: "musician", rapper: "musician", dj: "musician", band: "musician",
  "reality star": "reality", "reality tv": "reality", reality: "reality",
  "reality personality": "reality", housewife: "reality", "reality stars": "reality",
  athlete: "athlete", athletes: "athlete", sports: "athlete", player: "athlete",
  comedian: "comedian", comedians: "comedian", "stand up": "comedian",
  standup: "comedian", "comic": "comedian",
  host: "host", hosts: "host", presenter: "host", emcee: "host", mc: "host",
  chef: "chef", chefs: "chef", cook: "chef", baker: "chef",
  "visual artist": "visual_artist", painter: "visual_artist",
  photographer: "visual_artist", "tattoo artist": "visual_artist",
  dancer: "other", "voice actor": "other", "voice over": "other",
}

/** Content niches. "fitness" is a niche, not a talent type. */
const NICHE_SYNONYMS: Record<string, string[]> = {
  fitness: ["Fitness"], gym: ["Fitness"], workout: ["Fitness"],
  beauty: ["Beauty"], makeup: ["Beauty"], skincare: ["Beauty"],
  fashion: ["Fashion"], style: ["Fashion"],
  food: ["Food"], cooking: ["Food"], recipe: ["Food"],
  comedy: ["Comedy"], funny: ["Comedy"], humor: ["Comedy"],
  gaming: ["Gaming"], gamer: ["Gaming"],
  lifestyle: ["Lifestyle"], travel: ["Travel"], finance: ["Finance"],
  parenting: ["Parenting"], mom: ["Parenting"], "mom life": ["Parenting"],
  tech: ["Tech"], wellness: ["Wellness"], business: ["Business"],
  music: ["Music"], sports: ["Sports"], art: ["Art"], pets: ["Pets"],
  lgbtq: ["LGBTQ+"], queer: ["LGBTQ+"],
}

const LANGUAGES_LOWER: Record<string, string> = {
  english: "English", spanish: "Spanish", mandarin: "Mandarin",
  cantonese: "Cantonese", french: "French", german: "German",
  italian: "Italian", portuguese: "Portuguese", russian: "Russian",
  arabic: "Arabic", hindi: "Hindi", urdu: "Urdu", bengali: "Bengali",
  punjabi: "Punjabi", japanese: "Japanese", korean: "Korean",
  vietnamese: "Vietnamese", tagalog: "Tagalog", thai: "Thai",
  polish: "Polish", dutch: "Dutch", greek: "Greek", hebrew: "Hebrew",
  turkish: "Turkish", swahili: "Swahili", asl: "American Sign Language",
  "sign language": "American Sign Language",
}

/** Common shorthands a booker types for markets. */
const CITY_ALIASES: Record<string, string> = {
  la: "Los Angeles", "l.a.": "Los Angeles", "los angeles": "Los Angeles",
  nyc: "New York", ny: "New York", "new york": "New York",
  miami: "Miami", atlanta: "Atlanta", atl: "Atlanta", chicago: "Chicago",
  houston: "Houston", dallas: "Dallas", austin: "Austin", nashville: "Nashville",
  vegas: "Las Vegas", "las vegas": "Las Vegas", london: "London",
  toronto: "Toronto", "san francisco": "San Francisco", sf: "San Francisco",
  seattle: "Seattle", denver: "Denver", phoenix: "Phoenix", boston: "Boston",
  philadelphia: "Philadelphia", orlando: "Orlando", "san diego": "San Diego",
}

export interface ParsedQuery {
  filters: TalentSearchFilters
  /** What we understood, for rendering back as removable chips. */
  understood: { field: string; label: string; values: string[] }[]
  /** Words we could not place. Shown so a booker knows what was ignored. */
  unmatched: string[]
}

const STOPWORDS = new Set([
  "a","an","the","and","or","for","with","who","that","looking","need","want",
  "find","me","some","any","is","are","can","in","on","at","of","to","from",
  "based","near","around","around","plays","play","speaks","speak","speaking",
  "comfortable","years","year","old","aged","age","talent","someone","people",
  "person","preferably","ideally","must","should","be","being","i","we","our",
  "her","his","their","them","they","she","he","its","this","was","has","have",
  "looking","seeking","searching","show","list","get","give","pull","up","all",
]);

/** Longest-first so "east asian" wins over "asian" and "reality star" over "reality". */
const sortedKeys = (o: Record<string, unknown>) =>
  Object.keys(o).sort((a, b) => b.length - a.length)

export function parseQuery(raw: string): ParsedQuery {
  const q = ` ${raw.toLowerCase().replace(/[^\w\s+.-]/g, " ").replace(/\s+/g, " ").trim()} `
  const filters: TalentSearchFilters = {}
  const understood: ParsedQuery["understood"] = []
  let consumed = q

  const take = (phrase: string) => {
    // Word-boundary match so "man" does not fire inside "mandarin".
    const re = new RegExp(`\\s${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s`, "g")
    if (!re.test(consumed)) return false
    consumed = consumed.replace(new RegExp(`\\s${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s`, "g"), " ")
    return true
  }

  const push = (field: string, label: string, values: string[]) => {
    const hit = understood.find((u) => u.field === field)
    if (hit) hit.values = [...new Set([...hit.values, ...values])]
    else understood.push({ field, label, values })
  }

  // --- Age ranges. Run first: they contain digits the other passes ignore. ---
  const ageRange = consumed.match(/\s(\d{1,2})\s*(?:-|to|thru|through)\s*(\d{1,2})\s/)
  if (ageRange) {
    const lo = Number(ageRange[1]), hi = Number(ageRange[2])
    if (lo <= hi && hi <= 120) {
      filters.playsAgeMin = lo
      filters.playsAgeMax = hi
      push("age", "Plays age", [`${lo} to ${hi}`])
      consumed = consumed.replace(ageRange[0], " ")
    }
  } else {
    // "in their 20s", "30s"
    const decade = consumed.match(/\s(\d{1,2})s\s/)
    if (decade) {
      const d = Number(decade[1])
      if (d >= 10 && d <= 90) {
        filters.playsAgeMin = d
        filters.playsAgeMax = d + 9
        push("age", "Plays age", [`${d} to ${d + 9}`])
        consumed = consumed.replace(decade[0], " ")
      }
    }
  }

  // --- Follower thresholds: "500k followers", "over 1m", "1m+" ---
  const followers = consumed.match(/\s(?:over|above|at least|min|minimum)?\s*(\d+(?:\.\d+)?)\s*([km])\+?\s*(?:followers?|following|reach)?\s/)
  if (followers && /[km]/.test(followers[2])) {
    const n = Number(followers[1]) * (followers[2] === "m" ? 1_000_000 : 1_000)
    filters.minFollowers = n
    push("reach", "Min reach", [n.toLocaleString()])
    consumed = consumed.replace(followers[0], " ")
  }

  // --- Gendered role nouns before plain types, so "actress" keeps its gender. ---
  for (const k of sortedKeys(GENDERED_TYPE_TERMS)) {
    if (take(k)) {
      const { type, gender } = GENDERED_TYPE_TERMS[k]
      filters.talentTypes = [...new Set([...(filters.talentTypes ?? []), type])]
      filters.gendersPortrayable = [...new Set([...(filters.gendersPortrayable ?? []), gender])]
      push("type", "Type", [type])
      push("gender", "Presents as", [gender])
    }
  }

  // --- Languages: check before ethnicity so "spanish" reads as a language when
  //     paired with a speak verb, and as neither otherwise. ---
  for (const k of sortedKeys(LANGUAGES_LOWER)) {
    const speaks = new RegExp(`\\s(?:speaks?|speaking|fluent in|bilingual)\\s+(?:\\w+\\s+)?${k}\\s`).test(consumed)
    if (speaks && take(k)) {
      filters.languages = [...new Set([...(filters.languages ?? []), LANGUAGES_LOWER[k]])]
      push("language", "Speaks", [LANGUAGES_LOWER[k]])
    }
  }

  // --- Ethnicity -> ethnicitiesPortrayable (casting intent, not identity) ---
  for (const k of sortedKeys(ETHNICITY_SYNONYMS)) {
    if (take(k)) {
      filters.ethnicitiesPortrayable = [
        ...new Set([...(filters.ethnicitiesPortrayable ?? []), ...ETHNICITY_SYNONYMS[k]]),
      ]
      push("ethnicity", "Can portray", ETHNICITY_SYNONYMS[k])
    }
  }

  // --- Gender ---
  for (const k of sortedKeys(GENDER_SYNONYMS)) {
    if (take(k)) {
      filters.gendersPortrayable = [
        ...new Set([...(filters.gendersPortrayable ?? []), ...GENDER_SYNONYMS[k]]),
      ]
      push("gender", "Presents as", GENDER_SYNONYMS[k])
    }
  }

  // --- Talent type ---
  for (const k of sortedKeys(TYPE_SYNONYMS)) {
    if (take(k)) {
      filters.talentTypes = [...new Set([...(filters.talentTypes ?? []), TYPE_SYNONYMS[k]])]
      push("type", "Type", [TYPE_SYNONYMS[k]])
    }
  }

  // --- City ---
  for (const k of sortedKeys(CITY_ALIASES)) {
    if (take(k)) {
      filters.city = CITY_ALIASES[k]
      filters.includeTravelers = true
      push("city", "In or will travel to", [CITY_ALIASES[k]])
      break
    }
  }

  // --- Niches. Last, because several overlap with types ("comedy"/"comedian",
  //     "music"/"musician") and the more specific type should win. ---
  for (const k of sortedKeys(NICHE_SYNONYMS)) {
    if (take(k)) {
      filters.niches = [...new Set([...(filters.niches ?? []), ...NICHE_SYNONYMS[k]])]
      push("niche", "Niche", NICHE_SYNONYMS[k])
    }
  }

  // --- Remaining language mentions with no speak verb ("spanish speaking" handled
  //     above; a bare "spanish" after ethnicity parsing is a language). ---
  for (const k of sortedKeys(LANGUAGES_LOWER)) {
    if (take(k)) {
      filters.languages = [...new Set([...(filters.languages ?? []), LANGUAGES_LOWER[k]])]
      push("language", "Speaks", [LANGUAGES_LOWER[k]])
    }
  }

  const unmatched = consumed
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && !STOPWORDS.has(w) && !/^\d+$/.test(w))

  return { filters, understood, unmatched }
}

/** Human readable summary of what a search will actually do. */
export function describeFilters(p: ParsedQuery): string {
  if (p.understood.length === 0) return "Everyone"
  return p.understood.map((u) => `${u.label}: ${u.values.join(", ")}`).join(" · ")
}
