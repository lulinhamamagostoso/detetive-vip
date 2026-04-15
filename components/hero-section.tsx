"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, Search, Eye, Shield } from "lucide-react"

const trustItems = [
  { label: "100% Sigiloso" },
  { label: "Entrega em 5min" },
  { label: "Dados Verificados" },
]

const tags = ["CPF", "Nome", "Telefone", "CNPJ", "Placa", "Chave PIX", "E-mail"]

const TYPED_PHRASES = [
  "pelo telefone",
  "pelo nome",
  "pela placa",
  "pela chave PIX",
  "pelo CPF",
  "pelo e-mail",
]

// Typewriter minimalista no mobile — entre Lottie e CTA.
// Zero deps externas, ~1KB. Container com min-height fixo → CLS = 0.
function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (text !== TYPED_PHRASES[0]) setText(TYPED_PHRASES[0])
      return
    }

    const current = TYPED_PHRASES[phraseIndex]

    if (!isDeleting && text === current) {
      const pause = setTimeout(() => setIsDeleting(true), 1800)
      return () => clearTimeout(pause)
    }

    if (isDeleting && text === "") {
      setIsDeleting(false)
      setPhraseIndex((i) => (i + 1) % TYPED_PHRASES.length)
      return
    }

    const delay = isDeleting ? 35 : 75
    const t = setTimeout(() => {
      setText(
        isDeleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1)
      )
    }, delay)

    return () => clearTimeout(t)
  }, [text, isDeleting, phraseIndex])

  return (
    <div className="md:hidden mb-4 mx-auto max-w-md text-center">
      <p
        className="text-[0.875rem] leading-snug min-h-[3rem]"
        style={{ color: "var(--foreground)" }}
      >
        Acabe hoje com suas dúvidas sobre qualquer pessoa, investigando apenas{" "}
        <span style={{ color: "var(--primary)", fontWeight: 600 }}>
          {text}
          <span className="typewriter-cursor" aria-hidden="true">
            |
          </span>
        </span>
      </p>
    </div>
  )
}

