"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function FeaturedCampaign() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mjcc-charcoal via-mjcc-black to-mjcc-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.08)_0%,_transparent_50%)]" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-mjcc-gold/60" />

      <div className="relative px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-md lg:max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left: Campaign narrative */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] text-mjcc-gold uppercase tracking-[0.3em] mb-4 font-mono"
            >
              Featured Campaign
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight mb-6"
            >
              $280K in live sales.
              <br />
              <span className="text-mjcc-gold">90 minutes.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm lg:text-[15px] text-mjcc-muted leading-[1.7] mb-8"
            >
              A major supplement brand booked three MTV personalities for a TikTok Shop live event. The result: $280K in direct sales, 2.3M live viewers, and a 4.8x ROAS that outperformed every influencer campaign they had ever run.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[48px] cta-button"
              >
                SEE HOW WE DID IT
              </Link>
            </motion.div>
          </div>

          {/* Right: Metrics grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 lg:mt-0"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "$280K", label: "Live Sales" },
                { value: "2.3M", label: "Live Viewers" },
                { value: "4.8x", label: "ROAS" },
                { value: "90 min", label: "Event Duration" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="bg-mjcc-black/60 border border-mjcc-dark/50 p-6 text-center"
                >
                  <span className="block font-mono text-2xl lg:text-3xl text-mjcc-gold font-bold">
                    {stat.value}
                  </span>
                  <span className="block mt-2 text-[10px] text-mjcc-muted uppercase tracking-wider">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
