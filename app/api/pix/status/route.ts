import { NextRequest, NextResponse } from "next/server"

// ── Rate limiting para polling ───────────────────────────────────────
const pollRateMap = new Map<string, { count: number; resetAt: number }>()
const POLL_RATE_LIMIT = 30
const POLL_RATE_WINDOW = 60_000

function isPollRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = pollRateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    pollRateMap.set(ip, { count: 1, resetAt: now + POLL_RATE_WINDOW })
    return false
  }
  entry.count++
  return entry.count > POLL_RATE_LIMIT
}

// Limpa entries antigas periodicamente
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    for (const [key, val] of pollRateMap) {
      if (now > val.resetAt) pollRateMap.delete(key)
    }
  }, 300_000)
}

// ── Timeout helper ───────────────────────────────────────────────────
function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout))
}

// ── GET /api/pix/status?id=xxx ───────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip") || "unknown"

    if (isPollRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas consultas. Aguarde um momento." },
        { status: 429 }
      )
    }

    const transactionId = request.nextUrl.searchParams.get("id")
    if (!transactionId || !/^[a-zA-Z0-9_-]{1,128}$/.test(transactionId)) {
      return NextResponse.json(
        { error: "ID de transação inválido" },
        { status: 400 }
      )
    }

    const secretKey = process.env.PAYEVO_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json(
        { error: "Configuração indisponível" },
        { status: 500 }
      )
    }

    const authToken = Buffer.from(secretKey).toString("base64")

    let response: Response
    try {
      response = await fetchWithTimeout(
        `https://apiv2.payevo.com.br/functions/v1/transactions/${transactionId}`,
        {
          method: "GET",
          headers: { "Authorization": `Basic ${authToken}` },
          cache: "no-store",
        },
        10000
      )
    } catch (fetchError: unknown) {
      const isTimeout = fetchError instanceof Error && fetchError.name === "AbortError"
      return NextResponse.json(
        { error: isTimeout ? "Timeout ao consultar status" : "Erro de conexão" },
        { status: 504 }
      )
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao consultar status", httpStatus: response.status },
        { status: response.status >= 500 ? 502 : response.status }
      )
    }

    let data: Record<string, unknown>
    try {
      data = await response.json()
    } catch {
      return NextResponse.json(
        { error: "Resposta inválida do gateway" },
        { status: 502 }
      )
    }

    return NextResponse.json({
      status: data.status || "unknown",
      paid_at: data.paidAt || null,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido"
    console.error("[PIX-STATUS] Erro:", message)
    return NextResponse.json(
      { error: "Erro ao consultar status" },
      { status: 500 }
    )
  }
}
