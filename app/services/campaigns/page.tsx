"use client"

import { getServiceBySlug } from "@/lib/services-data"
import { ServicePageHeader } from "@/components/services/service-page-header"
import { TierCard } from "@/components/services/tier-card"
import { StickyBookingBar } from "@/components/services/sticky-booking-bar"
import { Footer } from "@/components/sections/footer"
import { motion } from "framer-motion"

const service = getServiceBySlug("campaigns")!

export default function CampaignsPage() {
  return (
    <>
      <ServicePageHeader
        serviceNumber={service.number}
        title={service.title}
        description="Multi talent, multi platform content campaigns built around television verified creators. Three tiers, from testing the waters to full scale enterprise activations."
      />

      <div className="gold-divider" />

      {/* Tier cards */}
      <section className="px-6 lg:px-12 py-12 lg:py-16">
        <div className="max-w-md lg:max-w-6xl mx-auto space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          {service.tiers.map((tier, i) => (
            <TierCard key={tier.name} {...tier} index={i} />
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="px-6 lg:px-12 py-12 lg:py-16">
        <div className="max-w-md mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-mjcc-muted leading-relaxed"
          >
            Every creator in our campaigns has confirmed broadcast television credits. No bought followers. No fake engagement. Your brand gets proven performers, not algorithm lottery picks.
          </motion.p>
        </div>
      </section>

      <Footer />
      <StickyBookingBar ctaLabel="Book a Campaign" ctaHref="/book?service=campaigns" />
    </>
  )
}
