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

  return (
    <>
      {/* Hero image + identity */}
      <section className="px-6 pt-6 pb-10">
        <div className="max-w-md lg:max-w-3xl mx-auto lg:grid lg:grid-cols-[2fr_3fr] lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="aspect-[4/5] relative overflow-hidden mb-6 lg:mb-0"
          >
            <Image
              src={talent.imageUrl}
              alt={talent.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            {/* Tier badge */}
            <div className="absolute bottom-0 left-0">
              <span className={`inline-block px-4 py-2 text-[11px] font-serif uppercase tracking-[0.12em] ${
                talent.tier === "Marquee"
                  ? "bg-mjcc-gold text-mjcc-black"
                  : talent.tier === "Core"
                  ? "bg-mjcc-charcoal text-mjcc-cream border border-mjcc-dark"
                  : "bg-mjcc-dark text-mjcc-platinum"
              }`}>
                {talent.tier}
              </span>
            </div>
          </motion.div>

          {/* Details */}
          <div className="lg:flex lg:flex-col lg:justify-center">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-4"
            >
              <Link href="/roster" className="text-xs text-mjcc-muted hover:text-mjcc-gold transition-colors uppercase tracking-wider">
                Roster
              </Link>
              <span className="text-xs text-mjcc-muted">/</span>
              <span className="text-xs text-mjcc-platinum uppercase tracking-wider">{talent.name}</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="font-serif text-4xl lg:text-5xl text-mjcc-cream leading-[1.1] tracking-tight"
            >
              {talent.name}
            </motion.h1>

            {/* Genre */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-3 text-[14px] text-mjcc-gold tracking-wider"
            >
              {talent.genre}
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8"
            >
              <div>
                <p className="font-mono text-xl text-mjcc-gold">{talent.totalFollowing}</p>
                <p className="text-xs text-mjcc-platinum mt-1">Total Following</p>
              </div>
              <div>
                <p className="font-mono text-xl text-mjcc-gold">{talent.igFollowers}</p>
                <p className="text-xs text-mjcc-platinum mt-1">Instagram</p>
              </div>
              <div>
                <p className="font-mono text-xl text-mjcc-gold">{talent.ttFollowers}</p>
                <p className="text-xs text-mjcc-platinum mt-1">TikTok</p>
              </div>
              <div>
                <p className="font-mono text-xl text-mjcc-gold">{talent.networks.length}</p>
                <p className="text-xs text-mjcc-platinum mt-1">{talent.networks.length === 1 ? "Network" : "Networks"}</p>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-6 text-[15px] text-mjcc-warm leading-relaxed"
            >
              {talent.bio}
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              {talent.igHandle && (
                <a
                  href={talent.igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-mjcc-gold border border-mjcc-gold/30 px-3 py-1.5 hover:bg-mjcc-gold/10 transition-colors"
                >
                  IG {talent.igHandle}
                </a>
              )}
              {talent.ttHandle && (
                <a
                  href={talent.ttUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-mjcc-gold border border-mjcc-gold/30 px-3 py-1.5 hover:bg-mjcc-gold/10 transition-colors"
                >
                  TT {talent.ttHandle}
                </a>
              )}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
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

      <div className="gold-divider" />

      {/* Television Credits */}
      <section className="px-6 py-16">
        <div className="max-w-md lg:max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6"
          >
            Television Credits
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-[15px] text-mjcc-cream leading-relaxed"
          >
            {talent.credits}
          </motion.p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Content Focus */}
      <section className="px-6 py-16">
        <div className="max-w-md lg:max-w-3xl mx-auto">
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
            {talent.categories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 border border-mjcc-dark text-sm text-mjcc-cream uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Networks */}
      {talent.networks.length > 0 && (
        <>
          <section className="px-6 py-16">
            <div className="max-w-md lg:max-w-3xl mx-auto">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6"
              >
                Networks
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
                className="flex flex-wrap gap-3"
              >
                {talent.networks.map((net) => (
                  <span
                    key={net}
                    className="px-4 py-2 bg-mjcc-charcoal border border-mjcc-dark text-sm text-mjcc-cream"
                  >
                    {net}
                  </span>
                ))}
              </motion.div>
            </div>
          </section>

          <div className="gold-divider" />
        </>
      )}

      {/* Bottom CTA */}
      <section className="bg-mjcc-charcoal">
        <div className="px-6 py-16">
          <div className="max-w-md lg:max-w-3xl mx-auto text-center">
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
              className="mt-4 text-[15px] text-mjcc-muted leading-relaxed max-w-lg mx-auto"
            >
              Submit a brief request. Our team will respond within two business days
              with rates, availability, and content samples.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                href={`/book?talent=${talent.slug}`}
                className="inline-block px-8 py-3 bg-mjcc-gold text-mjcc-black text-sm font-medium hover:bg-mjcc-gold-hover transition-colors"
              >
                Book {talent.name}
              </Link>
              <Link
                href="/roster"
                className="inline-block px-8 py-3 border border-mjcc-dark text-mjcc-cream text-sm font-medium hover:border-mjcc-gold/40 transition-colors"
              >
                View Full Roster
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
