"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const serviceCards = [
  { number: "01", title: "Campaign Packages", description: "Multi-talent, multi-platform sponsored content campaigns.", price: "$15K – $250K", href: "/services/campaigns" },
  { number: "02", title: "Vertical Drama Production", description: "Original branded series produced by Big Films Only.", price: "$125K – $500K", href: "/services/production" },
  { number: "03", title: "Live Commerce", description: "Real-time shopping events on TikTok Shop, Amazon Live, Instagram.", price: "$12K – $150K", href: "/services/commerce" },
  { number: "04", title: "UGC Retainers", description: "Monthly retainers for whitelisted ad content at scale.", price: "$5K – $20K / month", href: "/services/ugc" },
  { number: "05", title: "Talent Management", description: "Three tiers of representation for verified reality TV creators.", price: "$0 – $1,500 / month", href: "/services/management" },
  { number: "06", title: "Enterprise Partnership", description: "The annual bundle. Roster, production, UGC, commerce, all in one.", price: "$500,000 / year", href: "/services/enterprise" },
]

export function ServicesOverview() {
  return (
    <section id="services" className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            Services
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            Six ways to book BookTalent.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-sm lg:text-base text-mjcc-muted leading-relaxed max-w-lg mx-auto"
          >
            From single-creator campaigns to year-long enterprise partnerships — every package is built around television-verified talent and production-grade content.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-md lg:max-w-5xl mx-auto">
          {serviceCards.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                href={card.href}
                className="block p-6 border border-mjcc-dark/50 hover:border-mjcc-gold/40 transition-all duration-300 group"
              >
                <span className="font-serif text-4xl text-mjcc-dark leading-none">{card.number}</span>
                <h3 className="font-serif text-lg lg:text-xl text-mjcc-cream mt-3">{card.title}</h3>
                <p className="text-sm text-mjcc-muted mt-2 leading-relaxed">{card.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-mono text-xs text-mjcc-gold">{card.price}</span>
                  <span className="text-[10px] text-mjcc-muted uppercase tracking-wider group-hover:text-mjcc-gold transition-colors">Learn More →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
