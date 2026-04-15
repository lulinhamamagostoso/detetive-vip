"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Lock, CheckCircle2, ExternalLink, Copy, Check, Loader2, Clock, Shield, MessageCircle } from "lucide-react"
import { trackViewContent, trackInitiateCheckout, trackAddPaymentInfo, trackPurchase } from "@/lib/tracking-events"

// ── Dados dos planos (sincronizados com api/pix/route.ts) ────────────
const plansData: Record<string, {
  name: string
  price: number
  originalPrice: number
  description: string
  inputPlaceholder: string
  inputInstruction: string
  features: string[]
}> = {
  "nome-cpf": {
    name: "Pelo NOME OU CPF",
    price: 40,
    originalPrice: 70,
    description: "Investigacao completa a partir de nome ou CPF",
    inputPlaceholder: "Ex: Joao da Silva Santos\nCPF: 123.456.789-00\nInfo extra ajuda: cidade, idade, etc.",
    inputInstruction: "Informe nome parcial, abreviado ou completo, ou CPF da pessoa que deseja investigar.",
    features: [
      "Nome Completo e Data de Nascimento",
      "Telefone(s) Celular e Fixo",
      "Endereco(s) Atualizados",
      "E-mail(s) e Redes Sociais",
      "Faixa de Renda e Profissao",
    ],
  },
  "celular-placa": {
    name: "Pelo N Celular ou Placa",
    price: 79,
    originalPrice: 115,
    description: "Descubra tudo sobre o titular do numero ou veiculo",
    inputPlaceholder: "Ex: (11) 98765-4321\nOu placa: ABC-1234 / ABC1D23\nInfo extra: cidade, modelo do carro, etc.",
    inputInstruction: "Informe o numero de celular ou a placa do veiculo que deseja investigar.",
    features: [
      "Nome Completo e CPF do Titular",
      "Telefone(s) e Endereco(s)",
      "Nome da Mae e Vinculos",
      "E-mail(s) e Redes Sociais",
      "Faixa de Renda e Profissao",
    ],
  },
  "premium": {
    name: "Investigacao Premium",
    price: 197,
    originalPrice: 307,
    description: "Investigacao completa com 20+ bancos de dados oficiais e 2.000+ fontes abertas",
    inputPlaceholder: "Ex: Joao da Silva Santos\nCPF: 123.456.789-00\nTelefone: (11) 98765-4321\nE-mail: joao@exemplo.com\nOu chave PIX / placa.",
    inputInstruction: "Coloque qualquer dado que voce tenha: nome, CPF, telefone, placa, chave PIX, e-mail... Quanto mais info, melhor.",
    features: [
      "Nome Completo, CPF, RG e Data de Nascimento",
      "Todos os Telefones (Celular e Fixo)",
      "Todos os Enderecos Vinculados",
      "E-mails e Redes Sociais",
      "Veiculos, Placa e Modelo",
      "Parentes Proximos (Nome e CPF)",
      "Score, Dividas e Processos Judiciais",
      "Faixa de Renda e Profissao",
      "Participacao em Empresas (CNPJ)",
      "Resumo investigativo + Parecer do analista",
      "Pontos de atencao e analise de risco",
    ],
  },
  "upgrade-premium": {
    name: "Investigacao Premium",
    price: 97,
    originalPrice: 197,
    description: "Investigacao completa com 20+ bancos de dados — Oferta exclusiva",
    inputPlaceholder: "Ex: Joao da Silva Santos\nCPF: 123.456.789-00\nTelefone: (11) 98765-4321\nE-mail: joao@exemplo.com\nOu chave PIX / placa.",
    inputInstruction: "Coloque qualquer dado que voce tenha: nome, CPF, telefone, placa, chave PIX, e-mail... Quanto mais info, melhor.",
    features: [
      "Nome Completo, CPF, RG e Data de Nascimento",
      "Todos os Telefones (Celular e Fixo)",
      "Todos os Enderecos Vinculados",
      "E-mails e Redes Sociais",
      "Veiculos, Placa e Modelo",
      "Parentes Proximos (Nome e CPF)",
      "Score, Dividas e Processos Judiciais",
      "Faixa de Renda e Profissao",
      "Participacao em Empresas (CNPJ)",
      "Resumo investigativo + Parecer do analista",
      "Pontos de atencao e analise de risco",
    ],
  },
}

// ── Estados possíveis do checkout ────────────────────────────────────
type CheckoutStep = "form" | "payment" | "pix" | "success"

