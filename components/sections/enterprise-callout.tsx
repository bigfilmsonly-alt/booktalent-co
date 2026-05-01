"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function EnterpriseCallout() {
  return (
    <section className="bg-mjcc-black">
      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            Enterprise
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight mb-4"
          >
            One partnership. Full access.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15px] text-mjcc-muted leading-relaxed mb-10"
          >
            Full roster access. Production capacity. UGC retainer. Live commerce events. Dedicated account team. All for one annual commitment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <p className="font-serif text-4xl lg:text-5xl text-mjcc-gold mb-2">$500,000</p>
            <p className="text-xs text-mjcc-platinum uppercase tracking-wider">Per Year</p>
            <p className="text-sm text-mjcc-muted mt-4">Standalone value of $718,000. Save $218,000 bundled.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link
              href="/services/enterprise"
              className="cta-button inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-10 py-4 text-sm font-medium tracking-[0.15em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[52px]"
            >
              LEARN ABOUT ENTERPRISE
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
