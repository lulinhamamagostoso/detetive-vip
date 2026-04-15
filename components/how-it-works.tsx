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
      className="relative z-[1] py-12 md:py-24 px-4 md:px-8"
      style={{ background: "var(--background-secondary)" }}
      aria-labelledby="como-funciona-heading"
    >
      <div className="max-w-[720px] mx-auto">
        {/* Header - Mobile optimized */}
        <div className="mb-8 md:mb-14 text-center">
          <div
            className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] mb-2 md:mb-3"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-4 md:w-6 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Metodo
            <span className="w-4 md:w-6 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2 
            id="como-funciona-heading" 
            className="font-serif text-[24px] md:text-5xl font-bold leading-[1.1] tracking-tight mb-2 md:mb-3 text-balance"
          >
            Simples, Rapido e{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Sigiloso</em>
          </h2>
          <p 
            className="text-[13px] md:text-base leading-relaxed" 
            style={{ color: "var(--muted-foreground)" }}
          >
            5 passos para receber no WhatsApp
          </p>
        </div>

        {/* Steps Accordion - Mobile optimized touch targets */}
        <div className="flex flex-col gap-2 md:gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <details
                key={step.number}
                className="group rounded-xl overflow-hidden"
                style={{
                  background: "var(--background-card)",
                  border: "1px solid var(--border)",
                }}
                open={index === 0}
              >
                <summary
                  className="faq-summary w-full flex items-center gap-3 md:gap-4 p-3.5 md:p-5 text-left cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--primary)] min-h-[56px]"
                >
                  {/* Step Number */}
                  <div
                    className="w-9 h-9 md:w-10 md:h-10 shrink-0 flex items-center justify-center rounded-lg md:rounded-xl font-bold text-[13px] md:text-sm"
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
                  <div className="flex-1 flex items-center gap-2">
                    <Icon 
                      size={16} 
                      className="hidden md:block" 
                      style={{ color: "var(--muted)" }} 
                      aria-hidden="true"
                    />
                    <h3 className="text-[14px] md:text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* Chevron */}
                  <ChevronDown
                    size={18}
                    className="faq-chevron shrink-0 transition-transform duration-300"
                    style={{ color: "var(--primary)" }}
                    aria-hidden="true"
                  />
                </summary>
                
                {/* Description */}
                <div className="px-3.5 pb-3.5 md:px-5 md:pb-5 pl-[60px] md:pl-[76px]">
                  <p
                    className="text-[13px] md:text-sm leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </details>
            )
          })}
        </div>
        
        {/* Bottom CTA hint - Mobile: larger touch target */}
        <div className="text-center mt-8 md:mt-10">
          <a 
            href="#planos"
            className="inline-flex items-center gap-2 text-[13px] md:text-sm font-semibold py-2 px-4 -mx-4 rounded-lg transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px]"
            style={{ color: "var(--primary)" }}
          >
            <span>Iniciar minha investigacao</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
