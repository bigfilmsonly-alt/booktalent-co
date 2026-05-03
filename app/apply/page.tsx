"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Footer } from "@/components/sections/footer"

const ease = [0.16, 1, 0.3, 1] as const

export default function ApplyPage() {
  const [view, setView] = useState<"choose" | "apply">("choose")
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
        body: JSON.stringify({ formType: "talent", ...data }),
      })
      setIsSubmitted(true)
    } catch {
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <main className="bg-mjcc-black min-h-screen pb-20 lg:pb-0">
        <div className="px-6 lg:px-12 pt-8 lg:pt-24 pb-20 lg:pb-28 max-w-lg lg:max-w-3xl mx-auto">
          <AnimatePresence mode="wait">

            {/* Path chooser */}
            {view === "choose" && (
              <motion.div
                key="chooser"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease }}
                className="text-center"
              >
                <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">
                  Get Started
                </p>
                <h1 className="font-serif text-3xl lg:text-4xl text-mjcc-cream mb-4">
                  How can we help?
                </h1>
                <p className="text-sm text-mjcc-muted max-w-xs mx-auto mb-12">
                  Choose the path that fits you.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {/* Apply as New Talent */}
                  <button
                    onClick={() => setView("apply")}
                    className="group text-left p-6 border border-mjcc-dark/50 hover:border-mjcc-gold transition-all duration-300"
                  >
                    <div className="w-10 h-10 border border-mjcc-gold/30 flex items-center justify-center mb-4 group-hover:border-mjcc-gold transition-colors">
                      <span className="text-mjcc-gold text-lg">+</span>
                    </div>
                    <h2 className="font-serif text-lg text-mjcc-cream mb-2">
                      Apply as Talent
                    </h2>
                    <p className="text-xs text-mjcc-muted leading-relaxed">
                      New to BookTalent? Submit your TV credits and social presence to get started.
                    </p>
                  </button>

                  {/* Book Talent */}
                  <Link
                    href="/book"
                    className="group text-left p-6 border border-mjcc-dark/50 hover:border-mjcc-gold transition-all duration-300"
                  >
                    <div className="w-10 h-10 border border-mjcc-gold/30 flex items-center justify-center mb-4 group-hover:border-mjcc-gold transition-colors">
                      <span className="text-mjcc-gold text-lg">&#9654;</span>
                    </div>
                    <h2 className="font-serif text-lg text-mjcc-cream mb-2">
                      Book Talent
                    </h2>
                    <p className="text-xs text-mjcc-muted leading-relaxed">
                      You are a brand or agency looking to book creators for a campaign.
                    </p>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* APPLY — New talent application form */}
            {view === "apply" && !isSubmitted && (
              <motion.div
                key="apply"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease }}
              >
                <button
                  onClick={() => setView("choose")}
                  className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors mb-8 flex items-center gap-2"
                >
                  &larr; Back
                </button>

                <div className="text-center mb-12">
                  <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">
                    For Talent
                  </p>
                  <h1 className="font-serif text-3xl lg:text-4xl text-mjcc-cream mb-4">
                    Apply to get booked.
                  </h1>
                  <p className="text-sm text-mjcc-muted max-w-xs mx-auto">
                    Verified reality TV talent with active social presence. Submit your credits and we will be in touch.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
                  <div>
                    <label className="block text-xs text-mjcc-cream/60 mb-2">Full Name *</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs text-mjcc-cream/60 mb-2">Email *</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm" placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs text-mjcc-cream/60 mb-2">Phone *</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm" placeholder="(555) 123 4567" />
                  </div>
                  <div>
                    <label className="block text-xs text-mjcc-cream/60 mb-2">Instagram *</label>
                    <input type="text" name="instagram" required className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm" placeholder="@handle" />
                  </div>
                  <div>
                    <label className="block text-xs text-mjcc-cream/60 mb-2">TV Credits *</label>
                    <textarea name="shows" rows={3} required className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors resize-none text-sm" placeholder="Shows, networks, and seasons" />
                  </div>
                  <div className="pt-3">
                    <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 disabled:opacity-50 uppercase min-h-[48px]">
                      {isSubmitting ? "Submitting..." : "SUBMIT APPLICATION"}
                    </button>
                  </div>
                  <p className="text-[10px] text-mjcc-muted text-center">We respond within 5 business days.</p>
                </form>
              </motion.div>
            )}

            {/* Apply submitted */}
            {view === "apply" && isSubmitted && (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-mjcc-gold/10 border border-mjcc-gold/30 flex items-center justify-center mx-auto mb-6">
                  <span className="text-mjcc-gold text-2xl">&#10003;</span>
                </div>
                <h2 className="font-serif text-2xl text-mjcc-cream mb-4">Application received.</h2>
                <p className="text-sm text-mjcc-muted mb-6">We respond to all qualified applicants within 5 business days.</p>
                <p className="text-xs text-mjcc-muted">
                  Questions? Email{" "}
                  <a href="mailto:talent@booktalent.co" className="text-mjcc-gold hover:underline">talent@booktalent.co</a>
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </>
  )
}
