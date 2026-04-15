"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const trustItems = [
  { label: "100% Sigiloso" },
  { label: "Resultado em 1h" },
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
    <div className="md:hidden mb-5">
      <p className="text-[15px] leading-relaxed text-center" style={{ color: "var(--muted-foreground)" }}>
        Descubra tudo sobre qualquer pessoa{" "}
        <span className="font-semibold" style={{ color: "var(--primary)" }}>
          {text}
          <span className="typewriter-cursor" aria-hidden="true">|</span>
        </span>
      </p>
    </div>
  )
}

// Detective Visual - Mobile only - Optimized for LCP
function DetectiveVisual() {
  return (
    <div className="relative flex justify-center my-5 md:hidden">
      <div className="relative w-40 h-40">
        {/* Glow - simplified for performance */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201, 162, 39, 0.15) 0%, transparent 70%)",
            }}
          />
        </div>
        <Image
          src="/detective-hero.png"
          alt=""
          width={160}
          height={160}
          className="w-full h-full object-contain"
          priority
          sizes="160px"
          quality={75}
        />
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative z-[1] flex flex-col min-h-[calc(100svh-60px)] md:min-h-0 md:block pt-6 pb-4 md:pt-16 md:pb-24 px-4 md:px-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201, 162, 39, 0.06) 0%, transparent 70%)"
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-[1200px] mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-16 items-center relative flex-1">
        {/* Content */}
        <div className="relative text-center lg:text-left flex flex-col">
          {/* Badge - Mobile optimized */}
          <div
            className="animate-fade-up stagger-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-4 md:mb-8 self-center lg:self-start"
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
            Descubra o que escondem
          </div>

          {/* Headline - Mobile: larger, more impactful */}
          <h1 className="animate-fade-up stagger-2 font-serif text-[28px] md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-3 md:mb-6 text-balance">
            <span className="block">Descubra a Verdade</span>
            <span className="block mt-0.5">
              Sobre{" "}
              <em className="not-italic" style={{ color: "var(--primary)" }}>
                Qualquer Pessoa
              </em>
            </span>
          </h1>

          {/* Subtitle - Mobile optimized font size */}
          <p
            className="animate-fade-up stagger-3 text-[15px] md:text-lg lg:text-xl leading-relaxed max-w-lg mb-4 md:mb-8 mx-auto lg:mx-0 text-pretty"
            style={{ color: "var(--muted-foreground)" }}
          >
            Forneça{" "}
            <span className="font-medium" style={{ color: "var(--foreground)" }}>nome, CPF, telefone, placa ou PIX</span>
            {" "}e receba a{" "}
            <strong style={{ color: "var(--foreground)" }}>ficha completa no WhatsApp</strong>.
          </p>

          {/* Detective Visual - Mobile only */}
          <DetectiveVisual />

          {/* Typewriter - Mobile only */}
          <HeroTypewriter />

          {/* Trust Items - Mobile: above CTA for social proof */}
          <div 
            className="animate-fade-up stagger-4 flex flex-wrap items-center gap-2 justify-center lg:justify-start mb-5 md:mb-0 md:order-last md:mt-6" 
            style={{ color: "var(--muted-foreground)" }}
          >
            {trustItems.map((item, index) => (
              <span key={item.label} className="flex items-center gap-2 text-[12px] md:text-[13px]">
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--success)" }} />
                    <path d="M4.5 7L6.5 9L9.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--success)" }} />
                  </svg>
                  <span className="font-medium">{item.label}</span>
                </span>
                {index < trustItems.length - 1 && (
                  <span className="w-1 h-1 rounded-full hidden sm:block" style={{ background: "var(--border)" }} />
                )}
              </span>
            ))}
          </div>

          {/* CTA Button - Mobile: THUMB ZONE - fixed at bottom on mobile */}
          <div className="animate-fade-up stagger-5 flex flex-col items-center lg:items-start mt-auto md:mt-0 md:mb-8">
            <Link
              href="#planos"
              className="btn-primary group inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 md:px-10 md:py-5 rounded-2xl md:rounded-full font-bold text-[15px] md:text-base uppercase tracking-wider text-white touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[56px]"
              style={{
                background: "var(--whatsapp)",
                boxShadow: "0 4px 24px rgba(37, 211, 102, 0.35)"
              }}
            >
              <span className="text-lg" aria-hidden="true">&#128269;</span>
              <span>Iniciar Investigação</span>
            </Link>
            
            {/* Sub-CTA text */}
            <p className="mt-3 text-[11px] md:text-xs tracking-wide text-center" style={{ color: "var(--muted)" }}>
              Pagamento único via PIX &middot; Sem assinatura
            </p>
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
            alt="Detetive VIP - Investigação entregue via WhatsApp"
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
              <p className="text-[0.65rem] font-semibold" style={{ color: "var(--foreground)" }}>Investigações</p>
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
