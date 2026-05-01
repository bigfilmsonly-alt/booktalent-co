"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RosterPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/apply")
  }, [router])

  return (
    <section className="px-6 py-20">
      <div className="max-w-md mx-auto text-center">
        <p className="text-sm text-mjcc-muted">Redirecting...</p>
      </div>
    </section>
  )
}
