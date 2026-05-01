import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Pricing",
  description: "BookTalent pricing for influencer campaigns, live commerce, UGC retainers, and branded content. Campaign packages from $15K. Enterprise partnerships at $500K annually.",
}

const services = [
  {
    name: "Campaign Packages",
    description: "Sponsored content with verified creators",
    tiers: [
      { name: "Spark", price: "$15K to $25K", features: ["1 creator", "3 to 5 pieces of content", "30 day usage rights", "Performance report"] },
      { name: "Ignite", price: "$50K to $75K", features: ["3 creators", "10 to 15 pieces of content", "60 day usage rights", "Weekly reports + case study"], featured: true },
      { name: "Primetime", price: "$100K to $250K", features: ["5 to 8 creators", "25 to 40 pieces of content", "90 day paid + organic rights", "Dedicated campaign manager"] },
    ],
    href: "/services/campaigns",
  },
  {
    name: "Vertical Drama Production",
    description: "Original branded series by Big Films Only",
    tiers: [
      { name: "Pilot", price: "$125K", features: ["3 episodes", "Single sponsor", "Full product integration"] },
      { name: "Multi Sponsor", price: "$150K to $200K", features: ["8 to 12 episodes", "Category exclusive", "Content rights for your episodes"], featured: true },
      { name: "Single Sponsor", price: "$250K to $500K", features: ["8 to 12 episodes", "Sole brand sponsor", "Full content rights"] },
    ],
    href: "/services/production",
  },
  {
    name: "Live Commerce",
    description: "Live shopping events with television trained talent",
    tiers: [
      { name: "Single Event", price: "$12K", features: ["1 creator", "60 to 90 min broadcast", "Post event analytics"] },
      { name: "Quarterly", price: "$45K", features: ["4 events over 3 months", "2 to 3 creators rotated", "Save $3K vs. individual"], featured: true },
      { name: "Annual", price: "$150K", features: ["12 events over 12 months", "5+ creators", "Revenue share option"] },
    ],
    href: "/services/commerce",
  },
  {
    name: "UGC Retainers",
    description: "Monthly ad creative from verified creators",
    tiers: [
      { name: "Starter", price: "$5K/mo", features: ["8 pieces per month", "2 creators", "30 day usage rights"] },
      { name: "Growth", price: "$10K/mo", features: ["15 pieces per month", "4 creators", "A/B testing variants"], featured: true },
      { name: "Enterprise", price: "$20K/mo", features: ["30 pieces per month", "6 to 8 creators", "Dedicated account manager"] },
    ],
    href: "/services/ugc",
  },
]

