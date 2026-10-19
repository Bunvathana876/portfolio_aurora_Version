"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  Code2,
  Disc3,
} from "lucide-react";
import { siteData, type LiveStatusItem } from "@/data/site";
import { navigateToSection } from "@/components/ui/SectionTransition";

function EqualizerBars() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-3 items-end gap-[2px] px-0.5"
    >
      <span className="h-full w-[2px] origin-bottom rounded-full bg-purple-400 animate-eq-bar-1" />
      <span className="h-full w-[2px] origin-bottom rounded-full bg-cyan-300 animate-eq-bar-2" />
      <span className="h-full w-[2px] origin-bottom rounded-full bg-purple-400 animate-eq-bar-3" />
    </span>
  );
}

function getStatusAccent(accent: LiveStatusItem["accent"]) {
  switch (accent) {
    case "emerald":
      return {
        dot: "bg-emerald-400",
        ping: "bg-emerald-400",
        border: "border-emerald-400/30 hover:border-emerald-400/55",
        badge: "text-emerald-300 bg-emerald-500/15 border-emerald-400/30",
        glow: "shadow-[0_0_28px_rgba(16,185,129,0.16)]",
      };
    case "cyan":
      return {
        dot: "bg-cyan-400",
        ping: "bg-cyan-400",
        border: "border-cyan-400/30 hover:border-cyan-400/55",
        badge: "text-cyan-300 bg-cyan-500/15 border-cyan-400/30",
        glow: "shadow-[0_0_28px_rgba(34,211,238,0.16)]",
      };
    case "purple":
      return {
        dot: "bg-purple-400",
        ping: "bg-purple-400",
        border: "border-purple-400/30 hover:border-purple-400/55",
        badge: "text-purple-300 bg-purple-500/15 border-purple-400/30",
        glow: "shadow-[0_0_28px_rgba(168,85,247,0.18)]",
      };
  }
}

function getStatusIcon(id: LiveStatusItem["id"]) {
  switch (id) {
    case "available":
      return <Briefcase className="h-3.5 w-3.5 text-emerald-400 shrink-0" />;
    case "working":
      return <Code2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />;
    case "listening":
      return <Disc3 className="h-3.5 w-3.5 text-purple-400 animate-spin shrink-0" style={{ animationDuration: "5s" }} />;
  }
}

export function LiveStatusPill() {
  const prefersReducedMotion = useReducedMotion();
  const statuses = siteData.liveStatus;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || expanded) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % statuses.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, isPaused, expanded, statuses.length]);

  const current = statuses[activeIndex] ?? statuses[0];
  const accent = getStatusAccent(current.accent);

  return (
    <div
      className="relative z-30 mb-6 inline-block"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Interactive Live Status Pill */}
      <div
        className={`group flex items-center gap-2.5 rounded-full border bg-[#0c0e18]/85 px-3.5 py-1.5 backdrop-blur-xl transition-all duration-300 ${accent.border} ${accent.glow}`}
      >
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={`Live status: ${current.category} — ${current.label}. Click to view all live statuses.`}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full"
        >
          {/* Pulsing Live Dot */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${accent.ping}`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${accent.dot}`}
            />
          </span>

          {/* Rotating Status Content */}
          <div className="relative flex items-center gap-2 overflow-hidden min-h-[1.35rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }
                }
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-2"
              >
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${accent.badge}`}
                >
                  {current.id === "listening" ? (
                    <EqualizerBars />
                  ) : (
                    getStatusIcon(current.id)
                  )}
                  <span>{current.category}</span>
                </span>

                <span className="text-xs font-medium tracking-wide text-slate-100 group-hover:text-white transition-colors">
                  {current.label}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <ChevronDown
            className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:text-slate-200 ${
              expanded ? "rotate-180 text-cyan-300" : ""
            }`}
          />
        </button>

        {/* Quick Mode Switcher Dots */}
        <div
          className="hidden sm:flex items-center gap-1 border-l border-white/10 pl-2.5"
          role="tablist"
          aria-label="Switch live status view"
        >
          {statuses.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show ${item.category}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-4 bg-cyan-400"
                    : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Expandable All-in-One Live Telemetry Popover */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full mt-2.5 w-[min(92vw,25rem)] rounded-2xl border border-white/15 bg-[#0c0e18]/95 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
          >
            <div className="mb-2.5 flex items-center justify-between px-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Live Telemetry • PNH (UTC+7)
              </span>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="font-mono text-[10px] text-slate-400 hover:text-cyan-300 transition-colors"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              {statuses.map((item, idx) => {
                const itemAccent = getStatusAccent(item.accent);
                const isSelected = idx === activeIndex;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`group/item flex items-center justify-between gap-3 rounded-xl border p-2.5 transition-all ${
                      isSelected
                        ? "border-cyan-400/35 bg-white/[0.06]"
                        : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40">
                        {item.id === "listening" ? (
                          <EqualizerBars />
                        ) : (
                          getStatusIcon(item.id)
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${itemAccent.dot}`}
                          />
                          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                            {item.category}
                          </p>
                        </div>
                        <p className="truncate text-xs font-semibold text-white">
                          {item.label}
                        </p>
                        <p className="truncate text-[11px] text-slate-400">
                          {item.sublabel}
                        </p>
                      </div>
                    </div>

                    {item.href && (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          setExpanded(false);
                          navigateToSection(item.href!, item.category, e);
                        }}
                        aria-label={`Jump to ${item.category}`}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/15 hover:text-cyan-300"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
