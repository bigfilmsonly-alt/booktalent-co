"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function BrandInquiry() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData(e.currentTarget)
      const data = Object.fromEntries(formData.entries())
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "brand", ...data }),
      })
      setIsSubmitted(true)
    } catch {
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="brand-inquiry" className="bg-mjcc-charcoal">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">
            BookTalent
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-mjcc-cream mb-4">
            Tell us about your campaign.
          </h2>
          <p className="text-sm text-mjcc-muted max-w-xs mx-auto">
            We&apos;ll match you with television verified talent within 48 hours.
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h3 className="font-serif text-2xl text-mjcc-cream mb-4">
              Inquiry received.
            </h3>
            <p className="text-sm text-mjcc-muted">
              Our team will respond within 48 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-5 max-w-md lg:max-w-xl mx-auto"
          >
            <div>
              <label htmlFor="brand-name" className="block text-xs text-mjcc-cream/60 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="brand-name"
                name="name"
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                placeholder="Full name"
              />
            </div>

            <div>
              <label htmlFor="brand-email" className="block text-xs text-mjcc-cream/60 mb-2">
                Work Email *
              </label>
              <input
                type="email"
                id="brand-email"
                name="email"
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="brand-company" className="block text-xs text-mjcc-cream/60 mb-2">
                Company / Brand *
              </label>
              <input
                type="text"
                id="brand-company"
                name="company"
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                placeholder="Company name"
              />
            </div>

            <div>
              <label htmlFor="brand-budget" className="block text-xs text-mjcc-cream/60 mb-2">
                Campaign Budget *
              </label>
              <select
                id="brand-budget"
                name="budget"
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream focus:border-mjcc-gold transition-colors appearance-none cursor-pointer text-sm"
              >
                <option value="" className="bg-mjcc-dark">Select range</option>
                <option value="10k-25k" className="bg-mjcc-dark">$10K to $25K</option>
                <option value="25k-50k" className="bg-mjcc-dark">$25K to $50K</option>
                <option value="50k-100k" className="bg-mjcc-dark">$50K to $100K</option>
                <option value="100k-250k" className="bg-mjcc-dark">$100K to $250K</option>
                <option value="250k+" className="bg-mjcc-dark">$250K+</option>
              </select>
            </div>

            <div>
              <label htmlFor="brand-content-type" className="block text-xs text-mjcc-cream/60 mb-2">
                Content Type *
              </label>
              <select
                id="brand-content-type"
                name="contentType"
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream focus:border-mjcc-gold transition-colors appearance-none cursor-pointer text-sm"
              >
                <option value="" className="bg-mjcc-dark">Select type</option>
                <option value="tiktok" className="bg-mjcc-dark">TikTok</option>
                <option value="youtube" className="bg-mjcc-dark">YouTube Shorts</option>
                <option value="instagram" className="bg-mjcc-dark">Instagram Reels</option>
                <option value="vertical-drama" className="bg-mjcc-dark">Vertical Dramas</option>
                <option value="live-shopping" className="bg-mjcc-dark">Live Commerce</option>
                <option value="events" className="bg-mjcc-dark">Event Appearances</option>
                <option value="multiple" className="bg-mjcc-dark">Multiple / Not Sure</option>
              </select>
            </div>

            <div>
              <label htmlFor="brand-message" className="block text-xs text-mjcc-cream/60 mb-2">
                Campaign Details *
              </label>
              <textarea
                id="brand-message"
                name="message"
                rows={3}
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors resize-none text-sm"
                placeholder="Goals, audience, and the type of talent you're looking for..."
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase min-h-[48px]"
              >
                {isSubmitting ? "SUBMITTING..." : "BOOK TALENT NOW"}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  )
}
