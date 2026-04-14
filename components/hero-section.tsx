"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const trustItems = [
  { label: "100% Sigiloso", icon: "lock" as const },
  { label: "Entrega em 5min", icon: "clock" as const },
  { label: "Dados Verificados", icon: "shield" as const },
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

// ============================================================
// KIT DE SVGs CUSTOM — identidade visual Detetive VIP
// ============================================================

// Ícone Hero — lupa grande com anéis de pulso + bits digitais.
// Pensado como o visual de ancoragem do mobile hero (~220px).
function HeroInvestigate({ size = 220 }: { size?: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto select-none"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="hero-lens-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-handle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--primary-dark)" />
          </linearGradient>
        </defs>

        {/* Anéis de pulso — CSS animados com delay staggered */}
        <circle
          cx="100"
          cy="100"
          r="55"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
          className="hero-pulse hero-pulse-1"
        />
        <circle
          cx="100"
          cy="100"
          r="55"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
          className="hero-pulse hero-pulse-2"
        />
        <circle
          cx="100"
          cy="100"
          r="55"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
          className="hero-pulse hero-pulse-3"
        />

        {/* Bits digitais flutuando — retângulos e círculos em posições pensadas */}
        <g>
          <rect x="24" y="32" width="5" height="5" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "0s" }} />
          <rect x="198" y="28" width="4" height="4" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "0.35s" }} />
          <rect x="216" y="72" width="6" height="6" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "0.7s" }} />
          <circle cx="14" cy="98" r="2.5" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "1.05s" }} />
          <circle cx="226" cy="150" r="3" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "1.4s" }} />
          <rect x="30" y="170" width="4" height="4" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "1.75s" }} />
          <circle cx="50" cy="58" r="2" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "2.1s" }} />
          <rect x="180" y="200" width="3" height="3" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "2.45s" }} />
        </g>

        {/* Conexões sutis (opcional — linhas finas entre alguns bits) */}
        <g stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.25">
          <line x1="29" y1="37" x2="52" y2="60" />
          <line x1="202" y1="32" x2="222" y2="75" />
          <line x1="228" y1="152" x2="183" y2="202" />
        </g>

        {/* Cabo da lupa (atrás da lente) */}
        <line
          x1="142"
          y1="142"
          x2="188"
          y2="188"
          stroke="url(#hero-handle-grad)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <line
          x1="144"
          y1="144"
          x2="186"
          y2="186"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Lente — preenchimento com gradient radial */}
        <circle cx="100" cy="100" r="55" fill="url(#hero-lens-grad)" />

        {/* Lente — aro externo */}
        <circle
          cx="100"
          cy="100"
          r="55"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="6"
        />

        {/* Lente — aro interno (profundidade) */}
        <circle
          cx="100"
          cy="100"
          r="48"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1"
          opacity="0.45"
        />

        {/* Scan lines dentro da lente */}
        <g opacity="0.4">
          <line x1="62" y1="88" x2="138" y2="88" stroke="var(--primary)" strokeWidth="0.8" />
          <line x1="58" y1="100" x2="142" y2="100" stroke="var(--primary)" strokeWidth="0.8" />
          <line x1="62" y1="112" x2="138" y2="112" stroke="var(--primary)" strokeWidth="0.8" />
        </g>

        {/* Scan line animada (vertical, varrendo) */}
        <rect
          x="45"
          y="100"
          width="110"
          height="1.5"
          fill="var(--primary)"
          opacity="0.6"
          className="hero-scan"
        />

        {/* Reflexo (highlight) no canto superior-esquerdo da lente */}
        <path
          d="M 72 78 Q 78 68 92 70"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

// Lupa custom compacta — usada dentro do typewriter card.
function IconLens({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        fill="var(--primary)"
        fillOpacity="0.18"
        stroke="var(--primary)"
        strokeWidth="2"
      />
      <line
        x1="15.3"
        y1="15.3"
        x2="20"
        y2="20"
        stroke="var(--primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="8.5" cy="8.5" r="1.2" fill="rgba(255,255,255,0.7)" />
    </svg>
  )
}

