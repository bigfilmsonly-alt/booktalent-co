import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Send to GoHighLevel webhook if configured
    if (process.env.GHL_WEBHOOK_URL) {
      const ghlResponse = await fetch(process.env.GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          source: "booktalent.co",
        }),
      })

      if (!ghlResponse.ok) {
        console.error("GHL webhook failed:", await ghlResponse.text())
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Submission error:", error)
    return NextResponse.json({ error: "Submission failed" }, { status: 500 })
  }
}
