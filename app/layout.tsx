import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, DM_Sans, Outfit, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/sections/navigation'

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
  title: 'BookTalent — Television-Verified Talent. Ready to Book.',
  description: 'Book verified reality TV talent for brand partnerships, influencer campaigns, TikTok, live commerce, and branded content. 15+ years managing talent from VH1, MTV, Bravo, BET, NBC, and more. The fastest way to book proven talent.',
  keywords: [
    'book talent',
    'book reality TV talent',
    'hire reality TV stars',
    'book influencer for brand',
    'reality TV talent agency',
    'book talent for campaign',
    'TV personality brand deals',
    'hire verified talent',
    'book talent for TikTok',
    'reality TV influencer marketing',
    'book celebrity for brand',
    'talent management agency',
    'live commerce talent',
    'branded content talent',
    'book talent online',
  ],
  authors: [{ name: 'BookTalent' }],
  metadataBase: new URL('https://booktalent.co'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BookTalent',
  },
  openGraph: {
    title: 'BookTalent — Book Reality TV Stars & Verified Talent',
    description: 'The fastest way to book verified reality TV talent for brand campaigns. 15+ years of television relationships. Talent from VH1, MTV, Bravo, BET, NBC, and more.',
    url: 'https://booktalent.co',
    siteName: 'BookTalent',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookTalent — Verified Reality TV Talent for Brands',
    description: 'Book proven reality TV talent for brand partnerships, TikTok campaigns, live commerce, and branded content. booktalent.co',
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
        {children}
        <Navigation />

        <Analytics />
      </body>
    </html>
  )
}
