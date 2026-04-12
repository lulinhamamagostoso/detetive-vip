import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug, getStaticArticleParams } from "@/lib/articles"
import { CtaBanner } from "@/components/cta-banner"
import { Calendar, Clock, User } from "lucide-react"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getStaticArticleParams()
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: "Artigo nao encontrado" }
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://conteudo.detetive.vip"

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      locale: "pt_BR",
      url: `${siteUrl}/${slug}`,
      siteName: "Detetive VIP Blog",
      publishedTime: article.frontmatter.date,
      modifiedTime: article.frontmatter.lastUpdated,
      authors: [article.frontmatter.author],
      tags: article.frontmatter.tags,
    },
    alternates: {
      canonical: `/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://conteudo.detetive.vip"

  const formattedDate = new Date(article.frontmatter.date).toLocaleDateString(
    "pt-BR",
    { day: "numeric", month: "long", year: "numeric" }
  )

  const formattedUpdated = new Date(
    article.frontmatter.lastUpdated
  ).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    datePublished: article.frontmatter.date,
    dateModified: article.frontmatter.lastUpdated,
    author: {
      "@type": "Person",
      name: article.frontmatter.author,
      jobTitle: article.frontmatter.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Detetive VIP",
      url: "https://www.detetive.vip",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${slug}`,
    },
    keywords: article.frontmatter.tags.join(", "),
    wordCount: article.content.trim().split(/\s+/).length,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="mb-8">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--primary)] mb-3">
            {article.frontmatter.category}
          </span>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)] tracking-tight leading-tight mb-4">
            {article.frontmatter.title}
          </h1>

          <p className="text-base text-[var(--muted-foreground)] leading-relaxed mb-6">
            {article.frontmatter.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--muted)] pb-6 border-b border-[var(--border)]">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {article.frontmatter.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTime} min de leitura
            </span>
          </div>

          {formattedDate !== formattedUpdated && (
            <p className="text-[11px] text-[var(--muted)] mt-3">
              Atualizado em {formattedUpdated}
            </p>
          )}
        </header>

        {/* Article content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        />

        {/* Tags */}
        {article.frontmatter.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-[var(--border)]">
            <div className="flex flex-wrap gap-2">
              {article.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block text-[11px] font-medium text-[var(--muted-foreground)] bg-[var(--background-secondary)] border border-[var(--border)] rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <CtaBanner />
      </article>
    </>
  )
}
