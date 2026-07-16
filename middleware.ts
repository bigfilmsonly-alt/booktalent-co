import { NextResponse, type NextRequest } from "next/server"

/**
 * Gate for /admin.
 *
 * app/admin/talent was shipping publicly with no auth at all: it renders the full
 * talent list, including people who have not signed, straight into the HTML. Anyone
 * who guessed the URL could read it, and there is no robots.txt discouraging crawlers.
 *
 * This fails CLOSED. With no ADMIN_PASSWORD set the route 404s, which is the correct
 * default for a page that leaks real people's names. To turn it back on, set
 * ADMIN_PASSWORD (and optionally ADMIN_USER) in the Vercel project and redeploy;
 * the route then sits behind HTTP basic auth.
 *
 * This is a stopgap, not a real auth system. The durable fix is to make the admin
 * page a server component that reads from the database behind a real session, so the
 * roster is never serialized into a client bundle in the first place.
 */

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER || "admin"
  const pass = process.env.ADMIN_PASSWORD

  // No credentials configured: pretend the route does not exist.
  if (!pass) {
    return NextResponse.rewrite(new URL("/_not-found", req.url), { status: 404 })
  }

  const header = req.headers.get("authorization")
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6))
      const idx = decoded.indexOf(":")
      const gotUser = decoded.slice(0, idx)
      const gotPass = decoded.slice(idx + 1)
      if (gotUser === user && gotPass === pass) {
        return NextResponse.next()
      }
    } catch {
      // Malformed header falls through to the challenge below.
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="BookTalent admin", charset="UTF-8"',
      // Never let an intermediary hold on to anything from behind this gate.
      "Cache-Control": "no-store",
    },
  })
}

export const config = {
  matcher: ["/admin/:path*"],
}
