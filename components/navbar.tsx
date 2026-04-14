"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#como-funciona", label: "Método" },
  { href: "#servicos", label: "Investigações" },
  { href: "#planos", label: "Planos" },
  { href: "#depoimentos", label: "Provas" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Fecha menu com Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && mobileOpen) {
      setMobileOpen(false)
    }
  }, [mobileOpen])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Bloqueia scroll quando menu está aberto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <nav
      className="relative z-[1000] py-3 md:py-4 px-4 md:px-8 bg-[var(--background)]"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="max-w-[1300px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.webp"
            alt="Detetive VIP"
            width={400}
            height={105}
            className="h-8 md:h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative text-sm font-medium tracking-wider uppercase transition-colors hover:text-[var(--primary-light)] group"
                style={{ color: "var(--muted-foreground)" }}
              >
                {link.label}
                <span
                  className="absolute bottom-[-3px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: "var(--primary)" }}
                />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#planos"
              className="gradient-gold px-5 py-2.5 rounded-md text-[0.75rem] font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                color: "var(--background)",
                boxShadow: "0 4px 20px rgba(201, 168, 76, 0.2)",
              }}
            >
              Contratar
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2.5 rounded-md border transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          style={{ borderColor: "var(--border-hover)", color: "var(--foreground)" }}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 glass border-t py-4 px-4 max-h-[70vh] overflow-y-auto"
          style={{ borderColor: "rgba(201, 168, 76, 0.08)" }}
          role="menu"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium tracking-wider uppercase py-2"
                  style={{ color: "var(--muted-foreground)" }}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li role="none">
              <Link
                href="#planos"
                onClick={() => setMobileOpen(false)}
                className="block gradient-gold px-5 py-3.5 rounded-md text-center text-[0.75rem] font-bold uppercase tracking-wider"
                style={{ color: "var(--background)" }}
                role="menuitem"
              >
                Contratar
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
