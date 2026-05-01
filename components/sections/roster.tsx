"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TalentBookingModal } from "./talent-booking-modal"
import Link from "next/link"
import Image from "next/image"
import { talent } from "@/lib/talent-data"

const featured = talent.filter(t => t.tier === "Marquee").slice(0, 8)

export function Roster() {
  const [selectedTalent, setSelectedTalent] = useState<{
    name: string; credits: string; following: string; tags: string[]; image: string
  } | null>(null)

  return (
    <>
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
              {talent.length} verified creators with broadcast television credits. Browse the full roster.
            </motion.p>
          </div>

          {/* Talent grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-md lg:max-w-6xl mx-auto">
            {featured.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden border-2 border-mjcc-gold"
              >
                <Link
                  href={`/roster/${t.slug}`}
                  className="block w-full aspect-[3/4] relative overflow-hidden cursor-pointer"
                >
                  <Image
                    src={t.imageUrl}
                    alt={t.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-mjcc-gold/0 group-hover:bg-mjcc-gold/10 transition-colors duration-500" />

                  {/* Tier badge */}
                  <div className="absolute top-0 left-0 right-0 p-3 lg:p-4">
                    <span className="inline-block text-[9px] lg:text-[10px] text-mjcc-black bg-mjcc-gold/90 px-2 py-1 uppercase tracking-[0.15em] font-medium">
                      {t.tier}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                    <div className="flex items-center gap-2 mb-1">
                      {t.categories.slice(0, 2).map((cat) => (
                        <span key={cat} className="text-[9px] text-mjcc-gold/80 uppercase tracking-wider">{cat}</span>
                      ))}
                    </div>
                    <h3 className="font-serif text-lg lg:text-xl text-white leading-tight">{t.name}</h3>
                    <p className="text-[11px] text-white/85 mt-0.5 truncate">{t.genre}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-[11px] text-mjcc-gold">{t.totalFollowing}</span>
                      <span className="text-[10px] text-white/70 uppercase tracking-wider group-hover:text-mjcc-gold transition-colors">
                        Book Now
                      </span>
                    </div>
                  </div>
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
              VIEW FULL ROSTER ({talent.length} CREATORS)
            </Link>
          </motion.div>
        </div>
      </section>

      <TalentBookingModal
        talent={selectedTalent}
        onClose={() => setSelectedTalent(null)}
      />
    </>
  )
}
