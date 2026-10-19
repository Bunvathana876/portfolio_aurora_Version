"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { navigateToSection } from "@/components/ui/SectionTransition";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e?: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  strength?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  target,
  rel,
  ariaLabel,
  strength = 0.28,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (href && href.startsWith("#") && href.length > 1) {
      navigateToSection(href, undefined, e);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      whileHover={prefersReducedMotion || disabled ? undefined : { scale: 1.03 }}
      whileTap={prefersReducedMotion || disabled ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 240, damping: 18, mass: 0.2 }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          onClick={handleAnchorClick}
          data-magnetic="true"
          className={cn(
            "btn-sheen inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]",
            className
          )}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          onClick={(e) => onClick?.(e)}
          disabled={disabled}
          aria-label={ariaLabel}
          data-magnetic="true"
          className={cn(
            "btn-sheen inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:opacity-50 disabled:pointer-events-none",
            className
          )}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
