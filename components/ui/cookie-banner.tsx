"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:max-w-sm z-[100] bg-mjcc-charcoal border border-mjcc-dark/50 p-4"
        >
          <p className="text-xs text-mjcc-muted leading-relaxed">
            We use cookies to improve your experience and measure site performance.
          </p>
          <div className="flex gap-2 mt-3">
            <button onClick={decline} className="flex-1 py-2 border border-mjcc-dark/50 text-xs text-mjcc-muted tracking-wider hover:border-mjcc-cream hover:text-mjcc-cream transition-colors">
              DECLINE
            </button>
            <button onClick={accept} className="flex-1 py-2 bg-mjcc-gold text-mjcc-black text-xs font-medium tracking-wider hover:bg-mjcc-gold-deep transition-colors">
              ACCEPT
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
