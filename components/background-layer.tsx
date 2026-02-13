"use client";

import { GL } from "@/components/gl";
import { SplineScene } from "@/components/spline-scene";
import { useState } from "react";

const SPLINE_SCENE_URL =
    "https://prod.spline.design/nkEUK7XZrV2vgMPq/scene.splinecode";

export function BackgroundLayer({ onLoad }: { onLoad?: () => void }) {
    const [hovering, setHovering] = useState(false);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#131936]">
            {/* Particles Layer */}
            <div className="absolute inset-0 z-0">
                <GL hovering={hovering} />
            </div>

            {/* Robot Layer */}
            {/* Added 'flex justify-end' to push the content to the right */}
            <div className="absolute inset-0 z-10 flex justify-end">
                <div className="w-full md:w-1/2 h-full">
                    <SplineScene
                        url={SPLINE_SCENE_URL}
                        className="w-full h-full"
                        onLoad={onLoad}
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
        </div>
    );
}