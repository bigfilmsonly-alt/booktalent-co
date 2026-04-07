"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"

// ── Types ──────────────────────────────────────────────

interface TalentData {
  name: string
  credits: string
  following: string
  tags: string[]
  image: string
}

interface TalentBookingModalProps {
  talent: TalentData | null
  onClose: () => void
}

// ── Booking type options ───────────────────────────────

const bookingTypes = [
  {
    id: "tiktok",
    label: "TikTok Campaign",
    desc: "Short form sponsored content",
  },
  {
    id: "reels",
    label: "Instagram Reels",
    desc: "Branded Reels content",
  },
  {
    id: "shorts",
    label: "YouTube Shorts",
    desc: "Vertical content for YouTube",
  },
  {
    id: "live-commerce",
    label: "Live Commerce",
    desc: "Live shopping event on TikTok Shop, Amazon, or IG",
  },
  {
    id: "event",
    label: "Event Appearance",
    desc: "In person activation, premiere, or launch",
  },
  {
    id: "vertical-drama",
    label: "Vertical Drama",
    desc: "Scripted branded series role",
  },
  {
    id: "ugc",
    label: "UGC Content",
    desc: "Whitelisted ad content for your paid channels",
  },
  {
    id: "multiple",
    label: "Multiple / Not Sure",
    desc: "Tell us what you need. We'll build a package",
  },
]

const budgetRanges = [
  "$10K to $25K",
  "$25K to $50K",
  "$50K to $100K",
  "$100K to $250K",
  "$250K+",
]

// ── Calendar helpers ───────────────────────────────────

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"]

// ── Main component ─────────────────────────────────────

