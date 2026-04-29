import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { ServicesSection } from "@/components/site/services-section";
import { SectorExplorer } from "@/components/site/sector-explorer";
import { ToolsSection } from "@/components/site/tools-section";
import { ProcessTimeline } from "@/components/site/process-timeline";
import { ArchitectureLayers } from "@/components/site/architecture-layers";
import { AIProprietary } from "@/components/site/ai-proprietary";
import { TechCapabilities } from "@/components/site/tech-capabilities";
import { BeforeAfter } from "@/components/site/before-after";
import { ForWhom } from "@/components/site/for-whom";
import { ChatSection } from "@/components/site/chat-section";
import { ContactSection } from "@/components/site/contact-section";
import { Footer } from "@/components/site/footer";
import { ChatFloating } from "@/components/site/chat-floating";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <ServicesSection />
        <SectorExplorer />
        <AIProprietary />
        <TechCapabilities />
        <ToolsSection />
        <ProcessTimeline />
        <ArchitectureLayers />
        <BeforeAfter />
        <ForWhom />
        <ChatSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatFloating />
    </>
  );
}
