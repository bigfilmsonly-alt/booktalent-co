"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TalentBookingModal } from "./talent-booking-modal"
import Link from "next/link"

const talents = [
  { id: "01", initials: "JA", stageName: "Jasmine A.", credits: "VH1 · 3 Seasons", following: "1.2M followers", tags: ["Beauty", "Lifestyle"], slug: "jasmine-rivera" },
  { id: "02", initials: "MK", stageName: "Marcus K.", credits: "BRAVO · BET · 2 Seasons", following: "850K followers", tags: ["Fashion", "Drama"], slug: "marcus-cole" },
  { id: "03", initials: "DR", stageName: "Diana R.", credits: "FOOD NETWORK · NBC · 4 Seasons", following: "2.1M followers", tags: ["Food", "Comedy"], slug: "tiffany-chen" },
  { id: "04", initials: "TS", stageName: "Tyler S.", credits: "MTV · USA · 2 Seasons", following: "680K followers", tags: ["Fitness", "Lifestyle"], slug: "deandre-williams" },
  { id: "05", initials: "LW", stageName: "Lena W.", credits: "VH1 · HALLMARK · 3 Seasons", following: "1.5M followers", tags: ["Parenting", "Lifestyle"], slug: "kayla-monroe" },
  { id: "06", initials: "BC", stageName: "Brandon C.", credits: "FOOD NETWORK · BRAVO · 2 Seasons", following: "920K followers", tags: ["Music", "Comedy"], slug: "chef-andre" },
]

export function Roster() {
  const [selectedTalent, setSelectedTalent] = useState<{
    name: string; credits: string; following: string; tags: string[]; image: string
  } | null>(null)

  return (
    <>
      <section id="roster" className="bg-mjcc-black">
        <div className="gold-divider" />

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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
            >
              Television-verified. Ready to book.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 text-xs text-mjcc-muted italic max-w-sm mx-auto"
            >
              Roster preview — individual talent profiles unlock for qualified brand inquiries.
            </motion.p>
          </div>

          {/* Talent grid — placeholder cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 max-w-md lg:max-w-5xl mx-auto">
            {talents.map((talent, i) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="border border-mjcc-dark/50 hover:border-mjcc-gold/40 transition-all duration-300 overflow-hidden"
              >
                {/* Placeholder gradient with initials */}
                <button
                  onClick={() => setSelectedTalent({
                    name: talent.stageName,
                    credits: talent.credits,
                    following: talent.following,
                    tags: talent.tags,
                    image: "",
                  })}
                  className="w-full aspect-square bg-gradient-to-br from-mjcc-charcoal to-mjcc-dark flex items-center justify-center cursor-pointer"
                >
                  <span className="font-serif text-6xl lg:text-7xl text-mjcc-cream/20">{talent.initials}</span>
                </button>

                <div className="p-4">
                  <p className="text-[10px] text-mjcc-muted uppercase tracking-[2px]">TALENT {talent.id}</p>
                  <h3 className="font-serif text-lg text-mjcc-cream mt-1">{talent.stageName}</h3>
                  <p className="text-xs text-mjcc-muted mt-1">{talent.credits}</p>
                  <p className="font-mono text-xs text-mjcc-cream/80 mt-2">{talent.following}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {talent.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-mjcc-muted/60 border border-mjcc-dark/50 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                  <Link href={`/roster/${talent.slug}`} className="block mt-3 text-[11px] text-mjcc-gold uppercase tracking-[2px] hover:text-mjcc-gold-hover transition-colors">
                    View Profile →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <Link
              href="/roster"
              className="inline-flex items-center justify-center border border-mjcc-gold/40 text-mjcc-gold px-8 py-4 text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px]"
            >
              VIEW FULL ROSTER
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
