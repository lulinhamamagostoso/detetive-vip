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

        {/* Below-the-fold — content-visibility:auto pula render/layout
            até próximo da viewport. contain-intrinsic-size reserva espaço
            para evitar CLS durante scroll. */}
        <div className="cv-auto"><HowItWorksSection /></div>
        <div className="cv-auto"><UseCasesSection /></div>
        <div className="cv-auto"><ReportPreviewSection /></div>
        <div className="cv-auto"><TestimonialsSection /></div>
        <div className="cv-auto"><GuaranteeSection /></div>
        <div className="cv-auto"><PricingSection /></div>
        <div className="cv-auto"><FAQSection /></div>
        <div className="cv-auto"><CTASection /></div>
      </main>

      <Footer />
      <FloatingElements />
    </>
  )
}
