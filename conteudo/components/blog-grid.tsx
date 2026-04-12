"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { ArticleCard } from "./article-card"

interface ArticleData {
  slug: string
  title: string
  description: string
  date: string
  readingTime: number
  category: string
}

const ARTICLES_PER_PAGE = 10

export function BlogGrid({
  articles,
  categories,
}: {
  articles: ArticleData[]
  categories: string[]
}) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = articles

    if (activeCategory) {
      result = result.filter((a) => a.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      )
    }

    return result
  }, [articles, activeCategory, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  )

  // Reset page when filters change
  const handleCategoryChange = (cat: string | null) => {
    setActiveCategory(cat)
    setPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  return (
    <>
      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Buscar artigos..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background-card)] py-2.5 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === null
                ? "bg-[var(--primary)] text-white"
                : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--border-hover)]"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[var(--primary)] text-white"
                  : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--border-hover)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {paginated.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--muted-foreground)] text-sm">
            Nenhum artigo encontrado.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {paginated.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              description={article.description}
              slug={article.slug}
              date={article.date}
              readingTime={article.readingTime}
              category={article.category}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-10 flex items-center justify-center gap-2"
          aria-label="Paginação"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)] transition-colors hover:border-[var(--border-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                p === currentPage
                  ? "bg-[var(--primary)] text-white"
                  : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--border-hover)]"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)] transition-colors hover:border-[var(--border-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </nav>
      )}
    </>
  )
}
