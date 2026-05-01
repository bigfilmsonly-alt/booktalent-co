"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { demoRoster } from "@/lib/demo-roster"

const featured = demoRoster.slice(0, 8)

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

export function Roster() {
  return (
    <section id="roster" className="bg-mjcc-charcoal">
      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            The Roster
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            Television verified. Ready to book.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-xs text-mjcc-muted italic max-w-sm mx-auto"
          >
            Verified creators with broadcast television credits. Browse the full roster.
          </motion.p>
        </div>

        {/* Talent grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-md lg:max-w-6xl mx-auto">
          {featured.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Link
                href="/book"
                className="block aspect-[3/4] bg-mjcc-black border border-mjcc-gold/30 hover:border-mjcc-gold transition-all duration-300 flex flex-col items-center justify-center p-4 relative"
              >
                {/* Tier badge */}
                <span className="absolute top-3 left-3 text-[9px] lg:text-[10px] text-mjcc-gold bg-mjcc-gold/10 px-2 py-1 uppercase tracking-[0.15em]">
                  {t.tier}
                </span>

                {/* Initials */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-mjcc-gold/10 border border-mjcc-gold/30 flex items-center justify-center mb-4 text-lg lg:text-xl font-medium text-mjcc-gold">
                  {getInitials(t.name)}
                </div>

                <h3 className="font-serif text-base lg:text-lg text-mjcc-cream leading-tight text-center">{t.name}</h3>
                <p className="text-[10px] text-mjcc-muted mt-1 text-center">{t.genre}</p>
                <span className="font-mono text-[11px] text-mjcc-gold mt-2">{t.following}</span>
                <span className="text-[9px] text-mjcc-gold uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Book Now
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-center"
        >
          <Link
            href="/roster"
            className="inline-flex items-center justify-center border border-mjcc-gold/40 text-mjcc-gold px-8 py-4 text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px] cta-button"
          >
            VIEW FULL ROSTER
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
