"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Command, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#inicio", id: "inicio", label: "Início" },
  { href: "#solucoes", id: "solucoes", label: "Soluções" },
  { href: "#setores", id: "setores", label: "Setores" },
  { href: "#ia-propria", id: "ia-propria", label: "IA Própria" },
  { href: "#capacidades", id: "capacidades", label: "Stack" },
  { href: "#ferramentas", id: "ferramentas", label: "Ferramentas" },
  { href: "#consultor", id: "consultor", label: "IA Consultora" },
  { href: "#contato", id: "contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(navItems.map((n) => n.id));

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 18);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border px-4 transition-all duration-300",
            scrolled
              ? "h-14 border-white/10 bg-[#040711]/80 backdrop-blur-xl shadow-[0_8px_30px_-15px_rgba(0,0,0,0.6)]"
              : "h-16 border-white/5 bg-white/[0.02] backdrop-blur-md"
          )}
        >
          <a href="#inicio" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-electric via-brand-cyan to-brand-violet shadow-[0_4px_20px_-5px_rgba(34,211,238,0.6)]">
              <Sparkles className="size-3.5 text-white" />
              <span className="absolute inset-0 rounded-lg ring-1 ring-white/20" />
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm font-semibold tracking-[0.18em] text-foreground">
                SAGANSKI
              </span>
              <span className="text-[10px] font-medium tracking-[0.32em] text-brand-cyan/80">
                AI
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/65 hover:text-foreground"
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-brand-cyan/30 bg-brand-cyan/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("saganski:open-palette"));
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-foreground/70 transition-colors hover:border-white/20 hover:text-foreground"
              aria-label="Abrir paleta de comandos"
            >
              <Command className="size-3" />
              <span className="font-mono">⌘ K</span>
            </button>
            <Magnetic strength={0.25}>
              <Button asChild size="sm">
                <a href="#contato">Diagnosticar minha operação</a>
              </Button>
            </Magnetic>
          </div>

          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/80 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {open ? (
          <div className="mt-2 rounded-2xl border border-white/10 bg-[#040711]/95 backdrop-blur-xl p-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "border border-brand-cyan/30 bg-brand-cyan/10 text-foreground"
                        : "text-foreground/80 hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
            <div className="mt-3 px-1">
              <Button asChild size="sm" className="w-full">
                <a href="#contato" onClick={() => setOpen(false)}>
                  Diagnosticar minha operação
                </a>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </motion.header>
  );
}
