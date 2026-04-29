"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Gauge, RefreshCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Question = {
  id: string;
  question: string;
  options: { label: string; score: number }[];
};

const questions: Question[] = [
  {
    id: "planilhas",
    question: "A empresa usa planilhas para controlar processos?",
    options: [
      { label: "Sim, base inteira em planilhas", score: 0 },
      { label: "Parte importante ainda em planilhas", score: 1 },
      { label: "Apenas casos pontuais", score: 2 },
      { label: "Não, processos em sistema dedicado", score: 3 },
    ],
  },
  {
    id: "retrabalho",
    question: "Há retrabalho frequente entre áreas?",
    options: [
      { label: "Sempre", score: 0 },
      { label: "Em alguns fluxos", score: 1 },
      { label: "Raro, só em exceções", score: 2 },
      { label: "Praticamente nenhum", score: 3 },
    ],
  },
  {
    id: "integracao",
    question: "Existe integração entre setores e sistemas?",
    options: [
      { label: "Cada área tem sua própria ferramenta", score: 0 },
      { label: "Algumas integrações pontuais", score: 1 },
      { label: "Maioria dos sistemas conectados", score: 2 },
      { label: "Operação 100% integrada", score: 3 },
    ],
  },
  {
    id: "documentos",
    question: "Documentos são preenchidos manualmente?",
    options: [
      { label: "Sim, no Word/PDF a cada cliente", score: 0 },
      { label: "Templates fixos com edição manual", score: 1 },
      { label: "Geração automática com revisão", score: 2 },
      { label: "Geração e arquivamento automáticos", score: 3 },
    ],
  },
  {
    id: "whatsapp",
    question: "Clientes ou equipes dependem de WhatsApp solto?",
    options: [
      { label: "Sim, sem histórico ou roteamento", score: 0 },
      { label: "Algum controle informal", score: 1 },
      { label: "Plataforma centralizada com fila", score: 2 },
      { label: "WhatsApp integrado ao sistema interno", score: 3 },
    ],
  },
  {
    id: "dashboards",
    question: "Gestores têm painéis em tempo real?",
    options: [
      { label: "Não, relatórios são feitos sob demanda", score: 0 },
      { label: "Planilhas atualizadas manualmente", score: 1 },
      { label: "BI conectado a alguns dados", score: 2 },
      { label: "Dashboards em tempo real consolidados", score: 3 },
    ],
  },
];

type Level = {
  name: string;
  description: string;
  recommendations: string[];
  range: [number, number];
};

const levels: Level[] = [
  {
    name: "Manual",
    description:
      "A operação depende fortemente de pessoas para mover informação. Risco alto de erro e dependência de memória de quem opera.",
    range: [0, 5],
    recommendations: [
      "Mapear processos críticos e centralizar dados em um sistema único",
      "Eliminar planilhas-mestre — substituir por cadastros estruturados",
      "Implementar primeiro fluxo automatizado para reduzir gargalo principal",
    ],
  },
  {
    name: "Organizado",
    description:
      "Existe alguma padronização, mas integração e visão gerencial ainda são frágeis. Boa base para automatizar.",
    range: [6, 9],
    recommendations: [
      "Conectar áreas com integrações leves (API, webhooks)",
      "Implantar painel executivo com indicadores básicos",
      "Padronizar documentos com geração automática a partir de templates",
    ],
  },
  {
    name: "Integrável",
    description:
      "Sistemas se conversam parcialmente e existem dashboards em uso. Hora de aplicar IA em pontos de alto retorno.",
    range: [10, 13],
    recommendations: [
      "Aplicar IA em triagem, leitura de documentos e atendimento",
      "Reduzir aprovações manuais com fluxos por alçada",
      "Consolidar dados em um data layer único",
    ],
  },
  {
    name: "Inteligente",
    description:
      "Operação possui automações maduras e IA aplicada de forma pontual. Próximo salto é orquestração.",
    range: [14, 16],
    recommendations: [
      "Orquestrar agentes de IA com regras por área",
      "Automatizar relatórios executivos e alertas proativos",
      "Construir camada de produto interna que sirva todas as áreas",
    ],
  },
  {
    name: "Escalável",
    description:
      "Operação sustentada por sistema próprio, dados confiáveis e IA aplicada em decisão. Foco passa a ser escalar.",
    range: [17, 18],
    recommendations: [
      "Expandir integrações com clientes/parceiros via portais e APIs",
      "Implementar previsões e simulações com modelos próprios",
      "Reaplicar arquitetura para novas frentes de negócio",
    ],
  },
];

