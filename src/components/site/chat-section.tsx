"use client";

import { motion } from "motion/react";
import { Brain, Lock, Sparkles, Zap } from "lucide-react";
import { SectionShell } from "./section-shell";
import { AIConsultantChat } from "./ai-consultant-chat";

const highlights = [
  {
    icon: Brain,
    title: "Diagnóstico assistido",
    description:
      "Faz perguntas estruturadas até entender seu processo, sem inventar dados.",
  },
  {
    icon: Zap,
    title: "Sugere módulos certos",
    description:
      "Combina setor, dores e necessidades para indicar a base do sistema sob medida.",
  },
  {
    icon: Sparkles,
    title: "Resumo executivo",
    description:
      "Gera um resumo do projeto pronto para enviar internamente ou para nossa equipe.",
  },
  {
    icon: Lock,
    title: "Sem promessas vazias",
    description:
      "Não fecha preço nem prazo sem diagnóstico real. Honesto sobre o que precisa ser validado.",
  },
];

export function ChatSection() {
  return (
    <SectionShell
      id="consultor"
      eyebrow="IA Consultora"
      title={
        <>
          Converse com a inteligência da SAGANSKI antes mesmo de{" "}
          <span className="gradient-text">marcar uma reunião</span>.
        </>
      }
      description="A IA Consultora ajuda a estruturar o que sua empresa precisa, em linguagem empresarial, em poucos minutos. Funciona com modelo completo quando há chave configurada — e em modo offline consultivo caso contrário."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5 }}
          className="grid gap-3 self-start"
        >
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan">
                <Icon className="size-4" />
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/70">
                {description}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <AIConsultantChat variant="section" />
        </motion.div>
      </div>
    </SectionShell>
  );
}
