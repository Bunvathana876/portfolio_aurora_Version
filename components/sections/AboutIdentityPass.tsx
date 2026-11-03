"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { IdentityPassFallback } from "@/components/sections/IdentityPassFallback";

function isWebGLSupported(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Dynamically import LanyardStage to ensure Three.js is code-split out of the critical initial bundle
const LanyardStage = dynamic(
  () => import("@/components/sections/LanyardStage").then((mod) => mod.LanyardStage),
  {
    ssr: false,
    loading: () => <IdentityPassFallback />,
  }
);

export function AboutIdentityPass() {
  const [hasWebGL, setHasWebGL] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"3d" | "card">("3d");

  useEffect(() => {
    setIsMounted(true);

    setHasWebGL(isWebGLSupported());
  }, []);

  // Use the static card only while loading or when WebGL is unavailable.
  if (!isMounted || !hasWebGL) {
    return <IdentityPassFallback />;
  }

  return (
    <div className="space-y-3">
      {/* Keep the interactive lanyard as the default view on WebGL devices. */}
      <div className="flex items-center justify-between px-1">
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono">
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={`px-3 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
              viewMode === "3d"
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/30 font-semibold shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            3D Lanyard
          </button>
          <button
            type="button"
            onClick={() => setViewMode("card")}
            className={`px-3 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
              viewMode === "card"
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/30 font-semibold shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Card Spec
          </button>
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          {viewMode === "3d" ? "Physics Active" : "Static Details"}
        </span>
      </div>

      {/* Render active mode */}
      {viewMode === "3d" ? (
        <LanyardStage onToggleToCard={() => setViewMode("card")} />
      ) : (
        <IdentityPassFallback />
      )}
    </div>
  );
}

export default AboutIdentityPass;
