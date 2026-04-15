"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

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

// Detetive SVG inline otimizado — carrega instantaneamente em qualquer conexao.
// Estilo emoji: chapeu fedora cinza, rosto, bigode, sobretudo dourado, lupa.
function DetectiveVisual() {
  return (
    <div className="relative flex justify-center my-4 md:hidden">
      {/* Container com tamanho fixo para evitar CLS */}
      <div className="relative w-44 h-44">
        {/* Glow dourado sutil */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-36 h-36 rounded-full animate-pulse-slow"
            style={{
              background:
                "radial-gradient(circle, rgba(184, 150, 63, 0.18) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* SVG Detetive */}
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full detective-float"
          aria-label="Detetive"
          role="img"
        >
          <defs>
            {/* Gradientes para efeito 3D */}
            <linearGradient id="hatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8a8a8a" />
              <stop offset="100%" stopColor="#5a5a5a" />
            </linearGradient>
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd93d" />
              <stop offset="100%" stopColor="#f4c430" />
            </linearGradient>
            <linearGradient id="coatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c9a227" />
              <stop offset="100%" stopColor="#9a7b0a" />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8f4fc" />
              <stop offset="50%" stopColor="#cce7f5" />
              <stop offset="100%" stopColor="#a8d4e8" />
            </linearGradient>
          </defs>

          {/* Sobretudo / Corpo */}
          <path
            d="M35 85 L40 105 L80 105 L85 85 Q85 72 60 70 Q35 72 35 85Z"
            fill="url(#coatGrad)"
          />
          {/* Gola do sobretudo */}
          <path
            d="M45 72 L50 85 L55 75 L60 85 L65 75 L70 85 L75 72"
            fill="none"
            stroke="#8a6914"
            strokeWidth="2"
          />
          
          {/* Camisa branca */}
          <path
            d="M52 75 L55 90 L60 80 L65 90 L68 75"
            fill="#ffffff"
          />
          
          {/* Gravata */}
          <path
            d="M57 78 L60 95 L63 78 L60 82 Z"
            fill="#2d2d2d"
          />

          {/* Rosto */}
          <ellipse cx="60" cy="52" rx="22" ry="24" fill="url(#faceGrad)" />
          
          {/* Cabelo castanho nas laterais */}
          <path
            d="M38 48 Q36 42 40 38 Q42 50 38 52Z"
            fill="#8b5a2b"
          />
          <path
            d="M82 48 Q84 42 80 38 Q78 50 82 52Z"
            fill="#8b5a2b"
          />

          {/* Sobrancelhas */}
          <path d="M48 44 Q52 42 56 44" stroke="#6b4423" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M64 44 Q68 42 72 44" stroke="#6b4423" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Olhos */}
          <ellipse cx="52" cy="50" rx="5" ry="5" fill="#ffffff" />
          <ellipse cx="68" cy="50" rx="5" ry="5" fill="#ffffff" />
          <ellipse cx="52" cy="50" rx="3.5" ry="3.5" fill="#6b4423" />
          <ellipse cx="68" cy="50" rx="3.5" ry="3.5" fill="#6b4423" />
          <ellipse cx="53" cy="49" rx="1.2" ry="1.2" fill="#ffffff" />
          <ellipse cx="69" cy="49" rx="1.2" ry="1.2" fill="#ffffff" />

          {/* Nariz */}
          <ellipse cx="60" cy="58" rx="3" ry="2.5" fill="#e8b92e" />

          {/* Bigode */}
          <path
            d="M48 64 Q52 68 60 66 Q68 68 72 64 Q68 66 60 65 Q52 66 48 64Z"
            fill="#6b4423"
          />

          {/* Chapeu fedora - aba */}
          <ellipse cx="60" cy="32" rx="32" ry="8" fill="url(#hatGrad)" />
          
          {/* Chapeu fedora - copa */}
          <path
            d="M38 32 Q38 18 48 14 Q55 12 60 14 Q65 12 72 14 Q82 18 82 32Z"
            fill="url(#hatGrad)"
          />
          
          {/* Faixa do chapeu */}
          <rect x="40" y="26" width="40" height="5" fill="#3d3d3d" rx="1" />

          {/* Lupa - cabo */}
          <rect x="18" y="88" width="18" height="6" rx="2" fill="#4a4a4a" transform="rotate(-35 27 91)" />
          
          {/* Lupa - aro */}
          <circle cx="22" cy="78" r="14" fill="none" stroke="#4a4a4a" strokeWidth="4" />
          
          {/* Lupa - vidro */}
          <circle cx="22" cy="78" r="11" fill="url(#glassGrad)" opacity="0.9" />
          
          {/* Lupa - reflexo */}
          <path
            d="M16 72 Q18 70 22 72"
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
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
