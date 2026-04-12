import Link from "next/link"
import { Clock, Calendar } from "lucide-react"

interface ArticleCardProps {
  title: string
  description: string
  slug: string
  date: string
  readingTime: number
  category: string
}

export function ArticleCard({
  title,
  description,
  slug,
  date,
  readingTime,
  category,
}: ArticleCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <Link
      href={`/${slug}`}
      className="group block rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6 transition-all hover:border-[var(--border-hover)] hover:shadow-sm"
    >
      {/* Category tag */}
      <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--primary)] mb-3">
        {category}
      </span>

      {/* Title */}
      <h2 className="font-serif text-lg font-semibold text-[var(--foreground)] leading-snug mb-2 group-hover:text-[var(--primary-dark)] transition-colors">
        {title}
      </h2>

      {/* Excerpt */}
      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {readingTime} min de leitura
        </span>
      </div>
    </Link>
  )
}
