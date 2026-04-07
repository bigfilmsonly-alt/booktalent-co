"use client"

import { getServiceBySlug } from "@/lib/services-data"
import { ServicePageHeader } from "@/components/services/service-page-header"
import { TierCard } from "@/components/services/tier-card"
import { StickyBookingBar } from "@/components/services/sticky-booking-bar"
import { Footer } from "@/components/sections/footer"
import { motion } from "framer-motion"

const service = getServiceBySlug("ugc")!

export default function UGCPage() {
  return (
    <>
      <ServicePageHeader
        serviceNumber={service.number}
        title={service.title}
        description="Monthly content retainers for whitelisted ad creative at scale. Television-quality UGC from verified creators, delivered on a cadence."
      />

      <div className="gold-divider" />

      {/* Tier cards */}
      <section className="px-6 py-12">
        <div className="max-w-md mx-auto space-y-6">
          {service.tiers.map((tier, i) => (
            <TierCard key={tier.name} {...tier} index={i} />
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="px-6 py-12">
        <div className="max-w-md mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-mjcc-muted leading-relaxed"
          >
            UGC from creators with real television training and real audiences — not stock-quality content from anonymous accounts.
          </motion.p>
        </div>
      </section>

      <Footer />
      <StickyBookingBar ctaLabel="Start a Retainer" ctaHref="/book?service=ugc" />
    </>
  )
}
