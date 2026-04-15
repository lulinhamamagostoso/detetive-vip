import type { Metadata, Viewport } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import MetaPixel from "@/components/tracking/meta-pixel"
import GoogleAnalytics from "@/components/tracking/google-analytics"
import MicrosoftClarity from "@/components/tracking/microsoft-clarity"
import UTMTracker from "@/components/tracking/utm-tracker"

// Playfair Display apenas para títulos (H1/H2). display: optional = se não carregar
// rápido, usa fallback serif e não re-renderiza (não impacta LCP).
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "optional",
})

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.detetive.vip"

export const metadata: Metadata = {
  title: "Detetive VIP | Investigação Digital Profissional",
  description:
    "Detetive VIP: investigação digital profissional no Brasil. Descubra tudo sobre qualquer pessoa por nome, CPF, telefone, placa ou PIX. Resultado em 5 minutos via WhatsApp. Lei 13.432/17.",
  keywords: [
    "detetive particular",
    "investigação digital",
    "detetive particular online",
    "investigação por CPF",
    "investigação por telefone",
    "investigação por placa",
    "investigação por chave PIX",
    "investigação CNPJ",
    "localizar pessoa",
    "verificação de antecedentes",
    "golpe PIX identificar golpista",
    "detetive particular Brasil",
    "Lei 13.432/17",
  ],
  authors: [{ name: "Detetive VIP" }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Detetive VIP — Investigação Digital Profissional",
    description:
      "Descubra a verdade sobre qualquer pessoa. Investigação digital com entrega em 5 minutos via WhatsApp. 100% legal e sigiloso.",
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Detetive VIP",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 800,
        height: 600,
        alt: "Detetive VIP — Investigação Digital Profissional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Detetive VIP — Investigação Digital Profissional",
    description:
      "Descubra a verdade sobre qualquer pessoa. Investigação digital com entrega em 5 minutos via WhatsApp. 100% legal e sigiloso.",
    images: [`${siteUrl}/logo.png`],
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
  maximumScale: 5,
  userScalable: true,
  themeColor: "#faf9f7",
}

// JSON-LD Structured Data — Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Detetive VIP",
  alternateName: "DetetiveVIP",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Serviço de investigação digital profissional com entrega via WhatsApp em até 5 minutos. Regulamentado pela Lei 13.432/17. Investigações por CPF, telefone, placa, chave PIX e CNPJ.",
  foundingDate: "2024",
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceArea: { "@type": "Country", name: "Brasil" },
  knowsAbout: [
    "Investigação digital",
    "Investigação particular",
    "Detetive particular",
    "Verificação de antecedentes",
    "Localização de pessoas",
    "Investigação de fraudes",
    "Investigação conjugal",
    "Identificação de golpistas",
    "Consulta CPF",
    "Rastreamento de veículos",
  ],
  slogan: "Descubra a verdade sobre qualquer pessoa",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
}

