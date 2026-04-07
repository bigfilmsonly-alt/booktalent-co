"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Search, X, ChevronDown } from "lucide-react"
import { talentRoster } from "@/lib/talent-data"
import { Footer } from "@/components/sections/footer"

const allNetworks = [
  "All Networks",
  "VH1",
  "MTV",
  "Bravo",
  "BET",
  "Food Network",
  "NBC",
  "Hallmark",
  "USA Network",
  "OWN",
  "CBS",
]

const allCategories = [
  "All Categories",
  "Beauty",
  "Fashion",
  "Fitness",
  "Comedy",
  "Lifestyle",
  "Food",
  "Music",
  "Drama",
  "Parenting",
  "Travel",
]

const allSizes = ["All Sizes", "Under 500K", "500K-1M", "1M+"]

function parseFollowing(val: string): number {
  const clean = val.replace(/,/g, "")
  if (clean.endsWith("M")) return parseFloat(clean) * 1_000_000
  if (clean.endsWith("K")) return parseFloat(clean) * 1_000
  return parseFloat(clean)
}

const anim = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

export default function RosterPage() {
  const [network, setNetwork] = useState("All Networks")
  const [category, setCategory] = useState("All Categories")
  const [size, setSize] = useState("All Sizes")
  const [search, setSearch] = useState("")

  const activeFilters: { label: string; clear: () => void }[] = []
  if (network !== "All Networks") activeFilters.push({ label: network, clear: () => setNetwork("All Networks") })
  if (category !== "All Categories") activeFilters.push({ label: category, clear: () => setCategory("All Categories") })
  if (size !== "All Sizes") activeFilters.push({ label: size, clear: () => setSize("All Sizes") })
  if (search.trim()) activeFilters.push({ label: `"${search}"`, clear: () => setSearch("") })

  const filtered = useMemo(() => {
    return talentRoster.filter((t) => {
      if (network !== "All Networks" && !t.networks.includes(network)) return false
      if (category !== "All Categories" && !t.specialties.includes(category)) return false
      if (size !== "All Sizes") {
        const count = parseFollowing(t.following)
        if (size === "Under 500K" && count >= 500_000) return false
        if (size === "500K-1M" && (count < 500_000 || count >= 1_000_000)) return false
        if (size === "1M+" && count < 1_000_000) return false
      }
      if (search.trim()) {
        const q = search.toLowerCase()
        const haystack = `${t.name} ${t.specialties.join(" ")}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [network, category, size, search])

  function resetFilters() {
    setNetwork("All Networks")
    setCategory("All Categories")
    setSize("All Sizes")
    setSearch("")
  }

  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-12 pb-10">
        <div className="max-w-md mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-4"
          >
            The Roster
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[32px] sm:text-4xl text-mjcc-cream leading-[1.1] tracking-tight"
          >
            Television-verified talent. Ready to book.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-[15px] text-mjcc-muted leading-relaxed"
          >
            Every creator on our roster has confirmed broadcast television credits. Filter by network, category, or audience size to find the right talent for your brand.
          </motion.p>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-40 bg-mjcc-black/95 backdrop-blur-sm border-b border-mjcc-dark">
        <div className="max-w-md mx-auto px-4 py-3">
          {/* Filters row: 3 dropdowns side by side */}
          <div className="grid grid-cols-3 gap-2">
            <div className="relative">
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full appearance-none bg-mjcc-charcoal border border-mjcc-dark text-mjcc-cream text-[10px] sm:text-xs px-2 sm:px-3 py-2.5 pr-6 focus:border-mjcc-gold transition-colors"
              >
                {allNetworks.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-mjcc-platinum pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none bg-mjcc-charcoal border border-mjcc-dark text-mjcc-cream text-[10px] sm:text-xs px-2 sm:px-3 py-2.5 pr-6 focus:border-mjcc-gold transition-colors"
              >
                {allCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-mjcc-platinum pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full appearance-none bg-mjcc-charcoal border border-mjcc-dark text-mjcc-cream text-[10px] sm:text-xs px-2 sm:px-3 py-2.5 pr-6 focus:border-mjcc-gold transition-colors"
              >
                {allSizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-mjcc-platinum pointer-events-none" />
            </div>
          </div>

          {/* Search row: full width below */}
          <div className="relative mt-2">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mjcc-platinum pointer-events-none" />
            <input
              type="text"
              placeholder="Search talent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-mjcc-charcoal border border-mjcc-dark text-mjcc-cream text-xs px-3 py-2.5 pl-8 placeholder:text-mjcc-muted focus:border-mjcc-gold transition-colors"
            />
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {activeFilters.map((f) => (
                <button
                  key={f.label}
                  onClick={f.clear}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-mjcc-gold/10 border border-mjcc-gold/30 text-mjcc-gold text-[11px] uppercase tracking-wider hover:bg-mjcc-gold/20 transition-colors"
                >
                  {f.label}
                  <X size={10} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Talent grid */}
      <section className="px-4 py-8 pb-24">
        <div className="max-w-md mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((talent, i) => (
                <motion.div
                  key={talent.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/roster/${talent.slug}`}
                    className="block bg-mjcc-charcoal border border-transparent hover:border-mjcc-gold/40 transition-all group overflow-hidden"
                  >
                    {/* Compact portrait */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={talent.image}
                        alt={talent.name}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        sizes="50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="font-serif text-sm text-mjcc-cream leading-tight">
                          {talent.name}
                        </h3>
                        <p className="text-[10px] text-mjcc-platinum/80 mt-0.5 truncate">
                          {talent.credits[0].network} · {talent.credits[0].seasons}
                        </p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="font-mono text-[11px] text-mjcc-gold">
                            {talent.following}
                          </span>
                          <span className="text-[9px] text-mjcc-gold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                            Book →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="font-serif text-xl text-mjcc-cream mb-2">
                No talent matches those filters.
              </p>
              <p className="text-sm text-mjcc-muted mb-6">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={resetFilters}
                className="inline-block px-6 py-2.5 bg-mjcc-gold text-mjcc-black text-sm font-medium hover:bg-mjcc-gold-hover transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
