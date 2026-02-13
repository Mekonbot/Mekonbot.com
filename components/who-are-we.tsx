"use client";

import React from "react";
import { RevealSection } from "@/components/ui/reveal-section";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

function StoryCard({ title, children, index }: { title: React.ReactNode; children: React.ReactNode; index: number }) {
    return (
        <div
            className="bg-foreground/5 border border-white/10 p-8 rounded-2xl flex flex-col gap-4 hover:border-primary/30 transition-colors duration-500 group"
            style={{
                opacity: 0,
                animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.15}s forwards`
            }}
        >
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-mono text-sm mb-2 group-hover:bg-primary/20 transition-colors duration-500">
                0{index + 1}
            </div>
            <h3 className="font-sentient text-xl lg:text-2xl text-foreground">
                {title}
            </h3>
            <div className="text-base text-muted-foreground leading-relaxed">
                {children}
            </div>
        </div>
    );
}

export function WhoAreWe() {
    const { ref, inView } = useScrollReveal({ threshold: 0.1 });

    return (
        <RevealSection className="relative py-24 lg:py-36">
            <div className="container" ref={ref}>
                <div className="text-center mb-16 lg:mb-20">
                    <span className="inline-block font-mono text-sm uppercase tracking-widest text-primary mb-4">
                        Our Story
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sentient text-balance mx-auto max-w-4xl">
                        Guardians of the <i className="font-light">Machine Age.</i>
                    </h2>
                </div>

                <div
                    className={cn(
                        "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8",
                        inView ? "opacity-100" : "opacity-0"
                    )}
                >
                    <StoryCard title={<span>ACT I — <i className="font-light">A Structural Shift.</i></span>} index={0}>
                        <div className="space-y-6">
                            <p className="font-medium text-foreground text-lg">Humanoid robotics is entering its software era.</p>
                            <p className="text-muted-foreground/90">Capabilities are no longer hardware-defined. They are <span className="text-foreground">programmable skills</span>, deployed instantly across fleets.</p>
                            <div className="space-y-2">
                                <p className="text-sm uppercase tracking-wider text-muted-foreground/60">The New Battlefield</p>
                                <p className="font-medium text-foreground">Not mechanical engineering.<br />But control, certification, and trust at scale.</p>
                            </div>
                        </div>
                    </StoryCard>

                    <StoryCard title={<span>ACT II — <i className="font-light">The Missing Layer.</i></span>} index={1}>
                        <div className="space-y-5">
                            <p className="text-muted-foreground/90">Robotic skills are currently deployed without an independent authority. We lack:</p>
                            <div className="pl-4 border-l-2 border-red-500/20 py-1">
                                <ul className="space-y-2.5 list-none text-sm font-medium text-muted-foreground/80">
                                    <li className="flex gap-2"><span className="text-red-400">×</span> No standard for "trusted skills"</li>
                                    <li className="flex gap-2"><span className="text-red-400">×</span> No unified enforcement model</li>
                                    <li className="flex gap-2"><span className="text-red-400">×</span> No cross-platform auditability</li>
                                    <li className="flex gap-2"><span className="text-red-400">×</span> No governance/execution separation</li>
                                </ul>
                            </div>
                            <div className="pt-2">
                                <p className="text-lg font-sentient text-foreground">The industry is scaling.<br />The <span className="text-red-400">trust layer</span> is not.</p>
                            </div>
                        </div>
                    </StoryCard>

                    <StoryCard title={<span>ACT III — <i className="font-light">MekonBot.</i></span>} index={2}>
                        <div className="space-y-5">
                            <p className="font-medium text-foreground text-lg">The certification infrastructure for the machine age.</p>

                            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                <p className="text-sm italic text-primary/90 text-center">
                                    "We don't build robots.<br />We define their rules of operation."
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-wider text-muted-foreground/60">Platform Capabilities</p>
                                <ul className="grid grid-cols-1 gap-2 text-sm font-medium text-foreground/90">
                                    <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary/60" /> Cryptographic Identity</li>
                                    <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary/60" /> Policy-Based Execution</li>
                                    <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary/60" /> Immutable Audit Trails</li>
                                </ul>
                            </div>

                            <div className="pt-3 border-t border-border/40">
                                <p className="text-xs font-mono text-primary text-center">Product → Standard → Global Initiative</p>
                            </div>
                        </div>
                    </StoryCard>
                </div>
            </div>
        </RevealSection>
    );
}
