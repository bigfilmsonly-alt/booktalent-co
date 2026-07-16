"use client"

/**
 * Homepage.
 *
 * Two audiences, one page. The hero forks them immediately rather than making
 * anyone read past a headline that is not for them, and both CTAs repeat at the
 * bottom for whoever scrolled the whole thing.
 *
 * Every number on this page is a credential, not a result. There is no roster count,
 * no reach figure, and no campaign metric, because none of those are true yet. The
 * leadership section carries the credibility instead, and it renders only people who
 * have agreed to be named. See lib/leadership-data.ts.
 */

import { motion } from "framer-motion"
import Link from "next/link"
import { LeadershipBench } from "@/components/sections/leadership-bench"
import { credentials } from "@/lib/leadership-data"
import { TALENT_TYPES } from "@/lib/talent/vocab"

const networks = ["VH1", "MTV", "BRAVO", "BET", "FOOD NETWORK", "NBC", "HALLMARK", "USA NETWORK", "OWN", "E!", "CBS"]

const ease = [0.16, 1, 0.3, 1] as const

const TALENT_STEPS = [
  { n: "01", t: "Build your profile", d: "Four fields to get in. The rest is what makes you findable: the ages you play, the languages you speak, who you can credibly portray." },
  { n: "02", t: "Get verified", d: "We check every credential by hand before a booker sees you. That check is why they trust the results." },
  { n: "03", t: "Get booked", d: "Bookers search and reach you directly. We handle the contract and the payment. Ten percent, only when you book." },
]

const BOOKER_STEPS = [
  { n: "01", t: "Search what you need", d: "Not keywords. Attributes. Plays 20 to 30, speaks Spanish, based in or will travel to Miami, comfortable with comedy." },
  { n: "02", t: "Shortlist and message", d: "Every profile is verified before it reaches you. Compare, shortlist, and reach talent on platform." },
  { n: "03", t: "Book through us", d: "One contract, one point of contact, one invoice. Big Films Only can produce it if you want it produced." },
]

