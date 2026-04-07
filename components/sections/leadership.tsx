"use client"

import { motion } from "framer-motion"

const founders = [
  {
    name: "Jotham Hall",
    initials: "JH",
    title: "Co-Founder & CEO",
    bio: "15+ years producing reality television across eight major networks. The vision behind BookTalent.",
  },
  {
    name: "Mira",
    initials: "M",
    title: "Co-Founder & Talent Director",
    bio: "15+ years placing talent across the nation's top reality franchises. The relationship behind every booking.",
  },
]

export function Leadership() {
  return (
    <section id="leadership" className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            Leadership
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            Built by television insiders.
          </motion.h2>
        </div>

        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6 max-w-md lg:max-w-5xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-mjcc-charcoal overflow-hidden"
            >
              <div className="aspect-[16/9] bg-gradient-to-b from-mjcc-dark to-mjcc-charcoal flex items-center justify-center">
                <span className="font-serif text-5xl text-mjcc-gold/15">{founder.initials}</span>
              </div>

              <div className="p-5 text-center">
                <h3 className="font-serif text-xl text-mjcc-cream">{founder.name}</h3>
                <p className="mt-1 text-xs text-mjcc-gold tracking-wider">{founder.title}</p>
                <p className="mt-3 text-sm text-mjcc-muted leading-relaxed">{founder.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 lg:mt-16 max-w-md lg:max-w-2xl mx-auto text-center"
        >
          <p className="font-serif text-lg text-mjcc-cream italic leading-relaxed">
            &ldquo;Every brand should be able to book real talent — not just whoever the algorithm suggests.&rdquo;
          </p>
          <cite className="mt-4 block text-sm text-mjcc-muted not-italic">
            Jotham Hall
          </cite>
        </motion.blockquote>
      </div>
    </section>
  )
}
