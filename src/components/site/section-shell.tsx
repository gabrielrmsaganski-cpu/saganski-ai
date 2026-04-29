"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  align?: "center" | "left";
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  className,
  children,
  align = "center",
}: Props) {
  return (
    <section
      id={id}
      className={cn("section-anchor relative py-20 md:py-28", className)}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            "mx-auto flex max-w-3xl flex-col gap-4",
            align === "center" ? "text-center items-center" : "text-left items-start"
          )}
        >
          {eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-brand-cyan/90 backdrop-blur">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="font-display text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-balance text-base text-foreground/70 md:text-lg">
              {description}
            </p>
          ) : null}
        </motion.div>

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
