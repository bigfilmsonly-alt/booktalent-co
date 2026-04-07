# MJCC - MJ Creators Connect

A premium two-sided creator marketplace connecting Hollywood-verified reality TV talent with global brands. Built with Next.js 16, Tailwind CSS 4, and Framer Motion.

---

## Overview

**MJ Creators Connect (MJCC)** is the brainchild of television veterans Jotham Hall and Mira, who together have produced over 100 reality TV shows across major networks. MJCC bridges the gap between proven on-camera talent and brands seeking authentic, high-performing creator partnerships.

### The Problem We Solve

- **For Talent**: Reality TV stars struggle to monetize their fame beyond their shows. Traditional influencer agencies don't understand TV talent.
- **For Brands**: Finding verified, camera-ready creators with proven audience appeal is difficult. Most influencer marketplaces are flooded with unvetted accounts.

### Our Solution

A curated, invitation-only marketplace where every creator is TV-verified and every brand partnership is white-glove managed.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.0 | React framework with App Router |
| React | 19 | UI library |
| TypeScript | 5.7.3 | Type safety |
| Tailwind CSS | 4.2.0 | Utility-first styling |
| Framer Motion | 11.15.0 | Animations |
| Radix UI | Latest | Accessible component primitives |
| Lucide React | 0.564.0 | Icons |
| shadcn/ui | Latest | Component library |

---

## Design System

### Color Palette

The site uses a dark, cinematic aesthetic inspired by premium entertainment brands:

| Token | Hex | Usage |
|-------|-----|-------|
| `mjcc-black` | `#0A0A0A` | Primary background |
| `mjcc-obsidian` | `#111111` | Card backgrounds |
| `mjcc-charcoal` | `#1A1A1A` | Elevated surfaces |
| `mjcc-gold` | `#C9A84C` | Primary accent, CTAs |
| `mjcc-gold-light` | `#D4B85D` | Hover states |
| `mjcc-cream` | `#F5F5F0` | Primary text |
| `mjcc-silver` | `#A0A0A0` | Secondary text |
| `mjcc-border` | `#2A2A2A` | Borders, dividers |

### Typography

| Font | Weight | Usage |
|------|--------|-------|
| DM Serif Display | 400 | Headlines, hero text |
| Outfit | 500-600 | Subheadings, labels |
| DM Sans | 400-500 | Body text |
| Space Mono | 400 | Stats, numbers, monospace |

### Animation Tokens

```css
--ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
--duration-slow: 0.8s;
--duration-medium: 0.5s;
--duration-fast: 0.3s;
```

### Design Principles

1. **Sharp edges** - No border-radius on primary elements
2. **Gold accents** - Used sparingly for emphasis and CTAs
3. **Film grain** - Subtle texture overlay for cinematic feel
4. **Generous whitespace** - Let content breathe
5. **Scroll-triggered reveals** - Content animates into view

---

## Project Structure

```
mjcc-landing/
├── app/
│   ├── globals.css          # Global styles, CSS variables, Tailwind config
│   ├── layout.tsx           # Root layout with fonts and metadata
│   └── page.tsx             # Main landing page
├── components/
│   ├── sections/            # Page sections (15 components)
│   │   ├── navigation.tsx   # Sticky header with mobile menu
│   │   ├── hero.tsx         # Full-viewport hero with network marquee
│   │   ├── credibility-bar.tsx # Animated stats bar
│   │   ├── mjcc-difference.tsx  # Value proposition
│   │   ├── for-talent.tsx   # Talent benefits section
│   │   ├── for-brands.tsx   # Brand benefits section
│   │   ├── roster.tsx       # Featured talent grid
│   │   ├── how-it-works.tsx # Dual-track process
│   │   ├── case-study.tsx   # Campaign results showcase
│   │   ├── only-at-nfg.tsx  # Unique offerings
│   │   ├── leadership.tsx   # Founders section
│   │   ├── talent-application.tsx # Talent signup form
│   │   ├── brand-inquiry.tsx # Brand contact form
│   │   ├── media-kit.tsx    # Lead magnet download
│   │   └── footer.tsx       # Site footer
│   └── ui/                  # shadcn/ui components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
└── public/                  # Static assets
```

---

## Page Sections

### 1. Navigation
- Sticky header that transitions from transparent to solid on scroll
- Desktop: Full nav links + dual CTAs
- Mobile: Hamburger menu with slide-out drawer
- Links: How It Works, Roster, For Talent, For Brands, Leadership

### 2. Hero
- Full viewport height
- Animated headline: "Hollywood-Verified Talent. Campaign-Ready Creators."
- Network logo marquee (VH1, MTV, Bravo, BET, etc.)
- Dual CTA buttons

