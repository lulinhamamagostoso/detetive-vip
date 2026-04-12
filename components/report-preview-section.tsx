import { Lock } from "lucide-react"

function Redacted({ children, level = "full" }: { children: string; level?: "full" | "partial" }) {
  return (
    <span
      className="select-none inline-block"
      style={{ filter: level === "full" ? "blur(5px)" : "blur(3px)" }}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3 py-1.5 border-b border-dashed" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
      <span className="text-[0.65rem] font-semibold uppercase tracking-wider shrink-0 w-[130px]" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      <span className="text-[0.8rem]" style={{ color: "var(--foreground)" }}>
        {children}
      </span>
    </div>
  )
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div
      className="text-[0.6rem] font-bold uppercase tracking-[0.15em] mt-5 mb-2 pb-1 border-b"
      style={{ color: "var(--primary)", borderColor: "rgba(184, 150, 63, 0.2)" }}
    >
      {children}
    </div>
  )
}

export function ReportPreviewSection() {
  return (
    <section
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8"
      style={{ background: "var(--background)" }}
      aria-labelledby="relatorio-heading"
    >
      <div className="max-w-[700px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div
            className="flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Exemplo Real
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2
            id="relatorio-heading"
            className="font-serif text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-2"
          >
            Veja o Que Você Vai{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Receber</em>
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-lg mx-auto" style={{ color: "var(--muted-foreground)" }}>
            Exemplo de relatório real com dados censurados por sigilo.
          </p>
        </div>

        {/* Report Card */}
        <div
          className="relative rounded-xl md:rounded-2xl overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* Report Header */}
          <div
            className="px-5 md:px-7 py-4 flex items-center justify-between"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
            }}
          >
            <div>
              <div className="text-[0.7rem] md:text-xs font-bold uppercase tracking-wider text-white/90">
                Relatório de Investigação Digital
              </div>
              <div className="text-[0.6rem] text-white/50 mt-0.5">
                Ref: #DTV-2026-04789 · 12/04/2026
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[0.55rem] font-bold uppercase" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
              <Lock size={10} />
              Confidencial
            </div>
          </div>

          {/* Report Body */}
          <div className="px-5 md:px-7 py-5 md:py-6">
            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--success)" }} />
              <span className="text-[0.7rem] font-semibold" style={{ color: "var(--success)" }}>
                INVESTIGAÇÃO CONCLUÍDA
              </span>
            </div>

            {/* Personal Data */}
            <SectionTitle>Dados Pessoais</SectionTitle>
            <Field label="Nome Completo"><Redacted>Maria Eduarda Santos Silva</Redacted></Field>
            <Field label="CPF"><Redacted level="partial">312.456.789-01</Redacted></Field>
            <Field label="Data de Nasc."><Redacted>15/03/1988</Redacted></Field>
            <Field label="Nome da Mãe"><Redacted>Ana Carolina Santos</Redacted></Field>
            <Field label="Escolaridade"><Redacted>Ensino Superior Completo</Redacted></Field>

            {/* Addresses */}
            <SectionTitle>Endereços Vinculados</SectionTitle>
            <div className="space-y-2 py-1.5">
              <div className="flex items-start gap-2 text-[0.8rem]" style={{ color: "var(--foreground)" }}>
                <span style={{ color: "var(--primary)" }}>▸</span>
                <span>Rua <Redacted>das Palmeiras</Redacted>, <Redacted>847</Redacted> — <Redacted>Jardim Europa</Redacted>, <Redacted>São Paulo</Redacted>/SP</span>
              </div>
              <div className="flex items-start gap-2 text-[0.8rem]" style={{ color: "var(--foreground)" }}>
                <span style={{ color: "var(--primary)" }}>▸</span>
                <span>Av. <Redacted>Paulista</Redacted>, <Redacted>1578</Redacted> Apto <Redacted>204</Redacted> — <Redacted>Bela Vista</Redacted>, <Redacted>São Paulo</Redacted>/SP</span>
              </div>
            </div>

            {/* Phones */}
            <SectionTitle>Telefones</SectionTitle>
            <div className="space-y-2 py-1.5">
              <div className="flex items-center gap-2 text-[0.8rem]" style={{ color: "var(--foreground)" }}>
                <span style={{ color: "var(--primary)" }}>▸</span>
                (<Redacted>11</Redacted>) <Redacted>98765</Redacted>-<Redacted>4321</Redacted>
                <span className="text-[0.6rem] px-1.5 py-0.5 rounded" style={{ background: "rgba(22,163,74,0.08)", color: "var(--success)" }}>Celular</span>
              </div>
              <div className="flex items-center gap-2 text-[0.8rem]" style={{ color: "var(--foreground)" }}>
                <span style={{ color: "var(--primary)" }}>▸</span>
                (<Redacted>11</Redacted>) <Redacted>3456</Redacted>-<Redacted>7890</Redacted>
                <span className="text-[0.6rem] px-1.5 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.04)", color: "var(--muted)" }}>Fixo</span>
              </div>
            </div>

            {/* Financial */}
            <SectionTitle>Informações Financeiras</SectionTitle>
            <Field label="Score de Crédito"><Redacted>742</Redacted></Field>
            <Field label="Faixa de Renda"><Redacted>R$ 5.000 - 8.000</Redacted></Field>
            <Field label="Processos">
              <Redacted>2</Redacted>{" "}
              <span className="text-[0.7rem]" style={{ color: "var(--muted)" }}>encontrado(s)</span>
            </Field>

            {/* Vehicles */}
            <SectionTitle>Veículos</SectionTitle>
            <div className="flex items-center gap-2 text-[0.8rem] py-1.5" style={{ color: "var(--foreground)" }}>
              <span style={{ color: "var(--primary)" }}>▸</span>
              <Redacted>Toyota Corolla 2021/2022</Redacted> · Placa: <Redacted>ABC-1D23</Redacted>
            </div>

            {/* Premium tag */}
            <div
              className="mt-6 p-3 rounded-lg text-center text-[0.7rem] font-medium"
              style={{
                background: "rgba(184, 150, 63, 0.06)",
                border: "1px solid rgba(184, 150, 63, 0.12)",
                color: "var(--muted-foreground)",
              }}
            >
              <strong style={{ color: "var(--primary)" }}>+15 campos adicionais</strong> disponíveis no plano Premium:
              parentes, e-mails, redes sociais, empresas vinculadas e mais.
            </div>
          </div>

          {/* Confidencial watermark overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="text-[3rem] md:text-[4.5rem] font-black uppercase tracking-[0.2em] rotate-[-18deg] opacity-[0.03]"
              style={{ color: "var(--foreground)" }}
            >
              Confidencial
            </span>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-[0.68rem] mt-4" style={{ color: "var(--muted)" }}>
          Dados fictícios. Relatório real censurado por sigilo profissional (Lei 13.432/17).
        </p>
      </div>
    </section>
  )
}
