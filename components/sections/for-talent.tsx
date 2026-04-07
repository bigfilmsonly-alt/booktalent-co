"use client"

import { motion } from "framer-motion"

const services = [
  {
    title: "Brand Partnerships",
    description: "Premium deals from brands that value your on camera credibility, not just your follower count.",
  },
  {
    title: "Original Content and IP",
    description: "Vertical dramas, docuseries, and original concepts with your name on them.",
  },
  {
    title: "Live Commerce",
    description: "TikTok Shop. Amazon Live. Instagram Shopping. You were trained to sell on camera.",
  },
  {
    title: "Career Management",
    description: "Dedicated management, legal support, content strategy, and financial planning.",
  },
]

export function ForTalent() {
  return (
    <section id="for-talent" className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            For Talent
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            Get booked. Get paid. Get managed.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-sm lg:text-base text-mjcc-muted leading-relaxed max-w-xs lg:max-w-md mx-auto"
          >
            You built an audience on national television. We turn that into a business.
          </motion.p>
        </div>

        <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4 max-w-md lg:max-w-4xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-mjcc-charcoal p-5 text-center"
            >
              <h3 className="text-sm text-mjcc-cream font-medium tracking-wide mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-mjcc-muted leading-relaxed">
                {service.description}
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
            href="#talent-application"
            className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 min-h-[48px]"
          >
            APPLY TO GET BOOKED
          </a>
        </motion.div>
      </div>
    </section>
  )
}
