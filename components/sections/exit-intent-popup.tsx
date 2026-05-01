"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const dismissed = sessionStorage.getItem("bt-popup-dismissed")
    if (dismissed) return

    let triggered = false

    // Desktop: exit intent (mouse leaves viewport at top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true
        setShow(true)
      }
    }

    // Mobile: scroll depth (60% of page)
    const handleScroll = () => {
      if (triggered) return
      const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight
      if (scrollPercent > 0.6) {
        triggered = true
        setShow(true)
      }
    }

    // Delay listeners so popup doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
      window.addEventListener("scroll", handleScroll, { passive: true })
    }, 10000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleDismiss = () => {
    setShow(false)
    sessionStorage.setItem("bt-popup-dismissed", "true")
  }

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
      // continue
    }
    setSubmitted(true)
    setTimeout(handleDismiss, 3000)
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-6"
          >
            <div className="bg-mjcc-charcoal border border-mjcc-dark w-full max-w-sm p-8 relative">
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-mjcc-muted hover:text-mjcc-cream transition-colors"
              >
                <X size={18} />
              </button>

              {submitted ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-mjcc-gold/10 border border-mjcc-gold/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-mjcc-gold text-xl">&#10003;</span>
                  </div>
                  <p className="font-serif text-xl text-mjcc-cream mb-2">Check your inbox.</p>
                  <p className="text-xs text-mjcc-muted">The media kit is on its way.</p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-3">
                    Before You Go
                  </p>
                  <h3 className="font-serif text-2xl text-mjcc-cream mb-2">
                    Get the media kit.
                  </h3>
                  <p className="text-sm text-mjcc-muted leading-relaxed mb-6">
                    Roster, rates, case studies, and formats. Everything you need to evaluate BookTalent in one download. Free. No spam.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Your work email"
                      className="w-full bg-mjcc-dark border border-mjcc-dark px-4 py-3 text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full bg-mjcc-gold text-mjcc-black py-4 font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors text-sm min-h-[48px]"
                    >
                      SEND ME THE MEDIA KIT
                    </button>
                  </form>

                  <p className="text-center mt-4">
                    <button
                      onClick={handleDismiss}
                      className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors"
                    >
                      No thanks, I&apos;ll keep browsing
                    </button>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
