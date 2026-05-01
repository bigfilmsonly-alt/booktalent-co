"use client"

import { motion } from "framer-motion"

const steps = [
  { number: "01", title: "Submit Your Brief", description: "Campaign objectives, budget, timeline, and target audience. Takes less than 60 seconds." },
  { number: "02", title: "We Match You", description: "Handpicked talent based on audience alignment, content style, and campaign fit. Proposal in 24 hours." },
  { number: "03", title: "Launch", description: "Approve content, go live, track performance. Full reporting on reach, engagement, and ROI." },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-mjcc-black">

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
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            Three steps to your first campaign.
          </motion.h2>
        </div>

        <div className="max-w-md lg:max-w-2xl mx-auto">
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 py-5 border-b border-mjcc-dark/40"
              >
                <span className="font-mono text-lg text-mjcc-gold/50 font-bold shrink-0 w-8">
                  {step.number}
                </span>
                <div>
                  <h4 className="text-sm text-mjcc-cream font-medium mb-1">{step.title}</h4>
                  <p className="text-sm text-mjcc-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 text-center"
          >
            <a
              href="/book"
              className="cta-button inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-10 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[48px]"
            >
              SUBMIT YOUR BRIEF
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
