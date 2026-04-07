"use client"

import { getServiceBySlug } from "@/lib/services-data"
import { ServicePageHeader } from "@/components/services/service-page-header"
import { TierCard } from "@/components/services/tier-card"
import { StickyBookingBar } from "@/components/services/sticky-booking-bar"
import { Footer } from "@/components/sections/footer"
import { motion } from "framer-motion"

const service = getServiceBySlug("production")!

export default function ProductionPage() {
  return (
    <>
      <ServicePageHeader
        serviceNumber={service.number}
        title={service.title}
        description="Original branded vertical drama series. 6 to 12 episodes, 2 to 5 minutes each. Produced by Big Films Only, starring cast from our roster. Your brand is integrated into the storyline, not bolted on as an ad."
      />

      <div className="gold-divider" />

      {/* Sponsorship models */}
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
            No other talent agency in the creator economy also has a production company under the same roof. Scripted reality meets branded entertainment. Tentpole content nobody else can create.
          </motion.p>
        </div>
      </section>

      <Footer />
      <StickyBookingBar ctaLabel="Discuss Production" ctaHref="/book?service=production" />
    </>
  )
}
