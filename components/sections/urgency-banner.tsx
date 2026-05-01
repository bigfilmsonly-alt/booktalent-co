"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function UrgencyBanner() {
  return (
    <section className="bg-mjcc-gold/5 border-y border-mjcc-gold/20">
      <div className="px-6 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-md lg:max-w-3xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="hidden lg:block w-2 h-2 bg-mjcc-gold animate-pulse" />
            <p className="text-sm text-mjcc-cream">
              <span className="text-mjcc-gold font-medium">Only 3 Q2 campaign slots remaining.</span>
              {" "}94% of bookings close within 3 weeks.
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex items-center px-5 py-2 bg-mjcc-gold text-mjcc-black text-xs font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors shrink-0"
          >
            BOOK NOW
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
