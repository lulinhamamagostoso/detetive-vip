import type { Metadata } from "next"
import { BlogHeader } from "@/components/blog/header"
import { BlogFooter } from "@/components/blog/footer"

export const metadata: Metadata = {
  title: {
    template: "%s | Blog Detetive VIP",
    default: "Blog Detetive VIP — Artigos sobre Investigação Digital",
  },
  description:
    "Artigos, guias e tutoriais sobre investigação digital, segurança e como se proteger de fraudes no Brasil. Conteúdo especializado do Detetive VIP.",
  openGraph: {
    title: "Blog Detetive VIP — Artigos sobre Investigação Digital",
    description:
      "Artigos, guias e tutoriais sobre investigação digital, segurança e como se proteger de fraudes no Brasil.",
    type: "website",
    locale: "pt_BR",
    url: "https://www.detetive.vip/blog",
    siteName: "Detetive VIP",
  },
  alternates: {
    canonical: "/blog",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Detetive VIP",
    description:
      "Artigos, guias e tutoriais sobre investigação digital, segurança e como se proteger de fraudes no Brasil.",
    url: "https://www.detetive.vip/blog",
    publisher: {
      "@type": "Organization",
      name: "Detetive VIP",
      url: "https://www.detetive.vip",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogHeader />
      <main className="min-h-screen">{children}</main>
      <BlogFooter />
    </>
  )
}
