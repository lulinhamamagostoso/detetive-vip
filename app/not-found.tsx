import Link from "next/link"

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--background)" }}
    >
      <div className="text-center max-w-md">
        <div
          className="text-7xl font-bold font-serif mb-4"
          style={{ color: "var(--primary)" }}
        >
          404
        </div>
        <h1
          className="text-xl font-bold mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Página não encontrada
        </h1>
        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wide transition-all active:scale-[0.98]"
          style={{
            background: "var(--primary)",
            boxShadow: "0 4px 14px rgba(184, 150, 63, 0.3)",
          }}
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  )
}
