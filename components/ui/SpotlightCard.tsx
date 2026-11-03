"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(56, 189, 248, 0.12)",
  enableTilt = false,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const canTiltRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    canTiltRef.current = Boolean(enableTilt && hasHover && !prefersReducedMotion);
  }, [enableTilt]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Direct DOM update for radial spotlight mask (zero per-frame React re-renders)
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(450px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
      spotlightRef.current.style.opacity = "1";
    }

    if (canTiltRef.current) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const diffX = (x - centerX) / centerX;
      const diffY = (y - centerY) / centerY;

      // Subtle 3D perspective tilt clamped to maximum 3.5 degrees (under 4 deg threshold)
      const tiltX = Math.max(-3.5, Math.min(3.5, diffY * -3.5));
      const tiltY = Math.max(-3.5, Math.min(3.5, diffX * 3.5));

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(
        2
      )}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-3px)`;
      card.style.boxShadow =
        "0 16px 36px -12px rgba(0, 0, 0, 0.65), 0 0 20px -4px rgba(56, 189, 248, 0.15)";
    }
  };

  const handlePointerEnter = () => {
    const card = cardRef.current;
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "1";
    }
    if (canTiltRef.current && card) {
      card.style.transition = "transform 0.1s ease-out, box-shadow 0.2s ease-out";
    }
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
    if (card) {
      card.style.transition =
        "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease-out";
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      card.style.boxShadow = "";
    }
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative overflow-hidden will-change-transform focus-within:border-sky-400/40",
        enableTilt && "preserve-3d",
        className
      )}
      {...props}
    >
      {/* Interactive Radial Spotlight Mask Layer (GPU Direct Update) */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0"
      />
      {children}
    </div>
  );
}

export default SpotlightCard;
