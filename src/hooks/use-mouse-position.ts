"use client";

import * as React from "react";

export type MouseState = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  active: boolean;
};

export function useMousePosition() {
  const [state, setState] = React.useState<MouseState>({
    x: 0,
    y: 0,
    nx: 0,
    ny: 0,
    active: false,
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    function flush() {
      if (!pending) return;
      const { x, y } = pending;
      pending = null;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      setState({
        x,
        y,
        nx: (x / w) * 2 - 1,
        ny: -((y / h) * 2 - 1),
        active: true,
      });
      raf = 0;
    }

    function onMove(e: MouseEvent) {
      pending = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(flush);
    }
    function onLeave() {
      setState((s) => ({ ...s, active: false }));
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return state;
}
