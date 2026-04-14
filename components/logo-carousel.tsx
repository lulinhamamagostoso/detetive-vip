import Image from "next/image"

const logos = [
  {
    name: "Receita Federal",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/receita-federal-93MLnYVbrri9gPcMSlx1P5tzkt76kI.webp",
  },
  {
    name: "Polícia Federal",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/policia-federal-naYfRzaJqKQ695LI2m0VTwk6gFLg8b.webp",
  },
  {
    name: "Tribunal Superior Eleitoral",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tribunal-superior-eleitoral-5bvy6OviojhISMLNdiJLdlUFN5bQQf.webp",
  },
  {
    name: "Serasa Experian",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-serasa-experian-mini-u8Vls3UFnk1U3y6ANkRJiwnHnHPXvC.webp",
  },
  {
    name: "Google",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/google-aDQLxOGUaDobISj9UsmMmgPODRg9Q5.webp",
  },
  {
    name: "Microsoft",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/microsoft-D06vFj09PM4bCAjTa3PnL3MgaAZe3H.webp",
  },
  {
    name: "gov.br",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b5286c02a5cf70eb58a3ed0e59cbdbe3-iSzL6AWcVV4JZDD0iwWZKgFxNWGpfy.webp",
  },
  {
    name: "Trello",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trello-xQfhYJqRdvMbhJDOaoeGvupSoBi0uM.webp",
  },
]

export function LogoCarousel() {
  return (
    <section
      className="relative z-[1] py-12 border-y overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.7)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex flex-col gap-8">
        {/* Título */}
        <h2
          className="text-[17px] font-normal leading-[1.4] text-center px-4"
          style={{ color: "var(--foreground)" }}
        >
          Integração direta com +50 fontes oficiais brasileiras
        </h2>

        {/* Carrossel */}
        <div className="relative w-full overflow-hidden">
          {/* Gradiente esquerdo */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(255,255,255,0.9), transparent)" }}
          />
          {/* Gradiente direito */}
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(255,255,255,0.9), transparent)" }}
          />

          <div
            className="flex items-center"
            style={{
              animation: "marquee 25s linear infinite",
              width: "fit-content",
            }}
          >
            {/* Primeiro set de logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${logo.name}-${index}`}
                className="flex-shrink-0 px-8"
              >
                <Image
                  src={logo.src}
                  alt={`Integração com ${logo.name}`}
                  width={427}
                  height={100}
                  className="h-10 md:h-12 w-auto object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Segundo set de logos (duplicado para loop contínuo) */}
            {logos.map((logo, index) => (
              <div
                key={`second-${logo.name}-${index}`}
                className="flex-shrink-0 px-8"
              >
                <Image
                  src={logo.src}
                  alt={`Integração com ${logo.name}`}
                  width={427}
                  height={100}
                  className="h-10 md:h-12 w-auto object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
