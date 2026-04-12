import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export interface ArticleFrontmatter {
  title: string
  description: string
  date: string
  lastUpdated: string
  author: string
  authorRole: string
  category: string
  tags: string[]
  cta: "nome-cpf" | "celular-placa" | "premium" | "pix"
}

export interface Article {
  slug: string
  frontmatter: ArticleFrontmatter
  content: string
  readingTime: number
}

export interface ArticleWithHtml extends Article {
  htmlContent: string
}

const articlesDirectory = path.join(process.cwd(), "content", "articles")

/**
 * Calculate reading time in minutes based on word count.
 * Assumes ~200 words per minute for Portuguese text.
 */
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return Math.max(1, minutes)
}

/**
 * Get all article slugs for static generation.
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return []
  }

  const files = fs.readdirSync(articlesDirectory)
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
}

/**
 * Get all articles sorted by date (newest first).
 */
export function getAllArticles(): Article[] {
  const slugs = getAllSlugs()

  const articles = slugs.map((slug) => {
    const filePath = path.join(articlesDirectory, `${slug}.md`)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return {
      slug,
      frontmatter: data as ArticleFrontmatter,
      content,
      readingTime: calculateReadingTime(content),
    }
  })

  return articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return dateB - dateA
  })
}

/**
 * Get a single article by slug, with HTML content rendered from markdown.
 */
export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithHtml | null> {
  const filePath = path.join(articlesDirectory, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  const processed = await remark().use(html, { sanitize: false }).process(content)
  const htmlContent = processed.toString()

  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
    htmlContent,
    readingTime: calculateReadingTime(content),
  }
}

/**
 * Get all unique categories from articles.
 */
export function getAllCategories(): string[] {
  const articles = getAllArticles()
  const categories = new Set(articles.map((a) => a.frontmatter.category))
  return Array.from(categories).sort()
}

/**
 * Get static params for all article pages.
 */
export function getStaticArticleParams(): { slug: string }[] {
  return getAllSlugs().map((slug) => ({ slug }))
}
