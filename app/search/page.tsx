"use client"

/**
 * The brands page. Everything on one scroll, one submit.
 *
 * Search sits at the top and is live: type the brief and the chips prove we read it
 * before you commit to anything. Below it is the rest of the project, all optional.
 * A booker fills in as much as they feel like and hits send once.
 *
 * Only the brief and an email are required. Every other field is a nice-to-have for
 * us, not a hurdle for them: a producer who knows they need a Black actor who plays
 * 25 to 35 has told us enough to start, and blocking that on a budget band they have
 * not been given yet is how briefs get abandoned.
 */

import { useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { parseQuery, type ParsedQuery } from "@/lib/talent/parse-query"
import type { TalentSearchResult } from "@/lib/talent/types"
import { SERVICE_OPTIONS, BUDGET_OPTIONS, TIMELINE_OPTIONS } from "@/lib/booking-options"

const ease = [0.16, 1, 0.3, 1] as const

const EXAMPLES = [
  "Black actor, male, plays 25 to 35",
  "Latina who speaks Spanish, Miami",
  "Asian comedian in LA",
  "Fitness influencer over 500k followers",
  "Reality star, female, plays 30 to 40",
]

type SearchStatus = "idle" | "searching" | "ok" | "not_connected"

const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)

function Chip({
  on, onClick, children, sub,
}: { on: boolean; onClick: () => void; children: React.ReactNode; sub?: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`text-left px-4 py-3 border transition-colors min-h-[48px] ${
        on ? "border-mjcc-gold bg-mjcc-gold/10 text-white"
          : "border-white/15 text-mjcc-muted hover:border-white/40 hover:text-white"
      }`}
    >
      <span className="block text-[13px] font-semibold">{children}</span>
      {sub && <span className="block text-[11px] text-mjcc-muted mt-0.5">{sub}</span>}
    </button>
  )
}

function SectionLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <p className="text-[11px] text-mjcc-gold uppercase tracking-[0.2em] font-bold mb-4">
      {children}
      {optional && <span className="ml-2 text-mjcc-muted normal-case tracking-normal font-medium">Optional</span>}
    </p>
  )
}

const inputCls =
  "w-full bg-mjcc-charcoal border border-white/15 text-white px-4 py-3 text-[15px] " +
  "placeholder:text-white/25 focus:border-mjcc-gold focus:outline-none transition-colors min-h-[52px]"

