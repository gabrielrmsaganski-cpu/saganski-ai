"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";
import { SectionShell } from "./section-shell";
import { cn } from "@/lib/utils";

type StackGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
  accent: string;
};

const groups: StackGroup[] = [
  {
    title: "Linguagens & frameworks",
    icon: Code2,
    accent: "from-cyan-400/30 to-blue-500/15",
    items: [
      "TypeScript",
      "Python",
      "Go",
      "C#",
      "Next.js",
      "React",
      "Node.js",
      "FastAPI",
      "NestJS",
      ".NET",
    ],
  },
  {
    title: "IA aplicada & agentes",
    icon: Sparkles,
    accent: "from-violet-400/30 to-fuchsia-500/15",
    items: [
      "Vercel AI SDK",
      "LangGraph",
      "LangChain",
      "MCP",
      "promptfoo",
      "Ragas",
      "function-calling",
      "RAG",
      "guardrails",
    ],
  },
  {
    title: "Machine Learning",
    icon: Cpu,
    accent: "from-emerald-400/30 to-cyan-500/15",
    items: [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "HuggingFace",
      "LoRA · QLoRA",
      "Donut · LayoutLM",
      "Tesseract",
      "Azure DocIntel",
    ],
  },
  {
    title: "MLOps & dados",
    icon: GitBranch,
    accent: "from-blue-400/30 to-violet-500/15",
    items: [
      "MLflow",
      "DVC",
      "Airflow",
      "Kubeflow",
      "Feature Store",
      "model registry",
      "drift monitoring",
      "Weights & Biases",
    ],
  },
  {
    title: "Bancos & busca",
    icon: Database,
    accent: "from-cyan-400/30 to-emerald-500/15",
    items: [
      "PostgreSQL",
      "pgvector",
      "Redis",
      "ClickHouse",
      "Qdrant",
      "Pinecone",
      "Elasticsearch",
      "Kafka",
    ],
  },
  {
    title: "Infra & cloud",
    icon: Cloud,
    accent: "from-violet-400/30 to-blue-500/15",
    items: [
      "Azure",
      "AWS",
      "GCP",
      "Cloudflare",
      "Vercel",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
    ],
  },
];

const principles = [
  {
    title: "Engenharia de produto",
    description:
      "Código com testes, revisão e padrões. Sem entrega-MVP frágil que vira dívida técnica em três meses.",
    icon: Layers,
  },
  {
    title: "Observabilidade real",
    description:
      "Logs estruturados, traces distribuídos e dashboards conectados ao negócio — não só métricas de servidor.",
    icon: TerminalSquare,
  },
  {
    title: "Segurança e LGPD",
    description:
      "Permissões granulares, auditoria, criptografia, segregação por tenant e anonimização quando exigida.",
    icon: ShieldCheck,
  },
  {
    title: "Reuso entre frentes",
    description:
      "Construímos camadas de plataforma que servem várias áreas — o segundo sistema sai mais rápido que o primeiro.",
    icon: Boxes,
  },
];

export function TechCapabilities() {
  return (
    <SectionShell
      id="capacidades"
      eyebrow="Capacidades técnicas"
      title={
        <>
          Domínio profundo em engenharia, IA e dados —{" "}
          <span className="gradient-text">não é vitrine, é operação real</span>.
        </>
      }
      description="Stack que usamos para construir e operar sistemas com IA aplicada em produção. Você não contrata uma única ferramenta: contrata a engenharia certa para cada camada."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <StackCard key={g.title} group={g} index={i} />
        ))}
      </div>

      <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {principles.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan">
                <Icon className="size-4" />
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/70">
                {p.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}

function StackCard({ group, index }: { group: StackGroup; index: number }) {
  const Icon = group.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div
        className={cn(
          "absolute inset-x-0 -top-px h-px bg-gradient-to-r opacity-70",
          group.accent
        )}
      />
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br text-white/95",
            group.accent
          )}
        >
          <Icon className="size-4" />
        </span>
        <h3 className="font-display text-sm font-semibold tracking-tight">
          {group.title}
        </h3>
      </div>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {group.items.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-foreground/80 transition-colors hover:border-white/25 hover:text-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
