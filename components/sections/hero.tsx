"use client"

import { motion } from "framer-motion"

const networks = [
  "BRAVO",
  "MTV",
  "VH1",
  "BET",
  "E!",
  "NBC",
  "ABC",
  "CBS",
  "FOX",
  "FOOD NETWORK",
  "HGTV",
  "TLC",
  "NETFLIX",
  "AMAZON PRIME",
  "HULU",
  "PEACOCK",
  "DISCOVERY+",
  "HBO MAX",
  "PARAMOUNT+",
  "USA NETWORK",
  "LIFETIME",
  "A&E",
  "HISTORY",
  "OWN",
  "WE TV",
  "FREEFORM",
  "HALLMARK",
  "OXYGEN",
  "TUBI",
  "DISCOVERY",
]

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col items-center justify-center bg-mjcc-black overflow-hidden">
      <div className="noise-overlay" />

      <div className="relative z-10 px-6 -mt-12">
        <div className="max-w-md mx-auto text-center">
          {/* Headline — positioned above center for mobile */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[42px] sm:text-5xl text-mjcc-cream leading-[1.08] tracking-tight"
          >
            Book Verified
            <br />
            Reality TV
            <br />
            <span className="text-mjcc-gold">Talent.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[15px] text-mjcc-muted leading-relaxed max-w-[280px] mx-auto"
          >
            Proven TV talent for brand campaigns, content, and live commerce. 15 years of relationships — one&nbsp;platform.
          </motion.p>

          {/* CTAs — slightly lower for breathing room */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col gap-3 max-w-[280px] mx-auto"
          >
            <a
              href="#talent-application"
              className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 min-h-[48px]"
            >
              APPLY AS TALENT
            </a>
            <a
              href="/book"
              className="inline-flex items-center justify-center border border-mjcc-gold/40 text-mjcc-gold py-4 text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px]"
            >
              BOOK TALENT
            </a>
          </motion.div>
        </div>
      </div>

      {/* Network marquee — understated */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 border-t border-mjcc-dark/40 py-4 overflow-hidden"
      >
        <div className="animate-marquee flex whitespace-nowrap">
          {[...networks, ...networks].map((network, i) => (
            <span key={i} className="mx-6 text-[10px] font-mono text-mjcc-muted/50 tracking-[0.2em]">
              {network}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
