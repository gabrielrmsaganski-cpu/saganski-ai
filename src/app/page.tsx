import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { KpiStrip } from "@/components/site/kpi-strip";
import { ServicesSection } from "@/components/site/services-section";
import { TechMarquee } from "@/components/site/tech-marquee";
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
import { CursorFollower } from "@/components/site/cursor-follower";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { CommandPalette } from "@/components/site/command-palette";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorFollower />
      <Header />
      <main className="relative">
        <Hero />
        <KpiStrip />
        <ServicesSection />
        <TechMarquee />
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
      <CommandPalette />
    </>
  );
}
