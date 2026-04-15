import { MessageCircle } from "lucide-react"

interface CtaBannerProps {
  heading?: string
  description?: string
}

export function CtaBanner({
  heading = "Precisa de uma investigação?",
  description = "O Detetive VIP oferece investigação digital profissional com entrega em até 1 hora via WhatsApp. 100% legal, sigiloso e regulamentado pela Lei 13.432/17.",
}: CtaBannerProps) {
  return (
    <aside className="my-10 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] p-6 sm:p-8 text-center">
      <h3 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-2">
        {heading}
      </h3>
      <p className="text-sm text-[var(--muted-foreground)] max-w-lg mx-auto mb-5 leading-relaxed">
        {description}
      </p>
      <a
        href="https://www.detetive.vip/#planos"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: "var(--whatsapp)" }}
      >
        <MessageCircle className="h-4 w-4" />
        Contratar investigação
      </a>
    </aside>
  )
}
