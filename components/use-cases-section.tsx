import {
  Banknote,
  HeartCrack,
  MapPinned,
  ShieldAlert,
  UserSearch,
  PackageX,
} from "lucide-react"

// 6 casos mais comuns e que mais convertem — reduzido para evitar paralisia de decisao
const useCases = [
  { 
    icon: Banknote, 
    text: "Fui v\u00EDtima de golpe no PIX",
    subtext: "Descubra quem \u00E9 o golpista"
  },
  { 
    icon: HeartCrack, 
    text: "Suspeito de trai\u00E7\u00E3o",
    subtext: "Saiba a verdade sobre seu parceiro(a)"
  },
  { 
    icon: MapPinned, 
    text: "Preciso localizar um devedor",
    subtext: "Encontre quem te deve dinheiro"
  },
  { 
    icon: ShieldAlert, 
    text: "Recebi amea\u00E7as de n\u00FAmero desconhecido",
    subtext: "Descubra quem est\u00E1 te amea\u00E7ando"
  },
  { 
    icon: UserSearch, 
    text: "Conheci algu\u00E9m online",
    subtext: "Confirme se a pessoa \u00E9 quem diz ser"
  },
  { 
    icon: PackageX, 
    text: "Comprei online e o vendedor sumiu",
    subtext: "Encontre o vendedor e recupere seu dinheiro"
  },
]

export function UseCasesSection() {
  return (
    <section
      className="relative z-[1] py-10 md:py-20 px-4 md:px-8"
      style={{ background: "var(--background)" }}
      aria-labelledby="para-quem-heading"
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-6 md:mb-12">
          <div
            className="flex items-center justify-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] mb-1.5 md:mb-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-3 md:w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Para Quem
            <span className="w-3 md:w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2
            id="para-quem-heading"
            className="font-serif text-[22px] md:text-4xl font-bold leading-tight tracking-tight mb-1.5 md:mb-2 text-balance"
          >
            Se Identificou com Alguma{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>{"Situa\u00E7\u00E3o"}</em>?
          </h2>
          <p
            className="text-[13px] md:text-base leading-relaxed max-w-lg mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            Milhares de brasileiros passam por isso. O Detetive VIP resolve.
          </p>
        </div>

        {/* Grid - Mobile: 2 cols, larger touch targets */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {useCases.map((item, index) => {
            const Icon = item.icon
            return (
              <a
                key={index}
                href="#planos"
                className="flex flex-col p-3 md:p-4 rounded-xl transition-all active:scale-[0.98] cursor-pointer min-h-[100px] touch-manipulation"
                style={{
                  background: "var(--background-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center mb-2"
                  style={{ background: "rgba(184, 150, 63, 0.1)", color: "var(--primary)" }}
                >
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </div>
                <span
                  className="text-[12px] md:text-[14px] leading-snug font-semibold mb-0.5"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.text}
                </span>
                <span
                  className="text-[11px] md:text-[12px] leading-snug"
                  style={{ color: "var(--muted)" }}
                >
                  {item.subtext}
                </span>
              </a>
            )
          })}
        </div>

        {/* CTA - Mobile: larger touch target */}
        <div className="text-center mt-6 md:mt-10">
          <a
            href="#planos"
            className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-4 md:px-7 md:py-3.5 rounded-2xl md:rounded-xl font-bold text-[14px] md:text-sm uppercase tracking-wider text-white transition-all active:scale-[0.98] touch-manipulation min-h-[52px]"
            style={{
              background: "var(--whatsapp)",
              boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)",
            }}
          >
            {"Iniciar Minha Investiga\u00E7\u00E3o"}
          </a>
          <p className="text-[11px] md:text-[12px] mt-2" style={{ color: "var(--muted)" }}>
            {"Resultado em até 1 hora no seu WhatsApp"}
          </p>
        </div>
      </div>
    </section>
  )
}
