"use client"

import { useState, useEffect } from "react"

export function StickyCTAMobile() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    // Show after scrolling past hero (approx 500px)
    // Hide when near bottom (footer)
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Show after 400px scroll
      const shouldShow = scrollY > 400
      
      // Hide when within 200px of bottom
      const nearBottom = scrollY + windowHeight > documentHeight - 200
      
      setIsVisible(shouldShow)
      setIsAtBottom(nearBottom)
    }

    // Throttle scroll handler for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [])

  // Don't render on desktop
  if (typeof window !== "undefined" && window.innerWidth >= 768) {
    return null
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-out ${
        isVisible && !isAtBottom ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        background: "linear-gradient(to top, var(--background) 85%, transparent)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="px-4 pb-4 pt-3">
        <a
          href="/checkout/investigacao"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white text-[15px] uppercase tracking-wide touch-manipulation shadow-lg"
          style={{
            background: "var(--whatsapp)",
            boxShadow: "0 -4px 20px rgba(37, 211, 102, 0.3), 0 4px 20px rgba(37, 211, 102, 0.3)",
          }}
        >
          <span>DESCOBRIR A VERDADE - R$ 97</span>
        </a>
      </div>
    </div>
  )
}