// Ícones para trust items — clock / lock / shield-check
function IconClock({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="var(--primary)" strokeWidth="2" fill="var(--primary)" fillOpacity="0.12" />
      <path d="M12 7v5l3 2" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconLock({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" fill="var(--primary)" fillOpacity="0.12" stroke="var(--primary)" strokeWidth="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.5" fill="var(--primary)" />
    </svg>
  )
}

function IconShieldCheck({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 4 5v7c0 4.5 3.2 8.5 8 10 4.8-1.5 8-5.5 8-10V5l-8-3z"
        fill="var(--primary)"
        fillOpacity="0.12"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TrustIcon({ name }: { name: "lock" | "clock" | "shield" }) {
  if (name === "lock") return <IconLock />
  if (name === "clock") return <IconClock />
  return <IconShieldCheck />
}

// ============================================================
// Typewriter card
// ============================================================

function TypewriterCard() {
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
    <div
      className="md:hidden relative my-4 mx-auto max-w-sm rounded-2xl px-6 py-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(184, 150, 63, 0.09), rgba(184, 150, 63, 0.02))",
        border: "1px solid rgba(184, 150, 63, 0.18)",
        boxShadow: "0 2px 12px rgba(184, 150, 63, 0.06)",
      }}
    >
      {/* Fffuel-style grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.72 0 0 0 0 0.59 0 0 0 0 0.25 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "140px",
        }}
      />

      {/* Corner brackets — estética "mira / scanner de investigação" */}
      <span
        aria-hidden="true"
        className="absolute top-2.5 left-2.5 w-3 h-3 border-t-[1.5px] border-l-[1.5px] rounded-tl-md"
        style={{ borderColor: "var(--primary)", opacity: 0.55 }}
      />
      <span
        aria-hidden="true"
        className="absolute top-2.5 right-2.5 w-3 h-3 border-t-[1.5px] border-r-[1.5px] rounded-tr-md"
        style={{ borderColor: "var(--primary)", opacity: 0.55 }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-[1.5px] border-l-[1.5px] rounded-bl-md"
        style={{ borderColor: "var(--primary)", opacity: 0.55 }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-[1.5px] border-r-[1.5px] rounded-br-md"
        style={{ borderColor: "var(--primary)", opacity: 0.55 }}
      />

      {/* Bits digitais flutuando — mesmo DNA do HeroInvestigate */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 300 120"
        preserveAspectRatio="none"
      >
        <rect x="25" y="20" width="3" height="3" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "0.2s" }} />
        <circle cx="275" cy="30" r="1.8" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "0.9s" }} />
        <rect x="265" y="95" width="2.5" height="2.5" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "1.6s" }} />
        <circle cx="35" cy="100" r="1.5" fill="var(--primary)" className="hero-bit" style={{ animationDelay: "2.3s" }} />
      </svg>

      {/* Conteúdo — centralizado */}
      <div className="relative text-center">
        {/* Label com divisor dourado */}
        <div className="flex items-center justify-center gap-2 mb-2.5">
          <span
            className="h-px flex-1 max-w-[28px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--primary))",
              opacity: 0.5,
            }}
            aria-hidden="true"
          />
          <span
            className="text-[0.62rem] font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--primary)" }}
          >
            Acabe com suas dúvidas fácil hoje
          </span>
          <span
            className="h-px flex-1 max-w-[28px]"
            style={{
              background:
                "linear-gradient(90deg, var(--primary), transparent)",
              opacity: 0.5,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Texto principal */}
        <p
          className="text-[0.98rem] leading-snug min-h-[3.4rem]"
          style={{ color: "var(--foreground)" }}
        >
          Saiba tudo sobre qualquer pessoa apenas{" "}
          <span style={{ color: "var(--primary)", fontWeight: 700 }}>
            {text}
            <span className="typewriter-cursor" aria-hidden="true">
              |
            </span>
          </span>
        </p>
      </div>
    </div>
  )
}

// ============================================================
// Hero
// ============================================================

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
              color: "var(--primary)",
            }}
          >
            <span
              className="relative w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--primary)" }}
            />
            Encontre o que estão escondendo
          </div>

          {/* Title */}
          <h1 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-3 md:mb-5">
            Descubra a Verdade
            <br />
            Sobre{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>
              Qualquer Pessoa
            </em>
          </h1>

          {/* Subtitle */}
          <p
            className="text-[0.9rem] md:text-lg leading-relaxed max-w-xl mb-4 md:mb-6 mx-auto lg:mx-0"
            style={{ color: "var(--muted-foreground)" }}
          >
            Você fornece um único nome, cpf, número de telefone, placa ou chave PIX e
            nós investigamos a fundo tudo sobre. Você recebe a ficha completa no seu
            WhatsApp em até{" "}
            <strong style={{ color: "var(--foreground)" }}>5 minutos</strong>.
          </p>

          {/* Ícone Hero custom — mobile apenas */}
          <div className="md:hidden flex justify-center my-2">
            <HeroInvestigate size={200} />
          </div>

          {/* Typewriter card — mobile apenas */}
          <TypewriterCard />

          {/* CTA */}
          <div className="flex flex-col items-center lg:items-start mb-4 md:mb-5">
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
                boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
              }}
            >
              <span>&#128269;</span> Iniciar Investigação
            </button>
          </div>

          {/* Trust Items */}
          <div
            className="flex items-center gap-2 mb-4 md:mb-6 justify-center lg:justify-start text-[0.65rem] md:text-[0.78rem]"
            style={{ color: "var(--muted-foreground)" }}
          >
            {trustItems.map((item, index) => (
              <span key={item.label} className="flex items-center gap-1.5 whitespace-nowrap">
                <TrustIcon name={item.icon} />
                <span className="font-semibold">{item.label}</span>
                {index < trustItems.length - 1 && (
                  <span style={{ color: "var(--muted)" }}>|</span>
                )}
              </span>
            ))}
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
                  color: "var(--muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Visual - Hidden on mobile for performance */}
        <div className="relative hidden md:flex justify-center">
          <Image
            src="/mockup.webp"
            alt="Detetive VIP - Investigação entregue via WhatsApp"
            width={728}
            height={1350}
            className="w-[320px] max-w-full rounded-2xl"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))",
            }}
            loading="eager"
            quality={75}
          />
        </div>
      </div>
    </section>
  )
}
