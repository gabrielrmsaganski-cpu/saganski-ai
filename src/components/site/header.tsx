"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#setores", label: "Setores" },
  { href: "#ia-propria", label: "IA Própria" },
  { href: "#capacidades", label: "Stack" },
  { href: "#ferramentas", label: "Ferramentas" },
  { href: "#consultor", label: "IA Consultora" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

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

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <Button asChild size="sm">
              <a href="#contato">Diagnosticar minha operação</a>
            </Button>
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
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-white/5 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
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
