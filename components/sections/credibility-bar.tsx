"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { value: 15, suffix: "+", label: "Years" },
  { value: 100, suffix: "+", label: "Shows" },
  { value: 30, suffix: "+", label: "Networks" },
  { value: 50, suffix: "M+", label: "Reach" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
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
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="font-mono text-3xl text-mjcc-gold font-bold">
      {count}{suffix}
    </span>
  )
}

export function CredibilityBar() {
  return (
    <section className="bg-mjcc-charcoal border-y border-mjcc-dark/50">
      <div className="px-6 py-10">
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-1 text-[10px] text-mjcc-muted uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
