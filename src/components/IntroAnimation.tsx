"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface IntroAnimationProps {
    onAnimationComplete: () => void;
}

export default function IntroAnimation({ onAnimationComplete }: IntroAnimationProps) {
    const [phase, setPhase] = useState<"loading" | "splitting" | "done">("loading");

    useEffect(() => {
        // Wait 5 seconds then start split animation
        const timer = setTimeout(() => {
            setPhase("splitting");

            // After split animation completes (1s), call complete
            setTimeout(() => {
                setPhase("done");
                onAnimationComplete();
            }, 1000);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onAnimationComplete]);

    if (phase === "done") return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Orange Half - Top Left Triangle */}
            <div
                className={`absolute inset-0 bg-primary origin-top-left transition-transform duration-1000 ease-in-out ${phase === "splitting" ? "-translate-x-full -translate-y-full" : ""
                    }`}
                style={{
                    clipPath: "polygon(0 0, 100% 0, 0 100%)",
                }}
            />

            {/* Black Half - Bottom Right Triangle */}
            <div
                className={`absolute inset-0 bg-black origin-bottom-right transition-transform duration-1000 ease-in-out ${phase === "splitting" ? "translate-x-full translate-y-full" : ""
                    }`}
                style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
            />

            {/* Center Basketball Logo */}
            <div
                className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-500 ${phase === "splitting" ? "opacity-0 scale-150" : "opacity-100 scale-100"
                    }`}
            >
                <div className="relative w-64 h-64 md:w-80 md:h-80 animate-pulse">
                    <Image
                        src="/Gemini_Generated_Image_9mufdw9mufdw9muf.png"
                        alt="Strive Basketball"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>
            </div>

            {/* Diagonal Line Glow Effect */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${phase === "splitting" ? "opacity-0" : "opacity-100"
                    }`}
                style={{
                    background: "linear-gradient(135deg, transparent 49.5%, rgba(255,255,255,0.3) 49.5%, rgba(255,255,255,0.3) 50.5%, transparent 50.5%)",
                }}
            />
        </div>
    );
}
