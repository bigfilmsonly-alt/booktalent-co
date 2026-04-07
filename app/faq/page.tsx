"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FAQAccordion } from "@/components/faq/FAQAccordion"
import { faqItems } from "@/lib/faq-data"
import { Footer } from "@/components/sections/footer"

export default function FAQPage() {
  return (
    <>
      {/* Header */}
      <section className="px-6 pt-12 pb-16">
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            FAQ
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[32px] sm:text-4xl text-mjcc-cream leading-[1.1] tracking-tight"
          >
            Frequently asked questions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-[15px] text-mjcc-muted leading-relaxed"
          >
            Everything you need to know about booking television-verified talent.
          </motion.p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* All FAQ items */}
      <section className="px-6 py-16">
        <div className="max-w-lg mx-auto">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA block */}
      <section className="px-6 pb-20">
        <div className="max-w-lg mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl text-mjcc-cream mb-6"
          >
            Still have questions?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            <Link
              href="/schedule"
              className="inline-block bg-mjcc-gold text-mjcc-black text-sm font-medium px-8 py-3 hover:opacity-90 transition-opacity"
            >
              Book a Discovery Call
            </Link>

            <a
              href="mailto:hello@booktalent.co"
              className="text-sm text-mjcc-gold hover:text-mjcc-gold-hover transition-colors"
            >
              hello@booktalent.co
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
