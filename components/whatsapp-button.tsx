"use client"

import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5586999488117"
const WHATSAPP_MESSAGE = "Olá! Gostaria de fazer uma investigação."

interface WhatsAppButtonProps {
  size?: "sm" | "md" | "lg"
  variant?: "filled" | "outline"
  text?: string
  className?: string
}

export function WhatsAppButton({ 
  size = "md", 
  variant = "filled",
  text = "Iniciar Investigação",
  className = ""
}: WhatsAppButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 md:px-7 md:py-3.5 text-sm md:text-[0.9rem]"
  }

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    window.open(url, "_blank")
  }

  if (variant === "outline") {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-wide border transition-all duration-300 hover:-translate-y-0.5 ${sizeClasses[size]} ${className}`}
        style={{ 
          borderColor: "var(--whatsapp)",
          color: "var(--whatsapp)"
        }}
      >
        <MessageCircle size={size === "lg" ? 20 : 18} />
        {text}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-wide active:scale-[0.98] ${sizeClasses[size]} ${className}`}
      style={{ 
        background: "var(--whatsapp)",
        color: "#fff",
        boxShadow: "0 4px 16px rgba(37, 211, 102, 0.25)"
      }}
    >
      <MessageCircle size={size === "lg" ? 18 : 16} />
      {text}
    </button>
  )
}
