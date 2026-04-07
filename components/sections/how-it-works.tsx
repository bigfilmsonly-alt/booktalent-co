"use client"

import { motion } from "framer-motion"

const talentSteps = [
  { number: "01", title: "Apply", description: "Submit your TV credits and social presence. We review every application personally." },
  { number: "02", title: "Get Matched", description: "Paired with a dedicated manager who audits your brand and starts getting you booked." },
  { number: "03", title: "Get Paid", description: "Receive curated briefs, deliver content, collect payment. We handle everything else." },
]

const brandSteps = [
  { number: "01", title: "Tell Us Your Goals", description: "Campaign objectives, budget, and target audience. We learn your brand first." },
  { number: "02", title: "We Match You", description: "Handpicked talent based on audience alignment, content style, and campaign fit." },
  { number: "03", title: "Launch", description: "Approve content, go live, track performance. Full reporting on reach and ROI." },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            How It Works
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            Three steps.
          </motion.h2>
        </div>

        {/* Side-by-side on desktop */}
        <div className="max-w-md lg:max-w-5xl mx-auto lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Talent Track */}
          <div className="mb-12 lg:mb-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs text-mjcc-muted uppercase tracking-[0.2em] mb-6 text-center lg:text-left"
            >
              For Talent
            </motion.p>

            <div className="space-y-4">
              {talentSteps.map((step, i) => (
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

          {/* Brand Track */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs text-mjcc-muted uppercase tracking-[0.2em] mb-6 text-center lg:text-left"
            >
              For Brands
            </motion.p>

            <div className="space-y-4">
              {brandSteps.map((step, i) => (
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
        </div>
      </div>
    </section>
  )
}
