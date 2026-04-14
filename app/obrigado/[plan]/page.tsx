"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Check, ChevronRight, Shield, Clock, ArrowRight } from "lucide-react"

/* ═══════════════════════════════════════════════════════════════════════
   UPSELL CONFIG — dados de cada plano
   ═══════════════════════════════════════════════════════════════════════ */

const UPSELL_PRICE = 97
const ORIGINAL_PRICE = 197
const TIMER_SECONDS = 15 * 60 // 15 minutos
const WA_NUMBER = "5586999488117"

interface UpsellConfig {
  planName: string
  planPrice: number
  badge: string
  headline: string
  subheadline: string
  features: string[]
  ctaText: string
  persuasion: string
}

const upsellConfigs: Record<string, UpsellConfig> = {
  "nome-cpf": {
    planName: "Pelo Nome/CPF",
    planPrice: 40,
    badge: "OFERTA EXCLUSIVA PARA VOC\u00CA",
    headline: "Quer Descobrir TUDO?",
    subheadline: "Voc\u00EA contratou a investiga\u00E7\u00E3o b\u00E1sica. Veja o que est\u00E1 perdendo com o relat\u00F3rio Premium:",
    features: [
      "Tudo que voc\u00EA j\u00E1 contratou +",
      "Ve\u00EDculos registrados (placa, modelo, situa\u00E7\u00E3o)",
      "Score de cr\u00E9dito e d\u00EDvidas ativas",
      "Processos judiciais em todos os tribunais",
      "Participa\u00E7\u00E3o em empresas (CNPJ e s\u00F3cios)",
      "Parentes pr\u00F3ximos com Nome e CPF",
      "Resumo investigativo completo + Parecer do analista",
      "Pontos de aten\u00E7\u00E3o e an\u00E1lise de risco",
    ],
    ctaText: "QUERO A INVESTIGA\u00C7\u00C3O COMPLETA POR R$97",
    persuasion: "92% dos clientes que come\u00E7am com o plano b\u00E1sico acabam precisando dessas informa\u00E7\u00F5es depois \u2014 e pagam o pre\u00E7o cheio. Aproveite agora.",
  },
  "celular-placa": {
    planName: "Pelo Celular/Placa",
    planPrice: 79,
    badge: "UPGRADE EXCLUSIVO",
    headline: "Complete Sua Investiga\u00E7\u00E3o",
    subheadline: "Voc\u00EA j\u00E1 deu o primeiro passo. Desbloqueie o relat\u00F3rio completo com tudo isso:",
    features: [
      "Tudo que voc\u00EA j\u00E1 contratou +",
      "Score de cr\u00E9dito e restri\u00E7\u00F5es financeiras",
      "Processos judiciais como r\u00E9u e autor",
      "Participa\u00E7\u00E3o em empresas (CNPJ e s\u00F3cios)",
      "Hist\u00F3rico completo de endere\u00E7os",
      "Resumo investigativo narrativo",
      "Parecer do analista com n\u00EDvel de risco",
      "Pontos de aten\u00E7\u00E3o e alertas cr\u00EDticos",
    ],
    ctaText: "QUERO O RELAT\u00D3RIO COMPLETO POR R$97",
    persuasion: "Clientes que completam a investiga\u00E7\u00E3o t\u00EAm 3x mais chances de resolver sua situa\u00E7\u00E3o. N\u00E3o fique com informa\u00E7\u00F5es pela metade.",
  },
  "premium": {
    planName: "Investiga\u00E7\u00E3o Premium",
    planPrice: 197,
    badge: "OFERTA POR TEMPO LIMITADO",
    headline: "Precisa Investigar Outra Pessoa?",
    subheadline: "Voc\u00EA j\u00E1 sabe o poder da nossa investiga\u00E7\u00E3o. Use novamente com 50% de desconto:",
    features: [
      "Investiga\u00E7\u00E3o Premium completa em outra pessoa",
      "Todos os dados: CPF, endere\u00E7os, telefones, e-mails",
      "Ve\u00EDculos, processos judiciais e score financeiro",
      "Redes sociais, parentes e v\u00EDnculos familiares",
      "Participa\u00E7\u00E3o em empresas e CNPJ",
      "Resumo investigativo + parecer do analista",
      "Pontos de aten\u00E7\u00E3o e an\u00E1lise de risco",
      "Resultado em at\u00E9 5 minutos no WhatsApp",
    ],
    ctaText: "SIM, QUERO INVESTIGAR OUTRA PESSOA POR R$97",
    persuasion: "Esta oferta de 50% \u00E9 exclusiva para quem acabou de contratar. Depois desta p\u00E1gina, o pre\u00E7o volta a R$197.",
  },
}

