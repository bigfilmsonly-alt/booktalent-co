"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Footer } from "@/components/sections/footer"

const ease = [0.16, 1, 0.3, 1]

const team = [
  { initials: "JH", name: "Jotham Hall", title: "Co-Founder & CEO" },
  { initials: "M", name: "Mira", title: "Co-Founder & Talent Director" },
]

const steps = [
  {
    number: "01",
    title: "Pick a time",
    body: "Choose a slot that works. Monday through Friday, Eastern Time.",
  },
  {
    number: "02",
    title: "Quick intake form",
    body: "Three questions about your brand, goals, and budget so we come prepared with specific recommendations.",
  },
  {
    number: "03",
    title: "Get your blueprint",
    body: "Talent recommendations, package options, timeline, and deliverables. Everything you need to make a decision.",
  },
]

const availableSlots = [
  { day: "Monday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
  { day: "Tuesday", times: ["9:00 AM", "11:00 AM", "3:00 PM"] },
  { day: "Wednesday", times: ["10:00 AM", "1:00 PM", "4:00 PM"] },
  { day: "Thursday", times: ["9:00 AM", "2:00 PM", "3:30 PM"] },
  { day: "Friday", times: ["10:00 AM", "12:00 PM", "2:00 PM"] },
]

function getNextWeekDates() {
  const dates: { day: string; date: string; fullDate: Date }[] = []
  const now = new Date()
  let d = new Date(now)
  d.setDate(d.getDate() + 1)

  while (dates.length < 5) {
    const dayOfWeek = d.getDay()
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      dates.push({
        day: dayNames[dayOfWeek],
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        fullDate: new Date(d),
      })
    }
    d.setDate(d.getDate() + 1)
  }
  return dates
}

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", company: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const weekDates = getNextWeekDates()

  const selectedDayData = selectedDay !== null ? availableSlots[selectedDay % 5] : null

  const handleBookCall = async () => {
    if (!formData.name || !formData.email || !selectedTime) return
    setIsSubmitting(true)
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "schedule",
          ...formData,
          selectedDate: selectedDay !== null ? weekDates[selectedDay].date : "",
          selectedTime,
        }),
      })
    } catch {
      // continue to confirmation
    }
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <>
        <section className="px-6 pt-12 pb-16">
          <div className="max-w-lg mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="w-16 h-16 bg-mjcc-gold/10 border border-mjcc-gold/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-mjcc-gold text-2xl">&#10003;</span>
              </div>
              <h1 className="font-serif text-3xl text-mjcc-cream mb-4">
                You&apos;re booked.
              </h1>
              <p className="text-sm text-mjcc-muted leading-relaxed mb-2">
                {selectedDay !== null && weekDates[selectedDay] && (
                  <span className="text-mjcc-gold font-medium">
                    {weekDates[selectedDay].date} at {selectedTime}
                  </span>
                )}
              </p>
              <p className="text-sm text-mjcc-muted leading-relaxed mb-8">
                Check your inbox for a calendar invite and intake form. We come prepared, so the more you share upfront, the more actionable the call will be.
              </p>
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/roster"
                  className="text-sm text-mjcc-gold hover:underline"
                >
                  Browse the roster while you wait &rarr;
                </Link>
                <Link
                  href="/case-studies"
                  className="text-sm text-mjcc-gold hover:underline"
                >
                  See what past campaigns delivered &rarr;
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="px-6 pt-12 pb-16">
        <div className="max-w-lg mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            Schedule a Call
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-serif text-3xl text-mjcc-cream"
          >
            Walk away with a custom campaign blueprint.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-4 text-[15px] text-mjcc-warm leading-relaxed max-w-sm mx-auto"
          >
            In 20 minutes, you will get talent recommendations matched to your audience, a budget plan across our packages, and a clear timeline with deliverables. No obligation.
          </motion.p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Who you'll meet */}
      <section className="px-6 py-16">
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6"
          >
            Who You&apos;ll Meet
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="grid grid-cols-2 gap-4"
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-mjcc-charcoal border border-mjcc-dark p-4"
              >
                <div className="w-12 h-12 bg-mjcc-charcoal border border-mjcc-dark flex items-center justify-center mb-3">
                  <span className="font-serif text-mjcc-gold text-sm">
                    {member.initials}
                  </span>
                </div>
                <p className="text-sm font-medium text-mjcc-cream">
                  {member.name}
                </p>
                <p className="text-xs text-mjcc-platinum mt-0.5">
                  {member.title}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Calendar booking */}
      <section className="px-6 py-16">
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6"
          >
            Pick a Time
          </motion.p>

          {/* Day selection */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="grid grid-cols-5 gap-2 mb-6"
          >
            {weekDates.map((d, i) => (
              <button
                key={d.date}
                onClick={() => { setSelectedDay(i); setSelectedTime(null) }}
                className={`p-3 border text-center transition-colors ${
                  selectedDay === i
                    ? "border-mjcc-gold bg-mjcc-gold/10"
                    : "border-mjcc-dark hover:border-mjcc-dark"
                }`}
              >
                <span className="block text-[10px] text-mjcc-muted uppercase tracking-wider">
                  {d.day.slice(0, 3)}
                </span>
                <span className={`block text-sm mt-1 ${selectedDay === i ? "text-mjcc-gold" : "text-mjcc-cream"}`}>
                  {d.date}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Time selection */}
          {selectedDay !== null && selectedDayData && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="mb-8"
            >
              <p className="text-xs text-mjcc-cream/60 mb-3">Available times (ET)</p>
              <div className="grid grid-cols-3 gap-2">
                {selectedDayData.times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 border text-sm text-center transition-colors ${
                      selectedTime === time
                        ? "border-mjcc-gold text-mjcc-gold bg-mjcc-gold/10"
                        : "border-mjcc-dark text-mjcc-muted hover:border-mjcc-dark hover:text-mjcc-cream"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contact form */}
          {selectedTime && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="space-y-4"
            >
              <div className="bg-mjcc-charcoal border border-mjcc-gold/20 p-4 mb-6">
                <p className="text-sm text-mjcc-cream">
                  <span className="text-mjcc-gold font-medium">
                    {weekDates[selectedDay!].date}
                  </span>
                  {" "}at{" "}
                  <span className="text-mjcc-gold font-medium">{selectedTime}</span>
                  {" "}ET &middot; 20 min discovery call
                </p>
              </div>

              <div>
                <label className="block text-xs text-mjcc-cream/60 mb-2">Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-xs text-mjcc-cream/60 mb-2">Work Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-xs text-mjcc-cream/60 mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-3 bg-mjcc-dark border border-mjcc-dark text-mjcc-cream placeholder:text-mjcc-muted/50 focus:border-mjcc-gold transition-colors text-sm"
                  placeholder="Company name"
                />
              </div>

              <button
                onClick={handleBookCall}
                disabled={isSubmitting || !formData.name || !formData.email}
                className="w-full py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px]"
              >
                {isSubmitting ? "BOOKING..." : "CONFIRM BOOKING"}
              </button>
            </motion.div>
          )}

          {/* Fallback */}
          {!selectedTime && selectedDay === null && (
            <p className="text-xs text-mjcc-muted text-center mt-4">
              Select a day above to see available times. Or email us directly at{" "}
              <a href="mailto:hello@booktalent.co" className="text-mjcc-gold hover:underline">
                hello@booktalent.co
              </a>
            </p>
          )}
        </div>
      </section>

      <div className="gold-divider" />

      {/* What to expect */}
      <section className="px-6 py-16">
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-8"
          >
            What to Expect
          </motion.p>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
              >
                <p className="font-mono text-mjcc-gold text-xs mb-1">
                  {step.number}
                </p>
                <p className="text-mjcc-cream font-medium text-sm">
                  {step.title}
                </p>
                <p className="text-xs text-mjcc-warm mt-1 leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-lg mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-sm text-mjcc-muted mb-4"
          >
            Want to explore on your own first?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex flex-col items-center gap-3"
          >
            <Link
              href="/roster"
              className="text-sm text-mjcc-gold hover:underline"
            >
              Browse the roster &rarr;
            </Link>
            <Link
              href="/book"
              className="text-sm text-mjcc-gold hover:underline"
            >
              Download the media kit &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
