import { AmbientBackground } from "@/components/ambient-background"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { HowItWorksSection } from "@/components/how-it-works"
import { ComparisonSection } from "@/components/comparison-section"
import { ServicesSection } from "@/components/services-section"
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
        <HeroSection />
        <StatsBar />
        <HowItWorksSection />
        <UseCasesSection />
        <ReportPreviewSection />
        <TestimonialsSection />
        <GuaranteeSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
      <FloatingElements />
    </>
  )
}
