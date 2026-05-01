"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { caseStudies } from "@/lib/case-studies-data"
import { Footer } from "@/components/sections/footer"

const ease = [0.16, 1, 0.3, 1]

export default function CaseStudiesPage() {
  return (
    <>
      {/* Header */}
      <section className="px-6 pt-12 pb-16">
        <div className="max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            Results
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[32px] sm:text-4xl text-mjcc-cream leading-[1.1] tracking-tight"
          >
            What happens when verified talent meets the right brand.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-4 text-[15px] text-mjcc-muted leading-relaxed"
          >
            Real campaigns. Real metrics. Real results.
          </motion.p>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          {caseStudies.map((study, i) => (
            <div key={study.id}>
              <div className="gold-divider" />

              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="py-12 relative"
              >
                {/* Watermark number */}
                <span className="font-serif text-5xl text-mjcc-dark absolute top-8 right-0 select-none pointer-events-none">
                  {study.id}
                </span>

                {/* Brand x Talent */}
                <h2 className="font-serif text-xl text-mjcc-cream mb-2 pr-16">
                  {study.brand} &times; {study.talent}
                </h2>

                {/* Package + Format */}
                <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">
                  {study.packageType} &middot; {study.format}
                </p>

                {/* Narrative */}
                <p className="text-mjcc-warm text-[15px] leading-relaxed italic mb-8">
                  {study.narrative}
                </p>

                {/* Metrics */}
                <div className="flex justify-between mb-8">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <p className="font-serif text-3xl text-mjcc-gold">
                        {metric.value}
                      </p>
                      <p className="text-xs text-mjcc-platinum uppercase tracking-wider mt-1">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                {study.testimonial && (
                  <div className="border-l-2 border-mjcc-gold/40 pl-4 mt-6">
                    <p className="text-sm text-mjcc-cream leading-relaxed italic">
                      &ldquo;{study.testimonial.quote}&rdquo;
                    </p>
                    <p className="text-xs text-mjcc-muted mt-2">
                      {study.testimonial.name}, {study.testimonial.role}
                    </p>
                  </div>
                )}

                {/* Subtle bottom border */}
                <div className="border-b border-mjcc-dark/40 mt-12" />
              </motion.article>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-divider" />

      {/* Bottom CTA */}
      <section className="px-6 py-16 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="font-serif text-3xl text-mjcc-cream mb-8"
          >
            Ready to create results like these?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors min-h-[48px]"
            >
              BOOK TALENT
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center border border-mjcc-gold/40 text-mjcc-gold px-8 py-4 text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px]"
            >
              DOWNLOAD MEDIA KIT
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
