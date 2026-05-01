"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { getTalentByInviteSlug } from "@/lib/talent-data"
import { Footer } from "@/components/sections/footer"

const ease = [0.16, 1, 0.3, 1] as const

const STEP_LABELS = ["Confirm Details", "Upload Headshot", "Agreement", "Confirmation"]

export default function OnboardPage() {
  const params = useParams()
  const inviteSlug = typeof params.inviteSlug === "string" ? params.inviteSlug : ""
  const talent = getTalentByInviteSlug(inviteSlug)

  const [step, setStep] = useState(1)

  // Step 1 state
  const [preferredName, setPreferredName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [creditsStatus, setCreditsStatus] = useState<"correct" | "corrections" | "">("")
  const [creditsCorrections, setCreditsCorrections] = useState("")

  // Step 2 state
  const [headshotFile, setHeadshotFile] = useState<File | null>(null)
  const [headshotPreview, setHeadshotPreview] = useState<string>("")

  // Step 3 state
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [signature, setSignature] = useState("")

  // Populate preferred name from talent data
  useEffect(() => {
    if (talent) {
      setPreferredName(talent.name)
    }
  }, [talent])

  // Handle headshot file selection
  const handleHeadshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHeadshotFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeadshotPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle final submit
  const handleSubmit = () => {
    const onboardingData = {
      inviteSlug,
      talentName: talent?.name,
      preferredName,
      email,
      phone,
      creditsStatus,
      creditsCorrections: creditsStatus === "corrections" ? creditsCorrections : "",
      headshotFileName: headshotFile?.name || "Skipped",
      agreedToTerms,
      signature,
      submittedAt: new Date().toISOString(),
    }

    console.log("Onboarding submission:", onboardingData)
    localStorage.setItem(`onboarding_${inviteSlug}`, JSON.stringify(onboardingData))

    setStep(4)
  }

  // Progress percentage
  const progress = step === 4 ? 100 : ((step - 1) / 3) * 100

  if (!talent) {
    return (
      <>
        <section className="px-6 py-20">
          <div className="max-w-md mx-auto text-center">
            <p className="font-serif text-2xl text-mjcc-cream mb-4">
              Invite not found
            </p>
            <p className="text-sm text-mjcc-muted mb-6">
              This invite link is not valid or has expired. Please contact your BookTalent representative.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-mjcc-gold text-mjcc-black text-sm font-medium uppercase tracking-wider hover:bg-mjcc-gold-hover transition-colors"
            >
              Visit BookTalent
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
        <div className="max-w-[560px] mx-auto">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full h-[2px] bg-mjcc-dark">
              <motion.div
                className="h-full bg-mjcc-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease }}
              />
            </div>

            {/* Step labels */}
            <div className="flex justify-between mt-3">
              {STEP_LABELS.map((label, i) => (
                <p
                  key={label}
                  className={`text-[10px] uppercase tracking-wider transition-colors duration-300 ${
                    i + 1 <= step ? "text-mjcc-gold" : "text-mjcc-muted"
                  }`}
                >
                  {label}
                </p>
              ))}
            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {/* ── Step 1: Confirm Details ── */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
                className="text-center"
              >
                <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-3">
                  Step 01
                </p>
                <h1 className="font-serif text-3xl text-mjcc-cream leading-[1.15] tracking-tight mb-2">
                  Confirm Your Details
                </h1>
                <p className="text-sm text-mjcc-muted mb-10">
                  Let us make sure we have everything right before we build your profile.
                </p>

                {/* Preferred Name */}
                <div className="mb-8">
                  <label className="block text-[10px] text-mjcc-platinum uppercase tracking-wider mb-2">
                    Preferred Name
                  </label>
                  <input
                    type="text"
                    value={preferredName}
                    onChange={(e) => setPreferredName(e.target.value)}
                    className="w-full bg-transparent border-b border-mjcc-dark focus:border-mjcc-gold text-mjcc-cream text-center text-sm py-2 outline-none transition-colors"
                    placeholder="Your preferred name"
                  />
                </div>

                {/* Email */}
                <div className="mb-8">
                  <label className="block text-[10px] text-mjcc-platinum uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-mjcc-dark focus:border-mjcc-gold text-mjcc-cream text-center text-sm py-2 outline-none transition-colors"
                    placeholder="you@email.com"
                  />
                </div>

                {/* Phone */}
                <div className="mb-8">
                  <label className="block text-[10px] text-mjcc-platinum uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-mjcc-dark focus:border-mjcc-gold text-mjcc-cream text-center text-sm py-2 outline-none transition-colors"
                    placeholder="(555) 555 5555"
                  />
                </div>

                {/* TV Credits Verification */}
                <div className="mb-10">
                  <label className="block text-[10px] text-mjcc-platinum uppercase tracking-wider mb-4">
                    Verify Your TV Credits
                  </label>

                  {/* Show current credits */}
                  <div className="mb-6 space-y-2">
                    {talent.credits.map((credit) => (
                      <p
                        key={`${credit.show}-${credit.network}`}
                        className="text-sm text-mjcc-cream"
                      >
                        {credit.show} ({credit.network}, {credit.seasons}, {credit.role})
                      </p>
                    ))}
                  </div>

                  {/* Radio: correct / need corrections */}
                  <div className="flex justify-center gap-8 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="credits-check"
                        value="correct"
                        checked={creditsStatus === "correct"}
                        onChange={() => setCreditsStatus("correct")}
                        className="accent-[#E8B931]"
                      />
                      <span className="text-sm text-mjcc-cream">These are correct</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="credits-check"
                        value="corrections"
                        checked={creditsStatus === "corrections"}
                        onChange={() => setCreditsStatus("corrections")}
                        className="accent-[#E8B931]"
                      />
                      <span className="text-sm text-mjcc-cream">Need corrections</span>
                    </label>
                  </div>

                  {/* Corrections textarea */}
                  {creditsStatus === "corrections" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <textarea
                        value={creditsCorrections}
                        onChange={(e) => setCreditsCorrections(e.target.value)}
                        rows={4}
                        className="w-full bg-transparent border border-mjcc-dark focus:border-mjcc-gold text-mjcc-cream text-sm p-3 outline-none transition-colors resize-none"
                        placeholder="Please describe the corrections needed..."
                      />
                    </motion.div>
                  )}
                </div>

                {/* Continue */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-mjcc-gold text-mjcc-black px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-mjcc-gold-hover transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Upload Headshot ── */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
                className="text-center"
              >
                <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-3">
                  Step 02
                </p>
                <h1 className="font-serif text-3xl text-mjcc-cream leading-[1.15] tracking-tight mb-2">
                  Upload Your Headshot
                </h1>
                <p className="text-sm text-mjcc-muted mb-10">
                  This will be featured on your BookTalent profile. High resolution photos work best.
                </p>

                {/* Current / Preview image */}
                <div className="relative w-48 h-48 mx-auto mb-8 overflow-hidden">
                  <Image
                    src={headshotPreview || talent.image}
                    alt={talent.name}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>

                {headshotFile && (
                  <p className="text-xs text-mjcc-gold mb-4">
                    Selected: {headshotFile.name}
                  </p>
                )}

                {/* Upload area */}
                <label className="block cursor-pointer mb-4">
                  <div className="border border-dashed border-mjcc-dark hover:border-mjcc-gold/50 transition-colors px-8 py-8 mx-auto max-w-sm">
                    <p className="text-sm text-mjcc-cream mb-1">
                      Click to upload a new headshot
                    </p>
                    <p className="text-xs text-mjcc-muted">
                      JPG or PNG, minimum 800x800
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleHeadshotChange}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => setStep(3)}
                  className="text-xs text-mjcc-muted underline underline-offset-4 hover:text-mjcc-cream transition-colors mb-10"
                >
                  Skip for now
                </button>

                {/* Navigation */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setStep(1)}
                    className="border border-mjcc-dark text-mjcc-cream px-8 py-3 text-sm hover:border-mjcc-gold/40 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-mjcc-gold text-mjcc-black px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-mjcc-gold-hover transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Agreement ── */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
                className="text-center"
              >
                <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-3">
                  Step 03
                </p>
                <h1 className="font-serif text-3xl text-mjcc-cream leading-[1.15] tracking-tight mb-2">
                  Review Agreement
                </h1>
                <p className="text-sm text-mjcc-muted mb-10">
                  Review the terms below and sign to activate your BookTalent profile.
                </p>

                {/* What BookTalent Does For You */}
                <div className="text-left mb-10">
                  <h3 className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-4 text-center">
                    What BookTalent Does For You
                  </h3>
                  <div className="space-y-3">
                    <p className="text-sm text-mjcc-cream leading-relaxed">
                      BookTalent connects you with premium brand partnerships, negotiates deals on your behalf, and manages campaign logistics so you can focus on creating. Our team handles outreach, contracts, payments, and reporting.
                    </p>
                    <p className="text-sm text-mjcc-cream leading-relaxed">
                      You get a dedicated profile on the BookTalent marketplace, direct access to brand opportunities, and a talent manager who advocates for your rates and creative vision.
                    </p>
                  </div>
                </div>

                {/* Tier Pricing */}
                <div className="mb-10">
                  <h3 className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-6 text-center">
                    Tier Pricing
                  </h3>
                  <div className="space-y-4">
                    {/* Marquee */}
                    <div className="border border-mjcc-dark p-5">
                      <p className="font-serif text-lg text-mjcc-gold mb-1">Marquee</p>
                      <p className="text-sm text-mjcc-cream mb-2">
                        No monthly fee. 20% commission on booked deals.
                      </p>
                      <p className="text-xs text-mjcc-muted">
                        For established talent with 1M+ following and verified TV credits.
                      </p>
                    </div>

                    {/* Core */}
                    <div className="border border-mjcc-dark p-5">
                      <p className="font-serif text-lg text-mjcc-cream mb-1">Core</p>
                      <p className="text-sm text-mjcc-cream mb-2">
                        $1,500/mo retainer. 20% commission on booked deals.
                      </p>
                      <p className="text-xs text-mjcc-muted">
                        For mid tier talent building momentum with brand partnerships.
                      </p>
                    </div>

                    {/* Rising */}
                    <div className="border border-mjcc-dark p-5">
                      <p className="font-serif text-lg text-mjcc-cream mb-1">Rising</p>
                      <p className="text-sm text-mjcc-cream mb-2">
                        $750/mo retainer. 25% commission on booked deals.
                      </p>
                      <p className="text-xs text-mjcc-muted">
                        For emerging talent ready to land their first brand partnerships.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cancellation Terms */}
                <div className="mb-10">
                  <h3 className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-4 text-center">
                    Cancellation Terms
                  </h3>
                  <p className="text-sm text-mjcc-cream leading-relaxed">
                    Either party may cancel with 30 days written notice. Any active campaigns at the time of cancellation will be fulfilled per the original agreement. Commission on deals closed during the agreement period remains payable regardless of cancellation date.
                  </p>
                </div>

                {/* Agree Checkbox */}
                <div className="flex items-start justify-center gap-3 mb-8">
                  <input
                    type="checkbox"
                    id="agree-terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 accent-[#E8B931]"
                  />
                  <label htmlFor="agree-terms" className="text-sm text-mjcc-cream text-left cursor-pointer">
                    I have read and agree to the BookTalent representation terms outlined above.
                  </label>
                </div>

                {/* Signature */}
                <div className="mb-10">
                  <label className="block text-[10px] text-mjcc-platinum uppercase tracking-wider mb-3">
                    Type Your Full Name as Signature
                  </label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full bg-transparent border-b border-mjcc-dark focus:border-mjcc-gold text-mjcc-cream text-center font-serif text-2xl py-2 outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                {/* Navigation */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setStep(2)}
                    className="border border-mjcc-dark text-mjcc-cream px-8 py-3 text-sm hover:border-mjcc-gold/40 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!agreedToTerms || !signature.trim()}
                    className={`px-8 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
                      agreedToTerms && signature.trim()
                        ? "bg-mjcc-gold text-mjcc-black hover:bg-mjcc-gold-hover"
                        : "bg-mjcc-dark text-mjcc-muted cursor-not-allowed"
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 4: Confirmation ── */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
                className="text-center"
              >
                {/* Gold checkmark circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, ease }}
                  className="mx-auto mb-8"
                >
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto"
                  >
                    <circle cx="40" cy="40" r="39" stroke="#E8B931" strokeWidth="2" />
                    <path
                      d="M24 40L34 50L56 28"
                      stroke="#E8B931"
                      strokeWidth="3"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease }}
                >
                  <h1 className="font-serif text-3xl text-mjcc-cream leading-[1.15] tracking-tight mb-3">
                    Welcome to BookTalent, {preferredName}
                  </h1>
                  <p className="text-sm text-mjcc-muted mb-12">
                    Your onboarding is complete. Here is what happens next.
                  </p>
                </motion.div>

                {/* Next Steps */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease }}
                  className="space-y-6 mb-12"
                >
                  <div className="border border-mjcc-dark p-5 text-center">
                    <p className="text-xs text-mjcc-gold uppercase tracking-wider mb-2">01</p>
                    <p className="text-sm text-mjcc-cream">
                      Check your email for a confirmation and your official agreement document.
                    </p>
                  </div>

                  <div className="border border-mjcc-dark p-5 text-center">
                    <p className="text-xs text-mjcc-gold uppercase tracking-wider mb-2">02</p>
                    <p className="text-sm text-mjcc-cream">
                      Sign the agreement digitally. We will send a secure link within 24 hours.
                    </p>
                  </div>

                  <div className="border border-mjcc-dark p-5 text-center">
                    <p className="text-xs text-mjcc-gold uppercase tracking-wider mb-2">03</p>
                    <p className="text-sm text-mjcc-cream">
                      Your profile goes live on the BookTalent marketplace and brands can start booking you.
                    </p>
                  </div>
                </motion.div>

                {/* Visit BookTalent link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Link
                    href="/"
                    className="inline-block bg-mjcc-gold text-mjcc-black px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-mjcc-gold-hover transition-colors"
                  >
                    Visit BookTalent
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </>
  )
}
