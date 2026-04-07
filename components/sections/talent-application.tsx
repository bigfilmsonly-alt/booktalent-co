"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function TalentApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="talent-application" className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28 max-w-lg lg:max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">
            For Talent
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-mjcc-cream mb-4">
            Apply to get booked.
          </h2>
          <p className="text-sm text-mjcc-muted max-w-xs mx-auto">
            Verified reality TV talent with active social presence. Submit your credits and we&apos;ll be in touch.
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h3 className="font-serif text-2xl text-mjcc-cream mb-4">
              Application received.
            </h3>
            <p className="text-sm text-mjcc-muted">
              We respond to all qualified applicants within 5 business days.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label htmlFor="talent-name" className="block text-xs text-mjcc-cream/60 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="talent-name"
                name="name"
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="talent-email" className="block text-xs text-mjcc-cream/60 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="talent-email"
                name="email"
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label htmlFor="talent-phone" className="block text-xs text-mjcc-cream/60 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                id="talent-phone"
                name="phone"
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="talent-shows" className="block text-xs text-mjcc-cream/60 mb-2">
                TV Credits *
              </label>
              <textarea
                id="talent-shows"
                name="shows"
                rows={3}
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors resize-none text-sm"
                placeholder="Shows, networks, and seasons"
              />
            </div>

            <div>
              <label htmlFor="talent-instagram" className="block text-xs text-mjcc-cream/60 mb-2">
                Instagram *
              </label>
              <input
                type="text"
                id="talent-instagram"
                name="instagram"
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                placeholder="@handle"
              />
            </div>

            <div>
              <label htmlFor="talent-tiktok" className="block text-xs text-mjcc-cream/60 mb-2">
                TikTok
              </label>
              <input
                type="text"
                id="talent-tiktok"
                name="tiktok"
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                placeholder="@handle"
              />
            </div>

            <div>
              <label htmlFor="talent-followers" className="block text-xs text-mjcc-cream/60 mb-2">
                Combined Following *
              </label>
              <select
                id="talent-followers"
                name="followers"
                required
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream focus:border-mjcc-gold transition-colors appearance-none cursor-pointer text-sm"
              >
                <option value="" className="bg-mjcc-dark">Select range</option>
                <option value="10k-50k" className="bg-mjcc-dark">10K – 50K</option>
                <option value="50k-100k" className="bg-mjcc-dark">50K – 100K</option>
                <option value="100k-500k" className="bg-mjcc-dark">100K – 500K</option>
                <option value="500k-1m" className="bg-mjcc-dark">500K – 1M</option>
                <option value="1m+" className="bg-mjcc-dark">1M+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-mjcc-cream/60 mb-3">
                Specialties *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Beauty", "Fashion", "Fitness", "Comedy", "Lifestyle", "Food", "Music", "Drama/Acting", "Parenting", "Travel"].map((specialty) => (
                  <label key={specialty} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="specialties"
                      value={specialty.toLowerCase()}
                      className="w-4 h-4 bg-mjcc-charcoal border border-mjcc-dark text-mjcc-gold focus:ring-mjcc-gold focus:ring-offset-0 accent-mjcc-gold"
                    />
                    <span className="text-xs text-mjcc-muted group-hover:text-mjcc-cream transition-colors">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="talent-message" className="block text-xs text-mjcc-cream/60 mb-2">
                Why should brands book you?
              </label>
              <textarea
                id="talent-message"
                name="message"
                rows={3}
                className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors resize-none text-sm"
                placeholder="Your goals and what makes you bookable..."
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase min-h-[48px]"
              >
                {isSubmitting ? "Submitting..." : "SUBMIT APPLICATION"}
              </button>
            </div>

            <p className="text-[10px] text-mjcc-muted text-center">
              We respond within 5 business days.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  )
}
