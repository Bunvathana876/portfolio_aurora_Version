"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+#<>";

interface ScrambleTextProps {
  text: string;
  className?: string;
  active?: boolean;
  scrambleOnMount?: boolean;
}

export function ScrambleText({
  text,
  className,
  active = false,
  scrambleOnMount = false,
}: ScrambleTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef<number | null>(null);

  const runScramble = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayed(text);
      return;
    }

    if (frameRef.current) {
      window.clearInterval(frameRef.current);
    }

    let iteration = 0;
    const step = 0.42;

    frameRef.current = window.setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      iteration += step;
      if (iteration >= text.length) {
        if (frameRef.current) window.clearInterval(frameRef.current);
        setDisplayed(text);
      }
    }, 24);
  }, [prefersReducedMotion, text]);

  useEffect(() => {
    setDisplayed(text);
  }, [text]);

  useEffect(() => {
    if (scrambleOnMount) {
      runScramble();
    }
    return () => {
      if (frameRef.current) window.clearInterval(frameRef.current);
    };
  }, [scrambleOnMount, runScramble]);

  useEffect(() => {
    if (active) {
      runScramble();
    }
  }, [active, runScramble]);

  return (
    <span
      onMouseEnter={runScramble}
      className={cn("relative inline-grid items-center", className)}
    >
      {/* Invisible width stabilizer so proportional fonts never shift layout during scramble */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 select-none">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 font-mono tracking-tight"
      >
        {displayed}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
