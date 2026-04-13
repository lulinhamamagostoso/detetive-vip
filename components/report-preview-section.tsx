{"use client"}

import { Lock, Eye, ChevronRight, MapPin, Phone, CreditCard, Car, User, AlertCircle, Mail, Globe, Users, Building2, Briefcase, Shield, Wifi, FileText } from "lucide-react"

/* ── Helpers ── */

function Blur({ children, intensity = "full" }: { children: React.ReactNode; intensity?: "full" | "medium" | "light" }) {
  const b = intensity === "full" ? "blur(6px)" : intensity === "medium" ? "blur(4px)" : "blur(3px)"
  return (
    <span className="select-none inline-block" style={{ filter: b, WebkitUserSelect: "none" }} aria-hidden="true">
      {children}
    </span>
  )
}

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

/* ── Component ── */

export function ReportPreviewSection() {
  return (
    <section className="relative z-[1] py-12 md:py-20 px-4 md:px-8" style={{ background: "var(--background)" }} aria-labelledby="relatorio-heading">
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
            {"Relat\u00F3rio real de investiga\u00E7\u00E3o com dados censurados por sigilo."}
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

          {/* ── Report Body ── */}
          <div className="px-5 md:px-7 py-5 md:py-6">

            {/* DADOS PESSOAIS */}
            <Cat icon={User}>Dados Pessoais</Cat>
            <DataRow label="Nome Completo"><Blur>Maria Eduarda Santos Silva</Blur></DataRow>
            <DataRow label="CPF"><Blur intensity="medium">312.456.789-01</Blur></DataRow>
            <DataRow label="RG"><Blur intensity="medium">42.567.890-3 SSP/SP</Blur></DataRow>
            <DataRow label="Data de Nasc."><Blur>15/03/1988</Blur> <span className="text-[0.65rem]" style={{ color: "var(--muted)" }}>(38 anos)</span></DataRow>
            <DataRow label="Sexo">Feminino</DataRow>
            <DataRow label="Nome da M&#227;e"><Blur>Ana Carolina Santos</Blur></DataRow>
            <DataRow label="Signo">Peixes</DataRow>
            <DataRow label="Situa&#231;&#227;o CPF"><Badge v="success">Regular</Badge></DataRow>
            <DataRow label="&#211;bito">Nada consta</DataRow>
            <DataRow label="Escolaridade"><Blur>Ensino Superior Completo</Blur></DataRow>
            <DataRow label="Profiss&#227;o"><Blur>Analista de Marketing</Blur></DataRow>
            <DataRow label="Estado Civil"><Blur>Solteira</Blur></DataRow>

            {/* E-MAILS */}
            <Cat icon={Mail}>{"E-mails Vinculados"}</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <Blur intensity="medium">{"maria.eduarda88@gmail.com"}</Blur>
                  <Badge v="success">Ativo</Badge>
                  <Badge v="info">Principal</Badge>
                </div>
                <Sub>Vinculado a 3 plataformas &middot; {"Criado em ~2012"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <Blur intensity="medium">{"meduarda@empresa.com.br"}</Blur>
                  <Badge v="success">Ativo</Badge>
                  <Badge v="neutral">Corporativo</Badge>
                </div>
                <Sub>{"Dom\u00EDnio: empresa.com.br"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <Blur intensity="medium">{"duda_santos@hotmail.com"}</Blur>
                  <Badge v="warning">Inativo</Badge>
                </div>
              </ListItem>
            </div>

            {/* ENDEREÇOS */}
            <Cat icon={MapPin}>{"Endere\u00E7os Vinculados"}</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div>{"Rua "}<Blur>das Palmeiras</Blur>{", "}<Blur>847</Blur>{" \u2014 "}<Blur>Jardim Europa</Blur>{", "}<Blur>{"S\u00E3o Paulo"}</Blur>/SP</div>
                <Sub>{"CEP: "}<Blur intensity="light">01234-567</Blur>{" \u00B7 Registrado desde 2019 \u00B7 "}<Badge v="success">Atual</Badge></Sub>
              </ListItem>
              <ListItem>
                <div>{"Av. "}<Blur>Paulista</Blur>{", "}<Blur>1578</Blur>{" Apto "}<Blur>204</Blur>{" \u2014 "}<Blur>Bela Vista</Blur>{", "}<Blur>{"S\u00E3o Paulo"}</Blur>/SP</div>
                <Sub>{"CEP: "}<Blur intensity="light">04567-890</Blur>{" \u00B7 2016\u20132019"}</Sub>
              </ListItem>
              <ListItem>
                <div>{"Rua "}<Blur>{"dos Ip\u00EAs"}</Blur>{", "}<Blur>312</Blur>{" \u2014 "}<Blur>Centro</Blur>{", "}<Blur>Campinas</Blur>/SP</div>
                <Sub>{"CEP: "}<Blur intensity="light">13015-000</Blur>{" \u00B7 2012\u20132016"}</Sub>
              </ListItem>
            </div>

            {/* TELEFONES */}
            <Cat icon={Phone}>Telefones</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  {"("}<Blur intensity="medium">11</Blur>{") "}<Blur>98765</Blur>-<Blur>4321</Blur>
                  <Badge v="success">Ativo</Badge>
                  <Badge v="info">WhatsApp</Badge>
                </div>
                <Sub>{"Operadora: "}<Blur intensity="light">Vivo</Blur>{" \u00B7 Tipo: M\u00F3vel \u00B7 Desde 2017"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  {"("}<Blur intensity="medium">11</Blur>{") "}<Blur>3456</Blur>-<Blur>7890</Blur>
                  <Badge v="neutral">Fixo</Badge>
                </div>
                <Sub>{"Operadora: "}<Blur intensity="light">NET/Claro</Blur>{" \u00B7 Vinculado ao endere\u00E7o 1"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  {"("}<Blur intensity="medium">21</Blur>{") "}<Blur>91234</Blur>-<Blur>5678</Blur>
                  <Badge v="warning">Inativo</Badge>
                </div>
                <Sub>{"Operadora: "}<Blur intensity="light">TIM</Blur>{" \u00B7 \u00DAltimo uso: 2021"}</Sub>
              </ListItem>
            </div>

            {/* REDES SOCIAIS */}
            <Cat icon={Globe}>Redes Sociais</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[0.72rem]">Instagram</span>
                  <Blur intensity="medium">@maria.eduarda_</Blur>
                  <Badge v="success">Ativo</Badge>
                </div>
                <Sub><Blur intensity="light">2.847 seguidores</Blur>{" \u00B7 Perfil aberto \u00B7 "}<Blur intensity="light">1.230 fotos</Blur></Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[0.72rem]">Facebook</span>
                  <Blur intensity="medium">Maria Eduarda Santos</Blur>
                  <Badge v="success">Ativo</Badge>
                </div>
                <Sub>{"Perfil desde 2011 \u00B7 "}<Blur intensity="light">{"S\u00E3o Paulo, SP"}</Blur></Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[0.72rem]">LinkedIn</span>
                  <Blur intensity="medium">Maria Eduarda S.</Blur>
                  <Badge v="success">Ativo</Badge>
                </div>
                <Sub><Blur intensity="light">{"Analista de Marketing na Empresa XYZ"}</Blur></Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[0.72rem]">TikTok</span>
                  <Blur intensity="medium">@dudasantos88</Blur>
                  <Badge v="warning">Inativo</Badge>
                </div>
              </ListItem>
            </div>

            {/* FINANCEIRO */}
            <Cat icon={CreditCard}>{"Informa\u00E7\u00F5es Financeiras"}</Cat>
            <DataRow label="Score Cr&#233;dito" highlight>
              <Blur>742</Blur>
              <span className="ml-1"><Badge v="success">Bom</Badge></span>
            </DataRow>
            <DataRow label="Faixa de Renda"><Blur>R$ 5.000 - 8.000</Blur></DataRow>
            <DataRow label="Restri&#231;&#245;es" highlight>
              <Blur intensity="medium">1</Blur>{" registro(s) "}
              <Alert>Negativado</Alert>
            </DataRow>
            <DataRow label="D&#237;vida Estimada"><Blur>R$ 2.340,00</Blur> <span className="text-[0.6rem]" style={{ color: "var(--muted)" }}>(Serasa)</span></DataRow>
            <DataRow label="Cheques s/Fundo">Nada consta</DataRow>
            <DataRow label="Benef&#237;cios Sociais">Nada consta</DataRow>
            <DataRow label="Imposto de Renda">
              <Blur intensity="medium">{"Declarante"}</Blur>{" "}
              <span className="text-[0.6rem]" style={{ color: "var(--muted)" }}>(2024/2025)</span>
            </DataRow>

            {/* PROCESSOS JUDICIAIS */}
            <Cat icon={FileText}>Processos Judiciais</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <Blur intensity="medium">{"Processo n\u00BA 1234567-89.2023.8.26.0001"}</Blur>
                  <Alert>{"R\u00E9"}</Alert>
                </div>
                <Sub>{"TJSP \u00B7 C\u00EDvel \u00B7 Cobran\u00E7a \u00B7 "}<Blur intensity="light">{"Banco Ita\u00FA S.A."}</Blur>{" \u00B7 Em andamento"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <Blur intensity="medium">{"Processo n\u00BA 9876543-21.2021.8.26.0100"}</Blur>
                  <Badge v="neutral">Autora</Badge>
                </div>
                <Sub>{"TJSP \u00B7 Trabalhista \u00B7 "}<Blur intensity="light">{"vs. Empresa ABC Ltda"}</Blur>{" \u00B7 Encerrado 2022"}</Sub>
              </ListItem>
            </div>

            {/* VEÍCULOS */}
            <Cat icon={Car}>{"Ve\u00EDculos"}</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <Blur>Toyota Corolla XEi 2021/2022</Blur>
                  {" \u00B7 Placa: "}<Blur intensity="medium">ABC-1D23</Blur>
                  <Badge v="success">Regular</Badge>
                </div>
                <Sub>{"Cor: "}<Blur intensity="light">Prata</Blur>{" \u00B7 RENAVAM: "}<Blur intensity="light">12345678901</Blur>{" \u00B7 IPVA 2026: Pago"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <Blur>Honda CG 160 Start 2020</Blur>
                  {" \u00B7 Placa: "}<Blur intensity="medium">XYZ-9H87</Blur>
                  <Badge v="warning">{"D\u00E9bitos"}</Badge>
                </div>
                <Sub>{"Cor: "}<Blur intensity="light">Preta</Blur>{" \u00B7 IPVA 2026: "}<Alert>Pendente</Alert>{" \u00B7 Multas: "}<Blur intensity="light">2</Blur></Sub>
              </ListItem>
            </div>

            {/* PARENTES / VÍNCULOS */}
            <Cat icon={Users}>{"Parentes e V\u00EDnculos"}</Cat>
            <div className="space-y-1.5 py-1.5">
              {[
                { nome: "Carlos Eduardo Santos", parentesco: "Pai", cpf: "123.456.789-00" },
                { nome: "Ana Carolina Santos", parentesco: "M\u00E3e", cpf: "987.654.321-00" },
                { nome: "Pedro Henrique Santos Silva", parentesco: "Irm\u00E3o", cpf: "456.789.123-00" },
                { nome: "Luiza Santos Oliveira", parentesco: "Irm\u00E3", cpf: "654.321.987-00" },
                { nome: "Roberto Lima Pereira", parentesco: "Ex-c\u00F4njuge", cpf: "111.222.333-44" },
              ].map((p) => (
                <ListItem key={p.cpf}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Blur>{p.nome}</Blur>
                    <Badge v="neutral">{p.parentesco}</Badge>
                  </div>
                  <Sub>{"CPF: "}<Blur intensity="light">{p.cpf}</Blur></Sub>
                </ListItem>
              ))}
            </div>

            {/* EMPRESAS */}
            <Cat icon={Building2}>{"Participa\u00E7\u00E3o Societ\u00E1ria"}</Cat>
            <div className="space-y-1.5 py-1.5">
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <Blur>{"ME Santos Consultoria LTDA"}</Blur>
                  <Badge v="success">Ativa</Badge>
                </div>
                <Sub>{"CNPJ: "}<Blur intensity="light">12.345.678/0001-90</Blur>{" \u00B7 S\u00F3cia (50%) \u00B7 Desde 2020"}</Sub>
              </ListItem>
              <ListItem>
                <div className="flex items-center gap-2 flex-wrap">
                  <Blur>{"Duda Mkt Digital MEI"}</Blur>
                  <Badge v="warning">Baixada</Badge>
                </div>
                <Sub>{"CNPJ: "}<Blur intensity="light">98.765.432/0001-10</Blur>{" \u00B7 Titular \u00B7 2018\u20132020"}</Sub>
              </ListItem>
            </div>

            {/* HISTÓRICO DE CONSULTAS */}
            <Cat icon={Shield}>{"Hist\u00F3rico de Consultas ao CPF"}</Cat>
            <DataRow label="&#218;ltima Consulta"><Blur>{"08/04/2026"}</Blur> <span className="text-[0.6rem]" style={{ color: "var(--muted)" }}>{"(4 dias atr\u00E1s)"}</span></DataRow>
            <DataRow label="Consultas 30d"><Blur intensity="medium">7</Blur> {"consultas"}</DataRow>
            <DataRow label="Origem"><Blur intensity="light">{"Institui\u00E7\u00E3o financeira, com\u00E9rcio"}</Blur></DataRow>

            {/* DADOS DIGITAIS */}
            <Cat icon={Wifi}>{"Presen\u00E7a Digital"}</Cat>
            <DataRow label="Vazamentos">
              <Blur intensity="medium">3</Blur>{" banco(s) de dados "}
              <Alert>{"Exposi\u00E7\u00E3o"}</Alert>
            </DataRow>
            <DataRow label="Senhas Vazadas">
              <Blur intensity="medium">2</Blur>{" senha(s) encontrada(s)"}
            </DataRow>
            <DataRow label="Chave PIX"><Blur intensity="medium">{"CPF, e-mail, celular"}</Blur> <span className="text-[0.6rem]" style={{ color: "var(--muted)" }}>(3 chaves)</span></DataRow>

            {/* ── Locked Premium+ ── */}
            <div className="mt-8 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(184,150,63,0.15)", background: "linear-gradient(135deg, rgba(184,150,63,0.03) 0%, rgba(184,150,63,0.06) 100%)" }}>
              <div className="px-4 pt-4 pb-2 space-y-2">
                {[
                  { label: "Vizinhos no endere\u00E7o atual", count: "5 registros" },
                  { label: "Fotos p\u00FAblicas encontradas", count: "12 imagens" },
                  { label: "Hist\u00F3rico de trabalho", count: "4 empresas" },
                  { label: "Passagens a\u00E9reas recentes", count: "2 viagens" },
                  { label: "Registros de im\u00F3veis", count: "1 propriedade" },
                  { label: {"Hist\u00F3rico de telefones"}, count: "6 n\u00FAmeros" },
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

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
            <span className="text-[3.5rem] md:text-[5rem] font-black uppercase tracking-[0.2em] rotate-[-18deg] opacity-[0.02]" style={{ color: "var(--foreground)" }}>
              Confidencial
            </span>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-[0.65rem] mt-4" style={{ color: "var(--muted)" }}>
          {"Dados fict\u00EDcios para demonstra\u00E7\u00E3o. Relat\u00F3rio real censurado por sigilo profissional (Lei 13.432/17)."}
        </p>
      </div>
    </section>
  )
}
