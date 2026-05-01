"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { getTalentByInviteSlug } from "@/lib/talent-data"
import { Footer } from "@/components/sections/footer"

import type { TalentProfile } from "@/lib/talent-data"

const ease = [0.16, 1, 0.3, 1] as const

export default function InviteLandingPage() {
  const params = useParams()
  const inviteSlug = typeof params.inviteSlug === "string" ? params.inviteSlug : ""

  const [talent, setTalent] = useState<TalentProfile | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (inviteSlug) {
      const found = getTalentByInviteSlug(inviteSlug)
      setTalent(found)
      setLoading(false)
    }
  }, [inviteSlug])

  if (loading) {
    return (
      <main className="bg-mjcc-black min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-8 h-8 border-2 border-mjcc-gold border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-sm text-mjcc-muted">Loading your invitation...</p>
        </motion.div>
      </main>
    )
  }

  if (!talent) {
    return (
      <main className="bg-mjcc-black min-h-screen">
        <section className="px-6 py-20">
          <div className="max-w-md mx-auto text-center">
            <p className="font-serif text-2xl text-mjcc-cream mb-4">
              Invitation Not Found
            </p>
            <p className="text-sm text-mjcc-muted mb-6">
              This invitation link is no longer active or does not exist. If you believe this is an error, please contact our team directly.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-mjcc-gold text-mjcc-black text-sm font-medium hover:bg-mjcc-gold-hover transition-colors"
            >
              Go to BookTalent
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  const firstName = talent.name.split(" ")[0]

  const tierBadgeClass =
    talent.tier === "Marquee"
      ? "bg-mjcc-gold/20 text-mjcc-gold border border-mjcc-gold/40"
      : talent.tier === "Core"
        ? "bg-[#1a2a3a] text-[#7eb8e0] border border-[#2a4a6a]"
        : "bg-mjcc-dark text-mjcc-platinum border border-mjcc-dark"

  return (
    <main className="bg-mjcc-black min-h-screen">
      {/* Cinematic background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-mjcc-black via-mjcc-charcoal/20 to-mjcc-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.04)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10">
        {/* ─── Hero: Invitation Badge + Welcome ─── */}
        <section className="px-6 pt-16 pb-12">
          <div className="max-w-2xl mx-auto text-center">
            {/* Gold invite badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="inline-block px-6 py-2.5 bg-mjcc-gold/10 border border-mjcc-gold/30 text-mjcc-gold text-[11px] font-medium uppercase tracking-[0.2em]">
                You Have Been Invited
              </span>
            </motion.div>

            {/* Welcome headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mt-8 font-serif text-[36px] sm:text-5xl lg:text-6xl text-mjcc-cream leading-[1.08] tracking-tight"
            >
              Welcome, {firstName}.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="mt-5 text-[15px] lg:text-[17px] text-mjcc-warm leading-relaxed max-w-md mx-auto"
            >
              You have been personally selected to join BookTalent, the premier network for television trained creators and brand partners.
            </motion.p>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ─── Welcome Letter from Mira ─── */}
        <section className="px-6 py-14">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="bg-mjcc-charcoal border border-mjcc-dark p-8 sm:p-10"
            >
              <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6">
                A Personal Note
              </p>

              <div className="space-y-4 text-[15px] text-mjcc-cream/90 leading-relaxed">
                <p>
                  Dear {firstName},
                </p>
                <p>
                  I have been following your work for some time now, and I am genuinely impressed by what you have built. Your presence, your audience, and your ability to connect with people on camera is exactly what the top brands we work with are looking for.
                </p>
                <p>
                  At BookTalent, we represent a curated roster of television trained talent who partner with the world&apos;s leading brands. We handle the brand deals, negotiations, production, and strategy so you can focus on what you do best: creating.
                </p>
                <p>
                  I have already started building your profile on our platform. Below, you will see a preview of how brands will discover you. If everything looks good, all you have to do is claim it.
                </p>
                <p>
                  I would love to set up a quick call to walk you through everything and answer any questions you might have.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-mjcc-dark/50">
                <p className="text-[15px] text-mjcc-cream font-medium">Mira Jordan</p>
                <p className="text-xs text-mjcc-muted mt-1">Co-Founder, BookTalent</p>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ─── Profile Preview ─── */}
        <section className="px-6 py-14">
          <div className="max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-8 text-center"
            >
              Your Profile Preview
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="bg-mjcc-charcoal border border-mjcc-dark overflow-hidden"
            >
              {/* Profile card: image left, details right (stacked on mobile) */}
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="sm:w-[240px] lg:w-[280px] flex-shrink-0">
                  <div className="aspect-[3/4] sm:aspect-auto sm:h-full relative">
                    <Image
                      src={talent.imageUrl}
                      alt={talent.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 280px"
                      priority
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                  {/* Tier badge */}
                  <span className={`inline-block self-start px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] mb-4 ${tierBadgeClass}`}>
                    {talent.tier} Talent
                  </span>

                  {/* Name */}
                  <h2 className="font-serif text-2xl sm:text-3xl text-mjcc-cream leading-[1.1] tracking-tight">
                    {talent.name}
                  </h2>

                  {/* Genre */}
                  <p className="mt-2 text-sm text-mjcc-warm italic">
                    {talent.genre}
                  </p>

                  {/* Credits */}
                  <p className="mt-3 text-xs text-mjcc-muted leading-relaxed">
                    {talent.credits}
                  </p>

                  {/* Social stats */}
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-mjcc-muted">Instagram</p>
                      <p className="text-sm text-mjcc-cream font-medium mt-0.5">{talent.igFollowers}</p>
                      <p className="text-xs text-mjcc-platinum mt-0.5">{talent.igHandle}</p>
                    </div>
                    <div>
                      <p className="text-xs text-mjcc-muted">TikTok</p>
                      <p className="text-sm text-mjcc-cream font-medium mt-0.5">{talent.ttFollowers}</p>
                      <p className="text-xs text-mjcc-platinum mt-0.5">{talent.ttHandle}</p>
                    </div>
                  </div>

                  {/* Total following */}
                  <div className="mt-5 pt-4 border-t border-mjcc-dark/50">
                    <p className="text-xs text-mjcc-muted">Total Following</p>
                    <p className="text-lg text-mjcc-gold font-medium mt-0.5">{talent.totalFollowing}</p>
                  </div>

                  {/* Categories */}
                  {talent.categories && talent.categories.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {talent.categories.map((cat) => (
                        <span
                          key={cat}
                          className="px-3 py-1.5 border border-mjcc-dark text-[11px] text-mjcc-cream uppercase tracking-wider"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Networks */}
                  {talent.networks && talent.networks.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {talent.networks.map((net) => (
                        <span
                          key={net}
                          className="px-3 py-1.5 bg-mjcc-dark/50 text-[11px] text-mjcc-platinum uppercase tracking-wider"
                        >
                          {net}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio section */}
              {talent.bio && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <div className="pt-5 border-t border-mjcc-dark/50">
                    <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-3">About</p>
                    <p className="text-[15px] text-mjcc-cream/85 leading-relaxed">
                      {talent.bio}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ─── Claim Your Profile CTA ─── */}
        <section className="px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl text-mjcc-cream leading-[1.1] tracking-tight">
                Ready to claim your profile?
              </h2>
              <p className="mt-4 text-[15px] text-mjcc-warm leading-relaxed max-w-md mx-auto">
                Your profile is built and waiting for you. Claim it now to start receiving brand partnership opportunities curated specifically for your audience and expertise.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/schedule"
                  className="inline-block px-10 py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-[0.1em] uppercase hover:bg-mjcc-gold-hover transition-colors"
                >
                  Claim My Profile
                </Link>
                <Link
                  href="/schedule"
                  className="inline-block px-10 py-4 border border-mjcc-dark text-mjcc-cream text-sm font-medium tracking-[0.1em] uppercase hover:border-mjcc-gold/40 transition-colors"
                >
                  Schedule a Call First
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ─── What Happens Next ─── */}
        <section className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-10 text-center"
            >
              What Happens Next
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Step 01 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="font-serif text-3xl text-mjcc-gold/30 mb-3">01</p>
                <h3 className="font-serif text-lg text-mjcc-cream mb-2">
                  Quick Intro Call
                </h3>
                <p className="text-sm text-mjcc-muted leading-relaxed">
                  We will hop on a 15 minute call with you to walk through the platform, answer your questions, and learn more about your goals.
                </p>
              </motion.div>

              {/* Step 02 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                <p className="font-serif text-3xl text-mjcc-gold/30 mb-3">02</p>
                <h3 className="font-serif text-lg text-mjcc-cream mb-2">
                  Finalize Your Profile
                </h3>
                <p className="text-sm text-mjcc-muted leading-relaxed">
                  We will polish your profile together, add any missing details, and make sure everything represents you at your best before going live.
                </p>
              </motion.div>

              {/* Step 03 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                <p className="font-serif text-3xl text-mjcc-gold/30 mb-3">03</p>
                <h3 className="font-serif text-lg text-mjcc-cream mb-2">
                  Start Getting Booked
                </h3>
                <p className="text-sm text-mjcc-muted leading-relaxed">
                  Once your profile is live, brands can discover you immediately. We handle outreach, negotiations, contracts, and payment so you can focus on creating.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="gold-divider" />

        {/* ─── Final CTA ─── */}
        <section className="bg-mjcc-charcoal">
          <div className="px-6 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">
                  Your Spot is Reserved
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-mjcc-cream leading-[1.1] tracking-tight">
                  Do not miss this opportunity, {firstName}.
                </h2>
                <p className="mt-4 text-[15px] text-mjcc-muted leading-relaxed max-w-md mx-auto">
                  We are building something special at BookTalent. The brands are ready. The platform is ready. All that is missing is you.
                </p>
                <div className="mt-8">
                  <Link
                    href="/schedule"
                    className="inline-block px-10 py-4 bg-mjcc-gold text-mjcc-black text-sm font-medium tracking-[0.1em] uppercase hover:bg-mjcc-gold-hover transition-colors"
                  >
                    Claim My Profile Now
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="pb-24">
          <Footer />
        </div>
      </div>
    </main>
  )
}
