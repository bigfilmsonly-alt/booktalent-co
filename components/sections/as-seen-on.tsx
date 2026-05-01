"use client"

import { motion } from "framer-motion"

const networks = [
  { name: "MTV", weight: "900" },
  { name: "NBC", weight: "900" },
  { name: "FOOD NETWORK", weight: "800" },
  { name: "HALLMARK", weight: "700" },
  { name: "USA NETWORK", weight: "800" },
  { name: "OWN", weight: "900" },
  { name: "CBS", weight: "900" },
  { name: "BRAVO", weight: "800" },
]

export function AsSeenOn() {
  return (
    <section className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-16 lg:py-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[10px] text-mjcc-muted uppercase tracking-[0.3em] mb-10"
        >
          Our Talent Has Appeared On
        </motion.p>

        <div className="grid grid-cols-4 gap-6 lg:gap-10 max-w-md lg:max-w-4xl mx-auto items-center justify-items-center">
          {networks.map((network, i) => (
            <motion.div
              key={network.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center justify-center"
            >
              <span
                className="text-[13px] lg:text-[18px] text-mjcc-platinum/30 tracking-[2px] lg:tracking-[3px] text-center leading-tight hover:text-mjcc-platinum/50 transition-colors duration-500"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: network.weight,
                }}
              >
                {network.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
