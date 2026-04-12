"use client"

import { useEffect, useState } from "react"
import { MessageCircle, X } from "lucide-react"

const WHATSAPP_NUMBER = "5586999488117"
const WHATSAPP_MESSAGE = "Olá! Gostaria de fazer uma investigação."

export function FloatingElements() {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    // Show toast after 5 seconds
    const toastTimer = setTimeout(() => {
      setShowToast(true)
    }, 5000)

    // Hide toast after 10 seconds
    const hideToastTimer = setTimeout(() => {
      setShowToast(false)
    }, 15000)

    return () => {
      clearTimeout(toastTimer)
      clearTimeout(hideToastTimer)
    }
  }, [])

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    window.open(url, "_blank")
  }

  return (
    <>
      {/* WhatsApp FAB - Desktop only */}
      <button
        onClick={handleWhatsAppClick}
        className="hidden md:flex fixed bottom-6 right-6 z-[998] w-14 h-14 rounded-full items-center justify-center text-white text-2xl"
        style={{ 
          background: "var(--whatsapp)",
          boxShadow: "0 4px 22px rgba(37, 211, 102, 0.4)"
        }}
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle size={26} />
      </button>

      {/* Social Proof Toast - Desktop only */}
      <div 
        className={`hidden md:block fixed bottom-6 left-4 z-[996] max-w-[280px] transition-transform duration-500 ${
          showToast ? "translate-x-0" : "-translate-x-[120%]"
        }`}
      >
        <div 
          className="glass rounded-xl p-3 flex items-center gap-3"
          style={{ border: "1px solid var(--border-hover)", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
        >
          <button
            onClick={() => setShowToast(false)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs"
            style={{ background: "var(--background-card)", color: "var(--muted)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          >
            <X size={12} />
          </button>
          
          <div 
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
            style={{ 
              background: "var(--background-elevated)",
              border: "1px solid var(--border)",
              color: "var(--primary)"
            }}
          >
            JM
          </div>
          <div>
            <p className="text-[0.78rem] font-medium" style={{ color: "var(--muted-foreground)" }}>
              <b style={{ color: "var(--foreground)" }}>João M.</b> acabou de contratar
            </p>
            <p className="text-[0.62rem]" style={{ color: "var(--muted)" }}>
              há 2 minutos
            </p>
          </div>
        </div>
      </div>

    </>
  )
}
