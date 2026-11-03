"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  staggerChildren?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  staggerChildren,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, render immediately without animations
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (staggerChildren) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className,
  yOffset = 16,
  duration = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionAccentStroke({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={`h-[1.5px] w-16 bg-gradient-to-r from-sky-400 via-sky-300 to-transparent rounded-full ${className}`}
      />
    );
  }

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`origin-left h-[1.5px] w-16 bg-gradient-to-r from-sky-400 via-sky-300 to-transparent rounded-full ${className}`}
    />
  );
}

export default ScrollReveal;
