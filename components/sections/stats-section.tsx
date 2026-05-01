"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { target: 74, suffix: "", label: "Verified Creators" },
  { target: 15, suffix: "+", label: "Years in Television" },
  { target: 11, suffix: "", label: "Major Networks" },
  { target: 290, suffix: "M+", label: "Combined Reach" },
]

export function StatsSection() {
  return (
    <section className="bg-mjcc-black">
      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto">
          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 lg:mb-20">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <span className="font-display text-5xl lg:text-7xl text-mjcc-gold leading-none block mb-3">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                </span>
                <span className="text-[10px] lg:text-xs text-mjcc-platinum uppercase tracking-[0.15em]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="font-serif text-xl lg:text-2xl text-mjcc-cream italic leading-relaxed">
              &ldquo;We didn&apos;t watch the creator economy emerge. We built the talent that&apos;s bookable in it.&rdquo;
            </p>
            <cite className="block mt-6 text-[10px] text-mjcc-platinum uppercase tracking-[0.15em] not-italic">
              Jotham Hall, Cofounder
            </cite>
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}
