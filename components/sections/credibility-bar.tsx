"use client"

import { motion } from "framer-motion"

const networks = ["MTV", "NBC", "FOOD NETWORK", "HALLMARK", "USA", "OWN", "CBS", "BRAVO"]

export function CredibilityBar() {
  return (
    <section className="bg-mjcc-charcoal">
      <div className="px-6 lg:px-12 py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-center text-[9px] text-mjcc-muted/50 uppercase tracking-[0.3em] mb-5">
            Our Talent Has Appeared On
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 lg:gap-x-12 gap-y-3 max-w-3xl mx-auto">
            {networks.map((network) => (
              <span
                key={network}
                className="text-[12px] lg:text-[14px] text-mjcc-platinum/30 tracking-[3px] uppercase font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {network}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