function levelFromScore(score: number) {
  return levels.find((l) => score >= l.range[0] && score <= l.range[1]) ?? levels[0];
}

export function DigitalMaturityDiagnostic() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [done, setDone] = React.useState(false);

  const total = questions.length;
  const current = questions[step];
  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const level = levelFromScore(score);
  const progressPct = done
    ? 100
    : Math.round((Object.keys(answers).length / total) * 100);

  function handleSelect(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (step < total - 1) {
      setTimeout(() => setStep((s) => s + 1), 180);
    } else {
      setTimeout(() => setDone(true), 200);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  return (
    <Card className="overflow-hidden p-6 md:p-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-brand-cyan/80">
          <Gauge className="size-3.5" />
          Diagnóstico de maturidade digital
        </div>
        <span className="font-mono text-xs text-foreground/60">
          {done ? `${total}/${total}` : `${Math.min(step + 1, total)}/${total}`}
        </span>
      </div>

      <Progress value={progressPct} className="mt-4" />

      <div className="mt-8 min-h-[230px]">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={`q-${current.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                {current.question}
              </h3>
              <div className="mt-5 grid gap-2">
                {current.options.map((opt) => {
                  const selected = answers[current.id] === opt.score;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelect(current.id, opt.score)}
                      className={cn(
                        "group flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all",
                        selected
                          ? "border-brand-cyan/40 bg-brand-cyan/10 text-foreground"
                          : "border-white/10 bg-white/[0.03] text-foreground/85 hover:border-white/20 hover:bg-white/[0.05]"
                      )}
                    >
                      <span>{opt.label}</span>
                      <span
                        className={cn(
                          "inline-flex size-5 items-center justify-center rounded-full border text-[10px]",
                          selected
                            ? "border-brand-cyan/40 bg-brand-cyan/30 text-foreground"
                            : "border-white/15 bg-white/5 text-foreground/60"
                        )}
                      >
                        {opt.score}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                  <ChevronLeft className="size-4" />
                  Anterior
                </Button>
                <Button
                  variant="subtle"
                  size="sm"
                  disabled={!answers[current.id] && answers[current.id] !== 0}
                  onClick={() => {
                    if (step < total - 1) setStep((s) => s + 1);
                    else setDone(true);
                  }}
                >
                  {step === total - 1 ? "Ver resultado" : "Próxima"}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-[1fr_1fr]"
            >
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand-electric/[0.05] via-brand-cyan/[0.05] to-brand-violet/[0.06] p-5 glow-ring">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/80">
                  <Sparkles className="size-3 text-brand-cyan" />
                  Nível atual
                </span>
                <p className="mt-4 font-display text-4xl font-semibold tracking-tight">
                  {level.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  {level.description}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="font-mono text-xs text-foreground/60">
                    Pontuação:{" "}
                    <span className="font-semibold text-foreground">{score}</span> /{" "}
                    {total * 3}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-brand-cyan/80">
                  Recomendações práticas
                </p>
                <ul className="mt-3 space-y-2">
                  {level.recommendations.map((r) => (
                    <li
                      key={r}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground/85"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <a href="#contato">Solicitar diagnóstico aprofundado</a>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reset}>
                    <RefreshCcw className="size-3.5" />
                    Refazer
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
