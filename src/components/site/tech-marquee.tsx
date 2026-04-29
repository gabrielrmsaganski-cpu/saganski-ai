"use client";

import * as React from "react";

const items = [
  "TypeScript",
  "Python",
  "Go",
  "Rust",
  "Next.js",
  "FastAPI",
  "PyTorch",
  "scikit-learn",
  "XGBoost",
  "LangGraph",
  "LangChain",
  "MCP",
  "Vercel AI SDK",
  "Azure AI Foundry",
  "GPT-5.4",
  "Claude Sonnet 4.6",
  "Llama 3.1",
  "RAG",
  "Fine-tuning",
  "LoRA",
  "pgvector",
  "Qdrant",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "Temporal",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Cloudflare",
  "Azure",
  "AWS",
  "GCP",
  "MLflow",
  "Airflow",
  "Kubeflow",
  "GitHub Actions",
  "OpenTelemetry",
];

export function TechMarquee() {
  const doubled = React.useMemo(() => [...items, ...items], []);
  return (
    <div
      className="relative -my-4 overflow-hidden border-y border-white/[0.06] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_70%)] py-5"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
        aria-hidden
      />
      <div className="flex w-max animate-marquee gap-3 will-change-transform">
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[12px] font-medium tracking-tight text-foreground/75 backdrop-blur-sm transition-colors hover:border-white/25 hover:text-foreground"
          >
            <span className="size-1.5 rounded-full bg-gradient-to-br from-brand-electric via-brand-cyan to-brand-violet" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
