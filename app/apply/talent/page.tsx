"use client"

/**
 * The talent questionnaire.
 *
 * The step list is derived from Step 1 rather than fixed, so the form a model sees
 * genuinely differs from the form an actor sees. Someone who is both walks both
 * conditional sections. Progress reflects the real path, not a nominal 4 of 4.
 */

import { useCallback, useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { SECTION_FOR_TYPE } from "@/lib/talent/vocab"
import { emptyDraft, type QuestionnaireDraft } from "@/lib/talent/types"
import { loadDraft, saveDraft, clearDraft } from "@/lib/talent/draft-store"
import { StepTypes, StepEssentials, StepDetails, StepMediaTerms } from "@/components/apply/steps-core"
import { SectionActor, SectionInfluencer, SectionModel, SectionPerformer } from "@/components/apply/steps-conditional"

const ease = [0.16, 1, 0.3, 1] as const

type StepId = "types" | "essentials" | "details" | "actor" | "influencer" | "model" | "performer" | "media"

const STEP_TITLES: Record<StepId, string> = {
  types: "Your work",
  essentials: "Get in",
  details: "About you",
  actor: "Acting",
  influencer: "Your audience",
  model: "Modelling",
  performer: "Your craft",
  media: "Media",
}

/**
 * Signup is types + essentials. Everything after is enrichment, and the talent is
 * already in the system by then, so abandoning it costs a complete profile rather
 * than the whole lead.
 */
const SIGNUP_STEPS: StepId[] = ["types", "essentials"]

export default function TalentQuestionnaire() {
  const [draft, setDraft] = useState<QuestionnaireDraft>(emptyDraft())
  const [index, setIndex] = useState(0)
  const [hydrated, setHydrated] = useState(false)
  const [resumed, setResumed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [signedUp, setSignedUp] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Resume where they left off.
  useEffect(() => {
    let live = true
    loadDraft().then((d) => {
      if (!live) return
      setDraft(d)
      if (d.talentTypes.length > 0) setResumed(true)
      setHydrated(true)
    })
    return () => {
      live = false
    }
  }, [])

  /**
   * The actual path through the form. Conditional sections are ordered by the
   * fixed key order rather than by pick order, so someone who checks Model then
   * Actor sees the same sequence as someone who checks Actor then Model.
   */
  const steps = useMemo<StepId[]>(() => {
    const sections = new Set(draft.talentTypes.map((t) => SECTION_FOR_TYPE[t]))
    const conditional = (["actor", "influencer", "model", "performer"] as const).filter((s) =>
      sections.has(s),
    )
    return [...SIGNUP_STEPS, "details", ...conditional, "media"]
  }, [draft.talentTypes])

  const current = steps[Math.min(index, steps.length - 1)]
  const isLast = index >= steps.length - 1
  const isSignupStep = SIGNUP_STEPS.includes(current)
  const isLastSignupStep = current === SIGNUP_STEPS[SIGNUP_STEPS.length - 1]

  const patch = useCallback((fn: (d: QuestionnaireDraft) => void) => {
    setDraft((prev) => {
      // Shallow clone per section is enough: the step components only ever mutate
      // one section, and a structuredClone on every keystroke is wasted work.
      const next: QuestionnaireDraft = {
        ...prev,
        universal: { ...prev.universal },
        actor: { ...prev.actor },
        influencer: { ...prev.influencer },
        model: { ...prev.model },
        performer: { ...prev.performer },
        media: { ...prev.media },
        terms: { ...prev.terms },
        talentTypes: [...prev.talentTypes],
      }
      fn(next)
      return next
    })
  }, [])

  // Autosave. Debounced so typing a name is not 30 writes.
  useEffect(() => {
    if (!hydrated) return
    const t = setTimeout(() => {
      void saveDraft({ ...draft, lastStep: current })
    }, 400)
    return () => clearTimeout(t)
  }, [draft, current, hydrated])

  const u = draft.universal
  const emailLooksReal = !!u.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(u.email)
  const essentialsReady =
    !!u.stageName?.trim() && emailLooksReal && !!draft.terms.agreedAgencyOfRecord && !!draft.terms.agreedCommission

  const canAdvance =
    current === "types" ? draft.talentTypes.length > 0
    : current === "essentials" ? essentialsReady
    : true

  const next = () => {
    if (!canAdvance) return
    patch((d) => {
      if (!d.completedSteps.includes(current)) d.completedSteps = [...d.completedSteps, current]
    })
    // Finishing the essentials IS the signup. Send it now rather than at the end,
    // so a profile abandoned halfway through enrichment is still a real lead.
    if (isLastSignupStep && !signedUp) return void send("signup")
    if (isLast) return void send("complete")
    setIndex((i) => Math.min(i + 1, steps.length - 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const back = () => {
    setIndex((i) => Math.max(i - 1, 0))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const send = async (phase: "signup" | "complete") => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/talent/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, phase }),
      })
      if (!res.ok) throw new Error(`Submit failed (${res.status})`)
      if (phase === "signup") {
        setSignedUp(true)
        setShowWelcome(true)
      } else {
        await clearDraft()
        setSubmitted(true)
      }
    } catch {
      // Never destroy their answers on a failure. The draft stays on disk so a
      // reload picks up exactly where they were.
      setError(
        phase === "signup"
          ? "We could not create your profile just then. Your answers are saved, so try again."
          : "We could not save that. Your answers are saved, so you can try again.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  const continueToProfile = () => {
    setShowWelcome(false)
    setIndex(SIGNUP_STEPS.length)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!hydrated) {
    return (
      <main className="bg-mjcc-black min-h-[100svh] flex items-center justify-center">
        <p className="text-[13px] text-mjcc-muted">Loading...</p>
      </main>
    )
  }

  // The signup landed. They are in the system with consent on record, so everything
  // from here is optional and framed as their upside, not our paperwork.
  if (showWelcome) {
    return (
      <main className="bg-mjcc-black min-h-[100svh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-md text-center"
        >
          <p className="text-[11px] text-mjcc-gold uppercase tracking-[0.25em] mb-4 font-bold">You are in</p>
          <h1 className="font-serif text-3xl lg:text-5xl text-white font-bold mb-5 leading-[1.1]">
            Welcome to BookTalent.
          </h1>
          <p className="text-[15px] lg:text-[16px] text-white font-semibold leading-relaxed mb-3">
            Your profile exists. Nothing else is required and nothing is owed unless you book.
          </p>
          <p className="text-[13px] text-mjcc-muted leading-relaxed mb-10">
            The next few questions are what bookers actually search on: the ages you play, the
            languages you speak, what you can credibly portray. Profiles that answer them get found.
            Ones that do not, mostly do not.
          </p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={continueToProfile}
              className="cta-button inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-10 py-4 text-[14px] font-bold tracking-[0.15em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[56px]"
            >
              FINISH MY PROFILE
            </button>
            <Link
              href="/"
              className="text-[12px] text-mjcc-muted hover:text-mjcc-gold underline underline-offset-4 py-2"
            >
              I will finish later
            </Link>
          </div>
        </motion.div>
      </main>
    )
  }

  if (submitted) {
    return (
      <main className="bg-mjcc-black min-h-[100svh] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="max-w-md text-center">
          <h1 className="font-serif text-3xl lg:text-4xl text-white font-bold mb-4">You are in.</h1>
          <p className="text-[15px] text-white font-semibold leading-relaxed mb-8">
            Your profile is with our team. We verify every profile by hand before it goes live to
            bookers, so give us a few days. We will email you when it is active, or if we need
            anything else from you.
          </p>
          <Link href="/" className="cta-button inline-flex items-center justify-center border-2 border-white text-white px-10 py-4 text-[14px] font-bold tracking-[0.15em] hover:border-mjcc-gold hover:text-mjcc-gold transition-all duration-300 min-h-[52px]">
            BACK TO HOME
          </Link>
        </motion.div>
      </main>
    )
  }

  const pct = Math.round(((index + 1) / steps.length) * 100)

  return (
    <main className="bg-mjcc-black min-h-[100svh] pb-32">
      {/* Progress */}
      <div className="sticky top-0 z-20 bg-mjcc-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[11px] text-white uppercase tracking-[0.2em] font-bold">
              {STEP_TITLES[current]}
            </span>
            <span className="font-mono text-[11px] text-mjcc-gold font-bold">
              {index + 1} / {steps.length}
            </span>
          </div>
          <div className="h-[2px] bg-white/10">
            <motion.div className="h-full bg-mjcc-gold" animate={{ width: `${pct}%` }} transition={{ duration: 0.4, ease }} />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 pt-8">
        {resumed && index === 0 && (
          <div className="mb-8 border border-mjcc-gold/30 px-4 py-3 flex items-center justify-between gap-4">
            <p className="text-[12px] text-white font-semibold">We saved where you left off.</p>
            <button
              type="button"
              onClick={() => {
                void clearDraft()
                setDraft(emptyDraft())
                setResumed(false)
                setIndex(0)
              }}
              className="text-[11px] text-mjcc-muted hover:text-mjcc-gold underline shrink-0"
            >
              Start over
            </button>
          </div>
        )}

        {/*
          Deliberately not AnimatePresence. framer-motion 11 predates React 19 and
          its AnimatePresence exit/enter handoff does not fire here: the incoming
          step mounts stuck at `initial` (opacity 0) and never animates in, so every
          step after the first renders blank. A keyed motion.div remounts on step
          change and plays initial -> animate normally. The cost is no exit fade,
          which a form does not need. See the note in package.json about upgrading
          to motion v12, which is the real fix.
        */}
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          {current === "types" && <StepTypes draft={draft} patch={patch} />}
          {current === "essentials" && <StepEssentials draft={draft} patch={patch} />}
          {current === "details" && <StepDetails draft={draft} patch={patch} />}
          {current === "actor" && <SectionActor draft={draft} patch={patch} />}
          {current === "influencer" && <SectionInfluencer draft={draft} patch={patch} />}
          {current === "model" && <SectionModel draft={draft} patch={patch} />}
          {current === "performer" && <SectionPerformer draft={draft} patch={patch} />}
          {current === "media" && <StepMediaTerms draft={draft} patch={patch} />}
        </motion.div>

        {error && <p className="text-[13px] text-mjcc-urgent font-semibold mb-4">{error}</p>}
      </div>

      {/* Nav */}
      <div className="fixed bottom-0 inset-x-0 bg-mjcc-black/95 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-lg mx-auto px-6 py-4 flex gap-3">
          {index > 0 && (
            <button type="button" onClick={back} className="px-6 py-4 border border-white/20 text-white text-[13px] font-bold tracking-[0.1em] hover:border-white/50 transition-colors min-h-[52px]">
              BACK
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance || submitting}
            className="cta-button flex-1 bg-mjcc-gold text-mjcc-black px-8 py-4 text-[13px] font-bold tracking-[0.15em] hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[52px] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {submitting
              ? "SAVING..."
              : isLastSignupStep && !signedUp
                ? "CREATE MY PROFILE"
                : isLast
                  ? "SAVE PROFILE"
                  : "CONTINUE"}
          </button>
        </div>
        <p className="text-center text-[10px] text-mjcc-muted pb-3 px-6">
          {isSignupStep
            ? "Free to join. 10% only when you book."
            : "Saved automatically. Leave and come back any time."}
        </p>
      </div>
    </main>
  )
}
