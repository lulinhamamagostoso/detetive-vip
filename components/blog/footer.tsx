import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function BlogFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-secondary)]">
      {/* CTA Strip */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 text-center">
          <p className="text-sm text-[var(--muted-foreground)] mb-3">
            Precisa de uma investigacao?
          </p>
          <a
            href="https://www.detetive.vip/#planos"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--primary)" }}
          >
            Contrate agora
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <span className="font-serif text-lg font-bold text-[var(--foreground)]">
              Detetive <span className="gradient-gold-text">VIP</span>
            </span>
            <p className="text-xs text-[var(--muted)] mt-1">
              Investigacao Digital Profissional
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--muted-foreground)]">
            <a
              href="/"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Site principal
            </a>
            <a
              href="/termos"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Termos de uso
            </a>
            <a
              href="/privacidade"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Privacidade
            </a>
            <Link
              href="/blog"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[var(--muted)]">
          <p>&copy; {currentYear} Detetive VIP. Todos os direitos reservados.</p>
          <p>Regulamentado pela Lei 13.432/17</p>
        </div>
      </div>
    </footer>
  )
}
