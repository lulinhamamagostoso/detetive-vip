import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso | Detetive VIP",
  description: "Termos de uso do serviço Detetive VIP - Investigação Digital Profissional.",
}

export default function TermosPage() {
  return (
    <div className="min-h-screen py-12 px-4 md:px-8" style={{ background: "var(--background)" }}>
      <div className="max-w-[800px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8"
          style={{ color: "var(--primary)" }}
        >
          ← Voltar ao início
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8" style={{ color: "var(--foreground)" }}>
          Termos de Uso
        </h1>

        <div className="prose-sm space-y-6" style={{ color: "var(--muted-foreground)" }}>
          <p className="text-sm leading-relaxed">
            Última atualização: Abril de 2026
          </p>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>1. Aceitação dos Termos</h2>
            <p className="text-sm leading-relaxed">
              Ao utilizar os serviços do Detetive VIP, você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>2. Descrição do Serviço</h2>
            <p className="text-sm leading-relaxed">
              O Detetive VIP oferece serviços de investigação digital profissional, atuando em conformidade com a Lei 13.432/2017 que regulamenta a profissão de detetive particular no Brasil. Todas as informações são obtidas exclusivamente de fontes legais e bancos de dados públicos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>3. Uso Permitido</h2>
            <p className="text-sm leading-relaxed">
              Os serviços devem ser utilizados exclusivamente para fins lícitos, incluindo mas não se limitando a: verificação de antecedentes, localização de pessoas, investigação de fraudes, proteção patrimonial e confirmação de informações.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>4. Uso Proibido</h2>
            <p className="text-sm leading-relaxed">
              É estritamente proibido utilizar nossos serviços para fins de perseguição, stalking, assédio, intimidação, discriminação ou qualquer atividade ilegal. O Detetive VIP reserva-se o direito de recusar serviços e reportar às autoridades competentes qualquer uso indevido.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>5. Pagamento</h2>
            <p className="text-sm leading-relaxed">
              Os pagamentos são processados via PIX de forma instantânea e segura. Os preços são exibidos em Reais (BRL) e incluem todos os impostos aplicáveis. Após a confirmação do pagamento, o serviço é iniciado imediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>6. Entrega e Garantia</h2>
            <p className="text-sm leading-relaxed">
              O resultado da investigação é entregue via WhatsApp no número informado durante a contratação, em até 5 minutos após a confirmação do pagamento. Em caso de informações incorretas ou desatualizadas, a investigação é refeita gratuitamente ou o valor é devolvido integralmente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>7. Limitação de Responsabilidade</h2>
            <p className="text-sm leading-relaxed">
              O Detetive VIP não se responsabiliza pelo uso que o contratante faz das informações obtidas. As informações são fornecidas conforme disponíveis nos bancos de dados consultados e podem conter dados desatualizados de fontes públicas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>8. Contato</h2>
            <p className="text-sm leading-relaxed">
              Para dúvidas sobre estes Termos de Uso, entre em contato através do WhatsApp disponível em nosso site.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
