import { Lock, Eye, ChevronRight, ChevronDown, MapPin, Phone, CreditCard, Car, User, AlertCircle, Mail, Globe, Users, Building2, Briefcase, Shield, Wifi, FileText } from "lucide-react"

/* ── Helpers ── */

function DataRow({ label, children, highlight }: { label: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div
      className="flex items-baseline gap-3 py-2 px-3 -mx-3 rounded-md"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", background: highlight ? "rgba(184,150,63,0.03)" : "transparent" }}
    >
      <span className="text-[0.6rem] font-bold uppercase tracking-wider shrink-0 w-[110px] sm:w-[140px]" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      <span className="text-[0.78rem] font-medium" style={{ color: "var(--foreground)" }}>
        {children}
      </span>
    </div>
  )
}

function Cat({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mt-6 mb-1.5">
      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "rgba(184,150,63,0.1)" }}>
        <Icon size={13} strokeWidth={2.5} style={{ color: "var(--primary)" }} />
      </div>
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--primary)" }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(184,150,63,0.12)" }} />
    </div>
  )
}

function Alert({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-[0.58rem] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(220,38,38,0.06)", color: "#dc2626" }}>
      <AlertCircle size={9} />
      {children}
    </span>
  )
}

function Badge({ children, v }: { children: React.ReactNode; v: "success" | "warning" | "neutral" | "info" }) {
  const s = {
    success: { bg: "rgba(22,163,74,0.08)", c: "#16a34a" },
    warning: { bg: "rgba(234,179,8,0.08)", c: "#ca8a04" },
    neutral: { bg: "rgba(0,0,0,0.04)", c: "var(--muted)" },
    info:    { bg: "rgba(59,130,246,0.08)", c: "#3b82f6" },
  }[v]
  return (
    <span className="text-[0.58rem] font-bold px-1.5 py-0.5 rounded" style={{ background: s.bg, color: s.c }}>
      {children}
    </span>
  )
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-[0.78rem] p-2.5 rounded-lg" style={{ background: "rgba(0,0,0,0.015)", color: "var(--foreground)" }}>
      <span className="mt-0.5 shrink-0" style={{ color: "var(--primary)" }}>{"\u25B8"}</span>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function Sub({ children }: { children: React.ReactNode }) {
  return <div className="text-[0.6rem] mt-0.5" style={{ color: "var(--muted)" }}>{children}</div>
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 py-2.5 px-3.5 rounded-lg text-[0.72rem] leading-relaxed" style={{ background: "rgba(59,130,246,0.04)", borderLeft: "2px solid rgba(59,130,246,0.25)", color: "var(--muted-foreground)" }}>
      <span className="font-bold text-[0.58rem] uppercase tracking-wider block mb-0.5" style={{ color: "rgba(59,130,246,0.6)" }}>{"Observa\u00E7\u00E3o do analista"}</span>
      {children}
    </div>
  )
}

function RedFlag({ children, severity = "high" }: { children: React.ReactNode; severity?: "high" | "medium" }) {
  const isHigh = severity === "high"
  return (
    <div className="flex items-start gap-2.5 py-2 px-3 rounded-lg" style={{ background: isHigh ? "rgba(220,38,38,0.04)" : "rgba(234,179,8,0.04)" }}>
      <span className="mt-0.5 w-2 h-2 rounded-full shrink-0" style={{ background: isHigh ? "#dc2626" : "#ca8a04" }} />
      <span className="text-[0.72rem] leading-snug" style={{ color: "var(--foreground)" }}>{children}</span>
    </div>
  )
}

/* ── Component ── */

