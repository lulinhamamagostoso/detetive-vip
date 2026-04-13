"use client"

import { useState, useEffect } from "react"
import { Check, Clock } from "lucide-react"

const plans = [
  {
    ribbon: "BÁSICO",
    ribbonColor: "primary",
    name: "Pelo NOME OU CPF",
    slug: "nome-cpf",
    description: "A investigação é feita pelo Nome (mesmo que incompleto) ou CPF e vamos enviar as seguintes informações:",
    originalPrice: 70,
    price: 40,
    cents: "00",
    features: [
      "Nome Completo",
      "Data de Nascimento",
      "Número do CPF",
      "Nome Completo da Mãe",
      "Telefone(s) Celular e Fixo",
      "Endereço(s)",
      "Faixa de Renda",
      "E-mail(s) da Pessoa",
      "Escolaridade e Profissão",
    ],
    note: "*Direito a 1 investigação.",
  },
  {
    ribbon: "BÁSICO",
    ribbonColor: "primary",
    name: "Pelo N° Celular ou Placa",
    slug: "celular-placa",
    description: "Através do Número do Telefone ou Placa do Veículo, levantamos todas as informações do Titular.",
    originalPrice: 115,
    price: 79,
    cents: "00",
    features: [
      "Nome Completo",
      "Data de Nascimento",
      "Número do CPF",
      "Nome Completo da Mãe",
      "Telefone(s) Celular e Fixo",
      "Endereço(s)",
      "Faixa de Renda",
      "E-mail(s) da Pessoa",
      "Escolaridade e Profissão",
    ],
    note: "*Direito a 1 investigação.",
  },
  {
    ribbon: "A MELHOR",
    ribbonColor: "premium",
    name: "Investigação Premium",
    slug: "premium",
    description: "Informações de até 20+ bancos de dados brasileiros oficiais e mais de 2.000 fontes de dados abertas! Pode ser feita pelo N° Celular ou CPF ou Nome ou E-mail ou Chave PIX.",
    originalPrice: 307,
    price: 197,
    cents: "00",
    popular: true,
    features: [
      "Nome Completo",
      "Data de Nascimento",
      "Número do CPF e RG",
      "Cidade de Nascimento",
      "Nome Completo Mãe e Pai",
      "E-mail(s) da Pessoa",
      "Mais Telefone(s) Celular e Fixo",
      "Todos os Endereços",
      "Veículos/Placa/Modelo",
      "Parentes Próximos (Nome e CPF)",
      "Score e Dívidas",
      "Grau de Escolaridade",
      "Faixa de Renda/Profissão",
      "Participação em Empresa (CNPJ)",
      "Processos Judiciais",
      "E muito mais: resumo investigativo, parecer do analista, pontos de atenção e análise de risco completa",
    ],
    note: "*Direito a 1 investigação.",
  },
]

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
    // sessionStorage pode falhar em modo privado/incognito
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

    const timer = setInterval(() => {
      if (!update()) clearInterval(timer)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <div
      className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-3 px-3 md:px-5 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold mt-4 md:mt-6"
      style={{
        background: "rgba(220, 38, 38, 0.06)",
        border: "1px solid rgba(220, 38, 38, 0.15)",
        color: "var(--destructive)",
      }}
      role="timer"
      aria-live="polite"
      aria-label={expired ? "Oferta encerrada" : `Oferta expira em ${time.hours} horas ${time.minutes} minutos ${time.seconds} segundos`}
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

export function PricingSection() {
  return (
    <section
      id="planos"
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8"
      style={{ background: "var(--background-secondary)" }}
      aria-label="Planos e Preços de Investigação"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div
            className="flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Modalidades
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-2">
            Escolha o Nível de{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Investigação</em>
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-lg mx-auto" style={{ color: "var(--muted-foreground)" }}>
            Quanto vale saber a verdade quando isso é algo que importa pra você?
          </p>
          <Countdown />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative bg-white rounded-xl md:rounded-2xl overflow-hidden ${
                plan.popular ? "ring-2 ring-[var(--primary)]" : ""
              }`}
              style={{
                boxShadow: plan.popular
                  ? "0 8px 32px rgba(184, 150, 63, 0.12)"
                  : "0 2px 12px rgba(0,0,0,0.04)",
                border: plan.popular ? "none" : "1px solid var(--border)",
              }}
            >
              {/* Diagonal Ribbon */}
              <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 z-10" aria-hidden="true">
                <div
                  className="absolute top-[18px] right-[-35px] w-[140px] text-center py-1.5 text-[0.6rem] font-bold uppercase tracking-wider text-white transform rotate-45"
                  style={{
                    background: plan.ribbonColor === "premium"
                      ? "linear-gradient(135deg, var(--primary), var(--primary-dark))"
                      : "var(--primary)",
                  }}
                >
                  {plan.ribbon}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 md:p-7 pt-6 md:pt-8">
                <h3
                  className="text-lg md:text-xl font-bold mb-2 pr-12"
                  style={{ color: "var(--primary-dark)" }}
                >
                  {plan.name}
                </h3>

                <p
                  className="text-[0.8rem] leading-relaxed mb-4"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {plan.description}
                </p>

                {/* Original Price */}
                <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>
                  de{" "}
                  <span className="line-through">
                    R$ {plan.originalPrice},{plan.cents}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-start mb-4 md:mb-6">
                  <span className="text-base font-semibold mt-1.5 mr-1" style={{ color: "var(--primary)" }}>
                    R$
                  </span>
                  <span className="text-5xl md:text-6xl font-extrabold leading-none" style={{ color: "var(--primary-dark)" }}>
                    {plan.price}
                  </span>
                  <span className="text-lg font-bold mt-1.5" style={{ color: "var(--primary)" }}>
                    ,{plan.cents}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-4 md:mb-6">
                  {plan.features.map((feature) => (
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

                {/* Savings callout for premium */}
                {plan.popular && (
                  <div
                    className="text-center text-[0.72rem] font-semibold mb-3 -mt-2"
                    style={{ color: "var(--success)" }}
                  >
                    Economize R${plan.originalPrice - plan.price}
                  </div>
                )}

                {/* CTA Button */}
                <a
                  href={`/checkout/${plan.slug}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 md:py-4 rounded-full font-bold text-white text-sm uppercase tracking-wide active:scale-[0.98] transition-transform"
                  style={{
                    background: "var(--whatsapp)",
                    boxShadow: plan.popular
                      ? "0 6px 20px rgba(37, 211, 102, 0.35)"
                      : "0 4px 14px rgba(37, 211, 102, 0.3)",
                  }}
                >
                  {plan.popular ? "QUERO INVESTIGAÇÃO COMPLETA" : "CONTRATE JÁ"}
                </a>

                <p className="text-center text-[0.65rem] mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                  Pagamento único · Sem assinatura · Resultado em 5min
                </p>
                {plan.popular && (
                  <div className="text-center mt-2.5">
                    <a
                      href="#relatorio-heading"
                      className="inline-flex items-center gap-1 text-[0.7rem] font-semibold underline underline-offset-2 transition-colors hover:opacity-80"
                      style={{ color: "var(--primary)" }}
                    >
                      {"Ver demonstra\u00E7\u00E3o da investiga\u00E7\u00E3o completa \u2193"}
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Trust Strip */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-12">
          {[
            { icon: "🔒", label: "Pagamento Seguro" },
            { icon: "📱", label: "Via WhatsApp" },
            { icon: "⚡", label: "Resposta Imediata" },
            { icon: "🛡️", label: "100% Sigiloso" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-1.5 text-[0.7rem] md:text-[0.8rem] font-medium"
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
