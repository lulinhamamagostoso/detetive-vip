import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// ── Tipos ────────────────────────────────────────────────────────────
type PayevoStatus = "paid" | "waiting_payment" | "refused" | "refunded" | "chargedback"

const VALID_STATUSES: PayevoStatus[] = ["paid", "waiting_payment", "refused", "refunded", "chargedback"]

interface PayevoWebhookPayload {
  id: string
  status: PayevoStatus
  amount: number
  paidAt?: string
  metadata?: string
  customer?: { name: string; email: string; phone: string }
  [key: string]: unknown
}

// ── Idempotência (evita processar mesmo webhook 2x) ──────────────────
const processedWebhooks = new Map<string, number>()
const IDEMPOTENCY_TTL = 3600_000 // 1 hora

// Limpa entries antigas periodicamente
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    for (const [key, timestamp] of processedWebhooks) {
      if (now - timestamp > IDEMPOTENCY_TTL) processedWebhooks.delete(key)
    }
  }, 600_000)
}

// ── Validação de payload robusta ─────────────────────────────────────
function isValidPayload(body: unknown): body is PayevoWebhookPayload {
  if (!body || typeof body !== "object") return false
  const obj = body as Record<string, unknown>

  if (typeof obj.id !== "string" || obj.id.length === 0 || obj.id.length > 256) return false
  if (typeof obj.status !== "string" || !VALID_STATUSES.includes(obj.status as PayevoStatus)) return false
  if (typeof obj.amount !== "undefined" && typeof obj.amount !== "number") return false

  return true
}

// ── Validação de assinatura do webhook ───────────────────────────────
function verifyWebhookSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  // Em produção, PAYEVO_WEBHOOK_SECRET DEVE estar configurado
  // Rejeita webhooks se o secret não estiver definido
  if (!secret) {
    console.error("[WEBHOOK] ❌ PAYEVO_WEBHOOK_SECRET não configurado — rejeitando webhook por segurança")
    return false
  }

  if (!signatureHeader) {
    console.error("[WEBHOOK] Header de assinatura ausente")
    return false
  }

  // Suporta formato "sha256=xxxxx" ou apenas "xxxxx"
  const signature = signatureHeader.startsWith("sha256=")
    ? signatureHeader.slice(7)
    : signatureHeader

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex")

  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expectedSignature, "hex")
  )
}

// ── POST /api/webhook/payevo ─────────────────────────────────────────
export async function POST(request: NextRequest) {
  let rawBody = ""

  try {
    // 1. Validação de Content-Type
    const contentType = request.headers.get("content-type") || ""
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Content-Type inválido" }, { status: 415 })
    }

    // 2. Lê body como texto para validar assinatura
    rawBody = await request.text()

    // 3. Validação de assinatura (se PAYEVO_WEBHOOK_SECRET estiver configurado)
    const webhookSecret = process.env.PAYEVO_WEBHOOK_SECRET || ""
    const signatureHeader = request.headers.get("x-webhook-signature")
      || request.headers.get("x-signature")
      || request.headers.get("x-payevo-signature")

    if (webhookSecret && !verifyWebhookSignature(rawBody, signatureHeader, webhookSecret)) {
      console.error("[WEBHOOK] Assinatura inválida — possível tentativa de fraude")
      return NextResponse.json({ error: "Assinatura inválida" }, { status: 401 })
    }

    // 4. Parse do body
    let body: unknown
    try {
      body = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
    }

    // 5. Validação do payload
    if (!isValidPayload(body)) {
      console.error("[WEBHOOK] Payload inválido:", rawBody.slice(0, 200))
      return NextResponse.json({ error: "Payload inválido" }, { status: 400 })
    }

    const { id, status, amount, paidAt, metadata } = body

    // 6. Verificação de idempotência
    const idempotencyKey = `${id}:${status}`
    if (processedWebhooks.has(idempotencyKey)) {
      console.log("[WEBHOOK] Webhook duplicado ignorado:", idempotencyKey)
      return NextResponse.json({ received: true, duplicate: true }, { status: 200 })
    }
    processedWebhooks.set(idempotencyKey, Date.now())

    // 7. Extrai referência da metadata
    let ref: string | null = null
    let planName: string | null = null
    if (metadata) {
      try {
        const meta = JSON.parse(metadata)
        ref = meta.reference || null
        planName = meta.plan || null
      } catch {
        console.warn("[WEBHOOK] Metadata não é JSON válido:", metadata?.slice(0, 100))
      }
    }

    // 8. Log estruturado
    console.log("[WEBHOOK]", JSON.stringify({
      event: "webhook_received",
      transactionId: id,
      status,
      amount,
      paidAt: paidAt || null,
      reference: ref,
      plan: planName,
      timestamp: new Date().toISOString(),
    }))

    // 9. Processamento por status
    switch (status) {
      case "paid": {
        console.log(`[WEBHOOK] ✅ PAGAMENTO CONFIRMADO | TX: ${id} | Ref: ${ref} | Plano: ${planName} | Valor: ${amount}`)

        // TODO: Aqui você deve implementar a ação real:
        // - Salvar no banco de dados (Supabase, Prisma, etc)
        // - Enviar mensagem WhatsApp com resultado da investigação
        // - Enviar email de confirmação
        // - Liberar acesso ao serviço
        //
        // Exemplo com Supabase:
        // await supabase.from('transactions').update({ status: 'paid', paid_at: paidAt }).eq('transaction_id', id)
        //
        // Exemplo com WhatsApp API:
        // await sendWhatsAppMessage(customer.phone, `Pagamento confirmado! Referência: ${ref}`)

        break
      }
      case "refunded": {
        console.log(`[WEBHOOK] 💰 REEMBOLSO | TX: ${id} | Ref: ${ref}`)
        // TODO: Marcar transação como reembolsada no banco
        break
      }
      case "chargedback": {
        console.log(`[WEBHOOK] ⚠️  CHARGEBACK | TX: ${id} | Ref: ${ref}`)
        // TODO: Revogar acesso, notificar admin
        break
      }
      case "refused": {
        console.log(`[WEBHOOK] ❌ RECUSADO | TX: ${id} | Ref: ${ref}`)
        break
      }
      default: {
        console.log(`[WEBHOOK] Status não tratado: ${status} | TX: ${id}`)
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido"
    console.error("[WEBHOOK] Erro interno:", message, "Body:", rawBody.slice(0, 200))

    // IMPORTANTE: Retorna 500 para que PayEvo saiba que houve erro e faça retry
    return NextResponse.json(
      { error: "Erro interno no processamento" },
      { status: 500 }
    )
  }
}
