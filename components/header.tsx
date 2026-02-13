"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { MobileMenu } from "./mobile-menu";
import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Vision", href: "#vision" },
  { name: "Technology", href: "#technology" },
  { name: "The Moat", href: "#the-moat" },
  { name: "Roadmap", href: "#roadmap" },
];

export const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const ticking = useRef(false);

  const update = useCallback(() => {
    const y = window.scrollY;
    setScrollProgress(Math.min(y / 150, 1));

    // Page-level scroll progress for progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setPageProgress(docHeight > 0 ? Math.min(y / docHeight, 1) : 0);

    // Determine active section based on scroll position
    const sections = navItems.map((item) => item.href.slice(1));
    let current = "";
    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          current = sectionId;
        }
      }
    }
    setActiveSection(current);
    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(update);
    }
  }, [update]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, update]);

  const p = scrollProgress;
  const bgOpacity = 0.6 + p * 0.28;
  const blur = 12 + p * 12;
  const borderOpacity = 0.08 + p * 0.07;

  return (
    <div
      className={cn(
        "fixed z-50 top-0 left-0 w-full transition-[padding,background-color,border-color,backdrop-filter] duration-300 border-b",
        scrollProgress > 0.05
          ? "py-4 bg-background/80 backdrop-blur-md border-border/50"
          : "py-8 bg-transparent border-transparent"
      )}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[1px] bg-primary/50 origin-left"
        style={{
          transform: `scaleX(${pageProgress})`,
          transition: "transform 100ms linear",
        }}
      />
      <header className="flex items-center justify-between container">
        <Link
          href="/"
          className="transition-all duration-300 origin-left"
          style={{
            transform: `scale(${scrollProgress > 0.05 ? 0.9 : 1})`,
          }}
        >
          <Image
            src="/logo-i.png"
            alt="MekonBot"
            width={480}
            height={160}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-8">
          {navItems.map((item) => (
            <Link
              className={cn(
                "uppercase inline-block font-mono text-[12.3px] font-semibold tracking-wider transition-all duration-300 ease-out relative hover:text-primary",
                activeSection === item.href.slice(1)
                  ? "text-primary"
                  : "text-foreground/90"
              )}
              href={item.href}
              key={item.name}
            >
              <span className="relative z-10">
                {activeSection === item.href.slice(1) && (
                  <span className="mr-1 text-primary animate-pulse">{'>'}</span>
                )}
                {item.name}
              </span>

              {/* Active indicator dot - Removed in favor of chevron or color change for cleaner look */}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button
            asChild
            size="sm"
            className="max-lg:hidden text-[12.3px] h-9 px-4 hidden sm:inline-flex"
            variant="outline"
          >
            <Link href="#contact">Contact Sales</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="max-lg:hidden text-[12.3px] h-9 px-4"
          >
            <Link href="#data-room">Access Data Room</Link>
          </Button>
        </div>
        <MobileMenu />
      </header>
    </div>
  );
};
