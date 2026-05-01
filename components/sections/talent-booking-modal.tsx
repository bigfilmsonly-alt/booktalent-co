"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ArrowLeft, Clock } from "lucide-react"

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

const bookingTypes = [
  { id: "tiktok", label: "TikTok Campaign" },
  { id: "reels", label: "Instagram Reels" },
  { id: "shorts", label: "YouTube Shorts" },
  { id: "live-commerce", label: "Live Commerce" },
  { id: "event", label: "Event Appearance" },
  { id: "vertical-drama", label: "Vertical Drama" },
  { id: "ugc", label: "UGC Content" },
  { id: "live-stream", label: "Live Streaming" },
  { id: "podcast", label: "Podcast" },
  { id: "multiple", label: "Multiple / Not Sure" },
]

const budgetRanges = [
  "$10K to $25K",
  "$25K to $50K",
  "$50K to $100K",
  "$100K to $250K",
  "$250K+",
]

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

export function TalentBookingModal({ talent, onClose }: TalentBookingModalProps) {
  const today = new Date()

  // Only 2 steps now: 1=type+dates, 2=details, 3=done
  const [step, setStep] = useState(1)

  // Step 1 state
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set())

  // Step 2 state
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

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const canSubmit = form.name.trim() && form.email.trim() && form.company.trim() && form.budget

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setStep(3)
  }, [])

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

  const canGoToStep2 = selectedType && selectedDates.size > 0
  const selectedTypeLabel = bookingTypes.find((t) => t.id === selectedType)?.label || ""

  return (
    <AnimatePresence>
      {talent && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:max-w-lg lg:max-h-[85vh] z-[201] bg-mjcc-charcoal max-h-[92vh] overflow-y-auto"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-mjcc-dark" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                {step === 2 && (
                  <button onClick={() => setStep(1)} className="p-1 text-mjcc-muted" aria-label="Back">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="font-serif text-lg text-mjcc-cream">
                  {step < 3 ? `Book ${talent.name}` : ""}
                </h2>
              </div>
              <button onClick={handleClose} className="p-1.5 text-mjcc-muted" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Talent summary */}
            {step < 3 && (
              <div className="flex items-center gap-3 px-5 pb-3">
                <img src={talent.image} alt={talent.name} className="w-12 h-12 object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-mjcc-muted truncate">{talent.credits}</p>
                  <p className="text-xs text-mjcc-gold font-mono">{talent.following}</p>
                </div>
              </div>
            )}

            {/* 2-step progress — starts at 50% */}
            {step < 3 && (
              <div className="px-5 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 transition-colors duration-300 ${
                        s <= step ? "bg-mjcc-gold" : "bg-mjcc-dark"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-mjcc-muted">
                    Step {step} of 2
                  </p>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-mjcc-muted" />
                    <span className="text-[10px] text-mjcc-muted">Less than 5 minutes</span>
                  </div>
                </div>
              </div>
            )}

            <div className="gold-divider" />

            {/* STEP 1: Type + Dates combined */}
            {step === 1 && (
              <div className="px-5 pt-5 pb-6">
                <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-3 text-center">
                  What and when?
                </p>

                {/* Booking type — compact grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {bookingTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`text-left p-3 border transition-colors duration-150 active:scale-[0.98] min-h-[44px] ${
                        selectedType === type.id
                          ? "border-mjcc-gold bg-mjcc-gold/5 text-mjcc-gold"
                          : "border-mjcc-dark/50 text-mjcc-cream"
                      }`}
                    >
                      <span className="block text-xs font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>

                {/* Calendar */}
                <div className="flex items-center justify-between mb-3">
                  <button onClick={goToPrevMonth} disabled={!canGoPrev} className="p-2 text-mjcc-muted disabled:opacity-20" aria-label="Previous month">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-mjcc-cream font-medium tracking-wide">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </span>
                  <button onClick={goToNextMonth} className="p-2 text-mjcc-muted" aria-label="Next month">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 mb-1">
                  {DAY_LABELS.map((d, i) => (
                    <span key={i} className="text-center text-[10px] text-mjcc-muted/50 py-1">{d}</span>
                  ))}
                </div>

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

                {selectedDates.size > 0 && (
                  <div className="mt-3 p-2 bg-mjcc-black">
                    <div className="flex flex-wrap gap-1">
                      {Array.from(selectedDates).sort().map((d) => {
                        const date = new Date(d + "T12:00:00")
                        return (
                          <button
                            key={d}
                            onClick={() => toggleDate(d)}
                            className="text-[10px] text-mjcc-cream bg-mjcc-dark px-2 py-0.5 font-mono hover:bg-mjcc-urgent/20 hover:text-mjcc-urgent transition-colors"
                          >
                            {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} &times;
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  disabled={!canGoToStep2}
                  className="w-full mt-4 py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed uppercase min-h-[48px] cta-button"
                >
                  {!selectedType
                    ? "Select a booking type"
                    : selectedDates.size === 0
                      ? "Select at least one date"
                      : "CONTINUE"}
                </button>
              </div>
            )}

            {/* STEP 2: Contact Details */}
            {step === 2 && (
              <div className="px-5 pt-5 pb-6">
                <div className="p-3 bg-mjcc-black mb-5">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-mjcc-muted">Booking</span>
                    <span className="text-mjcc-cream">{selectedTypeLabel}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-mjcc-muted">Dates</span>
                    <span className="text-mjcc-cream">{selectedDates.size} selected</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                    <label className="block text-xs text-mjcc-cream/60 mb-1">Your Name *</label>
                    <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)} className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm" placeholder="Full name" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                    <label className="block text-xs text-mjcc-cream/60 mb-1">Work Email *</label>
                    <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm" placeholder="you@company.com" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <label className="block text-xs text-mjcc-cream/60 mb-1">Company *</label>
                    <input type="text" value={form.company} onChange={(e) => updateField("company", e.target.value)} className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm" placeholder="Company name" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <label className="block text-xs text-mjcc-cream/60 mb-1.5">Budget *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {budgetRanges.map((b) => (
                        <button key={b} onClick={() => updateField("budget", b)} className={`p-2.5 text-xs text-center border transition-colors min-h-[40px] ${form.budget === b ? "border-mjcc-gold text-mjcc-gold" : "border-mjcc-dark/50 text-mjcc-muted"}`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <label className="block text-xs text-mjcc-cream/60 mb-1">Notes</label>
                    <textarea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} rows={2} className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors resize-none text-sm" placeholder="Anything else..." />
                  </motion.div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="w-full mt-5 py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed uppercase min-h-[48px] cta-button"
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                </button>
              </div>
            )}

            {/* STEP 3: Confirmation */}
            {step === 3 && (
              <div className="px-5 py-16 text-center">
                <h3 className="font-serif text-2xl text-mjcc-cream mb-3">Booking request sent.</h3>
                <p className="text-sm text-mjcc-muted mb-1">
                  {selectedTypeLabel}. {selectedDates.size} date{selectedDates.size !== 1 ? "s" : ""} for {talent.name}.
                </p>
                <p className="text-sm text-mjcc-muted">
                  Our team will confirm availability and send a proposal within 48 hours.
                </p>

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
                  </div>
                </div>

                <button onClick={handleClose} className="mt-8 bg-mjcc-gold text-mjcc-black px-10 py-3.5 text-sm font-medium tracking-wider min-h-[48px] cta-button">
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
