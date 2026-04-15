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
      className="inline-flex flex-wrap items-center justify-center gap-2.5 md:gap-4 px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-semibold"
      style={{
        background: "linear-gradient(135deg, rgba(220, 38, 38, 0.06) 0%, rgba(220, 38, 38, 0.02) 100%)",
        border: "1px solid rgba(220, 38, 38, 0.12)",
      }}
      role="timer"
      aria-live="polite"
    >
      <div className="flex items-center gap-1.5" style={{ color: "var(--destructive)" }}>
        <Clock size={14} aria-hidden="true" />
        <span className="font-medium">{!mounted ? "Oferta expira em:" : expired ? "Oferta encerrada!" : "Oferta expira em:"}</span>
      </div>
      <div className="flex gap-1.5" aria-hidden="true">
        {[
          { value: time.hours, label: "h" },
          { value: time.minutes, label: "m" },
          { value: time.seconds, label: "s" },
        ].map((unit, idx) => (
          <span key={unit.label} className="flex items-center gap-0.5">
            <span
              className="px-2 py-1 rounded-lg font-bold text-sm md:text-base min-w-[32px] md:min-w-[36px] text-center"
              style={{ 
                background: "rgba(220, 38, 38, 0.08)", 
                color: "var(--destructive)",
                fontVariantNumeric: "tabular-nums"
              }}
            >
              {pad(unit.value)}
            </span>
            {idx < 2 && <span className="text-[0.65rem] font-normal" style={{ color: "rgba(220, 38, 38, 0.4)" }}>:</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

const features = [
  "Nome Completo, CPF, RG e Data de Nascimento",
  "Todos os Telefones (Celular e Fixo)",
  "Todos os Enderecos Vinculados",
  "E-mails e Redes Sociais",
  "Veiculos, Placa e Modelo",
  "Parentes Proximos (Nome e CPF)",
  "Score, Dividas e Processos Judiciais",
  "Faixa de Renda e Profissao",
  "Participacao em Empresas (CNPJ)",
  "Resumo investigativo completo",
  "Parecer do analista",
  "Pontos de atencao e analise de risco",
]

const guarantees = [
  { icon: Shield, text: "100% Sigiloso" },
  { icon: Zap, text: "Resultado em 1h" },
  { icon: MessageCircle, text: "Via WhatsApp" },
]

export function PricingSection() {
  return (
    <section
      id="planos"
      className="relative z-[1] py-16 md:py-24 px-4 md:px-8"
      style={{ background: "var(--background-secondary)" }}
      aria-label="Investigacao Completa"
    >
      <div className="max-w-[680px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div
            className="inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--primary)" }}
          >
            <Sparkles size={12} aria-hidden="true" />
            Oferta Especial
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4 text-balance">
            Investigacao{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Completa</em>
          </h2>
          
          <p 
            className="text-sm md:text-base leading-relaxed max-w-md mx-auto mb-6" 
            style={{ color: "var(--muted-foreground)" }}
          >
            Tudo sobre qualquer pessoa a partir de um unico dado: nome, CPF, telefone, placa, PIX ou e-mail.
          </p>
          
          <Countdown />
        </div>

        {/* Pricing Card */}
        <article
          className="relative rounded-2xl md:rounded-3xl overflow-hidden card-lift"
          style={{
            background: "var(--background-card)",
            boxShadow: "0 0 0 1px rgba(201, 162, 39, 0.2), 0 12px 48px rgba(201, 162, 39, 0.12)",
          }}
        >
          {/* Ribbon */}
          <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 z-10" aria-hidden="true">
            <div
              className="absolute top-[22px] right-[-38px] w-[150px] text-center py-2 text-[0.6rem] font-bold uppercase tracking-wider text-white transform rotate-45"
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                boxShadow: "0 2px 8px rgba(201, 162, 39, 0.3)"
              }}
            >
              50% OFF
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 md:p-10">
            {/* Headline */}
            <div className="text-center mb-8">
              <h3
                className="text-xl md:text-2xl font-bold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                Ficha Completa de Qualquer Pessoa
              </h3>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                A partir de qualquer informacao que voce tenha
              </p>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="text-sm mb-2" style={{ color: "var(--muted)" }}>
                de{" "}
                <span className="line-through">R$ 197,00</span>
              </div>
              <div className="flex items-start justify-center">
                <span className="text-lg font-semibold mt-3 mr-0.5" style={{ color: "var(--primary)" }}>
                  R$
                </span>
                <span 
                  className="text-7xl md:text-8xl font-extrabold leading-none tracking-tight" 
                  style={{ color: "var(--foreground)" }}
                >
                  97
                </span>
              </div>
              <div 
                className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ 
                  background: "rgba(5, 150, 105, 0.08)", 
                  color: "var(--success)" 
                }}
              >
                <Check size={12} strokeWidth={3} />
                Economize R$ 100,00
              </div>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {guarantees.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[0.7rem] font-medium"
                  style={{
                    background: "rgba(37, 211, 102, 0.06)",
                    border: "1px solid rgba(37, 211, 102, 0.12)",
                    color: "var(--foreground)",
                  }}
                >
                  <item.icon size={14} style={{ color: "var(--whatsapp)" }} />
                  {item.text}
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div
              className="p-5 md:p-6 rounded-xl mb-8"
              style={{
                background: "var(--background-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <p 
                className="text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-4 text-center" 
                style={{ color: "var(--primary)" }}
              >
                O que voce vai receber
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[0.8rem]"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(5, 150, 105, 0.1)" }}
                    >
                      <Check
                        size={10}
                        style={{ color: "var(--success)" }}
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <a
              href="/checkout/investigacao"
              className="btn-primary flex items-center justify-center gap-2.5 w-full py-4 md:py-5 rounded-full font-bold text-white text-base md:text-lg uppercase tracking-wide touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2"
              style={{
                background: "var(--whatsapp)",
                boxShadow: "0 6px 28px rgba(37, 211, 102, 0.4)",
              }}
            >
              QUERO DESCOBRIR A VERDADE
            </a>

            <p 
              className="text-center text-[0.7rem] mt-4 leading-relaxed" 
              style={{ color: "var(--muted)" }}
            >
              Pagamento unico via PIX &middot; Sem assinatura &middot; Resultado em 1 hora
            </p>

            {/* Demo link */}
            <div className="text-center mt-5 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
              <a
                href="#relatorio-heading"
                className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
                style={{ color: "var(--primary)" }}
              >
                <span>Ver exemplo de investigacao completa</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 3V11M7 11L4 8M7 11L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </article>

        {/* Trust Strip */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { icon: "shield", label: "Pagamento Seguro" },
            { icon: "phone", label: "Via WhatsApp" },
            { icon: "lock", label: "100% Sigiloso" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-[0.75rem] font-medium"
              style={{ color: "var(--muted)" }}
            >
              {item.icon === "shield" && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5L2.5 3.5V7.5C2.5 11 5 13.5 8 14.5C11 13.5 13.5 11 13.5 7.5V3.5L8 1.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {item.icon === "phone" && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="4" y="1.5" width="8" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
                  <line x1="6.5" y1="12" x2="9.5" y2="12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                </svg>
              )}
              {item.icon === "lock" && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
