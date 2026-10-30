"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, ShieldCheck } from "lucide-react";
import { VirtualIdBadge } from "@/components/ui/VirtualIdBadge";
import { sound } from "@/lib/sound";

interface IdBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IdBadgeModal({ isOpen, onClose }: IdBadgeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.pop();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Digital Engineering Identity Badge"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              sound.pop();
              onClose();
            }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-lg rounded-2xl border border-border-subtle bg-surface/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 border border-accent/30 text-accent">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.14em] text-foreground font-bold flex items-center gap-1.5">
                    <span>Engineering ID Card</span>
                    <Sparkles className="w-3 h-3 text-accent" />
                  </h3>
                  <p className="text-[10px] font-mono text-muted">
                    Interactive 3D Holographic Credential
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.pop();
                  onClose();
                }}
                className="rounded-lg p-1.5 text-muted hover:text-foreground hover:bg-surface border border-transparent hover:border-border-subtle transition-colors"
                aria-label="Close identity card modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Virtual ID Badge */}
            <div className="flex justify-center py-2">
              <VirtualIdBadge showControls={true} />
            </div>

            {/* Modal Footer note */}
            <div className="mt-4 pt-3 border-t border-border-subtle/60 text-center">
              <p className="text-[11px] font-mono text-muted">
                Tip: Click or hover to tilt in 3D. Press <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px]">ESC</kbd> to close.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
