"use client"

import { getServiceBySlug } from "@/lib/services-data"
import { ServicePageHeader } from "@/components/services/service-page-header"
import { TierCard } from "@/components/services/tier-card"
import { StickyBookingBar } from "@/components/services/sticky-booking-bar"
import { Footer } from "@/components/sections/footer"
import { motion } from "framer-motion"

const service = getServiceBySlug("commerce")!

export default function CommercePage() {
  return (
    <>
      <ServicePageHeader
        serviceNumber={service.number}
        title={service.title}
        description="Live shopping events with talent trained to sell on camera — on TikTok Shop, Amazon Live, and Instagram. From single events to year-long programs."
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
            Our talent sold on television before TikTok Shop existed. Camera-ready, conversion-proven, trained to sell live to millions.
          </motion.p>
        </div>
      </section>

      <Footer />
      <StickyBookingBar ctaLabel="Book Live Commerce" ctaHref="/book?service=commerce" />
    </>
  )
}
