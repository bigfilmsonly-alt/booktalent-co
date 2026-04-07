"use client"

import { motion } from "framer-motion"

const differentiators = [
  {
    title: "TV-Verified",
    description: "Every talent has confirmed broadcast credits. No bought followers. Proven on camera, proven with audiences.",
  },
  {
    title: "Production Built In",
    description: "Our production arm creates branded content, vertical dramas, and original IP no influencer agency can match.",
  },
  {
    title: "Live Commerce Ready",
    description: "Talent trained to sell on television — now available for TikTok Shop, Amazon Live, and Instagram Shopping.",
  },
  {
    title: "Exclusive Crossover",
    description: "Reunion and crossover content between cast members from different reality franchises. Only from our rolodex.",
  },
]

export function WhyUs() {
  return (
    <section id="why-book-talent" className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 py-20">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            Why Book With Us
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl text-mjcc-cream leading-tight"
          >
            What makes us different.
          </motion.h2>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="py-5 border-b border-mjcc-dark/50 text-center"
            >
              <h3 className="text-sm text-mjcc-cream font-medium tracking-wide mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-mjcc-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href="/book"
            className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 min-h-[48px]"
          >
            BOOK TALENT NOW
          </a>
        </motion.div>
      </div>
    </section>
  )
}
