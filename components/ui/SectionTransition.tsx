"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Smoothly scrolls to a target section and moves focus to its heading for accessibility.
 */
export function navigateToSection(
  targetSelector: string,
  _label?: string,
  e?: React.MouseEvent
) {
  if (e) {
    e.preventDefault();
  }
  if (typeof window === "undefined") return;

  const targetEl = document.querySelector(targetSelector) as HTMLElement | null;
  if (!targetEl) {
    window.location.href = targetSelector.startsWith("#")
      ? `/${targetSelector}`
      : targetSelector;
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.history.pushState(null, "", targetSelector);
  targetEl.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });

  const heading = targetEl.querySelector("h1, h2") as HTMLElement | null;
  const focusNode = heading || targetEl;
  if (!focusNode.hasAttribute("tabindex")) {
    focusNode.setAttribute("tabindex", "-1");
  }
  window.setTimeout(
    () => {
      focusNode.focus({ preventScroll: true });
    },
    prefersReducedMotion ? 0 : 400
  );
}

/**
 * Gentle fade-and-rise on scroll (opacity and 16px translate, 600ms ease-out).
 * Respects prefers-reduced-motion.
 */
export function FadeIn({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "article" | "header" | "figure" | "section";
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Separates sections with a thin 1px horizontal hairline rule.
 */
export function SectionTransitionWrapper({
  children,
  showDivider = true,
}: {
  children: React.ReactNode;
  showDivider?: boolean;
}) {
  return (
    <div className="relative">
      {showDivider && (
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-16">
          <hr className="border-0 border-t border-border" />
        </div>
      )}
      {children}
    </div>
  );
}
