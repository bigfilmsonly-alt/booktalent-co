"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Users, Briefcase, CalendarCheck, UserPlus } from "lucide-react"
import Link from "next/link"

interface Tab {
  label: string
  icon: typeof Home
  href: string
  primary?: boolean
}

const tabs: Tab[] = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Services", icon: Briefcase, href: "/services" },
  { label: "Book", icon: CalendarCheck, href: "/book", primary: true },
  { label: "Apply", icon: UserPlus, href: "/apply" },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  function handleClick(tab: Tab) {
    if (pathname === tab.href) {
      window.scrollTo({ top: 0, behavior: "instant" })
    } else {
      window.scrollTo({ top: 0, behavior: "instant" })
      router.push(tab.href)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function isActive(tab: Tab): boolean {
    if (tab.href === "/") return pathname === "/"
    return pathname.startsWith(tab.href)
  }

  function isDesktopActive(href: string): boolean {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop header — glass, static, futuristic */}
      <header
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-mjcc-black/80 backdrop-blur-2xl shadow-[0_1px_30px_rgba(232,185,49,0.04)]"
            : "bg-mjcc-black/40 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-10 xl:px-16">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="font-serif text-[17px] text-mjcc-cream tracking-[0.4em] uppercase hover:text-mjcc-gold transition-colors duration-400">
              BookTalent
            </Link>

            {/* Center nav — 4 essential links */}
            <nav className="flex items-center gap-10">
              {[
                { label: "SERVICES", href: "/services" },
                { label: "PRICING", href: "/pricing" },
                { label: "ABOUT", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[10px] tracking-[0.25em] transition-colors duration-300 ${
                    isDesktopActive(link.href)
                      ? "text-mjcc-gold"
                      : "text-mjcc-cream hover:text-mjcc-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right — two clear CTAs */}
            <div className="flex items-center gap-5">
              <Link
                href="/apply"
                className="text-[10px] text-mjcc-cream tracking-[0.2em] border border-mjcc-cream/20 px-5 py-2.5 hover:border-mjcc-gold hover:text-mjcc-gold transition-all duration-300"
              >
                JOIN AS CREATOR
              </Link>
              <Link
                href="/book"
                className="text-[10px] text-mjcc-black tracking-[0.2em] bg-mjcc-gold px-5 py-2.5 font-medium hover:bg-mjcc-gold-hover transition-all duration-300"
              >
                BOOK TALENT
              </Link>
            </div>
          </div>
        </div>

        {/* Thin gold accent line at bottom of header */}
        <div className={`h-[1px] transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`} style={{ background: "linear-gradient(90deg, transparent, rgba(232, 185, 49, 0.3), transparent)" }} />
      </header>

      {/* Mobile bottom tab bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-mjcc-black/90 backdrop-blur-2xl border-t border-mjcc-cream/8 touch-manipulation"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-end justify-around h-[70px] px-1">
          {tabs.map((tab) => {
            const active = isActive(tab)

            if (tab.primary) {
              return (
                <button
                  key={tab.label}
                  onClick={() => handleClick(tab)}
                  className="flex flex-col items-center justify-center flex-1 h-full touch-manipulation -mt-4"
                  aria-label={tab.label}
                >
                  <div className="flex items-center justify-center w-[52px] h-[52px] bg-mjcc-gold shadow-[0_4px_20px_rgba(232,185,49,0.25)] mb-0.5">
                    <tab.icon
                      className="w-5 h-5 text-mjcc-black"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-[8px] tracking-[0.2em] text-mjcc-gold font-medium uppercase mt-0.5">
                    {tab.label}
                  </span>
                </button>
              )
            }

            return (
              <button
                key={tab.label}
                onClick={() => handleClick(tab)}
                className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 touch-manipulation"
                aria-label={tab.label}
              >
                <tab.icon
                  className={`w-[18px] h-[18px] transition-colors duration-200 ${
                    active ? "text-mjcc-gold" : "text-mjcc-cream/70"
                  }`}
                  strokeWidth={active ? 2.2 : 1.5}
                />
                <span
                  className={`text-[8px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                    active ? "text-mjcc-gold font-medium" : "text-mjcc-cream/70"
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
