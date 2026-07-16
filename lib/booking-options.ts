/**
 * Booking brief options. Single source so the brands page and anything downstream
 * cannot drift apart on what a service or a budget band is called.
 *
 * Every one of these is optional on the form. The only things actually required to
 * send a brief are who you need and an email, because that is genuinely all we need
 * to start work. Making a booker classify their own project before we have shown them
 * anything is our filing problem, not theirs.
 */

export const SERVICE_OPTIONS = [
  { value: "campaigns", label: "Campaign Package", desc: "Spark, Ignite, Primetime" },
  { value: "production", label: "Vertical Drama Production", desc: "Branded series by Big Films Only" },
  { value: "commerce", label: "Live Commerce Event", desc: "TikTok Shop, Amazon Live, Instagram" },
  { value: "ugc", label: "UGC Content Retainer", desc: "Monthly whitelisted ad content" },
  { value: "live-stream", label: "Live Streaming", desc: "Twitch, YouTube Live, Instagram Live" },
  { value: "podcast", label: "Podcast", desc: "Guest appearances and hosted episodes" },
  { value: "event", label: "Event or Appearance", desc: "Hosting, panels, activations, red carpet" },
  { value: "brand-ambassador", label: "Brand Ambassador", desc: "Longer term, multi deliverable" },
  { value: "enterprise", label: "Enterprise Partnership", desc: "Full annual bundle" },
  { value: "unsure", label: "Not sure yet", desc: "Help me decide" },
] as const

export const BUDGET_OPTIONS = [
  "Under $10K",
  "$10K to $25K",
  "$25K to $50K",
  "$50K to $100K",
  "$100K to $250K",
  "$250K to $500K",
  "$500K+",
  "Not sure yet",
] as const

export const TIMELINE_OPTIONS = [
  "Immediate",
  "1 to 2 months",
  "3 to 6 months",
  "Ongoing",
  "Just exploring",
] as const
