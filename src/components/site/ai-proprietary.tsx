"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import {
  Activity,
  Boxes,
  Brain,
  Cpu,
  Database,
  GitBranch,
  Lock,
  Network,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SectionShell } from "./section-shell";

const AICoreScene = dynamic(
  () => import("./ai-core-scene").then((m) => m.AICoreScene),
  { ssr: false, loading: () => null }
);

type Capability = {
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
};

const capabilities: Capability[] = [
  {
    title: "Modelos sob medida",
    description:
      "Fine-tuning, LoRA e adapters em modelos open source (Llama, Qwen, Mistral) treinados nos dados da sua empresa, com avaliação contínua.",
    icon: Brain,
    badge: "Fine-tuning",
  },
  {
    title: "RAG corporativo",
    description:
      "Indexação semântica de contratos, manuais, históricos e bases internas. Respostas com citação da fonte, não alucinação.",
    icon: Database,
    badge: "Vector DB",
  },
  {
    title: "Agentes operacionais",
    description:
      "Agentes especializados que consultam APIs, executam ações em sistemas internos e operam dentro de regras de negócio explícitas.",
    icon: Workflow,
    badge: "LangGraph · MCP",
  },
  {
    title: "Visão e documentos",
    description:
      "OCR, extração estruturada e classificação documental — Donut, LayoutLM, Azure Document Intelligence ou modelos próprios.",
    icon: Boxes,
    badge: "Multi-modal",
  },
  {
    title: "Previsão e séries temporais",
    description:
      "Modelos de demanda, churn, fraude e propensão. XGBoost, LightGBM, Prophet, redes neurais para sequências.",
    icon: Activity,
    badge: "ML clássico + DL",
  },
  {
    title: "Privado por padrão",
    description:
      "Hospedagem dentro do seu perímetro (VPC própria, on-prem ou edge). LGPD, segregação por tenant, criptografia em trânsito e repouso.",
    icon: Lock,
    badge: "On-prem · VPC",
  },
];

type Pipeline = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const mlPipeline: Pipeline[] = [
  {
    step: "01",
    title: "Coleta e curadoria",
    description:
      "Conectamos suas fontes (banco, ERP, CRM, repositórios) e curamos os dados que vão treinar o modelo.",
    icon: Database,
  },
  {
    step: "02",
    title: "Preparação e anotação",
    description:
      "Limpeza, normalização e — quando necessário — anotação humana com guidelines e revisão.",
    icon: GitBranch,
  },
  {
    step: "03",
    title: "Treinamento e avaliação",
    description:
      "Experimentos com tracking (MLflow), métricas alinhadas ao negócio e validação cruzada antes de subir.",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Serving e integração",
    description:
      "Modelo servido via API, embutido em fluxos existentes ou em agentes — com latência e custo monitorados.",
    icon: Network,
  },
  {
    step: "05",
    title: "Monitoramento contínuo",
    description:
      "Drift de dados e modelo, qualidade da resposta, custo por chamada e re-treino sob trigger.",
    icon: Activity,
  },
];

export function AIProprietary() {
  return (
    <SectionShell
      id="ia-propria"
      eyebrow="IA própria & Machine Learning"
      title={
        <>
          Não é só prompt.{" "}
          <span className="gradient-text">Construímos a IA da sua empresa.</span>
        </>
      }
      description="Treinamos modelos sob medida com os seus dados, hospedamos privadamente quando necessário, e operamos com pipelines reais de MLOps. IA aplicada que economiza tempo, reduz erro e acelera decisão."
    >
      <div className="relative">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-electric/[0.05] via-brand-cyan/[0.04] to-brand-violet/[0.06] p-2 glow-ring"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(59,130,246,0.18), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="relative h-full min-h-[420px] rounded-[22px] bg-[#03060f]/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-brand-cyan/85">
                  <Sparkles className="size-3" />
                  AI Core · runtime simulado
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                  online
                </span>
              </div>
              <AICoreScene className="-mt-2" height={420} />
              <div className="absolute inset-x-6 bottom-5 grid grid-cols-3 gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/55">
                <Telemetry label="latency" value="38ms" tone="cyan" />
                <Telemetry label="ctx tokens" value="128k" tone="violet" />
                <Telemetry label="agents" value="ready" tone="emerald" />
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {capabilities.slice(0, 3).map((c, i) => (
              <CapabilityCard key={c.title} {...c} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {capabilities.slice(3).map((c, i) => (
            <CapabilityCard key={c.title} {...c} index={i + 3} />
          ))}
        </div>

        <div className="mt-12">
          <div className="mb-5 flex flex-col items-start justify-between gap-2 md:flex-row md:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-brand-cyan/85">
                <Workflow className="size-3" />
                Pipeline ML/IA
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Do dado bruto ao modelo em produção,{" "}
                <span className="gradient-text">monitorado em tempo real</span>.
              </h3>
            </div>
            <p className="max-w-md text-sm text-foreground/65">
              MLOps de verdade. Experimentos versionados, modelos com registro,
              observabilidade de drift e custo por inferência.
            </p>
          </div>

          <ol className="grid gap-3 md:grid-cols-5">
            {mlPipeline.map((step, i) => (
              <PipelineStep key={step.step} {...step} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </SectionShell>
  );
}

function CapabilityCard({
  title,
  description,
  icon: Icon,
  badge,
  index = 0,
}: Capability & { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,0%),rgba(34,211,238,0.18),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan">
          <Icon className="size-4" />
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/70">
          {badge}
        </span>
      </div>
      <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/70">
        {description}
      </p>
    </motion.div>
  );
}

function PipelineStep({
  step,
  title,
  description,
  icon: Icon,
  index = 0,
}: Pipeline & { index?: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan">
          <Icon className="size-4" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-foreground/40">
          {step}
        </span>
      </div>
      <h4 className="mt-3 font-display text-sm font-semibold tracking-tight">
        {title}
      </h4>
      <p className="mt-1 text-[12px] leading-relaxed text-foreground/65">
        {description}
      </p>
    </motion.li>
  );
}

function Telemetry({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "cyan" | "violet" | "emerald";
}) {
  const ring =
    tone === "cyan"
      ? "border-brand-cyan/30 text-brand-cyan"
      : tone === "violet"
        ? "border-brand-violet/30 text-brand-violet"
        : "border-emerald-400/30 text-emerald-300";
  return (
    <div
      className={`rounded-xl border ${ring} bg-black/30 px-3 py-2 backdrop-blur-md`}
    >
      <div className="text-[9px] tracking-[0.24em] text-foreground/50">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-[12px] font-semibold">{value}</div>
    </div>
  );
}
