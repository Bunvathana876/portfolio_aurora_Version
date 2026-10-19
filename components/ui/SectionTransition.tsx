"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

interface TransitionPayload {
  targetSelector: string;
  label?: string;
}

/**
 * Helper to trigger a smooth section page transition from any link or button.
 */
export function navigateToSection(
  targetSelector: string,
  label?: string,
  e?: React.MouseEvent
) {
  if (e) {
    e.preventDefault();
  }
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<TransitionPayload>("section-page-transition", {
      detail: { targetSelector, label },
    })
  );
}

/**
 * Global overlay that orchestrates smooth transitions when jumping between sections.
 * Uses the native View Transitions API where supported and routes focus for accessibility.
 */
export function SectionTransitionOverlay() {
  const prefersReducedMotion = useReducedMotion();
  const [transitioning, setTransitioning] = useState<{
    active: boolean;
    label: string;
  }>({ active: false, label: "" });
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleSectionTransition = (event: Event) => {
      const customEvent = event as CustomEvent<TransitionPayload>;
      const { targetSelector, label } = customEvent.detail || {};
      if (!targetSelector) return;

      const targetEl = document.querySelector(targetSelector) as HTMLElement | null;
      if (!targetEl) return;

      const resolvedLabel =
        label ||
        targetSelector.replace("#", "").replace(/^\w/, (c) => c.toUpperCase());

      // Route focus to the section heading after transition per `same-document-transitions` guide
      const focusTargetHeading = () => {
        const heading = targetEl.querySelector("h1, h2") as HTMLElement | null;
        const focusNode = heading || targetEl;
        if (!focusNode.hasAttribute("tabindex")) {
          focusNode.setAttribute("tabindex", "-1");
        }
        focusNode.focus({ preventScroll: true });
      };

      const performScrollAndUpdateUrl = () => {
        window.history.pushState(null, "", targetSelector);
        targetEl.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      };

      if (prefersReducedMotion) {
        performScrollAndUpdateUrl();
        focusTargetHeading();
        return;
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      setTransitioning({ active: true, label: resolvedLabel });

      const docWithVT = document as Document & {
        startViewTransition?: (cb: () => void) => { finished: Promise<void> };
      };

      if (typeof docWithVT.startViewTransition === "function") {
        const vt = docWithVT.startViewTransition(() => {
          performScrollAndUpdateUrl();
        });
        vt.finished.finally(() => {
          focusTargetHeading();
        });
      } else {
        performScrollAndUpdateUrl();
        window.setTimeout(focusTargetHeading, 420);
      }

      timeoutRef.current = window.setTimeout(() => {
        setTransitioning({ active: false, label: "" });
      }, 480);
    };

    window.addEventListener("section-page-transition", handleSectionTransition);
    return () => {
      window.removeEventListener(
        "section-page-transition",
        handleSectionTransition
      );
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {transitioning.active && (
        <motion.div
          key="section-transition-veil"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-[75] flex items-center justify-center overflow-hidden"
        >
          {/* Subtle translucent aurora wash */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1, originY: 0 }}
            exit={{ scaleY: 0, originY: 1 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-gradient-to-b from-purple-950/25 via-[#0a0a0f]/55 to-cyan-950/25 backdrop-blur-[3px]"
          />

          {/* Horizontal laser sweep line */}
          <motion.div
            initial={{ y: "-45vh", opacity: 0 }}
            animate={{ y: "45vh", opacity: [0, 1, 0] }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="h-[1.5px] w-full max-w-4xl bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent shadow-[0_0_24px_rgba(34,211,238,0.8)]"
          />

          {/* Minimal section indicator pill */}
          {transitioning.label && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-full border border-cyan-400/35 bg-[#0a0a0f]/90 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] backdrop-blur-xl"
            >
              /{transitioning.label}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Scroll-linked section wrapper that creates a smooth depth/opacity transition
 * and an illuminated architectural divider as the user scrolls between sections.
 */
export function SectionTransitionWrapper({
  children,
  showDivider = true,
}: {
  children: React.ReactNode;
  showDivider?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "end 6%"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.88, 1],
    [0.35, 1, 1, 0.45]
  );
  const y = useTransform(scrollYProgress, [0, 0.14, 0.88, 1], [32, 0, 0, -24]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.14, 0.88, 1],
    [0.98, 1, 1, 0.985]
  );
  const dividerScale = useTransform(scrollYProgress, [0, 0.22], [0.15, 1]);
  const dividerOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [0, 0.85, 0.85, 0]
  );

  return (
    <div ref={ref} className="relative">
      {showDivider && (
        <div
          aria-hidden="true"
          className="mx-auto flex max-w-5xl items-center justify-center px-6"
        >
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { scaleX: dividerScale, opacity: dividerOpacity }
            }
            className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          />
        </div>
      )}
      <motion.div
        style={prefersReducedMotion ? undefined : { opacity, y, scale }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
