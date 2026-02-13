"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ClippedCard } from "@/components/ui/clipped-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

/* ── Animated counter ───────────────────────────────────── */

function useCountUp(end: number, duration = 2000, trigger = false) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    }
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, trigger]);

  return value;
}

/* ── Icons ──────────────────────────────────────────────── */

function TargetIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>; }
function EuroIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12" /><path d="M4 14h9" /><path d="M19.17 5A8 8 0 0 0 7 10.3V14c0 3.5 2.5 5.7 5.17 5A8 8 0 0 0 19.17 5Z" /></svg>; }
function TrendingUpIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>; }

/* ── Data ────────────────────────────────────────────────── */

interface MetricData { icon: React.ReactNode; value: number; prefix: string; suffix: string; label: string; description: string; tag: string; }

const metrics: MetricData[] = [
  { icon: <TargetIcon />, value: 10000, prefix: "", suffix: "+", label: "Projected certified skills (mid-term)", description: "As humanoid platforms proliferate, skill demand grows exponentially. Each robot deployment requires dozens of independently certified skills across manipulation, navigation, and safety domains.", tag: "Volume" },
  { icon: <EuroIcon />, value: 30, prefix: "\u20AC", suffix: "M+", label: "Cumulative certification revenue potential", description: "Compounding per-skill fees at scale generate significant recurring revenue. As the install base grows and re-certification cycles compound, revenue accelerates non-linearly.", tag: "Revenue" },
  { icon: <TrendingUpIcon />, value: 15, prefix: "", suffix: "\u00D7", label: "Typical infrastructure SaaS valuation multiple", description: "Mission-critical infrastructure SaaS with high retention and regulatory lock-in commands premium multiples. Analogous to PCI-DSS, identity management, and compliance platforms.", tag: "Multiple" },
];

/* ── Metric card ────────────────────────────────────────── */

function MetricCard({ metric, inView }: { metric: MetricData; inView: boolean }) {
  const animated = useCountUp(metric.value, 2200, inView);
  const formatted = metric.value >= 1000 ? animated.toLocaleString("en-US") : String(animated);

  return (
    <ClippedCard className="h-full">
      <div className="p-8 lg:p-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-center size-12 border border-border/60 rounded-sm text-primary transition-colors duration-300 group-hover/card:border-primary/40 group-hover/card:bg-primary/[0.05]">
            {metric.icon}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/25 border border-border/40 px-2.5 py-1 rounded-sm">{metric.tag}</span>
        </div>
        <div className="mb-2">
          <span className="font-sentient text-5xl lg:text-6xl text-primary tracking-tight transition-colors duration-300 group-hover/card:text-primary/90">
            {metric.prefix}{formatted}{metric.suffix}
          </span>
        </div>
        <p className="font-mono text-sm text-foreground/60 mb-6 leading-relaxed">{metric.label}</p>
        <div className="h-px bg-border/20 mb-6" />
        <p className="font-mono text-xs leading-relaxed text-foreground/35 mt-auto">{metric.description}</p>
      </div>
    </ClippedCard>
  );
}

/* ── Main export ────────────────────────────────────────── */

export function InfrastructurePlay() {
  const { ref, inView } = useScrollReveal({ threshold: 0.15 });

  return (
    <RevealSection id="investor-thesis" className="relative py-24 lg:py-36">
      <div className="container">
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block font-mono text-sm uppercase tracking-widest text-primary mb-4">Market Opportunity &mdash; Key Numbers</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sentient text-balance max-w-[640px] mx-auto">The Infrastructure <i className="font-light">Play.</i></h2>
          <p className="font-mono text-sm text-foreground/40 mt-6 max-w-[520px] mx-auto text-balance">Category-defining infrastructure earns compounding returns. The numbers reflect a market waiting for its governance standard.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {metrics.map((metric, i) => (
            <div
              key={metric.tag}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`,
              }}
            >
              <MetricCard metric={metric} inView={inView} />
            </div>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center">
          <ClippedCard hoverLift={false} className="inline-flex">
            <div className="flex items-center gap-6 px-6 py-3 lg:px-8 lg:py-4">
              {["Volume-driven", "Non-linear", "Regulatory moat"].map((item, i) => (
                <React.Fragment key={item}>
                  {i > 0 && <span className="h-3 w-px bg-border/30" />}
                  <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/30">{item}</span>
                </React.Fragment>
              ))}
            </div>
          </ClippedCard>
        </div>
      </div>
    </RevealSection>
  );
}
