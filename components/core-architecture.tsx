"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { px } from "./utils";
import { RevealSection } from "@/components/ui/reveal-section";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

/* ── Clipped panel (terminal-specific, kept local) ──────── */

function ClippedPanel({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  const r = 12;
  return (
    <div
      className={cn(
        "relative border border-white/10 bg-[#131936]/90 backdrop-blur-sm text-zinc-100",
        className,
      )}
      style={{
        clipPath: `polygon(${px(r)} 0%, calc(100% - ${px(r)}) 0%, 100% ${px(r)}, 100% calc(100% - ${px(r)}), calc(100% - ${px(r)}) 100%, ${px(r)} 100%, 0% calc(100% - ${px(r)}), 0% ${px(r)})`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Step icons ─────────────────────────────────────────── */

function ManifestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 13H8" /><path d="M16 17H8" /><path d="M16 13h-2" />
    </svg>
  );
}
function CertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function PolicyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m14.3 8.7-3.6 3.6" /><path d="M12 6v1" /><path d="m17 7-.7.7" />
      <path d="M18 12h-1" /><path d="M6 12h1" /><path d="m7 7 .7.7" />
    </svg>
  );
}
function AuditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
    </svg>
  );
}

/* ── Data ────────────────────────────────────────────────── */

const steps = [
  {
    num: "01",
    title: "Skill Manifest",
    description:
      "Developers define capabilities, force limits, operational boundaries, and hardware requirements in a structured manifest before deployment.",
    icon: <ManifestIcon />,
  },
  {
    num: "02",
    title: "Certification Authority",
    description:
      "MekonBot cryptographically signs the skill after validating the manifest against facility policies, safety standards, and hardware specs.",
    icon: <CertIcon />,
  },
  {
    num: "03",
    title: "Policy Engine",
    description:
      'At runtime, every action is checked against certified policies. The engine evaluates force, speed, proximity, and operational context\u2014allowing or denying in real time.',
    icon: <PolicyIcon />,
  },
  {
    num: "04",
    title: "Immutable Audit",
    description:
      "Every enforcement decision, policy evaluation, and action outcome is recorded to a cryptographically signed, append-only log\u2014providing full liability protection.",
    icon: <AuditIcon />,
  },
];

/* ── Per-step JSON payloads ─────────────────────────────── */

interface JsonLine {
  indent: number;
  key: string | null;
  value: string;
  comma: boolean;
  highlight?: "danger" | "success" | "info" | null;
}

