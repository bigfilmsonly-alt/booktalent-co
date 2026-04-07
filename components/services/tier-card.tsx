"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface TierCardProps {
  name: string
  price: string
  priceNote?: string
  bestFor?: string
  includes: string[]
  addOns?: { label: string; price: string }[]
  featured?: boolean
  ctaLabel: string
  ctaHref: string
  index?: number
}

export function TierCard({
  name,
  price,
  priceNote,
  bestFor,
  includes,
  addOns,
  featured,
  ctaLabel,
  ctaHref,
  index = 0,
}: TierCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`p-6 ${featured ? "border border-mjcc-gold" : "border border-mjcc-dark/50"}`}
    >
      {/* Tier name */}
      <h3 className="text-sm text-mjcc-cream font-medium tracking-wider uppercase mb-4">
        {name}
      </h3>

      {/* Price */}
      <div className="mb-6">
        <span className="font-mono text-2xl text-mjcc-gold font-bold">{price}</span>
        {priceNote && (
          <span className="block mt-1 text-xs text-mjcc-muted">{priceNote}</span>
        )}
      </div>

      {/* Best for */}
      {bestFor && (
        <p className="text-xs text-mjcc-muted mb-6 pb-6 border-b border-mjcc-dark/40">
          {bestFor}
        </p>
      )}

      {/* Includes */}
      <ul className="space-y-3 mb-6">
        {includes.map((item) => (
          <li key={item} className="text-sm text-mjcc-muted leading-relaxed flex gap-2">
            <span className="text-mjcc-gold/50 shrink-0">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Add-ons */}
      {addOns && addOns.length > 0 && (
        <div className="pt-4 mb-6 border-t border-mjcc-dark/40">
          <p className="text-[10px] text-mjcc-muted uppercase tracking-wider mb-3">Add-ons</p>
          <ul className="space-y-2">
            {addOns.map((addon) => (
              <li key={addon.label} className="flex justify-between text-xs text-mjcc-muted">
                <span>{addon.label}</span>
                <span className="font-mono text-mjcc-cream/60">{addon.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <Link
        href={ctaHref}
        className={`block text-center py-4 text-sm font-medium tracking-wider transition-colors duration-300 min-h-[48px] flex items-center justify-center ${
          featured
            ? "bg-mjcc-gold text-mjcc-black hover:bg-mjcc-gold-hover"
            : "border border-mjcc-gold/40 text-mjcc-gold hover:border-mjcc-gold hover:bg-mjcc-gold hover:text-mjcc-black"
        }`}
      >
        {ctaLabel.toUpperCase()}
      </Link>
    </motion.div>
  )
}
