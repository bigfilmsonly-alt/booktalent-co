"use client"

import { motion } from "framer-motion"
import { services } from "@/lib/services-data"
import { ServiceCard } from "@/components/services/service-card"
import { Footer } from "@/components/sections/footer"

export default function ServicesHub() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 lg:px-12 pt-8 lg:pt-24 pb-6 lg:pb-12">
        <div className="max-w-md lg:max-w-3xl mx-auto">
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
            className="font-serif text-[28px] sm:text-3xl lg:text-5xl text-mjcc-cream leading-[1.1] tracking-tight"
          >
            Six ways to book talent.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 lg:mt-4 text-sm lg:text-base text-mjcc-muted leading-relaxed lg:max-w-lg"
          >
            From single creator campaigns to enterprise partnerships. Every package built around television verified talent.
          </motion.p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Service cards */}
      <section className="px-6 lg:px-12 py-6 lg:py-12">
        <div className="max-w-md lg:max-w-5xl mx-auto space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
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
