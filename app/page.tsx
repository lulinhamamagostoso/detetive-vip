import { AmbientBackground } from "@/components/ambient-background"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { HowItWorksSection } from "@/components/how-it-works"
import { ReportPreviewSection } from "@/components/report-preview-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { GuaranteeSection } from "@/components/guarantee-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { FloatingElements } from "@/components/floating-elements"

export default function HomePage() {
  return (
    <>
      <AmbientBackground />
      <Navbar />

      <main id="main-content">
        {/* Dobra inicial — renderização prioritária */}
        <HeroSection />
        <StatsBar />

        {/* Seções entre hero e #planos ficam SEM cv-auto para não
            quebrar o scroll-to-anchor do CTA do hero — o placeholder
            intrinsic-size de 800px causava miscálculo da posição de destino. */}
        <HowItWorksSection />
        <UseCasesSection />
        <ReportPreviewSection />
        <TestimonialsSection />
        <GuaranteeSection />
        <PricingSection />

        {/* Below-the-fold após #planos — cv-auto aqui é seguro */}
        <div className="cv-auto"><FAQSection /></div>
        <div className="cv-auto"><CTASection /></div>
      </main>

      <Footer />
      <FloatingElements />
    </>
  )
}
