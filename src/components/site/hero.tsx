"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroBenefits } from "@/lib/data/services";

const NeuralBackground = dynamic(
  () => import("./neural-background").then((m) => m.NeuralBackground),
  { ssr: false, loading: () => null }
);

export function Hero() {
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
            <Sparkles className="size-3 text-brand-cyan" />
            Engenharia de software com IA aplicada
          </span>

          <h1 className="mt-6 font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="gradient-text">Sistemas inteligentes sob medida</span>{" "}
            <span className="text-foreground">
              para empresas que não querem mais operar no manual.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-base text-foreground/70 md:text-lg">
            A SAGANSKI AI projeta plataformas, CRMs, automações, painéis, agentes de IA
            e fluxos digitais personalizados para transformar processos lentos em
            operações rápidas, conectadas e inteligentes.
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#contato">
                Quero meu sistema sob medida
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="#solucoes">Ver possibilidades</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="mt-14"
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
