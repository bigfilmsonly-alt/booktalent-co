import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, DM_Sans, Outfit, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/sections/navigation'
import { StickyBookBar } from '@/components/sections/sticky-book-bar'
import { ExitIntentPopup } from '@/components/sections/exit-intent-popup'
import { IPhoneFrame } from '@/components/sections/iphone-frame'

import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: {
    default: 'Book Reality TV Stars for Brand Campaigns | BookTalent',
    template: '%s | BookTalent',
  },
  description: 'Book verified reality TV talent from MTV, Food Network, NBC and more. Campaign packages from $15K. 4.2x average ROAS across 47 campaigns. Get a proposal in 24 hours.',
  keywords: [
    'book reality TV talent',
    'hire reality TV stars',
    'reality TV influencer marketing',
    'TikTok Shop influencer agency',
    'UGC content agency',
    'live shopping influencer',
    'branded content production company',
    'influencer marketing agency CPG',
    'book celebrity for product launch',
    'television verified talent',
    'reality TV brand partnerships',
    'influencer campaign management',
    'creator economy talent agency',
    'book talent for TikTok',
    'live commerce talent booking',
  ],
  authors: [{ name: 'BookTalent' }],
  metadataBase: new URL('https://booktalent.co'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BookTalent',
  },
  openGraph: {
    title: 'Book Reality TV Stars for Brand Campaigns | BookTalent',
    description: 'Verified reality TV talent from MTV, Food Network, NBC and more. Campaign packages from $15K. 4.2x average ROAS. Proposal in 24 hours.',
    url: 'https://booktalent.co',
    siteName: 'BookTalent',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Reality TV Stars for Campaigns | BookTalent',
    description: 'Verified reality TV talent for brand campaigns, TikTok, live commerce, and branded content. From $15K. booktalent.co',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable} ${outfit.variable} ${spaceMono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BookTalent",
              url: "https://booktalent.co",
              description: "Television verified talent agency connecting brands with reality TV creators for campaigns, live commerce, and branded content.",
              foundingDate: "2023",
              founder: [
                { "@type": "Person", name: "Jotham Hall", jobTitle: "Co-Founder & CEO" },
                { "@type": "Person", name: "Mira", jobTitle: "Co-Founder & Talent Director" },
              ],
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@booktalent.co",
                contactType: "sales",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "BookTalent Services",
                itemListElement: [
                  { "@type": "Offer", name: "Campaign Packages", description: "Multi creator sponsored content campaigns", priceRange: "$15K - $250K" },
                  { "@type": "Offer", name: "Vertical Drama Production", description: "Original branded series by Big Films Only", priceRange: "$125K - $500K" },
                  { "@type": "Offer", name: "Live Commerce", description: "Live shopping events with television trained talent", priceRange: "$12K - $150K" },
                  { "@type": "Offer", name: "UGC Content Retainers", description: "Monthly ad creative from verified creators", priceRange: "$5K - $20K/mo" },
                  { "@type": "Offer", name: "Talent Management", description: "Dedicated representation for reality TV creators", priceRange: "$0 - $1,500/mo" },
                  { "@type": "Offer", name: "Enterprise Partnership", description: "Full annual partnership with roster, production, UGC, and commerce", priceRange: "$500K/year" },
                ],
              },
            }),
          }}
        />
        <IPhoneFrame>
          {children}
          <Navigation />
          <StickyBookBar />
          <ExitIntentPopup />
        </IPhoneFrame>

        <Analytics />
      </body>
    </html>
  )
}
