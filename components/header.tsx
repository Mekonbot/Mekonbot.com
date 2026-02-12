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
      className="fixed z-50 top-0 left-0 w-full"
      style={{
        paddingTop: `${Math.round(32 - p * 16)}px`,
        paddingBottom: `${Math.round(p * 14)}px`,
        background: `rgba(0, 0, 0, ${bgOpacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        borderBottom: `1px solid rgba(66, 66, 66, ${borderOpacity})`,
        willChange: "backdrop-filter",
      }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-primary/80"
        style={{
          width: `${pageProgress * 100}%`,
          transition: "width 100ms linear",
        }}
      />
      <header className="flex items-center justify-between container">
        <Link
          href="/"
          className="transition-all duration-300 origin-left"
          style={{
            transform: `scale(${1 - p * 0.1})`,
            transition: "transform 100ms ease-out",
          }}
        >
          <Image
            src="/logo-i.png"
            alt="MekonBot"
            width={240}
            height={80}
            className="h-16 w-auto"
            priority
          />
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          {navItems.map((item) => (
            <Link
              className={cn(
                "uppercase inline-block font-mono text-sm transition-all duration-300 ease-out relative",
                activeSection === item.href.slice(1)
                  ? "text-primary"
                  : "text-foreground/50 hover:text-foreground/80",
              )}
              href={item.href}
              key={item.name}
            >
              {item.name}
              {/* Active indicator dot */}
              <span
                className={cn(
                  "absolute -bottom-2 left-1/2 -translate-x-1/2 size-1 rounded-full bg-primary transition-all duration-300",
                  activeSection === item.href.slice(1)
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0",
                )}
              />
            </Link>
          ))}
        </nav>
        <Button
          asChild
          size="sm"
          className="max-lg:hidden"
        >
          <Link href="#data-room">Access Data Room</Link>
        </Button>
        <MobileMenu />
      </header>
    </div>
  );
};
