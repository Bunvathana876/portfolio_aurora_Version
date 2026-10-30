"use client";

import React, { useEffect, useState } from "react";
import { Command, FileDown, MoveUpRight, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteData } from "@/data/site";
import { sound } from "@/lib/sound";

const COLORS = [
  "bg-cyan-400 text-black shadow-[0_0_8px_rgba(0,242,254,0.6)]",
  "bg-sky-400 text-black",
  "bg-indigo-400 text-white shadow-[0_0_8px_rgba(129,140,248,0.6)]",
  "bg-purple-400 text-white",
  "bg-blue-400 text-black",
  "bg-teal-400 text-black",
];

const MENU_LINKS = [
  { name: "Home", url: "/#banner" },
  { name: "About Me", url: "/#about-me" },
  { name: "My Stack", url: "/#my-stack" },
  { name: "Projects", url: "/#selected-projects" },
  { name: "Experience", url: "/#my-experience" },
  { name: "Contact", url: "/#contact" },
];

const SOCIAL_LINKS = [
  { name: "github", url: siteData.socials.github },
  { name: "linkedin", url: siteData.socials.linkedin },
  { name: "resume (pdf)", url: "/cv.pdf" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [localTime, setLocalTime] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSoundActive(sound.isEnabled());

    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Phnom_Penh",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setLocalTime(timeStr);
      } catch {
        setLocalTime("Phnom Penh");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundActive(newState);
  };

  const openCommandPalette = () => {
    sound.tick();
    setIsMenuOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-command-palette"));
    }
  };

  const handleNavClick = (url: string) => {
    sound.tick();
    setIsMenuOpen(false);
    router.push(url);
  };

  return (
    <>
      <header className="sticky top-0 z-[40]">
        {/* Floating Liquid Glass Top Bar */}
        <div className="absolute top-4 left-4 right-4 md:top-5 md:left-8 md:right-8 z-[2] flex items-center justify-between pointer-events-none">
          {/* Left: Brand Monogram + Live Status */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <a
              href="/#banner"
              onClick={() => sound.tick()}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-background-light/70 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 shadow-lg group transition-all"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 text-slate-950 text-xs font-anton font-bold">
                BV
              </span>
              <span className="font-anton text-base tracking-wider text-foreground group-hover:text-cyan-400 transition-colors">
                {siteData.name.toUpperCase()}
              </span>
            </a>

            {/* Live Phnom Penh Clock */}
            {localTime && (
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-light/50 backdrop-blur-xl border border-white/5 text-[11px] font-mono text-muted-foreground">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span>{localTime} · UTC+7</span>
              </div>
            )}
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2.5 pointer-events-auto pr-16 md:pr-18">
            {/* Audio Feedback Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              title={soundActive ? "Mute interactive audio feedback" : "Enable interactive audio feedback"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-light/60 backdrop-blur-xl border border-white/10 text-xs font-mono text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-sm cursor-pointer"
            >
              {soundActive ? (
                <>
                  <Volume2 size={13} className="text-cyan-400" />
                  <span className="hidden md:inline text-[11px]">Audio ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={13} className="text-muted-foreground" />
                  <span className="hidden md:inline text-[11px]">Audio OFF</span>
                </>
              )}
            </button>

            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={openCommandPalette}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-light/60 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:border-white/20 transition-all cursor-pointer shadow-sm"
            >
              <Command size={12} className="text-cyan-400" />
              <span>⌘K</span>
            </button>

            {/* Resume PDF */}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.pop()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-background-light/60 backdrop-blur-xl border border-white/10 text-xs font-mono text-foreground hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-sm"
            >
              <FileDown size={13} className="text-cyan-400" />
              <span>CV PDF</span>
            </a>
          </div>
        </div>

        {/* Signature Two-Line Hamburger Button */}
        <button
          type="button"
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          className={cn(
            "group size-12 fixed top-4 right-4 md:top-5 md:right-8 z-[45] rounded-full bg-background-light/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 shadow-xl transition-all cursor-pointer"
          )}
          onClick={() => {
            sound.pop();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <span
            className={cn(
              "inline-block w-2/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[4px]",
              {
                "rotate-45 -translate-y-1/2 bg-cyan-400": isMenuOpen,
                "md:group-hover:rotate-12": !isMenuOpen,
              }
            )}
          />
          <span
            className={cn(
              "inline-block w-2/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[4px]",
              {
                "-rotate-45 -translate-y-1/2 bg-cyan-400": isMenuOpen,
                "md:group-hover:-rotate-12": !isMenuOpen,
              }
            )}
          />
        </button>
      </header>

      {/* Backdrop Overlay */}
      <div
        className={cn(
          "overlay fixed inset-0 z-[41] bg-black/75 backdrop-blur-md transition-all duration-300",
          {
            "opacity-0 invisible pointer-events-none": !isMenuOpen,
          }
        )}
        onClick={() => {
          sound.pop();
          setIsMenuOpen(false);
        }}
      />

      {/* Curved Slide-Out Liquid Glass Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-2rem)] transform translate-x-full transition-transform duration-700 z-[42] overflow-hidden gap-y-12",
          "flex flex-col lg:justify-center py-10 border-l border-white/10 bg-[#0c1020]/95 backdrop-blur-2xl shadow-2xl",
          { "translate-x-0": isMenuOpen }
        )}
      >
        <div className="grow flex md:items-center w-full max-w-[340px] mx-8 sm:mx-auto">
          <div className="flex gap-10 lg:justify-between max-lg:flex-col w-full">
            <div className="max-lg:order-2">
              <p className="text-muted-foreground mb-4 md:mb-6 tracking-widest text-xs font-mono uppercase">
                SOCIAL &amp; CONNECT
              </p>
              <ul className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.tick()}
                      className="text-base capitalize hover:underline hover:text-cyan-400 text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={openCommandPalette}
                    className="text-sm font-mono text-muted-foreground hover:text-cyan-400 flex items-center gap-1.5 pt-3 cursor-pointer"
                  >
                    <Command size={14} className="text-cyan-400" />
                    <span>Quick Search (⌘K)</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-muted-foreground mb-4 md:mb-6 tracking-widest text-xs font-mono uppercase">
                NAVIGATION
              </p>
              <ul className="space-y-3.5">
                {MENU_LINKS.map((link, idx) => (
                  <li key={link.name}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.url)}
                      className="group text-xl sm:text-2xl font-anton flex items-center gap-3 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      <span
                        className={cn(
                          "size-3.5 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-[180%] transition-all",
                          COLORS[idx % COLORS.length]
                        )}
                      >
                        <MoveUpRight
                          size={8}
                          className="scale-0 group-hover:scale-100 transition-all"
                        />
                      </span>
                      <span>{link.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[340px] mx-8 sm:mx-auto space-y-2 border-t border-white/10 pt-6">
          <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase">
            DIRECT INQUIRY
          </p>
          <a
            href={`mailto:${siteData.socials.email}`}
            onClick={() => sound.tick()}
            className="block text-base font-mono text-foreground hover:text-cyan-400 hover:underline transition-colors"
          >
            {siteData.socials.email}
          </a>
          <a
            href={`tel:${siteData.socials.phone.replace(/[^+\d]/g, "")}`}
            onClick={() => sound.tick()}
            className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            {siteData.socials.phone} &middot; Phnom Penh, KH
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