export function ReportPreviewSection() {
  return (
    <section className="relative z-[1] py-12 md:py-20 px-4 md:px-8" style={{ background: "var(--background-secondary)" }} aria-labelledby="relatorio-heading">
      <div className="max-w-[680px] mx-auto">

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "var(--primary)" }}>
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            Exemplo Real
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2 id="relatorio-heading" className="font-serif text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-2">
            {"Veja o Que Voc\u00EA Vai "}
            <em className="italic" style={{ color: "var(--primary)" }}>Receber</em>
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-lg mx-auto" style={{ color: "var(--muted-foreground)" }}>
            {"Exemplo ilustrativo de uma investiga\u00E7\u00E3o completa com dados fict\u00EDcios."}
          </p>
        </div>

        {/* Report Card */}
        <div className="relative rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)" }}>

          {/* ── Dark Header ── */}
          <div className="px-5 md:px-7 py-4 md:py-5" style={{ background: "linear-gradient(135deg, #1a1a1f 0%, #2a2a32 100%)" }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: "rgba(184,150,63,0.8)" }}>Detetive VIP</div>
                <div className="text-[0.72rem] md:text-[0.82rem] font-bold text-white">{"Relat\u00F3rio de Investiga\u00E7\u00E3o Digital"}</div>
                <div className="text-[0.58rem] text-white/40 mt-0.5 font-mono">{"#DTV-2026-04789 \u00B7 12/04/2026 \u00B7 14:32h"}</div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[0.55rem] font-bold uppercase tracking-wider" style={{ background: "rgba(184,150,63,0.15)", color: "var(--primary-light)", border: "1px solid rgba(184,150,63,0.2)" }}>
                <Lock size={10} />
                Confidencial
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#16a34a" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#16a34a" }} />
                </span>
                <span className="text-[0.62rem] font-semibold" style={{ color: "#4ade80" }}>{"INVESTIGA\u00C7\u00C3O CONCLU\u00CDDA"}</span>
              </div>
              <span className="text-[0.55rem] text-white/30">|</span>
              <span className="text-[0.55rem] text-white/40">Investiga&#231;&#227;o Premium</span>
            </div>
          </div>

          {/* ── Collapsible Body — <details> nativo, zero JS ── */}
          <details className="group">
            <summary
              className="faq-summary list-none cursor-pointer flex items-center justify-between gap-3 px-5 md:px-7 py-4 md:py-5 transition-colors"
              style={{
                background: "linear-gradient(180deg, rgba(184,150,63,0.03) 0%, rgba(184,150,63,0.06) 100%)",
                borderBottom: "1px solid rgba(184,150,63,0.12)",
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.14em] mb-0.5" style={{ color: "var(--primary)" }}>
                  Relatório Completo
                </div>
                <div className="text-sm md:text-base font-semibold" style={{ color: "var(--foreground)" }}>
                  Ver modelo completo do relatório
                </div>
                <div className="text-[0.7rem] md:text-[0.75rem] mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  Clique para expandir — exemplo real com dados fictícios
                </div>
              </div>
              <div
                className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(184,150,63,0.1)",
                  border: "1px solid rgba(184,150,63,0.2)",
                }}
              >
                <ChevronDown
                  size={18}
                  strokeWidth={2.5}
                  className="faq-chevron transition-transform duration-300"
                  style={{ color: "var(--primary)" }}
                  aria-hidden="true"
                />
              </div>
            </summary>

          {/* ── Report Body ── */}
          <div className="px-5 md:px-7 py-5 md:py-6">

            {/* ── RESUMO DA INVESTIGAÇÃO ── */}
            <div className="mb-6 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(184,150,63,0.15)", background: "linear-gradient(135deg, rgba(184,150,63,0.03) 0%, rgba(184,150,63,0.07) 100%)" }}>
              <div className="px-4 md:px-5 py-3 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(184,150,63,0.1)" }}>
                <Briefcase size={14} strokeWidth={2.5} style={{ color: "var(--primary)" }} />
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--primary)" }}>
                  {"Resumo da Investiga\u00E7\u00E3o"}
                </span>
              </div>
              <div className="px-4 md:px-5 py-4">
                <p className="text-[0.78rem] md:text-[0.82rem] leading-[1.7]" style={{ color: "var(--foreground)" }}>
                  {"O investigado "}
                  <strong>Fulano Beltrano Ciclano da Silva</strong>
                  {", 36 anos, CPF 000.111.222-33, foi "}
                  <strong>{"identificado e localizado com sucesso"}</strong>
                  {" atrav\u00E9s do cruzamento de 32 bases de dados oficiais e p\u00FAblicas. Residente na regi\u00E3o de S\u00E3o Paulo/SP (Jardim Modelo), exerce a profiss\u00E3o de Analista de Sistemas e mant\u00E9m participa\u00E7\u00E3o societ\u00E1ria em empresa ativa no ramo de tecnologia."}
                </p>
                <p className="text-[0.78rem] md:text-[0.82rem] leading-[1.7] mt-3" style={{ color: "var(--foreground)" }}>
                  {"A an\u00E1lise revelou pontos cr\u00EDticos: "}
                  <strong style={{ color: "#dc2626" }}>{"restri\u00E7\u00E3o financeira ativa"}</strong>
                  {" no Serasa no valor de R$ 3.150,00, envolvimento como r\u00E9 em a\u00E7\u00E3o c\u00EDvel de cobran\u00E7a no TJSP, e exposi\u00E7\u00E3o em "}
                  <strong style={{ color: "#dc2626" }}>{"3 vazamentos de dados"}</strong>
                  {" com senhas comprometidas. O perfil digital indica presen\u00E7a ativa em 4 redes sociais com perfil p\u00FAblico no Instagram (1.523 seguidores)."}
                </p>
              </div>
            </div>

            {/* ── PONTOS DE ATENÇÃO ── */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2.5">
                <AlertCircle size={14} strokeWidth={2.5} style={{ color: "#dc2626" }} />
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: "#dc2626" }}>
                  {"Pontos de Aten\u00E7\u00E3o"}
                </span>
              </div>
              <div className="space-y-1.5">
                <RedFlag>
                  <strong>{"Restri\u00E7\u00E3o financeira ativa (Serasa)"}</strong>
                  {" \u2014 D\u00EDvida estimada de R$ 3.150,00 com institui\u00E7\u00E3o banc\u00E1ria"}
                </RedFlag>
                <RedFlag>
                  <strong>{"Processo judicial em andamento"}</strong>
                  {" \u2014 R\u00E9 em a\u00E7\u00E3o de cobran\u00E7a no TJSP (c\u00EDvel)"}
                </RedFlag>
                <RedFlag severity="medium">
                  <strong>{"3 vazamentos de dados detectados"}</strong>
                  {" \u2014 Senhas e dados pessoais expostos em bases comprometidas"}
                </RedFlag>
                <RedFlag severity="medium">
                  <strong>{"CPF consultado 7 vezes nos \u00FAltimos 30 dias"}</strong>
                  {" \u2014 Atividade acima da m\u00E9dia para o perfil"}
                </RedFlag>
              </div>
            </div>

            <div className="h-px mb-2" style={{ background: "rgba(0,0,0,0.04)" }} />

            {/* DADOS PESSOAIS */}
            <Cat icon={User}>Dados Pessoais</Cat>
            <DataRow label="Nome Completo">Fulano Beltrano Ciclano da Silva</DataRow>
            <DataRow label="CPF">000.111.222-33</DataRow>
            <DataRow label="RG">00.000.000-0 SSP/SP</DataRow>
            <DataRow label="Data de Nasc.">01/01/1990 <span className="text-[0.65rem]" style={{ color: "var(--muted)" }}>(36 anos)</span></DataRow>
            <DataRow label="Sexo">Masculino</DataRow>
            <DataRow label="Nome da M&#227;e">Fulana Beltrana da Silva</DataRow>
            <DataRow label="Signo">{"Capric\u00F3rnio"}</DataRow>
            <DataRow label="Situa&#231;&#227;o CPF"><Badge v="success">Regular</Badge></DataRow>
            <DataRow label="&#211;bito">Nada consta</DataRow>
            <DataRow label="Escolaridade">Ensino Superior Completo</DataRow>
            <DataRow label="Profiss&#227;o">Analista de Sistemas</DataRow>
            <DataRow label="Estado Civil">Casado(a)</DataRow>

            <Note>
              {"Investigado mudou-se 3 vezes nos \u00FAltimos 10 anos, todas dentro do estado de SP. Endere\u00E7o atual confirmado atrav\u00E9s de cruzamento com registros de consumo."}
            </Note>

            {/* E-MAILS */}
            <Cat icon={Mail}>{"E-mails Vinculados"}</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  fulano.beltrano@gmail.com
                  <Badge v="success">Ativo</Badge>
                  <Badge v="info">Principal</Badge>
                </div>
                <Sub>{"Vinculado a 3 plataformas \u00B7 Criado em ~2012"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  fulano@empresa.com.br
                  <Badge v="success">Ativo</Badge>
                  <Badge v="neutral">Corporativo</Badge>
                </div>
                <Sub>{"Dom\u00EDnio: empresa.com.br"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  fulaninho123@hotmail.com
                  <Badge v="warning">Inativo</Badge>
                </div>
              </ListItem>
            </div>

            {/* ENDEREÇOS */}
            <Cat icon={MapPin}>{"Endere\u00E7os Vinculados"}</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div>{"Rua das Flores, 123 \u2014 Jardim Modelo, S\u00E3o Paulo/SP"}</div>
                <Sub>{"CEP: 01234-567 \u00B7 Registrado desde 2019 \u00B7 "}<Badge v="success">Atual</Badge></Sub>
              </ListItem>
              <ListItem>
                <div>{"Av. Brasil, 456 Apto 78 \u2014 Centro, Rio de Janeiro/RJ"}</div>
                <Sub>{"CEP: 20040-020 \u00B7 2016\u20132019"}</Sub>
              </ListItem>
              <ListItem>
                <div>{"Rua dos Girassois, 789 \u2014 Vila Nova, Campinas/SP"}</div>
                <Sub>{"CEP: 13015-000 \u00B7 2012\u20132016"}</Sub>
              </ListItem>
            </div>

            {/* TELEFONES */}
            <Cat icon={Phone}>Telefones</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  (11) 99999-0000
                  <Badge v="success">Ativo</Badge>
                  <Badge v="info">WhatsApp</Badge>
                </div>
                <Sub>{"Operadora: Vivo \u00B7 Tipo: M\u00F3vel \u00B7 Desde 2017"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  (11) 3333-4444
                  <Badge v="neutral">Fixo</Badge>
                </div>
                <Sub>{"Operadora: NET/Claro \u00B7 Vinculado ao endere\u00E7o 1"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  (21) 98888-7777
                  <Badge v="warning">Inativo</Badge>
                </div>
                <Sub>{"Operadora: TIM \u00B7 \u00DAltimo uso: 2021"}</Sub>
              </ListItem>
            </div>

            {/* REDES SOCIAIS */}
            <Cat icon={Globe}>Redes Sociais</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[0.72rem]">Instagram</span>
                  @fulano.beltrano
                  <Badge v="success">Ativo</Badge>
                </div>
                <Sub>{"1.523 seguidores \u00B7 Perfil aberto \u00B7 847 fotos"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[0.72rem]">Facebook</span>
                  Fulano Beltrano da Silva
                  <Badge v="success">Ativo</Badge>
                </div>
                <Sub>{"Perfil desde 2011 \u00B7 S\u00E3o Paulo, SP"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[0.72rem]">LinkedIn</span>
                  Fulano B. Silva
                  <Badge v="success">Ativo</Badge>
                </div>
                <Sub>Analista de Sistemas na Empresa Exemplo S.A.</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[0.72rem]">TikTok</span>
                  @fulaninho123
                  <Badge v="warning">Inativo</Badge>
                </div>
              </ListItem>
            </div>

            <Note>
              {"Investigado possui perfil p\u00FAblico no Instagram com exposi\u00E7\u00E3o significativa (fotos de viagens, localiza\u00E7\u00F5es, rotina). Perfil do LinkedIn confirma v\u00EDnculo empregat\u00EDcio atual."}
            </Note>

            {/* FINANCEIRO */}
            <Cat icon={CreditCard}>{"Informa\u00E7\u00F5es Financeiras"}</Cat>
            <DataRow label="Score Cr&#233;dito" highlight>
              742
              <span className="ml-1"><Badge v="success">Bom</Badge></span>
            </DataRow>
            <DataRow label="Faixa de Renda">R$ 5.000 - 8.000</DataRow>
            <DataRow label="Restri&#231;&#245;es" highlight>
              {"1 registro(s) "}
              <Alert>Negativado</Alert>
            </DataRow>
            <DataRow label="D&#237;vida Estimada">R$ 3.150,00 <span className="text-[0.6rem]" style={{ color: "var(--muted)" }}>(Serasa)</span></DataRow>
            <DataRow label="Cheques s/Fundo">Nada consta</DataRow>
            <DataRow label="Benef&#237;cios Sociais">Nada consta</DataRow>
            <DataRow label="Imposto de Renda">
              {"Declarante "}
              <span className="text-[0.6rem]" style={{ color: "var(--muted)" }}>(2024/2025)</span>
            </DataRow>

            {/* PROCESSOS JUDICIAIS */}
            <Cat icon={FileText}>Processos Judiciais</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  {"Processo n\u00BA 0000000-00.0000.0.00.0000"}
                  <Alert>{"R\u00E9"}</Alert>
                </div>
                <Sub>{"TJSP \u00B7 C\u00EDvel \u00B7 Cobran\u00E7a \u00B7 Banco Exemplo S.A. \u00B7 Em andamento"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  {"Processo n\u00BA 0000000-00.0000.0.00.0001"}
                  <Badge v="neutral">Autor</Badge>
                </div>
                <Sub>{"TJSP \u00B7 Trabalhista \u00B7 vs. Empresa ABC Ltda \u00B7 Encerrado 2022"}</Sub>
              </ListItem>
            </div>

            <Note>
              {"O processo c\u00EDvel de cobran\u00E7a movido pelo Banco Exemplo \u00E9 compat\u00EDvel com a restri\u00E7\u00E3o Serasa identificada. O processo trabalhista (encerrado) indica passagem anterior por empresa do ramo de varejo."}
            </Note>

            {/* VEÍCULOS */}
            <Cat icon={Car}>{"Ve\u00EDculos"}</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  {"Toyota Corolla XEi 2021/2022 \u00B7 Placa: ABC-1D23"}
                  <Badge v="success">Regular</Badge>
                </div>
                <Sub>{"Cor: Prata \u00B7 RENAVAM: 00000000000 \u00B7 IPVA 2026: Pago"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  {"Honda CG 160 Start 2020 \u00B7 Placa: XYZ-9H87"}
                  <Badge v="warning">{"D\u00E9bitos"}</Badge>
                </div>
                <Sub>{"Cor: Preta \u00B7 IPVA 2026: "}<Alert>Pendente</Alert>{" \u00B7 Multas: 2"}</Sub>
              </ListItem>
            </div>

            {/* PARENTES / VÍNCULOS */}
            <Cat icon={Users}>{"Parentes e V\u00EDnculos"}</Cat>
            <div className="space-y-1.5 py-1.5">
              {[
                { nome: "Ciclano Pai da Silva", parentesco: "Pai", cpf: "000.000.000-01" },
                { nome: "Fulana Beltrana da Silva", parentesco: "M\u00E3e", cpf: "000.000.000-02" },
                { nome: "Beltrano Filho da Silva", parentesco: "Irm\u00E3o", cpf: "000.000.000-03" },
                { nome: "Ciclana Irm\u00E3 da Silva", parentesco: "Irm\u00E3", cpf: "000.000.000-04" },
                { nome: "Deltrana Pereira Souza", parentesco: "Ex-c\u00F4njuge", cpf: "000.000.000-05" },
              ].map((p) => (
                <ListItem key={p.cpf}>
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.nome}
                    <Badge v="neutral">{p.parentesco}</Badge>
                  </div>
                  <Sub>{"CPF: "}{p.cpf}</Sub>
                </ListItem>
              ))}
            </div>

            {/* EMPRESAS */}
            <Cat icon={Building2}>{"Participa\u00E7\u00E3o Societ\u00E1ria"}</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  Empresa Exemplo Tecnologia LTDA
                  <Badge v="success">Ativa</Badge>
                </div>
                <Sub>{"CNPJ: 00.000.000/0001-00 \u00B7 S\u00F3cio (50%) \u00B7 Desde 2020"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  Fulano Digital MEI
                  <Badge v="warning">Baixada</Badge>
                </div>
                <Sub>{"CNPJ: 00.000.000/0002-00 \u00B7 Titular \u00B7 2018\u20132020"}</Sub>
              </ListItem>
            </div>

            {/* HISTÓRICO DE CONSULTAS */}
            <Cat icon={Shield}>{"Hist\u00F3rico de Consultas ao CPF"}</Cat>
            <DataRow label="&#218;ltima Consulta">{"08/04/2026 "}<span className="text-[0.6rem]" style={{ color: "var(--muted)" }}>{"(4 dias atr\u00E1s)"}</span></DataRow>
            <DataRow label="Consultas 30d">{"7 consultas"}</DataRow>
            <DataRow label="Origem">{"Institui\u00E7\u00E3o financeira, com\u00E9rcio"}</DataRow>

            {/* DADOS DIGITAIS */}
            <Cat icon={Wifi}>{"Presen\u00E7a Digital"}</Cat>
            <DataRow label="Vazamentos">
              {"3 banco(s) de dados "}
              <Alert>{"Exposi\u00E7\u00E3o"}</Alert>
            </DataRow>
            <DataRow label="Senhas Vazadas">
              {"2 senha(s) encontrada(s)"}
            </DataRow>
            <DataRow label="Chave PIX">{"CPF, e-mail, celular "}<span className="text-[0.6rem]" style={{ color: "var(--muted)" }}>(3 chaves)</span></DataRow>

            {/* ── Parecer do Analista ── */}
            <div className="mt-8 mb-6 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(26,26,31,0.08)", background: "linear-gradient(135deg, #1a1a1f 0%, #2a2a32 100%)" }}>
              <div className="px-4 md:px-5 py-3 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <FileText size={13} strokeWidth={2.5} style={{ color: "rgba(184,150,63,0.8)" }} />
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: "rgba(184,150,63,0.8)" }}>
                  {"Parecer do Analista"}
                </span>
              </div>
              <div className="px-4 md:px-5 py-4">
                <p className="text-[0.75rem] md:text-[0.8rem] leading-[1.7] text-white/70">
                  {"Com base nos dados levantados, o investigado apresenta perfil de "}
                  <strong className="text-white/90">{"risco moderado"}</strong>
                  {". Os principais fatores s\u00E3o: restri\u00E7\u00E3o financeira ativa com d\u00EDvida em aberto, processo judicial como r\u00E9, e exposi\u00E7\u00E3o em m\u00FAltiplos vazamentos de dados. Por outro lado, mant\u00E9m CPF regular, v\u00EDnculo empregat\u00EDcio est\u00E1vel e endere\u00E7o fixo h\u00E1 mais de 5 anos."}
                </p>
                <p className="text-[0.75rem] md:text-[0.8rem] leading-[1.7] text-white/70 mt-2.5">
                  <strong className="text-white/90">{"Recomenda\u00E7\u00E3o: "}</strong>
                  {"Em caso de transa\u00E7\u00E3o financeira, recomenda-se cautela e verifica\u00E7\u00E3o adicional de garantias. Para outros fins, o perfil n\u00E3o apresenta ind\u00EDcios de fraude ou falsidade ideol\u00F3gica."}
                </p>
                <div className="flex items-center gap-3 mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[0.55rem] text-white/30">{"N\u00EDvel de confian\u00E7a:"}</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((i) => (
                        <span key={i} className="w-3 h-1.5 rounded-sm" style={{ background: i <= 4 ? "rgba(184,150,63,0.7)" : "rgba(255,255,255,0.1)" }} />
                      ))}
                    </div>
                    <span className="text-[0.55rem] font-semibold" style={{ color: "rgba(184,150,63,0.7)" }}>Alto</span>
                  </div>
                  <span className="text-[0.55rem] text-white/20">|</span>
                  <span className="text-[0.55rem] text-white/30">{"Analista: F. Exemplo"}</span>
                </div>
              </div>
            </div>

            {/* ── Locked Premium+ ── */}
            <div className="mt-8 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(184,150,63,0.15)", background: "linear-gradient(135deg, rgba(184,150,63,0.03) 0%, rgba(184,150,63,0.06) 100%)" }}>
              <div className="px-4 pt-4 pb-2 space-y-2">
                {[
                  { label: "Vizinhos no endere\u00E7o atual", count: "5 registros" },
                  { label: "Fotos p\u00FAblicas encontradas", count: "12 imagens" },
                  { label: "Hist\u00F3rico de trabalho", count: "4 empresas" },
                  { label: "Passagens a\u00E9reas recentes", count: "2 viagens" },
                  { label: "Registros de im\u00F3veis", count: "1 propriedade" },
                  { label: "Hist\u00F3rico de telefones", count: "6 n\u00FAmeros" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1.5 px-3 rounded-md" style={{ background: "rgba(255,255,255,0.5)" }}>
                    <div className="flex items-center gap-2">
                      <Lock size={10} style={{ color: "var(--primary)" }} />
                      <span className="text-[0.72rem] font-medium" style={{ color: "var(--muted-foreground)" }}>{item.label}</span>
                    </div>
                    <span className="text-[0.62rem] font-semibold" style={{ color: "var(--primary)" }}>{item.count}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-4 pt-2">
                <a
                  href="#planos"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[0.72rem] font-bold uppercase tracking-wider text-white transition-all active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", boxShadow: "0 2px 8px rgba(184,150,63,0.3)" }}
                >
                  <Eye size={14} />
                  {"Desbloquear Relat\u00F3rio Completo"}
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>
          </details>

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
            <span className="text-[3.5rem] md:text-[5rem] font-black uppercase tracking-[0.2em] rotate-[-18deg] opacity-[0.02]" style={{ color: "var(--foreground)" }}>
              Confidencial
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
