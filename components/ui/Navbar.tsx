"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Command, Menu, Sparkles, X } from "lucide-react";
import { siteData } from "@/data/site";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { navigateToSection } from "@/components/ui/SectionTransition";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const navListRef = useRef<HTMLUListElement>(null);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 160) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  // Scrollspy with native CSS `scroll-target-group: auto` + IntersectionObserver fallback & aria-current sync
  useEffect(() => {
    const navContainer = navListRef.current;
    if (!navContainer) return;

    const supportsScrollTargetGroup =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("scroll-target-group: auto");

    if (supportsScrollTargetGroup) {
      const syncAriaCurrent = () => {
        const currentLink = navContainer.querySelector("a:target-current");
        navContainer.querySelectorAll("a").forEach((link) => {
          link.setAttribute(
            "aria-current",
            link === currentLink ? "true" : "false"
          );
        });
      };

      syncAriaCurrent();
      document.addEventListener("scrollend", syncAriaCurrent, {
        passive: true,
      });
      return () => document.removeEventListener("scrollend", syncAriaCurrent);
    } else {
      const navLinks = navContainer.querySelectorAll("a");
      const sections = document.querySelectorAll("main section[id]");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              navLinks.forEach((link) => {
                const isActive = link.getAttribute("href") === `#${id}`;
                link.classList.toggle(":target-current", isActive);
                link.setAttribute(
                  "aria-current",
                  isActive ? "true" : "false"
                );
              });
            }
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );

      sections.forEach((section) => observer.observe(section));
      return () => observer.disconnect();
    }
  }, []);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-120%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-4 inset-x-0 z-50 mx-auto max-w-5xl px-4"
    >
      <nav
        aria-label="Primary Navigation"
        className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0a0a0f]/80 px-4 py-2.5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors hover:border-white/15"
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => navigateToSection("#hero", "Overview", e)}
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg active:scale-[0.98] transition-transform"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-purple-500/25 via-cyan-500/20 to-blue-500/25 font-display text-sm font-bold text-white shadow-[0_0_16px_rgba(34,211,238,0.2)] transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.4)]">
            {siteData.initials}
          </span>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {siteData.name}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 hidden sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {siteData.socials.location}
            </span>
          </div>
        </a>

        {/* Desktop Links with Text Scramble/Decode Effect & Scrollspy */}
        <ul
          ref={navListRef}
          onMouseLeave={() => setHoveredHref(null)}
          className="scrollspy-nav hidden md:flex items-center gap-1"
        >
          {navItems.map((item) => (
            <li key={item.href} className="relative">
              <a
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                onFocus={() => setHoveredHref(item.href)}
                onBlur={() => setHoveredHref(null)}
                onClick={(e) => navigateToSection(item.href, item.label, e)}
                className="group relative z-10 inline-flex items-center rounded-xl px-3.5 py-2 text-xs font-medium text-slate-300 transition-all duration-200 hover:text-cyan-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {hoveredHref === item.href && (
                  <motion.span
                    layoutId="navbar-hover-pill"
                    aria-hidden="true"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="absolute inset-0 -z-10 rounded-xl border border-cyan-400/25 bg-white/[0.06]"
                  />
                )}
                <ScrambleText
                  text={item.label}
                  active={hoveredHref === item.href}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open Command Palette (Cmd+K)"
            className="btn-sheen group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Command className="h-3.5 w-3.5 text-cyan-400 transition-transform duration-300 group-hover:rotate-12" />
            <span className="hidden sm:inline">Quick Jump</span>
            <kbd className="rounded border border-white/15 bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 transition-colors group-hover:border-cyan-400/30 group-hover:text-cyan-200">
              ⌘K
            </kbd>
          </button>

          <a
            href="#contact"
            onClick={(e) => navigateToSection("#contact", "Contact", e)}
            className="btn-sheen group hidden sm:inline-flex items-center rounded-xl bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 p-[1px] text-xs font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(34,211,238,0.45)] active:scale-95"
          >
            <span className="inline-flex items-center gap-1.5 rounded-[11px] bg-[#0a0a0f]/80 px-3.5 py-1.5 transition-colors group-hover:bg-[#0a0a0f]/40">
              <Sparkles className="h-3 w-3 text-cyan-300 transition-transform duration-300 group-hover:rotate-45" />
              <span>Hire Me</span>
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
            className="inline-flex md:hidden items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition-all hover:border-cyan-400/40 hover:text-white active:scale-95"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-2xl border border-white/10 bg-[#0d0e17]/95 p-4 backdrop-blur-2xl md:hidden shadow-2xl"
          >
            <ul className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      navigateToSection(item.href, item.label, e);
                    }}
                    className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-cyan-300"
                  >
                    <ScrambleText text={item.label} />
                    <span className="font-mono text-[10px] text-slate-500">
                      {item.href}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
