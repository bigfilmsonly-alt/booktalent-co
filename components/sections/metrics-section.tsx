"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const metrics = [
  { value: 4.2, suffix: "x", label: "Average ROAS", description: "Return on ad spend across all campaigns" },
  { value: 340, suffix: "%", label: "Higher Engagement", description: "Compared to traditional influencer content" },
  { value: 12, suffix: " Day", label: "Turnaround", description: "From booking to delivered content" },
  { value: 50, suffix: "M+", label: "Combined Reach", description: "Across our entire talent roster" },
]

function AnimatedMetric({ value, suffix, isDecimal }: { value: number; suffix: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value, isDecimal])

  return (
    <span ref={ref} className="font-mono text-5xl lg:text-7xl text-mjcc-gold font-bold">
      {isDecimal ? count.toFixed(1) : count}{suffix}
    </span>
  )
}

export function MetricsSection() {
  return (
    <section className="bg-mjcc-charcoal relative overflow-hidden">
      {/* Subtle gold radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.03)_0%,_transparent_60%)]" />

      <div className="relative px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            The Numbers
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            Results that speak for themselves.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-md lg:max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedMetric value={metric.value} suffix={metric.suffix} isDecimal={metric.value % 1 !== 0} />
              <p className="mt-2 text-sm text-mjcc-cream font-medium tracking-wide">
                {metric.label}
              </p>
              <p className="mt-1 text-[11px] text-mjcc-muted leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="/case-studies"
            className="inline-flex items-center justify-center border border-mjcc-gold/40 text-mjcc-gold px-8 py-4 text-sm font-medium tracking-wider hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black transition-all duration-300 min-h-[48px] cta-button"
          >
            SEE CASE STUDIES
          </a>
        </motion.div>
      </div>
    </section>
  )
}
