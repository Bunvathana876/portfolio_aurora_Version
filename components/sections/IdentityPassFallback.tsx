"use client";

import React from "react";
import Image from "next/image";
import { FileDown, GraduationCap } from "lucide-react";
import { siteData } from "@/data/site";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function IdentityPassFallback() {
  return (
    <SpotlightCard
      enableTilt={true}
      spotlightColor="rgba(56, 189, 248, 0.12)"
      className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#111827]/90 via-[#0e1424]/90 to-[#090D16]/95 backdrop-blur-xl p-6 sm:p-7 shadow-xl preserve-3d group"
    >
      {/* Holographic Reflection Sweep on Desktop Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent rotate-12 group-hover:translate-x-full duration-1000"
      />

      {/* Card Header Bar with 3D Depth */}
      <div className="flex items-center justify-between gap-3 pb-5 border-b border-white/[0.08] [transform:translateZ(16px)]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          <span className="font-mono text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Developer Pass
          </span>
        </div>
        <span className="font-mono text-[11px] text-sky-400/90 bg-sky-500/10 border border-sky-400/20 px-2 py-0.5 rounded-md">
          BV
        </span>
      </div>

      {/* Profile Card Body with 3D Depth */}
      <div className="pt-6 flex items-start gap-4 [transform:translateZ(20px)]">
        <div className="relative size-16 sm:size-18 rounded-2xl overflow-hidden border border-white/[0.1] bg-slate-900 shrink-0 shadow-lg">
          <Image
            src="/images/avatar.jpg"
            alt={siteData.name}
            fill
            sizes="72px"
            className="object-cover object-top"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight truncate">
            {siteData.name}
          </h3>
          <p className="text-xs font-mono text-sky-400 mt-0.5">
            Software Developer
          </p>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <GraduationCap size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">Norton University (2023–2026)</span>
          </p>
        </div>
      </div>

      {/* Card Action */}
      <div className="mt-6 [transform:translateZ(16px)]">
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-sky-500/10 hover:border-sky-400/40 text-xs font-mono text-slate-200 hover:text-sky-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all shadow-sm"
        >
          <FileDown size={14} className="text-sky-400" />
          <span>Download Curriculum Vitae (PDF)</span>
        </a>
      </div>
    </SpotlightCard>
  );
}

export default IdentityPassFallback;