export default function PricingPage() {
  return (
    <main className="bg-mjcc-black min-h-screen pb-20 lg:pb-0">
      {/* Hero */}
      <section className="px-6 lg:px-12 pt-12 lg:pt-24 pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6">Pricing</p>
          <h1 className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-[1.1]">
            Transparent pricing. No hidden fees.
          </h1>
          <p className="mt-4 text-[15px] lg:text-[17px] text-mjcc-muted leading-relaxed max-w-lg mx-auto">
            Every package is built around television verified talent. Choose the service and tier that fits your goals and budget.
          </p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Service sections */}
      {services.map((service, si) => (
        <section key={service.name} className={si % 2 === 0 ? "bg-mjcc-charcoal" : "bg-mjcc-black"}>
          <div className="px-6 lg:px-12 py-16 lg:py-20">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-serif text-2xl lg:text-3xl text-mjcc-cream">{service.name}</h2>
                <p className="mt-2 text-sm text-mjcc-muted">{service.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {service.tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`p-6 border ${
                      tier.featured
                        ? "border-mjcc-gold/40 bg-mjcc-gold/5"
                        : "border-mjcc-dark/50"
                    }`}
                  >
                    {tier.featured && (
                      <p className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em] mb-3">Most Popular</p>
                    )}
                    <h3 className="font-serif text-lg text-mjcc-cream">{tier.name}</h3>
                    <p className="font-mono text-xl text-mjcc-gold font-bold mt-2">{tier.price}</p>
                    <ul className="mt-4 space-y-2">
                      {tier.features.map((f) => (
                        <li key={f} className="text-sm text-mjcc-muted flex items-start gap-2">
                          <span className="text-mjcc-gold mt-0.5 text-xs">&#10003;</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <Link
                  href={service.href}
                  className="text-sm text-mjcc-gold hover:underline"
                >
                  See full details and add ons &rarr;
                </Link>
              </div>
            </div>
          </div>
          {si < services.length - 1 && <div className="gold-divider" />}
        </section>
      ))}

      <div className="gold-divider" />

      {/* Enterprise CTA */}
      <section className="bg-mjcc-black px-6 lg:px-12 py-16 lg:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">Enterprise</p>
          <h2 className="font-serif text-2xl lg:text-3xl text-mjcc-cream">
            Everything we offer. One annual price.
          </h2>
          <p className="mt-4 text-sm text-mjcc-muted leading-relaxed max-w-md mx-auto">
            Roster access, branded series, UGC retainers, live commerce events, and a dedicated account manager. $500K per year. Save $218K versus booking each service separately.
          </p>
          <div className="mt-8 flex flex-col lg:flex-row justify-center gap-3">
            <Link
              href="/services/enterprise"
              className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-colors min-h-[48px]"
            >
              EXPLORE ENTERPRISE
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center border border-mjcc-cream/20 text-mjcc-cream px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-cream hover:text-mjcc-black transition-all min-h-[48px]"
            >
              TALK TO OUR TEAM
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-mjcc-charcoal">
        <div className="gold-divider" />
        <div className="px-6 lg:px-12 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">The Difference</p>
              <h2 className="font-serif text-2xl lg:text-3xl text-mjcc-cream">
                BookTalent vs. the alternatives.
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-mjcc-dark/40">
                    <th className="text-left py-4 text-mjcc-muted font-normal text-xs uppercase tracking-wider"></th>
                    <th className="text-center py-4 text-mjcc-gold font-medium text-xs uppercase tracking-wider">BookTalent</th>
                    <th className="text-center py-4 text-mjcc-muted font-normal text-xs uppercase tracking-wider">Traditional Agency</th>
                    <th className="text-center py-4 text-mjcc-muted font-normal text-xs uppercase tracking-wider">DIY Outreach</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Talent Verification", bt: "TV broadcast credits verified", trad: "Self reported metrics", diy: "No verification" },
                    { feature: "Brand Safety", bt: "Network compliance cleared", trad: "Manual review", diy: "Your responsibility" },
                    { feature: "Production Quality", bt: "In house production company", trad: "Creator handles it", diy: "Creator handles it" },
                    { feature: "Audience Authenticity", bt: "Personally vetted roster", trad: "Varies by agency", diy: "Unverified" },
                    { feature: "Content Ownership", bt: "Full ownership included", trad: "Negotiated per deal", diy: "Negotiated per deal" },
                    { feature: "Turnaround Time", bt: "12 days average", trad: "4 to 8 weeks", diy: "Unpredictable" },
                    { feature: "Satisfaction Guarantee", bt: "Talent substitution at no cost", trad: "Rarely offered", diy: "None" },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-mjcc-dark/20">
                      <td className="py-3 text-mjcc-cream font-medium text-xs">{row.feature}</td>
                      <td className="py-3 text-center text-mjcc-gold text-xs">{row.bt}</td>
                      <td className="py-3 text-center text-mjcc-muted text-xs">{row.trad}</td>
                      <td className="py-3 text-center text-mjcc-muted text-xs">{row.diy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-mjcc-black px-6 py-16 text-center">
        <h2 className="font-serif text-2xl lg:text-3xl text-mjcc-cream mb-4">
          Not sure which package fits?
        </h2>
        <p className="text-sm text-mjcc-muted mb-8 max-w-md mx-auto">
          Book a free 20 minute call. We will recommend the right service, tier, and talent for your brand.
        </p>
        <Link
          href="/schedule"
          className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-colors min-h-[48px]"
        >
          GET YOUR CUSTOM RECOMMENDATION
        </Link>
      </section>

      <Footer />
    </main>
  )
}
