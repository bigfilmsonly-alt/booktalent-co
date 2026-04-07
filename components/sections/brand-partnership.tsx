"use client"

import { motion } from "framer-motion"

const benefits = [
  {
    title: "Dedicated Team",
    description: "Named account manager, priority matching, and first access to our full roster.",
  },
  {
    title: "Recurring Campaigns",
    description: "Preferred rates and priority scheduling across all content formats.",
  },
  {
    title: "Performance Reporting",
    description: "Monthly dashboards, audience insights, and ROI tracking on every campaign.",
  },
  {
    title: "Co-Branded Content",
    description: "Original IP and vertical dramas designed around your brand, powered by Big Films Only.",
  },
]

const partnerProcess = [
  {
    number: "01",
    title: "Apply",
    description: "Tell us about your brand and the talent partnerships you're looking for.",
  },
  {
    number: "02",
    title: "Strategy Session",
    description: "We build a custom plan — talent recommendations, formats, cadence, and pricing.",
  },
  {
    number: "03",
    title: "Launch & Scale",
    description: "Go live with your first campaign. Ongoing support and quarterly reviews.",
  },
]

export function BrandPartnership() {
  return (
    <section id="brand-partnership" className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 py-20">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            Partnerships
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl text-mjcc-cream leading-tight"
          >
            Partner with us.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-sm text-mjcc-muted leading-relaxed max-w-xs mx-auto"
          >
            Go beyond one-off bookings. Dedicated support, preferred rates, and priority roster access.
          </motion.p>
        </div>

        {/* Benefits */}
        <div className="space-y-3 max-w-md mx-auto mb-12">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="py-4 border-b border-mjcc-dark/40 text-center"
            >
              <h3 className="text-sm text-mjcc-cream font-medium tracking-wide mb-1.5">
                {item.title}
              </h3>
              <p className="text-sm text-mjcc-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process */}
        <div className="max-w-md mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-muted uppercase tracking-[0.2em] mb-6 text-center"
          >
            How It Works
          </motion.p>

          <div className="space-y-4">
            {partnerProcess.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4 py-4 border-b border-mjcc-dark/40"
              >
                <span className="font-mono text-lg text-mjcc-gold/30 font-bold shrink-0 w-8">
                  {step.number}
                </span>
                <div>
                  <h4 className="text-sm text-mjcc-cream font-medium mb-1">{step.title}</h4>
                  <p className="text-sm text-mjcc-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto text-center"
        >
          <a
            href="mailto:partnerships@booktalent.co"
            className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 min-h-[48px]"
          >
            BECOME A PARTNER
          </a>
          <p className="mt-4 text-[11px] text-mjcc-muted">
            partnerships@booktalent.co
          </p>
        </motion.div>
      </div>
    </section>
  )
}
