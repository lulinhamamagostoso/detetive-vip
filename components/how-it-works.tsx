import { ChevronDown } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Escolha a Investigação",
    description: "Escolha a modalidade da investigação (Básica ou Premium).",
  },
  {
    number: 2,
    title: "Nos diga para onde enviar",
    description: "Informe seu nome e o número do WhatsApp onde você quer receber a sua investigação.",
  },
  {
    number: 3,
    title: "Informe o Alvo",
    description: "Informe a partir de qual informação do seu alvo iremos fazer a investigação (Nome, CPF, Telefone, Placa ou Chave PIX).",
  },
  {
    number: 4,
    title: "Pagamento Seguro",
    description: "Realize o pagamento através do nosso ambiente de pagamento seguro via PIX.",
  },
  {
    number: 5,
    title: "Receba sua Investigação",
    description: "Logo após a confirmação do pagamento, em até 5 minutos, um de nossos detetives investigadores enviarão no seu WhatsApp informado o documento com a ficha completa da sua investigação.",
  },
]

// Server Component — zero JS. <details>/<summary> nativo controla abertura.
export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8 faq-section"
      style={{ background: "var(--background-secondary)" }}
      aria-labelledby="como-funciona-heading"
    >
      <div className="max-w-[700px] mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10 text-center">
          <div
            className="flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Método
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2 id="como-funciona-heading" className="font-serif text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-2">
            Simples, Rápido e{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Sigiloso</em>
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            Receba em poucos passos no WhatsApp.
          </p>
        </div>

        {/* Steps Accordion — primeiro item aberto por padrão */}
        <div className="flex flex-col gap-2">
          {steps.map((step, index) => (
            <details
              key={step.number}
              className="faq-item rounded-xl overflow-hidden"
              style={{
                background: "var(--background-card)",
                border: "1px solid var(--border)",
              }}
              open={index === 0}
            >
              <summary
                className="faq-summary w-full flex items-center gap-4 p-4 text-left min-h-[48px] cursor-pointer list-none"
              >
                <div
                  className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg font-bold text-sm gradient-gold"
                  style={{ color: "var(--background)" }}
                  aria-hidden="true"
                >
                  {step.number}
                </div>
                <h3
                  className="flex-1 text-base font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  {step.title}
                </h3>
                <ChevronDown
                  size={20}
                  className="faq-chevron shrink-0 transition-transform duration-300"
                  style={{ color: "var(--primary)" }}
                  aria-hidden="true"
                />
              </summary>
              <p
                className="px-4 pb-4 pl-[68px] text-[0.85rem] leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {step.description}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
