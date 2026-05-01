"use client"

import { motion } from "framer-motion"

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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md lg:max-w-3xl mx-auto"
        >
          {/* Campaign details */}
          <div className="grid grid-cols-2 gap-6 pb-8 border-b border-mjcc-dark/40">
            <div className="text-center">
              <span className="text-[10px] text-mjcc-muted uppercase tracking-wider">Format</span>
              <p className="mt-1 text-sm text-mjcc-cream">TikTok + Reels</p>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-mjcc-muted uppercase tracking-wider">Duration</span>
              <p className="mt-1 text-sm text-mjcc-cream">14 Days</p>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-6 py-8">
            <div className="text-center">
              <span className="font-mono text-2xl text-mjcc-gold font-bold">2.3M</span>
              <p className="mt-1 text-[10px] text-mjcc-muted uppercase tracking-wider">Impressions</p>
            </div>
            <div className="text-center">
              <span className="font-mono text-2xl text-mjcc-gold font-bold">18.7%</span>
              <p className="mt-1 text-[10px] text-mjcc-muted uppercase tracking-wider">Engagement</p>
            </div>
            <div className="text-center">
              <span className="font-mono text-2xl text-mjcc-gold font-bold">4.8x</span>
              <p className="mt-1 text-[10px] text-mjcc-muted uppercase tracking-wider">ROAS</p>
            </div>
            <div className="text-center">
              <span className="font-mono text-2xl text-mjcc-gold font-bold">47K</span>
              <p className="mt-1 text-[10px] text-mjcc-muted uppercase tracking-wider">Link Clicks</p>
            </div>
          </div>

          {/* Narrative */}
          <p className="text-sm text-mjcc-muted leading-relaxed text-center pt-8 border-t border-mjcc-dark/40">
            A two season MTV veteran with 800K followers outperformed the brand&apos;s previous influencer partnerships by 340%. One creator. 14 days. Results that took three agencies a full year to match.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-center"
        >
          <a
            href="#media-kit"
            className="inline-flex items-center justify-center border border-mjcc-gold/40 text-mjcc-gold px-8 py-4 text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px]"
          >
            SEE MORE CAMPAIGN RESULTS
          </a>
        </motion.div>
      </div>
    </section>
  )
}
