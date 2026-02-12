"use client";

import { useRef, useState, useCallback } from "react";

interface TiltOptions {
    maxTilt?: number;
    perspective?: number;
    scale?: number;
    speed?: number;
}

interface TiltStyle {
    transform: string;
    transition: string;
}

export function useTilt({
    maxTilt = 6,
    perspective = 800,
    scale = 1.02,
    speed = 400,
}: TiltOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<TiltStyle>({
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const el = ref.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            setStyle({
                transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
                transition: `transform 150ms ease-out`,
            });
        },
        [maxTilt, perspective, scale]
    );

    const handleMouseLeave = useCallback(() => {
        setStyle({
            transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
            transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
        });
    }, [perspective, speed]);

    return { ref, style, handleMouseMove, handleMouseLeave };
}
