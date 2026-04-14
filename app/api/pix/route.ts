import { NextRequest, NextResponse } from "next/server"

// ── Planos válidos (fonte única de verdade) ──────────────────────────
export const VALID_PLANS: Record<string, { name: string; price: number }> = {
  "nome-cpf":        { name: "Pelo NOME OU CPF",              price: 40 },
  "celular-placa":   { name: "Pelo N° Celular ou Placa",      price: 79 },
  "premium":         { name: "Investigação Premium",           price: 197 },
  "upgrade-premium": { name: "Investigação Premium (Oferta)",  price: 97 },
}

// ── Rate limiting simples (em memória — funciona por instância) ──────
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

// Limpa entries antigas a cada 5 min para evitar memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    for (const [key, val] of rateMap) {
      if (now > val.resetAt) rateMap.delete(key)
    }
  }, 300_000)
}

// ── Gera CPF válido aleatório ────────────────────────────────────────
function generateValidCPF(): string {
  const rand = () => Math.floor(Math.random() * 9) + 1
  const digits = [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()]

  let sum = 0
  for (let i = 0; i < 9; i++) sum += digits[i] * (10 - i)
  let d1 = 11 - (sum % 11)
  if (d1 >= 10) d1 = 0
  digits.push(d1)

  sum = 0
  for (let i = 0; i < 10; i++) sum += digits[i] * (11 - i)
  let d2 = 11 - (sum % 11)
  if (d2 >= 10) d2 = 0
  digits.push(d2)

  return digits.join("")
}

// ── Gera QR Code base64 localmente (sem dependência externa) ─────────
async function generateQRBase64(data: string): Promise<string> {
  try {
    const QRCode = (await import("qrcode")).default
    const base64 = await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: { dark: "#000000", light: "#FFFFFF" },
      errorCorrectionLevel: "M",
    })
    return base64
  } catch (e) {
    console.error("[PIX] Erro ao gerar QR Code local:", e)
    return ""
  }
}

// ── Timeout helper ───────────────────────────────────────────────────
function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout))
}

// ── POST /api/pix ────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // Rate limiting por IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde um momento." },
        { status: 429 }
      )
    }

    // Validação do Content-Type
    const contentType = request.headers.get("content-type") || ""
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type deve ser application/json" },
        { status: 415 }
      )
    }

    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
    }

    const { planSlug, planName, customerName, customerPhone, customerEmail } = body as {
      planSlug?: string
      planName?: string
      customerName?: string
      customerPhone?: string
      customerEmail?: string
    }

    // Log seguro (sem dados pessoais completos)
    console.log("[PIX] Request received:", { planSlug, planName: planName?.slice(0, 10) })

    // Resolve plano: aceita planSlug (preferido) ou planName (legado)
    let plan = planSlug ? VALID_PLANS[planSlug] : null
    if (!plan && planName) {
      const entry = Object.entries(VALID_PLANS).find(([, v]) => v.name === planName)
      if (entry) plan = entry[1]
    }
    if (!plan) {
      return NextResponse.json(
        { error: "Plano inválido", validSlugs: Object.keys(VALID_PLANS) },
        { status: 400 }
      )
    }

    // O preço vem do servidor — nunca do frontend
    const amount = plan.price

    // Formata telefone
    const cleanPhone = customerPhone?.replace(/\D/g, "") || "11999999999"

    // CPF válido gerado automaticamente (necessário para gateway)
    const cpf = generateValidCPF()

    // Referência interna (crypto para evitar colisão)
    const randomPart = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).substring(2, 10)
    const reference = `DTV-${Date.now()}-${randomPart}`

    // URL base para postback (webhook)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
      || "https://www.detetive.vip"

    // Payload conforme documentação Payevo v2
    const pixPayload: Record<string, unknown> = {
      amount: Math.round(amount * 100),
      paymentMethod: "PIX",
      pix: {
        expiresInDays: 1,
      },
      customer: {
        name: customerName || "Cliente",
        email: customerEmail || "cliente@detetivevip.com.br",
        phone: cleanPhone,
        document: {
          number: cpf,
          type: "CPF",
        },
      },
      items: [
        {
          title: plan.name,
          quantity: 1,
        },
      ],
      metadata: JSON.stringify({ reference, plan: plan.name }),
      postbackUrl: `${baseUrl}/api/webhook/payevo`,
    }

    const secretKey = process.env.PAYEVO_SECRET_KEY
    if (!secretKey) {
      console.error("[PIX] PAYEVO_SECRET_KEY não configurada")
      return NextResponse.json(
        { error: "Configuração de pagamento indisponível" },
        { status: 500 }
      )
    }

    const authToken = Buffer.from(secretKey).toString("base64")

    // Chamada para PayEvo COM timeout de 15 segundos
    let response: Response
    try {
      response = await fetchWithTimeout(
        "https://apiv2.payevo.com.br/functions/v1/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${authToken}`,
          },
          body: JSON.stringify(pixPayload),
        },
        15000
      )
    } catch (fetchError: unknown) {
      const isTimeout = fetchError instanceof Error && fetchError.name === "AbortError"
      console.error("[PIX] Erro na chamada PayEvo:", isTimeout ? "TIMEOUT" : fetchError)
      return NextResponse.json(
        { error: isTimeout ? "Gateway de pagamento demorou para responder. Tente novamente." : "Erro de conexão com gateway" },
        { status: 504 }
      )
    }

    const responseText = await response.text()

    if (!response.ok) {
      console.error("[PIX] Payevo HTTP", response.status, "Body:", responseText.slice(0, 500))
      return NextResponse.json(
        { error: "Erro ao gerar PIX. Tente novamente." },
        { status: 502 }
      )
    }

    let data: Record<string, unknown>
    try {
      data = JSON.parse(responseText)
    } catch {
      console.error("[PIX] Resposta inválida da Payevo:", responseText.slice(0, 200))
      return NextResponse.json(
        { error: "Resposta inválida do gateway" },
        { status: 502 }
      )
    }

    const pixData = data.pix as Record<string, unknown> | undefined
    if (!pixData || !pixData.qrcode) {
      console.error("[PIX] Dados PIX ausentes na resposta:", JSON.stringify(data).slice(0, 300))
      return NextResponse.json(
        { error: "QR Code PIX não foi gerado. Tente novamente." },
        { status: 400 }
      )
    }

    // Gera QR code LOCALMENTE (sem dependência de api.qrserver.com)
    const pixCode = pixData.qrcode as string
    const qrBase64 = await generateQRBase64(pixCode)

    return NextResponse.json({
      success: true,
      qr_code: pixCode,
      qr_code_base64: qrBase64,
      pix_code: pixCode,
      transaction_id: data.id,
      status: data.status,
      expires_at: pixData.expirationDate || null,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido"
    console.error("[PIX] Erro interno:", message)
    return NextResponse.json(
      { error: "Erro interno ao gerar PIX" },
      { status: 500 }
    )
  }
}
