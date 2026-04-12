import Image from "next/image"
import Link from "next/link"

const footerLinks = {
  servicos: [
    { label: "Rastreamento CPF", href: "#servicos" },
    { label: "Rastreamento Telefone", href: "#servicos" },
    { label: "Rastreamento Placa", href: "#servicos" },
    { label: "Rastreamento CNPJ", href: "#servicos" },
    { label: "Chave PIX", href: "#servicos" },
  ],
  empresa: [
    { label: "Sobre Nós", href: "#como-funciona" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "FAQ", href: "#faq" },
    { label: "Blog", href: "https://conteudo.detetive.vip" },
  ],
  legal: [
    { label: "Termos de Uso", href: "/termos" },
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Lei 13.432/17", href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13432.htm" },
  ],
}

export function Footer() {
  return (
    <footer
      className="relative z-[1] pt-10 pb-6 px-4 md:px-8 border-t"
      style={{ background: "var(--background)", borderColor: "var(--border)" }}
    >
      <div className="max-w-[1300px] mx-auto">
        {/* Mobile: Simple footer */}
        <div className="md:hidden text-center">
          <Image
            src="/logo.png"
            alt="Detetive VIP"
            width={120}
            height={30}
            className="h-8 w-auto mx-auto mb-3"
          />
          <p
            className="text-[0.75rem] leading-relaxed mb-4"
            style={{ color: "var(--muted)" }}
          >
            Investigação digital profissional com sigilo absoluto.
          </p>
          <div className="flex justify-center gap-4 mb-4 text-[0.7rem]" style={{ color: "var(--muted)" }}>
            <Link href="/termos" className="hover:text-[var(--primary)] transition-colors">Termos</Link>
            <Link href="/privacidade" className="hover:text-[var(--primary)] transition-colors">Privacidade</Link>
            <Link href="#faq" className="hover:text-[var(--primary)] transition-colors">FAQ</Link>
          </div>
          <p className="text-[0.65rem]" style={{ color: "var(--muted)" }}>
            &copy; {new Date().getFullYear()} Detetive VIP
          </p>
        </div>

        {/* Desktop: Full footer */}
        <div className="hidden md:block">
          <div className="grid lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Image
                src="/logo.png"
                alt="Detetive VIP"
                width={140}
                height={35}
                className="h-9 w-auto mb-3"
              />
              <p
                className="text-[0.8rem] leading-relaxed max-w-[260px]"
                style={{ color: "var(--muted)" }}
              >
                Investigação digital profissional com sigilo absoluto. Lei 13.432/17.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4
                className="font-bold text-[0.7rem] uppercase tracking-wider mb-3"
                style={{ color: "var(--foreground)" }}
              >
                Serviços
              </h4>
              <ul className="space-y-1.5">
                {footerLinks.servicos.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.78rem] hover:text-[var(--primary)] transition-colors"
                      style={{ color: "var(--muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4
                className="font-bold text-[0.7rem] uppercase tracking-wider mb-3"
                style={{ color: "var(--foreground)" }}
              >
                Empresa
              </h4>
              <ul className="space-y-1.5">
                {footerLinks.empresa.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.78rem] hover:text-[var(--primary)] transition-colors"
                      style={{ color: "var(--muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4
                className="font-bold text-[0.7rem] uppercase tracking-wider mb-3"
                style={{ color: "var(--foreground)" }}
              >
                Legal
              </h4>
              <ul className="space-y-1.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.78rem] hover:text-[var(--primary)] transition-colors"
                      style={{ color: "var(--muted)" }}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div
            className="pt-4 border-t flex justify-between items-center text-[0.7rem]"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            <p>&copy; {new Date().getFullYear()} Detetive VIP. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <Link href="/termos" className="hover:text-[var(--primary)] transition-colors">Termos</Link>
              <Link href="/privacidade" className="hover:text-[var(--primary)] transition-colors">Privacidade</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
