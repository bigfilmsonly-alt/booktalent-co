"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Users, Briefcase, CalendarCheck, UserPlus } from "lucide-react"
import Link from "next/link"

interface Tab {
  label: string
  icon: typeof Home
  routeHref: string
  hashHref: string | null
}

const tabs: Tab[] = [
  { label: "Home", icon: Home, routeHref: "/", hashHref: "#top" },
  { label: "Services", icon: Briefcase, routeHref: "/services", hashHref: null },
  { label: "Talent", icon: Users, routeHref: "/roster", hashHref: null },
  { label: "Book", icon: CalendarCheck, routeHref: "/book", hashHref: null },
  { label: "Apply", icon: UserPlus, routeHref: "/#talent-application", hashHref: "#talent-application" },
]

const desktopLinks = [
  { label: "Services", href: "/services" },
  { label: "Roster", href: "/roster" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"
  const isHomeRef = useRef(isHome)
  isHomeRef.current = isHome
  const [activeHash, setActiveHash] = useState("#top")
  const [scrolled, setScrolled] = useState(false)

  function handleClick(tab: Tab) {
    if (isHomeRef.current && tab.hashHref) {
      setActiveHash(tab.hashHref)
      if (tab.hashHref === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        const el = document.querySelector(tab.hashHref)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      window.scrollTo({ top: 0, behavior: "instant" })
      router.push(tab.routeHref)
    }
  }

  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return

    const hashTabs = tabs.filter((t) => t.hashHref && t.hashHref !== "#top")
    const sectionIds = hashTabs.map((t) => t.hashHref!.replace("#", ""))
    const visibleSections = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleSections.add(entry.target.id)
          else visibleSections.delete(entry.target.id)
        }
        const active = sectionIds.find((id) => visibleSections.has(id))
        if (active) setActiveHash(`#${active}`)
        else setActiveHash("#top")
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [isHome])

  function isActive(tab: Tab): boolean {
    if (isHome) return tab.hashHref === activeHash
    const tabPath = tab.routeHref.split("#")[0] || "/"
    if (tabPath === "/") return pathname === "/"
    return pathname.startsWith(tabPath)
  }

  return (
    <>
      {/* ─── Desktop top navigation ─── */}
      <header
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-mjcc-black/95 backdrop-blur-xl border-b border-mjcc-dark/40" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 xl:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="font-serif text-lg text-mjcc-cream tracking-tight">
              BookTalent
            </Link>

            {/* Center links */}
            <nav className="flex items-center gap-8">
              {desktopLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-mjcc-muted hover:text-mjcc-cream transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center gap-4">
              <Link
                href="/#talent-application"
                className="text-[12px] text-mjcc-muted hover:text-mjcc-cream transition-colors tracking-wider uppercase"
              >
                For Talent
              </Link>
              <Link
                href="/book"
                className="bg-mjcc-gold text-mjcc-black px-5 py-2 text-[12px] font-medium tracking-wider hover:bg-mjcc-gold-hover transition-colors"
              >
                BOOK TALENT
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile bottom tab bar ─── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-mjcc-black/95 backdrop-blur-2xl border-t border-mjcc-dark/40 touch-manipulation"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-around h-[72px] px-2">
          {tabs.map((tab) => {
            const active = isActive(tab)
            return (
              <button
                key={tab.label}
                onClick={() => handleClick(tab)}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 touch-manipulation transition-colors duration-200 ${
                  active ? "scale-105" : ""
                }`}
                aria-label={tab.label}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 transition-all duration-200 ${
                    active ? "bg-mjcc-gold/15" : ""
                  }`}
                >
                  <tab.icon
                    className={`w-6 h-6 transition-colors duration-200 ${
                      active ? "text-mjcc-gold" : "text-mjcc-muted"
                    }`}
                    strokeWidth={active ? 2.2 : 1.5}
                  />
                </div>
                <span
                  className={`text-[11px] tracking-wide transition-colors duration-200 ${
                    active ? "text-mjcc-gold font-semibold" : "text-mjcc-muted"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
