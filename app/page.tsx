import { Hero } from "@/components/sections/hero"
import { WhyUs } from "@/components/sections/mjcc-difference"
import { ServicesOverview } from "@/components/sections/services-overview"

import { CaseStudy } from "@/components/sections/case-study"
import { HowItWorks } from "@/components/sections/how-it-works"
import { BrandInquiry } from "@/components/sections/brand-inquiry"
import { FAQSection } from "@/components/sections/faq-section"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="bg-mjcc-black min-h-screen pb-20 lg:pb-0">
      <Hero />
      <WhyUs />
      <CaseStudy />
      <ServicesOverview />
      <HowItWorks />
      <BrandInquiry />
      <FAQSection />
      <Footer />
    </main>
  )
}