### 3. Credibility Bar
- Four animated count-up statistics:
  - 15+ Years in Television
  - 100+ Shows Produced
  - 8 Major Networks
  - 50M+ Combined Reach

### 4. MJCC Difference
- Two-column layout
- Key differentiators with gold bullet points
- Emphasis on TV verification and white-glove service

### 5. For Talent
- Benefits grid (Brand Partnerships, Content Strategy, etc.)
- Urgency strip: "Only 20 new creators accepted per quarter"
- CTA to application form

### 6. For Brands
- Content format options (Sponsored Posts, TikTok Campaigns, etc.)
- Campaign metrics showcase
- CTA to inquiry form

### 7. Roster
- Featured talent preview cards
- Placeholder for actual talent photos
- Link to full roster page

### 8. How It Works
- Dual-track process diagram
- Talent track: Apply → Review → Onboard → Match
- Brand track: Inquire → Brief → Match → Execute

### 9. Case Study
- Sample campaign results
- Metrics: Views, Engagement Rate, Sales Lift
- Client testimonial

### 10. Only At MJCC
- Unique service offerings
- Vertical drama production
- Exclusive talent access

### 11. Leadership
- Founder profiles:
  - **Jotham Hall** - Co-Founder & CEO, 100+ shows produced
  - **Mira** - Co-Founder & Talent Director, "the brains and the beauty behind the beast"
- Signature pull quote

### 12. Talent Application
Full intake form with fields:
- Full Name, Email, Phone
- TV Show Credits
- Instagram Handle, TikTok Handle
- Follower Count Range (dropdown)
- Content Categories (multi-select)
- Additional Information (textarea)

### 13. Brand Inquiry
Full intake form with fields:
- Contact Name, Email, Phone
- Company Name, Job Title
- Campaign Budget Range (dropdown)
- Content Types of Interest (multi-select)
- Campaign Goals (textarea)
- Timeline (dropdown)

### 14. Media Kit
- Email capture for lead magnet
- Download MJCC capabilities deck

### 15. Footer
- Four-column layout
- Navigation links
- Contact information
- Social media links
- Copyright

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/mjcc-landing.git
cd mjcc-landing

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Deployment

This project is optimized for deployment on Vercel:

```bash
# Deploy to Vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

---

## Environment Variables

Currently, no environment variables are required for the landing page. Future integrations may require:

```env
# Form submissions (future)
FORM_ENDPOINT=

# Analytics (future)
NEXT_PUBLIC_GA_ID=

# CRM integration (future)
HUBSPOT_API_KEY=
```

---

## Customization

### Updating Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --color-mjcc-gold: #C9A84C;
  --color-mjcc-black: #0A0A0A;
  /* ... */
}
```

### Updating Fonts

Edit `app/layout.tsx` to change the Google Fonts imports:

```tsx
import { DM_Serif_Display, Outfit, DM_Sans, Space_Mono } from 'next/font/google'
```

### Adding New Sections

1. Create a new component in `components/sections/`
2. Export a named function component
3. Import and add to `app/page.tsx`

---

## Key Features

- **Fully Responsive** - Mobile-first design that scales beautifully
- **Accessible** - Built with Radix UI primitives for ARIA compliance
- **Performant** - Optimized images, code splitting, lazy loading
- **Animated** - Smooth scroll-triggered animations with Framer Motion
- **SEO Ready** - Proper metadata, semantic HTML, Open Graph tags
- **Type Safe** - Full TypeScript coverage

---

## Form Handling

The talent application and brand inquiry forms are client-side only in this version. To connect to a backend:

1. Create API routes in `app/api/`
2. Update form `onSubmit` handlers to POST to your endpoints
3. Integrate with your CRM (HubSpot, Salesforce, etc.)

Example API route:

```typescript
// app/api/talent-application/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  // Save to database or send to CRM
  return Response.json({ success: true })
}
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

Proprietary - All rights reserved by MJ Creators Connect LLC.

---

## Contact

- **Website**: [mjcreatorsconnect.com](https://mjcreatorsconnect.com)
- **Email**: hello@mjcreatorsconnect.com
- **Instagram**: [@mjcreatorsconnect](https://instagram.com/mjcreatorsconnect)

---

## Founders

**Jotham Hall** - Television producer and entrepreneur with credits on 100+ reality shows across VH1, MTV, Bravo, BET, Food Network, NBC, Hallmark, and USA Network. Founder of Big Films Only.

**Mira** - The brains and the beauty behind the beast. 20+ years placing personalities across the nation's top reality franchises. The relationship at the center of every deal.

---

*"Twenty years building television careers. Now we're bringing our entire Rolodex to the creator economy."*
