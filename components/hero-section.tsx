"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"

// lottie-react carregado lazy no client (~50KB gzipped)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const trustItems = [
  { label: "100% Sigiloso" },
  { label: "Entrega em 5min" },
  { label: "Dados Verificados" },
]

const tags = ["CPF", "Nome", "Telefone", "CNPJ", "Placa", "Chave PIX", "E-mail"]

const TYPED_PHRASES = [
  "telefone",
  "nome",
  "placa",
  "chave PIX",
  "CPF",
  "e-mail",
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
        Acabe hoje com suas dúvidas sobre qualquer pessoa, investigando apenas pelo{" "}
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

// Lottie detetive no mobile. Container tem altura fixa (h-64 = 256px) para
// reservar espaço → CLS = 0. Fetch do JSON via requestIdleCallback → não
// bloqueia LCP (que agora é o subtitle do hero).
function DetectiveLottie() {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    const loadLottie = () => {
      fetch("/Mr Detective.json")
        .then((res) => res.json())
        .then(setAnimationData)
        .catch(() => {})
    }

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(loadLottie, { timeout: 5000 })
      return () => cancelIdleCallback(id)
    } else {
      const timer = setTimeout(loadLottie, 4500)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="relative flex justify-center my-2 md:hidden h-64">
      {/* Glow dourado sutil */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-52 h-52 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(184, 150, 63, 0.12) 0%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />
      </div>

      <div className="relative w-64 h-64 -ml-3">
        {animationData && (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        )}
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

          {/* Lottie Detetive — apenas mobile */}
          <DetectiveLottie />

          {/* Typewriter minimalista — apenas mobile */}
          <HeroTypewriter />

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
                boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)"
              }}
            >
              <span>&#128269;</span> Iniciar Investigação
            </button>
          </div>

          {/* Trust Items */}
          <div className="flex items-center gap-2 mb-4 md:mb-6 justify-center lg:justify-start text-[0.65rem] md:text-[0.78rem]" style={{ color: "var(--muted-foreground)" }}>
            {trustItems.map((item, index) => (
              <span key={item.label} className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-semibold">{item.label}</span>
                {index < trustItems.length - 1 && <span style={{ color: "var(--muted)" }}>|</span>}
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
            quality={75}
          />
        </div>
      </div>
    </section>
  )
}
