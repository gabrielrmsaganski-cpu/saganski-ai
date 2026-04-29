"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Cog, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionShell } from "./section-shell";
import { sectors } from "@/lib/data/sectors";
import { cn } from "@/lib/utils";

export function SectorExplorer() {
  const [activeId, setActiveId] = React.useState(sectors[0].id);
  const active = sectors.find((s) => s.id === activeId)!;

  return (
    <SectionShell
      id="setores"
      eyebrow="Por setor"
      title={
        <>
          Cada área tem seus gargalos.{" "}
          <span className="gradient-text">Cada uma merece seu sistema.</span>
        </>
      }
      description="Selecione um setor e veja exemplos conceituais de dores recorrentes, soluções possíveis e automações recomendadas. O escopo real é definido em diagnóstico."
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-1">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              const isActive = sector.id === activeId;
              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => setActiveId(sector.id)}
                  className={cn(
                    "group inline-flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "border-brand-cyan/40 bg-brand-cyan/10 text-foreground shadow-[0_0_0_1px_rgba(34,211,238,0.25)_inset]"
                      : "border-white/10 bg-white/[0.03] text-foreground/70 hover:border-white/20 hover:bg-white/[0.05] hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-7 items-center justify-center rounded-lg border border-white/10 transition-colors",
                      isActive
                        ? "bg-brand-cyan/20 text-brand-cyan"
                        : "bg-white/5 text-foreground/70 group-hover:text-foreground"
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span className="text-[13px]">{sector.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Card className="relative overflow-hidden p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan">
                  <active.icon className="size-4" />
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-brand-cyan/80">
                    Setor
                  </p>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {active.name}
                  </h3>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/60">
                    Principais dores
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                    {active.pains.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block size-1.5 rounded-full bg-rose-400/80" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/60">
                    Soluções possíveis
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                    {active.solutions.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-brand-cyan" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/60">
                    Automações recomendadas
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                    {active.automations.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <Zap className="mt-0.5 size-3.5 shrink-0 text-brand-violet" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5">
                <div className="flex items-start gap-3">
                  <Cog className="mt-0.5 size-4 text-brand-cyan" />
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-brand-cyan/80">
                      Exemplo de sistema sob medida
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
                      {active.exampleSystem}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <a href="#contato">
                      Diagnosticar este setor
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href="#consultor">Conversar com a IA Consultora</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </SectionShell>
  );
}
