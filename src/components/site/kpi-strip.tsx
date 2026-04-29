"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Boxes, BrainCircuit, Layers, Network, Zap } from "lucide-react";
import { Counter } from "./counter";

type KPI = {
  icon: React.ComponentType<{ className?: string }>;
  to: number;
  suffix?: string;
  prefix?: string;
  label: string;
  caption: string;
  decimals?: number;
};

const kpis: KPI[] = [
  {
    icon: BrainCircuit,
    to: 7,
    suffix: "+",
    label: "modelos de IA suportados",
    caption: "GPT-5.4, Claude 4.x, Llama 3.1, modelos próprios",
  },
  {
    icon: Boxes,
    to: 12,
    label: "setores mapeados",
    caption: "Comercial, Jurídico, RH, Logística, Saúde…",
  },
  {
    icon: Layers,
    to: 16,
    label: "tipos de sistema sob medida",
    caption: "CRM, painéis, OCR, RAG, agentes operacionais",
  },
  {
    icon: Network,
    to: 30,
    suffix: "+",
    label: "ferramentas no stack",
    caption: "Engenharia, IA, dados, infra e segurança",
  },
  {
    icon: Zap,
    to: 48,
    suffix: "h",
    label: "para o primeiro diagnóstico",
    caption: "Resposta humana, sem fila genérica",
  },
];

export function KpiStrip() {
  return (
    <section
      aria-label="Indicadores SAGANSKI AI"
      className="relative -mt-2 py-12 md:py-16"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-1"
        >
          <div
            className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent"
            aria-hidden
          />
          <div className="relative grid divide-y divide-white/10 rounded-[22px] bg-[#03060f]/55 px-4 py-3 md:grid-cols-5 md:divide-x md:divide-y-0">
            {kpis.map((k, i) => {
              const Icon = k.icon;
              return (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                  className="flex flex-col gap-1 px-3 py-4 md:px-5"
                >
                  <span className="inline-flex size-7 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan">
                    <Icon className="size-3.5" />
                  </span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <Counter
                      to={k.to}
                      decimals={k.decimals ?? 0}
                      prefix={k.prefix}
                      suffix={k.suffix}
                      className="font-display text-3xl font-semibold tracking-tight text-foreground tabular-nums"
                    />
                  </div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-foreground/70">
                    {k.label}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-foreground/55">
                    {k.caption}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <div
            className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-brand-violet/60 to-transparent"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
