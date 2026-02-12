"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileMenuProps {
  className?: string;
}

const menuItems = [
  { name: "Vision", href: "#vision" },
  { name: "Technology", href: "#technology" },
  { name: "The Moat", href: "#the-moat" },
  { name: "Roadmap", href: "#roadmap" },
];

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "group lg:hidden p-2 text-foreground transition-all duration-300 hover:text-primary",
            className,
          )}
          aria-label="Open menu"
        >
          <Menu className="group-[[data-state=open]]:hidden" size={24} />
          <X className="hidden group-[[data-state=open]]:block" size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <div
          data-overlay="true"
          className="fixed z-30 inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
        />

        <Dialog.Content
          onInteractOutside={(e) => {
            if (
              e.target instanceof HTMLElement &&
              e.target.dataset.overlay !== "true"
            ) {
              e.preventDefault();
            }
          }}
          className="fixed top-0 left-0 w-full z-40 py-28 md:py-40"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <nav className="flex flex-col space-y-2 container mx-auto">
            {menuItems.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="text-xl font-mono uppercase text-foreground/60 transition-all ease-out duration-300 hover:text-foreground hover:translate-x-2 py-3 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-primary/40 mr-3 font-mono text-sm">0{i + 1}</span>
                {item.name}
              </Link>
            ))}

            <div className="pt-6 border-t border-border/30 mt-4 animate-fade-in-up" style={{ animationDelay: "320ms" }}>
              <Link
                href="#data-room"
                onClick={handleLinkClick}
                className="inline-flex items-center gap-2 text-xl font-mono uppercase text-primary transition-all ease-out duration-300 hover:text-primary/80 hover:translate-x-2 py-3"
              >
                <span className="inline-block size-2 rounded-full bg-primary animate-slow-pulse" />
                Access Data Room
              </Link>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
