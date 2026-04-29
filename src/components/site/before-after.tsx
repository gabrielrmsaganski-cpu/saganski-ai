"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { SectionShell } from "./section-shell";

const before = [
  "Planilhas espalhadas",
  "WhatsApp sem controle",
  "Retrabalho manual",
  "Dados duplicados",
  "Falta de visão gerencial",
  "Documentos preenchidos à mão",
  "Aprovações lentas",
  "Informação perdida",
];

const after = [
  "Sistema centralizado",
  "Fluxos automatizados",
  "IA auxiliando tarefas",
  "Dashboards em tempo real",
  "Documentos inteligentes",
  "Equipe organizada",
  "Histórico rastreável",
  "Gestão com dados",
];

export function BeforeAfter() {
  return (
    <SectionShell
      id="antes-depois"
      eyebrow="Antes e depois"
      title={
        <>
          O salto entre operar no manual e{" "}
          <span className="gradient-text">operar no sob medida</span>.
        </>
      }
      description="Esses são padrões recorrentes em operações que evoluíram com SAGANSKI. O recorte exato depende do diagnóstico do seu negócio."
    >
      <div className="relative grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-3xl border border-rose-500/20 bg-rose-500/[0.04] p-6"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-rose-300">
              Antes
            </span>
            <span className="text-[10px] font-mono text-foreground/50">operação manual</span>
          </div>
          <ul className="mt-6 grid gap-2.5">
            {before.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-sm text-foreground/80"
              >
                <XCircle className="size-4 shrink-0 text-rose-400/80" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          className="rounded-3xl border border-brand-cyan/25 bg-gradient-to-br from-brand-electric/[0.05] via-brand-cyan/[0.04] to-brand-violet/[0.06] p-6 glow-ring"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-brand-cyan">
              Depois
            </span>
            <span className="text-[10px] font-mono text-foreground/50">
              sistema sob medida
            </span>
          </div>
          <ul className="mt-6 grid gap-2.5">
            {after.map((a) => (
              <li
                key={a}
                className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-foreground/90"
              >
                <CheckCircle2 className="size-4 shrink-0 text-brand-cyan" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex"
        >
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-white/10 bg-[#040711]/95 text-brand-cyan shadow-[0_0_0_1px_rgba(34,211,238,0.25)_inset]">
            <ArrowRight className="size-5" />
          </span>
        </div>
      </div>
    </SectionShell>
  );
}