const jsonPayloads: { filename: string; status: string; statusColor: string; dotColor: string; lines: JsonLine[] }[] = [
  {
    filename: "skill_manifest.json",
    status: "Manifest Registered",
    statusColor: "text-primary/70",
    dotColor: "bg-primary shadow-primary/40",
    lines: [
      { indent: 0, key: null, value: "{", comma: false },
      { indent: 1, key: '"skill_manifest"', value: "{", comma: false },
      { indent: 2, key: '"skill_id"', value: '"pallet_loader_v4"', comma: true },
      { indent: 2, key: '"vendor"', value: '"AutoStack Robotics"', comma: true },
      { indent: 2, key: '"version"', value: '"4.2.1"', comma: true },
      { indent: 2, key: '"max_force_newtons"', value: "150", comma: true },
      { indent: 2, key: '"max_velocity_ms"', value: "1.2", comma: true },
      { indent: 2, key: '"operational_zone"', value: '"warehouse_zone_A"', comma: true },
      { indent: 2, key: '"hardware_reqs"', value: '["6-DOF arm", "force sensor"]', comma: true, highlight: "info" },
      { indent: 2, key: '"status"', value: '"PENDING_CERTIFICATION"', comma: false, highlight: "info" },
      { indent: 1, key: null, value: "}", comma: false },
      { indent: 0, key: null, value: "}", comma: false },
    ],
  },
  {
    filename: "certification_result.json",
    status: "Signature Valid",
    statusColor: "text-emerald-400/70",
    dotColor: "bg-emerald-500 shadow-emerald-500/40",
    lines: [
      { indent: 0, key: null, value: "{", comma: false },
      { indent: 1, key: '"certification"', value: "{", comma: false },
      { indent: 2, key: '"skill_id"', value: '"pallet_loader_v4"', comma: true },
      { indent: 2, key: '"authority"', value: '"MekonBot CA v2"', comma: true },
      { indent: 2, key: '"signature"', value: '"SHA256:9f3a...c8d1"', comma: true, highlight: "success" },
      { indent: 2, key: '"policy_version"', value: '"EU_MACH_DIR_2026.1"', comma: true },
      { indent: 2, key: '"validated_limits"', value: "true", comma: true, highlight: "success" },
      { indent: 2, key: '"hardware_match"', value: "true", comma: true, highlight: "success" },
      { indent: 2, key: '"expires"', value: '"2026-08-12T00:00:00Z"', comma: true },
      { indent: 2, key: '"status"', value: '"CERTIFIED"', comma: false, highlight: "success" },
      { indent: 1, key: null, value: "}", comma: false },
      { indent: 0, key: null, value: "}", comma: false },
    ],
  },
  {
    filename: "enforcement_decision.json",
    status: "Enforcement: Action Denied",
    statusColor: "text-red-400/70",
    dotColor: "bg-red-500 shadow-red-500/40",
    lines: [
      { indent: 0, key: null, value: "{", comma: false },
      { indent: 1, key: '"policy_enforcement"', value: "{", comma: false },
      { indent: 2, key: '"skill_id"', value: '"pallet_loader_v4"', comma: true },
      { indent: 2, key: '"certification"', value: '"VALID_SIG_SHA256"', comma: true },
      { indent: 2, key: '"requested_force"', value: "340", comma: true, highlight: "danger" },
      { indent: 2, key: '"max_force_newtons"', value: "150", comma: true },
      { indent: 2, key: '"threshold_exceeded"', value: "true", comma: true, highlight: "danger" },
      { indent: 2, key: '"status"', value: '"DENIED - EXCEEDS LIMIT"', comma: true, highlight: "danger" },
      { indent: 2, key: '"action"', value: '"SAFE_STOP_INITIATED"', comma: true, highlight: "danger" },
      { indent: 2, key: '"timestamp"', value: '"2026-02-12T08:41:03Z"', comma: false },
      { indent: 1, key: null, value: "}", comma: false },
      { indent: 0, key: null, value: "}", comma: false },
    ],
  },
  {
    filename: "audit_log_entry.json",
    status: "Log Committed (Immutable)",
    statusColor: "text-[#7dd3fc]/70",
    dotColor: "bg-[#7dd3fc] shadow-[#7dd3fc]/40",
    lines: [
      { indent: 0, key: null, value: "{", comma: false },
      { indent: 1, key: '"audit_entry"', value: "{", comma: false },
      { indent: 2, key: '"log_id"', value: '"0xAE3F...91B2"', comma: true, highlight: "info" },
      { indent: 2, key: '"event"', value: '"POLICY_DENIAL"', comma: true },
      { indent: 2, key: '"skill_id"', value: '"pallet_loader_v4"', comma: true },
      { indent: 2, key: '"facility"', value: '"warehouse_zone_A"', comma: true },
      { indent: 2, key: '"chain_hash"', value: '"SHA256:b4c9...f7e3"', comma: true, highlight: "info" },
      { indent: 2, key: '"tamper_proof"', value: "true", comma: true, highlight: "info" },
      { indent: 2, key: '"legal_admissible"', value: "true", comma: true, highlight: "info" },
      { indent: 2, key: '"timestamp"', value: '"2026-02-12T08:41:03.127Z"', comma: false },
      { indent: 1, key: null, value: "}", comma: false },
      { indent: 0, key: null, value: "}", comma: false },
    ],
  },
];

/* ── Helpers ─────────────────────────────────────────────── */

function isStringValue(val: string) {
  return val.startsWith('"') && val.endsWith('"');
}
function isBoolOrNumber(val: string) {
  return val === "true" || val === "false" || /^[\d.]+$/.test(val);
}
function isArrayValue(val: string) {
  return val.startsWith("[");
}

