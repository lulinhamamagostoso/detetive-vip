import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-28 text-center">
      <p className="text-6xl font-serif font-bold gradient-gold-text mb-4">
        404
      </p>
      <h1 className="text-xl font-semibold text-[var(--foreground)] mb-2">
        Pagina nao encontrada
      </h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
        O conteudo que voce procura nao existe ou foi movido. Confira nossos
        artigos mais recentes.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary-dark)] hover:text-[var(--primary)] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para o blog
      </Link>
    </div>
  )
}
