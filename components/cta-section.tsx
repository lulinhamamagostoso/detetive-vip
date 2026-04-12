import { ShieldCheck, Star } from "lucide-react"

export function CTASection() {
  return (
    <section
      id="contratar"
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8"
      style={{ background: "var(--background-secondary)" }}
      aria-labelledby="cta-heading"
    >
      <div className="max-w-[560px] mx-auto text-center">
        <h2
          id="cta-heading"
          className="font-serif text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-3"
        >
          Não Deixe a Dúvida Te{" "}
          <em className="italic" style={{ color: "var(--primary)" }}>Consumir</em>
        </h2>
        <p
          className="text-sm md:text-base leading-relaxed mb-6 md:mb-8"
          style={{ color: "var(--muted-foreground)" }}
        >
          A verdade está a poucos cliques de distância. Nossa equipe está online agora.
        </p>

        {/* Mini testimonial */}
        <div
          className="inline-block p-4 md:p-5 rounded-xl mb-6 md:mb-8 text-left max-w-md"
          style={{
            background: "var(--background-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex gap-0.5 mb-2" style={{ color: "var(--primary)" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} fill="currentColor" aria-hidden="true" />
            ))}
          </div>
          <p
            className="text-[0.8rem] leading-relaxed italic mb-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            &ldquo;Resolvi meu caso em menos de 10 minutos. Informações precisas que nem a polícia tinha conseguido levantar. Valeu cada centavo.&rdquo;
          </p>
          <span className="text-[0.7rem] font-semibold" style={{ color: "var(--muted)" }}>
            — Roberto S., advogado
          </span>
        </div>

        {/* Guarantee reminder */}
        <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
          <ShieldCheck size={16} style={{ color: "var(--success)" }} aria-hidden="true" />
          <span className="text-[0.75rem] font-medium" style={{ color: "var(--muted-foreground)" }}>
            Garantia de resultado ou dinheiro de volta
          </span>
        </div>

        {/* CTA */}
        <a
          href="#planos"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-[0.9rem] uppercase tracking-wider text-white transition-all active:scale-[0.98]"
          style={{
            background: "var(--whatsapp)",
            boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
          }}
          aria-label="Ver planos de investigação"
        >
          Iniciar Minha Investigação
        </a>

        <p className="text-[0.68rem] mt-3" style={{ color: "var(--muted)" }}>
          A partir de R$40 · Resultado em 5min · 100% sigiloso
        </p>
      </div>
    </section>
  )
}
