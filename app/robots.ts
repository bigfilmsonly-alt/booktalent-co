import type { MetadataRoute } from "next"

/**
 * There was no robots.txt at all, so nothing discouraged crawlers from indexing
 * /admin or the private invite links. The middleware gate is the actual control;
 * this is a second layer so the URLs do not end up in a search index either.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/invite/", "/api/"],
      },
    ],
  }
}
