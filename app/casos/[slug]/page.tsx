import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Zap, Eye, Target, ShieldCheck, AlertTriangle, Users,
  Scale, Building2, Car, MonitorSmartphone, Package, FileCheck,
  ArrowLeft, CheckCircle2, AlertCircle, ChevronRight,
} from "lucide-react"

/* ═══════════════════════════════════════════════════════════════════════
   DATA — 12 casos com conte\u00FAdo completo para cada landing page
   ═══════════════════════════════════════════════════════════════════════ */

const cases: Record<string, {
  icon: React.ElementType
  cardText: string
  headline: string
  subheadline: string
  metaTitle: string
  metaDescription: string
  painTitle: string
  painPoints: string[]
  transition: string
  solutionTitle: string
  solutionPoints: string[]
  ctaText: string
}> = {
  "fui-vitima-de-golpe-no-pix": {
    icon: Zap,
    cardText: "Fui v\u00EDtima de golpe no PIX",
    headline: "Caiu em um Golpe no PIX?",
    subheadline: "Descubra quem est\u00E1 por tr\u00E1s da chave PIX que recebeu seu dinheiro.",
    metaTitle: "Golpe no PIX? Identifique o Golpista | Detetive VIP",
    metaDescription: "Descubra quem aplicou o golpe no PIX. Identificamos o titular da chave PIX com nome, CPF, endere\u00E7o e telefone. Dados prontos para BO e a\u00E7\u00E3o judicial.",
    painTitle: "Por que voc\u00EA precisa agir r\u00E1pido",
    painPoints: [
      "O golpista pode estar aplicando o mesmo golpe em outras pessoas neste exato momento",
      "Sem os dados reais do golpista, a pol\u00EDcia tem dificuldade em investigar o caso",
      "Quanto mais tempo passa, mais dif\u00EDcil \u00E9 recuperar o dinheiro perdido",
      "O golpista pode estar usando identidade falsa ou conta de laranja para se proteger",
    ],
    transition: "Mas existe uma forma r\u00E1pida de descobrir quem est\u00E1 por tr\u00E1s desse golpe.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Identificamos o titular real da chave PIX utilizada no golpe",
      "Fornecemos nome completo, CPF, endere\u00E7o e telefone do golpista",
      "Dados prontos para registrar um Boletim de Ocorr\u00EAncia completo",
      "Informa\u00E7\u00F5es que seu advogado precisa para entrar com a\u00E7\u00E3o judicial de ressarcimento",
    ],
    ctaText: "Identificar o Golpista Agora",
  },

  "suspeito-de-infidelidade": {
    icon: Eye,
    cardText: "Suspeito de infidelidade do meu parceiro(a)",
    headline: "Desconfian\u00E7a no Relacionamento?",
    subheadline: "Descubra a verdade antes que a situa\u00E7\u00E3o se agrave ainda mais.",
    metaTitle: "Suspeita de Infidelidade? Descubra a Verdade | Detetive VIP",
    metaDescription: "Investiga\u00E7\u00E3o 100% sigilosa de infidelidade conjugal. Descubra n\u00FAmeros ocultos, redes sociais e v\u00EDnculos do seu parceiro(a). Resultado em 5 minutos.",
    painTitle: "Por que a d\u00FAvida \u00E9 t\u00E3o destrutiva",
    painPoints: [
      "A d\u00FAvida constante afeta sua sa\u00FAde mental, sono e qualidade de vida",
      "Enquanto voc\u00EA desconfia, pode estar sendo enganado(a) tamb\u00E9m financeiramente",
      "Confrontar sem provas pode destruir o relacionamento se voc\u00EA estiver errado(a)",
      "A situa\u00E7\u00E3o tende a piorar com o tempo se n\u00E3o for esclarecida de uma vez",
    ],
    transition: "Voc\u00EA merece saber a verdade \u2014 e n\u00F3s podemos te ajudar com total sigilo.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Investiga\u00E7\u00E3o 100% sigilosa \u2014 seu parceiro(a) jamais saber\u00E1",
      "Descobrimos n\u00FAmeros de telefone ocultos, e-mails e redes sociais",
      "Identificamos endere\u00E7os frequentados e v\u00EDnculos com outras pessoas",
      "Relat\u00F3rio completo com todas as informa\u00E7\u00F5es para voc\u00EA tomar sua decis\u00E3o",
    ],
    ctaText: "Descobrir a Verdade Agora",
  },

  "localizar-devedor": {
    icon: Target,
    cardText: "Preciso localizar um devedor que desapareceu",
    headline: "Devedor Desapareceu?",
    subheadline: "Localize quem est\u00E1 te devendo, mesmo que tenha mudado de cidade.",
    metaTitle: "Localizar Devedor que Desapareceu | Detetive VIP",
    metaDescription: "Localize devedores em qualquer cidade do Brasil. Encontramos endere\u00E7o atual, bens, ve\u00EDculos e dados para cita\u00E7\u00E3o judicial. Resultado em 5 minutos.",
    painTitle: "Cada dia que passa, a situa\u00E7\u00E3o piora",
    painPoints: [
      "Cada dia sem localizar o devedor, menor a chance de recuperar o valor",
      "O devedor pode estar transferindo bens para evitar penhora judicial",
      "Sem endere\u00E7o atualizado, n\u00E3o \u00E9 poss\u00EDvel realizar cita\u00E7\u00E3o judicial",
      "Voc\u00EA est\u00E1 perdendo tempo e dinheiro tentando localizar por conta pr\u00F3pria",
    ],
    transition: "Com as ferramentas certas, localizar um devedor leva apenas alguns minutos.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Localizamos o endere\u00E7o atual do devedor em qualquer cidade do Brasil",
      "Identificamos bens, ve\u00EDculos e participa\u00E7\u00F5es societ\u00E1rias em nome dele",
      "Fornecemos CPF, telefones e todos os dados para cita\u00E7\u00E3o judicial",
      "Informa\u00E7\u00F5es que aceleram o processo de cobran\u00E7a judicial ou extrajudicial",
    ],
    ctaText: "Localizar o Devedor Agora",
  },

  "verificar-pessoa-antes-de-negocio": {
    icon: ShieldCheck,
    cardText: "Quero verificar algu\u00E9m antes de fechar neg\u00F3cio",
    headline: "Vai Fechar Neg\u00F3cio com Algu\u00E9m?",
    subheadline: "Verifique antes e evite preju\u00EDzos que podem ser irrevers\u00EDveis.",
    metaTitle: "Verificar Pessoa Antes de Fechar Neg\u00F3cio | Detetive VIP",
    metaDescription: "Verifique antecedentes antes de fechar neg\u00F3cio. Consultamos score, d\u00EDvidas, processos judiciais e hist\u00F3rico da pessoa. Resultado em 5 minutos.",
    painTitle: "O risco de n\u00E3o verificar",
    painPoints: [
      "Golpes em negocia\u00E7\u00F5es s\u00E3o cada vez mais comuns e sofisticados no Brasil",
      "Uma pessoa com processos e d\u00EDvidas pode n\u00E3o honrar o compromisso firmado",
      "Verificar apenas o nome no Google n\u00E3o revela informa\u00E7\u00F5es cr\u00EDticas",
      "O preju\u00EDzo de um neg\u00F3cio mal feito pode ser irrevers\u00EDvel para voc\u00EA",
    ],
    transition: "Uma verifica\u00E7\u00E3o r\u00E1pida pode evitar meses de dor de cabe\u00E7a.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Verificamos score de cr\u00E9dito, restri\u00E7\u00F5es e d\u00EDvidas ativas no Serasa",
      "Identificamos processos judiciais como r\u00E9u ou autor em todos os tribunais",
      "Confirmamos se os dados informados pela pessoa s\u00E3o verdadeiros",
      "Relat\u00F3rio completo para voc\u00EA tomar uma decis\u00E3o informada e segura",
    ],
    ctaText: "Verificar Pessoa Agora",
  },

  "ameacas-numero-desconhecido": {
    icon: AlertTriangle,
    cardText: "Recebi amea\u00E7as de um n\u00FAmero desconhecido",
    headline: "Recebendo Amea\u00E7as?",
    subheadline: "Descubra quem est\u00E1 por tr\u00E1s do n\u00FAmero que est\u00E1 te amea\u00E7ando.",
    metaTitle: "Recebendo Amea\u00E7as? Identifique o Agressor | Detetive VIP",
    metaDescription: "Identifique quem est\u00E1 te amea\u00E7ando por telefone. Descobrimos o titular do n\u00FAmero com nome, CPF e endere\u00E7o. Dados prontos para BO e medida protetiva.",
    painTitle: "Por que voc\u00EA n\u00E3o pode ignorar isso",
    painPoints: [
      "Viver com medo afeta sua rotina, trabalho e fam\u00EDlia diariamente",
      "Amea\u00E7as podem escalar para algo muito mais grave se n\u00E3o forem tratadas",
      "Sem identificar o agressor, a pol\u00EDcia tem dificuldade em agir",
      "Bloquear o n\u00FAmero n\u00E3o resolve \u2014 o agressor pode usar outro facilmente",
    ],
    transition: "Identificar quem est\u00E1 por tr\u00E1s das amea\u00E7as \u00E9 o primeiro passo para se proteger.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Identificamos o titular do n\u00FAmero de telefone em poucos minutos",
      "Fornecemos nome completo, CPF, endere\u00E7o e dados pessoais do agressor",
      "Dados prontos para Boletim de Ocorr\u00EAncia e medida protetiva de urg\u00EAncia",
      "Informa\u00E7\u00F5es que permitem solicitar medida judicial imediata",
    ],
    ctaText: "Identificar Quem Est\u00E1 Amea\u00E7ando",
  },

  "encontrar-parente-perdido": {
    icon: Users,
    cardText: "Quero encontrar um parente ou pessoa perdida",
    headline: "Procurando Algu\u00E9m que Perdeu Contato?",
    subheadline: "N\u00F3s ajudamos a reencontrar quem voc\u00EA perdeu de vista.",
    metaTitle: "Encontrar Parente ou Pessoa Perdida | Detetive VIP",
    metaDescription: "Localize parentes e pessoas com quem perdeu contato. Encontramos endere\u00E7o atual, telefones e redes sociais. Processo 100% discreto.",
    painTitle: "A ang\u00FAstia de n\u00E3o saber",
    painPoints: [
      "Anos sem not\u00EDcias geram ang\u00FAstia e preocupa\u00E7\u00E3o constante",
      "Redes sociais nem sempre funcionam \u2014 muitas pessoas n\u00E3o t\u00EAm perfil p\u00FAblico",
      "Buscas por conta pr\u00F3pria consomem tempo e raramente d\u00E3o resultado",
      "Pode haver quest\u00F5es importantes como heran\u00E7a ou sa\u00FAde que exigem contato urgente",
    ],
    transition: "Com acesso \u00E0s bases certas, encontrar algu\u00E9m \u00E9 mais simples do que parece.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Localizamos pessoas por nome, CPF ou \u00FAltimo endere\u00E7o conhecido",
      "Encontramos endere\u00E7o atual, telefones e redes sociais atualizados",
      "Identificamos v\u00EDnculos familiares que podem ajudar na localiza\u00E7\u00E3o",
      "Processo 100% discreto e sigiloso \u2014 a pessoa n\u00E3o \u00E9 notificada",
    ],
    ctaText: "Encontrar Pessoa Agora",
  },

  "localizar-parte-processual": {
    icon: Scale,
    cardText: "Sou advogado e preciso localizar uma parte processual",
    headline: "Precisa Localizar uma Parte Processual?",
    subheadline: "Endere\u00E7o atualizado para cita\u00E7\u00E3o e intima\u00E7\u00E3o em minutos.",
    metaTitle: "Localizar Parte Processual para Advogados | Detetive VIP",
    metaDescription: "Endere\u00E7o atualizado para cita\u00E7\u00E3o e intima\u00E7\u00E3o judicial. Localiza\u00E7\u00E3o r\u00E1pida com cruzamento de bases oficiais. Ideal para advogados.",
    painTitle: "Processo parado custa caro",
    painPoints: [
      "Processo parado por falta de cita\u00E7\u00E3o gera custos e atraso para seu cliente",
      "Oficial de justi\u00E7a retorna negativo quando o endere\u00E7o est\u00E1 desatualizado",
      "Cita\u00E7\u00E3o por edital \u00E9 cara, demorada e pode ser questionada pela parte contr\u00E1ria",
      "Cada m\u00EAs de atraso pode significar prescri\u00E7\u00E3o de direitos do seu cliente",
    ],
    transition: "Com o endere\u00E7o certo, seu processo volta a andar imediatamente.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Endere\u00E7o atualizado e confirmado por cruzamento de m\u00FAltiplas bases oficiais",
      "CPF, telefones e e-mails para facilitar a localiza\u00E7\u00E3o e intima\u00E7\u00E3o",
      "V\u00EDnculos familiares e societ\u00E1rios que auxiliam na cita\u00E7\u00E3o",
      "Relat\u00F3rio profissional que pode ser anexado aos autos do processo",
    ],
    ctaText: "Localizar Parte Processual",
  },

  "verificar-empresa": {
    icon: Building2,
    cardText: "Quero saber se uma empresa \u00E9 confi\u00E1vel antes de comprar",
    headline: "Vai Comprar de uma Empresa Desconhecida?",
    subheadline: "Verifique se \u00E9 confi\u00E1vel antes de fazer o pagamento.",
    metaTitle: "Verificar se Empresa \u00E9 Confi\u00E1vel | Detetive VIP",
    metaDescription: "Verifique empresas antes de comprar. Consultamos CNPJ, s\u00F3cios, situa\u00E7\u00E3o cadastral, d\u00EDvidas e processos judiciais. Evite golpes.",
    painTitle: "Os sinais que voc\u00EA n\u00E3o consegue ver sozinho",
    painPoints: [
      "Empresas fantasma aplicam golpes e desaparecem rapidamente",
      "CNPJ ativo n\u00E3o significa empresa id\u00F4nea \u2014 muitas empresas fraudulentas t\u00EAm CNPJ regular",
      "Sites bem feitos e avalia\u00E7\u00F5es falsas podem esconder empresas com d\u00EDvidas e processos",
      "Depois que o dinheiro sai da sua conta, recuperar \u00E9 extremamente dif\u00EDcil e demorado",
    ],
    transition: "Uma verifica\u00E7\u00E3o de 5 minutos pode evitar um preju\u00EDzo de milhares de reais.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Verificamos situa\u00E7\u00E3o cadastral do CNPJ, s\u00F3cios e capital social",
      "Identificamos processos judiciais movidos contra a empresa",
      "Analisamos d\u00EDvidas ativas, restri\u00E7\u00F5es financeiras e protestos",
      "Descobrimos o hist\u00F3rico real dos s\u00F3cios por tr\u00E1s da empresa",
    ],
    ctaText: "Verificar Empresa Agora",
  },

  "descobrir-dono-veiculo": {
    icon: Car,
    cardText: "Preciso descobrir o dono de um ve\u00EDculo",
    headline: "Precisa Saber Quem \u00C9 o Dono de um Ve\u00EDculo?",
    subheadline: "Identifique o propriet\u00E1rio pela placa em poucos minutos.",
    metaTitle: "Descobrir Dono de Ve\u00EDculo pela Placa | Detetive VIP",
    metaDescription: "Descubra o propriet\u00E1rio de qualquer ve\u00EDculo pela placa. Nome completo, CPF, endere\u00E7o e situa\u00E7\u00E3o do ve\u00EDculo. Resultado em 5 minutos.",
    painTitle: "Quando voc\u00EA precisa dessa informa\u00E7\u00E3o, \u00E9 urgente",
    painPoints: [
      "Bateu e fugiu? Sem identifica\u00E7\u00E3o do motorista, voc\u00EA fica com o preju\u00EDzo",
      "Ve\u00EDculo suspeito rondando sua rua pode representar risco real \u00E0 sua seguran\u00E7a",
      "Sem dados do propriet\u00E1rio, n\u00E3o \u00E9 poss\u00EDvel acionar o seguro do respons\u00E1vel",
      "A pol\u00EDcia pode levar semanas para fornecer informa\u00E7\u00F5es sobre o ve\u00EDculo",
    ],
    transition: "N\u00F3s identificamos o propriet\u00E1rio de qualquer ve\u00EDculo em minutos.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Identificamos o propriet\u00E1rio do ve\u00EDculo pela placa instantaneamente",
      "Fornecemos nome completo, CPF, endere\u00E7o e telefone do dono",
      "Verificamos situa\u00E7\u00E3o do ve\u00EDculo: multas, IPVA, financiamento e roubo/furto",
      "Dados completos para registro de BO ou a\u00E7\u00E3o judicial de repara\u00E7\u00E3o",
    ],
    ctaText: "Descobrir Propriet\u00E1rio Agora",
  },

  "confirmar-identidade-online": {
    icon: MonitorSmartphone,
    cardText: "Conheci algu\u00E9m online e quero confirmar a identidade",
    headline: "Conheceu Algu\u00E9m Online?",
    subheadline: "Confirme se a pessoa \u00E9 realmente quem diz ser antes de se envolver.",
    metaTitle: "Confirmar Identidade de Pessoa Online | Detetive VIP",
    metaDescription: "Verifique a identidade real de quem voc\u00EA conheceu online. Confirmamos nome, idade, estado civil e redes sociais. Evite catfishing e golpes rom\u00E2nticos.",
    painTitle: "Os riscos s\u00E3o maiores do que parecem",
    painPoints: [
      "Perfis falsos (catfishing) s\u00E3o extremamente comuns em apps de relacionamento",
      "Golpistas investem semanas construindo confian\u00E7a antes de pedir dinheiro",
      "Fotos de perfil podem ser roubadas de outras pessoas reais",
      "Voc\u00EA pode estar compartilhando informa\u00E7\u00F5es \u00EDntimas com um completo desconhecido",
    ],
    transition: "Antes de se envolver emocionalmente ou financeiramente, descubra quem \u00E9 essa pessoa de verdade.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Verificamos se o nome, idade e localiza\u00E7\u00E3o informados s\u00E3o verdadeiros",
      "Identificamos todas as redes sociais vinculadas \u00E0 pessoa",
      "Descobrimos estado civil real, v\u00EDnculos familiares e hist\u00F3rico",
      "Relat\u00F3rio completo antes de voc\u00EA tomar qualquer decis\u00E3o",
    ],
    ctaText: "Verificar Identidade Agora",
  },

  "vendedor-sumiu": {
    icon: Package,
    cardText: "Comprei algo online e o vendedor sumiu",
    headline: "Comprou Online e o Vendedor Sumiu?",
    subheadline: "Identifique o vendedor e recupere o que \u00E9 seu por direito.",
    metaTitle: "Vendedor Sumiu Ap\u00F3s Compra Online? | Detetive VIP",
    metaDescription: "Identifique o vendedor que sumiu ap\u00F3s receber seu pagamento. Descobrimos nome, CPF, endere\u00E7o e telefone. Dados prontos para BO e Juizado.",
    painTitle: "Voc\u00EA n\u00E3o \u00E9 o \u00FAnico \u2014 mas pode ser o primeiro a reagir",
    painPoints: [
      "O vendedor pode estar aplicando o mesmo golpe em dezenas de pessoas agora",
      "Sem dados reais do vendedor, plataformas e pol\u00EDcia n\u00E3o conseguem ajudar",
      "PIX e transfer\u00EAncia n\u00E3o t\u00EAm estorno autom\u00E1tico como cart\u00E3o de cr\u00E9dito",
      "Quanto mais tempo passa, mais dif\u00EDcil \u00E9 localizar o golpista",
    ],
    transition: "Mas com os dados certos, voc\u00EA pode agir judicialmente e recuperar seu dinheiro.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Identificamos o titular da conta que recebeu seu pagamento",
      "Fornecemos nome completo, CPF, endere\u00E7o e telefone do vendedor",
      "Dados prontos para registrar BO e solicitar reembolso",
      "Informa\u00E7\u00F5es para a\u00E7\u00E3o no Juizado de Pequenas Causas (sem necessidade de advogado)",
    ],
    ctaText: "Identificar o Vendedor Agora",
  },

  "informacoes-boletim-ocorrencia": {
    icon: FileCheck,
    cardText: "Preciso de informa\u00E7\u00F5es para um Boletim de Ocorr\u00EAncia",
    headline: "Precisa de Dados para Registrar um BO?",
    subheadline: "Informa\u00E7\u00F5es completas e verificadas para fortalecer sua ocorr\u00EAncia.",
    metaTitle: "Dados para Boletim de Ocorr\u00EAncia | Detetive VIP",
    metaDescription: "Obtenha dados completos do acusado para registrar BO: nome, CPF, RG, endere\u00E7o e telefone. Informa\u00E7\u00F5es que aceleram a investiga\u00E7\u00E3o policial.",
    painTitle: "Um BO incompleto \u00E9 quase in\u00FAtil",
    painPoints: [
      "BO sem informa\u00E7\u00F5es precisas do autor dificulta a investiga\u00E7\u00E3o policial",
      "A delegacia precisa de dados como nome completo, CPF e endere\u00E7o do acusado",
      "Sem esses dados, o inqu\u00E9rito pode ser arquivado por falta de elementos",
      "Voc\u00EA pode estar correndo risco enquanto o agressor n\u00E3o \u00E9 formalmente identificado",
    ],
    transition: "Com as informa\u00E7\u00F5es certas, seu BO tem muito mais for\u00E7a e chances de resultar em a\u00E7\u00E3o.",
    solutionTitle: "Como o Detetive VIP resolve",
    solutionPoints: [
      "Fornecemos nome completo, CPF, RG e endere\u00E7o atualizado do investigado",
      "Identificamos telefones, e-mails e redes sociais para complementar o BO",
      "Relat\u00F3rio profissional que fortalece sua ocorr\u00EAncia policial",
      "Dados que aceleram o trabalho da pol\u00EDcia e do Minist\u00E9rio P\u00FAblico",
    ],
    ctaText: "Obter Dados para BO Agora",
  },
}

