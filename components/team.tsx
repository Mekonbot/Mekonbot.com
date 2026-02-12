"use client";

import React from "react";
import { RevealSection } from "@/components/ui/reveal-section";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

function TeamMember({ name, role }: { name: string; role: string }) {
    return (
        <div className="flex flex-col items-center gap-4 group">
            <div className="size-24 lg:size-32 rounded-full bg-foreground/[0.03] border border-foreground/10 flex items-center justify-center transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/[0.04]">
                <div className="size-12 lg:size-16 rounded-full bg-foreground/10 group-hover:bg-primary/20 transition-colors duration-300" />
            </div>
            <div className="text-center">
                <h3 className="font-sentient text-lg lg:text-xl text-foreground group-hover:text-primary transition-colors duration-300">{name}</h3>
                <p className="font-mono text-xs text-foreground/40 uppercase tracking-wider mt-1.5">{role}</p>
            </div>
        </div>
    );
}

export function Team() {
    const { ref, inView } = useScrollReveal({ threshold: 0.1 });

    return (
        <RevealSection className="relative py-24 lg:py-36 border-t border-border/40">
            <div className="container">
                <div className="text-center mb-16 lg:mb-20">
                    <span className="inline-block font-mono text-sm uppercase tracking-widest text-primary mb-4">
                        Leadership
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sentient text-balance max-w-[600px] mx-auto">
                        Board <i className="font-light">&amp; Advisors.</i>
                    </h2>
                </div>

                <div
                    ref={ref}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(24px)",
                        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <TeamMember name="Board Member" role="Executive" />
                    <TeamMember name="Board Member" role="Director" />
                    <TeamMember name="Advisor" role="Strategic" />
                    <TeamMember name="Advisor" role="Technical" />
                </div>
            </div>
        </RevealSection>
    );
}
