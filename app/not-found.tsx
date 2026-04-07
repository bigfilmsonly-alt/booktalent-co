import Link from "next/link"

export default function NotFound() {
  return (
    <main className="bg-mjcc-black min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-[150px] lg:text-[200px] text-mjcc-dark leading-none">404</h1>
        <p className="font-serif text-xl lg:text-2xl text-mjcc-cream mt-4">This page isn&apos;t on the roster yet.</p>
        <p className="text-sm text-mjcc-muted mt-2">Let&apos;s get you back to the talent.</p>
        <Link
          href="/roster"
          className="inline-flex items-center justify-center bg-mjcc-gold text-mjcc-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-mjcc-gold-deep transition-colors mt-8 min-h-[48px]"
        >
          BROWSE THE ROSTER
        </Link>
      </div>
    </main>
  )
}
