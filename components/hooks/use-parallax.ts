"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useParallax(factor: number = 0.03) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) {
      ticking.current = false;
      return;
    }
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const center = rect.top + rect.height / 2;
    const fromCenter = center - windowH / 2;
    // Clamp the offset to prevent extreme values
    const raw = fromCenter * factor;
    const clamped = Math.max(-50, Math.min(50, raw));
    setOffset(clamped);
    ticking.current = false;
  }, [factor]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [update]);

  return { ref, offset };
}
