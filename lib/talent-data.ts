export interface TalentProfile {
  slug: string
  name: string
  tagline: string
  credits: { show: string; network: string; seasons: string; role: string }[]
  following: string
  engagement: string
  networks: string[]
  specialties: string[]
  image: string
  talentId: string
  previousBrands?: string[]
}

export const talentRoster: TalentProfile[] = [
  {
    slug: "jasmine-rivera",
    name: "Jasmine Rivera",
    tagline: "Reality TV personality, beauty creator, mother of two.",
    credits: [
      { show: "Love & Hip Hop: Atlanta", network: "VH1", seasons: "3 Seasons", role: "Cast" },
    ],
    following: "1.2M",
    engagement: "4.8%",
    networks: ["VH1"],
    specialties: ["Beauty", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-001",
  },
  {
    slug: "marcus-cole",
    name: "Marcus Cole",
    tagline: "Comedian, fitness personality, content machine.",
    credits: [
      { show: "Wild 'N Out", network: "MTV", seasons: "2 Seasons", role: "Cast" },
    ],
    following: "850K",
    engagement: "5.2%",
    networks: ["MTV"],
    specialties: ["Comedy", "Fitness"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-002",
  },
  {
    slug: "tiffany-chen",
    name: "Tiffany Chen",
    tagline: "Chef, food content creator, cookbook author.",
    credits: [
      { show: "MasterChef", network: "Food Network", seasons: "4 Seasons", role: "Finalist" },
      { show: "Beat Bobby Flay", network: "Food Network", seasons: "2 Episodes", role: "Guest" },
    ],
    following: "2.1M",
    engagement: "6.1%",
    networks: ["Food Network", "NBC"],
    specialties: ["Food", "Comedy"],
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-003",
  },
  {
    slug: "deandre-williams",
    name: "DeAndre Williams",
    tagline: "Athlete turned reality star, fitness entrepreneur.",
    credits: [
      { show: "The Challenge", network: "MTV", seasons: "2 Seasons", role: "Cast" },
      { show: "Temptation Island", network: "USA Network", seasons: "1 Season", role: "Cast" },
    ],
    following: "680K",
    engagement: "4.3%",
    networks: ["MTV", "USA Network"],
    specialties: ["Fitness", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-004",
  },
  {
    slug: "kayla-monroe",
    name: "Kayla Monroe",
    tagline: "TV personality, lifestyle blogger, parenting advocate.",
    credits: [
      { show: "Love & Marriage: Huntsville", network: "OWN", seasons: "3 Seasons", role: "Cast" },
      { show: "Christmas Cookie Challenge", network: "Hallmark", seasons: "1 Season", role: "Guest" },
    ],
    following: "1.5M",
    engagement: "5.7%",
    networks: ["OWN", "Hallmark"],
    specialties: ["Parenting", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-005",
  },
  {
    slug: "andre-pierre",
    name: "Chef Andre Pierre",
    tagline: "Celebrity chef, food entertainer, live commerce natural.",
    credits: [
      { show: "Chopped", network: "Food Network", seasons: "2 Seasons", role: "Champion" },
      { show: "Top Chef", network: "Bravo", seasons: "1 Season", role: "Contestant" },
    ],
    following: "920K",
    engagement: "5.9%",
    networks: ["Food Network", "Bravo"],
    specialties: ["Food", "Comedy"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-006",
  },
  {
    slug: "brianna-scott",
    name: "Brianna Scott",
    tagline: "Fashion-forward TV personality, style influencer.",
    credits: [
      { show: "The Real Housewives of Atlanta", network: "Bravo", seasons: "2 Seasons", role: "Friend Of" },
      { show: "College Hill", network: "BET", seasons: "1 Season", role: "Cast" },
    ],
    following: "1.8M",
    engagement: "4.5%",
    networks: ["Bravo", "BET"],
    specialties: ["Fashion", "Drama"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-007",
  },
  {
    slug: "tyler-jordan",
    name: "Tyler Jordan",
    tagline: "Adventure seeker, travel content creator, model.",
    credits: [
      { show: "Are You The One?", network: "MTV", seasons: "1 Season", role: "Cast" },
    ],
    following: "420K",
    engagement: "6.8%",
    networks: ["MTV"],
    specialties: ["Fitness", "Travel"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-008",
  },
  {
    slug: "nina-patel",
    name: "Nina Patel",
    tagline: "Culinary artist, wellness advocate, storyteller.",
    credits: [
      { show: "Top Chef", network: "Bravo", seasons: "2 Seasons", role: "Contestant" },
      { show: "The Great American Recipe", network: "NBC", seasons: "1 Season", role: "Finalist" },
    ],
    following: "750K",
    engagement: "5.4%",
    networks: ["Bravo", "NBC"],
    specialties: ["Food", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-009",
  },
  {
    slug: "chris-jackson",
    name: "Chris Jackson",
    tagline: "Music producer, reality TV veteran, brand collaborator.",
    credits: [
      { show: "Black Ink Crew", network: "VH1", seasons: "3 Seasons", role: "Cast" },
      { show: "Love & Hip Hop: New York", network: "VH1", seasons: "1 Season", role: "Featured" },
    ],
    following: "1.1M",
    engagement: "4.1%",
    networks: ["VH1"],
    specialties: ["Music", "Comedy"],
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-010",
  },
  {
    slug: "serena-woods",
    name: "Serena Woods",
    tagline: "TV star, beauty mogul, brand ambassador.",
    credits: [
      { show: "Basketball Wives", network: "VH1", seasons: "2 Seasons", role: "Cast" },
      { show: "Hollywood Exes", network: "VH1", seasons: "1 Season", role: "Guest" },
    ],
    following: "2.3M",
    engagement: "3.9%",
    networks: ["VH1"],
    specialties: ["Beauty", "Fashion"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-011",
  },
  {
    slug: "david-okafor",
    name: "David Okafor",
    tagline: "Adventure athlete, motivational speaker, fitness creator.",
    credits: [
      { show: "Survivor", network: "CBS", seasons: "1 Season", role: "Cast" },
      { show: "American Ninja Warrior", network: "NBC", seasons: "2 Episodes", role: "Contestant" },
    ],
    following: "380K",
    engagement: "7.2%",
    networks: ["CBS", "NBC"],
    specialties: ["Fitness", "Travel"],
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&h=600&fit=crop&crop=face&q=80",
    talentId: "BT-012",
  },
]

export function getTalentBySlug(slug: string): TalentProfile | undefined {
  return talentRoster.find((t) => t.slug === slug)
}
