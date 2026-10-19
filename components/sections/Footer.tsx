"use client";

import React from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { siteData } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { navigateToSection } from "@/components/ui/SectionTransition";

export function Footer() {
  const scrollToTop = (e?: React.MouseEvent) => {
    navigateToSection("#hero", "Top", e);
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#07070b] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <a
            href="#hero"
            onClick={(e) => navigateToSection("#hero", "Top", e)}
            className="group flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-white/[0.04] font-display text-xs font-bold text-cyan-300 transition-all duration-200 hover:scale-105 hover:border-cyan-400/60 hover:shadow-[0_0_18px_rgba(34,211,238,0.28)]"
          >
            {siteData.initials}
          </a>
          <div>
            <p className="text-sm font-semibold text-white">{siteData.name}</p>
            <p className="text-xs text-slate-400">
              {siteData.role} • {siteData.socials.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${siteData.socials.email}`}
            aria-label="Email"
            className="btn-sheen group rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.07] hover:text-white active:scale-95"
          >
            <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </a>
          <a
            href={siteData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="btn-sheen group rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.07] hover:text-white active:scale-95"
          >
            <Github className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </a>
          <a
            href={siteData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="btn-sheen group rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.07] hover:text-white active:scale-95"
          >
            <Linkedin className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </a>

          <MagneticButton
            onClick={scrollToTop}
            ariaLabel="Back to top"
            className="group rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 hover:text-white"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>
          © {new Date().getFullYear()} {siteData.name}. All rights reserved.
        </p>
        <p className="font-mono text-[11px]">
          Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
