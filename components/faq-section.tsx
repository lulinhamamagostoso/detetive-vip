import { ChevronDown } from "lucide-react"

// FAQ reordenado estrategicamente:
// 1-4: Beneficios e como funciona (gera confianca)
// 5-7: Garantias e seguranca (reduz medo)
// 8-10: Objecoes legais (deixa pro final quando ja esta convencido)
const faqs = [
  {
    question: "Quanto tempo demora pra receber o resultado?",
    answer: "Rápido: em até 5 minutos após o pagamento você recebe tudo no seu WhatsApp. Em casos mais complexos, pode levar até 1 hora — mas isso é raro. A maioria recebe em minutos.",
  },
  {
    question: "A pessoa investigada fica sabendo?",
    answer: "Não, jamais. A investigação é 100% sigilosa. A pessoa NÃO recebe nenhuma notificação, mensagem ou alerta. Ninguém fica sabendo além de você. Trabalhamos com criptografia e não guardamos registros.",
  },
  {
    question: "Como funciona? O que eu preciso fazer?",
    answer: "Super simples: 1) Escolha o plano, 2) Informe os dados da pessoa (nome, CPF, telefone ou placa), 3) Pague via PIX, 4) Receba o relatório completo no WhatsApp. Você não precisa fazer mais nada — nós cuidamos de tudo.",
  },
  {
    question: "E se as informações estiverem erradas ou incompletas?",
    answer: "Garantia total: se algum dado estiver errado ou incompleto, refazemos a investigação de graça ou devolvemos 100% do seu dinheiro em até 24h via PIX. Sem burocracia, sem enrolação.",
  },
  {
    question: "E se a pessoa não for encontrada?",
    answer: "Nosso sistema cobre 99% dos brasileiros com CPF ativo. Se excepcionalmente não encontrarmos a pessoa, você recebe seu dinheiro de volta integralmente. Risco zero pra você.",
  },
  {
    question: "Meus dados ficam salvos? É seguro pra mim?",
    answer: "Totalmente seguro. Seus dados são protegidos com criptografia. Após entregar o relatório, apagamos tudo — nenhum registro fica vinculado ao seu nome. A investigação é anônima.",
  },
  {
    question: "Como sei que não é golpe?",
    answer: "Entendo a desconfiança — tem muito golpe por aí. O Detetive VIP opera com CNPJ ativo, domínio verificado e milhares de clientes atendidos. Oferecemos garantia de resultado ou dinheiro de volta em 24h. Golpista não dá garantia, nós damos.",
  },
  {
    question: "Posso usar o relatório como prova na justiça?",
    answer: "Sim. As informações podem ser usadas como subsídio para Boletins de Ocorrência, processos judiciais e procedimentos legais. Muitos advogados usam nosso serviço para localizar partes processuais.",
  },
  {
    question: "Isso é legal?",
    answer: "Sim, 100% legal. O Detetive VIP atua dentro da Lei 13.432/17 que regulamenta a profissão de detetive particular no Brasil. Todas as informações vêm de fontes legais e públicas.",
  },
  {
    question: "Posso investigar qualquer pessoa?",
    answer: "Sim, para fins lícitos: verificar antecedentes, localizar devedores, investigar fraudes, proteção patrimonial, etc. Não realizamos investigações para perseguição, stalking ou atividades ilegais.",
  },
]

// Server Component — zero JS no bundle. Usa <details>/<summary> nativo.
// Abertura/fechamento é feita pelo browser; ícone rotaciona via CSS [open].
export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8 faq-section"
      style={{ background: "var(--background)" }}
      aria-label="Perguntas Frequentes"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <div
            className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] mb-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            FAQ
            <span className="w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold leading-tight tracking-tight">
            Dúvidas{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Frequentes</em>
          </h2>
        </div>

        {/* FAQ List — primeiro item aberto por padrão (open attribute) */}
        <div className="space-y-2 md:space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="faq-item rounded-lg md:rounded-xl overflow-hidden"
              style={{
                background: "var(--background-card)",
                border: "1px solid var(--border)",
              }}
              open={index === 0}
            >
              <summary
                className="faq-summary w-full flex items-center justify-between p-4 md:p-5 text-left min-h-[48px] cursor-pointer list-none"
                style={{ color: "var(--foreground)" }}
              >
                <span className="text-[0.8rem] md:text-[0.9rem] font-semibold pr-3">{faq.question}</span>
                <ChevronDown
                  size={16}
                  className="faq-chevron shrink-0 transition-transform duration-300"
                  style={{ color: "var(--muted)" }}
                  aria-hidden="true"
                />
              </summary>
              <div
                className="px-4 pb-4 md:px-5 md:pb-5 text-[0.75rem] md:text-[0.85rem] leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
