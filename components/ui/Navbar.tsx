"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Command, FileDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteData } from "@/data/site";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  // Active section observer on the homepage
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionElements: { id: string; element: HTMLElement }[] = [];
    const sectionIds = [
      { id: "about", targets: ["about", "about-me"] },
      { id: "skills", targets: ["skills", "my-stack"] },
      { id: "projects", targets: ["projects", "selected-projects"] },
      { id: "experience", targets: ["experience", "my-experience"] },
      { id: "contact", targets: ["contact"] },
    ];

    sectionIds.forEach(({ id, targets }) => {
      for (const targetId of targets) {
        const el = document.getElementById(targetId);
        if (el) {
          sectionElements.push({ id, element: el });
          break;
        }
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sectionElements.find(
              (item) => item.element === entry.target
            );
            if (matched) {
              setActiveSection(matched.id);
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach((item) => observer.observe(item.element));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const openCommandPalette = () => {
    setIsMenuOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-command-palette"));
    }
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <nav
        aria-label="Primary"
        className="max-w-5xl mx-auto pointer-events-auto flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-full bg-[#090D16]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-all"
      >
        {/* Left: Minimal Monogram Logo */}
        <Link
          href="/#hero"
          onClick={handleNavClick}
          className="flex items-center gap-2.5 text-foreground hover:text-sky-400 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none rounded-lg transition-all group select-none"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-400/25 text-sky-400 font-mono text-xs font-bold group-hover:border-sky-400/50 group-hover:bg-sky-500/15 transition-all">
            BV
          </span>
          <span className="font-medium text-sm tracking-tight text-slate-200 group-hover:text-white transition-colors">
            {siteData.name}
          </span>
        </Link>

        {/* Center: Desktop Navigation Links with Animated Sliding Indicator */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none",
                  isActive
                    ? "text-sky-400"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-sky-500/10 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right: Actions (Command Palette, Resume, Mobile Menu Toggle) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Search Shortcut */}
          <button
            type="button"
            onClick={openCommandPalette}
            title="Quick Navigation (⌘K)"
            aria-label="Open command palette"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.12] active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all cursor-pointer"
          >
            <Command size={12} className="text-sky-400" />
            <span className="text-[11px] text-slate-400">⌘K</span>
          </button>

          {/* Resume PDF Action */}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-sky-300 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 hover:border-sky-400 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all shadow-sm"
          >
            <FileDown size={13} className="text-sky-400" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex size-8 items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none transition-all cursor-pointer"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Backdrop & Sheet with Smooth AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-16 left-4 right-4 z-50 pointer-events-auto max-w-md mx-auto rounded-2xl bg-[#090D16]/95 backdrop-blur-2xl border border-white/[0.08] p-5 shadow-2xl"
            >
              <div className="flex flex-col gap-1.5 mb-5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={handleNavClick}
                      className={cn(
                        "px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98]",
                        isActive
                          ? "text-sky-400 bg-sky-500/10 border border-sky-500/25 font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 active:scale-[0.98] transition-all shadow-md"
                >
                  <FileDown size={14} />
                  <span>Download Resume (PDF)</span>
                </a>

                <button
                  type="button"
                  onClick={openCommandPalette}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 bg-white/[0.03] border border-white/[0.06] active:scale-[0.98] transition-colors cursor-pointer"
                >
                  <Command size={13} className="text-sky-400" />
                  <span>Search Sections (⌘K)</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
