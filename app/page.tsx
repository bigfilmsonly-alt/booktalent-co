import { Hero } from "@/components/sections/hero"
import { WhyUs } from "@/components/sections/mjcc-difference"
import { StatsSection } from "@/components/sections/stats-section"
import { Leadership } from "@/components/sections/leadership"
import { RosterPreview } from "@/components/sections/roster-preview"
import { CaseStudy } from "@/components/sections/case-study"
import { ServicesOverview } from "@/components/sections/services-overview"
import { HowItWorks } from "@/components/sections/how-it-works"
import { BrandInquiry } from "@/components/sections/brand-inquiry"
import { EnterpriseCallout } from "@/components/sections/enterprise-callout"
import { ForTalentTiers } from "@/components/sections/for-talent-tiers"
import { FAQSection } from "@/components/sections/faq-section"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="bg-mjcc-black min-h-screen pb-20 lg:pb-0">
      <Hero />
      <WhyUs />
      <StatsSection />
      <Leadership />
      <RosterPreview />
      <CaseStudy />
      <ServicesOverview />
      <HowItWorks />
      <BrandInquiry />
      <EnterpriseCallout />
      <ForTalentTiers />
      <FAQSection />
      <Footer />
    </main>
  )
}
