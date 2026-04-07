import { Hero } from "@/components/sections/hero"
import { CredibilityBar } from "@/components/sections/credibility-bar"
import { WhyUs } from "@/components/sections/mjcc-difference"
import { ForTalent } from "@/components/sections/for-talent"
import { ForBrands } from "@/components/sections/for-brands"
import { Roster } from "@/components/sections/roster"
import { HowItWorks } from "@/components/sections/how-it-works"
import { CaseStudy } from "@/components/sections/case-study"
import { StatsQuote } from "@/components/sections/only-at-mjcc"
import { Leadership } from "@/components/sections/leadership"
import { TalentApplication } from "@/components/sections/talent-application"
import { BrandInquiry } from "@/components/sections/brand-inquiry"
import { BrandPartnership } from "@/components/sections/brand-partnership"
import { MediaKit } from "@/components/sections/media-kit"
import { FAQSection } from "@/components/sections/faq-section"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="bg-mjcc-black min-h-screen pb-20">
      <Hero />
      <CredibilityBar />
      <WhyUs />
      <ForTalent />
      <ForBrands />
      <Roster />
      <HowItWorks />
      <CaseStudy />
      <StatsQuote />
      <Leadership />
      <TalentApplication />
      <BrandInquiry />
      <BrandPartnership />
      <MediaKit />
      <FAQSection />
      <Footer />
    </main>
  )
}
