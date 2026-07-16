/**
 * The executive bench.
 *
 * `published` is the only gate. A person renders on the site if and only if it is
 * true, which must mean they have personally agreed to be named as part of
 * BookTalent. A verbal "I'll help you launch" is not that agreement: naming a real
 * executive on a live commercial site is a public claim that they endorse this
 * company, and it is the first thing a serious booker will check. Get it in writing,
 * then flip the flag.
 *
 * Titles describe what someone actually is. An advisor is an advisor. Do not let a
 * layout tempt you into promoting anyone to founder or operator.
 */

export interface Leader {
  name: string
  title: string
  /** What they are to BookTalent specifically. Kept separate from `title`, which is their standing in the industry. */
  role: string
  bio: string
  initials: string
  imageUrl?: string
  published: boolean
  /** Why an unpublished entry is unpublished. Internal only, never rendered. */
  pendingReason?: string
}

export const leadership: Leader[] = [
  {
    name: "Jotham Hall",
    title: "Co-Founder and CEO",
    role: "founder",
    initials: "JH",
    bio: "Fifteen years producing entertainment across MTV, Bravo, Food Network, VH1, BET, NBC, Hallmark, and USA Network. More than 100 shows produced. Founder of Big Films Only, the production arm behind every BookTalent campaign.",
    published: true,
  },
  {
    name: "Mira",
    title: "Co-Founder and Talent Director",
    role: "founder",
    initials: "M",
    bio: "Fifteen years placing and managing talent across the entertainment industry. The relationship behind every name BookTalent represents, and the standard every profile is verified against.",
    published: true,
  },
  {
    name: "Alan Mruvka",
    title: "Co-Founder, E! Entertainment Television",
    role: "advisor",
    initials: "AM",
    bio: "Co-founded the network that defined modern celebrity culture. Advising BookTalent on launch, industry access, and the partnerships that put talent in front of the people who book.",
    published: false,
    pendingReason:
      "Jotham says Alan is going to advise on launch. That is an intention, not written permission to publish his name and E! title on a live commercial site. Those are different consents. Flip `published` to true once he has confirmed in writing.",
  },
]

/** Only ever iterate this. Never render the raw array. */
export const publishedLeadership = (): Leader[] => leadership.filter((l) => l.published)

export const hasPendingLeaders = (): boolean => leadership.some((l) => !l.published)

/**
 * Partner logos, talent stories, and booking stats go here as they become real.
 * The section that reads this renders nothing while it is empty, rather than
 * shipping grey placeholder boxes that read as an unfinished site.
 */
export interface Proof {
  kind: "partner" | "story" | "stat"
  label: string
  value?: string
  detail?: string
}

export const proof: Proof[] = []

/**
 * Facts about BookTalent that are true today. These are credentials, not results:
 * no campaign metrics, no roster counts, nothing that describes work that has not
 * happened. Add results here only once they exist.
 */
export const credentials = [
  { value: "15+", label: "Years in entertainment" },
  { value: "100+", label: "Reality shows produced" },
  { value: "10", label: "Talent verticals" },
  { value: "$0", label: "Cost to join" },
]
