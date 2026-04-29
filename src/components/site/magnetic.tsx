"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  strength?: number;
  range?: number;
};

export function Magnetic({
  strength = 0.35,
  range = 24,
  className,
  children,
  ...props
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    const clampedX = Math.max(-range, Math.min(range, dx));
    const clampedY = Math.max(-range, Math.min(range, dy));
    el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-magnetic
      className={cn("inline-flex transition-transform duration-300 ease-out", className)}
      {...props}
    >
      {children}
    </div>
  );
}