// ── Stepper visual ──────────────────────────────────────────────────
const stepLabels = ["Dados", "Pagamento", "Investigação"]
const stepMap: Record<CheckoutStep, number> = { form: 0, payment: 1, pix: 1, success: 2 }

function CheckoutStepper({ current }: { current: CheckoutStep }) {
  const activeIndex = stepMap[current]
  return (
    <div className="flex items-center justify-center gap-1 mb-6" aria-label={`Etapa ${activeIndex + 1} de 3: ${stepLabels[activeIndex]}`}>
      {stepLabels.map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div className="flex flex-col items-center">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
              style={{
                background: i <= activeIndex ? "var(--primary)" : "var(--border)",
                color: i <= activeIndex ? "white" : "var(--muted)",
              }}
            >
              {i < activeIndex ? "✓" : i + 1}
            </div>
            <span
              className="text-[0.6rem] mt-1 font-medium"
              style={{ color: i <= activeIndex ? "var(--primary)" : "var(--muted)" }}
            >
              {label}
            </span>
          </div>
          {i < stepLabels.length - 1 && (
            <div
              className="w-8 md:w-12 h-px mb-4"
              style={{ background: i < activeIndex ? "var(--primary)" : "var(--border)" }}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Tipo para dados do PIX ───────────────────────────────────────────
interface PixPaymentData {
  qr_code: string
  qr_code_base64: string
  transaction_id: string
  expires_at: string | null
  created_at: number
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const planSlug = typeof params.plan === "string" ? params.plan : ""
  const plan = plansData[planSlug]

  // Form
  const [nome, setNome] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [email, setEmail] = useState("")
  const [dados, setDados] = useState("")

  // Checkout state
  const [step, setStep] = useState<CheckoutStep>("form")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pixData, setPixData] = useState<PixPaymentData | null>(null)
  const [copied, setCopied] = useState(false)
  const [pixError, setPixError] = useState("")
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<string>("waiting")

  // Refs para cleanup
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalPrice = plan?.price || 0

  // ── ViewContent quando a página carrega ───────────────────────────────
  useEffect(() => {
    if (plan) {
      // trackViewContent já envia client + server (CAPI) com deduplicação
      trackViewContent({
        content_name: plan.name,
        content_category: planSlug,
        value: plan.price,
      })
    }
  }, [planSlug, plan])

  // ── Cleanup geral ao desmontar ──────────────────────────────────────
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  // ── Polling de status do pagamento ──────────────────────────────────
  const startPolling = useCallback((transactionId: string) => {
    // Limpa polling anterior se existir
    if (pollingRef.current) clearInterval(pollingRef.current)

    let attempts = 0
    const MAX_ATTEMPTS = 180 // 15 min com intervalo de 5s

    const checkStatus = async () => {
      attempts++
      if (attempts > MAX_ATTEMPTS) {
        if (pollingRef.current) clearInterval(pollingRef.current)
        setPaymentStatus("expired")
        return
      }

      try {
        const res = await fetch(`/api/pix/status?id=${encodeURIComponent(transactionId)}`)
        if (!res.ok) return

        const data = await res.json()

        if (data.status === "paid") {
          if (pollingRef.current) clearInterval(pollingRef.current)
          if (countdownRef.current) clearInterval(countdownRef.current)
          setPaymentStatus("paid")
          // Rastrear compra (client + server)
          if (plan) {
            trackPurchase({
              value: plan.price,
              content_name: plan.name,
              content_category: planSlug,
              email,
              phone,
              nome,
            })
          }
          // Redirecionar para página de obrigado com upsell
          router.push(`/obrigado/${planSlug}?nome=${encodeURIComponent(nome)}`)
        } else if (data.status === "refused" || data.status === "chargedback") {
          if (pollingRef.current) clearInterval(pollingRef.current)
          setPaymentStatus("refused")
          setPixError("Pagamento recusado. Tente novamente.")
        }
      } catch {
        // Erro silencioso no polling — vai tentar de novo
      }
    }

    // Primeira verificação após 3s, depois a cada 5s
    setTimeout(checkStatus, 3000)
    pollingRef.current = setInterval(checkStatus, 5000)
  }, [plan, planSlug, email, phone, nome, router])

  // ── Countdown de expiração ──────────────────────────────────────────
  const startCountdown = useCallback((expiresAt: string | null, createdAt: number) => {
    if (countdownRef.current) clearInterval(countdownRef.current)

    // Se tem data de expiração, usa ela; senão estima 30 min
    const expirationTime = expiresAt
      ? new Date(expiresAt).getTime()
      : createdAt + 30 * 60 * 1000

    const updateCountdown = () => {
      const remaining = Math.max(0, expirationTime - Date.now())
      setTimeLeft(Math.floor(remaining / 1000))

      if (remaining <= 0) {
        if (countdownRef.current) clearInterval(countdownRef.current)
        if (pollingRef.current) clearInterval(pollingRef.current)
        setPaymentStatus("expired")
      }
    }

    updateCountdown()
    countdownRef.current = setInterval(updateCountdown, 1000)
  }, [])

  // ── Formata tempo restante ──────────────────────────────────────────
  const formatTimeLeft = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  // ── Plano não encontrado ───────────────────────────────────────────
  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--background)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Plano não encontrado</h1>
          <Link
            href="/#planos"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--primary)" }}
          >
            <ArrowLeft size={16} />
            Voltar para os planos
          </Link>
        </div>
      </div>
    )
  }

  // ── Máscara de telefone brasileiro ──────────────────────────────────
  const formatPhone = (value: string) => {
    // Remove tudo que não for dígito
    const digits = value.replace(/\D/g, "").slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
    if (phoneError) setPhoneError("")
  }

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length < 10) return "Telefone incompleto. Informe DDD + número."
    if (digits.length === 10 || digits.length === 11) return ""
    return "Formato inválido."
  }

  // ── Submit do formulário ────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const phoneValidation = validatePhone(phone)
    if (phoneValidation) {
      setPhoneError(phoneValidation)
      return
    }

    // Validação client-side básica
    if (!nome.trim() || !phone.trim() || !dados.trim()) {
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setStep("payment")
      window.scrollTo({ top: 0, behavior: "instant" })
      // trackInitiateCheckout já envia client + server (CAPI) com deduplicação
      trackInitiateCheckout({
        value: totalPrice,
        content_category: planSlug,
      })
    }, 400)
  }

  // ── Gerar PIX ──────────────────────────────────────────────────────
  const handlePayment = async () => {
    setIsSubmitting(true)
    setPixError("")

    try {
      // 1. Envia dados para Formspree (fire-and-forget, mas com log de erro)
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xzdkqqkp"
      fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plano: plan.name,
          valor: `R$${totalPrice},00`,
          nome,
          whatsapp: phone,
          email: email || "Não informado",
          dados_investigar: dados,
          metodo_pagamento: "Pix",
        }),
      }).catch((err) => console.error("[Formspree] Erro ao enviar lead:", err))

      // 2. Gera PIX via API (enviar planSlug ao invés de planName)
      const pixResponse = await fetch("/api/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planSlug,
          customerName: nome,
          customerPhone: phone,
          customerEmail: email || undefined,
        }),
      })

      if (!pixResponse.ok) {
        const errorData = await pixResponse.json().catch(() => ({ error: "Erro desconhecido" }))
        setPixError(errorData.error || "Erro ao gerar PIX. Tente novamente.")
        return
      }

      const pixResult = await pixResponse.json()

      if (pixResult.success) {
        const paymentData: PixPaymentData = {
          qr_code: pixResult.qr_code,
          qr_code_base64: pixResult.qr_code_base64,
          transaction_id: pixResult.transaction_id,
          expires_at: pixResult.expires_at || null,
          created_at: Date.now(),
        }

        setPixData(paymentData)
        setStep("pix")
        setPaymentStatus("waiting")
        window.scrollTo({ top: 0, behavior: "instant" })
        // Rastrear AddPaymentInfo (PIX gerado)
        trackAddPaymentInfo({ value: totalPrice, content_category: planSlug })

        // Inicia polling e countdown
        startPolling(pixResult.transaction_id)
        startCountdown(pixResult.expires_at, paymentData.created_at)
      } else {
        setPixError(pixResult.error || "Erro ao gerar PIX. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error)
      setPixError("Erro de conexão. Verifique sua internet e tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Copiar código PIX ──────────────────────────────────────────────
  const copyPixCode = async () => {
    if (!pixData?.qr_code) return

    try {
      await navigator.clipboard.writeText(pixData.qr_code)
      setCopied(true)
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current)
      copiedTimeoutRef.current = setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback para navegadores que não suportam clipboard API
      try {
        const textarea = document.createElement("textarea")
        textarea.value = pixData.qr_code
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
        setCopied(true)
        if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current)
        copiedTimeoutRef.current = setTimeout(() => setCopied(false), 3000)
      } catch {
        setPixError("Não foi possível copiar. Selecione o código manualmente.")
      }
    }
  }

  // ════════════════════════════════════════════════════════════════════
  //  TELA: QR CODE PIX
  // ════════════════════════════════════════════════════════════════════
  if (step === "pix" && pixData) {
    return (
      <div className="min-h-screen py-8 px-4" style={{ background: "var(--background)" }}>
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => {
                if (pollingRef.current) clearInterval(pollingRef.current)
                if (countdownRef.current) clearInterval(countdownRef.current)
                setStep("payment")
                setPixData(null)
                setPaymentStatus("waiting")
                setTimeLeft(null)
                window.scrollTo({ top: 0, behavior: "instant" })
              }}
              className="inline-flex items-center gap-2 text-sm font-medium mb-6"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ArrowLeft size={16} />
              Voltar
            </button>

            <div className="flex justify-center mb-6">
              <Image
                src="/logo.webp"
                alt="Detetive VIP"
                width={400}
                height={105}
                style={{ height: "40px", width: "auto" }}
                priority
              />
            </div>
          </div>

          <CheckoutStepper current="pix" />

          <div className="text-center mb-6">
            <h1
              className="text-xl md:text-2xl font-bold mb-2"
              style={{ color: "var(--primary-dark)" }}
            >
              Pague com Pix
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Escaneie o QR Code ou copie o código
            </p>
          </div>

          {/* Countdown de expiração */}
          {timeLeft !== null && timeLeft > 0 && paymentStatus === "waiting" && (
            <div
              className="flex items-center justify-center gap-2 mb-4 py-2 px-4 rounded-lg mx-auto w-fit"
              style={{
                background: timeLeft < 300 ? "rgba(220, 38, 38, 0.1)" : "rgba(37, 211, 102, 0.08)",
                color: timeLeft < 300 ? "#dc2626" : "var(--muted-foreground)",
              }}
            >
              <Clock size={14} />
              <span className="text-sm font-medium">
                Expira em {formatTimeLeft(timeLeft)}
              </span>
            </div>
          )}

          {/* Status de expiração */}
          {paymentStatus === "expired" && (
            <div
              className="mb-4 p-4 rounded-xl text-center"
              style={{ background: "rgba(220, 38, 38, 0.06)", border: "1px solid rgba(220, 38, 38, 0.2)" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "#dc2626" }}>
                QR Code expirado
              </p>
              <p className="text-[0.72rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                Tranquilo — seus dados foram salvos e você <strong>não precisa preencher de novo</strong>. Basta gerar um novo código.
              </p>
              <button
                onClick={() => {
                  setStep("payment")
                  setPixData(null)
                  setPaymentStatus("waiting")
                  setTimeLeft(null)
                  window.scrollTo({ top: 0, behavior: "instant" })
                }}
                className="mt-3 text-sm font-semibold underline"
                style={{ color: "var(--primary)" }}
              >
                Gerar novo QR Code
              </button>
            </div>
          )}

          {/* Indicador de verificação ativa */}
          {paymentStatus === "waiting" && (
            <div className="flex flex-col items-center justify-center gap-1 mb-4 text-center">
              <div className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" style={{ color: "var(--whatsapp)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                  Confirmação automática ativa
                </span>
              </div>
              <p className="text-[0.7rem] px-4" style={{ color: "var(--muted)" }}>
                Pode fechar essa página. A confirmação chega automaticamente no seu WhatsApp.
              </p>
            </div>
          )}

          {/* QR Code Card */}
          <div
            className="p-6 rounded-2xl text-center mb-4"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              opacity: paymentStatus === "expired" ? 0.4 : 1,
              pointerEvents: paymentStatus === "expired" ? "none" : "auto",
            }}
          >
            {/* Amount */}
            <div className="mb-3">
              <span className="text-sm" style={{ color: "var(--muted)" }}>Valor a pagar</span>
              <p className="font-bold text-2xl" style={{ color: "var(--whatsapp)" }}>
                R$ {totalPrice},00
              </p>
            </div>

            {/* Sigilo no extrato */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-[0.7rem] text-left"
              style={{
                background: "rgba(37, 211, 102, 0.06)",
                border: "1px solid rgba(37, 211, 102, 0.15)",
                color: "var(--muted-foreground)",
              }}
            >
              <Shield size={13} className="shrink-0" style={{ color: "var(--whatsapp)" }} aria-hidden="true" />
              <span>
                No extrato aparece como{" "}
                <strong style={{ color: "var(--foreground)" }}>SERV DIGITAIS</strong>
              </span>
            </div>

            {/* QR Code */}
            <div
              className="inline-block p-4 rounded-xl mb-4"
              style={{ background: "white" }}
            >
              {pixData.qr_code_base64 ? (
                <img
                  src={pixData.qr_code_base64.startsWith("data:") ? pixData.qr_code_base64 : `data:image/png;base64,${pixData.qr_code_base64}`}
                  alt={`QR Code PIX para pagamento de R$ ${totalPrice},00`}
                  className="w-48 h-48 md:w-56 md:h-56"
                />
              ) : (
                <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center bg-gray-100 rounded">
                  <span className="text-sm text-gray-500">QR Code indisponível</span>
                </div>
              )}
            </div>

            {/* Pix Code */}
            <div className="mb-4">
              <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
                Ou copie o código Pix:
              </p>
              <div
                className="p-3 rounded-lg text-xs break-all max-h-20 overflow-y-auto text-left select-all"
                style={{
                  background: "var(--background-secondary)",
                  color: "var(--muted-foreground)",
                  fontFamily: "monospace",
                }}
              >
                {pixData.qr_code}
              </div>
            </div>

            {/* Copy Button — CTA principal */}
            <button
              onClick={copyPixCode}
              className="w-full flex flex-col items-center justify-center gap-1 py-4 rounded-xl font-bold text-white transition-all active:scale-[0.98]"
              style={{
                background: copied ? "var(--success)" : "var(--whatsapp)",
                boxShadow: copied ? "0 4px 20px rgba(34, 197, 94, 0.3)" : "0 4px 20px rgba(37, 211, 102, 0.3)",
              }}
            >
              {copied ? (
                <>
                  <div className="flex items-center gap-2">
                    <Check size={18} />
                    <span className="text-base uppercase tracking-wide">Codigo Copiado!</span>
                  </div>
                  <span className="text-[0.65rem] font-normal opacity-90">
                    Agora cole no app do seu banco
                  </span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Copy size={18} />
                    <span className="text-base uppercase tracking-wide">Copiar Codigo Pix</span>
                  </div>
                  <span className="text-[0.65rem] font-normal opacity-90">
                    Toque aqui e depois cole no app do banco
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Instrucao simplificada */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(37, 211, 102, 0.05)",
              border: "1px solid rgba(37, 211, 102, 0.2)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                style={{ background: "var(--whatsapp)", color: "white" }}
              >
                1
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  Abra o app do seu banco
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Nubank, Inter, Itau, Bradesco, etc.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                style={{ background: "var(--whatsapp)", color: "white" }}
              >
                2
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  Escaneie o QR ou cole o codigo
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Va em Pix {">"} Pagar {">"} QR Code ou Copia e Cola
                </p>
              </div>
            </div>
            <div
              className="mt-4 p-3 rounded-lg text-center"
              style={{ background: "rgba(37, 211, 102, 0.1)" }}
            >
              <p className="text-xs font-semibold" style={{ color: "var(--whatsapp)" }}>
                Apos pagar, voce recebe o resultado no WhatsApp em ate 5 minutos
              </p>
            </div>
          </div>

          {/* Error */}
          {pixError && (
            <div
              className="mt-4 p-3 rounded-lg text-sm text-center"
              style={{ background: "rgba(220, 38, 38, 0.1)", color: "#dc2626" }}
            >
              {pixError}
            </div>
          )}

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
            <Lock size={14} aria-hidden="true" />
            <span>Pagamento 100% seguro</span>
          </div>
        </div>
      </div>
    )
  }

  // ════════════════════════════════════════════════════════════════════
  //  TELA: PAGAMENTO
  // ════════════════════════════════════════════════════════════════════
  if (step === "payment") {
    return (
      <div className="min-h-screen py-8 px-4" style={{ background: "var(--background)" }}>
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => { setStep("form"); window.scrollTo({ top: 0, behavior: "instant" }) }}
              className="inline-flex items-center gap-2 text-sm font-medium mb-6"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ArrowLeft size={16} />
              Voltar
            </button>

            <div className="flex justify-center mb-6">
              <Image
                src="/logo.webp"
                alt="Detetive VIP"
                width={400}
                height={105}
                style={{ height: "40px", width: "auto" }}
              />
            </div>
          </div>

          <CheckoutStepper current="payment" />

          <div className="text-center mb-6">
            <h1
              className="text-xl md:text-2xl font-bold mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Confirme e pague para iniciar
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Investigacao comeca imediatamente apos o pagamento
            </p>
          </div>

          {/* Resumo compacto */}
          <div
            className="p-4 rounded-xl mb-4"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Dados resumidos */}
            <div className="space-y-2 mb-3 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--muted)" }}>Plano:</span>
                <span className="font-medium" style={{ color: "var(--foreground)" }}>{plan.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--muted)" }}>Enviar para:</span>
                <span className="font-medium" style={{ color: "var(--whatsapp)" }}>{phone}</span>
              </div>
            </div>
            
            {/* Badges de seguranca */}
            <div className="space-y-2 mb-3">
              <div
                className="flex items-center gap-2 text-[0.7rem]"
                style={{ color: "var(--muted-foreground)" }}
              >
                <Shield size={12} className="shrink-0" style={{ color: "var(--whatsapp)" }} />
                <span>No extrato aparece como <strong style={{ color: "var(--foreground)" }}>SERV DIGITAIS</strong></span>
              </div>
              <div
                className="flex items-center gap-2 text-[0.7rem]"
                style={{ color: "var(--muted-foreground)" }}
              >
                <MessageCircle size={12} className="shrink-0" style={{ color: "var(--whatsapp)" }} />
                <span>Entrega discreta, sem identificar investigacao</span>
              </div>
            </div>
            
            {/* Total destacado */}
            <div
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ background: "rgba(184, 150, 63, 0.08)" }}
            >
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Total a pagar:</span>
              <span className="font-bold text-xl" style={{ color: "var(--primary)" }}>
                R$ {totalPrice},00
              </span>
            </div>
          </div>

          {/* Payment Section */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Lock size={18} style={{ color: "var(--foreground)" }} aria-hidden="true" />
              <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
                Pagamento Seguro
              </h3>
            </div>
            <p className="font-bold text-lg mb-3" style={{ color: "var(--primary)" }}>
              R$ {totalPrice},00
            </p>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
              <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: "var(--success)" }} />
              Pagamento 100% seguro
            </p>

            {/* Payment Method - Pix Only */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{
                background: "rgba(37, 211, 102, 0.05)",
                border: "2px solid var(--whatsapp)",
              }}
            >
              <Image src="/pix-icon.png" alt="Pix" width={28} height={28} />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                    Pix
                  </span>
                  <span
                    className="text-[0.6rem] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "var(--whatsapp)", color: "white" }}
                  >
                    Receba a verdade em minutos
                  </span>
                </div>
                <p className="text-[0.65rem] mt-1 flex items-center gap-1" style={{ color: "var(--muted)" }}>
                  <Shield size={10} className="shrink-0" aria-hidden="true" />
                  100% sigiloso — o investigado não é notificado
                </p>
              </div>
            </div>

            {/* Social proof em tempo real */}
            <div className="flex items-center justify-center gap-2 mt-4 mb-1">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--whatsapp)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--whatsapp)" }} />
              </span>
              <span className="text-[0.7rem]" style={{ color: "var(--muted)" }}>
                <strong style={{ color: "var(--foreground)" }}>127 investigações</strong> realizadas esta semana
              </span>
            </div>

            {/* Error Message */}
            {pixError && (
              <div
                className="mt-4 p-3 rounded-lg text-sm text-center"
                style={{ background: "rgba(220, 38, 38, 0.1)", color: "#dc2626" }}
              >
                {pixError}
              </div>
            )}

            {/* Pay Button — CTA ultra claro */}
            <button
              onClick={handlePayment}
              disabled={isSubmitting}
              className="w-full flex flex-col items-center justify-center gap-1 py-4 rounded-xl font-bold text-white text-base uppercase tracking-wide mt-6 transition-all active:scale-[0.98] disabled:opacity-70"
              style={{
                background: "var(--whatsapp)",
                boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    <span>Gerando seu PIX...</span>
                  </div>
                  <span className="text-[0.65rem] font-normal opacity-80">Aguarde alguns segundos</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span>GERAR MEU PIX DE R$ {totalPrice}</span>
                  </div>
                  <span className="text-[0.65rem] font-normal opacity-80">Clique aqui para pagar e comecar</span>
                </>
              )}
            </button>

            <p className="text-center text-[0.68rem] mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
              Garantia total: se nao encontrarmos a pessoa, devolvemos 100% do valor em ate 24h
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ════════════════════════════════════════════════════════════════════
  //  TELA: SUCESSO
  // ════════════════════════════════════════════════════════════════════
  if (step === "success") {
    return (
      <div className="min-h-screen py-8 px-4" style={{ background: "var(--background)" }}>
        <div className="text-center max-w-md mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.webp"
                alt="Detetive VIP"
                width={400}
                height={105}
                style={{ height: "40px", width: "auto" }}
              />
            </div>
          </div>

          <CheckoutStepper current="success" />

          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(37, 211, 102, 0.15)" }}
          >
            <CheckCircle2 size={40} style={{ color: "var(--success)" }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
            Pagamento Confirmado!
          </h1>
          <p className="mb-1 text-sm font-medium" style={{ color: "var(--whatsapp)" }}>
            R$ {totalPrice},00 — {plan.name}
          </p>
          <p className="mb-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Um de nossos investigadores já recebeu seu pedido.
          </p>
          <p className="mb-6 text-sm" style={{ color: "var(--muted-foreground)" }}>
            Você receberá o resultado no WhatsApp em até 5 minutos — não precisa fazer mais nada. Se quiser, pode acompanhar por lá:
          </p>

          <a
            href={`https://wa.me/5586999488117?text=${encodeURIComponent(`Olá! Acabei de pagar o plano ${plan.name} (R$${plan.price}). Meu nome: ${nome}. Dados para investigação: ${dados}. Aguardo o resultado!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-sm uppercase tracking-wide transition-all active:scale-[0.98] w-full max-w-xs mb-4"
            style={{
              background: "var(--whatsapp)",
              boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
          </a>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            <ArrowLeft size={16} />
            Voltar ao Início
          </Link>
        </div>
      </div>
    )
  }

  // ════════════════════════════════════════════════════════════════════
  //  TELA: FORMULÁRIO
  // ════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/#planos"
            className="inline-flex items-center gap-2 text-sm font-medium mb-6"
            style={{ color: "var(--muted-foreground)" }}
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>

          <div className="flex justify-center mb-6">
            <Image
              src="/logo.webp"
              alt="Detetive VIP"
              width={160}
              height={40}
              style={{ height: "40px", width: "auto" }}
            />
          </div>
        </div>

        <CheckoutStepper current="form" />

        {/* Plan Info — headline clara sobre o que fazer */}
        <div className="text-center mb-6">
          <h1
            className="text-xl md:text-2xl font-bold mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Preencha seus dados para iniciar
          </h1>
          <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>
            Resultado enviado no seu WhatsApp em ate 5 minutos
          </p>
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full"
            style={{
              background: "rgba(184, 150, 63, 0.08)",
              border: "1px solid rgba(184, 150, 63, 0.2)",
            }}
          >
            <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
              {plan.name}
            </span>
            <span className="text-xs line-through" style={{ color: "var(--muted)" }}>
              R$ {plan.originalPrice}
            </span>
            <span
              className="text-lg font-extrabold"
              style={{ color: "var(--primary)" }}
            >
              R$ {plan.price}
            </span>
          </div>
        </div>

        {/* Urgencia + Social proof */}
        <div className="space-y-3 mb-6">
          {/* Indicador de atividade em tempo real */}
          <div
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-full mx-auto w-fit"
            style={{
              background: "rgba(37, 211, 102, 0.08)",
              border: "1px solid rgba(37, 211, 102, 0.2)",
            }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--whatsapp)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--whatsapp)" }} />
            </span>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              <strong style={{ color: "var(--foreground)" }}>3 pessoas</strong> fazendo checkout agora
            </span>
          </div>
          
          {/* Social proof */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2" aria-hidden="true">
              {["CM", "AR", "RS"].map((initials) => (
                <div
                  key={initials}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[0.5rem] font-bold border-2 border-white"
                  style={{ background: "var(--background-elevated)", color: "var(--primary)" }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              <strong style={{ color: "var(--foreground)" }}>127 investigacoes</strong> esta semana
            </span>
          </div>
        </div>

        {/* Form com instrucoes claras */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Secao 1: Seus dados */}
          <div
            className="p-4 rounded-xl space-y-4"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--primary)", color: "white" }}
              >
                1
              </div>
              <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                Seus dados (para receber o resultado)
              </h3>
            </div>
            
            {/* Nome */}
            <div>
              <label
                htmlFor="nome"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--muted-foreground)" }}
              >
                Seu nome
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Maria Silva"
                required
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors focus:ring-2"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--muted-foreground)" }}
              >
                Seu WhatsApp (onde vai receber o resultado)
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => {
                  const err = validatePhone(phone)
                  if (err) setPhoneError(err)
                }}
                placeholder="(11) 99999-9999"
                inputMode="numeric"
                autoComplete="tel"
                required
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors focus:ring-2"
                style={{
                  background: "var(--background)",
                  border: phoneError ? "1px solid var(--destructive)" : "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              />
              {phoneError && (
                <p className="mt-1.5 text-xs" style={{ color: "var(--destructive)" }}>
                  {phoneError}
                </p>
              )}
              <p className="mt-1.5 text-[0.68rem]" style={{ color: "var(--muted)" }}>
                Resultado chega em ate 5 min nesse numero
              </p>
            </div>

          </div>

          {/* Secao 2: Dados da pessoa investigada */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--primary)", color: "white" }}
              >
                2
              </div>
              <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                Quem voce quer investigar?
              </h3>
            </div>
            
            {/* Instrucao especifica do plano */}
            <p
              className="mb-3 text-[0.8rem] leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {plan.inputInstruction}
            </p>
            
            <textarea
              id="dados"
              value={dados}
              onChange={(e) => setDados(e.target.value)}
              placeholder={plan.inputPlaceholder}
              required
              rows={4}
              maxLength={2000}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors resize-none focus:ring-2"
              style={{
                background: "var(--background)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              }}
            />
          </div>

          {/* Aviso de seguranca */}
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
            style={{
              background: "rgba(37, 211, 102, 0.06)",
              border: "1px solid rgba(37, 211, 102, 0.15)",
            }}
          >
            <Shield size={16} className="shrink-0" style={{ color: "var(--whatsapp)" }} />
            <span className="text-[0.72rem]" style={{ color: "var(--muted-foreground)" }}>
              Seus dados estao protegidos. A investigacao e 100% sigilosa.
            </span>
          </div>

          {/* Submit Button — CTA com urgencia */}
          <button
            type="submit"
            disabled={isSubmitting || !nome.trim() || !phone.trim() || !dados.trim()}
            className="w-full flex flex-col items-center justify-center gap-1 py-4 rounded-xl font-bold text-white transition-all active:scale-[0.98] disabled:opacity-70"
            style={{
              background: "var(--whatsapp)",
              boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
            }}
          >
            {isSubmitting ? (
              <>
                <div className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  <span className="text-base uppercase tracking-wide">Processando...</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-base uppercase tracking-wide">Quero Descobrir a Verdade</span>
                  <ArrowRight size={18} />
                </div>
                <span className="text-[0.65rem] font-normal opacity-90">
                  Proximo passo: pagamento via PIX
                </span>
              </>
            )}
          </button>
          
          <p className="text-center text-[0.68rem]" style={{ color: "var(--muted)" }}>
            Pagamento rapido via PIX — resultado em ate 5 minutos
          </p>
        </form>

        {/* Guarantee */}
        <div
          className="mt-6 p-4 rounded-xl flex items-start gap-3"
          style={{
            background: "rgba(37, 211, 102, 0.04)",
            border: "1px solid rgba(37, 211, 102, 0.12)",
          }}
        >
          <Shield size={20} className="shrink-0 mt-0.5" style={{ color: "var(--whatsapp)" }} aria-hidden="true" />
          <div>
            <p className="text-xs font-bold mb-0.5" style={{ color: "var(--foreground)" }}>
              Garantia de Resultado
            </p>
            <p className="text-[0.7rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Se não encontrarmos as informações solicitadas, devolvemos 100% do seu dinheiro em até 24h via PIX. Sem burocracia.
            </p>
          </div>
        </div>

        {/* Security Info */}
        <div
          className="mt-6 flex flex-col items-center gap-2 text-[0.75rem]"
          style={{ color: "var(--muted)" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <Lock size={14} aria-hidden="true" />
              Pagamento seguro e dados protegidos
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} aria-hidden="true" />
              Em conformidade com a LGPD
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-center px-4">
            <CheckCircle2 size={14} className="shrink-0" aria-hidden="true" />
            <span>Entrega da investigação 100% discreta no seu WhatsApp/e-mail, não aparece como contato de detetive/investigador, fique tranquilo(a).</span>
          </div>
        </div>

        {/* Legal Box */}
        <div
          className="mt-8 p-5 rounded-xl text-center"
          style={{
            background: "var(--background-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <h4
            className="font-semibold text-sm mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Sigilo Profissional Garantido
          </h4>
          <p
            className="text-[0.75rem] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Todas as informações fornecidas são tratadas com absoluta confidencialidade, conforme a Lei 13.432/2017 que regulamenta a profissão de detetive particular no Brasil. O sigilo profissional é um dos pilares éticos da nossa atividade, garantindo total proteção e privacidade dos seus dados durante todo o processo investigativo.
          </p>
        </div>
      </div>
    </div>
  )
}
