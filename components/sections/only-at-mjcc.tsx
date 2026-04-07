"use client"

import { motion } from "framer-motion"

export function StatsQuote() {
  return (
    <section className="bg-mjcc-charcoal">
      <div className="px-6 py-20">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto text-center"
        >
          <p className="font-serif text-xl text-mjcc-cream italic leading-relaxed">
            &ldquo;We didn&apos;t just watch the creator economy emerge. We built the rolodex behind it — and now anyone can book from it.&rdquo;
          </p>
          <cite className="mt-6 block text-sm text-mjcc-muted not-italic">
            Jotham Hall, Co-Founder
          </cite>
        </motion.blockquote>
      </div>
    </section>
  )
}
