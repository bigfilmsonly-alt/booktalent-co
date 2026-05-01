"use client"

import { motion } from "framer-motion"

export function StatsQuote() {
  return (
    <section className="bg-mjcc-charcoal">
      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-md lg:max-w-2xl mx-auto text-center"
        >
          <p className="font-serif text-xl lg:text-3xl text-mjcc-cream italic leading-relaxed">
            &ldquo;Every brand should be able to book real talent. Not just whoever the algorithm decided was popular this week.&rdquo;
          </p>
          <cite className="mt-6 block text-sm text-mjcc-muted not-italic">
            Jotham Hall, Co-Founder
          </cite>
        </motion.blockquote>
      </div>
    </section>
  )
}
