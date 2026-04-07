"use client"

import { motion } from "framer-motion"

const contentTypes = [
  {
    title: "TikTok",
    description: "Talent that understands performance, timing, and audience psychology.",
  },
  {
    title: "YouTube Shorts",
    description: "Vertical content built for discovery, powered by recognizable personalities.",
  },
  {
    title: "Instagram Reels",
    description: "Production-quality Reels from talent that knows how to hit their marks.",
  },
  {
    title: "Vertical Dramas",
    description: "Serialized branded entertainment with real storytelling.",
  },
  {
    title: "Live Commerce",
    description: "TikTok Shop, Amazon Live, and Instagram Shopping with proven sellers.",
  },
  {
    title: "Events",
    description: "Brand activations, premieres, product launches, and experiential marketing.",
  },
]

const metrics = [
  { value: "4.2x", label: "Avg. ROAS" },
  { value: "340%", label: "Higher Engagement" },
  { value: "12 Days", label: "Turnaround" },
]

export function ForBrands() {
  return (
    <section id="for-brands" className="bg-mjcc-charcoal">
      <div className="px-6 py-20">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            For Brands
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl text-mjcc-cream leading-tight"
          >
            Talent that converts.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-sm text-mjcc-muted leading-relaxed max-w-xs mx-auto"
          >
            Stop gambling on follower counts. Our talent has been selected, trained, and proven on television.
          </motion.p>
        </div>

        {/* Content formats */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {contentTypes.map((type, i) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-mjcc-black p-4 text-center"
            >
              <h3 className="text-xs text-mjcc-cream font-medium tracking-wider mb-1.5">
                {type.title}
              </h3>
              <p className="text-xs text-mjcc-muted leading-relaxed">
                {type.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 border border-mjcc-dark p-8 max-w-md mx-auto"
        >
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <span className="block font-mono text-xl text-mjcc-gold font-bold">
                  {metric.value}
                </span>
                <span className="mt-1 block text-[10px] text-mjcc-muted uppercase tracking-wider">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="/book"
              className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 min-h-[48px]"
            >
              BOOK TALENT NOW
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
