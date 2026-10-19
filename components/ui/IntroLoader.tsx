"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteData } from "@/data/site";

export function IntroLoader() {
  const prefersReducedMotion = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => {
      setShow(false);
    }, 950);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f]"
          aria-label="Loading portfolio"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-purple-500/30 via-cyan-400/30 to-blue-500/30 blur-2xl animate-pulse" />
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl shadow-2xl"
            >
              <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-br from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                {siteData.initials}
              </span>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="mt-5 font-mono text-xs uppercase tracking-[0.28em] text-slate-400"
          >
            {siteData.name}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