const highlightMap = {
  danger: { bg: "bg-red-500/[0.06]", text: "text-red-400" },
  success: { bg: "bg-emerald-500/[0.06]", text: "text-emerald-400" },
  info: { bg: "bg-[#7dd3fc]/[0.06]", text: "text-[#7dd3fc]" },
};

/* ── Step card ──────────────────────────────────────────── */

function StepCard({
  num,
  title,
  description,
  icon,
  isActive,
  onHover,
  index,
  inView,
}: {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onHover: () => void;
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className={cn(
        "flex gap-4 sm:gap-5 p-4 sm:p-5 lg:p-6 rounded-sm border cursor-pointer transition-all duration-400",
        isActive
          ? "border-primary/30 bg-primary/[0.04] [box-shadow:inset_0_0_30px_0px_rgba(59,130,246,0.03)]"
          : "border-transparent bg-transparent hover:border-border/40",
      )}
      onMouseEnter={onHover}
      onClick={onHover}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onHover(); }}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, border-color 0.3s, background-color 0.3s, box-shadow 0.3s`,
      }}
    >
      <div className="flex flex-col items-center gap-2 pt-0.5">
        <div
          className={cn(
            "flex items-center justify-center size-10 rounded-sm border transition-colors duration-300",
            isActive
              ? "border-primary/40 text-primary bg-primary/[0.08]"
              : "border-border/40 text-foreground/30 bg-foreground/[0.02]",
          )}
        >
          {icon}
        </div>
        <span
          className={cn(
            "font-mono text-[10px] tracking-widest transition-colors duration-300",
            isActive ? "text-primary/60" : "text-foreground/20",
          )}
        >
          {num}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "font-sentient text-lg transition-colors duration-300",
            isActive ? "text-foreground" : "text-foreground/80",
          )}
        >
          {title}
        </h3>
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            isActive ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0",
          )}
        >
          <p className="font-mono text-xs leading-relaxed text-foreground/75">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Animated JSON line ─────────────────────────────────── */

function JsonLineRow({
  line,
  lineNumber,
  enterDelay,
}: { line: JsonLine; lineNumber: number; enterDelay: number }) {
  const hl = line.highlight ? highlightMap[line.highlight] : null;

  return (
    <div
      className={cn("transition-all duration-300", hl?.bg && `${hl.bg} -mx-4 px-4 sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6`)}
      style={{
        animation: `fadeInUp 0.35s cubic-bezier(0.16,1,0.3,1) ${enterDelay}ms both`,
      }}
    >
      <span className="text-foreground/15 select-none mr-2 sm:mr-4 inline-block w-4 sm:w-5 text-right text-[10px] sm:text-[11px]">
        {lineNumber}
      </span>
      <span className="text-foreground/20">{"  ".repeat(line.indent)}</span>
      {line.key && (
        <>
          <span className="text-foreground/50">{line.key}</span>
          <span className="text-foreground/20">{": "}</span>
        </>
      )}
      <span
        className={cn(
          hl?.text,
          !hl &&
          isStringValue(line.value) &&
          "text-primary/80",
          !hl &&
          isBoolOrNumber(line.value) &&
          "text-[#7dd3fc]",
          !hl &&
          isArrayValue(line.value) &&
          "text-primary/60",
          !hl &&
          !isStringValue(line.value) &&
          !isBoolOrNumber(line.value) &&
          !isArrayValue(line.value) &&
          "text-foreground/30",
        )}
      >
        {line.value}
      </span>
      {line.comma && <span className="text-foreground/20">,</span>}
    </div>
  );
}

/* ── Main export ────────────────────────────────────────── */

export function CoreArchitecture() {
  const [activeStep, setActiveStep] = useState(0);
  const [displayedStep, setDisplayedStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { ref: stepsRef, inView: stepsInView } = useScrollReveal({ threshold: 0.1 });
  const { ref: termRef, inView: termInView } = useScrollReveal({ threshold: 0.15 });

  const handleStepHover = useCallback(
    (index: number) => {
      if (index === activeStep) return;
      setActiveStep(index);

      // Cross-fade: fade out, swap content, fade in
      setTransitioning(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setDisplayedStep(index);
        setTransitioning(false);
      }, 180);
    },
    [activeStep],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const payload = jsonPayloads[displayedStep];

  return (
    <RevealSection id="technology" className="relative py-24 lg:py-36">
      <div className="container">
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block font-mono text-sm uppercase tracking-widest text-primary mb-4">
            Technology &mdash; How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sentient text-balance max-w-[640px] mx-auto">
            The Core <i className="font-light">Architecture.</i>
          </h2>
          <p className="font-mono text-sm text-foreground/75 mt-6 max-w-[520px] mx-auto text-balance">
            Four sequential layers of verification, certification, enforcement, and audit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Steps */}
          <div ref={stepsRef} className="flex flex-col gap-1">
            {steps.map((step, i) => (
              <React.Fragment key={step.num}>
                <StepCard
                  {...step}
                  isActive={activeStep === i}
                  onHover={() => handleStepHover(i)}
                  index={i}
                  inView={stepsInView}
                />
                {i < steps.length - 1 && (
                  <div className="flex justify-start pl-10 lg:pl-[46px]">
                    <div
                      className={cn(
                        "w-px h-4 transition-colors duration-300",
                        activeStep === i || activeStep === i + 1
                          ? "bg-primary/25"
                          : "bg-border/25",
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Right: Terminal */}
          <div
            ref={termRef}
            className="lg:sticky lg:top-32"
            style={{
              opacity: termInView ? 1 : 0,
              transform: termInView
                ? "translateY(0) scale(1)"
                : "translateY(16px) scale(0.98)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <ClippedPanel className="overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 border-b border-border/40 bg-[#0f142b]">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-foreground/15" />
                  <span className="size-2.5 rounded-full bg-foreground/15" />
                  <span className="size-2.5 rounded-full bg-foreground/15" />
                </div>
                <span
                  className="font-mono text-[11px] text-foreground/25 uppercase tracking-wider transition-opacity duration-200"
                  style={{ opacity: transitioning ? 0 : 1 }}
                >
                  {payload.filename}
                </span>
                <div className="w-[42px]" />
              </div>

              {/* JSON content */}
              <div
                className="p-4 sm:p-5 lg:p-6 overflow-x-auto min-h-[260px] sm:min-h-[340px]"
                style={{
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning
                    ? "translateY(4px)"
                    : "translateY(0)",
                  transition:
                    "opacity 0.18s ease-out, transform 0.18s ease-out",
                }}
              >
                <pre className="font-mono text-[11px] sm:text-[13px] leading-5 sm:leading-6">
                  {payload.lines.map((line, i) => (
                    <JsonLineRow
                      key={`${displayedStep}-${line.key ?? i}`}
                      line={line}
                      lineNumber={i + 1}
                      enterDelay={i * 25}
                    />
                  ))}
                </pre>
              </div>

              {/* Status bar */}
              <div
                className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 border-t border-border/30 bg-[#0b0e21] transition-opacity duration-200"
                style={{ opacity: transitioning ? 0 : 1 }}
              >
                <span
                  className={cn(
                    "inline-block size-1.5 rounded-full shadow-[0_0_6px_1px] animate-slow-pulse",
                    payload.dotColor,
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-wider",
                    payload.statusColor,
                  )}
                >
                  {payload.status}
                </span>
              </div>
            </ClippedPanel>

            {/* Step indicator dots below terminal */}
            <div className="mt-5 flex items-center gap-3 justify-center">
              {jsonPayloads.map((p, i) => (
                <button
                  key={p.filename}
                  type="button"
                  onClick={() => handleStepHover(i)}
                  className={cn(
                    "size-1.5 rounded-full transition-all duration-300",
                    activeStep === i
                      ? "bg-primary scale-125"
                      : "bg-foreground/15 hover:bg-foreground/30",
                  )}
                  aria-label={`Show ${steps[i].title} JSON`}
                />
              ))}
            </div>

            <div className="mt-3 flex items-center gap-3 justify-center">
              <div className="h-px w-8 bg-border/30" />
              <span className="font-mono text-[10px] text-foreground/20 uppercase tracking-widest">
                Hover a step to explore
              </span>
              <div className="h-px w-8 bg-border/30" />
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
