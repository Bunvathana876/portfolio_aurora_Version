"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, Sparkles, X } from "lucide-react";
import { sound } from "@/lib/sound";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "sparkles";
}

export interface ToastOptions {
  title: string;
  description?: string;
  type?: "success" | "info" | "sparkles";
}

interface ToastContextType {
  showToast: (title: string, description?: string, type?: "success" | "info" | "sparkles") => void;
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (title: string, description?: string, type: "success" | "info" | "sparkles" = "success") => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, title, description, type }]);
      sound.tick();

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const toast = useCallback(
    ({ title, description, type = "success" }: ToastOptions) => {
      showToast(title, description, type);
    },
    [showToast]
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
      {/* Toast Notification Container */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 max-w-sm w-full px-4"
      >
        <AnimatePresence>
          {toasts.map((toastItem) => (
            <motion.div
              key={toastItem.id}
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border border-border-subtle bg-surface/90 backdrop-blur-xl shadow-2xl text-foreground text-xs"
            >
              <div className="mt-0.5 shrink-0">
                {toastItem.type === "sparkles" ? (
                  <Sparkles className="w-4 h-4 text-accent" />
                ) : toastItem.type === "info" ? (
                  <Info className="w-4 h-4 text-sky-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <p className="font-semibold text-foreground leading-tight">
                  {toastItem.title}
                </p>
                {toastItem.description && (
                  <p className="text-muted text-[11px] mt-0.5 leading-snug">
                    {toastItem.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeToast(toastItem.id)}
                className="text-muted hover:text-foreground shrink-0 p-0.5"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
