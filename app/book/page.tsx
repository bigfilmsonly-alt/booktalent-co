"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const serviceOptions = [
  { value: "campaigns", label: "Campaign Package", desc: "Spark / Ignite / Primetime" },
  { value: "production", label: "Vertical Drama Production", desc: "Branded series by Big Films Only" },
  { value: "commerce", label: "Live Commerce Event", desc: "TikTok Shop, Amazon Live, Instagram" },
  { value: "ugc", label: "UGC Content Retainer", desc: "Monthly whitelisted ad content" },
  { value: "management", label: "Talent Management", desc: "Apply for representation" },
  { value: "live-stream", label: "Live Streaming", desc: "Twitch, YouTube Live, Instagram Live" },
  { value: "podcast", label: "Podcast", desc: "Guest appearances and hosted episodes" },
  { value: "enterprise", label: "Enterprise Partnership", desc: "The $500K annual bundle" },
  { value: "unsure", label: "Not sure yet", desc: "Help me decide" },
]

const budgetOptions = [
  "$10K to $25K",
  "$25K to $50K",
  "$50K to $100K",
  "$100K to $250K",
  "$250K to $500K",
  "$500K+",
]

const timelineOptions = [
  "Immediate",
  "1 to 2 months",
  "3 to 6 months",
  "Ongoing",
]

