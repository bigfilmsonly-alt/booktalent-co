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
        <Link href="/" className="font-serif text-[17px] lg:text-[19px] text-white tracking-[0.4em] uppercase font-bold">
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
            className="font-serif text-[38px] sm:text-5xl lg:text-7xl text-white leading-[1.08] tracking-tight font-bold"
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
            className="mt-6 text-[16px] lg:text-[18px] text-white font-semibold leading-relaxed max-w-md mx-auto"
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
              className="cta-button inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-10 py-4 text-[15px] font-bold tracking-[0.15em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[56px] w-full sm:w-auto max-w-[280px]"
            >
              BOOK TALENT
            </Link>
            <Link
              href="/apply"
              className="cta-button inline-flex items-center justify-center border-2 border-white text-white px-10 py-4 text-[15px] font-bold tracking-[0.15em] hover:border-mjcc-gold hover:text-mjcc-gold transition-all duration-300 min-h-[56px] w-full sm:w-auto max-w-[280px]"
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
                <span className="block font-mono text-xl lg:text-2xl text-mjcc-gold font-bold">{s.value}</span>
                <span className="block text-[10px] lg:text-[11px] text-white/80 uppercase tracking-wider mt-1 font-semibold">{s.label}</span>
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
          className="text-center text-[11px] lg:text-[12px] text-white/60 uppercase tracking-[0.15em] px-6 mb-4 font-semibold"
        >
          A division of Big Films Only. Campaign packages from $15K.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="border-t border-white/10 py-4 overflow-hidden"
        >
          <div className="animate-marquee flex whitespace-nowrap items-center">
            {[...networks, ...networks, ...networks, ...networks].map((network, i) => (
              <span
                key={i}
                className="mx-8 lg:mx-10 text-[12px] lg:text-[14px] font-bold text-white/50 tracking-[3px] uppercase"
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
