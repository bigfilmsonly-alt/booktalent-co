"use client"

import { Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-mjcc-black border-t border-mjcc-dark/50">
      <div className="px-6 lg:px-12 py-12 lg:py-16 max-w-7xl mx-auto">
        {/* Logo & tagline */}
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-[16px] text-mjcc-cream tracking-tight">Book Talent</Link>
          <p className="mt-2 text-[13px] text-mjcc-muted italic">
            The fastest way to book reality TV talent.
          </p>
          <p className="mt-2 text-[11px] text-mjcc-muted">
            Miami, FL — Los Angeles, CA
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-3 gap-4 lg:gap-12 mb-8 text-center lg:text-left max-w-md lg:max-w-3xl mx-auto">
          <div>
            <h4 className="text-[10px] text-mjcc-gold uppercase tracking-wider mb-3">Navigate</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors">Services</Link></li>
              <li><Link href="/book" className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors">Book Talent</Link></li>
              <li><a href="/#leadership" className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors">Leadership</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] text-mjcc-gold uppercase tracking-wider mb-3">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/campaigns" className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors">Campaigns</Link></li>
              <li><Link href="/services/production" className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors">Production</Link></li>
              <li><Link href="/services/commerce" className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors">Commerce</Link></li>
              <li><Link href="/services/ugc" className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors">UGC</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] text-mjcc-gold uppercase tracking-wider mb-3">Connect</h4>
            <ul className="space-y-2">
              <li><a href="/#talent-application" className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors">Apply as Talent</a></li>
              <li><Link href="/services/enterprise" className="text-xs text-mjcc-muted hover:text-mjcc-cream transition-colors">Enterprise</Link></li>
              <li><a href="mailto:hello@booktalent.co" className="text-xs text-mjcc-muted hover:text-mjcc-gold transition-colors">hello@booktalent.co</a></li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="flex items-center justify-center gap-5 mb-8">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 text-mjcc-muted hover:text-mjcc-gold transition-colors" aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 text-mjcc-muted hover:text-mjcc-gold transition-colors" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-mjcc-dark/40 pt-6 text-center space-y-2">
          <p className="text-[10px] text-mjcc-muted">
            &copy; 2026 Book Talent (booktalent.co). All rights reserved. A division of Big Films Only.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/privacy" className="text-[10px] text-mjcc-muted hover:text-mjcc-cream transition-colors">Privacy</a>
            <a href="/terms" className="text-[10px] text-mjcc-muted hover:text-mjcc-cream transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
