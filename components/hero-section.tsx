"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const trustItems = [
  { label: "100% Sigiloso" },
  { label: "Resultado em ate 1h" },
  { label: "Dados Verificados" },
]

const TYPED_PHRASES = [
  "pelo telefone",
  "pelo nome",
  "pela placa",
  "pela chave PIX",
  "pelo CPF",
  "pelo e-mail",
]

// Typewriter Component - Mobile only
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
    <div className="md:hidden mb-6 mx-auto max-w-md text-center">
      <p className="text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
        Descubra tudo sobre qualquer pessoa{" "}
        <span className="font-semibold" style={{ color: "var(--primary)" }}>
          {text}
          <span className="typewriter-cursor" aria-hidden="true">|</span>
        </span>
      </p>
    </div>
  )
}

// Detective Visual - Mobile only
function DetectiveVisual() {
  return (
    <div className="relative flex justify-center my-6 md:hidden">
      <div className="relative w-44 h-44">
        {/* Glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-36 h-36 rounded-full animate-pulse-slow"
            style={{
              background: "radial-gradient(circle, rgba(201, 162, 39, 0.2) 0%, transparent 70%)",
            }}
          />
        </div>
        <Image
          src="/detective-hero.png"
          alt="Detetive"
          width={176}
          height={176}
          className="w-full h-full object-contain detective-float"
          priority
          sizes="176px"
        />
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative z-[1] flex items-center pt-8 pb-12 md:pt-16 md:pb-24 px-4 md:px-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201, 162, 39, 0.08) 0%, transparent 70%)"
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-[1200px] mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center relative">
        {/* Content */}
        <div className="relative text-center lg:text-left">
          {/* Badge */}
          <div
            className="animate-fade-up stagger-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-5 md:mb-8"
            style={{
              background: "rgba(201, 162, 39, 0.1)",
              border: "1px solid rgba(201, 162, 39, 0.2)",
              color: "var(--primary)"
            }}
          >
            <span 
              className="relative w-1.5 h-1.5 rounded-full" 
              style={{ background: "var(--primary)" }} 
            />
            Descubra o que estao escondendo
          </div>

          {/* Headline - Large, bold, memorable */}
          <h1 className="animate-fade-up stagger-2 font-serif text-[2rem] md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight mb-4 md:mb-6 text-balance">
            <span className="block">Descubra a Verdade</span>
            <span className="block mt-1">
              Sobre{" "}
              <em className="not-italic relative" style={{ color: "var(--primary)" }}>
                Qualquer Pessoa
                <svg 
                  className="absolute -bottom-1 left-0 w-full" 
                  height="8" 
                  viewBox="0 0 200 8" 
                  fill="none"
                  aria-hidden="true"
                >
                  <path 
                    d="M1 5.5C40 2 80 2 100 4C120 6 160 6 199 3" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    style={{ color: "var(--primary)" }}
                    opacity="0.4"
                  />
                </svg>
              </em>
            </span>
          </h1>

          {/* Subtitle - Clear value proposition */}
          <p
            className="animate-fade-up stagger-3 text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mb-5 md:mb-8 mx-auto lg:mx-0"
            style={{ color: "var(--muted-foreground)" }}
          >
            Voce fornece{" "}
            <span className="font-medium" style={{ color: "var(--foreground)" }}>nome, CPF, telefone, placa ou PIX</span>
            {" "}e nos entregamos a{" "}
            <strong style={{ color: "var(--foreground)" }}>ficha completa no seu WhatsApp</strong>.
          </p>

          {/* Detective Visual - Mobile only */}
          <DetectiveVisual />

          {/* Typewriter - Mobile only */}
          <HeroTypewriter />

          {/* CTA Button */}
          <div className="animate-fade-up stagger-4 flex flex-col items-center lg:items-start mb-6 md:mb-8">
            <Link
              href="#planos"
              className="btn-primary group inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-sm md:text-base uppercase tracking-wider text-white touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{
                background: "var(--whatsapp)",
                boxShadow: "0 4px 24px rgba(37, 211, 102, 0.35)"
              }}
            >
              <span className="text-lg" aria-hidden="true">&#128269;</span>
              <span>Iniciar Investigacao</span>
            </Link>
            
            {/* Sub-CTA text */}
            <p className="mt-3 text-[0.7rem] md:text-xs tracking-wide" style={{ color: "var(--muted)" }}>
              Pagamento unico via PIX &middot; Sem assinatura
            </p>
          </div>

          {/* Trust Items */}
          <div 
            className="animate-fade-up stagger-5 flex items-center gap-3 justify-center lg:justify-start text-[0.65rem] md:text-[0.75rem]" 
            style={{ color: "var(--muted-foreground)" }}
          >
            {trustItems.map((item, index) => (
              <span key={item.label} className="flex items-center gap-3 whitespace-nowrap">
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--success)" }} />
                    <path d="M4.5 7L6.5 9L9.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--success)" }} />
                  </svg>
                  <span className="font-medium">{item.label}</span>
                </span>
                {index < trustItems.length - 1 && (
                  <span className="w-1 h-1 rounded-full" style={{ background: "var(--border)" }} />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Visual - Desktop only */}
        <div className="relative hidden lg:flex justify-center items-center">
          {/* Decorative ring */}
          <div 
            className="absolute w-[380px] h-[380px] rounded-full"
            style={{
              border: "1px solid rgba(201, 162, 39, 0.15)",
              background: "radial-gradient(circle, rgba(201, 162, 39, 0.03) 0%, transparent 70%)"
            }}
            aria-hidden="true"
          />
          
          {/* Mockup Image */}
          <Image
            src="/mockup.webp"
            alt="Detetive VIP - Investigacao entregue via WhatsApp"
            width={728}
            height={1350}
            className="relative z-10 w-[300px] max-w-full rounded-2xl"
            style={{
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.12))"
            }}
            loading="eager"
            fetchPriority="high"
            quality={80}
            sizes="300px"
          />
          
          {/* Floating badge - Social proof */}
          <div 
            className="absolute top-12 -left-4 z-20 flex items-center gap-2 px-4 py-2.5 rounded-xl"
            style={{
              background: "var(--background-card)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid var(--border)"
            }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--primary-glow)", color: "var(--primary)" }}
            >
              12k+
            </div>
            <div className="text-left">
              <p className="text-[0.65rem] font-semibold" style={{ color: "var(--foreground)" }}>Investigacoes</p>
              <p className="text-[0.55rem]" style={{ color: "var(--muted)" }}>realizadas com sucesso</p>
            </div>
          </div>
          
          {/* Floating badge - Rating */}
          <div 
            className="absolute bottom-16 -right-2 z-20 flex items-center gap-2 px-4 py-2.5 rounded-xl"
            style={{
              background: "var(--background-card)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid var(--border)"
            }}
          >
            <div className="flex" aria-label="4.8 de 5 estrelas">
              {[1,2,3,4,5].map((star) => (
                <svg key={star} width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ color: star <= 4 ? "var(--primary)" : "var(--primary)", opacity: star === 5 ? 0.4 : 1 }}>
                  <path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" />
                </svg>
              ))}
            </div>
            <span className="text-[0.65rem] font-semibold" style={{ color: "var(--foreground)" }}>4.8/5</span>
          </div>
        </div>
      </div>
    </section>
  )
}
