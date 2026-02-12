"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { RevealSection } from "@/components/ui/reveal-section";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

/* ── Layer block ────────────────────────────────────────── */

interface LayerProps {
  label: string;
  sublabel: string;
  variant: "top" | "middle" | "bottom";
}

function LayerBlock({ label, sublabel, variant }: LayerProps) {
  const variantStyles = {
    top: "border-foreground/20 bg-foreground/[0.04]",
    middle: "border-primary bg-primary/[0.06] [box-shadow:inset_0_0_40px_0px_rgba(255,199,0,0.05)]",
    bottom: "border-foreground/15 bg-foreground/[0.03]",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-between border px-6 py-5 lg:px-8 lg:py-6 rounded-sm transition-all duration-500",
        "hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(255,199,0,0.02)]",
        variantStyles[variant]
      )}
    >
      <div>
        <p className={cn("font-mono text-sm uppercase tracking-wide", variant === "middle" ? "text-primary" : "text-foreground/50")}>
          {label}
        </p>
        <p className={cn("font-mono text-xs mt-1", variant === "middle" ? "text-primary/60" : "text-foreground/30")}>
          {sublabel}
        </p>
      </div>
      {variant === "middle" && (
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
            <span className="relative inline-flex size-2 rounded-full bg-primary shadow-glow shadow-primary/50" />
          </span>
          <span className="font-mono text-xs text-primary/70 uppercase tracking-wider">Active</span>
        </div>
      )}
    </div>
  );
}

function ConnectorLine({ highlight = false }: { highlight?: boolean }) {
  return (
    <div className="flex items-center justify-center h-6">
      <div className={cn("w-px h-full transition-colors duration-500", highlight ? "bg-primary/40" : "bg-border/50")} />
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */

export function DefiningCategory() {
  const { ref: leftRef, inView: leftInView } = useScrollReveal({ threshold: 0.15 });
  const { ref: rightRef, inView: rightInView } = useScrollReveal({ threshold: 0.15 });

  return (
    <RevealSection className="relative py-24 lg:py-36">
      <div className="container">
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block font-mono text-sm uppercase tracking-widest text-primary mb-4">
            Defining the Category
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sentient text-balance max-w-[680px] mx-auto leading-tight">
            The <i className="font-light">PCI Standard</i> for Robotics.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <div
            ref={leftRef}
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="space-y-6">
              <p className="font-mono text-sm leading-relaxed text-foreground/50">
                Identity management defined cloud computing. Security standards defined payments. Governance will define robotics.
              </p>
              <p className="font-mono text-sm leading-relaxed text-foreground/50">
                As humanoid platforms open their ecosystems to third-party skills and applications, the industry faces a critical inflection point{"\u2014"}who certifies the software that controls physical machines?
              </p>
              <p className="font-mono text-sm leading-relaxed text-foreground/50">
                MekonBot is building the infrastructure layer for certification, control, and audit of robotic skills across hardware platforms. An independent authority that sits between the application layer and the machine{"\u2014"}verifying, enforcing, and logging every action before it executes.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-border/40" />
              <span className="font-mono text-xs text-foreground/30 uppercase tracking-widest">Platform-agnostic</span>
              <div className="h-px flex-1 bg-border/40" />
            </div>
          </div>

          {/* Right column - Layered diagram */}
          <div
            ref={rightRef}
            className="relative"
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <div className="relative flex flex-col gap-0">
              <LayerBlock label="Application Layer" sublabel="Robot Skills & Third-Party Apps" variant="top" />
              <ConnectorLine />
              <LayerBlock label="MekonBot Layer" sublabel="Policy Engine & Enforcement" variant="middle" />
              <ConnectorLine highlight />
              <LayerBlock label="Hardware Layer" sublabel="Robot OS & Physical Systems" variant="bottom" />
            </div>

            {/* Side annotations (hidden on mobile to prevent overflow) */}
            <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 flex-col items-center gap-1">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
              <span className="font-mono text-[10px] text-primary/50 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">Certification</span>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            </div>
            <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-1">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
              <span className="font-mono text-[10px] text-foreground/25 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">Audit Trail</span>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
