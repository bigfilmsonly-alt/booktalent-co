"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "BookTalent delivered 4x the engagement we got from traditional influencer campaigns. The talent actually knows how to perform on camera.",
    name: "Sarah Chen",
    title: "VP of Marketing",
    company: "Glow Beauty Co.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face&q=80",
  },
  {
    quote: "We booked three reality TV personalities for a live commerce event. $280K in sales in 90 minutes. Nothing else comes close.",
    name: "David Park",
    title: "Head of Partnerships",
    company: "FitLife Supplements",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&q=80",
  },
  {
    quote: "From booking to content delivery in 12 days. The production quality was broadcast level. Our CMO thought we hired a full agency.",
    name: "Rachel Torres",
    title: "Brand Director",
    company: "Luxe Home Living",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face&q=80",
  },
]

export function Testimonials() {
  return (
    <section className="bg-mjcc-black">
      <div className="gold-divider" />

      <div className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            From Our Partners
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-tight"
          >
            Brands trust BookTalent.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-md lg:max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-mjcc-charcoal border border-mjcc-dark/50 p-6 lg:p-8 flex flex-col"
            >
              {/* Quote */}
              <p className="text-sm text-mjcc-cream/90 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-mjcc-dark/40">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 object-cover shrink-0"
                  style={{ clipPath: "circle(50%)" }}
                />
                <div>
                  <p className="text-sm text-mjcc-cream font-medium">{t.name}</p>
                  <p className="text-[11px] text-mjcc-muted">{t.title}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
