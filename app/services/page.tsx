"use client"

import { motion } from "framer-motion"
import { services } from "@/lib/services-data"
import { ServiceCard } from "@/components/services/service-card"
import { Footer } from "@/components/sections/footer"

export default function ServicesHub() {
  return (
    <>
      {/* Hero — compact so cards are immediately visible */}
      <section className="px-6 pt-8 pb-6">
        <div className="max-w-md mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-3"
          >
            What We Offer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[28px] sm:text-3xl text-mjcc-cream leading-[1.1] tracking-tight"
          >
            Six ways to book talent.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-sm text-mjcc-muted leading-relaxed"
          >
            From single-creator campaigns to enterprise partnerships — every package built around television-verified talent.
          </motion.p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Service cards — tight spacing, all visible fast */}
      <section className="px-6 py-6">
        <div className="max-w-md mx-auto space-y-3">
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              number={service.number}
              title={service.title}
              description={service.description}
              priceRange={service.priceRange}
              href={`/services/${service.slug}`}
              index={i}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
