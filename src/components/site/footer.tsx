"use client";

import { Sparkles } from "lucide-react";

const navColumns = [
  {
    title: "Produto",
    links: [
      { label: "Soluções", href: "#solucoes" },
      { label: "Setores", href: "#setores" },
      { label: "Ferramentas", href: "#ferramentas" },
      { label: "Processo", href: "#processo" },
    ],
  },
  {
    title: "Inteligência",
    links: [
      { label: "Arquitetura", href: "#arquitetura" },
      { label: "Antes e depois", href: "#antes-depois" },
      { label: "Para quem é", href: "#para-quem" },
      { label: "IA Consultora", href: "#consultor" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Contato", href: "#contato" },
      { label: "Diagnóstico", href: "#contato" },
      { label: "Briefing", href: "#ferramentas" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-12 border-t border-white/5 pt-16 pb-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 mask-fade-bottom"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(59,130,246,0.18), transparent 60%)",
        }}
      />
      <div className="container">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-electric via-brand-cyan to-brand-violet shadow-[0_4px_20px_-5px_rgba(34,211,238,0.6)]">
                <Sparkles className="size-4 text-white" />
                <span className="absolute inset-0 rounded-lg ring-1 ring-white/20" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-base font-semibold tracking-[0.18em]">
                  SAGANSKI
                </span>
                <span className="text-[11px] font-medium tracking-[0.32em] text-brand-cyan/80">
                  AI
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/70">
              Sistemas inteligentes sob medida para empresas que querem operar com
              velocidade, precisão e automação.
            </p>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-foreground/50">
              As soluções são projetadas após diagnóstico técnico e operacional.
              Integrações, prazos e escopo dependem do ambiente, dados e permissões
              disponíveis.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {navColumns.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-brand-cyan/80">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-[11px] text-foreground/50 md:flex-row md:items-center">
          <p>© {year} SAGANSKI AI. Todos os direitos reservados.</p>
          <p className="font-mono uppercase tracking-[0.24em]">
            Engineered for clarity • Built with care
          </p>
        </div>
      </div>
    </footer>
  );
}
