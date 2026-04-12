import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade | Detetive VIP",
  description: "Política de privacidade do serviço Detetive VIP - Como tratamos seus dados pessoais.",
}

export default function PrivacidadePage() {
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
          Política de Privacidade
        </h1>

        <div className="prose-sm space-y-6" style={{ color: "var(--muted-foreground)" }}>
          <p className="text-sm leading-relaxed">
            Última atualização: Abril de 2026
          </p>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>1. Informações que Coletamos</h2>
            <p className="text-sm leading-relaxed">
              Ao utilizar nossos serviços, coletamos as seguintes informações: nome, número de telefone/WhatsApp, e-mail (quando fornecido) e dados necessários para a investigação solicitada. Os dados de pagamento são processados diretamente pelo gateway de pagamento e não são armazenados por nós.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>2. Como Utilizamos suas Informações</h2>
            <p className="text-sm leading-relaxed">
              Suas informações são utilizadas exclusivamente para: processar e entregar a investigação contratada, entrar em contato via WhatsApp para entrega do resultado, processar o pagamento e cumprir obrigações legais.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>3. Proteção de Dados</h2>
            <p className="text-sm leading-relaxed">
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia em todas as comunicações e seguimos os princípios da Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>4. Compartilhamento de Dados</h2>
            <p className="text-sm leading-relaxed">
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, exceto quando necessário para o processamento do pagamento (gateway de pagamento) ou quando exigido por lei ou ordem judicial.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>5. Retenção de Dados</h2>
            <p className="text-sm leading-relaxed">
              Os dados da investigação são mantidos apenas pelo tempo necessário para a entrega do serviço. Após a conclusão, os registros são eliminados de nossos sistemas. Mantemos registros de transações financeiras conforme exigido pela legislação fiscal brasileira.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>6. Seus Direitos (LGPD)</h2>
            <p className="text-sm leading-relaxed">
              Conforme a LGPD, você tem direito a: confirmar a existência de tratamento de dados, acessar seus dados, corrigir dados incompletos ou desatualizados, solicitar a eliminação de dados desnecessários, revogar o consentimento e solicitar a portabilidade dos dados.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>7. Cookies</h2>
            <p className="text-sm leading-relaxed">
              Utilizamos apenas cookies essenciais para o funcionamento do site e análise de tráfego via Vercel Analytics. Não utilizamos cookies de rastreamento de terceiros para publicidade.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--foreground)" }}>8. Contato do Encarregado (DPO)</h2>
            <p className="text-sm leading-relaxed">
              Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados, entre em contato através do WhatsApp disponível em nosso site ou envie um e-mail para o endereço indicado na página de contato.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
