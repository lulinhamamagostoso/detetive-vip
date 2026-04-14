"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Menu, X } from "lucide-react"

export function BlogHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/blog" className="flex items-center gap-2 group">
            <span className="font-serif text-xl font-bold tracking-tight text-[var(--foreground)]">
              Detetive{" "}
              <span className="gradient-gold-text">VIP</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-medium text-[var(--muted)] border border-[var(--border)] rounded-full px-2 py-0.5">
              Blog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Artigos
            </Link>
            <span className="w-px h-5 bg-[var(--border)]" />
            <a
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-[var(--primary-dark)] hover:text-[var(--primary)] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar para detetive.vip
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-[var(--border)] py-4 space-y-1">
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              Artigos
            </Link>
            <div className="border-t border-[var(--border)] my-2" />
            <a
              href="/"
              className="flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-[var(--primary-dark)] hover:text-[var(--primary)] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar para detetive.vip
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
