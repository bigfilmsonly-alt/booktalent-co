"use client"

import { getServiceBySlug } from "@/lib/services-data"
import { ServicePageHeader } from "@/components/services/service-page-header"
import { TierCard } from "@/components/services/tier-card"
import { StickyBookingBar } from "@/components/services/sticky-booking-bar"
import { Footer } from "@/components/sections/footer"
import { motion } from "framer-motion"

const service = getServiceBySlug("management")!

export default function ManagementPage() {
  return (
    <>
      <ServicePageHeader
        serviceNumber={service.number}
        title={service.title}
        description="Three tiers of representation for verified reality TV creators — from emerging talent to marquee names. Dedicated management, brand matching, and career strategy."
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
            We don&apos;t just manage talent — we book them. Every creator gets access to our brand pipeline, production capabilities, and 15 years of industry relationships.
          </motion.p>
        </div>
      </section>

      <Footer />
      <StickyBookingBar ctaLabel="Apply for Management" ctaHref="/book?service=management" />
    </>
  )
}
