"use client";

import Link from "next/link";
import { SplineScene } from "./spline-scene";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useState } from "react";
import { useParallax } from "./hooks/use-parallax";

const SPLINE_SCENE_URL =
  "https://prod.spline.design/nkEUK7XZrV2vgMPq/scene.splinecode";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  const { ref: parallaxRef, offset: parallaxOffset } = useParallax(0.05);

  return (
    <div className="flex flex-col h-svh justify-between relative snap-start">
      {/* Stars & Shooting Stars Background with parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <StarsBackground
          starDensity={0.00045}
          allStarsTwinkle={true}
          twinkleProbability={0.9}
          minTwinkleSpeed={0.3}
          maxTwinkleSpeed={0.8}
        />
      </div>
      {/* Multiple meteor layers for a denser shower */}
      <ShootingStars
        starColor="#EBB800"
        trailColor="#F5D76E"
        starWidth={20}
        starHeight={2}
        minSpeed={15}
        maxSpeed={40}
        minDelay={1500}
        maxDelay={4000}
      />
      <ShootingStars
        starColor="#F5D76E"
        trailColor="#EBB800"
        starWidth={14}
        starHeight={1}
        minSpeed={20}
        maxSpeed={50}
        minDelay={2500}
        maxDelay={5500}
      />
      <ShootingStars
        starColor="#FFFFFF"
        trailColor="#F5D76E"
        starWidth={10}
        starHeight={1}
        minSpeed={25}
        maxSpeed={45}
        minDelay={3000}
        maxDelay={6000}
      />

      {/* Spline 3D Robot Background */}
      <div id="webgl">
        <SplineScene
          url={SPLINE_SCENE_URL}
          className="w-full h-full"
        />
        {/* Bottom gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      <div className="pb-20 mt-auto text-center relative z-10 px-4">
        {/* H1 */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-sentient text-balance max-w-[720px] mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          The Governance Layer for{" "}
          <i className="font-light">Humanoid Robotics.</i>
        </h1>

        {/* Subtitle */}
        <p
          className="font-mono text-sm sm:text-base text-foreground/50 text-balance mt-8 max-w-[560px] mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.55s" }}
        >
          Independent certification authority and policy enforcement
          infrastructure. We verify skills before they execute.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <Link className="contents" href="#architecture">
            <Button
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="animate-glow-pulse"
            >
              [Explore the Architecture]
            </Button>
          </Link>
          <Link className="contents" href="#investor-thesis">
            <Button
              variant="outline"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Investor Thesis]
            </Button>
          </Link>
        </div>

        {/* Social proof pill */}
        <div className="animate-fade-in" style={{ animationDelay: "1.1s" }}>
          <Pill className="mt-10">
            Standardizing trust for the next generation of industrial automation.
          </Pill>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in z-10"
        style={{ animationDelay: "1.6s" }}
      >
        <span className="font-mono text-[10px] text-foreground/20 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 relative overflow-hidden">
          <div className="absolute inset-x-0 h-full bg-primary/40 animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
