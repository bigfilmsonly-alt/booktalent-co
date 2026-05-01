"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function StickyBookBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600)
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
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block fixed bottom-0 left-0 right-0 z-40 bg-mjcc-black/95 backdrop-blur-xl border-t border-mjcc-dark/40"
        >
          <div className="max-w-7xl mx-auto px-8 xl:px-12 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-mjcc-gold animate-pulse" />
              <p className="text-sm text-mjcc-cream">
                <span className="text-mjcc-gold font-medium">3 Q2 slots remaining.</span>
                {" "}Book verified talent for your next campaign.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/schedule"
                className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors tracking-wider"
              >
                SCHEDULE A CALL
              </Link>
              <Link
                href="/book"
                className="bg-mjcc-gold text-mjcc-black px-5 py-2 text-xs font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors"
              >
                BOOK TALENT
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
