"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock } from "lucide-react"

export function StickyCTABar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed z-40 left-0 right-0 bottom-[72px] lg:bottom-0"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="bg-mjcc-charcoal/95 backdrop-blur-xl border-t border-mjcc-gold/20">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-sm text-mjcc-cream font-medium">Ready to launch your campaign?</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-mjcc-muted" />
                  <span className="text-[11px] text-mjcc-muted">60 second booking</span>
                </div>
              </div>
              <a
                href="/book"
                className="cta-button flex-1 lg:flex-none text-center bg-mjcc-gold text-mjcc-black px-8 py-3 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[44px] flex items-center justify-center"
              >
                BOOK TALENT NOW
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
