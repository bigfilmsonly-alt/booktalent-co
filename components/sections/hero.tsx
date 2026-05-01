"use client"

import { motion } from "framer-motion"

const networks = ["VH1", "MTV", "BRAVO", "BET", "FOOD NETWORK", "NBC", "HALLMARK", "USA NETWORK", "OWN", "E!", "CBS"]

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col items-center justify-center bg-mjcc-black overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-mjcc-black via-mjcc-charcoal/20 to-mjcc-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.04)_0%,_transparent_70%)]" />
      <div className="noise-overlay" />

      <div className="relative z-10 px-6">
        <div className="max-w-md lg:max-w-3xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[38px] sm:text-5xl lg:text-7xl text-mjcc-cream leading-[1.08] tracking-tight"
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
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[15px] lg:text-[17px] text-mjcc-cream leading-relaxed max-w-[280px] lg:max-w-[480px] mx-auto"
          >
            Vetted creators from the biggest networks in television. Camera trained, audience trusted, ready to deliver for your brand.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="/book"
              className="cta-button inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-10 py-4 text-sm font-medium tracking-[0.15em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[52px] w-full sm:w-auto max-w-[280px]"
            >
              BOOK TALENT
            </a>
            <a
              href="/schedule"
              className="cta-button inline-flex items-center justify-center border border-mjcc-cream/30 text-mjcc-cream px-10 py-4 text-sm font-medium tracking-[0.15em] hover:border-mjcc-gold hover:text-mjcc-gold transition-all duration-300 min-h-[52px] w-full sm:w-auto max-w-[280px]"
            >
              SCHEDULE A CALL
            </a>
          </motion.div>
        </div>
      </div>

      {/* Trust line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-16 left-0 right-0 text-center px-6"
      >
        <p className="text-[11px] lg:text-xs text-mjcc-muted/60 uppercase tracking-[0.15em] max-w-xl mx-auto">
          A division of Big Films Only. 15+ years producing reality television. 74 creators currently bookable.
        </p>
      </motion.div>

      {/* Network marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 border-t border-mjcc-dark/40 py-5 overflow-hidden"
      >
        <div className="animate-marquee flex whitespace-nowrap items-center">
          {[...networks, ...networks, ...networks, ...networks].map((network, i) => (
            <span
              key={i}
              className="mx-10 text-[13px] lg:text-[15px] font-bold text-mjcc-cream/50 tracking-[4px] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {network}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
