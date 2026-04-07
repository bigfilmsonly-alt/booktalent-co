"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const networks = ["MTV", "FOOD NETWORK", "NBC", "HALLMARK", "USA NETWORK", "OWN", "CBS"]

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col items-center justify-center bg-mjcc-black overflow-hidden">
      <div className="noise-overlay" />

      <div className="relative z-10 px-6 -mt-12 lg:mt-0">
        <div className="max-w-md lg:max-w-3xl mx-auto text-center">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[3px] text-mjcc-platinum mb-6"
          >
            The Network Behind The Network
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[42px] sm:text-5xl lg:text-7xl xl:text-8xl text-mjcc-cream leading-[1.05] tracking-tight"
          >
            Book television verified
            <br />
            <span className="text-mjcc-gold">talent.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 lg:mt-8 text-[15px] lg:text-[17px] text-mjcc-muted leading-relaxed max-w-[300px] lg:max-w-[560px] mx-auto"
          >
            Fifteen years of television relationships. Reality TV personalities from MTV, NBC, Food Network, and beyond. Vetted, camera trained, ready to book.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col lg:flex-row lg:justify-center gap-3 max-w-[280px] lg:max-w-none mx-auto"
          >
            <a
              href="/apply"
              className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black py-4 lg:px-10 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-colors duration-300 min-h-[48px]"
            >
              APPLY AS TALENT
            </a>
            <a
              href="/book"
              className="inline-flex items-center justify-center border border-mjcc-cream/20 text-mjcc-cream py-4 lg:px-10 text-sm font-medium tracking-wider hover:bg-mjcc-cream hover:text-mjcc-black transition-all duration-300 min-h-[48px]"
            >
              BOOK TALENT NOW
            </a>
          </motion.div>

          {/* Secondary link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4"
          >
            <Link href="/schedule" className="text-xs text-mjcc-muted underline hover:text-mjcc-gold transition-colors">
              Or schedule a 20 minute call directly
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Network marquee — 8 broadcast networks only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 border-t border-mjcc-dark/40 py-4 overflow-hidden"
      >
        <div className="animate-marquee flex whitespace-nowrap">
          {[...networks, ...networks, ...networks, ...networks].map((network, i) => (
            <span key={i} className="mx-8 text-[11px] font-mono text-mjcc-platinum/50 tracking-[2px]">
              {network}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
