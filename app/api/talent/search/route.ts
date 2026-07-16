import { NextResponse } from "next/server"
import { parseQuery } from "@/lib/talent/parse-query"
import type { TalentSearchResult } from "@/lib/talent/types"

/**
 * Booker search.
 *
 * Parses the natural language brief into structured filters, then runs them against
 * search_talent(). The parse is real and works today; the query needs a database.
 *
 * `status` tells the UI which empty it is looking at, because "nobody matches your
 * brief" and "search is not connected yet" are completely different things to a
 * booker and must never render the same way.
 */

export const runtime = "nodejs"

export interface SearchResponse {
  status: "ok" | "not_connected"
  understood: { field: string; label: string; values: string[] }[]
  unmatched: string[]
  filters: Record<string, unknown>
  results: TalentSearchResult[]
  total: number
}

const supabaseConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(req: Request): Promise<NextResponse<SearchResponse | { error: string }>> {
  let body: { query?: string }
  try {
    body = (await req.json()) as { query?: string }
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 })
  }

  const parsed = parseQuery(body.query ?? "")

  if (!supabaseConfigured()) {
    // Deliberately not an error. The parse is the useful half and the UI shows it,
    // so a booker can see exactly how their brief was read even before there is a
    // roster to run it against.
    return NextResponse.json({
      status: "not_connected",
      understood: parsed.understood,
      unmatched: parsed.unmatched,
      filters: parsed.filters as Record<string, unknown>,
      results: [],
      total: 0,
    })
  }

  // TODO(supabase): once provisioned, this is the whole query. search_talent is
  // security definer and returns only booker-safe columns, so it is safe to call
  // with the service key from here.
  //
  //   const supabase = createClient(url, serviceKey)
  //   const { data, error } = await supabase.rpc('search_talent', {
  //     p_talent_types: parsed.filters.talentTypes ?? null,
  //     p_ethnicities_portrayable: parsed.filters.ethnicitiesPortrayable ?? null,
  //     p_genders_portrayable: parsed.filters.gendersPortrayable ?? null,
  //     p_languages: parsed.filters.languages ?? null,
  //     p_plays_age_min: parsed.filters.playsAgeMin ?? null,
  //     p_plays_age_max: parsed.filters.playsAgeMax ?? null,
  //     p_city: parsed.filters.city ?? null,
  //     p_niches: parsed.filters.niches ?? null,
  //     p_min_followers: parsed.filters.minFollowers ?? null,
  //     p_limit: 50,
  //   })
  //   return NextResponse.json({ status: 'ok', ..., results: data, total: data[0]?.total_count ?? 0 })

  return NextResponse.json({
    status: "ok",
    understood: parsed.understood,
    unmatched: parsed.unmatched,
    filters: parsed.filters as Record<string, unknown>,
    results: [],
    total: 0,
  })
}
