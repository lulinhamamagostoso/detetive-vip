const useCases = [
  {
    icon: (
      // Golpe PIX — filled lightning bolt
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13 2L5 13h5.5L9 22l10-12h-5.5L15 2z" opacity="0.2" />
        <path d="M13 2L5 13h5.5L9 22l10-12h-5.5z" />
      </svg>
    ),
    text: "Fui vítima de golpe no PIX",
  },
  {
    icon: (
      // Infidelidade — eye with filled pupil (suspicion/surveillance)
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 5C5.6 5 2 12 2 12s3.6 7 10 7 10-7 10-7-3.6-7-10-7z" opacity="0.15" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
    text: "Suspeito de infidelidade do meu parceiro(a)",
  },
  {
    icon: (
      // Devedor — concentric target (tracking down)
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="10" opacity="0.1" />
        <circle cx="12" cy="12" r="6.5" opacity="0.2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    text: "Preciso localizar um devedor que desapareceu",
  },
  {
    icon: (
      // Negócio — shield with checkmark (verification)
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l8 4v6c0 5.5-3.5 10.5-8 12.5-4.5-2-8-7-8-12.5V6l8-4z" opacity="0.15" />
        <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Quero verificar alguém antes de fechar negócio",
  },
  {
    icon: (
      // Ameaças — warning triangle with exclamation
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2L1.5 21h21L12 2z" opacity="0.15" />
        <path d="M12 9v4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1.2" />
      </svg>
    ),
    text: "Recebi ameaças de um número desconhecido",
  },
  {
    icon: (
      // Parente — two people (one faded = lost)
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="8" cy="7" r="3" opacity="0.25" />
        <path d="M2 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" opacity="0.25" />
        <circle cx="16" cy="7" r="3" />
        <path d="M16 14h2a4 4 0 014 4v3" />
      </svg>
    ),
    text: "Quero encontrar um parente ou pessoa perdida",
  },
  {
    icon: (
      // Advogado — scales of justice
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="11" y="3" width="2" height="16" rx="1" />
        <rect x="5" y="20" width="14" height="2" rx="1" opacity="0.25" />
        <rect x="4" y="7" width="16" height="2" rx="1" />
        <path d="M4 9l2 6h4L12 9" opacity="0.25" />
        <path d="M12 9l2 6h4l2-6" opacity="0.25" />
      </svg>
    ),
    text: "Sou advogado e preciso localizar uma parte processual",
  },
  {
    icon: (
      // Empresa — building with windows
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="4" y="3" width="16" height="19" rx="1.5" opacity="0.15" />
        <rect x="7" y="6" width="3" height="3" rx="0.5" />
        <rect x="14" y="6" width="3" height="3" rx="0.5" />
        <rect x="7" y="12" width="3" height="3" rx="0.5" />
        <rect x="14" y="12" width="3" height="3" rx="0.5" />
        <rect x="10" y="18" width="4" height="4" rx="0.5" opacity="0.4" />
      </svg>
    ),
    text: "Quero saber se uma empresa é confi��vel antes de comprar",
  },
  {
    icon: (
      // Veículo — car silhouette with wheels
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5 15h14v-3l-2.5-5h-9L5 12v3z" opacity="0.15" />
        <path d="M7.5 7h9l2.5 5v4H5v-4l2.5-5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="7.5" cy="16" r="2" />
        <circle cx="16.5" cy="16" r="2" />
      </svg>
    ),
    text: "Preciso descobrir o dono de um veículo",
  },
  {
    icon: (
      // Online — monitor with person silhouette
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="3" y="3" width="18" height="13" rx="2" opacity="0.15" />
        <rect x="3" y="3" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="9" r="2" />
        <path d="M8.5 14.5a4 4 0 017 0" />
        <path d="M9 19h6M12 16v3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    text: "Conheci alguém online e quero confirmar a identidade",
  },
  {
    icon: (
      // Vendedor sumiu — package/box 3D
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3l9 5v8l-9 5-9-5V8l9-5z" opacity="0.15" />
        <path d="M12 3l9 5-9 5-9-5 9-5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 13v8M3 8l9 5 9-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 17.5l2-1.5 2 1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
    text: "Comprei algo online e o vendedor sumiu",
  },
  {
    icon: (
      // BO — document with official seal
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6 2h8l6 6v14H6V2z" opacity="0.15" />
        <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 2h8l6 6v14H6V2z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="15" r="3" opacity="0.3" />
        <path d="M10.5 15l1 1 2-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Preciso de informações para um Boletim de Ocorrência",
  },
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
            <em className="italic" style={{ color: "var(--primary)" }}>Situação</em>?
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
          {useCases.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 p-3.5 md:p-4 rounded-lg md:rounded-xl transition-colors"
              style={{
                background: "var(--background-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(184, 150, 63, 0.08)", color: "var(--primary)" }}
              >
                {item.icon}
              </div>
              <span
                className="text-[0.8rem] md:text-[0.85rem] leading-snug font-medium"
                style={{ color: "var(--foreground)" }}
              >
                {item.text}
              </span>
            </div>
          ))}
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
            Iniciar Minha Investigação
          </a>
          <p className="text-[0.7rem] mt-2" style={{ color: "var(--muted)" }}>
            Resultado em até 5 minutos no seu WhatsApp
          </p>
        </div>
      </div>
    </section>
  )
}
