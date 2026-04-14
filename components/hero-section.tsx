"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"


// Carrega lottie-react apenas no client para evitar SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const trustItems = [
  { label: "100% Sigiloso" },
  { label: "Entrega em 5min" },
  { label: "Dados Verificados" },
]

const tags = ["CPF", "Nome", "Telefone", "CNPJ", "Placa", "Chave PIX", "E-mail"]

function DetectiveLottie() {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    // Atrasa carregamento do Lottie para não bloquear LCP/FCP
    const timer = setTimeout(() => {
      fetch("/Mr Detective.json")
        .then((res) => res.json())
        .then(setAnimationData)
        .catch(() => {})
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!animationData) return null

  return (
    <div className="relative flex justify-center my-2 md:hidden">
      {/* Glow dourado sutil */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-52 h-52 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(184, 150, 63, 0.12) 0%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />
      </div>

      {/* Animacao sem circulo — diretamente visivel */}
      <div className="relative w-64 h-64 -ml-3">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
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

          {/* Lottie Detetive — apenas mobile, entre subtitle e trust items */}
          <DetectiveLottie />

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
