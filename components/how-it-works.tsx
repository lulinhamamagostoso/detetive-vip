import { ChevronDown, MousePointerClick, MessageSquare, Target, CreditCard, Send } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Escolha a Investigacao",
    description: "Escolha a modalidade da investigacao que melhor atende sua necessidade.",
    icon: MousePointerClick,
  },
  {
    number: 2,
    title: "Informe seu WhatsApp",
    description: "Digite seu nome e o numero do WhatsApp onde voce quer receber o resultado.",
    icon: MessageSquare,
  },
  {
    number: 3,
    title: "Informe o Alvo",
    description: "Forneca qualquer dado que tenha: Nome, CPF, Telefone, Placa, E-mail ou Chave PIX.",
    icon: Target,
  },
  {
    number: 4,
    title: "Pagamento via PIX",
    description: "Realize o pagamento de forma segura e instantanea via PIX.",
    icon: CreditCard,
  },
  {
    number: 5,
    title: "Receba no WhatsApp",
    description: "Em ate 1 hora apos a confirmacao, voce recebe a ficha completa no seu WhatsApp.",
    icon: Send,
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative z-[1] py-16 md:py-24 px-4 md:px-8"
      style={{ background: "var(--background-secondary)" }}
      aria-labelledby="como-funciona-heading"
    >
      <div className="max-w-[720px] mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center">
          <div
            className="inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-6 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Metodo
            <span className="w-6 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2 
            id="como-funciona-heading" 
            className="font-serif text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-3"
          >
            Simples, Rapido e{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Sigiloso</em>
          </h2>
          <p 
            className="text-sm md:text-base leading-relaxed" 
            style={{ color: "var(--muted-foreground)" }}
          >
            5 passos para receber tudo no seu WhatsApp
          </p>
        </div>

        {/* Steps Accordion */}
        <div className="flex flex-col gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <details
                key={step.number}
                className="group rounded-xl overflow-hidden transition-shadow"
                style={{
                  background: "var(--background-card)",
                  border: "1px solid var(--border)",
                }}
                open={index === 0}
              >
                <summary
                  className="faq-summary w-full flex items-center gap-4 p-4 md:p-5 text-left cursor-pointer list-none"
                >
                  {/* Step Number */}
                  <div
                    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl font-bold text-sm transition-colors"
                    style={{ 
                      background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                      color: "white",
                      boxShadow: "0 2px 8px rgba(201, 162, 39, 0.25)"
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  
                  {/* Title with Icon */}
                  <div className="flex-1 flex items-center gap-2.5">
                    <Icon 
                      size={18} 
                      className="hidden md:block" 
                      style={{ color: "var(--muted)" }} 
                      aria-hidden="true"
                    />
                    <h3 className="text-base md:text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* Chevron */}
                  <ChevronDown
                    size={20}
                    className="faq-chevron shrink-0 transition-transform duration-300"
                    style={{ color: "var(--primary)" }}
                    aria-hidden="true"
                  />
                </summary>
                
                {/* Description */}
                <div className="px-4 pb-4 md:px-5 md:pb-5 pl-[72px] md:pl-[76px]">
                  <p
                    className="text-[0.85rem] md:text-sm leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </details>
            )
          })}
        </div>
        
        {/* Bottom CTA hint */}
        <div className="text-center mt-10">
          <a 
            href="#planos"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: "var(--primary)" }}
          >
            <span>Iniciar minha investigacao</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