// JSON-LD — Services
const servicesJsonLd = [
  {
    name: "Investigação por CPF/Nome",
    description:
      "Investigação digital completa a partir do nome ou CPF. Inclui dados pessoais, endereços, vínculos familiares, telefones e mais. Entrega via WhatsApp em até 5 minutos.",
    price: "40.00",
    priceDescription: "Investigação básica por Nome ou CPF",
  },
  {
    name: "Investigação por Telefone",
    description:
      "Localize o titular de qualquer número de celular ou fixo. Inclui nome completo, CPF, endereço e ficha completa. Entrega via WhatsApp em até 5 minutos.",
    price: "79.00",
    priceDescription: "Investigação por Número de Telefone",
  },
  {
    name: "Investigação por Placa de Veículo",
    description:
      "Descubra o proprietário de qualquer veículo pela placa. Inclui dados do proprietário, histórico e situação do veículo. Entrega via WhatsApp em até 5 minutos.",
    price: "79.00",
    priceDescription: "Investigação por Placa de Veículo",
  },
  {
    name: "Investigação por Chave PIX",
    description:
      "Identifique golpistas pela chave PIX. Descubra o titular, CPF, endereço e dados completos do dono da chave. Entrega via WhatsApp em até 5 minutos.",
    price: "197.00",
    priceDescription: "Investigação Premium por Chave PIX",
  },
  {
    name: "Investigação por CNPJ/Empresa",
    description:
      "Investigação completa de empresas por CNPJ. Sócios, faturamento estimado, situação cadastral e débitos. Entrega via WhatsApp em até 5 minutos.",
    price: "197.00",
    priceDescription: "Investigação Premium por CNPJ",
  },
  {
    name: "Investigação Premium",
    description:
      "Investigação aprofundada com acesso a 20+ bancos de dados brasileiros oficiais e mais de 2.000 fontes abertas. Inclui processos judiciais, veículos, parentes, score e dívidas.",
    price: "197.00",
    priceDescription: "Investigação Premium completa",
  },
].map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  description: s.description,
  provider: { "@type": "Organization", name: "Detetive VIP", url: siteUrl },
  serviceType: "Investigação Digital",
  areaServed: { "@type": "Country", name: "Brasil" },
  offers: {
    "@type": "Offer",
    price: s.price,
    priceCurrency: "BRL",
    description: s.priceDescription,
  },
}))

// JSON-LD — FAQ
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "É legal usar esse serviço?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. O Detetive VIP atua dentro da Lei 13.432/17 que regulamenta a profissão de detetive particular no Brasil. Todas as informações são obtidas de fontes legais e públicas, seguindo rigorosos protocolos de compliance.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo demora pra receber o relatório?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O relatório é entregue em até 5 minutos após a confirmação do pagamento. Em alguns casos específicos, pode se estender até 1 hora dependendo da complexidade da investigação.",
      },
    },
    {
      "@type": "Question",
      name: "A pessoa pesquisada fica sabendo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutamente não. A investigação é 100% sigilosa. Nenhum tipo de notificação é enviada ao investigado. Trabalhamos com criptografia ponta a ponta e não mantemos registros das pesquisas após a entrega.",
      },
    },
    {
      "@type": "Question",
      name: "Posso pesquisar qualquer pessoa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, desde que seja para fins lícitos como verificação de antecedentes, localização de devedores, investigação de fraudes, ou proteção patrimonial. Não realizamos investigações para fins de perseguição, stalking ou qualquer atividade ilegal.",
      },
    },
    {
      "@type": "Question",
      name: "Quais formas de pagamento são aceitas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aceitamos apenas PIX como forma de pagamento. É instantâneo, seguro e permite que sua investigação seja iniciada imediatamente após a confirmação.",
      },
    },
    {
      "@type": "Question",
      name: "E se as informações estiverem erradas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Garantimos a precisão das informações. Caso haja algum dado incorreto ou desatualizado, refazemos a investigação gratuitamente ou devolvemos seu dinheiro integralmente.",
      },
    },
  ],
}

// JSON-LD — AggregateRating
const ratingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Detetive VIP — Investigação Digital Profissional",
  description:
    "Serviço de investigação digital com entrega via WhatsApp em até 5 minutos.",
  brand: { "@type": "Brand", name: "Detetive VIP" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1200",
    bestRating: "5",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={playfair.variable}>
      <head>
        {/* Preload LCP images - inicia download em paralelo com HTML parsing */}
        <link
          rel="preload"
          as="image"
          href="/detective-hero.png"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/mockup.webp"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {servicesJsonLd.map((service, i) => (
          <script
            key={`service-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--primary)] focus:text-white focus:text-sm focus:font-semibold"
        >
          Pular para o conteúdo
        </a>
        {children}
        <MetaPixel />
        <GoogleAnalytics />
        <MicrosoftClarity />
        <UTMTracker />
      </body>
    </html>
  )
}
