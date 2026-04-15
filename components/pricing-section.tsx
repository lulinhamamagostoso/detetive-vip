"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Clock, Shield, Zap, MessageCircle, Sparkles } from "lucide-react"

const COUNTDOWN_KEY = "dtv_countdown_target"
const COUNTDOWN_DURATION_MS = (2 * 60 + 47) * 60 * 1000 + 33 * 1000

function getTargetTimestamp(): number {
  if (typeof window === "undefined") return Date.now() + COUNTDOWN_DURATION_MS
  try {
    const stored = sessionStorage.getItem(COUNTDOWN_KEY)
    if (stored) {
      const target = parseInt(stored, 10)
      if (!isNaN(target)) return target
    }
    const target = Date.now() + COUNTDOWN_DURATION_MS
    sessionStorage.setItem(COUNTDOWN_KEY, target.toString())
    return target
  } catch {
    return Date.now() + COUNTDOWN_DURATION_MS
  }
}

function msToTime(ms: number) {
  if (ms <= 0) return { hours: 0, minutes: 0, seconds: 0 }
  const totalSeconds = Math.floor(ms / 1000)
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function Countdown() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [expired, setExpired] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting))
      },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const target = getTargetTimestamp()

    const update = () => {
      const remaining = target - Date.now()
      if (remaining <= 0) {
        setTime({ hours: 0, minutes: 0, seconds: 0 })
        setExpired(true)
        return false
      }
      setTime(msToTime(remaining))
      return true
    }

    update()
    setMounted(true)

    if (!isVisible) return

    const timer = setInterval(() => {
      if (!update()) clearInterval(timer)
    }, 1000)
    return () => clearInterval(timer)
  }, [isVisible])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <div
      ref={containerRef}
      className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-4 px-3 md:px-6 py-2 rounded-xl text-[11px] md:text-sm font-semibold"
      style={{
        background: "linear-gradient(135deg, rgba(220, 38, 38, 0.06) 0%, rgba(220, 38, 38, 0.02) 100%)",
        border: "1px solid rgba(220, 38, 38, 0.12)",
      }}
      role="timer"
      aria-live="polite"
    >
      <div className="flex items-center gap-1.5" style={{ color: "var(--destructive)" }}>
        <Clock size={12} aria-hidden="true" />
        <span className="font-medium">{!mounted ? "Oferta expira em:" : expired ? "Oferta encerrada!" : "Expira em:"}</span>
      </div>
      <div className="flex gap-1" aria-hidden="true">
        {[
          { value: time.hours, label: "h" },
          { value: time.minutes, label: "m" },
          { value: time.seconds, label: "s" },
        ].map((unit, idx) => (
          <span key={unit.label} className="flex items-center gap-0.5">
            <span
              className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md md:rounded-lg font-bold text-[13px] md:text-base min-w-[28px] md:min-w-[36px] text-center"
              style={{ 
                background: "rgba(220, 38, 38, 0.08)", 
                color: "var(--destructive)",
                fontVariantNumeric: "tabular-nums"
              }}
            >
              {pad(unit.value)}
            </span>
            {idx < 2 && <span className="text-[10px] font-normal" style={{ color: "rgba(220, 38, 38, 0.4)" }}>:</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

const features = [
  "Nome, CPF, RG e Data de Nascimento",
  "Todos os Telefones",
  "Todos os Endereços",
  "E-mails e Redes Sociais",
  "Veículos e Placas",
  "Parentes Próximos",
  "Score, Dívidas e Processos",
  "Faixa de Renda",
  "Empresas (CNPJ)",
  "Parecer do analista",
]

const guarantees = [
  { icon: Shield, text: "Sigiloso" },
  { icon: Zap, text: "Em 1h" },
  { icon: MessageCircle, text: "WhatsApp" },
]

export function PricingSection() {
  return (
    <section
      id="planos"
      className="relative z-[1] py-12 md:py-24 px-4 md:px-8"
      style={{ background: "var(--background-secondary)" }}
      aria-label="Investigação Completa"
    >
      <div className="max-w-[680px] mx-auto">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-6 md:mb-12">
          <div
            className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] mb-2 md:mb-3"
            style={{ color: "var(--primary)" }}
          >
            <Sparkles size={10} aria-hidden="true" />
            Oferta Especial
          </div>
          
          <h2 className="font-serif text-[26px] md:text-5xl font-bold leading-[1.1] tracking-tight mb-3 md:mb-4 text-balance">
            Investigação{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Completa</em>
          </h2>
          
          <p 
            className="text-[13px] md:text-base leading-relaxed max-w-md mx-auto mb-4 md:mb-6 text-pretty" 
            style={{ color: "var(--muted-foreground)" }}
          >
            Tudo sobre qualquer pessoa a partir de um dado: nome, CPF, telefone, placa ou PIX.
          </p>
          
          <Countdown />
        </div>

        {/* Pricing Card - Mobile optimized */}
        <article
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "var(--background-card)",
            boxShadow: "0 0 0 1px rgba(201, 162, 39, 0.2), 0 8px 32px rgba(201, 162, 39, 0.1)",
          }}
        >
          {/* Ribbon */}
          <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 md:w-28 md:h-28 z-10" aria-hidden="true">
            <div
              className="absolute top-[18px] md:top-[22px] right-[-32px] md:right-[-38px] w-[130px] md:w-[150px] text-center py-1.5 md:py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-white transform rotate-45"
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                boxShadow: "0 2px 8px rgba(201, 162, 39, 0.3)"
              }}
            >
              50% OFF
            </div>
          </div>

          {/* Card Content - Mobile optimized padding */}
          <div className="p-5 md:p-10">
            {/* Headline */}
            <div className="text-center mb-5 md:mb-8">
              <h3
                className="text-[17px] md:text-2xl font-bold mb-1.5 md:mb-2 text-balance"
                style={{ color: "var(--foreground)" }}
              >
                Ficha Completa de Qualquer Pessoa
              </h3>
              <p className="text-[12px] md:text-sm" style={{ color: "var(--muted)" }}>
                A partir de qualquer informação
              </p>
            </div>

            {/* Price - Mobile: larger and more prominent */}
            <div className="text-center mb-5 md:mb-8">
              <div className="text-[12px] md:text-sm mb-1" style={{ color: "var(--muted)" }}>
                de{" "}
                <span className="line-through">R$ 197</span>
              </div>
              <div className="flex items-start justify-center">
                <span className="text-base md:text-lg font-semibold mt-2 md:mt-3 mr-0.5" style={{ color: "var(--primary)" }}>
                  R$
                </span>
                <span 
                  className="text-6xl md:text-8xl font-extrabold leading-none tracking-tight" 
                  style={{ color: "var(--foreground)" }}
                >
                  97
                </span>
              </div>
              <div 
                className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full text-[11px] md:text-xs font-semibold"
                style={{ 
                  background: "rgba(5, 150, 105, 0.08)", 
                  color: "var(--success)" 
                }}
              >
                <Check size={10} strokeWidth={3} />
                Economize R$ 100
              </div>
            </div>

            {/* Guarantees - Mobile: compact */}
            <div className="flex justify-center gap-2 mb-5 md:mb-8">
              {guarantees.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-1 px-2.5 md:px-3 py-1.5 md:py-2 rounded-full text-[11px] md:text-[12px] font-medium"
                  style={{
                    background: "rgba(37, 211, 102, 0.06)",
                    border: "1px solid rgba(37, 211, 102, 0.12)",
                    color: "var(--foreground)",
                  }}
                >
                  <item.icon size={12} style={{ color: "var(--whatsapp)" }} />
                  {item.text}
                </div>
              ))}
            </div>

            {/* Features Grid - Mobile: single column, compact */}
            <div
              className="p-4 md:p-6 rounded-xl mb-5 md:mb-8"
              style={{
                background: "var(--background-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <p 
                className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] mb-3 md:mb-4 text-center" 
                style={{ color: "var(--primary)" }}
              >
                O que você vai receber
              </p>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-2 md:gap-2.5">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-[12px] md:text-[13px]"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <div 
                      className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(5, 150, 105, 0.1)" }}
                    >
                      <Check
                        size={8}
                        style={{ color: "var(--success)" }}
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button - Mobile: FULL WIDTH, THUMB ZONE optimized */}
            <a
              href="/checkout/investigacao"
              className="btn-primary flex items-center justify-center gap-2 w-full py-4 md:py-5 rounded-2xl md:rounded-full font-bold text-white text-[15px] md:text-lg uppercase tracking-wide touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 min-h-[56px]"
              style={{
                background: "var(--whatsapp)",
                boxShadow: "0 6px 28px rgba(37, 211, 102, 0.4)",
              }}
            >
              QUERO DESCOBRIR A VERDADE
            </a>

            <p 
              className="text-center text-[11px] md:text-[12px] mt-3 md:mt-4 leading-relaxed" 
              style={{ color: "var(--muted)" }}
            >
              PIX &middot; Sem assinatura &middot; Resultado em 1h
            </p>

            {/* Demo link - Mobile: larger touch target */}
            <div className="text-center mt-4 md:mt-5 pt-4 md:pt-5" style={{ borderTop: "1px solid var(--border)" }}>
              <a
                href="#relatorio-heading"
                className="inline-flex items-center gap-1.5 text-[12px] md:text-[13px] font-semibold py-2 px-3 -mx-3 rounded-lg transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px]"
                style={{ color: "var(--primary)" }}
              >
                <span>Ver exemplo de investigação</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 3V11M7 11L4 8M7 11L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </article>

        {/* Trust Strip - Mobile: simplified */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6 md:mt-10">
          {[
            { icon: "shield", label: "Pagamento Seguro" },
            { icon: "lock", label: "100% Sigiloso" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 text-[11px] md:text-[13px] font-medium"
              style={{ color: "var(--muted)" }}
            >
              {item.icon === "shield" && (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5L2.5 3.5V7.5C2.5 11 5 13.5 8 14.5C11 13.5 13.5 11 13.5 7.5V3.5L8 1.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {item.icon === "lock" && (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
                  <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                  <circle cx="8" cy="10.5" r="1" fill="currentColor"/>
                </svg>
              )}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
