"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Footer } from "@/components/sections/footer"

const values = [
  { number: "01", title: "Verification First", description: "Every creator has confirmed broadcast credits. Every brand is qualified. Every campaign is vetted. 80% of applicants are rejected." },
  { number: "02", title: "Production Grade Output", description: "We are a production company first. Every piece of content meets the standards we set producing 100+ shows for eight major networks." },
  { number: "03", title: "Brand Safety Built In", description: "Our talent has cleared network standards and practices. The same compliance process that protects television advertisers protects your brand." },
  { number: "04", title: "Careers, Not Just Deals", description: "Every creator gets career strategy, content coaching, and a dedicated manager. We build businesses around talent, not just one off deals." },
]

export default function AboutPage() {
  return (
    <main className="bg-mjcc-black min-h-screen pb-20 lg:pb-0">
      {/* Hero */}
      <section className="px-6 lg:px-12 pt-12 lg:pt-24 pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6">
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-[1.1] italic"
          >
            &ldquo;Brands are burning millions on unvetted influencers. We built the platform that fixes that.&rdquo;
          </motion.h1>
          <motion.cite
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="block mt-4 text-sm text-mjcc-muted not-italic"
          >
            Jotham Hall, Co-Founder
          </motion.cite>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Origin story */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto space-y-6">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[15px] lg:text-[17px] text-mjcc-muted leading-[1.8]">
            The creator economy has a quality problem. Brands spend billions on influencer marketing every year and most of it is wasted on creators with bought followers, inconsistent content, and zero accountability.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-[15px] lg:text-[17px] text-mjcc-muted leading-[1.8]">
            That gap exists because there is no verification standard. Anyone with a phone and a ring light can call themselves an influencer. No background checks. No audience verification. No production standards. No recourse when they ghost a campaign.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[15px] lg:text-[17px] text-mjcc-muted leading-[1.8]">
            BookTalent exists to close that gap. We built a platform where every creator has confirmed broadcast television credits across networks like MTV, Food Network, NBC, and CBS. They have cleared network compliance, passed background checks, and proven they can perform on camera professionally.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-[15px] lg:text-[17px] text-mjcc-cream leading-[1.8] font-medium">
            Fifteen years of television relationships. 100+ reality shows produced. 50+ verified creators managed. One standard: if they have not been on national television, they are not on our roster.
          </motion.p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Mission + Vision */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto space-y-12">
          <div>
            <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">The Mission</p>
            <p className="text-[15px] lg:text-[17px] text-mjcc-muted leading-[1.8]">
              To represent television verified talent, deliver production grade content, and become the most trusted booking platform in the creator economy. Every campaign we run, every creator we sign, every brand we partner with is built on one principle. Quality is non negotiable.
            </p>
          </div>
          <div>
            <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">The Vision</p>
            <p className="text-[15px] lg:text-[17px] text-mjcc-muted leading-[1.8]">
              To become the CAA of the creator economy. The premium talent management and content production company that defines what professional creator marketing looks like in the 21st century.
            </p>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Values */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4 text-center">The Values</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-mjcc-cream text-center mb-12">What we stand for.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div key={v.number} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="py-6 border-b border-mjcc-dark/40">
                <span className="font-serif text-4xl text-mjcc-dark leading-none">{v.number}</span>
                <h3 className="font-serif text-xl text-mjcc-cream mt-2 mb-2">{v.title}</h3>
                <p className="text-sm text-mjcc-muted leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Founders */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4 text-center">Leadership</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-mjcc-cream text-center mb-12">Built by television insiders.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { initials: "JH", name: "Jotham Hall", title: "Co-Founder & CEO", bio: "Television producer and entrepreneur with 15+ years and credits on 100+ reality shows across eight major networks. Founder of Big Films Only and architect of the BookTalent platform." },
              { initials: "M", name: "Mira", title: "Co-Founder & Talent Director", bio: "Talent director with 15+ years placing personalities across the nation's top reality franchises. The relationship at the center of every name on the roster." },
            ].map((f, i) => (
              <motion.div key={f.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-mjcc-charcoal overflow-hidden">
                <div className="aspect-[16/9] bg-gradient-to-b from-mjcc-dark to-mjcc-charcoal flex items-center justify-center">
                  <span className="font-serif text-6xl text-mjcc-cream/15">{f.initials}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-mjcc-cream">{f.name}</h3>
                  <p className="text-xs text-mjcc-gold tracking-wider mt-1">{f.title}</p>
                  <p className="text-sm text-mjcc-muted leading-relaxed mt-3">{f.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-16 text-center">
        <h2 className="font-serif text-2xl lg:text-3xl text-mjcc-cream mb-6">See what verified talent can do for your brand.</h2>
        <div className="flex flex-col lg:flex-row justify-center gap-3">
          <Link href="/book" className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-colors min-h-[48px]">
            GET A FREE PROPOSAL
          </Link>
          <Link href="/schedule" className="inline-flex items-center justify-center border border-mjcc-cream/20 text-mjcc-cream px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-cream hover:text-mjcc-black transition-all min-h-[48px]">
            TALK TO OUR TEAM
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
