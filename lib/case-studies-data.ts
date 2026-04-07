export interface CaseStudy {
  id: string
  brand: string
  talent: string
  packageType: string
  format: string
  narrative: string
  metrics: { value: string; label: string }[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: "01",
    brand: "The Beauty Brand",
    talent: "The Beauty Creator",
    packageType: "IGNITE PACKAGE",
    format: "TIKTOK + REELS",
    narrative:
      "How a major beauty brand reached 2.3M millennial women in 14 days using three television-verified creators.",
    metrics: [
      { value: "2.3M", label: "Impressions" },
      { value: "18.7%", label: "Engagement" },
      { value: "4.8x", label: "ROAS" },
    ],
  },
  {
    id: "02",
    brand: "The Food Brand",
    talent: "The Cooking Talent",
    packageType: "SPARK PACKAGE",
    format: "TIKTOK + YOUTUBE SHORTS",
    narrative:
      "From a single creator post to 47K product page visits in 30 days — proof that one verified voice outperforms ten unvetted ones.",
    metrics: [
      { value: "850K", label: "Impressions" },
      { value: "12.4%", label: "Engagement" },
      { value: "47K", label: "Link Clicks" },
    ],
  },
  {
    id: "03",
    brand: "The Fashion Brand",
    talent: "The Crossover Roster",
    packageType: "PRIMETIME PACKAGE",
    format: "MULTI-PLATFORM",
    narrative:
      "How five creators from three different reality franchises drove a 340% lift in branded search over 90 days.",
    metrics: [
      { value: "8.7M", label: "Impressions" },
      { value: "22%", label: "Engagement" },
      { value: "340%", label: "Search Lift" },
    ],
  },
  {
    id: "04",
    brand: "The Wellness Brand",
    talent: "Quarterly UGC Roster",
    packageType: "GROWTH UGC RETAINER",
    format: "$10K/MO RETAINER",
    narrative:
      "Twelve creators, sixty videos, and a 4x reduction in CPM — the result of pairing ad-ready UGC with television-trained talent.",
    metrics: [
      { value: "4x", label: "Lower CPM" },
      { value: "60", label: "Ad-Ready Assets" },
      { value: "6mo", label: "Partnership" },
    ],
  },
]
