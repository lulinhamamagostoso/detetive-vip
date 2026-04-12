import type { Metadata } from "next"

const plans: Record<string, { title: string; description: string }> = {
  "nome-cpf": {
    title: "Investigação por Nome ou CPF",
    description:
      "Investigação digital completa a partir de nome ou CPF. Dados pessoais, endereços, telefones e mais. Resultado em 5 minutos via WhatsApp. R$40.",
  },
  "celular-placa": {
    title: "Investigação por Celular ou Placa",
    description:
      "Descubra o titular de qualquer número ou veículo. Nome, CPF, endereço e ficha completa. Resultado em 5 minutos via WhatsApp. R$79.",
  },
  premium: {
    title: "Investigação Premium",
    description:
      "Dossiê completo com 20+ bancos de dados oficiais. Processos, veículos, parentes, score e dívidas. Resultado em 5 minutos via WhatsApp. R$197.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plan: string }>
}): Promise<Metadata> {
  const { plan: slug } = await params
  const plan = plans[slug]

  if (!plan) {
    return { title: "Checkout | Detetive VIP" }
  }

  return {
    title: `${plan.title} | Detetive VIP`,
    description: plan.description,
    openGraph: {
      title: `${plan.title} | Detetive VIP`,
      description: plan.description,
      type: "website",
      locale: "pt_BR",
      siteName: "Detetive VIP",
    },
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
