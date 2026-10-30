"use client";

import React from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { siteData } from "@/data/site";
import { sound } from "@/lib/sound";

export function Footer() {
  const year = new Date().getFullYear();

  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    sound.pop();
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#070913]/90 backdrop-blur-2xl py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <span className="text-xl sm:text-2xl font-anton text-foreground tracking-wider block">
              {siteData.name.toUpperCase()}
            </span>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              Software Developer &middot; Norton University (2023–2026) &middot; Phnom Penh, Cambodia
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.tick()}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
              title="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={siteData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.tick()}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
              title="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${siteData.socials.email}`}
              onClick={() => sound.tick()}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
              title="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="#banner"
              onClick={handleBackToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-foreground hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} className="text-cyan-400" />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted-foreground/80">
          <p>&copy; {year} {siteData.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>Built with Next.js 15, TypeScript &amp; Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
