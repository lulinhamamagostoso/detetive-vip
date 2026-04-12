"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "É legal usar esse serviço?",
    answer: "Sim. O Detetive VIP atua dentro da Lei 13.432/17 que regulamenta a profissão de detetive particular no Brasil. Todas as informações são obtidas de fontes legais e públicas, seguindo rigorosos protocolos de compliance.",
  },
  {
    question: "Quanto tempo demora pra receber o relatório?",
    answer: "O relatório é entregue em até 5 minutos após a confirmação do pagamento. Em alguns casos específicos, pode se estender até 1 hora dependendo da complexidade da investigação.",
  },
  {
    question: "A pessoa pesquisada fica sabendo?",
    answer: "Absolutamente não. A investigação é 100% sigilosa. Nenhum tipo de notificação é enviada ao investigado. Trabalhamos com criptografia ponta a ponta e não mantemos registros das pesquisas após a entrega.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos apenas PIX como forma de pagamento. É instantâneo, seguro e permite que sua investigação seja iniciada imediatamente após a confirmação.",
  },
  {
    question: "E se as informações estiverem erradas?",
    answer: "Garantimos a precisão das informações. Caso haja algum dado incorreto ou desatualizado, refazemos a investigação gratuitamente ou devolvemos seu dinheiro integralmente.",
  },
  {
    question: "Posso pesquisar qualquer pessoa?",
    answer: "Sim, desde que seja para fins lícitos como verificação de antecedentes, localização de devedores, investigação de fraudes, ou proteção patrimonial. Não realizamos investigações para fins de perseguição, stalking ou qualquer atividade ilegal.",
  },
  {
    question: "Como sei que o Detetive VIP não é golpe?",
    answer: "O Detetive VIP é regulamentado pela Lei 13.432/17 que reconhece a profissão de detetive particular no Brasil. Operamos com CNPJ ativo, domínio verificado, pagamento via PIX institucional e milhares de clientes atendidos. Oferecemos garantia de resultado ou dinheiro de volta — um golpista jamais faria isso.",
  },
  {
    question: "Posso usar as informações como prova judicial?",
    answer: "As informações do relatório podem servir como subsídio para procedimentos legais, Boletins de Ocorrência e ações judiciais. Muitos advogados utilizam nosso serviço para localizar partes processuais e reunir informações relevantes para seus casos.",
  },
  {
    question: "Meus dados ficam salvos? É seguro?",
    answer: "Seus dados são protegidos com criptografia ponta a ponta. Não armazenamos informações das pesquisas após a entrega do relatório. Nenhum registro fica vinculado ao seu nome — a investigação é completamente anônima e sigilosa.",
  },
  {
    question: "E se a pessoa não for encontrada no sistema?",
    answer: "Nossos bancos de dados cobrem mais de 99% da população brasileira com CPF ativo. Caso excepcionalmente uma pessoa não seja encontrada ou os dados estejam insuficientes, refazemos a busca gratuitamente ou devolvemos o valor integral.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative z-[1] py-12 md:py-20 px-4 md:px-8"
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

        {/* FAQ List */}
        <div className="space-y-2 md:space-y-3" role="list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div
                key={faq.question}
                className="rounded-lg md:rounded-xl overflow-hidden"
                style={{
                  background: "var(--background-card)",
                  border: `1px solid ${isOpen ? "var(--border-hover)" : "var(--border)"}`,
                }}
                role="listitem"
              >
                <button
                  id={buttonId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left min-h-[48px]"
                  style={{ color: "var(--foreground)" }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="text-[0.8rem] md:text-[0.9rem] font-semibold pr-3">{faq.question}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: isOpen ? "var(--primary)" : "var(--muted)" }}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "300px" : "0" }}
                >
                  <div
                    className="px-4 pb-4 md:px-5 md:pb-5 text-[0.75rem] md:text-[0.85rem] leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
