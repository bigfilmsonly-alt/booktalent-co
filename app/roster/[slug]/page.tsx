"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { getTalentBySlug } from "@/lib/talent-data"
import { Footer } from "@/components/sections/footer"

const ease = [0.16, 1, 0.3, 1] as const

export default function TalentProfilePage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : ""
  const talent = getTalentBySlug(slug)

  if (!talent) {
    return (
      <>
        <section className="px-6 py-20">
          <div className="max-w-md mx-auto text-center">
            <p className="font-serif text-2xl text-mjcc-cream mb-4">
              Talent not found
            </p>
            <p className="text-sm text-mjcc-muted mb-6">
              The talent profile you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/roster"
              className="inline-block px-6 py-2.5 bg-mjcc-gold text-mjcc-black text-sm font-medium hover:bg-mjcc-gold-hover transition-colors"
            >
              Back to Roster
            </Link>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  const networkCount = talent.networks.length
  const primarySpecialty = talent.specialties[0]

  return (
    <>
      {/* Hero image + identity */}
      <section className="px-6 pt-6 pb-10">
        <div className="max-w-md mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="aspect-[1/1] relative overflow-hidden mb-6"
          >
            <Image
              src={talent.image}
              alt={talent.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 448px"
              priority
            />
          </motion.div>

          {/* Talent ID */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs text-mjcc-platinum font-mono tracking-widest mb-3"
          >
            TALENT ID: {talent.talentId}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="font-serif text-4xl text-mjcc-cream leading-[1.1] tracking-tight"
          >
            {talent.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-3 text-[15px] text-mjcc-warm italic leading-relaxed"
          >
            {talent.tagline}
          </motion.p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Quick stats */}
      <section className="px-6 py-10">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            <div>
              <p className="font-mono text-xl text-mjcc-gold">{talent.following}</p>
              <p className="text-xs text-mjcc-platinum mt-1">Following</p>
            </div>
            <div>
              <p className="font-mono text-xl text-mjcc-gold">{talent.engagement}</p>
              <p className="text-xs text-mjcc-platinum mt-1">Engagement</p>
            </div>
            <div>
              <p className="font-mono text-xl text-mjcc-gold">{networkCount}</p>
              <p className="text-xs text-mjcc-platinum mt-1">{networkCount === 1 ? "Network" : "Networks"}</p>
            </div>
            <div>
              <p className="font-mono text-xl text-mjcc-gold">{primarySpecialty}</p>
              <p className="text-xs text-mjcc-platinum mt-1">Primary Focus</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* CTAs */}
      <section className="px-6 py-10">
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="flex-1"
          >
            <Link
              href={`/book?talent=${talent.slug}`}
              className="block w-full text-center px-6 py-3 bg-mjcc-gold text-mjcc-black text-sm font-medium hover:bg-mjcc-gold-hover transition-colors"
            >
              Book This Talent
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="flex-1"
          >
            <Link
              href="/roster"
              className="block w-full text-center px-6 py-3 border border-mjcc-dark text-mjcc-cream text-sm font-medium hover:border-mjcc-gold/40 transition-colors"
            >
              View Full Roster
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Television Credits */}
      <section className="px-6 py-16">
        <div className="max-w-md mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6"
          >
            Television Credits
          </motion.p>

          <div className="space-y-4">
            {talent.credits.map((credit, i) => (
              <motion.div
                key={`${credit.show}-${credit.network}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className="border-b border-mjcc-dark/50 pb-4"
              >
                <p className="text-mjcc-cream text-[15px]">
                  <span className="text-mjcc-gold mr-2">&mdash;</span>
                  {credit.show}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                  <span className="text-xs text-mjcc-platinum">{credit.network}</span>
                  <span className="text-xs text-mjcc-muted">{credit.seasons}</span>
                  <span className="text-xs text-mjcc-muted">{credit.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Content Focus */}
      <section className="px-6 py-16">
        <div className="max-w-md mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6"
          >
            Content Focus
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-wrap gap-3"
          >
            {talent.specialties.map((s) => (
              <span
                key={s}
                className="px-4 py-2 border border-mjcc-dark text-sm text-mjcc-cream uppercase tracking-wider"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA block */}
      <section className="bg-mjcc-charcoal">
        <div className="px-6 py-16">
          <div className="max-w-md mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
            >
              Ready to Work Together?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="font-serif text-3xl text-mjcc-cream leading-[1.15] tracking-tight"
            >
              Ready to book {talent.name}?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mt-4 text-[15px] text-mjcc-muted leading-relaxed"
            >
              Tell us about your campaign goals and timeline. We will connect you with {talent.name} and build a custom package for your brand.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mt-8"
            >
              <Link
                href={`/book?talent=${talent.slug}`}
                className="inline-block px-8 py-3 bg-mjcc-gold text-mjcc-black text-sm font-medium hover:bg-mjcc-gold-hover transition-colors"
              >
                Book {talent.name}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pb-24">
        <Footer />
      </div>
    </>
  )
}
