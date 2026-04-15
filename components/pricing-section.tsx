"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Clock, Shield, Zap, MessageCircle } from "lucide-react"

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
      className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-3 px-3 md:px-5 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold"
      style={{
        background: "rgba(220, 38, 38, 0.06)",
        border: "1px solid rgba(220, 38, 38, 0.15)",
        color: "var(--destructive)",
      }}
      role="timer"
      aria-live="polite"
    >
      <div className="flex items-center gap-1.5">
        <Clock size={14} aria-hidden="true" />
        <span>{!mounted ? "Oferta expira em:" : expired ? "Oferta encerrada!" : "Oferta expira em:"}</span>
      </div>
      <div className="flex gap-1" aria-hidden="true">
        <span
          className="px-1.5 md:px-2 py-0.5 rounded font-extrabold text-sm md:text-base min-w-[28px] md:min-w-[32px] text-center"
          style={{ background: "rgba(220, 38, 38, 0.1)", color: "var(--destructive)" }}
        >
          {pad(time.hours)}
        </span>
        <span style={{ color: "rgba(220, 38, 38, 0.4)" }}>:</span>
        <span
          className="px-1.5 md:px-2 py-0.5 rounded font-extrabold text-sm md:text-base min-w-[28px] md:min-w-[32px] text-center"
          style={{ background: "rgba(220, 38, 38, 0.1)", color: "var(--destructive)" }}
        >
          {pad(time.minutes)}
        </span>
        <span style={{ color: "rgba(220, 38, 38, 0.4)" }}>:</span>
        <span
          className="px-1.5 md:px-2 py-0.5 rounded font-extrabold text-sm md:text-base min-w-[28px] md:min-w-[32px] text-center"
          style={{ background: "rgba(220, 38, 38, 0.1)", color: "var(--destructive)" }}
        >
          {pad(time.seconds)}
        </span>
      </div>
    </div>
  )
}

const features = [
  "Nome Completo, CPF, RG e Data de Nascimento",
  "Todos os Telefones (Celular e Fixo)",
  "Todos os Endereços Vinculados",
  "E-mails e Redes Sociais",
  "Veículos, Placa e Modelo",
  "Parentes Próximos (Nome e CPF)",
  "Score, Dívidas e Processos Judiciais",
  "Faixa de Renda e Profissão",
  "Participação em Empresas (CNPJ)",
  "Resumo investigativo completo",
  "Parecer do analista",
  "Pontos de atenção e análise de risco",
]

const guarantees = [
  { icon: Shield, text: "100% Sigiloso" },
  { icon: Zap, text: "Resultado em até 24h" },
  { icon: MessageCircle, text: "Entrega via WhatsApp" },
]

export function PricingSection() {
  return (
    <section
      id="planos"
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8"
      style={{ background: "var(--background-secondary)" }}
      aria-label="Investigação Completa"
    >
      <div className="max-w-[700px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div
            className="flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Oferta Especial
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-3">
            Investigação{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Completa</em>
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-4" style={{ color: "var(--muted-foreground)" }}>
            Descobrimos tudo sobre qualquer pessoa a partir de qualquer dado que você tenha: nome, CPF, telefone, placa, chave PIX ou e-mail.
          </p>
          <Countdown />
        </div>

        {/* Single Pricing Card */}
        <article
          className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden ring-2 ring-[var(--primary)]"
          style={{
            boxShadow: "0 8px 32px rgba(184, 150, 63, 0.12)",
          }}
        >
          {/* Ribbon */}
          <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 z-10" aria-hidden="true">
            <div
              className="absolute top-[18px] right-[-35px] w-[140px] text-center py-1.5 text-[0.6rem] font-bold uppercase tracking-wider text-white transform rotate-45"
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
              }}
            >
              50% OFF
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 md:p-8">
            {/* Headline */}
            <div className="text-center mb-6">
              <h3
                className="text-xl md:text-2xl font-bold mb-2"
                style={{ color: "var(--primary-dark)" }}
              >
                Ficha Completa de Qualquer Pessoa
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                A partir de qualquer informação que você tenha sobre ela
              </p>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              <div className="text-sm mb-1" style={{ color: "var(--muted)" }}>
                de{" "}
                <span className="line-through">R$ 197,00</span>
              </div>
              <div className="flex items-start justify-center">
                <span className="text-xl font-semibold mt-2 mr-1" style={{ color: "var(--primary)" }}>
                  R$
                </span>
                <span className="text-6xl md:text-7xl font-extrabold leading-none" style={{ color: "var(--primary-dark)" }}>
                  97
                </span>
                <span className="text-xl font-bold mt-2" style={{ color: "var(--primary)" }}>
                  ,00
                </span>
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--success)" }}>
                Economize R$ 100,00
              </p>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {guarantees.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.7rem] font-medium"
                  style={{
                    background: "rgba(37, 211, 102, 0.08)",
                    color: "var(--foreground)",
                  }}
                >
                  <item.icon size={14} style={{ color: "var(--whatsapp)" }} />
                  {item.text}
                </div>
              ))}
            </div>

            {/* Features */}
            <div
              className="p-4 rounded-xl mb-6"
              style={{
                background: "rgba(184, 150, 63, 0.04)",
                border: "1px solid rgba(184, 150, 63, 0.1)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-wider mb-3 text-center" style={{ color: "var(--primary)" }}>
                O que você vai receber:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-[0.8rem]"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <Check
                      size={16}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--success)" }}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <a
              href="/checkout/investigacao"
              className="flex items-center justify-center gap-2 w-full py-4 md:py-5 rounded-full font-bold text-white text-base md:text-lg uppercase tracking-wide active:scale-[0.98] transition-transform"
              style={{
                background: "var(--whatsapp)",
                boxShadow: "0 6px 24px rgba(37, 211, 102, 0.35)",
              }}
            >
              QUERO DESCOBRIR A VERDADE
            </a>

            <p className="text-center text-[0.7rem] mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
              Pagamento único via PIX · Sem assinatura · Resultado em até 24 horas
            </p>

            {/* Demo link */}
            <div className="text-center mt-4">
              <a
                href="#relatorio-heading"
                className="inline-flex items-center gap-1 text-[0.75rem] font-semibold underline underline-offset-2 transition-colors hover:opacity-80"
                style={{ color: "var(--primary)" }}
              >
                Ver exemplo de investigação completa ↓
              </a>
            </div>
          </div>
        </article>

        {/* Trust Strip */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {[
            { icon: "🔒", label: "Pagamento Seguro" },
            { icon: "📱", label: "Via WhatsApp" },
            { icon: "🛡️", label: "100% Sigiloso" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-1.5 text-[0.75rem] font-medium"
              style={{ color: "var(--muted)" }}
            >
              <span className="text-base" aria-hidden="true">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
