"use client";

import React from "react";
import { FileDown, RotateCw } from "lucide-react";
import Lanyard from "@/components/ui/Lanyard";

interface LanyardStageProps {
  onToggleToCard?: () => void;
}

export function LanyardStage({ onToggleToCard }: LanyardStageProps) {
  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-[440px] h-[540px] rounded-[28px] bg-[radial-gradient(circle_at_50%_36%,#19283c_0%,#101827_48%,#090e18_100%)] border border-white/[0.12] shadow-[0_24px_60px_rgba(0,0,0,0.38)] overflow-hidden flex flex-col items-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-56 h-64 rounded-full bg-sky-400/[0.09] blur-[70px]"
        />

        <div className="w-full h-full">
          <Lanyard
            frontImage="/images/lanyard-front.png"
            backImage="/images/lanyard-back.png"
            qrImage="/images/telegram-qr.jpg"
            strapImage="/images/lanyard-strap.png"
            strapLabel="BUN VATHANA"
            cardColor="#111827"
            strapColor="#090D16"
            finish="matte"
            metal="silver"
            size={0.65}
            strapLength={0.42}
            gravity={0.9}
            damping={0.6}
            elasticity={0.4}
            breeze={0.06}
            interactive={true}
            intro={true}
          />
        </div>

        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#090e18]/85 backdrop-blur-md border border-white/[0.12] text-[11px] font-mono text-slate-300 shadow-md select-none whitespace-nowrap">
          <RotateCw size={12} className="text-sky-400" />
          <span>Click for Telegram QR · Drag to swing</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3">
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-sky-500/10 hover:border-sky-400/40 text-xs font-mono text-slate-200 hover:text-sky-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all shadow-sm"
        >
          <FileDown size={14} className="text-sky-400" />
          <span>Download Curriculum Vitae (PDF)</span>
        </a>

        {onToggleToCard && (
          <button
            type="button"
            onClick={onToggleToCard}
            className="px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15] text-xs font-mono text-slate-400 hover:text-slate-200 active:scale-[0.98] transition-all cursor-pointer"
            title="Switch to detailed specification card"
          >
            Details
          </button>
        )}
      </div>
    </div>
  );
}

export default LanyardStage;
