"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function LoadingScreen({ isLoaded }: { isLoaded: boolean }) {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    // Simulation simulation logic
    useEffect(() => {
        if (isLoaded) {
            setProgress(100);
            return;
        }

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    // Stall at 90% until loaded
                    return 90;
                }
                return prev + Math.random() * 15 * (1 - prev / 100);
            });
        }, 100);

        return () => clearInterval(timer);
    }, [isLoaded]);

    // Handle fade out sequence
    useEffect(() => {
        if (progress >= 100) {
            // Immediate fade out start
            setFadeOut(true);

            // Unmount after transition completes
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 500); // Matches transition duration
            return () => clearTimeout(timer);
        }
    }, [progress]);

    if (!shouldRender) return null;

    // Circle properties
    const radius = 75;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex items-center justify-center bg-[#131936] transition-opacity duration-500 ease-in-out",
                fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
        >
            <div className="relative flex items-center justify-center size-52">
                {/* Logo in the center */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Image
                        src="/logo-i.png"
                        alt="Loading..."
                        width={160}
                        height={53}
                        className="w-28 h-auto object-contain animate-pulse"
                        priority
                    />
                </div>

                {/* Circular Progress SVG */}
                <svg
                    className={cn(
                        "absolute inset-0 size-full -rotate-90 pointer-events-none transition-transform duration-500",
                        fadeOut ? "scale-110 opacity-0" : "scale-100 opacity-100"
                    )}
                    viewBox="0 0 200 200"
                >
                    {/* Background circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-white/10"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-primary transition-all duration-300 ease-out"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
}
