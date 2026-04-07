"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TalentBookingModal } from "./talent-booking-modal"

const talents = [
  {
    name: "TALENT 01",
    credits: "VH1 · MTV · 3 Seasons",
    following: "1.2M+",
    tags: ["Beauty", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=750&fit=crop&crop=face&q=80",
  },
  {
    name: "TALENT 02",
    credits: "BRAVO · BET · 2 Seasons",
    following: "850K+",
    tags: ["Fashion", "Drama"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=750&fit=crop&crop=face&q=80",
  },
  {
    name: "TALENT 03",
    credits: "FOOD NETWORK · NBC · 4 Seasons",
    following: "2.1M+",
    tags: ["Food", "Comedy"],
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=750&fit=crop&crop=face&q=80",
  },
  {
    name: "TALENT 04",
    credits: "MTV · USA NETWORK · 2 Seasons",
    following: "680K+",
    tags: ["Fitness", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1618151313441-bc79b11e5090?w=600&h=750&fit=crop&crop=face&q=80",
  },
  {
    name: "TALENT 05",
    credits: "VH1 · HALLMARK · 3 Seasons",
    following: "1.5M+",
    tags: ["Parenting", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=750&fit=crop&crop=face&q=80",
  },
  {
    name: "TALENT 06",
    credits: "FOOD NETWORK · BRAVO · 2 Seasons",
    following: "920K+",
    tags: ["Music", "Comedy"],
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=750&fit=crop&crop=face&q=80",
  },
]

export function Roster() {
  const [selectedTalent, setSelectedTalent] = useState<typeof talents[number] | null>(null)

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
              Roster Preview
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
            >
              Available talent.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 text-sm text-mjcc-muted max-w-xs mx-auto"
            >
              Tap a talent card to book them for your campaign.
            </motion.p>
          </div>

          {/* Talent grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 max-w-md lg:max-w-5xl mx-auto">
            {talents.map((talent, i) => (
              <motion.button
                key={talent.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onClick={() => setSelectedTalent(talent)}
                className="bg-mjcc-charcoal overflow-hidden text-left active:scale-[0.97] transition-transform duration-150"
              >
                <div className="aspect-[4/5] bg-mjcc-dark relative overflow-hidden">
                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-[10px] text-mjcc-gold font-mono tracking-wider">
                      BOOK NOW
                    </span>
                  </div>
                </div>

                <div className="p-3 text-center">
                  <h3 className="text-mjcc-cream font-medium tracking-wide text-sm">{talent.name}</h3>
                  <p className="mt-1 text-[10px] text-mjcc-muted">{talent.credits}</p>
                  <p className="mt-1 text-mjcc-gold font-mono text-xs">{talent.following}</p>
                  <div className="mt-2 flex flex-wrap justify-center gap-1">
                    {talent.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-mjcc-muted/60 border border-mjcc-dark/50 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <a
              href="/book"
              className="inline-flex items-center justify-center border border-mjcc-gold/40 text-mjcc-gold px-8 py-4 text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px]"
            >
              REQUEST FULL ROSTER
            </a>
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
