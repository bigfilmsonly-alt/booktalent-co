export interface FAQItem {
  question: string
  answer: string
}

/**
 * Answers describe policy and process, not results. Nothing here cites a campaign
 * metric, a client count, or a roster size, because BookTalent has not run the
 * campaigns those numbers would describe. Add them back as they become true.
 */
export const faqItems: FAQItem[] = [
  {
    question: "Why should I book through BookTalent instead of hiring talent directly?",
    answer: "Because we verify before you ever see a profile. Follower counts get inflated, credits get exaggerated, and a booker has no cheap way to check. We do that work first, then hand you one contract, one point of contact, and a production company that can shoot the thing if you want it shot.",
  },
  {
    question: "What does \"entertainment verified\" actually mean?",
    answer: "That we checked the claim before it reached you. A television credit, a film role, a runway show, a music release, a competition record, a following. Whatever the talent says they are, we confirm it against the source rather than taking their word for it.",
  },
  {
    question: "Do you only represent reality TV talent?",
    answer: "No. That is where we started and it is no longer the boundary. Actors, models, musicians, athletes, comedians, hosts, chefs, visual artists, and digital creators are all on the platform. Many are more than one of those at once, and the profile is built to capture that instead of flattening it.",
  },
  {
    question: "What if the talent cancels or does not deliver?",
    answer: "Every campaign includes a talent guarantee. If someone cancels or underperforms against the agreed brief, we substitute at no additional cost. Contracts are milestone based, so you approve work at each stage before the next one starts.",
  },
  {
    question: "How is BookTalent different from a traditional influencer agency?",
    answer: "Two things. We verify credentials rather than counting followers, so a working actor with 30K followers and a real credit is not filtered out by a metric that does not describe them. And we produce content in house through Big Films Only, so talent and production sit under one roof.",
  },
  {
    question: "How fast can you deliver a campaign?",
    answer: "Spark packages: 3 to 4 weeks. Ignite: 4 to 6 weeks. Primetime: 6 to 8 weeks. Live commerce events can activate in 7 to 10 days for existing clients.",
  },
  {
    question: "Who owns the content after the campaign?",
    answer: "You do. All Ignite and Primetime packages include full content ownership and whitelisted ad rights. Enterprise packages include perpetual usage rights.",
  },
  {
    question: "What size brands do you work with?",
    answer: "DTC startups use Spark packages starting at $15K. Mid market brands book Ignite at $50K. Fortune 500 companies run Enterprise partnerships at $500K annually.",
  },
  {
    question: "How do I know the audience metrics are real?",
    answer: "We require platform analytics access during onboarding and verify follower authenticity, engagement quality, and audience demographics. Every profile is reviewed by hand before it goes live to bookers, and anything that does not pass verification does not go up.",
  },
  {
    question: "What if I am not sure which package is right?",
    answer: "Book a free 20 minute discovery call. We will recommend talent, packages, and strategy based on your goals. No obligation.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer talent substitution guarantees. If deliverables do not meet the agreed brief, we reshoot. Contracts are milestone based so you approve work at each stage before the next phase begins.",
  },
  {
    question: "I am talent. What does it cost me?",
    answer: "Nothing to join. Build a profile, get found, get booked, and we take 10% when you book. If you never book, you never pay. Paid management tiers exist if you want active representation, but the default costs you nothing and most talent should start there.",
  },
  {
    question: "How do I get started?",
    answer: "Brands: submit a brief at booktalent.co/book for a proposal within two business days, or book a free discovery call at booktalent.co/schedule. Talent: build your profile at booktalent.co/apply. Either way, you hear from a real person.",
  },
]
