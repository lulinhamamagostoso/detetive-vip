import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.detetive.vip"

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-04-12"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: new Date("2026-04-12"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: new Date("2026-04-12"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
