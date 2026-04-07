"use client"

import { motion } from "framer-motion"

export function MediaKit() {
  return (
    <section id="media-kit" className="bg-mjcc-black border-y border-mjcc-dark/50">
      <div className="px-6 py-16">
        <div className="text-center max-w-sm mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-[28px] text-mjcc-cream"
          >
            Get the media kit.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-sm text-mjcc-muted"
          >
            Roster, rates, formats, and case studies — everything you need in one download.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 flex flex-col gap-3"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="w-full bg-mjcc-charcoal border border-mjcc-dark px-4 py-3 text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
            />
            <button
              type="submit"
              className="w-full bg-mjcc-gold text-mjcc-black py-4 font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 text-sm min-h-[48px]"
            >
              DOWNLOAD MEDIA KIT
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-[10px] text-mjcc-muted"
          >
            Free. No spam.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
