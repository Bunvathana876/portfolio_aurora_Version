"use client";

import React from "react";
import { siteData } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-background">
      <div className="mx-auto max-w-[1320px] px-6 py-8 sm:px-10 lg:px-16 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-muted">
        <span>© {siteData.name}. All rights reserved.</span>

        <a
          href="#top"
          onClick={handleBackToTop}
          className="transition-colors hover:text-foreground"
        >
          Back to top ↑
        </a>

        <span className="font-mono tabular-nums">{year}</span>
      </div>
    </footer>
  );
}
