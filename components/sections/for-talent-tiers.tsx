"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const tiers = [
  { name: 'Marquee', following: '500K+ followers', detail: 'No monthly fee. 20% commission. Priority brand matching.' },
  { name: 'Core', following: '100K to 500K followers', detail: '$1,500 per month. 20% commission. Dedicated management.' },
  { name: 'Rising', following: '25K to 100K followers', detail: '$750 per month. 25% commission. Career development.' },
]

export function ForTalentTiers() {
  return (
    <section className="bg-mjcc-charcoal border-t border-mjcc-dark">
      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            For Talent
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight mb-4"
          >
            Are you a verified TV personality?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15px] text-mjcc-muted leading-relaxed max-w-md mx-auto mb-12"
          >
            Join the BookTalent roster. Premium brand partnerships. Production company support. Full talent management.
          </motion.p>

          {/* Tier cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto mb-12">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border border-mjcc-dark bg-mjcc-black p-6 text-center hover:border-mjcc-gold/40 transition-colors"
              >
                <h3 className="font-serif text-xl text-mjcc-cream mb-2">{tier.name}</h3>
                <p className="text-xs text-mjcc-gold font-medium tracking-wider mb-4">{tier.following}</p>
                <p className="text-sm text-mjcc-muted leading-relaxed">{tier.detail}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link
              href="/apply"
              className="cta-button inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-10 py-4 text-sm font-medium tracking-[0.15em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[52px]"
            >
              APPLY TO THE ROSTER
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
