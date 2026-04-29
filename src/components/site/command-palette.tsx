"use client";

import * as React from "react";
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Calculator,
  Cpu,
  GanttChartSquare,
  Layers,
  Mail,
  Search,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Cmd = {
  id: string;
  label: string;
  hint: string;
  href: string;
  icon: LucideIcon;
  keywords?: string[];
};

const commands: Cmd[] = [
  {
    id: "diagnostico",
    label: "Solicitar diagnóstico",
    hint: "Formulário de contato premium",
    href: "#contato",
    icon: Mail,
    keywords: ["contato", "lead", "diagnostico", "agendar"],
  },
  {
    id: "ia-propria",
    label: "IA Própria & Machine Learning",
    hint: "Modelos sob medida + pipeline de MLOps",
    href: "#ia-propria",
    icon: BrainCircuit,
    keywords: ["machine learning", "rag", "fine-tuning", "ml"],
  },
  {
    id: "consultor",
    label: "Conversar com a IA Consultora",
    hint: "Chat com modelos do Foundry em streaming",
    href: "#consultor",
    icon: Sparkles,
    keywords: ["chat", "consultor", "foundry"],
  },
  {
    id: "stack",
    label: "Capacidades técnicas",
    hint: "Stack de engenharia, IA e dados",
    href: "#capacidades",
    icon: Cpu,
    keywords: ["stack", "tech", "tooling", "ml"],
  },
  {
    id: "ferramentas",
    label: "Ferramentas interativas",
    hint: "Calculadora, diagnóstico, montador, briefing",
    href: "#ferramentas",
    icon: Calculator,
    keywords: ["tools", "calculadora", "briefing", "montador"],
  },
  {
    id: "solucoes",
    label: "Soluções que criamos",
    hint: "16 categorias de sistema sob medida",
    href: "#solucoes",
    icon: Boxes,
    keywords: ["servicos", "produtos", "modulos"],
  },
  {
    id: "setores",
    label: "Por setor",
    hint: "12 setores com dores e exemplos",
    href: "#setores",
    icon: GanttChartSquare,
    keywords: ["setor", "industria"],
  },
  {
    id: "processo",
    label: "Como trabalhamos",
    hint: "Timeline do diagnóstico à evolução",
    href: "#processo",
    icon: Workflow,
    keywords: ["processo", "metodologia"],
  },
  {
    id: "arquitetura",
    label: "Arquitetura de soluções",
    hint: "Camadas que formam o núcleo",
    href: "#arquitetura",
    icon: Layers,
    keywords: ["arquitetura", "camadas"],
  },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const cmdLike = isMac ? e.metaKey : e.ctrlKey;
      if (cmdLike && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !cmdLike) {
        const tag = (document.activeElement?.tagName || "").toLowerCase();
        if (tag !== "input" && tag !== "textarea") {
          e.preventDefault();
          setOpen(true);
        }
      }
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("saganski:open-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("saganski:open-palette", onOpenEvent);
    };
  }, []);

  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? commands.filter((c) => {
        const haystack = [c.label, c.hint, ...(c.keywords ?? [])]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
    : commands;

  function go(c: Cmd) {
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.querySelector(c.href);
      if (target) {
        (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", c.href);
      } else {
        location.hash = c.href;
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Paleta de comandos</DialogTitle>
        <DialogDescription className="sr-only">
          Navegue rapidamente pelo site com Cmd/Ctrl+K
        </DialogDescription>
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="size-4 text-foreground/50" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar seções, ferramentas, capacidades…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-foreground/55">
            ESC
          </kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-foreground/55">
              Nada encontrado para “{query}”.
            </p>
          ) : (
            <ul className="space-y-1">
              {filtered.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => go(c)}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-all",
                        "hover:border-white/10 hover:bg-white/[0.05]",
                        "focus-visible:outline-none focus-visible:border-brand-cyan/40 focus-visible:bg-brand-cyan/10"
                      )}
                    >
                      <span className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan">
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-foreground">
                          {c.label}
                        </div>
                        <div className="truncate text-[12px] text-foreground/55">
                          {c.hint}
                        </div>
                      </div>
                      <ArrowRight className="size-4 text-foreground/35 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground/85" />
                      {i < 9 ? (
                        <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-foreground/55 sm:inline-block">
                          {i + 1}
                        </kbd>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-2.5 text-[11px] text-foreground/55">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-brand-cyan animate-pulse-soft" />
            SAGANSKI Command Center
          </span>
          <span className="font-mono">
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">⌘</kbd>
            <kbd className="ml-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5">K</kbd>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
