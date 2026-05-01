"use client"

import { motion } from "framer-motion"

const differentiators = [
  {
    title: "Television Verified Talent",
    description: "Every creator has confirmed broadcast credits across MTV, Food Network, NBC, OWN, and CBS. Network compliance cleared. Background checked. FCC standards met. We reject 80% of applicants.",
  },
  {
    title: "Production Company Built In",
    description: "Big Films Only is our production arm. Branded vertical drama series, original IP, and campaign content produced in house. Find the talent. Book the talent. Produce the content. One partner.",
  },
  {
    title: "Live Commerce Pipeline",
    description: "Our talent was trained to sell on camera by television networks. We activate them on TikTok Shop, Amazon Live, and Instagram Live Shopping. QVC meets reality TV meets the creator economy.",
  },
  {
    title: "Reunion and Crossover Content",
    description: "We produce crossover content between cast members from different reality franchises. Brand sponsored reunion moments that create cultural tentpole events. Fifteen years of television relationships unlock this.",
  },
]

export function WhyUs() {
  return (
    <section id="why-book-talent" className="bg-mjcc-black">

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
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            What you book here you cannot book anywhere else.
          </motion.h2>
        </div>

        <div className="max-w-md lg:max-w-4xl mx-auto">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 lg:py-10 border-b border-mjcc-dark/40"
            >
              <h3 className="font-serif text-xl lg:text-2xl text-mjcc-cream mb-3">
                {item.title}
              </h3>
              <p className="text-sm lg:text-[15px] text-mjcc-muted leading-[1.7] max-w-2xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-center"
        >
          <a
            href="/book"
            className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-colors duration-300 min-h-[48px] cta-button"
          >
            SEE WHAT THIS LOOKS LIKE FOR YOUR BRAND
          </a>
        </motion.div>
      </div>
    </section>
  )
}
