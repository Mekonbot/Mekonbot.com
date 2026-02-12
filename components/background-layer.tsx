"use client";

import { GL } from "@/components/gl";
import { SplineScene } from "@/components/spline-scene";
import { useState } from "react";

const SPLINE_SCENE_URL =
    "https://prod.spline.design/nkEUK7XZrV2vgMPq/scene.splinecode";

export function BackgroundLayer() {
    const [hovering, setHovering] = useState(false);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Particles Layer */}
            <div className="absolute inset-0 z-0">
                <GL hovering={hovering} />
            </div>

            {/* Robot Layer */}
            <div className="absolute inset-0 z-10">
                <SplineScene
                    url={SPLINE_SCENE_URL}
                    className="w-full h-full"
                />
                {/* Gradient Overlay for text readability across sections */}
                {/* Increased bottom opacity for text readability (white text on bottom) */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
        </div>
    );
}
