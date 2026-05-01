"use client"

import { motion } from "framer-motion"

const caseStudies = [
  {
    format: 'TikTok + Reels',
    duration: '14 Days',
    metrics: [
      { value: '2.3M', label: 'Impressions' },
      { value: '18.7%', label: 'Engagement' },
      { value: '4.8x', label: 'ROAS' },
    ],
    narrative: "A two season MTV veteran with 800K followers outperformed the brand's previous influencer partnerships by 340%. One creator. 14 days. Justified scaling to a six figure annual partnership.",
    category: 'Beauty Brand × Fashion Creator',
  },
  {
    format: 'Live Commerce + UGC',
    duration: '30 Days',
    metrics: [
      { value: '1.8M', label: 'Impressions' },
      { value: '22%', label: 'Engagement' },
      { value: '5.2x', label: 'ROAS' },
    ],
    narrative: "Food Network personality launched a kitchen brand's flagship product through three TikTok Shop Live events plus 8 UGC pieces. Sold out inventory in 72 hours. Brand renewed quarterly.",
    category: 'Food Brand × Cooking Personality',
  },
  {
    format: 'Multi Creator Campaign',
    duration: '90 Days',
    metrics: [
      { value: '8.7M', label: 'Impressions' },
      { value: '340%', label: 'Search Lift' },
      { value: '12', label: 'Content Pieces' },
    ],
    narrative: "Five creators across MTV, Bravo, and Food Network drove a 340% lift in branded search. Crossover content created a cultural moment. Brand expanded to a 12 month partnership.",
    category: 'Wellness Brand × Crossover Roster',
  },
]

export function CaseStudy() {
  return (
    <section id="results" className="bg-mjcc-black">
      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            Results
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            What a campaign looks like.
          </motion.h2>
        </div>

        {/* 3 case study cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-md lg:max-w-5xl mx-auto">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border border-mjcc-dark/40 p-6 lg:p-8 text-center"
            >
              {/* Category */}
              <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.15em] mb-6">
                {study.category}
              </p>

              {/* Format + Duration */}
              <div className="flex justify-center gap-6 mb-6">
                <div>
                  <span className="text-[10px] text-mjcc-muted uppercase tracking-wider block">Format</span>
                  <p className="text-xs text-mjcc-cream mt-1">{study.format}</p>
                </div>
                <div>
                  <span className="text-[10px] text-mjcc-muted uppercase tracking-wider block">Duration</span>
                  <p className="text-xs text-mjcc-cream mt-1">{study.duration}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 py-6 border-y border-mjcc-dark/30">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="font-mono text-xl lg:text-2xl text-mjcc-gold font-bold block">{m.value}</span>
                    <span className="text-[9px] text-mjcc-muted uppercase tracking-wider">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Narrative */}
              <p className="text-sm text-mjcc-muted leading-relaxed mt-6">
                {study.narrative}
              </p>
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
          <a
            href="/book"
            className="inline-flex items-center justify-center border border-mjcc-gold/40 text-mjcc-gold px-8 py-4 text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px]"
          >
            SEE WHAT THIS LOOKS LIKE FOR YOUR BRAND
          </a>
        </motion.div>
      </div>
    </section>
  )
}
