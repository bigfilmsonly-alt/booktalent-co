"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Search } from "lucide-react"
import { talent } from "@/lib/talent-data"
import { Footer } from "@/components/sections/footer"

const ease = [0.16, 1, 0.3, 1] as const
const TIERS = ["All", "Marquee", "Core", "Rising"]

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

export default function ApplyPage() {
  const [view, setView] = useState<"choose" | "claim" | "apply">("choose")
  const [activeTier, setActiveTier] = useState("All")
  const [search, setSearch] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const filtered = useMemo(() => {
    return talent.filter((t) => {
      if (activeTier !== "All" && t.tier !== activeTier) return false
      if (search.trim()) {
        return t.name.toLowerCase().includes(search.toLowerCase())
      }
      return true
    })
  }, [activeTier, search])

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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {/* Claim Your Seat */}
                  <button
                    onClick={() => setView("claim")}
                    className="group text-left p-6 border border-mjcc-gold/50 hover:border-mjcc-gold transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-mjcc-gold/10 border border-mjcc-gold/30 flex items-center justify-center mb-4 group-hover:bg-mjcc-gold/20 transition-colors">
                      <span className="text-mjcc-gold text-lg">&#9733;</span>
                    </div>
                    <h2 className="font-serif text-lg text-mjcc-cream mb-2">
                      Claim Your Seat
                    </h2>
                    <p className="text-xs text-mjcc-muted leading-relaxed">
                      You were invited to join BookTalent. Find your name and complete your onboarding.
                    </p>
                  </button>

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

            {/* CLAIM YOUR SEAT — Talent directory */}
            {view === "claim" && (
              <motion.div
                key="claim"
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

                <div className="text-center mb-10">
                  <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">
                    Invited Talent
                  </p>
                  <h1 className="font-serif text-3xl lg:text-4xl text-mjcc-cream mb-3">
                    Claim your seat.
                  </h1>
                  <p className="text-sm text-mjcc-muted max-w-sm mx-auto">
                    Find your name below and complete your onboarding to join the BookTalent roster.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex gap-2 justify-center flex-wrap">
                    {TIERS.map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setActiveTier(tier)}
                        className={`px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                          activeTier === tier
                            ? "bg-mjcc-gold text-mjcc-black font-medium"
                            : "border border-mjcc-dark text-mjcc-platinum hover:border-mjcc-gold/40"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                  <div className="relative max-w-sm mx-auto w-full">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mjcc-platinum" />
                    <input
                      type="text"
                      placeholder="Search your name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-mjcc-charcoal border border-mjcc-dark text-mjcc-cream text-sm px-3 py-2.5 pl-9 placeholder:text-mjcc-muted focus:border-mjcc-gold transition-colors"
                    />
                  </div>
                </div>

                {/* Talent list */}
                <div className="space-y-2">
                  {filtered.map((t) => (
                    <Link
                      key={t.id}
                      href={`/invite/${t.inviteSlug}/onboard`}
                      className="flex items-center gap-4 p-4 border border-mjcc-dark/50 hover:border-mjcc-gold/40 transition-all group"
                    >
                      {/* Initials avatar */}
                      <div className={`w-12 h-12 shrink-0 flex items-center justify-center text-sm font-medium ${
                        t.tier === "Marquee"
                          ? "bg-mjcc-gold/15 text-mjcc-gold border border-mjcc-gold/30"
                          : t.tier === "Core"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-mjcc-dark text-mjcc-platinum border border-mjcc-dark"
                      }`}>
                        {getInitials(t.name)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-mjcc-cream font-medium text-sm truncate">{t.name}</p>
                        <p className="text-[11px] text-mjcc-muted truncate">{t.genre}</p>
                      </div>

                      {/* Tier */}
                      <span className={`shrink-0 text-[10px] uppercase tracking-wider px-2 py-0.5 ${
                        t.tier === "Marquee"
                          ? "text-mjcc-gold bg-mjcc-gold/10"
                          : t.tier === "Core"
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-mjcc-platinum bg-mjcc-dark"
                      }`}>
                        {t.tier}
                      </span>

                      {/* CTA */}
                      <span className="shrink-0 text-xs text-mjcc-gold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                        Claim
                      </span>
                    </Link>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="text-center py-16">
                    <p className="font-serif text-xl text-mjcc-cream mb-2">No match found.</p>
                    <p className="text-sm text-mjcc-muted mb-4">
                      If you do not see your name, you may not have been invited yet.
                    </p>
                    <button
                      onClick={() => { setSearch(""); setActiveTier("All"); }}
                      className="text-sm text-mjcc-gold hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}

                {/* Not on the list? */}
                <div className="mt-12 text-center border-t border-mjcc-dark pt-10">
                  <p className="text-sm text-mjcc-muted mb-4">
                    Do not see your name? You can still apply to join BookTalent.
                  </p>
                  <button
                    onClick={() => setView("apply")}
                    className="text-sm text-mjcc-gold border border-mjcc-gold/30 px-6 py-2.5 hover:bg-mjcc-gold/10 transition-colors"
                  >
                    Apply as New Talent
                  </button>
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
