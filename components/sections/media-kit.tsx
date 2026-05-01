"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function MediaKit() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "media-kit", email }),
      })
    } catch {
      // continue to confirmation
    }
    setSubmitted(true)
  }

  return (
    <section id="media-kit" className="bg-mjcc-black border-y border-mjcc-dark/50">
      <div className="px-6 py-16">
        <div className="text-center max-w-sm mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-14 h-14 bg-mjcc-gold/10 border border-mjcc-gold/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-mjcc-gold text-xl">&#10003;</span>
              </div>
              <h2 className="font-serif text-2xl text-mjcc-cream mb-2">
                Check your inbox.
              </h2>
              <p className="text-sm text-mjcc-muted">
                The BookTalent media kit is on its way to {email}. It includes our full roster, rate cards, case studies, and campaign formats.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-serif text-[28px] text-mjcc-cream"
              >
                Get the full rate card and roster.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-3 text-sm text-mjcc-muted"
              >
                Talent profiles, campaign pricing, content formats, and performance data. One download.
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your work email"
                  className="w-full bg-mjcc-charcoal border border-mjcc-dark px-4 py-3 text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-mjcc-gold text-mjcc-black py-4 font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 text-sm min-h-[48px]"
                >
                  DOWNLOAD MEDIA KIT
                </button>
              </motion.form>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-3 text-[10px] text-mjcc-muted"
              >
                Free. No spam. Delivered to your inbox instantly.
              </motion.p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
