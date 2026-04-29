"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  BarChart3,
  Boxes,
  Brain,
  Database,
  FileSearch,
  Layout,
  Lock,
  Network,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SectionShell } from "./section-shell";
import { cn } from "@/lib/utils";

type Layer = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

const layers: Layer[] = [
  {
    title: "Interface premium",
    description: "UX corporativa pensada para uso intenso, com hierarquia clara e atalhos.",
    icon: Layout,
    accent: "from-cyan-400/30 to-blue-500/20",
  },
  {
    title: "Dashboards",
    description: "Visões executivas e operacionais conectadas a dados reais em tempo real.",
    icon: BarChart3,
    accent: "from-blue-400/30 to-violet-500/20",
  },
  {
    title: "Automações",
    description: "Regras, gatilhos e workflows que disparam ações sem intervenção manual.",
    icon: Workflow,
    accent: "from-violet-400/30 to-fuchsia-500/20",
  },
  {
    title: "IA e agentes",
    description: "Agentes especializados consultam dados, geram conteúdo e executam tarefas.",
    icon: Brain,
    accent: "from-fuchsia-400/30 to-cyan-500/20",
  },
  {
    title: "Documentos",
    description: "Geração com layout oficial e leitura inteligente de PDFs e contratos.",
    icon: FileSearch,
    accent: "from-cyan-400/30 to-emerald-500/20",
  },
  {
    title: "APIs e integrações",
    description: "Camada de orquestração entre ERP, banco, marketplaces e ferramentas internas.",
    icon: Network,
    accent: "from-emerald-400/30 to-blue-500/20",
  },
  {
    title: "Banco de dados",
    description: "Modelagem própria do seu negócio, com histórico, versionamento e auditoria.",
    icon: Database,
    accent: "from-blue-400/30 to-cyan-500/20",
  },
  {
    title: "Permissões",
    description: "Controle granular por papel, área e cliente — multi-tenant quando necessário.",
    icon: Lock,
    accent: "from-violet-400/30 to-rose-500/20",
  },
  {
    title: "Auditoria",
    description: "Trilha completa de quem fez o quê, quando e a partir de qual contexto.",
    icon: ShieldCheck,
    accent: "from-rose-400/30 to-violet-500/20",
  },
  {
    title: "Relatórios",
    description: "Modelos sob medida, exportação programada e envio direto para gestores.",
    icon: Boxes,
    accent: "from-cyan-400/30 to-violet-500/20",
  },
];

export function ArchitectureLayers() {
  return (
    <SectionShell
      id="arquitetura"
      eyebrow="Arquitetura de soluções"
      title={
        <>
          Camadas integradas que formam um{" "}
          <span className="gradient-text">núcleo operacional vivo</span>.
        </>
      }
      description="Cada solução SAGANSKI é construída em camadas, conectadas entre si — não em módulos soltos. Isso permite escalar sem reescrever."
    >
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {layers.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: "easeOut" }}
              className="relative"
            >
              <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
                <div
                  className={cn(
                    "absolute inset-x-0 -top-px h-px bg-gradient-to-r opacity-60",
                    layer.accent
                  )}
                />
                <div
                  className={cn(
                    "mb-3 inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br text-foreground",
                    layer.accent
                  )}
                >
                  <Icon className="size-4 text-white/90" />
                </div>
                <h3 className="font-display text-sm font-semibold tracking-tight">
                  {layer.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/70">
                  {layer.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
