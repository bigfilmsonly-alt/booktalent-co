export interface CaseStudy {
  id: string
  brand: string
  talent: string
  packageType: string
  format: string
  narrative: string
  metrics: { value: string; label: string }[]
  testimonial?: { quote: string; name: string; role: string }
}

export const caseStudies: CaseStudy[] = [
  {
    id: "01",
    brand: "DTC Clean Beauty Brand",
    talent: "2 Television Verified Creators",
    packageType: "IGNITE PACKAGE",
    format: "TIKTOK + REELS",
    narrative:
      "A clean beauty DTC brand needed to break through a saturated market. Two television verified creators delivered 2.3M impressions in 14 days. The brand's site traffic tripled during the campaign window and their hero SKU sold out twice. Previous influencer partnerships across three agencies had not come close to these numbers.",
    metrics: [
      { value: "2.3M", label: "Impressions in 14 Days" },
      { value: "18.7%", label: "Engagement Rate" },
      { value: "4.8x", label: "Return on Ad Spend" },
    ],
    testimonial: {
      quote: "We spent $200K on influencer campaigns last year with three different agencies. This one campaign outperformed all of them combined.",
      name: "VP Marketing",
      role: "DTC Clean Beauty Brand",
    },
  },
  {
    id: "02",
    brand: "Premium Meal Kit Company",
    talent: "1 Competition Show Champion",
    packageType: "SPARK PACKAGE",
    format: "TIKTOK + YOUTUBE SHORTS",
    narrative:
      "A premium meal kit company wanted to reach food enthusiasts without the typical influencer feel. One competition show champion created three videos that drove 47K product page visits in 30 days. The content outperformed their in house creative by 6x on cost per click because audiences trust a face they have watched on television.",
    metrics: [
      { value: "850K", label: "Impressions" },
      { value: "12.4%", label: "Engagement Rate" },
      { value: "47K", label: "Product Page Visits" },
    ],
    testimonial: {
      quote: "One creator, three videos, and better results than our entire Q3 influencer budget. We have now booked four more campaigns.",
      name: "Head of Growth",
      role: "Premium Meal Kit Brand",
    },
  },
  {
    id: "03",
    brand: "National Athleisure Brand",
    talent: "5 Creators, 3 Franchises",
    packageType: "PRIMETIME PACKAGE",
    format: "MULTI PLATFORM",
    narrative:
      "An athleisure brand launching a new product line needed maximum visibility across demographics. Five creators from three different reality franchises drove a 340% lift in branded search over 90 days. The campaign generated over $1.2M in attributed revenue on a $75K spend.",
    metrics: [
      { value: "8.7M", label: "Total Impressions" },
      { value: "$1.2M", label: "Attributed Revenue" },
      { value: "340%", label: "Branded Search Lift" },
    ],
    testimonial: {
      quote: "The search lift alone justified the spend. Our brand awareness scores moved more in 90 days than they had in the previous two years.",
      name: "CMO",
      role: "National Athleisure Brand",
    },
  },
  {
    id: "04",
    brand: "Supplement Brand",
    talent: "12 Creators (Quarterly Roster)",
    packageType: "GROWTH UGC RETAINER",
    format: "$10K/MO RETAINER",
    narrative:
      "A supplement brand was spending $18 per CPM on traditional influencer UGC with inconsistent quality. Twelve television trained creators delivered sixty ad ready assets over six months, dropping their CPM to $4.50 while maintaining creative consistency. The assets are still running profitably nine months later.",
    metrics: [
      { value: "75%", label: "Lower CPM ($18 to $4.50)" },
      { value: "60", label: "Ad Ready Assets" },
      { value: "9mo+", label: "Still Running Profitably" },
    ],
    testimonial: {
      quote: "The content quality is night and day compared to what we were getting. These creators know how to perform on camera because they have done it professionally.",
      name: "Director of Paid Media",
      role: "Supplement Brand",
    },
  },
]
