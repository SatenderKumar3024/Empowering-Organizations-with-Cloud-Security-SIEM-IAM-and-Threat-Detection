import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { PlaybooksSection } from "@/components/playbooks-section"
import { ResearchSection } from "@/components/research-section"
import { GrcSection } from "@/components/grc-section"
import { DashboardSection } from "@/components/dashboard-section"
import { ContactSection } from "@/components/contact-section"
import { ScrollToTop } from "@/components/scroll-to-top"
import { DownloadsSection } from "@/components/downloads-section"
import { Footer } from "@/components/footer"
import { IntegrationTools } from "@/components/integration/integration-tools"
import { RealTimeUpdates } from "@/components/real-time-updates"
import { ThreatNotification } from "@/components/threat-notification"
import { AISecurityAssistant } from "@/components/ai-security-assistant"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DashboardSection />

      {/* Add Real-time Updates section */}
      <section className="py-12 bg-background/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RealTimeUpdates />
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Threat Intelligence</h2>
              <p className="text-muted-foreground">
                Monitor real-time security events and respond quickly to emerging threats. Our dashboard provides
                up-to-the-minute information on potential security incidents affecting your organization.
              </p>
              <p className="text-muted-foreground">
                The system automatically categorizes threats by severity and provides actionable intelligence to help
                your security team prioritize their response efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ResearchSection />
      <PlaybooksSection />
      <GrcSection />
      <IntegrationTools />
      <DownloadsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />

      {/* Add the floating notification and AI assistant on separate sides */}
      <ThreatNotification />
      <AISecurityAssistant />
    </main>
  )
}
