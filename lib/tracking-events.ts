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

// ── Meta Pixel Events ─────────────────────────────────────────────────

export function fbqTrack(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params || {})
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

export function trackPageView() {
  fbqTrack("PageView")
  gtagEvent("page_view")
}

export function trackViewContent(params: {
  content_name: string
  content_category: string
  value: number
  currency?: string
}) {
  const p = { ...params, currency: params.currency || "BRL" }
  fbqTrack("ViewContent", p)
  gtagEvent("view_item", {
    items: [{ item_name: p.content_name, item_category: p.content_category, price: p.value }],
    currency: p.currency,
    value: p.value,
  })
}

export function trackInitiateCheckout(params: {
  value: number
  content_category: string
  currency?: string
}) {
  const p = { ...params, currency: params.currency || "BRL" }
  fbqTrack("InitiateCheckout", p)
  gtagEvent("begin_checkout", {
    currency: p.currency,
    value: p.value,
    items: [{ item_category: p.content_category, price: p.value }],
  })
}

export function trackAddPaymentInfo(params: {
  value: number
  content_category: string
  currency?: string
}) {
  const p = { ...params, currency: params.currency || "BRL" }
  fbqTrack("AddPaymentInfo", p)
  gtagEvent("add_payment_info", {
    currency: p.currency,
    value: p.value,
    payment_type: "PIX",
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

  // Client-side
  fbqTrack("Purchase", {
    value: p.value,
    currency: p.currency,
    content_name: p.content_name,
    content_category: p.content_category,
  })
  gtagEvent("purchase", {
    transaction_id: `dtv_${Date.now()}`,
    value: p.value,
    currency: p.currency,
    items: [{ item_name: p.content_name, item_category: p.content_category, price: p.value }],
  })

  // Server-side (CAPI) — redundância para melhor match rate
  sendServerEvent("Purchase", {
    value: p.value,
    currency: p.currency,
    content_name: p.content_name,
    content_category: p.content_category,
    email: p.email,
    phone: p.phone,
    nome: p.nome,
  })
}

export function trackLead(params?: { content_name?: string; value?: number }) {
  fbqTrack("Lead", params)
  gtagEvent("generate_lead", {
    value: params?.value,
    currency: "BRL",
  })
  sendServerEvent("Lead", { value: params?.value, content_name: params?.content_name })
}

export function trackClickCTA(label: string) {
  fbqTrackCustom("ClickCTA", { label })
  gtagEvent("cta_click", { event_label: label })
}

export function trackScrollDepth(percentage: number) {
  gtagEvent("scroll_depth", { percent_scrolled: percentage })
}
