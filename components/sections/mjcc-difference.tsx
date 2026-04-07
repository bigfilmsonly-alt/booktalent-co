"use client"

import { motion } from "framer-motion"

const differentiators = [
  {
    number: "01",
    title: "Television Verified Talent",
    description: "Every creator on BookTalent has confirmed broadcast credits across networks like MTV, Food Network, NBC, OWN, and CBS. They have cleared network compliance, FCC standards, and production background checks. That is a vetting process no algorithm can replicate. No other agency in the creator economy can either.",
  },
  {
    number: "02",
    title: "Production Company Built In",
    description: "BookTalent is not just a booking platform. We produce content. Big Films Only is our production arm. It creates branded vertical drama series, original IP, and campaign content at a level no influencer agency can match. Find the talent. Book the talent. Produce the content. All under one roof, all from a single partner.",
  },
  {
    number: "03",
    title: "Live Commerce Pipeline",
    description: "Our talent was literally trained to sell on camera by television networks. We activate them on TikTok Shop, Amazon Live, and Instagram Live Shopping for real time, camera ready commerce. Think QVC meets reality TV meets the creator economy. Nobody else has this capability built into their talent pipeline.",
  },
  {
    number: "04",
    title: "Reunion and Crossover Content",
    description: "We are the only company with the relationships to produce crossover content between cast members from different reality franchises. Brand sponsored reunion content that creates tentpole cultural moments no other agency can manufacture. This is what fifteen years of television relationships actually unlock.",
  },
]

export function WhyUs() {
  return (
    <section id="why-book-talent" className="bg-mjcc-charcoal">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            Why BookTalent
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            What you book here you cannot book anywhere else.
          </motion.h2>
        </div>

        <div className="max-w-md lg:max-w-4xl mx-auto">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="py-8 lg:py-10 border-b border-mjcc-dark/40 relative"
            >
              {/* Large background number */}
              <span className="absolute top-6 left-0 font-serif text-[80px] lg:text-[120px] text-mjcc-dark/30 leading-none select-none pointer-events-none">
                {item.number}
              </span>

              <div className="relative pl-0 lg:pl-24">
                <h3 className="font-serif text-xl lg:text-2xl text-mjcc-cream mb-3">
                  {item.title}
                </h3>
                <p className="text-sm lg:text-[15px] text-mjcc-muted leading-[1.7] max-w-2xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href="/book"
            className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-colors duration-300 min-h-[48px]"
          >
            BOOK TALENT NOW
          </a>
        </motion.div>
      </div>
    </section>
  )
}
