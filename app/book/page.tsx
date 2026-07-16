import { redirect } from "next/navigation"

/**
 * /book is now /search.
 *
 * There used to be two brands forms: this one (three steps, gated on budget) and the
 * search page. Two forms doing the same job means two places to keep honest and a
 * booker choosing between them for no reason. Everything lives on /search now: the
 * brief, the project, the contact details, one submit.
 *
 * Kept as a redirect rather than deleted because /book is linked from the footer, from
 * older pages, and from anything already sent out. Nobody should hit a 404 because we
 * reorganised.
 */
export default function BookRedirect() {
  redirect("/search")
}
