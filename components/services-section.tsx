import { Phone, Car, Building2, User, Mail, CreditCard, ArrowRight } from "lucide-react"

const services = [
  {
    icon: User,
    emoji: "👤",
    title: "Nome / CPF",
    description: "Ficha completa: dados pessoais, endereços, vínculos familiares, relacionamentos e mais.",
  },
  {
    icon: Phone,
    emoji: "📱",
    title: "Telefone",
    description: "Localize o dono do número, endereço atual, histórico de uso e ficha completa.",
  },
  {
    icon: Mail,
    emoji: "📧",
    title: "E-mail",
    description: "Descubra a quem pertence o e-mail e redes sociais vinculadas.",
  },
  {
    icon: Car,
    emoji: "🚗",
    title: "Placa de Veículo",
    description: "Proprietário, histórico, multas, financiamento e situação do veículo.",
  },
  {
    icon: CreditCard,
    emoji: "🔍",
    title: "Chave PIX",
    description: "Identifique golpistas pela chave PIX. Descubra dados completos do dono.",
  },
  {
    icon: Building2,
    emoji: "🏢",
    title: "CNPJ / Empresa",
    description: "Sócios, faturamento estimado, situação cadastral e débitos.",
  },
]

export function ServicesSection() {
  return (
    <section
      id="servicos"
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8"
      style={{ background: "var(--background)" }}
      aria-labelledby="servicos-heading"
    >
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-14">
          <div
            className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Investigações
          </div>
          <h2 id="servicos-heading" className="font-serif text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-2">
            O Que Você Vai{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Descobrir</em>
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-lg" style={{ color: "var(--muted-foreground)" }}>
            Através de uma única informação, seja nome / CPF, telefone, e-mail, placa, chave PIX ou CNPJ.
          </p>
        </div>

        {/* Services Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" role="list">
          {services.map((service) => (
            <article
              key={service.title}
              className="relative p-4 md:p-6 rounded-lg md:rounded-xl"
              style={{
                background: "var(--background-card)",
                border: "1px solid var(--border)"
              }}
              role="listitem"
            >
              {/* Icon */}
              <div
                className="w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center text-lg md:text-xl mb-2 md:mb-4"
                style={{
                  background: "rgba(184, 150, 63, 0.1)",
                  border: "1px solid rgba(184, 150, 63, 0.15)"
                }}
                aria-hidden="true"
              >
                {service.emoji}
              </div>

              <h3 className="text-sm md:text-[1.05rem] font-bold mb-1 md:mb-2" style={{ color: "var(--foreground)" }}>
                {service.title}
              </h3>
              <p className="text-[0.7rem] md:text-[0.82rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {service.description}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-12">
          <a
            href="#planos"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: "var(--primary)" }}
          >
            Ver Planos e Preços
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
