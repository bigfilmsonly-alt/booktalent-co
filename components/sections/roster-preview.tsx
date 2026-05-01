"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const rosterPreview = [
  { name: 'Bella Poarch', tier: 'Marquee', genre: 'Music, Fashion, Viral Content', following: '104M+' },
  { name: 'Ian Somerhalder', tier: 'Marquee', genre: 'Acting, Wellness, Clean Living', following: '25.5M+' },
  { name: 'Gypsy Rose Blanchard', tier: 'Marquee', genre: 'Lifestyle, True Crime, Advocacy', following: '15.7M+' },
  { name: 'Nicole "Snooki" Polizzi', tier: 'Core', genre: 'Reality TV, Lifestyle, Mom Life', following: '17.2M+' },
  { name: 'Nikki Bella', tier: 'Core', genre: 'Fitness, Beauty, Entertainment', following: '13.1M+' },
  { name: 'Kat Von D', tier: 'Marquee', genre: 'Fashion, Tattoo, Agriculture', following: '10M+' },
  { name: 'John Stamos', tier: 'Marquee', genre: 'Actor, Music, Family', following: '9M+' },
  { name: 'Christina Milian', tier: 'Marquee', genre: 'Actress, Beauty, Food, Music', following: '8.5M+' },
]

function getInitials(name: string) {
  return name.replace(/["]/g, '').split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

export function RosterPreview() {
  return (
    <section className="bg-mjcc-charcoal">
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
            Names you recognize. Results you can book.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-sm text-mjcc-muted max-w-md mx-auto"
          >
            74 verified creators with confirmed broadcast television credits. Here are a few.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-md lg:max-w-5xl mx-auto">
          {rosterPreview.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 100px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/book?talent=${t.name}`}
                className="block bg-mjcc-black border border-mjcc-gold/20 hover:border-mjcc-gold/60 transition-all duration-300 group"
              >
                <div className="aspect-[3/4] flex flex-col items-center justify-center p-4 relative">
                  {/* Tier */}
                  <span className={`absolute top-2 left-2 text-[8px] lg:text-[9px] px-2 py-0.5 uppercase tracking-[0.12em] ${
                    t.tier === 'Marquee' ? 'bg-mjcc-gold/15 text-mjcc-gold' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {t.tier}
                  </span>

                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-mjcc-gold/10 border border-mjcc-gold/30 flex items-center justify-center mb-3 text-base lg:text-lg font-medium text-mjcc-gold">
                    {getInitials(t.name)}
                  </div>

                  <h3 className="font-serif text-sm lg:text-base text-mjcc-cream leading-tight text-center">{t.name}</h3>
                  <p className="text-[10px] text-mjcc-muted mt-1 text-center truncate w-full px-2">{t.genre}</p>
                  <span className="font-mono text-[11px] text-mjcc-gold mt-2">{t.following}</span>
                  <span className="text-[9px] text-mjcc-gold uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Book Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/apply"
            className="inline-flex items-center justify-center border border-mjcc-gold/40 text-mjcc-gold px-8 py-4 text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px] cta-button"
          >
            VIEW FULL ROSTER
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
