"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const budgetPresets = [
  { label: "$15K", value: 15000 },
  { label: "$25K", value: 25000 },
  { label: "$50K", value: 50000 },
  { label: "$100K", value: 100000 },
  { label: "$250K", value: 250000 },
]

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

export function ROICalculator() {
  const [budget, setBudget] = useState(50000)

  const roas = 4.2
  const projectedRevenue = budget * roas
  const impressions = budget * 46
  const engagement = Math.round(impressions * 0.054)
  const linkClicks = Math.round(impressions * 0.012)

  return (
    <section className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-md lg:max-w-3xl mx-auto">
          <div className="text-center mb-10 lg:mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
            >
              ROI Calculator
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl lg:text-4xl text-mjcc-cream leading-tight"
            >
              See what your budget could do.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-sm text-mjcc-muted"
            >
              Based on average performance across 47+ BookTalent campaigns.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Budget selector */}
            <div className="mb-8">
              <p className="text-xs text-mjcc-cream/60 mb-3 text-center">Select your campaign budget</p>
              <div className="grid grid-cols-5 gap-2">
                {budgetPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setBudget(preset.value)}
                    className={`p-3 border text-sm text-center transition-colors ${
                      budget === preset.value
                        ? "border-mjcc-gold text-mjcc-gold bg-mjcc-gold/10"
                        : "border-mjcc-dark text-mjcc-muted hover:border-mjcc-dark hover:text-mjcc-cream"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="bg-mjcc-charcoal border border-mjcc-dark p-6 lg:p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="font-mono text-2xl lg:text-3xl text-mjcc-gold font-bold">
                    ${formatNumber(projectedRevenue)}
                  </p>
                  <p className="text-[10px] text-mjcc-muted uppercase tracking-wider mt-1">
                    Projected Revenue
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-2xl lg:text-3xl text-mjcc-gold font-bold">
                    {formatNumber(impressions)}
                  </p>
                  <p className="text-[10px] text-mjcc-muted uppercase tracking-wider mt-1">
                    Est. Impressions
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-2xl lg:text-3xl text-mjcc-gold font-bold">
                    {formatNumber(engagement)}
                  </p>
                  <p className="text-[10px] text-mjcc-muted uppercase tracking-wider mt-1">
                    Engagements
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-2xl lg:text-3xl text-mjcc-gold font-bold">
                    {formatNumber(linkClicks)}
                  </p>
                  <p className="text-[10px] text-mjcc-muted uppercase tracking-wider mt-1">
                    Link Clicks
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-mjcc-dark flex flex-col lg:flex-row items-center justify-between gap-4">
                <p className="text-xs text-mjcc-muted text-center lg:text-left">
                  Based on {roas}x average ROAS across BookTalent campaigns. Individual results vary.
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center px-6 py-3 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors shrink-0 min-h-[48px]"
                >
                  GET STARTED
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
