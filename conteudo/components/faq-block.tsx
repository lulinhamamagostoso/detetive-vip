"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

interface FaqBlockProps {
  items: FaqItem[]
  title?: string
}

export function FaqBlock({ items, title = "Perguntas frequentes" }: FaqBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="my-10">
      {title && (
        <h3 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-4">
          {title}
        </h3>
      )}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-[var(--border)] bg-[var(--background-card)] overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-[var(--foreground)] hover:bg-[var(--background-secondary)] transition-colors"
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[var(--muted)] transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-sm text-[var(--muted-foreground)] leading-relaxed border-t border-[var(--border)]">
                <div className="pt-3">{item.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
