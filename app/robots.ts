import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.detetive.vip"

  return {
    rules: [
      // Permitir todos os crawlers por padrão
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout/", "/_next/"],
      },
      // Permitir crawlers de IA explicitamente
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      // Bloquear bots de scraping em áreas sensíveis
      { userAgent: "AhrefsBot", disallow: ["/checkout/"] },
      { userAgent: "SemrushBot", disallow: ["/checkout/"] },
      { userAgent: "MJ12bot", disallow: ["/checkout/"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