function BookingFlowInner() {
  const searchParams = useSearchParams()
  const initialService = searchParams.get("service") || ""
  const initialTalent = searchParams.get("talent") || ""

  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState(initialService)
  const [formData, setFormData] = useState({
    budget: "",
    timeline: "",
    goals: initialTalent ? `Interested in booking: ${initialTalent}` : "",
    name: "",
    email: "",
    company: "",
    role: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Pre-select service from query param
  useEffect(() => {
    if (initialService) {
      const valid = serviceOptions.some(o => o.value === initialService)
      if (valid) {
        setSelectedService(initialService)
        setStep(2)
      }
    }
  }, [initialService])

  const handleServiceSelect = (value: string) => {
    setSelectedService(value)
    setStep(2)
  }

  const handleStep2Next = () => {
    if (formData.budget && formData.timeline) {
      setStep(3)
    }
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.company) return
    setIsSubmitting(true)
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "booking",
          service: selectedService,
          talent: initialTalent,
          ...formData,
        }),
      })
    } catch {
      // continue to confirmation
    }
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    const serviceName = serviceOptions.find(o => o.value === selectedService)?.label || selectedService
    return (
      <div className="bg-mjcc-black min-h-screen pb-20 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <div className="w-16 h-16 bg-mjcc-gold/10 border border-mjcc-gold/30 flex items-center justify-center mx-auto mb-6">
            <span className="text-mjcc-gold text-2xl">&#10003;</span>
          </div>

          <h1 className="font-serif text-3xl text-mjcc-cream mb-4">
            Your booking request is in.
          </h1>

          <div className="bg-mjcc-charcoal border border-mjcc-dark p-4 mb-6 text-left">
            <p className="text-xs text-mjcc-gold uppercase tracking-wider mb-2">Booking Summary</p>
            <div className="space-y-1">
              <p className="text-sm text-mjcc-cream">{serviceName}</p>
              <p className="text-xs text-mjcc-muted">{formData.budget} &middot; {formData.timeline}</p>
              {initialTalent && <p className="text-xs text-mjcc-muted">Talent: {initialTalent}</p>}
            </div>
          </div>

          <div className="bg-mjcc-charcoal border border-mjcc-dark p-4 mb-8 text-left">
            <p className="text-xs text-mjcc-gold uppercase tracking-wider mb-2">What Happens Next</p>
            <div className="space-y-2">
              <div className="flex gap-3">
                <span className="font-mono text-xs text-mjcc-gold shrink-0">01</span>
                <p className="text-xs text-mjcc-muted">We review your brief and match talent within 24 hours.</p>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-xs text-mjcc-gold shrink-0">02</span>
                <p className="text-xs text-mjcc-muted">You receive a curated proposal with talent options and pricing.</p>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-xs text-mjcc-gold shrink-0">03</span>
                <p className="text-xs text-mjcc-muted">Approve the package and we begin production.</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-mjcc-muted mb-6">
            Check your inbox at <span className="text-mjcc-cream">{formData.email}</span> for a confirmation. We review every inquiry personally.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/#media-kit"
              className="inline-flex items-center justify-center border border-mjcc-gold/40 text-mjcc-gold px-8 py-4 text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px]"
            >
              DOWNLOAD MEDIA KIT
            </Link>
            <Link
              href="/case-studies"
              className="text-sm text-mjcc-gold hover:underline"
            >
              See campaign results while you wait &rarr;
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-mjcc-black min-h-screen pb-20 px-6">
      <div className="max-w-md mx-auto pt-12">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => s < step && setStep(s)}
                disabled={s > step}
                className={`font-mono text-sm w-8 h-8 flex items-center justify-center transition-colors ${
                  s === step
                    ? "text-mjcc-gold border border-mjcc-gold"
                    : s < step
                    ? "text-mjcc-gold/60 border border-mjcc-gold/30"
                    : "text-mjcc-muted/30 border border-mjcc-dark/30"
                }`}
              >
                {s}
              </button>
              {s < 3 && (
                <div className={`w-8 h-px ${s < step ? "bg-mjcc-gold/30" : "bg-mjcc-dark/30"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Service selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-serif text-2xl text-mjcc-cream mb-2 text-center">
                What are you booking?
              </h1>
              <p className="text-sm text-mjcc-muted mb-8 text-center">
                Select a service to get started.
              </p>

              <div className="space-y-3">
                {serviceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleServiceSelect(option.value)}
                    className={`w-full text-left p-4 border transition-colors duration-200 min-h-[48px] active:scale-[0.98] ${
                      selectedService === option.value
                        ? "border-mjcc-gold"
                        : "border-mjcc-dark/50 hover:border-mjcc-dark"
                    }`}
                  >
                    <span className="block text-sm text-mjcc-cream font-medium">{option.label}</span>
                    <span className="block text-xs text-mjcc-muted mt-0.5">{option.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Campaign details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-serif text-2xl text-mjcc-cream mb-2 text-center">
                Tell us about your campaign.
              </h1>
              <p className="text-sm text-mjcc-muted mb-8 text-center">
                Budget, timeline, and goals.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs text-mjcc-cream/60 mb-2">Budget Range *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {budgetOptions.map((b) => (
                      <button
                        key={b}
                        onClick={() => updateField("budget", b)}
                        className={`p-3 text-xs text-center border transition-colors min-h-[48px] ${
                          formData.budget === b
                            ? "border-mjcc-gold text-mjcc-gold"
                            : "border-mjcc-dark/50 text-mjcc-muted hover:border-mjcc-dark"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-mjcc-cream/60 mb-2">Timeline *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {timelineOptions.map((t) => (
                      <button
                        key={t}
                        onClick={() => updateField("timeline", t)}
                        className={`p-3 text-xs text-center border transition-colors min-h-[48px] ${
                          formData.timeline === t
                            ? "border-mjcc-gold text-mjcc-gold"
                            : "border-mjcc-dark/50 text-mjcc-muted hover:border-mjcc-dark"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-mjcc-cream/60 mb-2">Campaign Goals</label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => updateField("goals", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors resize-none text-sm"
                    placeholder="Describe your objectives..."
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-mjcc-dark/50 text-mjcc-muted text-sm tracking-wider hover:border-mjcc-dark transition-colors min-h-[48px]"
                >
                  BACK
                </button>
                <button
                  onClick={handleStep2Next}
                  disabled={!formData.budget || !formData.timeline}
                  className="flex-1 py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px]"
                >
                  NEXT
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact info */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-serif text-2xl text-mjcc-cream mb-2 text-center">
                Your details.
              </h1>
              <p className="text-sm text-mjcc-muted mb-8 text-center">
                So we can send you a proposal.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs text-mjcc-cream/60 mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-mjcc-cream/60 mb-2">Work Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-mjcc-cream/60 mb-2">Company / Brand *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-mjcc-cream/60 mb-2">Your Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => updateField("role", e.target.value)}
                    className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                    placeholder="VP Marketing, CMO, etc."
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 border border-mjcc-dark/50 text-mjcc-muted text-sm tracking-wider hover:border-mjcc-dark transition-colors min-h-[48px]"
                >
                  BACK
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.company}
                  className="flex-1 py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px]"
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="bg-mjcc-black min-h-screen pb-20 flex items-center justify-center">
        <span className="text-mjcc-muted text-sm">Loading...</span>
      </div>
    }>
      <BookingFlowInner />
    </Suspense>
  )
}