export default function BrandsPage() {
  const [query, setQuery] = useState("")
  const [parsed, setParsed] = useState<ParsedQuery>({ filters: {}, understood: [], unmatched: [] })
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle")
  const [results, setResults] = useState<TalentSearchResult[]>([])
  const [total, setTotal] = useState(0)

  const [service, setService] = useState<string>("")
  const [budget, setBudget] = useState<string>("")
  const [timeline, setTimeline] = useState<string>("")
  const [goals, setGoals] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => setParsed(parseQuery(query)), [query])

  const runSearch = useCallback(async () => {
    if (!query.trim()) return
    setSearchStatus("searching")
    try {
      const res = await fetch("/api/talent/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
      const data = await res.json()
      setResults(data.results ?? [])
      setTotal(data.total ?? 0)
      setSearchStatus(data.status === "not_connected" ? "not_connected" : "ok")
    } catch {
      setSearchStatus("not_connected")
    }
  }, [query])

  const canSend = query.trim().length > 0 && emailOk(email)

  const submit = useCallback(async () => {
    if (!canSend) return
    setSending(true)
    setError(null)
    try {
      const res = await fetch("/api/booker/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, email, name, company, role, service, budget, timeline, goals }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setSent(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      setError("That did not send. Try again, or book a call and we will take it live.")
    } finally {
      setSending(false)
    }
  }, [canSend, query, email, name, company, role, service, budget, timeline, goals])

  if (sent) {
    return (
      <main className="bg-mjcc-black min-h-[100svh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-md text-center"
        >
          <p className="text-[11px] text-mjcc-gold uppercase tracking-[0.25em] mb-4 font-bold">Brief received</p>
          <h1 className="font-serif text-3xl lg:text-5xl text-white font-bold mb-5 leading-[1.1]">
            We have it.
          </h1>
          <p className="text-[15px] text-white font-semibold leading-relaxed mb-3">
            A real person reads every brief. Someone will come back to you directly.
          </p>
          <p className="text-[13px] text-mjcc-muted leading-relaxed mb-9">
            If you would rather talk it through now, book a call and we will come prepared.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/schedule" className="cta-button inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-10 py-4 text-[14px] font-bold tracking-[0.15em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[56px]">
              BOOK A CALL
            </Link>
            <Link href="/" className="text-[12px] text-mjcc-muted hover:text-mjcc-gold underline underline-offset-4 py-2">
              Back to home
            </Link>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="bg-mjcc-black min-h-[100svh] pb-32">
      <div className="px-6 lg:px-12 pt-10 lg:pt-16">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="font-serif text-[15px] text-white tracking-[0.4em] uppercase font-bold block text-center mb-12">
            BookTalent
          </Link>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[11px] text-mjcc-gold uppercase tracking-[0.25em] mb-5 font-bold text-center">
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
            Type it the way you would say it. Fill in as much of the rest as you want, or none of it,
            and send it in one go.
          </motion.p>

          {/* ── WHO YOU NEED ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-10"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                placeholder="Black actor, male, plays 25 to 35"
                className={`${inputCls} flex-1 py-4 min-h-[56px] text-[15px] lg:text-[16px]`}
              />
              <button
                type="button"
                onClick={runSearch}
                disabled={!query.trim() || searchStatus === "searching"}
                className="cta-button bg-mjcc-gold text-mjcc-black px-8 py-4 text-[14px] font-bold tracking-[0.12em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[56px] disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                {searchStatus === "searching" ? "SEARCHING..." : "SEARCH"}
              </button>
            </div>

            {/* Readback proves the brief was understood before they invest anything else. */}
            {parsed.understood.length > 0 && (
              <div className="mt-5">
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3">What we understood</p>
                <div className="flex flex-wrap gap-2">
                  {parsed.understood.map((u) => (
                    <span key={u.field} className="border border-mjcc-gold/40 bg-mjcc-gold/10 text-white px-3 py-2 text-[12px] font-semibold">
                      <span className="text-mjcc-gold">{u.label}:</span> {u.values.join(", ")}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {parsed.unmatched.length > 0 && (
              <p className="mt-3 text-[11px] text-mjcc-muted">Ignored: {parsed.unmatched.join(", ")}</p>
            )}

            {searchStatus === "idle" && (
              <div className="mt-6">
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3">Try</p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLES.map((e) => (
                    <button key={e} type="button" onClick={() => setQuery(e)}
                      className="border border-white/15 text-mjcc-muted hover:border-white/40 hover:text-white px-3 py-2 text-[12px] font-medium transition-colors">
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchStatus === "ok" && total > 0 && (
              <div className="mt-7">
                <p className="text-[12px] text-white/50 uppercase tracking-[0.15em] font-bold mb-4">
                  {total} {total === 1 ? "match" : "matches"}
                </p>
                <div className="grid grid-cols-1 gap-px bg-white/10 border border-white/10">
                  {results.map((r) => (
                    <div key={r.profileId} className="bg-mjcc-black p-5 flex items-center justify-between gap-5">
                      <div>
                        <p className="text-[15px] text-white font-bold">{r.stageName}</p>
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
              </div>
            )}

            {searchStatus === "ok" && total === 0 && (
              <p className="mt-6 text-[13px] text-mjcc-muted border border-white/15 px-4 py-3">
                Nobody matches that brief yet. Send it below and we will source it.
              </p>
            )}

            {/* Not connected and no matches are different facts and never render the same. */}
            {searchStatus === "not_connected" && (
              <div className="mt-6 border border-mjcc-gold/30 px-5 py-4">
                <p className="text-[13px] text-white font-semibold leading-relaxed">
                  We read your brief correctly. The roster is still onboarding.
                </p>
                <p className="text-[12px] text-mjcc-muted mt-2 leading-relaxed">
                  Send it below and we will come back with names that fit as they clear verification,
                  ahead of the public roster.
                </p>
              </div>
            )}
          </motion.div>

          {/* ── THE PROJECT. All optional. ───────────────────────── */}
          <div className="mt-16 pt-14 border-t border-white/10">
            <SectionLabel optional>What are you booking</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICE_OPTIONS.map((s) => (
                <Chip key={s.value} on={service === s.value} sub={s.desc}
                  onClick={() => setService(service === s.value ? "" : s.value)}>
                  {s.label}
                </Chip>
              ))}
            </div>

            <div className="mt-12">
              <SectionLabel optional>Budget</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BUDGET_OPTIONS.map((b) => (
                  <Chip key={b} on={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>{b}</Chip>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <SectionLabel optional>Timeline</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIMELINE_OPTIONS.map((t) => (
                  <Chip key={t} on={timeline === t} onClick={() => setTimeline(timeline === t ? "" : t)}>{t}</Chip>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <SectionLabel optional>Anything else</SectionLabel>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={4}
                placeholder="Deliverables, usage, dates, the thing you cannot compromise on."
                className={`${inputCls} resize-y`}
              />
            </div>
          </div>

          {/* ── CONTACT ──────────────────────────────────────────── */}
          <div className="mt-16 pt-14 border-t border-white/10">
            <SectionLabel>Where do we send names</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputCls} />
              <input type="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com" className={inputCls} />
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company or brand" className={inputCls} />
              <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Your role" className={inputCls} />
            </div>
            <p className="text-[11px] text-mjcc-muted mt-3">
              Only the brief and your email are required. Everything else helps, none of it blocks you.
            </p>
          </div>

          {error && <p className="text-[13px] text-mjcc-urgent font-semibold mt-6">{error}</p>}
        </div>
      </div>

      {/* One submit, always reachable. */}
      <div className="fixed bottom-0 inset-x-0 bg-mjcc-black/95 backdrop-blur-sm border-t border-white/10 z-40">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <button
            type="button"
            onClick={submit}
            disabled={!canSend || sending}
            className="cta-button w-full bg-mjcc-gold text-mjcc-black px-8 py-4 text-[14px] font-bold tracking-[0.15em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[56px] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {sending ? "SENDING..." : "SEND THIS BRIEF"}
          </button>
          <p className="text-center text-[10px] text-mjcc-muted pt-3">
            {canSend
              ? "A real person reads every brief."
              : !query.trim()
                ? "Describe who you need to send a brief."
                : "Add your email to send."}
          </p>
        </div>
      </div>
    </main>
  )
}
