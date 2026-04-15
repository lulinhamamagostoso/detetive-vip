import { ShieldCheck } from "lucide-react"

function LawSeal() {
  return (
    <div
      className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full flex items-center justify-center relative"
      style={{
        border: "2px solid var(--primary)",
        color: "var(--primary)",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-[3px] rounded-full"
        style={{ border: "1px solid var(--primary)", opacity: 0.3 }}
      />
      <div className="flex flex-col items-center leading-none">
        <span className="text-[0.38rem] md:text-[0.42rem] font-black uppercase tracking-[0.08em]">Lei</span>
        <span className="text-[0.55rem] md:text-[0.6rem] font-extrabold leading-none">13.432</span>
        <span className="text-[0.32rem] md:text-[0.35rem] font-bold opacity-60">/17</span>
      </div>
    </div>
  )
}

export function GuaranteeSection() {
  return (
    <section className="relative z-[1] pt-2 pb-6 md:pt-4 md:pb-10 px-4 md:px-8">
      <div className="max-w-[750px] mx-auto flex flex-col sm:flex-row gap-3">
        {/* Money-back guarantee */}
        <div
          className="flex-1 flex items-center gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl"
          style={{
            background: "rgba(22, 163, 74, 0.04)",
            border: "1px solid rgba(22, 163, 74, 0.12)",
          }}
        >
          <div
            className="w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(22, 163, 74, 0.08)" }}
          >
            <ShieldCheck
              size={22}
              strokeWidth={2}
              style={{ color: "var(--success)" }}
              aria-hidden="true"
            />
          </div>
          <div>
            <h3
              className="text-[0.82rem] md:text-[0.9rem] font-bold mb-0.5"
              style={{ color: "var(--foreground)" }}
            >
              Garantia de Resultado
            </h3>
            <p
              className="text-[0.7rem] md:text-[0.78rem] leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              Dados incorretos? <strong style={{ color: "var(--foreground)" }}>Devolvemos 100%</strong>.
            </p>
          </div>
        </div>

        {/* Law regulation badge */}
        <div
          className="flex-1 flex items-center gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl"
          style={{
            background: "rgba(184, 150, 63, 0.04)",
            border: "1px solid rgba(184, 150, 63, 0.12)",
          }}
        >
          <LawSeal />
          <div>
            <h3
              className="text-[0.82rem] md:text-[0.9rem] font-bold mb-0.5"
              style={{ color: "var(--foreground)" }}
            >
              Regulamentado por Lei
            </h3>
            <p
              className="text-[0.7rem] md:text-[0.78rem] leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              Lei 13.432/17 — Profissão de{" "}
              <strong style={{ color: "var(--foreground)" }}>Detetive Particular</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
