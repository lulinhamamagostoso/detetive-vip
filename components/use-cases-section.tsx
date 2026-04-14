import Link from "next/link"
import {
  Banknote,
  HeartCrack,
  MapPinned,
  Handshake,
  ShieldAlert,
  Search,
  Gavel,
  Building2,
  Car,
  UserSearch,
  PackageX,
  FileWarning,
  ChevronRight,
} from "lucide-react"

const useCases = [
  { icon: Banknote, text: "Fui v\u00EDtima de golpe no PIX", slug: "fui-vitima-de-golpe-no-pix" },
  { icon: HeartCrack, text: "Suspeito de infidelidade do meu parceiro(a)", slug: "suspeito-de-infidelidade" },
  { icon: MapPinned, text: "Preciso localizar um devedor que desapareceu", slug: "localizar-devedor" },
  { icon: Handshake, text: "Quero verificar algu\u00E9m antes de fechar neg\u00F3cio", slug: "verificar-pessoa-antes-de-negocio" },
  { icon: ShieldAlert, text: "Recebi amea\u00E7as de um n\u00FAmero desconhecido", slug: "ameacas-numero-desconhecido" },
  { icon: Search, text: "Quero encontrar um parente ou pessoa perdida", slug: "encontrar-parente-perdido" },
  { icon: Gavel, text: "Sou advogado e preciso localizar uma parte processual", slug: "localizar-parte-processual" },
  { icon: Building2, text: "Quero saber se uma empresa \u00E9 confi\u00E1vel antes de comprar", slug: "verificar-empresa" },
  { icon: Car, text: "Preciso descobrir o dono de um ve\u00EDculo", slug: "descobrir-dono-veiculo" },
  { icon: UserSearch, text: "Conheci algu\u00E9m online e quero confirmar a identidade", slug: "confirmar-identidade-online" },
  { icon: PackageX, text: "Comprei algo online e o vendedor sumiu", slug: "vendedor-sumiu" },
  { icon: FileWarning, text: "Preciso de informa\u00E7\u00F5es para um Boletim de Ocorr\u00EAncia", slug: "informacoes-boletim-ocorrencia" },
]

export function UseCasesSection() {
  return (
    <section
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8"
      style={{ background: "var(--background-secondary)" }}
      aria-labelledby="para-quem-heading"
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div
            className="flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Para Quem
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2
            id="para-quem-heading"
            className="font-serif text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-2"
          >
            Se Identificou com Alguma{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>{"Situa\u00E7\u00E3o"}</em>?
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed max-w-lg mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            Milhares de brasileiros passam por isso todos os dias. O Detetive VIP resolve.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3">
          {useCases.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.slug}
                className="flex flex-col p-3.5 md:p-4 rounded-lg md:rounded-xl transition-colors"
                style={{
                  background: "var(--background-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0, 0, 0, 0.05)", color: "#1a1a1f" }}
                  >
                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <span
                    className="text-[0.8rem] md:text-[0.85rem] leading-snug font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.text}
                  </span>
                </div>
                <Link
                  href={`/casos/${item.slug}`}
                  className="flex items-center gap-1 mt-2.5 ml-12 text-[0.72rem] font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "var(--primary)" }}
                >
                  Saber mais
                  <ChevronRight size={13} />
                </Link>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-10">
          <a
            href="#planos"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-7 md:py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all active:scale-[0.98]"
            style={{
              background: "var(--whatsapp)",
              boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)",
            }}
          >
            {"Iniciar Minha Investiga\u00E7\u00E3o"}
          </a>
          <p className="text-[0.7rem] mt-2" style={{ color: "var(--muted)" }}>
            {"Resultado em at\u00E9 5 minutos no seu WhatsApp"}
          </p>
        </div>
      </div>
    </section>
  )
}
