"use client"

import { useEffect, useState, useRef } from "react"
import { Users, Target, Clock } from "lucide-react"

const stats = [
  { value: 12, suffix: " mil+", label: "investigações realizadas com sucesso em todo o Brasil", icon: Users },
  { value: 97, suffix: "%", label: "de sucesso nas investigações", icon: Target },
  { value: 1, suffix: " hora", label: "para receber o resultado no seu WhatsApp", icon: Clock },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  const rafRef = useRef<number | null>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = spanRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return
        hasAnimated.current = true

        const duration = 1500
        const startTime = performance.now()

        const tick = (now: number) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          // easeOutQuart para desaceleração suave
          const eased = 1 - Math.pow(1 - progress, 4)
          setCount(Math.round(eased * target))

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick)
          } else {
            setCount(target)
            rafRef.current = null
          }
        }

        rafRef.current = requestAnimationFrame(tick)
      },
      { threshold: 0.2 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [target])

  return (
    <span ref={spanRef} className="text-xl md:text-2xl font-bold" style={{ color: "var(--primary)" }}>
      {count}{suffix}
    </span>
  )
}

export function StatsBar() {
  return (
    <div
      className="relative z-[1] py-5 md:py-6 px-4 border-y"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-[900px] mx-auto">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center gap-2 md:flex-row md:text-left md:gap-3"
              >
                <div
                  className="w-10 h-10 md:w-9 md:h-9 shrink-0 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(180, 142, 73, 0.1)" }}
                >
                  <Icon
                    size={18}
                    strokeWidth={2}
                    style={{ color: "var(--primary)" }}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  <div
                    className="text-[0.7rem] md:text-[0.65rem] leading-tight max-w-[200px]"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {stat.label}
                  </div>
                </div>

                {index < stats.length - 1 && (
                  <div
                    className="hidden md:block w-px h-10 ml-4"
                    style={{ background: "var(--border)" }}
                    aria-hidden="true"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
