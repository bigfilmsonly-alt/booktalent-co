"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FAQAccordion } from "@/components/faq/FAQAccordion"
import { faqItems } from "@/lib/faq-data"

export function FAQSection() {
  return (
    <section id="faq" className="bg-mjcc-black">

      <div className="px-6 py-20">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
            >
              Common Questions
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl text-mjcc-cream leading-tight"
            >
              What brands ask before booking.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-[15px] text-mjcc-muted leading-relaxed"
            >
              Quick answers. If you need more detail, book a call.
            </motion.p>
          </div>

          {/* Accordion */}
          <FAQAccordion items={faqItems} limit={6} />

          {/* Link to full FAQ page */}
          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="text-sm text-mjcc-gold hover:text-mjcc-gold-hover transition-colors"
            >
              See all questions &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
