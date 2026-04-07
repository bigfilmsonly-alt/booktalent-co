"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Footer } from "@/components/sections/footer"

const ease = [0.16, 1, 0.3, 1]

const team = [
  { initials: "JH", name: "Jotham Hall", title: "Co-Founder & CEO" },
  { initials: "M", name: "Mira", title: "Co-Founder & Talent Director" },
]

const steps = [
  {
    number: "01",
    title: "Book a 20-minute slot",
    body: "Choose a time that works for you. We're available Monday through Friday.",
  },
  {
    number: "02",
    title: "We'll send a brief intake form",
    body: "A short questionnaire about your brand, goals, and budget so we come prepared.",
  },
  {
    number: "03",
    title: "Join the call ready to talk",
    body: "We'll walk through our roster, recommend packages, and outline next steps.",
  },
]

export default function SchedulePage() {
  return (
    <>
      {/* Header */}
      <section className="px-6 pt-12 pb-16">
        <div className="max-w-lg mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            Schedule a Call
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-serif text-3xl text-mjcc-cream"
          >
            Twenty minutes. Real answers.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-4 text-[15px] text-mjcc-warm leading-relaxed max-w-sm mx-auto"
          >
            Book a discovery call with our team. We&apos;ll discuss your campaign
            goals, walk through our roster, and recommend the right package for
            your brand.
          </motion.p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Who you'll meet */}
      <section className="px-6 py-16">
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6"
          >
            Who You&apos;ll Meet
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="grid grid-cols-2 gap-4"
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-mjcc-charcoal border border-mjcc-dark p-4"
              >
                <div className="w-12 h-12 bg-mjcc-charcoal border border-mjcc-dark flex items-center justify-center mb-3">
                  <span className="font-serif text-mjcc-gold text-sm">
                    {member.initials}
                  </span>
                </div>
                <p className="text-sm font-medium text-mjcc-cream">
                  {member.name}
                </p>
                <p className="text-xs text-mjcc-platinum mt-0.5">
                  {member.title}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Calendar placeholder */}
      <section className="px-6 py-16">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="bg-mjcc-charcoal border border-mjcc-dark p-8 text-center"
          >
            <p className="text-mjcc-muted text-sm">Calendar loading...</p>
            {/* Replace with Cal.com embed: <Cal calLink="booktalent/discovery" /> */}
            <p className="text-xs text-mjcc-muted mt-6">
              Or email us directly at{" "}
              <a
                href="mailto:hello@booktalent.co"
                className="text-mjcc-gold hover:underline"
              >
                hello@booktalent.co
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* What to expect */}
      <section className="px-6 py-16">
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-8"
          >
            What to Expect
          </motion.p>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
              >
                <p className="font-mono text-mjcc-gold text-xs mb-1">
                  {step.number}
                </p>
                <p className="text-mjcc-cream font-medium text-sm">
                  {step.title}
                </p>
                <p className="text-xs text-mjcc-warm mt-1 leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-lg mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-sm text-mjcc-muted mb-4"
          >
            Not ready for a call?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex flex-col items-center gap-3"
          >
            <Link
              href="/roster"
              className="text-sm text-mjcc-gold hover:underline"
            >
              Browse the roster &rarr;
            </Link>
            <Link
              href="/#media-kit"
              className="text-sm text-mjcc-gold hover:underline"
            >
              Download the media kit &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
