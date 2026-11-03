"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.18,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const canHoverRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    canHoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth, refined spring return
  const springConfig = { damping: 18, stiffness: 220, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !canHoverRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Refined magnetic displacement clamped strictly to ~4-5px
    const clampedX = Math.max(-5, Math.min(5, deltaX));
    const clampedY = Math.max(-5, Math.min(5, deltaY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (shouldReduceMotion) {
    return <div className={cn("inline-block", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: smoothX, y: smoothY }}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
