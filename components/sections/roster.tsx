"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TalentBookingModal } from "./talent-booking-modal"
import Link from "next/link"

const talents = [
  { id: "01", initials: "SV", stageName: "Sofia Valentina", credits: "BRAVO · 4 Seasons", following: "2.1M followers", tags: ["Fashion", "Lifestyle"], slug: "sofia-valentina", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face&q=80", category: "Fashion & Lifestyle" },
  { id: "02", initials: "KM", stageName: "Kai Mitchell", credits: "NBC · USA · 3 Seasons", following: "1.8M followers", tags: ["Fitness", "Wellness"], slug: "kai-mitchell", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=800&fit=crop&crop=face&q=80", category: "Fitness & Yoga" },
  { id: "03", initials: "DC", stageName: "Darius Cole", credits: "MTV · E! · 2 Seasons", following: "1.4M followers", tags: ["Fashion", "Drama"], slug: "darius-cole", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face&q=80", category: "Fashion & Lifestyle" },
  { id: "04", initials: "AN", stageName: "Amara Ndiaye", credits: "OWN · HALLMARK · 2 Seasons", following: "1.5M followers", tags: ["Beauty", "Skincare"], slug: "amara-ndiaye", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop&crop=face&q=80", category: "Beauty & Skincare" },
  { id: "05", initials: "ML", stageName: "Mei Lin Zhang", credits: "NBC · E! · 4 Seasons", following: "2.3M followers", tags: ["Fashion", "Beauty"], slug: "mei-lin-zhang", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face&q=80", category: "Fashion & Lifestyle" },
  { id: "06", initials: "JR", stageName: "Jordan Reed", credits: "MTV · CBS · 3 Seasons", following: "920K followers", tags: ["Comedy", "Entertainment"], slug: "jordan-reed", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&h=800&fit=crop&crop=face&q=80", category: "Comedy & Entertainment" },
  { id: "07", initials: "CA", stageName: "Chef Adeline", credits: "FOOD NETWORK · BRAVO · 4 Seasons", following: "2.7M followers", tags: ["Food", "Lifestyle"], slug: "chef-adeline", image: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=600&h=800&fit=crop&crop=face&q=80", category: "Chefs & Food" },
  { id: "08", initials: "NW", stageName: "Nina Williams", credits: "OWN · 2 Seasons", following: "780K followers", tags: ["Parenting", "Lifestyle"], slug: "nina-williams", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face&q=80", category: "Parenting & Family" },
]

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
              Roster preview. Individual talent profiles unlock for qualified brand inquiries.
            </motion.p>
          </div>

          {/* Talent grid — large image dominant cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-md lg:max-w-6xl mx-auto">
            {talents.map((talent, i) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden border-2 border-mjcc-gold"
              >
                <button
                  onClick={() => setSelectedTalent({
                    name: talent.stageName,
                    credits: talent.credits,
                    following: talent.following,
                    tags: talent.tags,
                    image: talent.image,
                  })}
                  className="w-full aspect-[3/4] relative overflow-hidden cursor-pointer"
                >
                  <img
                    src={talent.image}
                    alt={talent.stageName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient overlay — always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-mjcc-gold/0 group-hover:bg-mjcc-gold/10 transition-colors duration-500" />

                  {/* Category label at top */}
                  <div className="absolute top-0 left-0 right-0 p-3 lg:p-4">
                    <span className="inline-block text-[9px] lg:text-[10px] text-mjcc-gold bg-black/50 backdrop-blur-sm px-2 py-1 uppercase tracking-[0.15em]">
                      {talent.category}
                    </span>
                  </div>

                  {/* Content overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                    <div className="flex items-center gap-2 mb-1">
                      {talent.tags.map((tag) => (
                        <span key={tag} className="text-[9px] text-mjcc-gold/80 uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                    <h3 className="font-serif text-lg lg:text-xl text-white leading-tight">{talent.stageName}</h3>
                    <p className="text-[11px] text-white/85 mt-0.5">{talent.credits}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-[11px] text-mjcc-gold">{talent.following}</span>
                      <span className="text-[10px] text-white/70 uppercase tracking-wider group-hover:text-mjcc-gold transition-colors">
                        Book Now →
                      </span>
                    </div>
                  </div>
                </button>
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

      <TalentBookingModal
        talent={selectedTalent}
        onClose={() => setSelectedTalent(null)}
      />
    </>
  )
}
