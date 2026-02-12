"use client";

import React, { useRef, useCallback } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";
import { useParallax } from "@/components/hooks/use-parallax";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  parallaxFactor?: number;
}

export function RevealSection({
  children,
  className = "",
  id,
  delay = 0,
  parallaxFactor = 0.025,
}: RevealSectionProps) {
  const { ref: revealRef, inView } = useScrollReveal({
    threshold: 0.05,
    rootMargin: "0px 0px -60px 0px",
  });
  const { ref: parallaxRef, offset } = useParallax(parallaxFactor);
  const mergedRef = useRef<HTMLDivElement | null>(null);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      mergedRef.current = node;
      (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (parallaxRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [revealRef, parallaxRef],
  );

  return (
    <section
      id={id}
      ref={setRefs}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? `translateY(${offset}px)`
          : `translateY(${40 + offset}px)`,
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </section>
  );
}
