"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TalentProfilePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/roster")
  }, [router])

  return (
    <section className="px-6 py-20">
      <div className="max-w-md mx-auto text-center">
        <p className="text-sm text-mjcc-muted">Redirecting to roster...</p>
      </div>
    </section>
  )
}
