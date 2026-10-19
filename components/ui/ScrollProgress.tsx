"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
    />
  );
}
