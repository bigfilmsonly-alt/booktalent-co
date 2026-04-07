"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ServicePageHeader } from "@/components/services/service-page-header"
import { StickyBookingBar } from "@/components/services/sticky-booking-bar"
import { Footer } from "@/components/sections/footer"

const bundleItems = [
  { component: "Exclusive Roster Access", detail: "Priority access to 10 creators for 12 months", value: "$120,000" },
  { component: "Branded Vertical Drama", detail: "1 series (8–12 episodes) by Big Films Only", value: "$250,000" },
  { component: "UGC Content Retainer", detail: "30 pieces/month for 12 months", value: "$240,000" },
  { component: "Live Commerce Series", detail: "4 quarterly events with 3 talent each", value: "$60,000" },
  { component: "Campaign Management", detail: "Dedicated manager, quarterly strategy, monthly reporting", value: "$48,000" },
]

export default function EnterprisePage() {
  return (
    <>
      <ServicePageHeader
        serviceNumber="06"
        title="Enterprise Partnership"
        description="The annual bundle. Everything Book Talent offers — roster access, production, UGC, live commerce, dedicated management — locked in at one price for 12 months."
      />

      <div className="gold-divider" />

      {/* Pricing hero */}
      <section className="px-6 py-12">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-mjcc-gold p-8"
          >
            <p className="text-xs text-mjcc-muted uppercase tracking-wider mb-2">Annual Partnership</p>
            <span className="font-mono text-4xl text-mjcc-gold font-bold">$500,000</span>
            <p className="mt-2 text-sm text-mjcc-muted">12 months — save $218K vs. standalone pricing</p>
          </motion.div>
        </div>
      </section>

      {/* What's included */}
      <section className="px-6 py-12">
        <div className="max-w-md mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6 text-center"
          >
            What&apos;s Included
          </motion.p>

          <div className="space-y-0">
            {bundleItems.map((item, i) => (
              <motion.div
                key={item.component}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="py-5 border-b border-mjcc-dark/40"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm text-mjcc-cream font-medium">{item.component}</h3>
                  <span className="font-mono text-xs text-mjcc-gold shrink-0 ml-4">{item.value}</span>
                </div>
                <p className="text-xs text-mjcc-muted">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Totals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span className="text-mjcc-muted">Standalone total</span>
              <span className="font-mono text-mjcc-muted line-through">$718,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-mjcc-cream font-medium">Annual Partnership</span>
              <span className="font-mono text-mjcc-gold font-bold">$500,000</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Best fit */}
      <section className="px-6 py-12">
        <div className="max-w-md mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6 text-center"
          >
            Best Fit
          </motion.p>

          <ul className="space-y-3">
            {[
              "Brands spending $1M+ annually on creator marketing",
              "VPs of Marketing or CMOs with $500K+ budget authority",
              "Brands launching new products or wanting tentpole moments",
              "Brands burned by unvetted influencers who want guaranteed quality",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="text-sm text-mjcc-muted leading-relaxed flex gap-2"
              >
                <span className="text-mjcc-gold/50 shrink-0">—</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12">
        <div className="max-w-md mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl text-mjcc-cream mb-6"
          >
            Ready to partner?
          </motion.h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/book?service=enterprise"
              className="block text-center py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 min-h-[48px] flex items-center justify-center"
            >
              SCHEDULE ENTERPRISE CALL
            </Link>
            <Link
              href="mailto:partnerships@booktalent.co"
              className="block text-center py-4 border border-mjcc-gold/40 text-mjcc-gold text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px] flex items-center justify-center"
            >
              EMAIL OUR TEAM
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <StickyBookingBar ctaLabel="Schedule Enterprise Call" ctaHref="/book?service=enterprise" />
    </>
  )
}
