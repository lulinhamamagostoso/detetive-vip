// ═══════════════════════════════════════════════════════════════════════
// TRACKING EVENTS — Funções centralizadas de rastreamento
// Meta Pixel (client) + GA4 (client) + CAPI (server-side via fetch)
// ═══════════════════════════════════════════════════════════════════════

declare global {
  interface Window {
    fbq: (...args: any[]) => void
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// ── Event ID — usado para deduplicação Pixel ↔ CAPI ─────────────────

export function generateEventId(eventName: string): string {
  return `${eventName}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
}

// ── Meta Pixel Events ─────────────────────────────────────────────────

export function fbqTrack(eventName: string, params?: Record<string, any>, eventId?: string) {
  if (typeof window !== "undefined" && window.fbq) {
    if (eventId) {
      window.fbq("track", eventName, params || {}, { eventID: eventId })
    } else {
      window.fbq("track", eventName, params || {})
    }
  }
}

export function fbqTrackCustom(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, params || {})
  }
}

// ── Google Analytics 4 Events ─────────────────────────────────────────

export function gtagEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params || {})
  }
}

// ── UTM Tracking ──────────────────────────────────────────────────────

export interface UTMParams {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  fbclid: string | null
  gclid: string | null
  ref: string | null
}

const UTM_STORAGE_KEY = "dtv_utm"
const UTM_EXPIRY_DAYS = 30

export function captureUTMParams(): void {
  if (typeof window === "undefined") return

  const params = new URLSearchParams(window.location.search)
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "ref"]

  // Só salva se houver pelo menos 1 parâmetro UTM na URL
  const hasUtm = utmKeys.some((key) => params.has(key))
  if (!hasUtm) return

  const utmData: Record<string, string | null> = {}
  utmKeys.forEach((key) => {
    utmData[key] = params.get(key)
  })

  // Adiciona metadata
  const stored = {
    ...utmData,
    landing_page: window.location.pathname,
    referrer: document.referrer || null,
    timestamp: Date.now(),
    expires: Date.now() + UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
  }

  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored))
  } catch {
    // localStorage indisponível
  }
}

export function getStoredUTM(): (UTMParams & { landing_page?: string; referrer?: string }) | null {
  if (typeof window === "undefined") return null

  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return null

    const data = JSON.parse(raw)

    // Verifica expiração
    if (data.expires && Date.now() > data.expires) {
      localStorage.removeItem(UTM_STORAGE_KEY)
      return null
    }

    return data
  } catch {
    return null
  }
}

// ── Conversions API (Server-Side) ─────────────────────────────────────

export async function sendServerEvent(eventName: string, eventData: {
  value?: number
  currency?: string
  content_name?: string
  content_category?: string
  email?: string
  phone?: string
  nome?: string
  event_id?: string
}) {
  try {
    const utm = getStoredUTM()
    await fetch("/api/tracking/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        user_agent: navigator.userAgent,
        fbclid: utm?.fbclid || null,
        ...eventData,
        utm_source: utm?.utm_source || null,
        utm_medium: utm?.utm_medium || null,
        utm_campaign: utm?.utm_campaign || null,
      }),
    })
  } catch {
    // Falha silenciosa — não bloqueia a UX
  }
}

// ── Funções de conveniência para eventos do funil ─────────────────────

export function trackViewContent(params: {
  content_name: string
  content_category: string
  value: number
  currency?: string
}) {
  const p = { ...params, currency: params.currency || "BRL" }
  const eventId = generateEventId("ViewContent")
  fbqTrack("ViewContent", p, eventId)
  gtagEvent("view_item", {
    items: [{ item_name: p.content_name, item_category: p.content_category, price: p.value }],
    currency: p.currency,
    value: p.value,
  })
  // CAPI server-side com mesmo event_id para deduplicação
  sendServerEvent("ViewContent", {
    value: p.value,
    currency: p.currency,
    content_name: p.content_name,
    content_category: p.content_category,
    event_id: eventId,
  })
}

export function trackInitiateCheckout(params: {
  value: number
  content_category: string
  currency?: string
}) {
  const p = { ...params, currency: params.currency || "BRL" }
  const eventId = generateEventId("InitiateCheckout")
  fbqTrack("InitiateCheckout", p, eventId)
  gtagEvent("begin_checkout", {
    currency: p.currency,
    value: p.value,
    items: [{ item_category: p.content_category, price: p.value }],
  })
  // CAPI server-side com mesmo event_id
  sendServerEvent("InitiateCheckout", {
    value: p.value,
    currency: p.currency,
    content_category: p.content_category,
    event_id: eventId,
  })
}

export function trackAddPaymentInfo(params: {
  value: number
  content_category: string
  currency?: string
}) {
  const p = { ...params, currency: params.currency || "BRL" }
  const eventId = generateEventId("AddPaymentInfo")
  fbqTrack("AddPaymentInfo", p, eventId)
  gtagEvent("add_payment_info", {
    currency: p.currency,
    value: p.value,
    payment_type: "PIX",
  })
  // CAPI server-side com mesmo event_id
  sendServerEvent("AddPaymentInfo", {
    value: p.value,
    currency: p.currency,
    content_category: p.content_category,
    event_id: eventId,
  })
}

export function trackPurchase(params: {
  value: number
  content_name: string
  content_category: string
  currency?: string
  email?: string
  phone?: string
  nome?: string
}) {
  const p = { ...params, currency: params.currency || "BRL" }
  const eventId = generateEventId("Purchase")

  // Client-side com eventID para deduplicação
  fbqTrack("Purchase", {
    value: p.value,
    currency: p.currency,
    content_name: p.content_name,
    content_category: p.content_category,
  }, eventId)
  gtagEvent("purchase", {
    transaction_id: `dtv_${Date.now()}`,
    value: p.value,
    currency: p.currency,
    items: [{ item_name: p.content_name, item_category: p.content_category, price: p.value }],
  })

  // Server-side (CAPI) — mesmo event_id para deduplicação Meta
  sendServerEvent("Purchase", {
    value: p.value,
    currency: p.currency,
    content_name: p.content_name,
    content_category: p.content_category,
    email: p.email,
    phone: p.phone,
    nome: p.nome,
    event_id: eventId,
  })
}

export function trackLead(params?: { content_name?: string; value?: number }) {
  const eventId = generateEventId("Lead")
  fbqTrack("Lead", params, eventId)
  gtagEvent("generate_lead", {
    value: params?.value,
    currency: "BRL",
  })
  sendServerEvent("Lead", { value: params?.value, content_name: params?.content_name, event_id: eventId })
}

export function trackClickCTA(label: string) {
  fbqTrackCustom("ClickCTA", { label })
  gtagEvent("cta_click", { event_label: label })
}

export function trackScrollDepth(percentage: number) {
  gtagEvent("scroll_depth", { percent_scrolled: percentage })
}
