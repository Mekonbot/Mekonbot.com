"use client";

import React from "react";
import { ClippedCard } from "@/components/ui/clipped-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";
import { useTilt } from "@/components/hooks/use-tilt";

/* ── Icons ──────────────────────────────────────────────── */

function CpuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
    </svg>
  );
}

function ShieldAlertIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="M12 8v4" /><path d="M12 16h.01" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  );
}

/* ── Data ────────────────────────────────────────────────── */

const cards = [
  {
    icon: <CpuIcon />,
    title: "Hardware is Ready",
    description:
      "Robots are entering commercial pilots across logistics, manufacturing, and defense. Global humanoid production is scaling rapidly, with units doubling year-over-year.",
  },
  {
    icon: <ShieldAlertIcon />,
    title: "Software is Risky",
    description:
      "Vendor skills are self-certified with no independent audit trail. When a robot executes a task, no third party has verified the code is safe, compliant, or reliable.",
  },
  {
    icon: <AlertTriangleIcon />,
    title: "The Gap",
    description:
      "As ecosystems open and third-party skills proliferate, unverified code executing physical actions creates systemic risk. The industry lacks a trust layer.",
  },
];

/* ── Component ──────────────────────────────────────────── */

function TiltCard({ children }: { children: React.ReactNode }) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt({
    maxTilt: 6,
    perspective: 800,
    scale: 1.02,
  });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {children}
    </div>
  );
}

export function TheShift() {
  const { ref, inView } = useScrollReveal({ threshold: 0.1 });

  return (
    <RevealSection id="vision" className="relative py-24 lg:py-36">
      <div className="container">
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block font-mono text-sm uppercase tracking-widest text-primary mb-4">
            The Shift
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sentient text-balance max-w-[600px] mx-auto">
            The context behind <i className="font-light">MekonBot.</i>
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {cards.map((card, i) => (
            <div
              key={card.title}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms`,
              }}
            >
              <TiltCard>
                <ClippedCard className="h-full">
                  <div className="p-8 lg:p-10">
                    <div className="mb-6 flex items-center justify-center w-12 h-12 border border-border/60 rounded-sm text-primary transition-colors duration-300 group-hover/card:border-primary/40 group-hover/card:bg-primary/[0.05]">
                      {card.icon}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-sentient text-foreground mb-3">
                      {card.title}
                    </h3>
                    <p className="font-mono text-sm leading-relaxed text-foreground/50">
                      {card.description}
                    </p>
                  </div>
                </ClippedCard>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

