import { AlertTriangle, X, Check, ShieldCheck, Users, FileText, Lock, Scale, Timer } from "lucide-react"

const fakeItems = [
  "Dados copiados de bases públicas desatualizadas",
  "Informações genéricas que qualquer um acha no Google",
  "Endereços e telefones de 3, 5, até 10 anos atrás",
  "Zero verificação: te entregam o que o robô cuspir",
  "Nenhum analista humano olha pro seu caso",
  "Sem sigilo: seus dados ficam expostos no sistema deles",
  "Cobram barato porque não fazem nada de verdade",
]

const realItems = [
  { text: "Detetives reais analisam cada caso individualmente", bold: "Detetives reais" },
  { text: "Cruzamento inteligente de múltiplas fontes verificadas" },
  { text: "Dados atualizados e confirmados em tempo real", bold: "confirmados em tempo real" },
  { text: "Relatório PDF consolidado com análise profissional" },
  { text: "Investigador dedicado ao seu caso do início ao fim" },
  { text: "Sigilo absoluto com criptografia ponta a ponta" },
  { text: "Regulamentado pela Lei 13.432/17, 100% legal", bold: "Lei 13.432/17" },
]

const evidenceBadges = [
  { icon: Users, label: "Equipe humana dedicada" },
  { icon: FileText, label: "Relatório verificado" },
  { icon: Lock, label: "Sigilo total" },
  { icon: Scale, label: "Lei 13.432/17" },
  { icon: Timer, label: "Entrega em minutos" },
]

export function ComparisonSection() {
  return (
    <section className="relative z-[1] py-12 md:py-20 px-4 md:px-8 overflow-hidden" aria-labelledby="comparison-heading">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{ 
          background: "linear-gradient(180deg, var(--background) 0%, #f5f3ed 15%, #f0ece2 50%, #f5f3ed 85%, var(--background) 100%)"
        }}
      />
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(184, 150, 63, 0.06), transparent)"
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        {/* Warning Badge */}
        <div 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.65rem] md:text-[0.72rem] font-bold uppercase tracking-wider mb-4 md:mb-6"
          style={{ 
            background: "rgba(220, 38, 38, 0.06)",
            border: "1px solid rgba(220, 38, 38, 0.12)",
            color: "var(--destructive)"
          }}
        >
          <AlertTriangle size={14} />
          Atenção antes de contratar
        </div>

        {/* Title */}
        <h2 id="comparison-heading" className="font-serif text-2xl md:text-4xl font-extrabold leading-tight tracking-tight mb-2 md:mb-3">
          <span style={{ color: "var(--destructive)", textDecoration: "line-through", opacity: 0.7 }}>
            Consulta de Dados
          </span>{" "}
          não é{" "}
          <em className="italic" style={{ color: "var(--primary)" }}>Investigação</em>.
        </h2>

        <p className="text-sm md:text-base leading-relaxed max-w-[700px] mb-8 md:mb-12" style={{ color: "var(--muted-foreground)" }}>
          A internet está cheia de sites que cobram R$5 pra {'"'}puxar dados{'"'} e te entregam{" "}
          <strong style={{ color: "var(--foreground)" }}>informações erradas ou inventadas</strong>. 
          Nós{" "}
          <strong style={{ color: "var(--foreground)" }}>investigamos de verdade</strong>.
        </p>

        {/* Comparison Grid */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 mb-8 md:mb-12">
          {/* Fake Column */}
          <div 
            className="rounded-xl md:rounded-2xl p-5 md:p-7 relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, rgba(220, 38, 38, 0.03), rgba(220, 38, 38, 0.01))",
              border: "1px solid rgba(220, 38, 38, 0.12)"
            }}
          >
            {/* Top line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--destructive)" }}
              aria-hidden="true"
            />

            {/* Header */}
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div
                className="w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center text-lg"
                style={{
                  background: "rgba(220, 38, 38, 0.08)",
                  border: "1px solid rgba(220, 38, 38, 0.12)"
                }}
                aria-hidden="true"
              >
                🚫
              </div>
              <span className="font-bold text-base md:text-lg" style={{ color: "var(--destructive)" }}>
                Sites de {'"'}Consulta{'"'}
              </span>
            </div>

            {/* List */}
            <ul className="space-y-2 md:space-y-3">
              {fakeItems.map((item) => (
                <li 
                  key={item}
                  className="flex items-start gap-2 text-[0.8rem] md:text-[0.88rem] leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <X size={14} className="mt-0.5 shrink-0" style={{ color: "var(--destructive)" }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Real Column */}
          <div 
            className="rounded-xl md:rounded-2xl p-5 md:p-7 relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, rgba(184, 150, 63, 0.05), rgba(184, 150, 63, 0.02))",
              border: "1px solid rgba(184, 150, 63, 0.18)"
            }}
          >
            {/* Top line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--primary)" }}
              aria-hidden="true"
            />

            {/* Header */}
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div
                className="w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center text-lg"
                style={{
                  background: "rgba(184, 150, 63, 0.1)",
                  border: "1px solid rgba(184, 150, 63, 0.15)"
                }}
                aria-hidden="true"
              >
                🛡️
              </div>
              <span className="font-bold text-base md:text-lg" style={{ color: "var(--primary)" }}>
                Detetive VIP
              </span>
            </div>

            {/* List */}
            <ul className="space-y-2 md:space-y-3">
              {realItems.map((item) => (
                <li 
                  key={item.text}
                  className="flex items-start gap-2 text-[0.8rem] md:text-[0.88rem] leading-relaxed"
                  style={{ color: "var(--foreground)" }}
                >
                  <Check size={14} className="mt-0.5 shrink-0" style={{ color: "var(--primary)" }} aria-hidden="true" />
                  {item.bold ? (
                    <span>
                      {item.text.split(item.bold)[0]}
                      <strong>{item.bold}</strong>
                      {item.text.split(item.bold)[1]}
                    </span>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Statement */}
        <div 
          className="text-center p-6 md:p-10 rounded-xl md:rounded-2xl relative overflow-hidden"
          style={{ 
            background: "linear-gradient(135deg, rgba(184, 150, 63, 0.04), rgba(184, 150, 63, 0.01))",
            border: "1px solid rgba(184, 150, 63, 0.12)"
          }}
        >
          <span className="text-4xl mb-2 block" aria-hidden="true">🔍</span>
          
          <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight mb-2">
            Aqui,{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>gente de verdade</em>{" "}
            investiga o seu caso.
          </h3>
          
          <p className="text-[0.8rem] md:text-[0.9rem] leading-relaxed max-w-[500px] mx-auto" style={{ color: "var(--muted-foreground)" }}>
            Nossa equipe de{" "}
            <strong style={{ color: "var(--primary)" }}>investigadores profissionais</strong>{" "}
            cruza dados, valida fontes e monta um dossiê com confiança.
          </p>

          {/* Evidence badges - hidden on mobile for cleaner UI */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 mt-4">
            {evidenceBadges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold"
                style={{
                  background: "rgba(184, 150, 63, 0.08)",
                  border: "1px solid rgba(184, 150, 63, 0.12)",
                  color: "var(--primary)"
                }}
              >
                <badge.icon size={12} aria-hidden="true" />
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-10">
          <a
            href="#planos"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-7 md:py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all active:scale-[0.98]"
            style={{
              background: "var(--whatsapp)",
              boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)"
            }}
          >
            Quero Investigação de Verdade
          </a>
        </div>
      </div>
    </section>
  )
}
