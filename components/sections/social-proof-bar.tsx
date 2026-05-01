"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress >= 1) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return { count, start: () => setStarted(true) }
}

export function SocialProofBar() {
  const campaigns = useCountUp(47, 1800)
  const revenue = useCountUp(12, 2000)
  const rate = useCountUp(97, 1600)

  return (
    <section className="bg-mjcc-charcoal border-y border-mjcc-dark/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => {
          campaigns.start()
          revenue.start()
          rate.start()
        }}
        className="px-6 lg:px-12 py-6"
      >
        <div className="flex items-center justify-between max-w-md lg:max-w-3xl mx-auto">
          <div className="text-center">
            <span className="font-mono text-lg lg:text-2xl text-mjcc-gold font-bold">
              {campaigns.count}+
            </span>
            <span className="block text-[9px] lg:text-[10px] text-mjcc-muted uppercase tracking-wider mt-0.5">
              Campaigns Booked
            </span>
          </div>

          <div className="w-px h-8 bg-mjcc-dark" />

          <div className="text-center">
            <span className="font-mono text-lg lg:text-2xl text-mjcc-gold font-bold">
              ${revenue.count}M+
            </span>
            <span className="block text-[9px] lg:text-[10px] text-mjcc-muted uppercase tracking-wider mt-0.5">
              Revenue Driven
            </span>
          </div>

          <div className="w-px h-8 bg-mjcc-dark" />

          <div className="text-center">
            <span className="font-mono text-lg lg:text-2xl text-mjcc-gold font-bold">
              {rate.count}%
            </span>
            <span className="block text-[9px] lg:text-[10px] text-mjcc-muted uppercase tracking-wider mt-0.5">
              On Time Delivery
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
