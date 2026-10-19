"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 420, damping: 32, mass: 0.2 });
  const cursorY = useSpring(-100, { stiffness: 420, damping: 32, mass: 0.2 });

  const trailX = useSpring(-100, { stiffness: 140, damping: 24, mass: 0.5 });
  const trailY = useSpring(-100, { stiffness: 140, damping: 24, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || prefersReducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, input, textarea, select, [data-magnetic='true'], [role='button']"
      );
      setIsHovered(Boolean(interactive));
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, trailX, trailY, isVisible, prefersReducedMotion]);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] hidden md:block overflow-hidden"
    >
      {/* Trailing ambient glow */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 88 : 44,
          height: isHovered ? 88 : 44,
          opacity: isVisible ? (isHovered ? 0.55 : 0.3) : 0,
        }}
        transition={{ duration: 0.2 }}
        className="rounded-full bg-gradient-to-tr from-purple-500/40 via-cyan-400/40 to-blue-500/40 blur-md border border-cyan-300/30"
      />
      {/* Crisp core dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
      />
    </div>
  );
}