export default function Home() {
  return (
    <main className="bg-mjcc-black">
      {/* ── 1. HERO ───────────────────────────────────────────────── */}
      <section className="min-h-[100svh] flex flex-col">
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

        {/* Padding and type scale down hard on small screens: this headline wraps to
            five or six lines on a 390px phone, and the two CTAs are the entire point
            of the page. They stay above the fold. */}
        <div className="flex-1 flex items-center justify-center px-6 py-8 lg:py-16">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-[10px] lg:text-[11px] text-mjcc-gold uppercase tracking-[0.25em] mb-4 lg:mb-6 font-bold"
            >
              Work with industry insiders
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="font-serif text-[30px] sm:text-5xl lg:text-7xl text-white leading-[1.08] tracking-tight font-bold"
            >
              The talent marketplace built by the people who{" "}
              <span className="text-mjcc-gold">built the industry.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease }}
              className="mt-4 lg:mt-7 text-[14px] lg:text-[19px] text-white font-semibold leading-relaxed max-w-xl mx-auto"
            >
              Most talent never gets in the room. We put you in it. Actors, models, influencers, and
              creators, discovered by the producers and brands who actually book.
            </motion.p>

            {/* Two paths, one tap each. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease }}
              className="mt-7 lg:mt-11 flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-stretch"
            >
              <Link
                href="/apply/talent"
                className="cta-button group flex flex-col items-center justify-center bg-mjcc-gold text-mjcc-black px-10 py-5 hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[64px] w-full sm:w-auto sm:min-w-[260px]"
              >
                <span className="text-[15px] font-bold tracking-[0.12em]">I AM TALENT, JOIN FREE</span>
                <span className="text-[11px] font-semibold opacity-70 mt-1">10% only when you book</span>
              </Link>
              <Link
                href="/book"
                className="cta-button group flex flex-col items-center justify-center border-2 border-white text-white px-10 py-5 hover:border-mjcc-gold hover:text-mjcc-gold transition-all duration-300 min-h-[64px] w-full sm:w-auto sm:min-w-[260px]"
              >
                <span className="text-[15px] font-bold tracking-[0.12em]">I AM BOOKING TALENT</span>
                <span className="text-[11px] font-semibold opacity-70 mt-1">Tell us who you need</span>
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="border-t border-white/10 py-4 overflow-hidden"
        >
          <div className="animate-marquee flex whitespace-nowrap items-center">
            {[...networks, ...networks, ...networks, ...networks].map((n, i) => (
              <span
                key={i}
                className="mx-8 lg:mx-10 text-[12px] lg:text-[14px] font-bold text-white/50 tracking-[3px] uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {n}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 2. THE PROBLEM ────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-20 lg:py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[11px] text-mjcc-gold uppercase tracking-[0.25em] mb-5 font-bold text-center"
          >
            The gap
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[30px] sm:text-4xl lg:text-5xl text-white font-bold leading-[1.12] tracking-tight text-center max-w-3xl mx-auto"
          >
            Two sides of the same broken door.
          </motion.h2>

          <div className="mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="bg-mjcc-black p-8 lg:p-10"
            >
              <p className="text-[11px] text-white/50 uppercase tracking-[0.2em] font-bold mb-4">If you are talent</p>
              <p className="text-[15px] lg:text-[16px] text-white font-semibold leading-relaxed mb-4">
                You are good and nobody is looking.
              </p>
              <p className="text-[13px] lg:text-[14px] text-mjcc-muted leading-relaxed">
                A model with editorial credits and 40K followers has nobody pitching her. An actor with
                a series credit cannot get a meeting. The agencies that could help will not take a call
                under a million followers, so the work goes to whoever was already in the room.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="bg-mjcc-black p-8 lg:p-10"
            >
              <p className="text-[11px] text-white/50 uppercase tracking-[0.2em] font-bold mb-4">If you are booking</p>
              <p className="text-[15px] lg:text-[16px] text-white font-semibold leading-relaxed mb-4">
                You post the call and hope.
              </p>
              <p className="text-[13px] lg:text-[14px] text-mjcc-muted leading-relaxed">
                You need someone who plays 20 to 30, speaks Spanish, and can carry comedy. So you post a
                casting call, get four hundred submissions, and read every one. Follower counts are
                inflated, credits are exaggerated, and there is no cheap way to check either.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. THE SOLUTION ───────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-20 lg:py-32 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[11px] text-mjcc-gold uppercase tracking-[0.25em] mb-5 font-bold"
          >
            What we built
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[30px] sm:text-4xl lg:text-5xl text-white font-bold leading-[1.12] tracking-tight"
          >
            One place where the two actually meet.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-7 text-[15px] lg:text-[17px] text-white font-semibold leading-relaxed"
          >
            Talent builds a profile that captures what they can actually do. We verify it. Bookers
            search on those attributes and book directly, with BookTalent as agency of record.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            className="mt-5 text-[13px] lg:text-[14px] text-mjcc-muted leading-relaxed"
          >
            Joining costs nothing. We take ten percent when work is booked through the platform, which
            means we only earn when our talent earns. Work you find yourself stays entirely yours.
          </motion.p>
        </div>
      </section>

      {/* ── 4. LEADERSHIP ─────────────────────────────────────────── */}
      <LeadershipBench />

      {/* ── 5. HOW IT WORKS ───────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-20 lg:py-32 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[30px] sm:text-4xl lg:text-5xl text-white font-bold leading-[1.12] tracking-tight text-center"
          >
            How it works.
          </motion.h2>

          <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
            {[
              { who: "For talent", steps: TALENT_STEPS, href: "/apply/talent", cta: "JOIN FREE" },
              { who: "For bookers", steps: BOOKER_STEPS, href: "/book", cta: "START A BOOKING" },
            ].map((col, ci) => (
              <motion.div
                key={col.who}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: ci * 0.1, ease }}
              >
                <p className="text-[11px] text-mjcc-gold uppercase tracking-[0.2em] font-bold mb-8">{col.who}</p>
                <div className="space-y-8">
                  {col.steps.map((s) => (
                    <div key={s.n} className="flex gap-5">
                      <span className="font-mono text-[13px] text-mjcc-gold font-bold shrink-0 pt-1">{s.n}</span>
                      <div>
                        <p className="text-[16px] text-white font-bold leading-snug">{s.t}</p>
                        <p className="text-[13px] lg:text-[14px] text-mjcc-muted leading-relaxed mt-2">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href={col.href}
                  className="inline-flex items-center mt-10 text-[12px] text-white font-bold tracking-[0.15em] border-b border-mjcc-gold pb-1 hover:text-mjcc-gold transition-colors"
                >
                  {col.cta} &rarr;
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. WHO WE REPRESENT ───────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-20 lg:py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[30px] sm:text-4xl lg:text-5xl text-white font-bold leading-[1.12] tracking-tight"
          >
            Whatever you are, the profile adapts.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-6 text-[15px] lg:text-[17px] text-white font-semibold leading-relaxed max-w-2xl mx-auto"
          >
            An actor answers about the ages they play and the accents they perform. A model answers
            about measurements and runway. Most working talent is more than one thing, and the profile
            is built to hold that instead of flattening it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-12 flex flex-wrap justify-center gap-2"
          >
            {TALENT_TYPES.map((t) => (
              <span
                key={t.value}
                className="border border-white/15 text-mjcc-muted px-4 py-2.5 text-[13px] font-semibold"
              >
                {t.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 7. CREDENTIALS ────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-16 lg:py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {credentials.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="text-center"
              >
                <span className="block font-mono text-2xl lg:text-4xl text-mjcc-gold font-bold">{c.value}</span>
                <span className="block text-[11px] lg:text-[12px] text-white/70 uppercase tracking-wider mt-2 font-semibold leading-snug">
                  {c.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ──────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-20 lg:py-32 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[32px] sm:text-4xl lg:text-6xl text-white font-bold leading-[1.08] tracking-tight"
          >
            Pick your side of the room.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-11 flex flex-col sm:flex-row gap-4 justify-center items-stretch"
          >
            <Link
              href="/apply/talent"
              className="cta-button flex flex-col items-center justify-center bg-mjcc-gold text-mjcc-black px-10 py-5 hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[64px] w-full sm:w-auto sm:min-w-[260px]"
            >
              <span className="text-[15px] font-bold tracking-[0.12em]">I AM TALENT, JOIN FREE</span>
              <span className="text-[11px] font-semibold opacity-70 mt-1">10% only when you book</span>
            </Link>
            <Link
              href="/book"
              className="cta-button flex flex-col items-center justify-center border-2 border-white text-white px-10 py-5 hover:border-mjcc-gold hover:text-mjcc-gold transition-all duration-300 min-h-[64px] w-full sm:w-auto sm:min-w-[260px]"
            >
              <span className="text-[15px] font-bold tracking-[0.12em]">I AM BOOKING TALENT</span>
              <span className="text-[11px] font-semibold opacity-70 mt-1">Tell us who you need</span>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-12 text-[11px] lg:text-[12px] text-white/60 uppercase tracking-[0.15em] font-semibold"
          >
            A division of Big Films Only. Free for talent. Campaign packages from $15K.
          </motion.p>
        </div>
      </section>
    </main>
  )
}
