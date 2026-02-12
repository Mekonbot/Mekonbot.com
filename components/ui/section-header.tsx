import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  heading: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  label,
  heading,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-16 lg:mb-20",
        align === "center" && "text-center",
        className,
      )}
    >
      <span className="inline-block font-mono text-sm uppercase tracking-widest text-primary mb-4">
        {label}
      </span>
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-sentient text-balance leading-tight",
          align === "center" && "mx-auto max-w-[680px]",
          align === "left" && "max-w-[600px]",
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "font-mono text-sm text-foreground/40 mt-6 text-balance",
            align === "center" && "max-w-[520px] mx-auto",
            align === "left" && "max-w-[520px]",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
