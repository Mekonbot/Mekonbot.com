import React from "react";
import { cn } from "@/lib/utils";
import { px } from "@/components/utils";

const r = 12;

interface ClippedCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: "border" | "primary" | "danger";
  hoverLift?: boolean;
}

const accentMap = {
  border: { base: "bg-border", hover: "group-hover/card:bg-primary/60" },
  primary: { base: "bg-primary/60", hover: "group-hover/card:bg-primary" },
  danger: { base: "bg-red-500/60", hover: "group-hover/card:bg-red-500" },
};

function CornerDeco({ position, accent }: { position: "tl" | "tr" | "bl" | "br"; accent: "border" | "primary" | "danger" }) {
  const { base, hover } = accentMap[accent];
  const isTop = position.startsWith("t");
  const isLeft = position.endsWith("l");

  return (
    <>
      <div
        className={cn(
          "absolute w-px transition-colors duration-500",
          isTop ? "top-0" : "bottom-0",
          isLeft ? "left-0" : "right-0",
          base,
          hover,
        )}
        style={{ height: px(r + 6) }}
      />
      <div
        className={cn(
          "absolute h-px transition-colors duration-500",
          isTop ? "top-0" : "bottom-0",
          isLeft ? "left-0" : "right-0",
          base,
          hover,
        )}
        style={{ width: px(r + 6) }}
      />
    </>
  );
}

export function ClippedCard({
  children,
  className = "",
  accent = "border",
  hoverLift = true,
}: ClippedCardProps) {
  return (
    <div
      className={cn(
        "relative group/card transition-all duration-500 ease-out",
        hoverLift && "hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(59,130,246,0.04)]",
        className,
      )}
      style={{
        clipPath: `polygon(${px(r)} 0%, calc(100% - ${px(r)}) 0%, 100% ${px(r)}, 100% calc(100% - ${px(r)}), calc(100% - ${px(r)}) 100%, ${px(r)} 100%, 0% calc(100% - ${px(r)}), 0% ${px(r)})`,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background border border-border/50 transition-colors duration-500 group-hover/card:border-primary/25" />

      {/* Corners */}
      <CornerDeco position="tl" accent={accent} />
      <CornerDeco position="tr" accent={accent} />
      <CornerDeco position="bl" accent={accent} />
      <CornerDeco position="br" accent={accent} />

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
