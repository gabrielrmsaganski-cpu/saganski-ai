"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";
import { heroBenefits } from "@/lib/data/services";

const NeuralBackground = dynamic(
  () => import("./neural-background").then((m) => m.NeuralBackground),
  { ssr: false, loading: () => null }
);

const rotatingWords = [
  "sob medida",
  "com IA aplicada",
  "que escalam",
  "sem retrabalho",
  "que decidem",
];

type LiveStat = {
  label: string;
  value: string;
  tone: "cyan" | "violet" | "emerald";
};

const liveStats: LiveStat[] = [
  { label: "modelos disponíveis", value: "7+", tone: "cyan" },
  { label: "linguagens stack", value: "10+", tone: "violet" },
  { label: "núcleo IA", value: "online", tone: "emerald" },
];

export function Hero() {
  const [wordIndex, setWordIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="inicio"
      className="section-anchor relative isolate flex min-h-[100svh] items-center pt-24 pb-16"
    >
      <div className="absolute inset-0 -z-10 grid-bg" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[88vh] mask-fade-radial"
        aria-hidden
      >
        <NeuralBackground className="absolute inset-0" />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/80 backdrop-blur">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative size-1.5 rounded-full bg-emerald-400" />
            </span>
            Engenharia de software com IA aplicada
          </span>

          <h1 className="mt-6 font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="gradient-text">Sistemas inteligentes</span>{" "}
            <span className="relative inline-flex items-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 28, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -28, opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-text"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            <span className="text-foreground">
              para empresas que não querem mais operar no manual.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-base text-foreground/70 md:text-lg">
            A SAGANSKI AI projeta plataformas, CRMs, automações, painéis,
            agentes de IA e fluxos digitais personalizados. Treinamos modelos
            sob medida com seus dados — operando dentro do seu perímetro
            quando exigido.
          </p>

          <div className="mt-7 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Magnetic className="w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="#contato">
                  Quero meu sistema sob medida
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto" strength={0.25}>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href="#ia-propria">
                  <Zap className="size-4" />
                  Ver IA própria
                </a>
              </Button>
            </Magnetic>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {liveStats.map((s) => (
              <LiveStatPill key={s.label} {...s} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="mt-12"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md">
            <ul className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3 md:grid-cols-6">
              {heroBenefits.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-foreground/80"
                >
                  <span className="inline-flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-electric/30 to-brand-violet/30 text-brand-cyan">
                    <Icon className="size-3.5" />
                  </span>
                  <span className="text-[12px] font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <a
          href="#solucoes"
          aria-label="Ver soluções"
          className="absolute inset-x-0 bottom-2 mx-auto hidden w-max items-center gap-1 text-[11px] uppercase tracking-[0.32em] text-foreground/50 md:flex"
        >
          rolar
          <ChevronDown className="size-3 animate-pulse-soft" />
        </a>
      </div>
    </section>
  );
}

function LiveStatPill({ label, value, tone }: LiveStat) {
  const colorMap: Record<LiveStat["tone"], { dot: string; ring: string; text: string }> = {
    cyan: {
      dot: "bg-brand-cyan",
      ring: "border-brand-cyan/30",
      text: "text-brand-cyan",
    },
    violet: {
      dot: "bg-brand-violet",
      ring: "border-brand-violet/30",
      text: "text-brand-violet",
    },
    emerald: {
      dot: "bg-emerald-400",
      ring: "border-emerald-400/30",
      text: "text-emerald-300",
    },
  };
  const c = colorMap[tone];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border ${c.ring} bg-white/[0.03] px-3 py-1 backdrop-blur`}
    >
      <span className={`size-1.5 rounded-full ${c.dot} animate-pulse-soft`} />
      <span className={`font-mono text-[11px] font-semibold ${c.text}`}>{value}</span>
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/55">
        {label}
      </span>
    </span>
  );
}
