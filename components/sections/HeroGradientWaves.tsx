"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface HeroGradientWavesProps {
  isPaused?: boolean;
}

function HeroGradientFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[#090D16] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(30,58,138,0.35)_0%,rgba(10,21,50,0.85)_50%,#090D16_100%)]"
    />
  );
}

function checkWebGL2(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

// Dynamically import GradientWaves so WebGL2 shader compilation is isolated from critical bundle
const GradientWaves = dynamic(() => import("@/components/GradientWaves"), {
  ssr: false,
  loading: () => <HeroGradientFallback />,
});

export function HeroGradientWaves({ isPaused = false }: HeroGradientWavesProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL2, setHasWebGL2] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasWebGL2(checkWebGL2());

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted || !hasWebGL2) {
    return <HeroGradientFallback />;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Static Fallback Base Layer */}
      <HeroGradientFallback />

      {/* Balanced Cinematic Interactive WebGL2 Gradient Waves */}
      <div className="absolute inset-0 w-full h-full">
        <GradientWaves
          // Colors: main #090D16, muted cobalt blue wave, deep navy horizon, subtle cyan crest
          backgroundColor="#090D16"
          horizonColor="#0A1532"
          waveColor="#1E3A8A"
          crestColor="#38BDF8"
          lightMode={false}
          // Movement: moderate amplitude, gentle-to-moderate swell, medium-slow motion
          speed={isMobile ? 0.14 : 0.22}
          amplitude={isMobile ? 1.3 : 1.8}
          waveScale={0.5}
          waveRatio={0.85}
          swell={isMobile ? 16 : 24}
          turbulence={12}
          tilt={62}
          height={4.8}
          fogDepth={18}
          relief={0.7}
          lightAngle={55}
          sheen={0.4}
          brightness={0.88}
          opacity={0.9}
          grain={0.05}
          // Performance tuning
          quality={isMobile ? "low" : "medium"}
          dpr={isMobile ? 1 : Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)}
          intro={true}
          // Interaction: subtle pointer-responsive parallax and light steering on fine pointers
          mouseInteraction={!isMobile}
          parallaxStrength={0.4}
          mouseStrength={0.45}
          swellOnClick={false}
          // Offscreen & visibility pause protection
          paused={isPaused}
          className="w-full h-full"
        />
      </div>

      {/* Readability & Atmosphere Vignettes: ensures 100% text contrast and soft bottom seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#090D16]/80 via-[#090D16]/20 to-[#090D16]/40"
      />
    </div>
  );
}

export default HeroGradientWaves;
