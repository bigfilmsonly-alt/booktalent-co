"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface StickyBookingBarProps {
  ctaLabel: string
  ctaHref: string
}

export function StickyBookingBar({ ctaLabel, ctaHref }: StickyBookingBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-[72px] left-0 right-0 z-40 bg-mjcc-charcoal/95 backdrop-blur-2xl border-t border-mjcc-dark/40 px-6 py-3"
    >
      <Link
        href={ctaHref}
        className="flex items-center justify-center py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 min-h-[48px]"
      >
        {ctaLabel.toUpperCase()}
      </Link>
    </div>
  )
}
