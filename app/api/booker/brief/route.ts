import { NextResponse } from "next/server"
import { parseQuery } from "@/lib/talent/parse-query"

/**
 * Booker brief capture.
 *
 * The whole point is that this takes an email and a sentence. No budget gate, no
 * company field, no three step form. A producer who types "black actor, male, plays
 * 25 to 35" and an email has told us everything we need to start working, and asking
 * for their budget before we have shown them a single face is how you lose them.
 *
 * The brief is stored parsed as well as raw, so it can be replayed against
 * search_talent() the moment there is a roster, and so a human can answer it now.
 */

export const runtime = "nodejs"

export async function POST(req: Request) {
  let body: { query?: string; email?: string; name?: string }
  try {
    body = (await req.json()) as { query?: string; email?: string; name?: string }
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 })
  }

  const query = (body.query ?? "").trim()
  const email = (body.email ?? "").trim()

  if (!query) return NextResponse.json({ ok: false, error: "Tell us who you need." }, { status: 422 })
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 422 })
  }

  const parsed = parseQuery(query)

  try {
    const origin = new URL(req.url).origin
    await fetch(`${origin}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "booker-brief",
        email,
        name: body.name ?? null,
        briefRaw: query,
        // Structured so it can be replayed against search_talent() later, and so a
        // human reading it in an inbox can see the criteria at a glance.
        briefParsed: parsed.filters,
        understood: parsed.understood.map((u) => `${u.label}: ${u.values.join(", ")}`),
      }),
    })
  } catch {
    console.error("booker brief: notify failed", { email, query })
  }

  return NextResponse.json({ ok: true })
}
