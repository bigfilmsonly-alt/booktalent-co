"use client"

import { useState, useMemo } from "react"
import { talent } from "@/lib/talent-data"
import type { TalentTier } from "@/lib/talent-data"
import { Search, Copy, Check, ExternalLink } from "lucide-react"

const TIERS: ('All' | TalentTier)[] = ['All', 'Marquee', 'Core', 'Rising']

export default function AdminTalentPage() {
  const [activeTier, setActiveTier] = useState<'All' | TalentTier>('All')
  const [search, setSearch] = useState('')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return talent.filter((t) => {
      if (activeTier !== 'All' && t.tier !== activeTier) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        return t.name.toLowerCase().includes(q) || t.genre.toLowerCase().includes(q)
      }
      return true
    })
  }, [activeTier, search])

  const counts = {
    total: talent.length,
    marquee: talent.filter(t => t.tier === 'Marquee').length,
    core: talent.filter(t => t.tier === 'Core').length,
    rising: talent.filter(t => t.tier === 'Rising').length,
  }

  function copyInviteLink(inviteSlug: string) {
    navigator.clipboard.writeText(`https://booktalent.co/invite/${inviteSlug}`)
    setCopiedSlug(inviteSlug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  return (
    <div className="min-h-screen bg-mjcc-black text-mjcc-cream">
      {/* Header */}
      <div className="border-b border-mjcc-dark">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-xs text-mjcc-gold uppercase tracking-[0.2em] mb-2">Internal</p>
          <h1 className="font-serif text-3xl text-mjcc-cream">Talent Checklist</h1>
          <p className="text-sm text-mjcc-muted mt-2">
            {counts.total} total creators. {counts.marquee} Marquee. {counts.core} Core. {counts.rising} Rising.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-mjcc-dark">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            {TIERS.map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                  activeTier === tier
                    ? 'bg-mjcc-gold text-mjcc-black font-medium'
                    : 'border border-mjcc-dark text-mjcc-platinum hover:border-mjcc-gold/40'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mjcc-platinum" />
            <input
              type="text"
              placeholder="Search by name or genre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-mjcc-charcoal border border-mjcc-dark text-mjcc-cream text-sm px-3 py-2 pl-9 placeholder:text-mjcc-muted focus:border-mjcc-gold transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="text-xs text-mjcc-muted mb-3">{filtered.length} results</div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-mjcc-dark text-left">
                <th className="py-3 px-2 text-xs text-mjcc-platinum uppercase tracking-wider font-normal">#</th>
                <th className="py-3 px-2 text-xs text-mjcc-platinum uppercase tracking-wider font-normal">Name</th>
                <th className="py-3 px-2 text-xs text-mjcc-platinum uppercase tracking-wider font-normal">Tier</th>
                <th className="py-3 px-2 text-xs text-mjcc-platinum uppercase tracking-wider font-normal">Following</th>
                <th className="py-3 px-2 text-xs text-mjcc-platinum uppercase tracking-wider font-normal">IG</th>
                <th className="py-3 px-2 text-xs text-mjcc-platinum uppercase tracking-wider font-normal">TT</th>
                <th className="py-3 px-2 text-xs text-mjcc-platinum uppercase tracking-wider font-normal">Status</th>
                <th className="py-3 px-2 text-xs text-mjcc-platinum uppercase tracking-wider font-normal">Invite Link</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id} className="border-b border-mjcc-dark/50 hover:bg-mjcc-charcoal/50 transition-colors">
                  <td className="py-3 px-2 text-mjcc-muted font-mono text-xs">{t.priority}</td>
                  <td className="py-3 px-2">
                    <div>
                      <span className="text-mjcc-cream font-medium">{t.name}</span>
                      <span className="text-mjcc-muted text-xs block mt-0.5">{t.genre}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                      t.tier === 'Marquee'
                        ? 'bg-mjcc-gold/20 text-mjcc-gold'
                        : t.tier === 'Core'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-mjcc-dark text-mjcc-platinum'
                    }`}>
                      {t.tier}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-mono text-xs text-mjcc-gold">{t.totalFollowing}</td>
                  <td className="py-3 px-2">
                    <a href={t.igUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-mjcc-muted hover:text-mjcc-gold transition-colors">
                      {t.igHandle}
                    </a>
                  </td>
                  <td className="py-3 px-2">
                    <a href={t.ttUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-mjcc-muted hover:text-mjcc-gold transition-colors">
                      {t.ttHandle}
                    </a>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                      t.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : t.status === 'claimed' || t.status === 'onboarding'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-mjcc-dark text-mjcc-platinum'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyInviteLink(t.inviteSlug)}
                        className="flex items-center gap-1.5 px-2.5 py-1 border border-mjcc-dark text-xs text-mjcc-platinum hover:border-mjcc-gold/40 hover:text-mjcc-gold transition-colors"
                        title="Copy invite link"
                      >
                        {copiedSlug === t.inviteSlug ? (
                          <>
                            <Check size={12} className="text-green-400" />
                            <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                      <a
                        href={`/invite/${t.inviteSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-mjcc-muted hover:text-mjcc-gold transition-colors"
                        title="Preview invite page"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
