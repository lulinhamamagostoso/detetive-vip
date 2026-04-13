"use client"

import { Lock, Eye, ChevronRight, MapPin, Phone, CreditCard, Car, User, AlertCircle } from "lucide-react"

function Blur({ children, intensity = "full" }: { children: string; intensity?: "full" | "medium" | "light" }) {
  const blur = intensity === "full" ? "blur(6px)" : intensity === "medium" ? "blur(4px)" : "blur(3px)"
  return (
    <span
      className="select-none inline-block"
      style={{ filter: blur, WebkitUserSelect: "none" }}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

function DataRow({ label, children, highlight }: { label: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div
      className="flex items-baseline gap-3 py-2 px-3 -mx-3 rounded-md transition-colors"
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.04)",
        background: highlight ? "rgba(184, 150, 63, 0.03)" : "transparent",
      }}
    >
      <span
        className="text-[0.6rem] font-bold uppercase tracking-wider shrink-0 w-[110px] sm:w-[130px]"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </span>
      <span className="text-[0.78rem] font-medium" style={{ color: "var(--foreground)" }}>
        {children}
      </span>
    </div>
  )
}

function CategoryHeader({ icon: Icon, children }: { icon: React.ElementType; children: string }) {
  return (
    <div className="flex items-center gap-2 mt-6 mb-1.5">
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center"
        style={{ background: "rgba(184, 150, 63, 0.1)" }}
      >
        <Icon size={13} strokeWidth={2.5} style={{ color: "var(--primary)" }} />
      </div>
      <span
        className="text-[0.62rem] font-bold uppercase tracking-[0.14em]"
        style={{ color: "var(--primary)" }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(184, 150, 63, 0.12)" }} />
    </div>
  )
}

function AlertBadge({ children }: { children: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[0.58rem] font-bold px-1.5 py-0.5 rounded"
      style={{ background: "rgba(220, 38, 38, 0.06)", color: "#dc2626" }}
    >
      <AlertCircle size={9} />
      {children}
    </span>
  )
}

function StatusBadge({ children, variant }: { children: string; variant: "success" | "warning" | "neutral" }) {
  const styles = {
    success: { bg: "rgba(22, 163, 74, 0.08)", color: "#16a34a" },
    warning: { bg: "rgba(234, 179, 8, 0.08)", color: "#ca8a04" },
    neutral: { bg: "rgba(0,0,0,0.04)", color: "var(--muted)" },
  }
  const s = styles[variant]
  return (
    <span
      className="text-[0.58rem] font-bold px-1.5 py-0.5 rounded"
      style={{ background: s.bg, color: s.color }}
    >
      {children}
    </span>
  )
}

export function ReportPreviewSection() {
  return (
    <section
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8"
      style={{ background: "var(--background)" }}
      aria-labelledby="relatorio-heading"
    >
      <div className="max-w-[680px] mx-auto">
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
            Veja o Que Voc{"\u00EA"} Vai{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Receber</em>
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed max-w-lg mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            Relat{"\u00F3"}rio real de investiga{"\u00E7\u00E3"}o com dados censurados por sigilo.
          </p>
        </div>

        {/* Report Card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
          }}
        >
          {/* Report Header - Premium dark */}
          <div
            className="px-5 md:px-7 py-4 md:py-5"
            style={{
              background: "linear-gradient(135deg, #1a1a1f 0%, #2a2a32 100%)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: "rgba(184, 150, 63, 0.8)" }}>
                  Detetive VIP
                </div>
                <div className="text-[0.72rem] md:text-[0.82rem] font-bold text-white">
                  Relat{"\u00F3"}rio de Investiga{"\u00E7\u00E3"}o Digital
                </div>
                <div className="text-[0.58rem] text-white/40 mt-0.5 font-mono">
                  #DTV-2026-04789 {"\u00B7"} 12/04/2026 {"\u00B7"} 14:32h
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[0.55rem] font-bold uppercase tracking-wider"
                style={{ background: "rgba(184, 150, 63, 0.15)", color: "var(--primary-light)", border: "1px solid rgba(184, 150, 63, 0.2)" }}
              >
                <Lock size={10} />
                Confidencial
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#16a34a" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#16a34a" }} />
                </span>
                <span className="text-[0.62rem] font-semibold" style={{ color: "#4ade80" }}>
                  INVESTIGA{"\u00C7\u00C3"}O CONCLU{"\u00CD"}DA
                </span>
              </div>
              <span className="text-[0.55rem] text-white/30">|</span>
              <span className="text-[0.55rem] text-white/40">
                32 fontes consultadas
              </span>
              <span className="text-[0.55rem] text-white/30">|</span>
              <span className="text-[0.55rem] text-white/40">
                Tempo: 3min 47s
              </span>
            </div>
          </div>

          {/* Report Body */}
          <div className="px-5 md:px-7 py-5 md:py-6">

            {/* ── Dados Pessoais ── */}
            <CategoryHeader icon={User}>Dados Pessoais</CategoryHeader>
            <DataRow label="Nome Completo"><Blur>Maria Eduarda Santos Silva</Blur></DataRow>
            <DataRow label="CPF"><Blur intensity="medium">312.456.789-01</Blur></DataRow>
            <DataRow label="Data de Nasc."><Blur>15/03/1988</Blur> <span className="text-[0.65rem]" style={{ color: "var(--muted)" }}>(38 anos)</span></DataRow>
            <DataRow label="Nome da M{'\u00E3'}e"><Blur>Ana Carolina Santos</Blur></DataRow>
            <DataRow label="Situa{'\u00E7\u00E3'}o CPF">
              <StatusBadge variant="success">Regular</StatusBadge>
            </DataRow>
            <DataRow label="{'O'}bito">
              <span className="text-[0.78rem]" style={{ color: "var(--foreground)" }}>Nada consta</span>
            </DataRow>

            {/* ── Endereços ── */}
            <CategoryHeader icon={MapPin}>Endere{"\u00E7"}os Vinculados</CategoryHeader>
            <div className="space-y-1.5 py-1.5">
              <div className="flex items-start gap-2 text-[0.78rem] p-2.5 rounded-lg" style={{ background: "rgba(0,0,0,0.015)", color: "var(--foreground)" }}>
                <span className="mt-0.5" style={{ color: "var(--primary)" }}>{"\u25B8"}</span>
                <div>
                  <div>Rua <Blur>das Palmeiras</Blur>, <Blur>847</Blur> {"\u2014"} <Blur>Jardim Europa</Blur>, <Blur>S{"\u00E3"}o Paulo</Blur>/SP</div>
                  <div className="text-[0.6rem] mt-0.5" style={{ color: "var(--muted)" }}>CEP: <Blur intensity="light">01234-567</Blur> {"\u00B7"} Registrado desde 2019</div>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[0.78rem] p-2.5 rounded-lg" style={{ background: "rgba(0,0,0,0.015)", color: "var(--foreground)" }}>
                <span className="mt-0.5" style={{ color: "var(--primary)" }}>{"\u25B8"}</span>
                <div>
                  <div>Av. <Blur>Paulista</Blur>, <Blur>1578</Blur> Apto <Blur>204</Blur> {"\u2014"} <Blur>Bela Vista</Blur>, <Blur>S{"\u00E3"}o Paulo</Blur>/SP</div>
                  <div className="text-[0.6rem] mt-0.5" style={{ color: "var(--muted)" }}>CEP: <Blur intensity="light">04567-890</Blur> {"\u00B7"} Registrado desde 2022</div>
                </div>
              </div>
            </div>

            {/* ── Telefones ── */}
            <CategoryHeader icon={Phone}>Telefones</CategoryHeader>
            <div className="space-y-1.5 py-1.5">
              <div className="flex items-center gap-2 text-[0.78rem] p-2.5 rounded-lg" style={{ background: "rgba(0,0,0,0.015)", color: "var(--foreground)" }}>
                <span style={{ color: "var(--primary)" }}>{"\u25B8"}</span>
                (<Blur intensity="medium">11</Blur>) <Blur>98765</Blur>-<Blur>4321</Blur>
                <StatusBadge variant="success">Ativo</StatusBadge>
                <span className="text-[0.58rem]" style={{ color: "var(--muted)" }}>WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-[0.78rem] p-2.5 rounded-lg" style={{ background: "rgba(0,0,0,0.015)", color: "var(--foreground)" }}>
                <span style={{ color: "var(--primary)" }}>{"\u25B8"}</span>
                (<Blur intensity="medium">11</Blur>) <Blur>3456</Blur>-<Blur>7890</Blur>
                <StatusBadge variant="neutral">Fixo</StatusBadge>
              </div>
              <div className="flex items-center gap-2 text-[0.78rem] p-2.5 rounded-lg" style={{ background: "rgba(0,0,0,0.015)", color: "var(--foreground)" }}>
                <span style={{ color: "var(--primary)" }}>{"\u25B8"}</span>
                (<Blur intensity="medium">21</Blur>) <Blur>91234</Blur>-<Blur>5678</Blur>
                <StatusBadge variant="warning">Inativo</StatusBadge>
              </div>
            </div>

            {/* ── Financeiro ── */}
            <CategoryHeader icon={CreditCard}>Informa{"\u00E7\u00F5"}es Financeiras</CategoryHeader>
            <DataRow label="Score Cr{'\u00E9'}dito" highlight>
              <Blur>742</Blur>
              <span className="ml-1"><StatusBadge variant="success">Bom</StatusBadge></span>
            </DataRow>
            <DataRow label="Faixa de Renda"><Blur>R$ 5.000 - 8.000</Blur></DataRow>
            <DataRow label="Processos" highlight>
              <Blur intensity="medium">2</Blur>{" "}
              <span className="text-[0.65rem]" style={{ color: "var(--muted)" }}>encontrado(s)</span>
              <span className="ml-1"><AlertBadge>Aten{"\u00E7\u00E3"}o</AlertBadge></span>
            </DataRow>
            <DataRow label="Pend. Financ.">
              <Blur intensity="medium">1</Blur>{" "}
              <span className="text-[0.65rem]" style={{ color: "var(--muted)" }}>registro(s)</span>
              <span className="ml-1"><AlertBadge>Negativado</AlertBadge></span>
            </DataRow>

            {/* ── Veículos ── */}
            <CategoryHeader icon={Car}>Ve{"\u00ED"}culos</CategoryHeader>
            <div className="flex items-center gap-2 text-[0.78rem] py-2 px-3 -mx-3 rounded-md" style={{ color: "var(--foreground)" }}>
              <span style={{ color: "var(--primary)" }}>{"\u25B8"}</span>
              <Blur>Toyota Corolla XEi 2021/2022</Blur> {"\u00B7"} Placa: <Blur intensity="medium">ABC-1D23</Blur>
              <StatusBadge variant="success">Regular</StatusBadge>
            </div>
            <div className="flex items-center gap-2 text-[0.78rem] py-2 px-3 -mx-3 rounded-md" style={{ color: "var(--foreground)" }}>
              <span style={{ color: "var(--primary)" }}>{"\u25B8"}</span>
              <Blur>Honda CG 160 2020</Blur> {"\u00B7"} Placa: <Blur intensity="medium">XYZ-9H87</Blur>
              <StatusBadge variant="warning">D{"\u00E9"}bitos</StatusBadge>
            </div>

            {/* ── Locked Premium Section ── */}
            <div
              className="mt-6 rounded-xl overflow-hidden"
              style={{
                border: "1px solid rgba(184, 150, 63, 0.15)",
                background: "linear-gradient(135deg, rgba(184, 150, 63, 0.03) 0%, rgba(184, 150, 63, 0.06) 100%)",
              }}
            >
              {/* Locked rows preview */}
              <div className="px-4 pt-4 pb-2 space-y-2">
                {[
                  { icon: "E-mails", count: "3 encontrados" },
                  { icon: "Redes Sociais", count: "4 perfis" },
                  { icon: "Parentes", count: "7 v\u00EDnculos" },
                  { icon: "Empresas", count: "2 sociedades" },
                  { icon: "Vizinhos", count: "5 registros" },
                ].map((item) => (
                  <div
                    key={item.icon}
                    className="flex items-center justify-between py-1.5 px-3 rounded-md"
                    style={{ background: "rgba(255,255,255,0.5)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Lock size={10} style={{ color: "var(--primary)" }} />
                      <span className="text-[0.72rem] font-medium" style={{ color: "var(--muted-foreground)" }}>{item.icon}</span>
                    </div>
                    <span className="text-[0.62rem] font-semibold" style={{ color: "var(--primary)" }}>{item.count}</span>
                  </div>
                ))}
              </div>

              {/* CTA inside report */}
              <div className="px-4 pb-4 pt-2">
                <a
                  href="#planos"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[0.72rem] font-bold uppercase tracking-wider text-white transition-all active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                    boxShadow: "0 2px 8px rgba(184, 150, 63, 0.3)",
                  }}
                >
                  <Eye size={14} />
                  Desbloquear Relat{"\u00F3"}rio Completo
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Confidencial watermark overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="text-[3.5rem] md:text-[5rem] font-black uppercase tracking-[0.2em] rotate-[-18deg] opacity-[0.02]"
              style={{ color: "var(--foreground)" }}
            >
              Confidencial
            </span>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-[0.65rem] mt-4" style={{ color: "var(--muted)" }}>
          Dados fict{"\u00ED"}cios para demonstra{"\u00E7\u00E3"}o. Relat{"\u00F3"}rio real censurado por sigilo profissional (Lei 13.432/17).
        </p>
      </div>
    </section>
  )
}
