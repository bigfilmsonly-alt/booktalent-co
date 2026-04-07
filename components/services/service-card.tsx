"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface ServiceCardProps {
  number: string
  title: string
  description: string
  priceRange: string
  href: string
  index?: number
}

export function ServiceCard({ number, title, description, priceRange, href, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Link
        href={href}
        className="flex items-start gap-4 p-4 border border-mjcc-dark/50 hover:border-mjcc-gold/60 transition-colors duration-300 active:scale-[0.98] min-h-[48px]"
      >
        <span className="font-serif text-2xl text-mjcc-dark leading-none shrink-0 w-8 pt-0.5">{number}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-base text-mjcc-cream">{title}</h3>
            <span className="font-mono text-[10px] text-mjcc-gold shrink-0">{priceRange}</span>
          </div>
          <p className="mt-1 text-xs text-mjcc-muted leading-relaxed">{description}</p>
        </div>
      </Link>
    </motion.div>
  )
}
