"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface MagneticOptions {
    radius?: number;
    strength?: number;
    speed?: number;
}

interface MagneticStyle {
    transform: string;
    transition: string;
}

export function useMagnetic({
    radius = 150,
    strength = 0.3,
    speed = 300,
}: MagneticOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<MagneticStyle>({
        transform: "translate3d(0px, 0px, 0px)",
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    });
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (isTouch) return;
            const el = ref.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < radius) {
                const pull = (1 - distance / radius) * strength;
                setStyle({
                    transform: `translate3d(${distX * pull}px, ${distY * pull}px, 0px)`,
                    transition: `transform 150ms ease-out`,
                });
            }
        },
        [radius, strength, isTouch]
    );

    const handleMouseLeave = useCallback(() => {
        setStyle({
            transform: "translate3d(0px, 0px, 0px)",
            transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
        });
    }, [speed]);

    return { ref, style, handleMouseMove, handleMouseLeave };
}
