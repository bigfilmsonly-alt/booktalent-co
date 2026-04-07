import { Footer } from "@/components/sections/footer"

export default function TermsPage() {
  return (
    <div className="bg-mjcc-black min-h-screen pb-[120px]">
      <div className="px-6 pt-12 pb-16 max-w-md mx-auto">
        <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">Legal</p>
        <h1 className="font-serif text-[32px] text-mjcc-cream leading-[1.1] tracking-tight mb-8">
          Terms of Service
        </h1>

        <div className="space-y-6 text-sm text-mjcc-muted leading-relaxed">
          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">Acceptance of Terms</h2>
            <p>By accessing booktalent.co, you agree to these terms. If you do not agree, do not use the site. BookTalent is a division of Big Films Only.</p>
          </div>

          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">Services</h2>
            <p>BookTalent connects brands with television-verified talent for campaigns, live commerce, branded content, and event appearances. All bookings are subject to talent availability and mutual agreement on terms.</p>
          </div>

          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">Booking & Payment</h2>
            <p>Submitting an inquiry or booking request does not guarantee availability. All campaigns require a signed agreement and payment terms before work begins. Rates, deliverables, and timelines are confirmed in writing for every booking.</p>
          </div>

          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">Intellectual Property</h2>
            <p>All content on this site — including text, design, and branding — is owned by Big Films Only. Campaign content rights are defined in individual booking agreements.</p>
          </div>

          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">Limitation of Liability</h2>
            <p>BookTalent is not liable for any indirect or consequential damages arising from the use of our services. Our total liability is limited to the fees paid for the specific service in question.</p>
          </div>

          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:hello@booktalent.co" className="text-mjcc-gold hover:text-mjcc-gold-hover transition-colors">hello@booktalent.co</a>.</p>
          </div>

          <p className="text-[11px] text-mjcc-muted/60 pt-4 border-t border-mjcc-dark/40">
            Last updated: April 2026
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
