import { getAllArticles, getAllCategories } from "@/lib/articles"
import { BlogGrid } from "@/components/blog-grid"

export default function BlogHomePage() {
  const articles = getAllArticles()
  const categories = getAllCategories()

  const articlesData = articles.map((a) => ({
    slug: a.slug,
    title: a.frontmatter.title,
    description: a.frontmatter.description,
    date: a.frontmatter.date,
    readingTime: a.readingTime,
    category: a.frontmatter.category,
  }))

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight mb-3">
            Blog Detetive{" "}
            <span className="gradient-gold-text">VIP</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
            Artigos, guias e tutoriais sobre investigação digital, segurança e
            como se proteger de fraudes no Brasil
          </p>
        </div>
      </section>

      {/* Articles Grid with Search, Categories, Pagination */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
        <BlogGrid articles={articlesData} categories={categories} />
      </section>
    </>
  )
}
