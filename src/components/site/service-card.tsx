"use client";

import * as React from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
  tags?: string[];
  index?: number;
};

export function ServiceCard({ title, description, icon: Icon, tags, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: (index % 8) * 0.04 }}
      className="group relative"
    >
      <Card
        className={cn(
          "relative h-full overflow-hidden p-5 transition-all duration-300",
          "hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity",
          "before:bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,0%),rgba(34,211,238,0.18),transparent_70%)]",
          "hover:before:opacity-100"
        )}
        onMouseMove={(e) => {
          const target = e.currentTarget as HTMLDivElement;
          const rect = target.getBoundingClientRect();
          target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
          target.style.setProperty("--my", `${e.clientY - rect.top}px`);
        }}
      >
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-electric/15 via-brand-cyan/10 to-brand-violet/15 text-brand-cyan shadow-[0_0_0_1px_rgba(34,211,238,0.18)_inset]">
            <Icon className="size-4" />
          </div>
          <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">
            {description}
          </p>
          {tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/70"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}
