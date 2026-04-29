"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Compass,
  Map,
  PencilRuler,
  Layers,
  Code2,
  Plug,
  TestTube,
  GraduationCap,
  Infinity as InfinityIcon,
  type LucideIcon,
} from "lucide-react";
import { SectionShell } from "./section-shell";

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    title: "Diagnóstico",
    description:
      "Mergulhamos na sua operação atual: ferramentas, papéis, gargalos, riscos e o que travou em tentativas passadas.",
    icon: Compass,
  },
  {
    title: "Mapeamento dos processos",
    description:
      "Desenhamos o fluxo real, não o ideal. Marcando o que dá fricção, o que pode ser eliminado e o que exige IA.",
    icon: Map,
  },
  {
    title: "Arquitetura do sistema",
    description:
      "Definimos camadas, dados, permissões, integrações e modelo de IA. Documentado de forma que você consiga validar.",
    icon: PencilRuler,
  },
  {
    title: "Protótipo visual",
    description:
      "Geramos telas navegáveis para alinhar UX, regras e fluxos antes de tocar em código de produção.",
    icon: Layers,
  },
  {
    title: "Desenvolvimento",
    description:
      "Construímos por entregas curtas, com revisão semanal. Você acompanha o que está sendo feito sem precisar entender de código.",
    icon: Code2,
  },
  {
    title: "Integrações",
    description:
      "Conectamos ERP, banco, gateways, APIs internas e canais (WhatsApp, e-mail) com credenciais e regras validadas.",
    icon: Plug,
  },
  {
    title: "Testes",
    description:
      "Casos reais, edge cases e dados de produção controlados. Auditoria de permissões e fluxos críticos.",
    icon: TestTube,
  },
  {
    title: "Treinamento",
    description:
      "Capacitamos a equipe usuária e a equipe técnica. Documentação viva e vídeos curtos por fluxo.",
    icon: GraduationCap,
  },
  {
    title: "Evolução contínua",
    description:
      "Sistema operando, evoluímos por sprints. Melhorias baseadas em uso real, métricas e prioridade do negócio.",
    icon: InfinityIcon,
  },
];

export function ProcessTimeline() {
  return (
    <SectionShell
      id="processo"
      eyebrow="Como trabalhamos"
      title={
        <>
          Um processo desenhado para que o sistema reflita{" "}
          <span className="gradient-text">a realidade da empresa</span> — e não o contrário.
        </>
      }
      description="Cada fluxo pode ser desenhado para refletir a forma como sua equipe trabalha. Nada de software engessado e adaptações forçadas."
    >
      <div className="relative mx-auto max-w-5xl">
        <div
          className="pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-brand-cyan/0 via-brand-cyan/40 to-brand-violet/0 md:block"
          aria-hidden
        />
        <ol className="space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: "easeOut" }}
                className="relative grid grid-cols-[40px_1fr] gap-4 md:grid-cols-[64px_1fr]"
              >
                <div className="flex md:items-start md:justify-center">
                  <span className="relative inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan shadow-[0_0_0_1px_rgba(34,211,238,0.18)_inset]">
                    <Icon className="size-4" />
                    <span className="absolute -bottom-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-[#040711] text-[10px] font-mono text-brand-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05]">
                  <h3 className="font-display text-base font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </SectionShell>
  );
}
