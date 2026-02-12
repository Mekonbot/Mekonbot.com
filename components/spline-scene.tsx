"use client";

import { Suspense, lazy, useState, useEffect, useRef } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
    url: string;
    className?: string;
}

function SplineLoader() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <span className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
                    Loading 3D Scene
                </span>
            </div>
        </div>
    );
}

function MobileFallback() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Ambient glow spots */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-primary/[0.06] blur-[80px] animate-slow-pulse" />
        </div>
    );
}

export function SplineScene({ url, className = "" }: SplineSceneProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Defer Spline loading — wait until page is idle to avoid blocking initial render
    useEffect(() => {
        if (isMobile) return;

        if ("requestIdleCallback" in window) {
            const id = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => setShouldLoad(true));
            return () => (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
        } else {
            // Fallback: load after 1.5s
            timerRef.current = setTimeout(() => setShouldLoad(true), 1500);
            return () => clearTimeout(timerRef.current);
        }
    }, [isMobile]);

    return (
        <div className={`relative ${className}`}>
            {isMobile ? (
                <MobileFallback />
            ) : shouldLoad ? (
                <Suspense fallback={<SplineLoader />}>
                    <Spline scene={url} />
                </Suspense>
            ) : (
                <SplineLoader />
            )}
        </div>
    );
}
