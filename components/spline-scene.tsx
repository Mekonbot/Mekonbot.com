"use client";

import { Suspense, lazy } from "react";

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

export function SplineScene({ url, className = "" }: SplineSceneProps) {
    return (
        <div className={`relative ${className}`}>
            <Suspense fallback={<SplineLoader />}>
                <Spline scene={url} />
            </Suspense>
        </div>
    );
}