/* ═══════════════════════════════════════════════════════════════════════
   TIMER COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

function CountdownTimer({ timeLeft }: { timeLeft: number }) {
  const m = Math.floor(timeLeft / 60)
  const s = timeLeft % 60
  return (
    <div className="flex items-center justify-center gap-2">
      <Clock size={16} style={{ color: "#dc2626" }} />
      <span className="text-[0.78rem] font-bold" style={{ color: "#dc2626" }}>
        {"Oferta expira em "}
      </span>
      <div className="flex items-center gap-1">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-bold text-white" style={{ background: "#1a1a1f" }}>
          {String(m).padStart(2, "0")}
        </span>
        <span className="text-sm font-bold" style={{ color: "#1a1a1f" }}>:</span>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-bold text-white" style={{ background: "#1a1a1f" }}>
          {String(s).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT (inner, uses useSearchParams)
   ═══════════════════════════════════════════════════════════════════════ */

function ObrigadoContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const planSlug = params.plan as string
  const nome = searchParams.get("nome") || ""

  const config = upsellConfigs[planSlug]
  const isUpsellPlan = planSlug === "upgrade-premium"

  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)

  useEffect(() => {
    if (isUpsellPlan) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isUpsellPlan])

  // Upsell plan: simple thank you, no upsell
  if (isUpsellPlan) {
    return (
      <div className="min-h-screen py-8 px-4" style={{ background: "var(--background)" }}>
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Link href="/"><Image src="/logo.png" alt="Detetive VIP" width={140} height={36} style={{ height: "36px", width: "auto" }} /></Link>
          </div>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(37,211,102,0.15)" }}>
            <CheckCircle2 size={40} style={{ color: "var(--success)" }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>{"Pagamento Confirmado!"}</h1>
          <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
            {"Seu relat\u00F3rio ser\u00E1 enviado no WhatsApp em at\u00E9 5 minutos. Para agilizar, envie uma mensagem confirmando:"}
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Ol\u00E1! Acabei de pagar a Investiga\u00E7\u00E3o Premium (R$97).${nome ? ` Meu nome: ${nome}.` : ""} Aguardo o resultado!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-sm uppercase tracking-wide w-full max-w-xs mb-4"
            style={{ background: "var(--whatsapp)", boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}
          >
            Confirmar no WhatsApp
          </a>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mt-2" style={{ color: "var(--muted-foreground)" }}>
            Voltar ao site
          </Link>
        </div>
      </div>
    )
  }

  // Invalid plan slug
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4" style={{ background: "var(--background)" }}>
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">{"P\u00E1gina n\u00E3o encontrada"}</h1>
          <Link href="/" className="text-sm font-medium underline" style={{ color: "var(--primary)" }}>Voltar ao site</Link>
        </div>
      </div>
    )
  }

  const waText = `Ol\u00E1! Acabei de pagar o plano ${config.planName} (R$${config.planPrice}).${nome ? ` Meu nome: ${nome}.` : ""} Aguardo o resultado!`

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* ── Header ── */}
      <div className="flex justify-center py-5 px-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <Link href="/"><Image src="/logo.png" alt="Detetive VIP" width={130} height={34} style={{ height: "34px", width: "auto" }} /></Link>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">

        {/* ════════════════════════════════════════════════════════════════
            SEÇÃO 1: CONFIRMAÇÃO DO PAGAMENTO
        ════════════════════════════════════════════════════════════════ */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(37,211,102,0.12)" }}>
            <CheckCircle2 size={32} style={{ color: "var(--success)" }} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
            {"Pagamento Confirmado!"}
          </h1>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--whatsapp)" }}>
            R${config.planPrice},00 — {config.planName}
          </p>
          <p className="text-[0.8rem]" style={{ color: "var(--muted-foreground)" }}>
            {"Seu relat\u00F3rio ser\u00E1 enviado no WhatsApp em at\u00E9 5 minutos."}
          </p>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white text-sm uppercase tracking-wide mb-8"
          style={{ background: "var(--whatsapp)", boxShadow: "0 4px 14px rgba(37,211,102,0.25)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          {"Confirmar Pedido no WhatsApp"}
        </a>

        {/* ════════════════════════════════════════════════════════════════
            SEÇÃO 2: UPSELL
        ════════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(184,150,63,0.2)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

          {/* Badge + Timer */}
          <div className="px-5 py-4 text-center" style={{ background: "linear-gradient(135deg, #1a1a1f 0%, #2a2a32 100%)" }}>
            <span className="inline-block text-[0.6rem] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3" style={{ background: "rgba(184,150,63,0.2)", color: "var(--primary-light)" }}>
              {config.badge}
            </span>
            {timeLeft > 0 && <CountdownTimer timeLeft={timeLeft} />}
          </div>

          {/* Content */}
          <div className="px-5 py-6 md:px-7" style={{ background: "#fff" }}>

            {/* Headline */}
            <h2 className="font-serif text-[1.4rem] md:text-[1.7rem] font-bold text-center leading-tight mb-2" style={{ color: "var(--foreground)" }}>
              {config.headline}
            </h2>
            <p className="text-[0.82rem] text-center leading-relaxed mb-5" style={{ color: "var(--muted-foreground)" }}>
              {config.subheadline}
            </p>

            {/* Features */}
            <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(22,163,74,0.03)", border: "1px solid rgba(22,163,74,0.1)" }}>
              <ul className="space-y-2.5">
                {config.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.8rem]" style={{ color: "var(--foreground)" }}>
                    <Check size={16} className="shrink-0 mt-0.5" strokeWidth={3} style={{ color: "#16a34a" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className="text-center mb-5">
              <div className="flex items-center justify-center gap-3">
                <span className="text-sm line-through" style={{ color: "var(--muted)" }}>R${ORIGINAL_PRICE},00</span>
                <span className="text-[0.65rem] font-bold uppercase px-2 py-0.5 rounded" style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626" }}>50% OFF</span>
              </div>
              <div className="flex items-baseline justify-center gap-1 mt-1">
                <span className="text-sm" style={{ color: "var(--primary)" }}>R$</span>
                <span className="text-4xl font-extrabold" style={{ color: "var(--primary-dark)" }}>{UPSELL_PRICE}</span>
                <span style={{ color: "var(--primary)" }}>,00</span>
              </div>
              <p className="text-[0.65rem] mt-1" style={{ color: "var(--muted)" }}>Pagamento {"\u00FA"}nico via PIX</p>
            </div>

            {/* CTA */}
            <Link
              href="/checkout/upgrade-premium"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white text-[0.85rem] uppercase tracking-wide transition-all active:scale-[0.98]"
              style={{ background: "var(--whatsapp)", boxShadow: "0 6px 24px rgba(37,211,102,0.35)" }}
            >
              {config.ctaText}
              <ChevronRight size={18} />
            </Link>

            {/* Persuasion */}
            <p className="text-[0.72rem] text-center leading-relaxed mt-4 px-2" style={{ color: "var(--muted-foreground)" }}>
              {config.persuasion}
            </p>

            {/* Trust */}
            <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
              <span className="flex items-center gap-1 text-[0.62rem] font-medium" style={{ color: "var(--muted)" }}>
                <Shield size={11} /> 100% Sigiloso
              </span>
              <span className="flex items-center gap-1 text-[0.62rem] font-medium" style={{ color: "var(--muted)" }}>
                <CheckCircle2 size={11} /> Pagamento {"\u00DA"}nico
              </span>
              <span className="flex items-center gap-1 text-[0.62rem] font-medium" style={{ color: "var(--muted)" }}>
                <Shield size={11} /> Lei 13.432/17
              </span>
            </div>
          </div>

          {/* Skip */}
          <div className="px-5 py-4 text-center" style={{ background: "rgba(0,0,0,0.015)", borderTop: "1px solid var(--border)" }}>
            <Link href="/" className="text-[0.72rem] font-medium underline underline-offset-2" style={{ color: "var(--muted)" }}>
              {"N\u00E3o obrigado, voltar ao site"}
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[0.65rem] mt-6" style={{ color: "var(--muted)" }}>
          {"detetive.vip \u00A9 2026 \u2014 Todos os direitos reservados"}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE WRAPPER (Suspense boundary for useSearchParams)
   ═══════════════════════════════════════════════════════════════════════ */

export default function ObrigadoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }} />
      </div>
    }>
      <ObrigadoContent />
    </Suspense>
  )
}
