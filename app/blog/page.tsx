import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on influencer marketing, creator economy trends, live commerce strategy, and working with television verified talent. From the BookTalent team.",
}

const posts = [
  {
    slug: "how-much-does-influencer-marketing-cost-2025",
    title: "How Much Does Influencer Marketing Cost in 2025",
    excerpt: "A transparent breakdown of influencer marketing pricing across campaign types, from UGC retainers to enterprise partnerships.",
    category: "Pricing",
    date: "Coming Soon",
  },
  {
    slug: "reality-tv-creators-vs-social-media-influencers",
    title: "Reality TV Creators vs. Social Media Influencers: What Brands Need to Know",
    excerpt: "Why television verified creators outperform traditional influencers on engagement, brand safety, and ROI.",
    category: "Strategy",
    date: "Coming Soon",
  },
  {
    slug: "tiktok-shop-creator-strategy-guide",
    title: "The Complete TikTok Shop Creator Strategy for Brands",
    excerpt: "How to find, vet, and activate creators for TikTok Shop. Includes live commerce best practices and performance benchmarks.",
    category: "Live Commerce",
    date: "Coming Soon",
  },
  {
    slug: "brand-safety-checklist-creator-campaigns",
    title: "The Brand Safety Checklist for Creator Campaigns",
    excerpt: "A step by step guide to vetting creators, protecting your brand, and avoiding the most common influencer marketing pitfalls.",
    category: "Brand Safety",
    date: "Coming Soon",
  },
]

export default function BlogPage() {
  return (
    <main className="bg-mjcc-black min-h-screen pb-20 lg:pb-0">
      <section className="px-6 lg:px-12 pt-12 lg:pt-24 pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-6">Blog</p>
          <h1 className="font-serif text-3xl lg:text-5xl text-mjcc-cream leading-[1.1]">
            Insights from the roster.
          </h1>
          <p className="mt-4 text-[15px] text-mjcc-muted leading-relaxed max-w-lg mx-auto">
            Strategy, pricing transparency, and lessons from 15 years of working with television talent.
          </p>
        </div>
      </section>

      <div className="gold-divider" />

      <section className="px-6 lg:px-12 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto space-y-6">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="p-6 border border-mjcc-dark/50 hover:border-mjcc-gold/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] text-mjcc-gold uppercase tracking-[0.2em]">{post.category}</span>
                <span className="text-[10px] text-mjcc-muted">{post.date}</span>
              </div>
              <h2 className="font-serif text-lg lg:text-xl text-mjcc-cream leading-snug">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-mjcc-muted leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <p className="text-sm text-mjcc-muted mb-4">Want these insights delivered to your inbox?</p>
        <Link
          href="/#media-kit"
          className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-colors min-h-[48px]"
        >
          GET THE MEDIA KIT
        </Link>
      </section>

      <Footer />
    </main>
  )
}