// Elemento visual otimizado para mobile — carrega instantaneamente.
// SVG inline com ícones Lucide + animação CSS leve. Zero fetch, zero JS extra.
function DetectiveVisual() {
  return (
    <div className="relative flex justify-center my-4 md:hidden">
      {/* Container com tamanho fixo para evitar CLS */}
      <div className="relative w-48 h-48">
        {/* Glow dourado sutil */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-40 h-40 rounded-full animate-pulse-slow"
            style={{
              background:
                "radial-gradient(circle, rgba(184, 150, 63, 0.15) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Círculo central com ícone principal */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center detective-badge"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
              boxShadow: "0 8px 32px rgba(184, 150, 63, 0.35)",
            }}
          >
            <Search className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Ícones orbitando — animação CSS pura */}
        <div className="absolute inset-0 detective-orbit" aria-hidden="true">
          {/* Olho - investigação */}
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "var(--background-card)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "2px solid var(--primary-glow-strong)",
            }}
          >
            <Eye className="w-5 h-5" style={{ color: "var(--primary)" }} />
          </div>

          {/* Escudo - sigilo */}
          <div
            className="absolute bottom-1 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "var(--background-card)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "2px solid var(--primary-glow-strong)",
            }}
          >
            <Shield className="w-5 h-5" style={{ color: "var(--primary)" }} />
          </div>

          {/* Chapéu de detetive — SVG inline minimalista */}
          <div
            className="absolute bottom-1 left-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "var(--background-card)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "2px solid var(--primary-glow-strong)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--primary)" }}
            >
              {/* Chapéu fedora estilizado */}
              <path d="M2 18h20" />
              <path d="M4 18c0-2 2-3 4-3h8c2 0 4 1 4 3" />
              <path d="M6 15c0-3 2-6 6-6s6 3 6 6" />
              <path d="M9 9c0-1.5 1.5-3 3-3s3 1.5 3 3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative z-[1] flex items-center pt-6 pb-10 md:pt-12 md:pb-20 px-4 md:px-8">
      <div className="max-w-[1300px] mx-auto w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-14 items-center">
        {/* Content */}
        <div className="relative text-center lg:text-left">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest mb-4 md:mb-7"
            style={{
              background: "rgba(184, 150, 63, 0.1)",
              border: "1px solid rgba(184, 150, 63, 0.2)",
              color: "var(--primary)"
            }}
          >
            <span className="relative w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />
            Encontre o que estão escondendo
          </div>

          {/* Title */}
          <h1 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-3 md:mb-5">
            Descubra a Verdade
            <br />
            Sobre{" "}
            <em
              className="italic"
              style={{ color: "var(--primary)" }}
            >
              Qualquer Pessoa
            </em>
          </h1>

          {/* Subtitle */}
          <p
            className="text-[0.9rem] md:text-lg leading-relaxed max-w-xl mb-4 md:mb-6 mx-auto lg:mx-0"
            style={{ color: "var(--muted-foreground)" }}
          >
            Você fornece um único nome, cpf, número de telefone, placa ou chave PIX e nós investigamos a fundo tudo sobre. Você recebe a ficha completa no seu WhatsApp em até{" "}
            <strong style={{ color: "var(--foreground)" }}>5 minutos</strong>.
          </p>

          {/* Visual Detetive — apenas mobile, carrega instantaneamente */}
          <DetectiveVisual />

          {/* Typewriter minimalista — apenas mobile */}
          <HeroTypewriter />

          {/* CTA Desktop — botão tradicional */}
          <div className="hidden md:flex flex-col items-center lg:items-start mb-4 md:mb-5">
            <button
              onClick={() => {
                const planosSection = document.getElementById("planos")
                if (planosSection) {
                  planosSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-7 md:py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all active:scale-[0.98] text-white"
              style={{
                background: "var(--whatsapp)",
                boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)"
              }}
            >
              <span>&#128269;</span> Iniciar Investigação
            </button>
          </div>

          {/* Indicador visual mobile — seta decorativa (não clicável) */}
          <div className="md:hidden flex justify-center mb-4" aria-hidden="true">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white"
              style={{
                background: "var(--whatsapp)",
                boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)"
              }}
            >
              <ChevronDown size={24} strokeWidth={2.5} />
            </div>
          </div>

          {/* Trust Items */}
          <div className="flex items-center gap-2 mb-3 md:mb-6 justify-center lg:justify-start text-[0.65rem] md:text-[0.78rem]" style={{ color: "var(--muted-foreground)" }}>
            {trustItems.map((item, index) => (
              <span key={item.label} className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-semibold">{item.label}</span>
                {index < trustItems.length - 1 && <span style={{ color: "var(--muted)" }}>|</span>}
              </span>
            ))}
          </div>

          {/* Scroll Hint — apenas mobile, CSS puro, zero JS */}
          <div className="md:hidden flex flex-col items-center gap-1 pt-2" aria-hidden="true">
            <span className="text-[0.6rem] uppercase tracking-[0.15em] font-semibold" style={{ color: "var(--muted)" }}>
              Role para continuar
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2.5}
              className="scroll-hint"
              style={{ color: "var(--primary)" }}
            />
          </div>

          {/* Tags */}
          <div className="hidden md:flex flex-wrap gap-1.5 md:gap-2 justify-center lg:justify-start">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[0.65rem] md:text-[0.7rem]"
                style={{
                  background: "rgba(184, 150, 63, 0.06)",
                  border: "1px solid rgba(184, 150, 63, 0.1)",
                  color: "var(--muted)"
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Visual - Hidden on mobile for performance */}
        <div className="relative hidden md:flex justify-center">
          {/* Mockup */}
          <Image
            src="/mockup.webp"
            alt="Detetive VIP - Investigação entregue via WhatsApp"
            width={728}
            height={1350}
            className="w-[320px] max-w-full rounded-2xl"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))"
            }}
            loading="eager"
            fetchPriority="high"
            quality={75}
            sizes="320px"
          />
        </div>
      </div>
    </section>
  )
}
