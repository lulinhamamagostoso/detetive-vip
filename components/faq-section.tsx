import { ChevronDown } from "lucide-react"

// FAQ reordenado estrategicamente:
// 1-4: Beneficios e como funciona (gera confianca)
// 5-7: Garantias e seguranca (reduz medo)
// 8-10: Objecoes legais (deixa pro final quando ja esta convencido)
const faqs = [
  {
    question: "Quanto tempo demora pra receber o resultado?",
    answer: "Rápido: você recebe o resultado no seu WhatsApp em até 1 hora após o pagamento. A maioria dos casos é resolvida em menos tempo.",
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
      className="relative z-[1] py-10 md:py-20 px-4 md:px-8 faq-section"
      style={{ background: "var(--background)" }}
      aria-label="Perguntas Frequentes"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-5 md:mb-10">
          <div
            className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] mb-1.5 md:mb-2"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-3 md:w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
            FAQ
            <span className="w-3 md:w-4 h-px" style={{ background: "var(--primary)" }} aria-hidden="true" />
          </div>
          <h2 className="font-serif text-[22px] md:text-4xl font-bold leading-tight tracking-tight text-balance">
            Dúvidas{" "}
            <em className="italic" style={{ color: "var(--primary)" }}>Frequentes</em>
          </h2>
        </div>

        {/* FAQ List - Mobile: larger touch targets */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="faq-item rounded-xl overflow-hidden"
              style={{
                background: "var(--background-card)",
                border: "1px solid var(--border)",
              }}
              open={index === 0}
            >
              <summary
                className="faq-summary w-full flex items-center justify-between p-3.5 md:p-5 text-left min-h-[56px] cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--primary)]"
                style={{ color: "var(--foreground)" }}
              >
                <span className="text-[13px] md:text-[15px] font-semibold pr-3 leading-snug">{faq.question}</span>
                <ChevronDown
                  size={16}
                  className="faq-chevron shrink-0 transition-transform duration-300"
                  style={{ color: "var(--muted)" }}
                  aria-hidden="true"
                />
              </summary>
              <div
                className="px-3.5 pb-3.5 md:px-5 md:pb-5 text-[12px] md:text-[14px] leading-relaxed"
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
