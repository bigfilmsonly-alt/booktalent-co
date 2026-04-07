import { Footer } from "@/components/sections/footer"

export default function PrivacyPage() {
  return (
    <div className="bg-mjcc-black min-h-screen pb-[120px]">
      <div className="px-6 pt-12 pb-16 max-w-md mx-auto">
        <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4">Legal</p>
        <h1 className="font-serif text-[32px] text-mjcc-cream leading-[1.1] tracking-tight mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-sm text-mjcc-muted leading-relaxed">
          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">Information We Collect</h2>
            <p>We collect information you provide directly, including name, email, company, and campaign details submitted through our forms. We also collect standard analytics data including page views and device information via Vercel Analytics.</p>
          </div>

          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">How We Use Your Information</h2>
            <p>Your information is used solely to respond to booking inquiries, talent applications, and partnership requests. We do not sell or share your personal data with third parties for marketing purposes.</p>
          </div>

          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">Data Storage</h2>
            <p>Your data is stored securely and retained only as long as necessary to fulfill the purpose for which it was collected. You may request deletion of your data at any time by emailing hello@booktalent.co.</p>
          </div>

          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">Cookies</h2>
            <p>We use essential cookies for site functionality and analytics cookies to understand how visitors use our site. No advertising or tracking cookies are used.</p>
          </div>

          <div>
            <h2 className="text-mjcc-cream font-medium mb-2">Contact</h2>
            <p>For privacy-related questions, contact us at <a href="mailto:hello@booktalent.co" className="text-mjcc-gold hover:text-mjcc-gold-hover transition-colors">hello@booktalent.co</a>.</p>
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
