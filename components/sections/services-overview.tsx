"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const serviceCards = [
  { number: "01", title: "Campaign Packages", description: "Multi talent, multi platform sponsored content campaigns.", price: "$15K to $250K", href: "/services/campaigns", popular: true },
  { number: "02", title: "Vertical Drama Production", description: "Original branded series produced by Big Films Only.", price: "$125K to $500K", href: "/services/production", popular: false },
  { number: "03", title: "Live Commerce", description: "Real time shopping events on TikTok Shop, Amazon Live, Instagram.", price: "$12K to $150K", href: "/services/commerce", popular: false },
  { number: "04", title: "UGC Retainers", description: "Monthly retainers for whitelisted ad content at scale.", price: "$5K to $20K per month", href: "/services/ugc", popular: false },
  { number: "05", title: "Talent Management", description: "Three tiers of representation for verified reality TV creators.", price: "$0 to $1,500 per month", href: "/services/management", popular: false },
  { number: "06", title: "Not Sure Where to Start?", description: "Book a free 20 minute call. We will recommend the right service, talent, and budget for your goals.", price: "Free", href: "/schedule", popular: false, cta: true },
  { number: "07", title: "Enterprise Partnership", description: "The annual bundle. Roster, production, UGC, commerce, all in one.", price: "$500,000 per year", href: "/services/enterprise", enterprise: true },
]

export function ServicesOverview() {
  return (
    <section id="services" className="bg-mjcc-charcoal">

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
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            What we offer.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-sm lg:text-base text-mjcc-muted leading-relaxed max-w-lg mx-auto"
          >
            From single creator campaigns to year long enterprise partnerships. Every package is built around television verified talent and production grade content.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-md lg:max-w-5xl mx-auto">
          {serviceCards.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={card.enterprise ? "lg:col-span-2" : ""}
            >
              <Link
                href={card.href}
                className={`block p-6 border transition-all duration-300 group relative overflow-hidden ${
                  card.popular
                    ? "border-mjcc-gold/50 bg-mjcc-charcoal"
                    : card.enterprise
                      ? "border-mjcc-gold/30 bg-gradient-to-r from-mjcc-charcoal via-mjcc-charcoal to-mjcc-black"
                      : "border-mjcc-dark/50 hover:border-mjcc-gold/40"
                } ${card.enterprise ? "lg:p-10" : ""}`}
              >
                {/* Most Popular badge */}
                {card.popular && (
                  <span className="absolute top-0 right-0 bg-mjcc-gold text-mjcc-black text-[10px] font-medium tracking-wider px-3 py-1.5 uppercase">
                    Most Popular
                  </span>
                )}

                {/* Enterprise badge */}
                {card.enterprise && (
                  <span className="absolute top-0 right-0 bg-mjcc-gold/10 border border-mjcc-gold/30 text-mjcc-gold text-[10px] font-medium tracking-wider px-3 py-1.5 uppercase">
                    All Inclusive
                  </span>
                )}

                <h3 className={`font-serif text-mjcc-cream ${card.enterprise ? "text-xl lg:text-2xl" : "text-lg lg:text-xl"}`}>{card.title}</h3>
                <p className={`text-sm text-mjcc-muted mt-2 leading-relaxed ${card.enterprise ? "max-w-md" : ""}`}>{card.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className={`font-mono text-mjcc-gold ${card.enterprise ? "text-sm font-bold" : "text-xs"}`}>{card.price}</span>
                  <span className="text-[10px] text-mjcc-muted uppercase tracking-wider group-hover:text-mjcc-gold transition-colors">Learn More →</span>
                </div>

                {/* Gold left accent for popular */}
                {card.popular && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-mjcc-gold" />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
