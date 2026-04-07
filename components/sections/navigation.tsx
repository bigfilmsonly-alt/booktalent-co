"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Users, Briefcase, CalendarCheck, UserPlus } from "lucide-react"

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

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"
  const isHomeRef = useRef(isHome)
  isHomeRef.current = isHome
  const [activeHash, setActiveHash] = useState("#top")

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
      router.push(tab.routeHref)
    }
  }

  // Scroll spy for home page
  useEffect(() => {
    if (!isHome) return

    const hashTabs = tabs.filter((t) => t.hashHref && t.hashHref !== "#top")
    const sectionIds = hashTabs.map((t) => t.hashHref!.replace("#", ""))
    const visibleSections = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id)
          } else {
            visibleSections.delete(entry.target.id)
          }
        }

        // Pick the first visible tracked section (topmost in DOM order)
        const active = sectionIds.find((id) => visibleSections.has(id))
        if (active) {
          setActiveHash(`#${active}`)
        } else {
          // No tracked section visible — default to Home
          setActiveHash("#top")
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => {
      observer.disconnect()
    }
  }, [isHome])

  function isActive(tab: Tab): boolean {
    if (isHome) {
      // On the home page, highlight based on scroll position
      return tab.hashHref === activeHash
    }
    // On other pages, match by the route path (strip hash fragments)
    const tabPath = tab.routeHref.split("#")[0] || "/"
    if (tabPath === "/") return pathname === "/"
    return pathname.startsWith(tabPath)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-mjcc-black/95 backdrop-blur-2xl border-t border-mjcc-dark/40 touch-manipulation"
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
  )
}
