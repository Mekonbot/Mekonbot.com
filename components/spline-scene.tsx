"use client";

import { Suspense, lazy, useState, useEffect, useRef } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
    url: string;
    className?: string;
    onLoad?: () => void;
}

function SplineLoader() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
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

export function SplineScene({ url, className = "", onLoad }: SplineSceneProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const check = (e?: Event) => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Defer Spline loading — wait until page is idle to avoid blocking initial render
    useEffect(() => {
        if (isMobile) {
            if (onLoad) onLoad();
            return;
        }

        // Load immediately for the loading screen experience, or keep the small delay?
        // Let's reduce delay substantially since we have a loading screen now.
        setShouldLoad(true);
    }, [isMobile, onLoad]);

    return (
        <div className={`relative ${className}`}>
            {isMobile ? (
                <MobileFallback />
            ) : shouldLoad ? (
                <Suspense fallback={<SplineLoader />}>
                    <Spline scene={url} onLoad={onLoad} />
                </Suspense>
            ) : (
                <SplineLoader />
            )}
        </div>
    );
}
