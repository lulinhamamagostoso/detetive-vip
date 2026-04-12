import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://conteudo.detetive.vip"
const mainSiteUrl = "https://www.detetive.vip"

export const metadata: Metadata = {
  title: {
    template: "%s | Detetive VIP Blog",
    default: "Blog | Detetive VIP — Investigação Digital Profissional",
  },
  description:
    "Central de conteúdo do Detetive VIP. Artigos, guias e tutoriais sobre investigação digital, segurança, fraudes e como se proteger. Informação profissional e atualizada.",
  keywords: [
    "blog detetive particular",
    "investigação digital artigos",
    "como descobrir golpista",
    "segurança digital",
    "fraude PIX",
    "localizar pessoa",
    "Lei 13.432/17",
    "detetive particular Brasil",
  ],
  authors: [{ name: "Detetive VIP" }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Blog | Detetive VIP — Investigação Digital Profissional",
    description:
      "Artigos e guias sobre investigação digital, segurança e como se proteger de fraudes. Conteúdo profissional do Detetive VIP.",
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Detetive VIP Blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf9f7",
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Detetive VIP",
  alternateName: "DetetiveVIP",
  url: mainSiteUrl,
  description:
    "Serviço de investigação digital profissional com entrega via WhatsApp em até 5 minutos. Regulamentado pela Lei 13.432/17.",
  foundingDate: "2024",
  areaServed: { "@type": "Country", name: "Brasil" },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Detetive VIP Blog",
  url: siteUrl,
  publisher: {
    "@type": "Organization",
    name: "Detetive VIP",
    url: mainSiteUrl,
  },
  description:
    "Central de conteúdo do Detetive VIP com artigos sobre investigação digital, segurança e prevenção de fraudes.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
