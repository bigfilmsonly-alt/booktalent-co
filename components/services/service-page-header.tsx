"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface ServicePageHeaderProps {
  serviceNumber: string
  title: string
  description: string
}

export function ServicePageHeader({ serviceNumber, title, description }: ServicePageHeaderProps) {
  return (
    <section className="bg-mjcc-black px-6 lg:px-12 pt-12 lg:pt-24 pb-16">
      <div className="max-w-md lg:max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-10"
        >
          <Link href="/services" className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] hover:text-mjcc-gold-hover transition-colors">
            Services
          </Link>
          <span className="text-[10px] text-mjcc-muted">/</span>
          <span className="text-[10px] text-mjcc-muted uppercase tracking-[0.2em]">{title}</span>
        </motion.nav>

        {/* Service number */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-serif text-7xl lg:text-9xl text-mjcc-dark leading-none mb-4"
        >
          {serviceNumber}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[32px] sm:text-4xl lg:text-5xl text-mjcc-cream leading-[1.1] tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-[15px] text-mjcc-muted leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}
