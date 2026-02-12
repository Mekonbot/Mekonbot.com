"use client";

import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

export function SectionDivider() {
  const { ref, inView } = useScrollReveal({ threshold: 0.5 });

  return (
    <div ref={ref} className="flex items-center justify-center py-8 lg:py-12 container">
      <div
        className="h-px flex-1 bg-border/30 origin-right transition-transform duration-1000 ease-out"
        style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
      />
      <div
        className="mx-4 h-1.5 w-1.5 rotate-45 bg-primary/60 transition-all duration-700 ease-out"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "rotate(45deg) scale(1)" : "rotate(45deg) scale(0)",
          transitionDelay: inView ? "0.4s" : "0s",
        }}
      />
      <div
        className="h-px flex-1 bg-border/30 origin-left transition-transform duration-1000 ease-out"
        style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
      />
    </div>
  );
}
