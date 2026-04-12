import type { Metadata } from "next"
import { CtaBanner } from "@/components/cta-banner"
import { Shield, Search, Scale, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheca o Detetive VIP: investigacao digital profissional regulamentada pela Lei 13.432/17. Nossa missao, metodologia e compromisso com a verdade.",
}

const values = [
  {
    icon: Shield,
    title: "Sigilo absoluto",
    description:
      "Todas as investigacoes sao conduzidas com criptografia ponta a ponta. Nenhum dado e armazenado apos a entrega do relatorio.",
  },
  {
    icon: Search,
    title: "Metodologia rigorosa",
    description:
      "Cruzamos mais de 20 bancos de dados oficiais e mais de 2.000 fontes abertas para garantir a precisao das informacoes.",
  },
  {
    icon: Scale,
    title: "100% legal",
    description:
      "Atuamos dentro da Lei 13.432/17 que regulamenta a profissao de detetive particular no Brasil. Todas as fontes sao licitas.",
  },
  {
    icon: Users,
    title: "Equipe especializada",
    description:
      "Profissionais com experiencia em inteligencia, analise de dados e investigacao digital atuam em cada caso.",
  },
]

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight mb-3">
            Sobre o Detetive{" "}
            <span className="gradient-gold-text">VIP</span>
          </h1>
          <p className="text-base text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
            Investigacao digital profissional no Brasil. Descubra a verdade
            sobre qualquer pessoa com rapidez, sigilo e legalidade.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        {/* Mission */}
        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-4">
            Nossa missao
          </h2>
          <div className="prose">
            <p>
              O Detetive VIP nasceu com o proposito de democratizar o acesso a
              investigacao digital profissional no Brasil. Acreditamos que toda
              pessoa tem o direito de conhecer a verdade &mdash; seja para se
              proteger de golpes, verificar antecedentes antes de uma negociacao,
              ou localizar alguem importante.
            </p>
            <p>
              Combinamos tecnologia de ponta com metodologia investigativa
              rigorosa para entregar relatorios completos em ate 5 minutos,
              diretamente no seu WhatsApp. Tudo isso de forma 100% legal,
              sigilosa e acessivel.
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-6">
            Como trabalhamos
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5"
              >
                <item.icon className="h-5 w-5 text-[var(--primary)] mb-3" />
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Legal basis */}
        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-4">
            Base legal
          </h2>
          <div className="prose">
            <p>
              A profissao de detetive particular e regulamentada no Brasil pela{" "}
              <strong>Lei 13.432 de 11 de abril de 2017</strong>. Esta
              legislacao estabelece os direitos e deveres do detetive
              particular, garantindo que a atividade investigativa privada seja
              exercida dentro dos limites legais.
            </p>
            <p>
              O Detetive VIP opera em estrita conformidade com esta lei,
              utilizando exclusivamente fontes licitas de informacao &mdash;
              bancos de dados publicos, registros oficiais e fontes abertas
              (OSINT). Nenhuma tecnica invasiva ou ilegal e utilizada em nossas
              investigacoes.
            </p>
            <blockquote>
              <p>
                &ldquo;Art. 2o. Considera-se detetive particular o profissional
                que, habitualmente, por conta propria ou na forma de sociedade
                civil ou empresarial, planeje e execute coleta de dados e
                informacoes de natureza nao criminal [...]&rdquo; &mdash; Lei
                13.432/17
              </p>
            </blockquote>
          </div>
        </section>

        {/* Team placeholder */}
        <section className="mb-4">
          <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-4">
            Nossa equipe
          </h2>
          <div className="prose">
            <p>
              O Detetive VIP conta com uma equipe multidisciplinar de
              profissionais especializados em inteligencia de fontes abertas
              (OSINT), analise de dados, investigacao digital e seguranca da
              informacao. Cada membro da equipe possui formacao e experiencia
              comprovada na area de investigacao.
            </p>
            <p>
              Nosso compromisso e com a verdade, a etica e a qualidade das
              informacoes entregues. Cada relatorio e revisado antes do envio
              para garantir precisao e confiabilidade.
            </p>
          </div>
        </section>

        {/* CTA */}
        <CtaBanner
          heading="Pronto para descobrir a verdade?"
          description="Contrate uma investigacao profissional agora mesmo. Resultado em ate 5 minutos via WhatsApp."
        />
      </div>
    </>
  )
}
