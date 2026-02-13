"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ClippedCard } from "@/components/ui/clipped-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

/* ── Icons ──────────────────────────────────────────────── */

function BookOpenIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></svg>; }
function FlaskIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" /><path d="M8.5 2h7" /><path d="M7 16.5h10" /></svg>; }
function GlobeIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>; }

/* ── Data ────────────────────────────────────────────────── */

interface Phase { id: number; icon: React.ReactNode; label: string; timeframe: string; title: string; milestones: string[]; status: "active" | "upcoming" | "future"; }

const phases: Phase[] = [
  { id: 1, icon: <BookOpenIcon />, label: "Phase 1", timeframe: "Now -- 6 months", title: "Standard definition & certification authority V1", milestones: ["Publish skill manifest specification", "Launch certification authority V1", "Onboard founding hardware partners", "Establish governance advisory board"], status: "active" },
  { id: 2, icon: <FlaskIcon />, label: "Phase 2", timeframe: "6 -- 14 months", title: "Emulation validation layer & first pilot deployments", milestones: ["Deploy emulation sandbox for skill testing", "First pilot with industrial logistics partner", "Runtime policy engine beta release", "Regulatory pre-certification alignment"], status: "upcoming" },
  { id: 3, icon: <GlobeIcon />, label: "Phase 3", timeframe: "14 -- 24 months", title: "Industrial SaaS rollout & global ecosystem integration", milestones: ["Full SaaS platform launch", "Global ecosystem marketplace integration", "Enterprise compliance & audit module", "Multi-region regulatory certification"], status: "future" },
];

/* ── Phase card ─────────────────────────────────────────── */

function PhaseCard({ phase, visible, index }: { phase: Phase; visible: boolean; index: number }) {
  const isActive = phase.status === "active";
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${24 + index * 8}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 180}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 180}ms`,
      }}
    >
      <ClippedCard className={cn("h-full", isActive && "border-primary/40")}>
        <div className="p-6 lg:p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className={cn("flex items-center justify-center size-10 border rounded-sm transition-colors duration-300", isActive ? "border-primary/40 text-primary bg-primary/[0.06]" : "border-border/60 text-foreground/40 group-hover/card:text-foreground/60")}>
              {phase.icon}
            </div>
            {isActive && (
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Active
              </span>
            )}
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-foreground/30 mb-1">{phase.label}</span>
          <span className={cn("font-mono text-xs mb-4", isActive ? "text-primary/70" : "text-foreground/25")}>{phase.timeframe}</span>
          <h3 className="text-lg lg:text-xl font-sentient text-foreground mb-6 leading-snug">{phase.title}</h3>
          <div className={cn("h-px mb-6", isActive ? "bg-primary/15" : "bg-border/20")} />
          <ul className="space-y-3 mt-auto">
            {phase.milestones.map((m) => (
              <li key={m} className="flex items-start gap-3 font-mono text-xs leading-relaxed text-foreground/40 group-hover/card:text-foreground/50 transition-colors duration-300">
                <span className={cn("mt-1.5 shrink-0 size-1.5 rounded-full", isActive ? "bg-primary/60" : "bg-foreground/20")} />
                {m}
              </li>
            ))}
          </ul>
        </div>
      </ClippedCard>
    </div>
  );
}

/* ── Timeline connector ─────────────────────────────────── */

function TimelineConnector({ visible }: { visible: boolean }) {
  return (
    <div className="hidden md:flex items-center justify-between relative mx-6 lg:mx-8 mb-8">
      <div className="absolute inset-x-0 top-1/2 h-px bg-border/30">
        <div className="h-full bg-primary/40 transition-all duration-1000 ease-out" style={{ width: visible ? "33%" : "0%" }} />
      </div>
      {phases.map((phase, i) => {
        const isActive = phase.status === "active";
        return (
          <div key={phase.id} className="relative z-10 flex flex-col items-center" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.6s ease-out ${i * 200}ms` }}>
            <div className={cn("size-4 rounded-full border-2 transition-all duration-300", isActive ? "border-primary bg-primary/30 shadow-[0_0_12px_rgba(59,130,246,0.3)]" : "border-border/50 bg-background")} />
            <span className={cn("mt-3 font-mono text-[10px] uppercase tracking-widest", isActive ? "text-primary/70" : "text-foreground/20")}>{phase.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main export ────────────────────────────────────────── */

export function Roadmap() {
  const { ref, inView } = useScrollReveal({ threshold: 0.12 });

  return (
    <RevealSection id="roadmap" className="relative py-24 lg:py-36">
      <div className="container" ref={ref}>
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block font-mono text-sm uppercase tracking-widest text-primary mb-4">Roadmap &mdash; The Plan</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sentient text-balance max-w-[600px] mx-auto">Building the <i className="font-light">standard.</i></h2>
          <p className="font-mono text-sm text-foreground/40 mt-6 max-w-[480px] mx-auto text-balance">Three phases from standard definition to global infrastructure. Each milestone compounds the moat.</p>
        </div>

        <TimelineConnector visible={inView} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} visible={inView} index={i} />
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center">
          <ClippedCard hoverLift={false} className="inline-flex">
            <div className="flex items-center gap-6 px-6 py-3 lg:px-8 lg:py-4">
              {["Define", "Validate", "Scale"].map((item, i) => (
                <React.Fragment key={item}>
                  {i > 0 && <span className="h-3 w-px bg-border/30" />}
                  <div className="flex items-center gap-2">
                    <span className={cn("size-1.5 rounded-full", i === 0 ? "bg-primary" : "bg-foreground/20")} />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/30">{item}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </ClippedCard>
        </div>
      </div>
    </RevealSection>
  );
}
