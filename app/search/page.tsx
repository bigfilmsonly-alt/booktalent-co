"use client"

/**
 * Booker search.
 *
 * One input. A booker types the brief the way they would say it out loud, and the
 * page shows what it understood as removable chips before showing results. That
 * readback is the trust mechanism: casting people do not trust a black box that
 * silently drops half their brief, and the chips prove nothing was dropped.
 *
 * The parse runs on every keystroke and costs nothing. The query needs a database.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { parseQuery, type ParsedQuery } from "@/lib/talent/parse-query"
import type { TalentSearchResult } from "@/lib/talent/types"

const ease = [0.16, 1, 0.3, 1] as const

const EXAMPLES = [
  "Black actor, male, plays 25 to 35",
  "Latina who speaks Spanish, Miami",
  "Asian comedian in LA",
  "Fitness influencer over 500k followers",
  "Reality star, female, plays 30 to 40",
]

type Status = "idle" | "searching" | "ok" | "not_connected"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [parsed, setParsed] = useState<ParsedQuery>({ filters: {}, understood: [], unmatched: [] })
  const [status, setStatus] = useState<Status>("idle")
  const [results, setResults] = useState<TalentSearchResult[]>([])
  const [total, setTotal] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Parse locally on every keystroke. No network, no debounce needed.
  useEffect(() => {
    setParsed(parseQuery(query))
  }, [query])

  const run = useCallback(async () => {
    if (!query.trim()) return
    setStatus("searching")
    try {
      const res = await fetch("/api/talent/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
      const data = await res.json()
      setResults(data.results ?? [])
      setTotal(data.total ?? 0)
      setStatus(data.status === "not_connected" ? "not_connected" : "ok")
    } catch {
      setStatus("not_connected")
    }
  }, [query])

  return (
    <main className="bg-mjcc-black min-h-[100svh] pb-24">
      <div className="px-6 lg:px-12 pt-10 lg:pt-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="font-serif text-[15px] text-white tracking-[0.4em] uppercase font-bold block text-center mb-12">
            BookTalent
          </Link>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[11px] text-mjcc-gold uppercase tracking-[0.25em] mb-5 font-bold text-center"
          >
            Find talent
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[30px] sm:text-4xl lg:text-5xl text-white font-bold leading-[1.1] tracking-tight text-center"
          >
            Describe who you need.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-5 text-[14px] lg:text-[16px] text-mjcc-muted leading-relaxed text-center max-w-lg mx-auto"
          >
            Type it the way you would say it. No casting call, no four hundred submissions to read.
          </motion.p>

          {/* The input */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-10"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && run()}
                placeholder="Black actor, male, plays 25 to 35"
                className="flex-1 bg-mjcc-charcoal border border-white/15 text-white px-5 py-4 text-[15px] lg:text-[16px] placeholder:text-white/25 focus:border-mjcc-gold focus:outline-none transition-colors min-h-[56px]"
              />
              <button
                type="button"
                onClick={run}
                disabled={!query.trim() || status === "searching"}
                className="cta-button bg-mjcc-gold text-mjcc-black px-8 py-4 text-[14px] font-bold tracking-[0.12em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[56px] disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                {status === "searching" ? "SEARCHING..." : "SEARCH"}
              </button>
            </div>

            {/* Readback. This is the trust mechanism: show the brief was understood. */}
            {parsed.understood.length > 0 && (
              <div className="mt-5">
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3">
                  What we understood
                </p>
                {/* Display only. Editing the sentence is how you change the brief;
                    a removable chip would have to surgically rewrite what they typed
                    and would get it wrong often enough to be worse than nothing. */}
                <div className="flex flex-wrap gap-2">
                  {parsed.understood.map((u) => (
                    <span
                      key={u.field}
                      className="border border-mjcc-gold/40 bg-mjcc-gold/10 text-white px-3 py-2 text-[12px] font-semibold"
                    >
                      <span className="text-mjcc-gold">{u.label}:</span> {u.values.join(", ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {parsed.unmatched.length > 0 && (
              <p className="mt-3 text-[11px] text-mjcc-muted">
                Ignored: {parsed.unmatched.join(", ")}
              </p>
            )}
          </motion.div>

          {/* Examples */}
          {status === "idle" && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3">Try</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setQuery(e)}
                    className="border border-white/15 text-mjcc-muted hover:border-white/40 hover:text-white px-3 py-2 text-[12px] font-medium transition-colors"
                  >
                    {e}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="px-6 lg:px-12 mt-14">
        <div className="max-w-3xl mx-auto">
          {status === "ok" && total > 0 && (
            <>
              <p className="text-[12px] text-white/50 uppercase tracking-[0.15em] font-bold mb-5">
                {total} {total === 1 ? "match" : "matches"}
              </p>
              <div className="grid grid-cols-1 gap-px bg-white/10 border border-white/10">
                {results.map((r) => (
                  <div key={r.profileId} className="bg-mjcc-black p-6 flex items-center justify-between gap-5">
                    <div>
                      <p className="text-[16px] text-white font-bold">{r.stageName}</p>
                      <p className="text-[12px] text-mjcc-muted mt-1">
                        {[r.city, r.talentTypes?.join(", ")].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <span className="font-mono text-[12px] text-mjcc-gold font-bold shrink-0">
                      {Math.round(r.fitScore * 10)}% fit
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {status === "ok" && total === 0 && (
            <div className="border border-white/15 p-8 text-center">
              <p className="text-[15px] text-white font-semibold">Nobody matches that brief yet.</p>
              <p className="text-[13px] text-mjcc-muted mt-2 leading-relaxed">
                Try widening it, or tell us what you need and we will source it.
              </p>
              <Link href="/book" className="inline-block mt-6 text-[12px] text-mjcc-gold font-bold tracking-[0.15em] border-b border-mjcc-gold pb-1">
                TELL US WHO YOU NEED &rarr;
              </Link>
            </div>
          )}

          {/* Not connected is a different empty and must never look like "no matches". */}
          {status === "not_connected" && (
            <div className="border border-mjcc-gold/30 p-8 text-center">
              <p className="text-[11px] text-mjcc-gold uppercase tracking-[0.2em] font-bold mb-3">
                Search opens soon
              </p>
              <p className="text-[15px] text-white font-semibold leading-relaxed">
                We read your brief correctly. The roster is still onboarding.
              </p>
              <p className="text-[13px] text-mjcc-muted mt-3 leading-relaxed max-w-md mx-auto">
                BookTalent is signing talent now. Send us this brief and we will come back to you with
                names as they clear verification, ahead of the public roster.
              </p>
              <Link
                href="/book"
                className="cta-button inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-[13px] font-bold tracking-[0.15em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[52px] mt-7"
              >
                SEND THIS BRIEF
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
