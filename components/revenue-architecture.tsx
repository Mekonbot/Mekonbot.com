"use client";

import React from "react";
import { ClippedCard } from "@/components/ui/clipped-card";
import { RevealSection } from "@/components/ui/reveal-section";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

/* ── Icons ──────────────────────────────────────────────── */

function CertFeeIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><circle cx="10" cy="16" r="2" /><path d="m16 13-3.5 3.5" /></svg>;
}
function SaasIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12h.01" /><path d="M17 12h.01" /><path d="M7 12h.01" /><path d="M2 10h20" /></svg>;
}
function ComplianceIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>;
}

/* ── Data ────────────────────────────────────────────────── */

interface RevenueStream {
  icon: React.ReactNode;
  label: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  features: string[];
}

const streams: RevenueStream[] = [
  {
    icon: <CertFeeIcon />, label: "Recurring", title: "Certification Fees", metric: "Per Skill", metricLabel: "Per certified version",
    description: "Revenue generated each time a skill version is certified against a facility's policy set. Pricing is tiered by skill complexity and associated physical risk profile.",
    features: ["Tiered pricing by risk class", "Version-locked certification", "Re-certification on policy change", "Multi-facility licensing"],
  },
  {
    icon: <SaasIcon />, label: "Subscription", title: "Infrastructure SaaS", metric: "Monthly", metricLabel: "Per deployment",
    description: "Subscription-based access to the runtime enforcement engine, continuous policy updates, and managed infrastructure for real-time skill governance at scale.",
    features: ["Runtime enforcement engine", "Continuous policy updates", "Managed infrastructure", "99.99% uptime SLA"],
  },
  {
    icon: <ComplianceIcon />, label: "Enterprise", title: "Enterprise Compliance", metric: "Annual", metricLabel: "Per organization",
    description: "Premium audit logs, legal-grade reporting, and compliance dashboards tailored for industrial insurance requirements and evolving regulatory frameworks.",
    features: ["Legal-grade audit reports", "Insurance compliance packs", "Regulatory dashboard", "Incident reconstruction"],
  },
];

/* ── Main export ────────────────────────────────────────── */

export function RevenueArchitecture() {
  const { ref, inView } = useScrollReveal({ threshold: 0.1 });

  return (
    <RevealSection className="relative py-24 lg:py-36">
      <div className="container">
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block font-mono text-sm uppercase tracking-widest text-primary mb-4">Business Model &mdash; Revenue</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sentient text-balance max-w-[600px] mx-auto">Revenue <i className="font-light">Architecture.</i></h2>
          <p className="font-mono text-sm text-foreground/40 mt-6 max-w-[520px] mx-auto text-balance">Three compounding revenue streams that scale with every robot deployed, every skill certified, and every policy enforced.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {streams.map((stream, i) => (
            <div
              key={stream.title}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`,
              }}
            >
              <ClippedCard className="h-full">
                <div className="p-8 lg:p-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center justify-center size-12 border border-border/60 rounded-sm text-primary transition-colors duration-300 group-hover/card:border-primary/40 group-hover/card:bg-primary/[0.05]">
                      {stream.icon}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/25 border border-border/40 px-2.5 py-1 rounded-sm">{stream.label}</span>
                  </div>
                  <div className="mb-6">
                    <span className="font-sentient text-2xl lg:text-3xl text-primary/90 block transition-colors duration-300 group-hover/card:text-primary">{stream.metric}</span>
                    <span className="font-mono text-[11px] text-foreground/30 uppercase tracking-wider mt-1 block">{stream.metricLabel}</span>
                  </div>
                  <h3 className="font-sentient text-xl lg:text-2xl text-foreground mb-3">{stream.title}</h3>
                  <p className="font-mono text-xs leading-relaxed text-foreground/45 mb-8">{stream.description}</p>
                  <div className="h-px bg-border/30 mb-6 mt-auto" />
                  <ul className="flex flex-col gap-3">
                    {stream.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-primary/50 shrink-0"><path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="font-mono text-[11px] text-foreground/40 leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ClippedCard>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-border/20" />
          <span className="font-mono text-[10px] text-foreground/20 uppercase tracking-widest">Recurring &middot; Compounding &middot; Platform-locked</span>
          <div className="h-px w-12 bg-border/20" />
        </div>
      </div>
    </RevealSection>
  );
}
