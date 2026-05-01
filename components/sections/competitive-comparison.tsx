"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const comparisons = [
  {
    feature: "Talent Vetting",
    booktalent: "Broadcast television credits verified. Network standards and practices cleared.",
    others: "Self reported follower counts. No background checks.",
  },
  {
    feature: "Audience Verification",
    booktalent: "Platform analytics access required. Follower authenticity audited. Personally vetted roster.",
    others: "Take the creator's word for it. Bots and bought followers common.",
  },
  {
    feature: "Content Quality",
    booktalent: "Television trained. Understands marks, lighting, scripts, deadlines.",
    others: "Phone and ring light. Inconsistent quality across deliverables.",
  },
  {
    feature: "Brand Safety",
    booktalent: "Cleared network standards and practices. Continuously monitored.",
    others: "Hope for the best. React after the damage is done.",
  },
  {
    feature: "Production",
    booktalent: "In house production company (Big Films Only). Concept to delivery.",
    others: "Outsource to freelancers. You manage the process.",
  },
  {
    feature: "Guarantee",
    booktalent: "Talent substitution guarantee. Milestone based approval.",
    others: "No guarantees. Pay upfront and hope.",
  },
]

export function CompetitiveComparison() {
  return (
    <section className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-md lg:max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
            >
              The Difference
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl lg:text-4xl text-mjcc-cream leading-tight"
            >
              92% of influencers have inflated follower counts.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-sm text-mjcc-muted max-w-xs lg:max-w-lg mx-auto"
            >
              Television verified creators set a new standard. Here is what separates BookTalent from every other agency in this space.
            </motion.p>
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-mjcc-dark"
          >
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-mjcc-dark">
              <div className="p-3 lg:p-4" />
              <div className="p-3 lg:p-4 border-l border-mjcc-dark bg-mjcc-gold/5">
                <p className="text-xs font-medium text-mjcc-gold uppercase tracking-wider">BookTalent</p>
              </div>
              <div className="p-3 lg:p-4 border-l border-mjcc-dark">
                <p className="text-xs font-medium text-mjcc-muted uppercase tracking-wider">Other Agencies</p>
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 ${i < comparisons.length - 1 ? "border-b border-mjcc-dark" : ""}`}>
                <div className="p-3 lg:p-4">
                  <p className="text-xs font-medium text-mjcc-cream">{row.feature}</p>
                </div>
                <div className="p-3 lg:p-4 border-l border-mjcc-dark bg-mjcc-gold/5">
                  <p className="text-xs text-mjcc-cream leading-relaxed">{row.booktalent}</p>
                </div>
                <div className="p-3 lg:p-4 border-l border-mjcc-dark">
                  <p className="text-xs text-mjcc-muted leading-relaxed">{row.others}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-center"
          >
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors min-h-[48px]"
            >
              BOOK VERIFIED TALENT
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
