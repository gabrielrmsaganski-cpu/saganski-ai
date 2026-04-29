"use client";

import { motion } from "motion/react";
import {
  Activity,
  Database,
  Eye,
  Layers,
  PuzzleIcon,
  ScrollText,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SectionShell } from "./section-shell";

type Audience = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const audiences: Audience[] = [
  {
    title: "Empresas que cresceram em planilhas",
    description:
      "Operação atingiu volume e complexidade que planilhas e e-mail não sustentam mais.",
    icon: ScrollText,
  },
  {
    title: "Quem precisa automatizar repetitivo",
    description:
      "Tarefas que se repetem todo dia, todo mês, todo fechamento — e drenam tempo da equipe.",
    icon: Workflow,
  },
  {
    title: "Times que precisam de controle",
    description:
      "Gestores que querem ver tarefas, prazos, responsáveis e status sem cobrar por mensagem.",
    icon: Eye,
  },
  {
    title: "Operações que pedem dashboards",
    description:
      "Indicadores precisam estar visíveis, comparáveis com meta e atualizados em tempo real.",
    icon: Activity,
  },
  {
    title: "Negócios prontos para IA aplicada",
    description:
      "Querem IA que reduza erro, acelere análise e automatize, não apenas chat genérico.",
    icon: Sparkles,
  },
  {
    title: "Quem precisa de adaptação real",
    description:
      "Sistemas de prateleira não cabem no fluxo. É mais rápido moldar a tecnologia ao processo.",
    icon: PuzzleIcon,
  },
  {
    title: "Áreas que querem economizar tempo",
    description:
      "Cada hora liberada vira capacidade de venda, atendimento, análise ou estratégia.",
    icon: Layers,
  },
  {
    title: "Diretorias com dados desencontrados",
    description:
      "Relatórios diferentes para a mesma pergunta — e decisões adiadas por causa disso.",
    icon: Database,
  },
];

export function ForWhom() {
  return (
    <SectionShell
      id="para-quem"
      eyebrow="Para quem é"
      title={
        <>
          Empresas que decidiram parar de adaptar a operação ao sistema —{" "}
          <span className="gradient-text">e começaram a fazer o contrário</span>.
        </>
      }
      description="Atendemos times que precisam de tecnologia que se molde ao processo real, com IA aplicada de forma prática e sem promessas vazias."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan">
                <Icon className="size-4" />
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold tracking-tight">
                {a.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/70">
                {a.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