export function TalentBookingModal({ talent, onClose }: TalentBookingModalProps) {
  const today = new Date()

  // Steps: 1=booking type, 2=dates, 3=details, 4=done
  const [step, setStep] = useState(1)

  // Step 1 state
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Step 2 state (calendar)
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set())

  // Step 3 state (form)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate())
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth())

  // ── Calendar navigation ──

  const goToPrevMonth = useCallback(() => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1) }
    else { setViewMonth((m) => m - 1) }
  }, [viewMonth])

  const goToNextMonth = useCallback(() => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1) }
    else { setViewMonth((m) => m + 1) }
  }, [viewMonth])

  const toggleDate = useCallback((dateKey: string) => {
    setSelectedDates((prev) => {
      const next = new Set(prev)
      if (next.has(dateKey)) next.delete(dateKey)
      else next.add(dateKey)
      return next
    })
  }, [])

  // ── Form helpers ──

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const canSubmit = form.name.trim() && form.email.trim() && form.company.trim() && form.budget

  // ── Submit ──

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setStep(4)
  }, [])

  // ── Close & reset ──

  const handleClose = useCallback(() => {
    setStep(1)
    setSelectedType(null)
    setSelectedDates(new Set())
    setViewMonth(today.getMonth())
    setViewYear(today.getFullYear())
    setForm({ name: "", email: "", company: "", budget: "", notes: "" })
    setIsSubmitting(false)
    onClose()
  }, [onClose, today])

  const goBack = () => setStep((s) => Math.max(1, s - 1))

  // ── Step labels for progress ──

  const stepLabel = step === 1 ? "What are you booking?" : step === 2 ? "When?" : step === 3 ? "Your details" : ""
  const selectedTypeLabel = bookingTypes.find((t) => t.id === selectedType)?.label || ""

  return (
    <AnimatePresence>
      {talent && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Bottom sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:max-w-lg lg:max-h-[85vh] z-[201] bg-mjcc-charcoal max-h-[92vh] overflow-y-auto"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            {/* Drag indicator */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-mjcc-dark" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                {step > 1 && step < 4 && (
                  <button onClick={goBack} className="p-1 text-mjcc-muted" aria-label="Back">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="font-serif text-lg text-mjcc-cream">
                  {step < 4 ? `Book ${talent.name}` : ""}
                </h2>
              </div>
              <button onClick={handleClose} className="p-1.5 text-mjcc-muted" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Talent summary — compact */}
            {step < 4 && (
              <div className="flex items-center gap-3 px-5 pb-3">
                <img src={talent.image} alt={talent.name} className="w-12 h-12 object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-mjcc-muted truncate">{talent.credits}</p>
                  <p className="text-xs text-mjcc-gold font-mono">{talent.following}</p>
                </div>
              </div>
            )}

            {/* Step progress — 3 dots */}
            {step < 4 && (
              <div className="px-5 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-0.5 flex-1 transition-colors duration-300 ${
                        s <= step ? "bg-mjcc-gold" : "bg-mjcc-dark"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-mjcc-muted">
                  Step {step} of 3. {stepLabel}
                </p>
              </div>
            )}

            <div className="gold-divider" />

            {/* ─── STEP 1: Booking Type ─── */}
            {step === 1 && (
              <div className="px-5 pt-5 pb-6">
                <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-4 text-center">
                  What do you want to book them for?
                </p>

                <div className="space-y-2">
                  {bookingTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id)
                        setStep(2)
                      }}
                      className={`w-full text-left p-4 border transition-colors duration-150 active:scale-[0.98] min-h-[48px] ${
                        selectedType === type.id
                          ? "border-mjcc-gold bg-mjcc-gold/5"
                          : "border-mjcc-dark/50"
                      }`}
                    >
                      <span className="block text-sm text-mjcc-cream font-medium">{type.label}</span>
                      <span className="block text-xs text-mjcc-muted mt-0.5">{type.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── STEP 2: Calendar ─── */}
            {step === 2 && (
              <div className="px-5 pt-5 pb-6">
                {/* Selected type badge */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-[10px] text-mjcc-muted uppercase tracking-wider">Booking for:</span>
                  <span className="text-[10px] text-mjcc-gold font-medium">{selectedTypeLabel}</span>
                </div>

                <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-4 text-center">
                  Select Your Preferred Dates
                </p>

                {/* Month navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button onClick={goToPrevMonth} disabled={!canGoPrev} className="p-2 text-mjcc-muted disabled:opacity-20" aria-label="Previous month">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-mjcc-cream font-medium tracking-wide">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </span>
                  <button onClick={goToNextMonth} className="p-2 text-mjcc-muted" aria-label="Next month">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 mb-1">
                  {DAY_LABELS.map((d, i) => (
                    <span key={i} className="text-center text-[10px] text-mjcc-muted/50 py-1">{d}</span>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-y-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`e-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const dateKey = toDateKey(viewYear, viewMonth, day)
                    const isSelected = selectedDates.has(dateKey)
                    const isPast = dateKey < todayKey

                    return (
                      <button
                        key={dateKey}
                        disabled={isPast}
                        onClick={() => toggleDate(dateKey)}
                        className={`aspect-square flex items-center justify-center text-sm transition-all duration-150 ${
                          isSelected
                            ? "bg-mjcc-gold text-mjcc-black font-bold"
                            : isPast
                              ? "text-mjcc-muted/25"
                              : "text-mjcc-cream hover:bg-mjcc-dark"
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mt-4 mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-mjcc-gold" />
                    <span className="text-[10px] text-mjcc-muted">Selected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border border-mjcc-cream/30" />
                    <span className="text-[10px] text-mjcc-muted">Available</span>
                  </div>
                </div>

                {/* Selected dates chips */}
                {selectedDates.size > 0 && (
                  <div className="mt-3 p-3 bg-mjcc-black">
                    <p className="text-[10px] text-mjcc-gold uppercase tracking-wider mb-2">
                      Selected ({selectedDates.size})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from(selectedDates).sort().map((d) => {
                        const date = new Date(d + "T12:00:00")
                        return (
                          <button
                            key={d}
                            onClick={() => toggleDate(d)}
                            className="text-[11px] text-mjcc-cream bg-mjcc-dark px-2 py-1 font-mono hover:bg-mjcc-urgent/20 hover:text-mjcc-urgent transition-colors"
                          >
                            {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} &times;
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Next button */}
                <button
                  onClick={() => setStep(3)}
                  disabled={selectedDates.size === 0}
                  className="w-full mt-4 py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed uppercase min-h-[48px]"
                >
                  {selectedDates.size === 0
                    ? "Select at least one date"
                    : `Continue with ${selectedDates.size} date${selectedDates.size !== 1 ? "s" : ""}`}
                </button>
              </div>
            )}

            {/* ─── STEP 3: Contact Details ─── */}
            {step === 3 && (
              <div className="px-5 pt-5 pb-6">
                {/* Summary */}
                <div className="p-3 bg-mjcc-black mb-5">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-mjcc-muted">Booking type</span>
                    <span className="text-mjcc-cream">{selectedTypeLabel}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-mjcc-muted">Dates</span>
                    <span className="text-mjcc-cream">{selectedDates.size} selected</span>
                  </div>
                </div>

                <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-4 text-center">
                  Your Details
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-mjcc-cream/60 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-mjcc-cream/60 mb-1.5">Work Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-mjcc-cream/60 mb-1.5">Company / Brand *</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-mjcc-cream/60 mb-2">Budget Range *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {budgetRanges.map((b) => (
                        <button
                          key={b}
                          onClick={() => updateField("budget", b)}
                          className={`p-3 text-xs text-center border transition-colors min-h-[44px] ${
                            form.budget === b
                              ? "border-mjcc-gold text-mjcc-gold"
                              : "border-mjcc-dark/50 text-mjcc-muted"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-mjcc-cream/60 mb-1.5">Campaign Notes</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors resize-none text-sm"
                      placeholder="Anything else we should know..."
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="w-full mt-5 py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed uppercase min-h-[48px]"
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                </button>
              </div>
            )}

            {/* ─── STEP 4: Confirmation ─── */}
            {step === 4 && (
              <div className="px-5 py-16 text-center">
                <h3 className="font-serif text-2xl text-mjcc-cream mb-3">Booking request sent.</h3>
                <p className="text-sm text-mjcc-muted mb-1">
                  {selectedTypeLabel}. {selectedDates.size} date{selectedDates.size !== 1 ? "s" : ""} for {talent.name}.
                </p>
                <p className="text-sm text-mjcc-muted">
                  Our team will confirm availability and send a proposal within 48 hours.
                </p>

                {/* Summary card */}
                <div className="mt-6 p-4 bg-mjcc-black text-left max-w-xs mx-auto">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-mjcc-muted">Talent</span>
                      <span className="text-mjcc-cream">{talent.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mjcc-muted">Type</span>
                      <span className="text-mjcc-cream">{selectedTypeLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mjcc-muted">Dates</span>
                      <span className="text-mjcc-cream">{selectedDates.size} requested</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mjcc-muted">Budget</span>
                      <span className="text-mjcc-cream">{form.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mjcc-muted">Contact</span>
                      <span className="text-mjcc-cream truncate ml-4">{form.email}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="mt-8 bg-mjcc-gold text-mjcc-black px-10 py-3.5 text-sm font-medium tracking-wider min-h-[48px]"
                >
                  DONE
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
