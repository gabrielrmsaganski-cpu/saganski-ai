"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeSavingsCalculator } from "./time-savings-calculator";
import { DigitalMaturityDiagnostic } from "./digital-maturity-diagnostic";
import { SystemBuilder } from "./system-builder";
import { BriefingGenerator } from "./briefing-generator";
import { SectionShell } from "./section-shell";
import {
  Calculator,
  ClipboardList,
  Sparkles,
  Wand2,
} from "lucide-react";

export function ToolsSection() {
  return (
    <SectionShell
      id="ferramentas"
      eyebrow="Ferramentas inteligentes"
      title={
        <>
          Use as ferramentas e veja como pensamos —{" "}
          <span className="gradient-text">antes de qualquer reunião</span>.
        </>
      }
      description="Cada ferramenta foi pensada para extrair clareza do seu cenário em poucos minutos. Sem cadastro, sem letra miúda."
    >
      <Tabs defaultValue="calculator" className="w-full">
        <div className="flex justify-center">
          <TabsList className="flex-wrap">
            <TabsTrigger value="calculator">
              <Calculator className="size-3.5" />
              Calculadora
            </TabsTrigger>
            <TabsTrigger value="diagnostic">
              <Sparkles className="size-3.5" />
              Diagnóstico
            </TabsTrigger>
            <TabsTrigger value="builder">
              <Wand2 className="size-3.5" />
              Montador
            </TabsTrigger>
            <TabsTrigger value="briefing">
              <ClipboardList className="size-3.5" />
              Briefing
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="calculator">
          <TimeSavingsCalculator />
        </TabsContent>
        <TabsContent value="diagnostic">
          <DigitalMaturityDiagnostic />
        </TabsContent>
        <TabsContent value="builder">
          <SystemBuilder />
        </TabsContent>
        <TabsContent value="briefing">
          <BriefingGenerator />
        </TabsContent>
      </Tabs>
    </SectionShell>
  );
}
