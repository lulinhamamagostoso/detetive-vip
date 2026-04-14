import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// ═══════════════════════════════════════════════════════════════════════
// META CONVERSIONS API (CAPI) — Server-Side Event Tracking
// Envia eventos diretamente para o Meta via API, sem depender do navegador.
// Isso melhora match rate, bypassa bloqueadores e otimiza campanhas.
// ═══════════════════════════════════════════════════════════════════════

const PIXEL_ID = "1825486488116021"
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN || ""
const API_VERSION = "v21.0"

// Hash SHA-256 para dados do usuário (exigido pelo Meta)
function hashData(data: string): string {
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex")
}

export async function POST(req: NextRequest) {
  if (!ACCESS_TOKEN) {
    console.warn("[CAPI] META_CAPI_TOKEN não configurado — evento ignorado")
    return NextResponse.json({ ok: false, reason: "no_token" }, { status: 200 })
  }

  try {
    const body = await req.json()

    const {
      event_name,
      event_time,
      event_source_url,
      user_agent,
      value,
      currency,
      content_name,
      content_category,
      email,
      phone,
      nome,
      fbclid,
      utm_source,
      utm_medium,
      utm_campaign,
    } = body

    // Montar user_data com hashing
    const userData: Record<string, any> = {
      client_user_agent: user_agent,
      client_ip_address: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "",
    }

    if (email) userData.em = [hashData(email)]
    if (phone) userData.ph = [hashData(phone.replace(/\D/g, ""))]
    if (nome) {
      const parts = nome.trim().split(" ")
      if (parts[0]) userData.fn = [hashData(parts[0])]
      if (parts.length > 1) userData.ln = [hashData(parts[parts.length - 1])]
    }
    if (fbclid) userData.fbc = `fb.1.${Date.now()}.${fbclid}`

    // Cookie _fbp (se disponível via header)
    const cookies = req.headers.get("cookie") || ""
    const fbpMatch = cookies.match(/_fbp=([^;]+)/)
    if (fbpMatch) userData.fbp = fbpMatch[1]

    // Montar custom_data
    const customData: Record<string, any> = {}
    if (value) customData.value = value
    if (currency) customData.currency = currency
    if (content_name) customData.content_name = content_name
    if (content_category) customData.content_category = content_category

    // Montar evento
    const eventData: Record<string, any> = {
      event_name,
      event_time: event_time || Math.floor(Date.now() / 1000),
      action_source: "website",
      event_source_url,
      user_data: userData,
    }

    if (Object.keys(customData).length > 0) {
      eventData.custom_data = customData
    }

    // Event ID para deduplicação com o Pixel client-side
    eventData.event_id = `capi_${event_name}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`

    // Enviar para Meta
    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [eventData],
        access_token: ACCESS_TOKEN,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("[CAPI] Erro ao enviar evento:", result)
      return NextResponse.json({ ok: false, error: result }, { status: 200 })
    }

    console.log(`[CAPI] ${event_name} enviado com sucesso:`, {
      events_received: result.events_received,
      utm_source,
      utm_medium,
      utm_campaign,
    })

    return NextResponse.json({ ok: true, events_received: result.events_received })
  } catch (error) {
    console.error("[CAPI] Erro interno:", error)
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 200 })
  }
}
