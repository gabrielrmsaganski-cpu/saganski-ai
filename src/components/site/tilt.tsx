"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TiltProps = React.HTMLAttributes<HTMLDivElement> & {
  intensity?: number;
  glare?: boolean;
};

export function Tilt({
  intensity = 8,
  glare = true,
  className,
  children,
  ...props
}: TiltProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(0);
  const stateRef = React.useRef({
    rx: 0,
    ry: 0,
    rxT: 0,
    ryT: 0,
    mx: 50,
    my: 50,
  });

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const animate = React.useCallback(() => {
    const el = ref.current;
    const s = stateRef.current;
    if (!el) return;
    s.rx += (s.rxT - s.rx) * 0.18;
    s.ry += (s.ryT - s.ry) * 0.18;
    el.style.setProperty("--tilt-rx", `${s.rx.toFixed(2)}deg`);
    el.style.setProperty("--tilt-ry", `${s.ry.toFixed(2)}deg`);
    el.style.setProperty("--mx", `${s.mx}%`);
    el.style.setProperty("--my", `${s.my}%`);
    if (Math.abs(s.rx - s.rxT) > 0.05 || Math.abs(s.ry - s.ryT) > 0.05) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      rafRef.current = 0;
    }
  }, []);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    stateRef.current.rxT = (0.5 - py) * intensity;
    stateRef.current.ryT = (px - 0.5) * intensity;
    stateRef.current.mx = px * 100;
    stateRef.current.my = py * 100;
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
  }

  function onLeave() {
    stateRef.current.rxT = 0;
    stateRef.current.ryT = 0;
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative will-change-transform [transform:perspective(900px)_rotateX(var(--tilt-rx,0))_rotateY(var(--tilt-ry,0))] transition-transform duration-100",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {children}
      {glare ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 [.group:hover_&]:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.18), transparent 70%)",
          }}
        />
      ) : null}
    </div>
  );
}
