import { Star, CheckCircle2 } from "lucide-react"

const testimonials = [
  {
    name: "Carlos M.",
    rating: 5,
    text: "Precisava descobrir informações sobre um fornecedor novo e em menos de 20 minutos já tinha tudo. Relatório super completo, valeu cada centavo.",
    verified: true,
    avatar: "radial-gradient(circle at 50% 30%, #c9a87c 0%, #a8876a 35%, #6b5b4f 65%, #3d4a5c 100%)",
  },
  {
    name: "Amanda R.",
    rating: 5,
    text: "Fui vítima de um golpe PIX e consegui todos os dados do golpista. Já encaminhei pra polícia. Serviço essencial.",
    verified: true,
    avatar: "radial-gradient(circle at 50% 28%, #e0b898 0%, #d4a080 35%, #7a5a4a 65%, #4a3a5a 100%)",
  },
  {
    name: "Roberto S.",
    rating: 5,
    text: "Advogado aqui. Uso o Detetive VIP pra localizar devedores dos meus clientes. Nunca me deixou na mão. Recomendo.",
    verified: true,
    avatar: "radial-gradient(circle at 50% 32%, #c0a080 0%, #a89070 35%, #5a5048 65%, #3a4a58 100%)",
  },
  {
    name: "Fernanda L.",
    rating: 5,
    text: "Desconfiava do meu namorado e infelizmente confirmei. Detetive VIP foi discreto e profissional do início ao fim.",
    verified: true,
    avatar: "radial-gradient(circle at 50% 28%, #ddb090 0%, #c89878 35%, #6a4a40 65%, #4a4a60 100%)",
  },
]

const satisfactionRates = [
  { label: "Dados Corretos", value: 98 },
  { label: "Entrega no Prazo", value: 95 },
  { label: "Recomendariam", value: 97 },
  { label: "Repetiram Compra", value: 89 },
]

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8"
      style={{ background: "var(--background)" }}
      aria-labelledby="depoimentos-heading"
    >
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-14">
          <div
            className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Provas Sociais
          </div>
          <h2 id="depoimentos-heading" className="font-serif text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-2">
            O Que Nossos Clientes{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Dizem</em>
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-lg" style={{ color: "var(--muted-foreground)" }}>
            Milhares de investigações realizadas com sucesso.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-3 md:grid-cols-2 md:gap-4 mb-8 md:mb-14">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-4 md:p-6 rounded-lg md:rounded-xl"
              style={{ 
                background: "var(--background-card)",
                border: "1px solid var(--border)"
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-2" style={{ color: "var(--primary)" }} aria-label={`${testimonial.rating} de 5 estrelas`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" aria-hidden="true" />
                ))}
              </div>

              {/* Text */}
              <p 
                className="text-[0.8rem] md:text-[0.9rem] leading-relaxed mb-3 italic"
                style={{ color: "var(--muted-foreground)" }}
              >
                {'"'}{testimonial.text}{'"'}
              </p>

              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0">
                  <div
                    className="absolute inset-[-4px]"
                    style={{
                      background: testimonial.avatar,
                      filter: "blur(3px)",
                    }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="font-semibold text-[0.8rem]" style={{ color: "var(--foreground)" }}>
                    {testimonial.name}
                  </div>
                  {testimonial.verified && (
                    <div
                      className="flex items-center gap-1 text-[0.65rem]"
                      style={{ color: "var(--success)" }}
                    >
                      <CheckCircle2 size={10} aria-hidden="true" />
                      Verificado
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Satisfaction Rates - Simplified for mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {satisfactionRates.map((rate) => (
            <div
              key={rate.label}
              className="text-center p-3 md:p-4 rounded-lg"
              style={{ 
                background: "var(--background-card)",
                border: "1px solid var(--border)"
              }}
            >
              <div 
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "var(--primary)" }}
              >
                {rate.value}%
              </div>
              <div 
                className="text-[0.65rem] md:text-[0.75rem] font-medium"
                style={{ color: "var(--muted)" }}
              >
                {rate.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
