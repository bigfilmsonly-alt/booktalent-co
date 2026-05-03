"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const networks = ["VH1", "MTV", "BRAVO", "BET", "FOOD NETWORK", "NBC", "HALLMARK", "USA NETWORK", "OWN", "E!", "CBS"]

const ease = [0.16, 1, 0.3, 1] as const

export default function Home() {
  return (
    <main className="bg-mjcc-black min-h-[100svh] flex flex-col">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-10 lg:pt-14 text-center"
      >
        <Link href="/" className="font-serif text-[15px] lg:text-[17px] text-mjcc-cream tracking-[0.4em] uppercase">
          BookTalent
        </Link>
      </motion.div>

      {/* Center content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg lg:max-w-2xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="font-serif text-[36px] sm:text-5xl lg:text-6xl text-mjcc-cream leading-[1.08] tracking-tight"
          >
            Premium talent.
            <br />
            Proven on{" "}
            <span className="text-mjcc-gold">television.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="mt-5 text-[15px] lg:text-[17px] text-mjcc-muted leading-relaxed max-w-md mx-auto"
          >
            74 verified creators across 11 networks. Book talent for campaigns, live commerce, and branded content.
          </motion.p>

          {/* Two CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/book"
              className="cta-button inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-10 py-4 text-sm font-medium tracking-[0.15em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[52px] w-full sm:w-auto max-w-[260px]"
            >
              BOOK TALENT
            </Link>
            <Link
              href="/apply"
              className="cta-button inline-flex items-center justify-center border border-mjcc-cream/30 text-mjcc-cream px-10 py-4 text-sm font-medium tracking-[0.15em] hover:border-mjcc-gold hover:text-mjcc-gold transition-all duration-300 min-h-[52px] w-full sm:w-auto max-w-[260px]"
            >
              APPLY AS TALENT
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex justify-center gap-8 lg:gap-12"
          >
            {[
              { value: "74", label: "Creators" },
              { value: "11", label: "Networks" },
              { value: "15+", label: "Years" },
              { value: "290M+", label: "Reach" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block font-mono text-lg lg:text-xl text-mjcc-gold">{s.value}</span>
                <span className="block text-[9px] lg:text-[10px] text-mjcc-muted uppercase tracking-wider mt-1">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trust + Network marquee at bottom */}
      <div className="mt-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center text-[10px] lg:text-[11px] text-mjcc-muted/50 uppercase tracking-[0.15em] px-6 mb-4"
        >
          A division of Big Films Only. Campaign packages from $15K.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="border-t border-mjcc-dark/40 py-4 overflow-hidden"
        >
          <div className="animate-marquee flex whitespace-nowrap items-center">
            {[...networks, ...networks, ...networks, ...networks].map((network, i) => (
              <span
                key={i}
                className="mx-8 lg:mx-10 text-[11px] lg:text-[13px] font-bold text-mjcc-cream/30 tracking-[3px] uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {network}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
