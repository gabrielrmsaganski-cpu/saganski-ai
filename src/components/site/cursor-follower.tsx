"use client";

import * as React from "react";

const INTERACTIVE = "a, button, [role='button'], [data-magnetic], textarea, input, select, summary";

export function CursorFollower() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fineMq = window.matchMedia("(pointer: fine)");
    setEnabled(fineMq.matches && !reduceMotion);
    const onChange = () => setEnabled(fineMq.matches && !reduceMotion);
    fineMq.addEventListener?.("change", onChange);
    return () => fineMq.removeEventListener?.("change", onChange);
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let ringX = dotX;
    let ringY = dotY;
    let targetX = dotX;
    let targetY = dotY;
    let raf = 0;
    let hovering = false;
    let pressing = false;

    const tick = () => {
      dotX += (targetX - dotX) * 0.6;
      dotY += (targetY - dotY) * 0.6;
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      const ringScale = pressing ? 0.7 : hovering ? 1.7 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      hovering = !!target?.closest?.(INTERACTIVE);
      ring.dataset.hover = hovering ? "true" : "false";
    };
    const onDown = () => {
      pressing = true;
      ring.dataset.pressing = "true";
    };
    const onUp = () => {
      pressing = false;
      ring.dataset.pressing = "false";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] size-9 rounded-full border border-brand-cyan/55 bg-brand-cyan/[0.04] backdrop-blur-[2px] transition-[border-color,background-color,box-shadow] duration-200 mix-blend-screen data-[hover=true]:border-brand-cyan/85 data-[hover=true]:bg-brand-cyan/10 data-[hover=true]:shadow-[0_0_30px_rgba(34,211,238,0.45)] data-[pressing=true]:bg-brand-cyan/25"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] size-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(34,211,238,0.85)]"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