/* ═══════════════════════════════════════════════════════════════════════
   STATIC GENERATION — pr\u00E9-renderiza as 12 p\u00E1ginas no build
   ═══════════════════════════════════════════════════════════════════════ */

export function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }))
}

/* ═══════════════════════════════════════════════════════════════════════
   SEO — metadata din\u00E2mica por p\u00E1gina
   ═══════════════════════════════════════════════════════════════════════ */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = cases[slug]
  if (!c) return {}
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.detetive.vip"
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/casos/${slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      type: "website",
      locale: "pt_BR",
      url: `${siteUrl}/casos/${slug}`,
      siteName: "Detetive VIP",
    },
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

export default async function CasoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = cases[slug]
  if (!c) notFound()

  const Icon = c.icon

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 px-4 md:px-8 py-3" style={{ background: "rgba(250,249,247,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[0.78rem] font-medium transition-colors" style={{ color: "var(--muted-foreground)" }}>
            <ArrowLeft size={16} />
            Voltar
          </Link>
          <Link href="/">
            <Image src="/logo.webp" alt="Detetive VIP" width={110} height={28} className="h-6 md:h-7 w-auto" />
          </Link>
          <div className="w-[60px]" />
        </div>
      </header>

      <main className="max-w-[680px] mx-auto px-4 md:px-8 py-10 md:py-16">

        {/* ── Hero ── */}
        <div className="text-center mb-10 md:mb-14">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(22,163,74,0.08)", color: "#16a34a" }}>
            <Icon size={28} strokeWidth={1.8} />
          </div>
          <h1 className="font-serif text-[1.7rem] md:text-[2.5rem] font-bold leading-tight tracking-tight mb-3">
            {c.headline}
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-lg mx-auto" style={{ color: "var(--muted-foreground)" }}>
            {c.subheadline}
          </p>
        </div>

        {/* ── Pain Section ── */}
        <div className="rounded-xl p-5 md:p-7 mb-6" style={{ background: "rgba(220,38,38,0.03)", border: "1px solid rgba(220,38,38,0.08)" }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={18} strokeWidth={2.5} style={{ color: "#dc2626" }} />
            <h2 className="text-[0.85rem] md:text-base font-bold" style={{ color: "#dc2626" }}>
              {c.painTitle}
            </h2>
          </div>
          <ul className="space-y-3">
            {c.painPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[0.82rem] md:text-[0.88rem] leading-relaxed" style={{ color: "var(--foreground)" }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#dc2626" }} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Transition ── */}
        <p className="text-center text-[0.9rem] md:text-base font-medium leading-relaxed py-5 md:py-7 px-4" style={{ color: "var(--foreground)" }}>
          {c.transition}
        </p>

        {/* ── Solution Section ── */}
        <div className="rounded-xl p-5 md:p-7 mb-10" style={{ background: "rgba(22,163,74,0.03)", border: "1px solid rgba(22,163,74,0.1)" }}>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} strokeWidth={2.5} style={{ color: "#16a34a" }} />
            <h2 className="text-[0.85rem] md:text-base font-bold" style={{ color: "#16a34a" }}>
              {c.solutionTitle}
            </h2>
          </div>
          <ul className="space-y-3">
            {c.solutionPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[0.82rem] md:text-[0.88rem] leading-relaxed" style={{ color: "var(--foreground)" }}>
                <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "#16a34a" }} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA ── */}
        <div className="text-center">
          <Link
            href="/#planos"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-[0.9rem] uppercase tracking-wider text-white transition-all active:scale-[0.98]"
            style={{ background: "var(--whatsapp)", boxShadow: "0 6px 24px rgba(37,211,102,0.35)" }}
          >
            {c.ctaText}
            <ChevronRight size={18} />
          </Link>
          <p className="text-[0.72rem] mt-3" style={{ color: "var(--muted)" }}>
            {"Resultado em at\u00E9 5 minutos no seu WhatsApp"}
          </p>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            {[
              { t: "100% Sigiloso" },
              { t: "Pagamento \u00DAnico" },
              { t: "Lei 13.432/17" },
            ].map((s) => (
              <span key={s.t} className="text-[0.68rem] font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(184,150,63,0.06)", color: "var(--primary)", border: "1px solid rgba(184,150,63,0.1)" }}>
                {s.t}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="text-center py-6 px-4" style={{ borderTop: "1px solid var(--border)" }}>
        <Link href="/" className="text-[0.72rem] font-medium" style={{ color: "var(--muted)" }}>
          {"detetive.vip \u00A9 2026 \u2014 Todos os direitos reservados"}
        </Link>
      </footer>
    </div>
  )
}
