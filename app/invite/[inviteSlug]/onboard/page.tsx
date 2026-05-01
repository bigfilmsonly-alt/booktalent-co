"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { getTalentByInviteSlug } from "@/lib/talent-data"
import { Footer } from "@/components/sections/footer"

const ease = [0.16, 1, 0.3, 1] as const

export default function OnboardPage() {
  const params = useParams()
  const inviteSlug = typeof params.inviteSlug === "string" ? params.inviteSlug : ""
  const talent = getTalentByInviteSlug(inviteSlug)

  const [step, setStep] = useState(1)
  const [preferredName, setPreferredName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [instagram, setInstagram] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [signature, setSignature] = useState("")

  useEffect(() => {
    if (talent) {
      setPreferredName(talent.name)
      setInstagram(talent.igHandle)
    }
  }, [talent])

  const handleSubmit = () => {
    const data = {
      inviteSlug,
      talentId: talent?.id,
      talentName: talent?.name,
      preferredName,
      email,
      phone,
      instagram,
      agreedToTerms,
      signature,
      submittedAt: new Date().toISOString(),
    }
    console.log("Onboarding submission:", data)
    localStorage.setItem(`onboarding_${inviteSlug}`, JSON.stringify(data))
    setStep(3)
  }

  const canContinue = email.trim() && phone.trim() && preferredName.trim()
  const canSubmit = agreedToTerms && signature.trim()

  if (!talent) {
    return (
      <>
        <section className="px-6 py-20">
          <div className="max-w-md mx-auto text-center">
            <p className="font-serif text-2xl text-mjcc-cream mb-4">Profile not found</p>
            <p className="text-sm text-mjcc-muted mb-6">
              This link is not valid or has expired. Please contact your BookTalent representative.
            </p>
            <Link
              href="/apply"
              className="inline-block px-8 py-3 bg-mjcc-gold text-mjcc-black text-sm font-medium uppercase tracking-wider hover:bg-mjcc-gold-hover transition-colors"
            >
              Go to Apply
            </Link>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <>
      <section className="px-6 pt-10 pb-20">
        <div className="max-w-[480px] mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="w-full h-[2px] bg-mjcc-dark">
              <motion.div
                className="h-full bg-mjcc-gold"
                animate={{ width: step === 3 ? "100%" : step === 2 ? "66%" : "33%" }}
                transition={{ duration: 0.5, ease }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className={`text-[10px] uppercase tracking-wider ${step >= 1 ? "text-mjcc-gold" : "text-mjcc-muted"}`}>Your Info</span>
              <span className={`text-[10px] uppercase tracking-wider ${step >= 2 ? "text-mjcc-gold" : "text-mjcc-muted"}`}>Agree</span>
              <span className={`text-[10px] uppercase tracking-wider ${step >= 3 ? "text-mjcc-gold" : "text-mjcc-muted"}`}>Done</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Your Info */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
                className="text-center"
              >
                <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-3">Step 1 of 2</p>
                <h1 className="font-serif text-3xl text-mjcc-cream leading-[1.15] mb-2">
                  Claim your seat, {talent.name.split(" ")[0]}.
                </h1>
                <p className="text-sm text-mjcc-muted mb-10">
                  Confirm your details to join the BookTalent roster.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] text-mjcc-platinum uppercase tracking-wider mb-2">Name</label>
                    <input
                      type="text"
                      value={preferredName}
                      onChange={(e) => setPreferredName(e.target.value)}
                      className="w-full bg-transparent border-b border-mjcc-dark focus:border-mjcc-gold text-mjcc-cream text-center text-sm py-2 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-mjcc-platinum uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full bg-transparent border-b border-mjcc-dark focus:border-mjcc-gold text-mjcc-cream text-center text-sm py-2 outline-none transition-colors placeholder:text-mjcc-muted/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-mjcc-platinum uppercase tracking-wider mb-2">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 555 5555"
                      className="w-full bg-transparent border-b border-mjcc-dark focus:border-mjcc-gold text-mjcc-cream text-center text-sm py-2 outline-none transition-colors placeholder:text-mjcc-muted/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-mjcc-platinum uppercase tracking-wider mb-2">Instagram</label>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="w-full bg-transparent border-b border-mjcc-dark focus:border-mjcc-gold text-mjcc-cream text-center text-sm py-2 outline-none transition-colors placeholder:text-mjcc-muted/40"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!canContinue}
                  className={`mt-10 px-10 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
                    canContinue
                      ? "bg-mjcc-gold text-mjcc-black hover:bg-mjcc-gold-hover"
                      : "bg-mjcc-dark text-mjcc-muted cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* STEP 2: Agree */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
                className="text-center"
              >
                <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-3">Step 2 of 2</p>
                <h1 className="font-serif text-3xl text-mjcc-cream leading-[1.15] mb-2">
                  Review and sign.
                </h1>
                <p className="text-sm text-mjcc-muted mb-10">
                  By signing below, you agree to be represented by BookTalent for brand partnerships.
                </p>

                {/* Summary */}
                <div className="text-left border border-mjcc-dark p-5 mb-8">
                  <p className="text-[10px] text-mjcc-gold uppercase tracking-wider mb-4">What BookTalent Does</p>
                  <div className="space-y-3 text-sm text-mjcc-cream leading-relaxed">
                    <p>Source and negotiate brand deals on your behalf.</p>
                    <p>Handle contracts, payments, and campaign logistics.</p>
                    <p>Build your profile on the BookTalent marketplace.</p>
                    <p>Match you with campaigns that fit your audience and brand.</p>
                  </div>
                </div>

                {/* Tier info */}
                <div className="border border-mjcc-dark p-5 mb-8 text-left">
                  <p className="text-[10px] text-mjcc-gold uppercase tracking-wider mb-3">Your Tier: {talent.tier}</p>
                  <p className="text-sm text-mjcc-cream">
                    {talent.tier === "Marquee" && "No monthly fee. 20% commission on BookTalent sourced deals."}
                    {talent.tier === "Core" && "$1,500 per month management fee. 20% commission on BookTalent sourced deals."}
                    {talent.tier === "Rising" && "$750 per month management fee. 25% commission on BookTalent sourced deals."}
                  </p>
                  <p className="text-xs text-mjcc-muted mt-2">Either party may cancel with 30 days written notice.</p>
                </div>

                {/* Checkbox */}
                <div className="flex items-start justify-center gap-3 mb-8">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 accent-[#E8B931]"
                  />
                  <label htmlFor="agree" className="text-sm text-mjcc-cream text-left cursor-pointer">
                    I agree to be represented by BookTalent under the terms above.
                  </label>
                </div>

                {/* Signature */}
                <div className="mb-10">
                  <label className="block text-[10px] text-mjcc-platinum uppercase tracking-wider mb-3">
                    Type your full name as signature
                  </label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder={talent.name}
                    className="w-full bg-transparent border-b border-mjcc-dark focus:border-mjcc-gold text-mjcc-cream text-center font-serif text-2xl py-2 outline-none transition-colors"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setStep(1)}
                    className="border border-mjcc-dark text-mjcc-cream px-8 py-3 text-sm hover:border-mjcc-gold/40 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`px-8 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
                      canSubmit
                        ? "bg-mjcc-gold text-mjcc-black hover:bg-mjcc-gold-hover"
                        : "bg-mjcc-dark text-mjcc-muted cursor-not-allowed"
                    }`}
                  >
                    Join BookTalent
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Done */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, ease }}
                  className="mx-auto mb-8"
                >
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto">
                    <circle cx="40" cy="40" r="39" stroke="#E8B931" strokeWidth="2" />
                    <path d="M24 40L34 50L56 28" stroke="#E8B931" strokeWidth="3" strokeLinecap="square" />
                  </svg>
                </motion.div>

                <h1 className="font-serif text-3xl text-mjcc-cream leading-[1.15] mb-3">
                  Welcome to BookTalent, {preferredName.split(" ")[0]}.
                </h1>
                <p className="text-sm text-mjcc-muted mb-12 max-w-sm mx-auto">
                  Your seat is claimed. Here is what happens next.
                </p>

                <div className="space-y-4 mb-12">
                  <div className="border border-mjcc-dark p-5 text-center">
                    <p className="text-xs text-mjcc-gold uppercase tracking-wider mb-2">01</p>
                    <p className="text-sm text-mjcc-cream">Check your email for a confirmation from our team.</p>
                  </div>
                  <div className="border border-mjcc-dark p-5 text-center">
                    <p className="text-xs text-mjcc-gold uppercase tracking-wider mb-2">02</p>
                    <p className="text-sm text-mjcc-cream">We will send your official agreement to sign digitally.</p>
                  </div>
                  <div className="border border-mjcc-dark p-5 text-center">
                    <p className="text-xs text-mjcc-gold uppercase tracking-wider mb-2">03</p>
                    <p className="text-sm text-mjcc-cream">Your profile goes live and brands can start booking you.</p>
                  </div>
                </div>

                <Link
                  href="/"
                  className="inline-block bg-mjcc-gold text-mjcc-black px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-mjcc-gold-hover transition-colors"
                >
                  Visit BookTalent
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </>
  )
}
