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
                    <StoryCard title={<span>The <i className="font-light">New Labor.</i></span>} index={0}>
                        We are witnessing the dawn of a new species of labor. Humanoid robots are leaving the labs and entering our warehouses, factories, and homes at an unprecedented scale.
                    </StoryCard>

                    <StoryCard title={<span>The <i className="font-light">Safety Gap.</i></span>} index={1}>
                        As machines work alongside humans, a critical question emerges: <span className="text-foreground">Who ensures they are safe, compliant, and controlled?</span> The gap between potential and trust is widening.
                    </StoryCard>

                    <StoryCard title={<span>The <i className="font-light">Governance.</i></span>} index={2}>
                        MekonBot bridges this gap. We build the <strong className="font-normal text-foreground">infrastructure of trust</strong>—the certification, policy, and audit layers that make the machine age possible.
                    </StoryCard>
                </div>
            </div>
        </RevealSection>
    );
}
