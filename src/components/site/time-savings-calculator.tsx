"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Clock, DollarSign, Sparkles, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatBRL, formatNumber } from "@/lib/utils";

const WORK_DAYS_MONTH = 22;

export function TimeSavingsCalculator() {
  const [headcount, setHeadcount] = React.useState(15);
  const [hoursPerDay, setHoursPerDay] = React.useState(2.5);
  const [costPerHour, setCostPerHour] = React.useState(60);
  const [automation, setAutomation] = React.useState(45);

  const monthlyHoursSaved =
    headcount * hoursPerDay * WORK_DAYS_MONTH * (automation / 100);
  const monthlySavings = monthlyHoursSaved * costPerHour;
  const yearlySavings = monthlySavings * 12;

  return (
    <Card className="overflow-hidden p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-brand-cyan/80">
            <Clock className="size-3.5" />
            Calculadora de economia de tempo
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
            Estime quanto tempo e dinheiro sua operação devolve com automação.
          </h3>
          <p className="mt-2 text-sm text-foreground/70">
            Ajuste os valores conforme a sua realidade. O cálculo considera dias úteis e
            é baseado em estimativa inicial.
          </p>

          <div className="mt-7 grid gap-6">
            <div>
              <div className="flex items-end justify-between gap-3">
                <Label htmlFor="headcount">Colaboradores envolvidos</Label>
                <span className="font-mono text-sm text-foreground">{headcount}</span>
              </div>
              <Input
                id="headcount"
                type="number"
                min={1}
                value={headcount}
                onChange={(e) => setHeadcount(Math.max(1, Number(e.target.value) || 0))}
                className="mt-2"
              />
              <Slider
                value={[headcount]}
                min={1}
                max={250}
                step={1}
                onValueChange={(v) => setHeadcount(v[0] ?? 1)}
                className="mt-3"
                aria-label="Colaboradores"
              />
            </div>

            <div>
              <div className="flex items-end justify-between gap-3">
                <Label htmlFor="hours">Horas/dia em tarefas manuais</Label>
                <span className="font-mono text-sm text-foreground">
                  {hoursPerDay.toFixed(1)} h
                </span>
              </div>
              <Slider
                value={[hoursPerDay]}
                min={0.5}
                max={8}
                step={0.5}
                onValueChange={(v) => setHoursPerDay(v[0] ?? 0)}
                className="mt-3"
                aria-label="Horas por dia"
              />
            </div>

            <div>
              <div className="flex items-end justify-between gap-3">
                <Label htmlFor="cost">Custo médio por hora</Label>
                <span className="font-mono text-sm text-foreground">
                  {formatBRL(costPerHour)}
                </span>
              </div>
              <Input
                id="cost"
                type="number"
                min={0}
                value={costPerHour}
                onChange={(e) =>
                  setCostPerHour(Math.max(0, Number(e.target.value) || 0))
                }
                className="mt-2"
              />
            </div>

            <div>
              <div className="flex items-end justify-between gap-3">
                <Label htmlFor="automation">Percentual estimado de automação</Label>
                <span className="font-mono text-sm text-foreground">{automation}%</span>
              </div>
              <Slider
                value={[automation]}
                min={5}
                max={90}
                step={5}
                onValueChange={(v) => setAutomation(v[0] ?? 0)}
                className="mt-3"
                aria-label="Percentual de automação"
              />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-brand-electric/[0.05] via-brand-cyan/[0.05] to-brand-violet/[0.06] p-6 glow-ring"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/80">
              <Sparkles className="size-3 text-brand-cyan" />
              Resultado estimado
            </span>

            <div className="mt-6 grid gap-4">
              <ResultRow
                icon={Clock}
                label="Horas economizadas / mês"
                value={`${formatNumber(Math.round(monthlyHoursSaved))} h`}
              />
              <ResultRow
                icon={DollarSign}
                label="Economia mensal"
                value={formatBRL(monthlySavings)}
                highlight
              />
              <ResultRow
                icon={Users}
                label="Equivalente em pessoas-mês"
                value={`${(monthlyHoursSaved / (8 * WORK_DAYS_MONTH)).toFixed(1)} FTE`}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/60">
                Projeção anual
              </p>
              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground">
                {formatBRL(yearlySavings)}
              </p>
            </div>
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-foreground/55">
            Estimativa inicial. O diagnóstico real depende do processo, volume de dados,
            regras internas e integrações necessárias.
          </p>
        </motion.div>
      </div>
    </Card>
  );
}

function ResultRow({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white/5 text-brand-cyan">
          <Icon className="size-4" />
        </span>
        <span className="text-sm text-foreground/80">{label}</span>
      </div>
      <span
        className={`font-mono ${highlight ? "text-lg font-semibold text-foreground" : "text-sm text-foreground/90"}`}
      >
        {value}
      </span>
    </div>
  );
}
