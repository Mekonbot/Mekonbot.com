"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ClippedCard } from "@/components/ui/clipped-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

/* ── Timeline step ──────────────────────────────────────── */

interface StepProps {
  icon: React.ReactNode;
  label: string;
  detail: string;
  variant: "danger" | "safe";
  isLast?: boolean;
}

function TimelineStep({ icon, label, detail, variant, isLast }: StepProps) {
  const [expanded, setExpanded] = useState(false);
  const isDanger = variant === "danger";

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn(
          "flex items-center justify-center size-9 rounded-sm border transition-all duration-300",
          isDanger ? "border-red-500/30 text-red-400 bg-red-500/[0.06]" : "border-primary/30 text-primary bg-primary/[0.06]",
          expanded && isDanger && "border-red-500/60 bg-red-500/[0.12] scale-110",
          expanded && !isDanger && "border-primary/60 bg-primary/[0.12] scale-110"
        )}>
          {icon}
        </div>
        {!isLast && <div className={cn("w-px flex-1 min-h-6", isDanger ? "bg-red-500/15" : "bg-primary/15")} />}
      </div>
      <div
        className="flex-1 pb-6 cursor-pointer group"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onClick={() => setExpanded((p) => !p)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpanded((p) => !p); }}
      >
        <p className={cn("font-mono text-sm text-foreground/70 transition-colors duration-200", expanded && "text-foreground")}>{label}</p>
        <div className={cn("overflow-hidden transition-all duration-500 ease-out", expanded ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0")}>
          <p className={cn("font-mono text-xs leading-relaxed", isDanger ? "text-red-400/60" : "text-primary/60")}>{detail}</p>
        </div>
      </div>
    </div>
  );
}

function ResultBadge({ label, variant }: { label: string; variant: "danger" | "safe" }) {
  const isDanger = variant === "danger";
  return (
    <div className={cn("inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-3 py-2 rounded-sm border", isDanger ? "border-red-500/30 text-red-400 bg-red-500/[0.06]" : "border-primary/30 text-primary bg-primary/[0.06]")}>
      <span className={cn("inline-block size-1.5 rounded-full", isDanger ? "bg-red-500 shadow-[0_0_6px_1px] shadow-red-500/50 animate-slow-pulse" : "bg-primary shadow-glow shadow-primary/50 animate-slow-pulse")} />
      {label}
    </div>
  );
}

/* ── Icons ──────────────────────────────────────────────── */
function UploadIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>; }
function ZapIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>; }
function AlertIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>; }
function UserXIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="17" y1="8" x2="23" y2="14" /><line x1="23" y1="8" x2="17" y2="14" /></svg>; }
function FileXIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><line x1="9.5" y1="12.5" x2="14.5" y2="17.5" /><line x1="14.5" y1="12.5" x2="9.5" y2="17.5" /></svg>; }
function ShieldCheckIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>; }
function GaugeIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" /><path d="m14.3 8.7-3.6 3.6" /><path d="M12 6v1" /><path d="m17 7-0.7.7" /><path d="M18 12h-1" /><path d="M6 12h1" /><path d="m7 7 .7.7" /></svg>; }
function ShieldBanIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="M9.5 9.5 14.5 14.5" /></svg>; }
function ClipboardIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></svg>; }

/* ── Step data ──────────────────────────────────────────── */

const withoutSteps: Omit<StepProps, "variant">[] = [
  { icon: <UploadIcon />, label: "Third-party \"Pallet Stacking\" skill loaded", detail: "A vendor-supplied skill is deployed directly to the robot with no independent review. The manifest is self-certified by the vendor." },
  { icon: <ZapIcon />, label: "Skill exceeds force limits during execution", detail: "The stacking routine applies 340N of force\u2014well above the 250N safety threshold\u2014with no runtime check or policy boundary in place." },
  { icon: <AlertIcon />, label: "Physical damage to goods and equipment", detail: "Crushed pallets, damaged inventory, and a conveyor belt jam halt the production line for 6+ hours. Estimated loss: $180K+." },
  { icon: <UserXIcon />, label: "Manufacturer held liable", detail: "Without independent verification, the robot manufacturer bears full legal responsibility. Insurance disputes follow." },
  { icon: <FileXIcon />, label: "No independent logs exist", detail: "Forensic investigation stalls\u2014there is no third-party audit trail, no policy record, and no enforcement history to review." },
];

