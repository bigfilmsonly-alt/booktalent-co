"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const talentBenefits = [
  {
    title: "Brand Partnerships",
    description: "Premium deals from brands that value your on camera credibility, not just your follower count.",
  },
  {
    title: "Original Content and IP",
    description: "Vertical dramas, docuseries, and original concepts with your name on them.",
  },
  {
    title: "Live Commerce",
    description: "TikTok Shop. Amazon Live. Instagram Shopping. You were trained to sell on camera.",
  },
  {
    title: "Career Management",
    description: "Dedicated management, legal support, content strategy, and financial planning.",
  },
]

const brandBenefits = [
  {
    title: "TikTok",
    description: "Talent that understands performance, timing, and audience psychology.",
  },
  {
    title: "YouTube Shorts",
    description: "Vertical content built for discovery, powered by recognizable personalities.",
  },
  {
    title: "Instagram Reels",
    description: "Production quality Reels from talent that knows how to hit their marks.",
  },
  {
    title: "Vertical Dramas",
    description: "Serialized branded entertainment with real storytelling.",
  },
  {
    title: "Live Commerce",
    description: "TikTok Shop, Amazon Live, and Instagram Shopping with proven sellers.",
  },
  {
    title: "Events",
    description: "Brand activations, premieres, product launches, and experiential marketing.",
  },
  {
    title: "Live Streaming",
    description: "Real time audience engagement on Twitch, YouTube Live, and Instagram with talent built for the camera.",
  },
  {
    title: "Podcasts",
    description: "Guest appearances, hosted episodes, and branded audio content with voices audiences already know.",
  },
]

export function AudienceToggle() {
  const [audience, setAudience] = useState<"talent" | "brand">("brand")

  return (
    <section className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        {/* Toggle */}
        <div className="flex justify-center mb-12 lg:mb-16">
          <div className="inline-flex border border-mjcc-dark/50 p-1">
            <button
              onClick={() => setAudience("brand")}
              className={`px-6 py-3 text-sm font-medium tracking-wider transition-all duration-300 min-h-[44px] ${
                audience === "brand"
                  ? "bg-mjcc-gold text-mjcc-black"
                  : "text-mjcc-muted hover:text-mjcc-cream"
              }`}
            >
              I&apos;M A BRAND
            </button>
            <button
              onClick={() => setAudience("talent")}
              className={`px-6 py-3 text-sm font-medium tracking-wider transition-all duration-300 min-h-[44px] ${
                audience === "talent"
                  ? "bg-mjcc-gold text-mjcc-black"
                  : "text-mjcc-muted hover:text-mjcc-cream"
              }`}
            >
              I&apos;M A CREATOR
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {audience === "brand" ? (
            <motion.div
              key="brand"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <h2 className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight">
                  Talent that converts.
                </h2>
                <p className="mt-4 text-sm lg:text-base text-mjcc-muted leading-relaxed max-w-xs lg:max-w-md mx-auto">
                  Every creator on our roster has been selected, trained, and proven on national television.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 max-w-md lg:max-w-4xl mx-auto">
                {brandBenefits.map((type, i) => (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-mjcc-charcoal p-4 text-center border-l-2 border-mjcc-gold/0 hover:border-mjcc-gold/40 transition-all duration-300"
                  >
                    <h3 className="text-xs text-mjcc-cream font-medium tracking-wider mb-1.5">
                      {type.title}
                    </h3>
                    <p className="text-xs text-mjcc-muted leading-relaxed">
                      {type.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <a
                  href="/book"
                  className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[48px] cta-button"
                >
                  BOOK TALENT NOW
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="talent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <h2 className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight">
                  Get booked. Get paid. Get managed.
                </h2>
                <p className="mt-4 text-sm lg:text-base text-mjcc-muted leading-relaxed max-w-xs lg:max-w-md mx-auto">
                  You built an audience on national television. We turn that into a business.
                </p>
              </div>

              <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4 max-w-md lg:max-w-4xl mx-auto">
                {talentBenefits.map((service, i) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-mjcc-charcoal p-5 text-center border-l-2 border-mjcc-gold/0 hover:border-mjcc-gold/40 transition-all duration-300"
                  >
                    <h3 className="text-sm text-mjcc-cream font-medium tracking-wide mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-mjcc-muted leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <a
                  href="/apply"
                  className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-all duration-300 min-h-[48px] cta-button"
                >
                  APPLY TO GET BOOKED
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
