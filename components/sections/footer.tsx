"use client"

import { Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-mjcc-black border-t border-mjcc-dark/50">
      <div className="px-6 lg:px-12 py-12 lg:py-16 max-w-7xl mx-auto">
        {/* Brand — always centered on mobile */}
        <div className="text-center lg:text-left mb-10">
          <Link href="/" className="font-serif text-lg text-mjcc-cream tracking-tight">BookTalent</Link>
          <p className="mt-2 text-[13px] text-mjcc-cream italic">
            The Network Behind The Network.
          </p>
          <p className="mt-2 text-[11px] text-mjcc-cream/80">
            Miami, FL. Los Angeles, CA.
          </p>
        </div>

        {/* Links — stacked centered on mobile, 3-col grid on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 text-center lg:text-left">
          {/* Browse */}
          <div>
            <h4 className="text-[10px] text-mjcc-gold uppercase tracking-wider mb-3">Browse</h4>
            <ul className="space-y-2">
              <li><Link href="/apply" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">The Roster</Link></li>
              <li><Link href="/case-studies" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">Case Studies</Link></li>
              <li><Link href="/about" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">About</Link></li>
              <li><Link href="/schedule" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">Schedule a Call</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] text-mjcc-gold uppercase tracking-wider mb-3">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/campaigns" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">Campaigns</Link></li>
              <li><Link href="/services/production" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">Production</Link></li>
              <li><Link href="/services/commerce" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">Commerce</Link></li>
              <li><Link href="/services/ugc" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">UGC</Link></li>
              <li><Link href="/services/management" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">Management</Link></li>
              <li><Link href="/services/enterprise" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">Enterprise</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[10px] text-mjcc-gold uppercase tracking-wider mb-3">Connect</h4>
            <ul className="space-y-2">
              <li><a href="/apply" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">Apply as Talent</a></li>
              <li><Link href="/book" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">Book Talent</Link></li>
              <li><a href="mailto:hello@booktalent.co" className="text-xs text-mjcc-cream hover:text-mjcc-gold transition-colors">hello@booktalent.co</a></li>
            </ul>
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-mjcc-cream hover:text-mjcc-gold transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-mjcc-cream hover:text-mjcc-gold transition-colors" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-mjcc-dark/40 pt-6 flex flex-col items-center gap-2 text-center">
          <p className="text-[10px] text-mjcc-cream/80">
            &copy; 2026 BookTalent. All rights reserved. A division of Big Films Only.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[10px] text-mjcc-cream hover:text-mjcc-gold transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] text-mjcc-cream hover:text-mjcc-gold transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