const withSteps: Omit<StepProps, "variant">[] = [
  { icon: <ShieldCheckIcon />, label: "Pre-flight manifest verification", detail: "Before deployment, MekonBot validates the skill manifest against facility policies, hardware specs, and safety thresholds. Only certified skills proceed." },
  { icon: <GaugeIcon />, label: "Runtime enforcement of force policies", detail: "MekonBot's policy engine monitors force output in real-time against the 250N threshold. Every action is bounded by certified limits." },
  { icon: <ShieldBanIcon />, label: "Action blocked when limits exceeded", detail: "At 251N the skill is suspended mid-execution. The robot enters a safe-stop state. No physical damage occurs. Operations resume with a compliant fallback." },
  { icon: <ClipboardIcon />, label: "Audit trail legally documents the incident", detail: "A cryptographically signed, immutable log captures every decision: the policy that triggered, the force reading, the block action, and the timestamp\u2014admissible in any dispute." },
];

/* ── Main component ─────────────────────────────────────── */

export function WarehouseScenario() {
  const { ref, inView } = useScrollReveal({ threshold: 0.08 });

  return (
    <RevealSection id="the-moat" className="relative py-24 lg:py-36">
      <div className="container">
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block font-mono text-sm uppercase tracking-widest text-primary mb-4">Use Case &mdash; Proof by Example</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sentient text-balance max-w-[680px] mx-auto">
            Concrete Scenario: <i className="font-light">Warehouse Logistics</i>
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {[{ steps: withoutSteps, variant: "danger" as const, title: "Without MekonBot", badge: "Unmitigated risk" },
            { steps: withSteps, variant: "safe" as const, title: "With MekonBot", badge: "Governed & documented" }].map((side, sideIdx) => (
            <div
              key={side.title}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${sideIdx * 200}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${sideIdx * 200}ms`,
              }}
            >
              <ClippedCard accent={side.variant === "danger" ? "danger" : "primary"}>
                <div className={cn("p-5 sm:p-6 lg:p-10", side.variant === "danger" ? "border-red-500/20" : "border-primary/20")}>
                  <div className="flex items-center gap-3 mb-8">
                    <span className={cn("inline-block size-2 rounded-full animate-slow-pulse", side.variant === "danger" ? "bg-red-500 shadow-[0_0_8px_2px] shadow-red-500/40" : "bg-primary shadow-glow shadow-primary/50")} />
                    <span className={cn("font-mono text-xs uppercase tracking-widest", side.variant === "danger" ? "text-red-400" : "text-primary")}>{side.title}</span>
                  </div>
                  <div className="flex flex-col">
                    {side.steps.map((step, i) => (
                      <TimelineStep key={step.label} {...step} variant={side.variant} isLast={i === side.steps.length - 1} />
                    ))}
                  </div>
                  <div className={cn("mt-4 pt-6 border-t", side.variant === "danger" ? "border-red-500/10" : "border-primary/10")}>
                    <ResultBadge label={side.badge} variant={side.variant} />
                  </div>
                </div>
              </ClippedCard>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 flex items-center gap-3 sm:gap-4 justify-center">
          <div className="h-px w-8 sm:w-16 bg-border/40 shrink-0" />
          <span className="font-mono text-[10px] sm:text-xs text-foreground/30 uppercase tracking-widest text-center">Hover or tap each step to expand details</span>
          <div className="h-px w-8 sm:w-16 bg-border/40 shrink-0" />
        </div>
      </div>
    </RevealSection>
  );
}
