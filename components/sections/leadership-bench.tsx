"use client"

/**
 * The executive bench. Reads only published entries, so an unconfirmed advisor is
 * impossible to ship by accident.
 *
 * Deliberately restrained: initials in a bordered square, name, title, one short
 * bio. No hype adjectives, no gradients, no glow. A real agency's leadership page
 * gets its weight from who is on it and from the space around them, not from the
 * treatment. Gold is used once per card, on the industry title, which is the fact
 * doing the persuading.
 */

import { motion } from "framer-motion"
import { publishedLeadership } from "@/lib/leadership-data"

const ease = [0.16, 1, 0.3, 1] as const

export function LeadershipBench() {
  const people = publishedLeadership()
  if (people.length === 0) return null

  return (
    <section className="px-6 lg:px-12 py-20 lg:py-32 border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] text-mjcc-gold uppercase tracking-[0.25em] mb-5 font-bold text-center"
        >
          Work with industry insiders
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="font-serif text-[32px] sm:text-4xl lg:text-6xl text-white font-bold leading-[1.08] tracking-tight text-center max-w-3xl mx-auto"
        >
          Built by the people who built the industry.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mt-6 text-[15px] lg:text-[17px] text-white font-semibold leading-relaxed text-center max-w-xl mx-auto"
        >
          This is not another talent app. It is industry infrastructure, built by people with real
          track records and real rooms.
        </motion.p>

        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {people.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="bg-mjcc-black p-8 lg:p-10 flex flex-col"
            >
              <div className="w-14 h-14 border border-mjcc-gold/40 flex items-center justify-center mb-6 shrink-0">
                <span className="font-serif text-[17px] text-mjcc-gold font-bold tracking-wider">
                  {p.initials}
                </span>
              </div>

              <h3 className="font-serif text-[21px] lg:text-[23px] text-white font-bold leading-tight">
                {p.name}
              </h3>
              <p className="text-[12px] text-mjcc-gold uppercase tracking-[0.12em] mt-2 font-bold">
                {p.title}
              </p>
              <p className="text-[13px] lg:text-[14px] text-mjcc-muted leading-relaxed mt-5">
                {p.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
