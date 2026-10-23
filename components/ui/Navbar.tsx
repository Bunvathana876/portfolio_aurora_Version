"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteData } from "@/data/site";
import { navigateToSection } from "@/components/ui/SectionTransition";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function formatPhnomPenhTime(date: Date): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Phnom_Penh",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
}

export function Navbar() {
  const navListRef = useRef<HTMLUListElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [clockText, setClockText] = useState<string>("");

  // Live clock for Phnom Penh (UTC+7)
  useEffect(() => {
    const updateClock = () => {
      setClockText(formatPhnomPenhTime(new Date()));
    };
    updateClock();
    const interval = window.setInterval(updateClock, 15000);
    return () => window.clearInterval(interval);
  }, []);

  // Sync theme state with system preference & stored override
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const computeIsDark = () => {
      try {
        const stored = localStorage.getItem("color-scheme");
        if (stored === "dark") return true;
        if (stored === "light") return false;
      } catch {
        // Ignore storage errors
      }
      return mediaQuery.matches;
    };

    const applyDomScheme = (scheme: string | null) => {
      const meta = document.querySelector(
        'meta[name="color-scheme"]'
      ) as HTMLMetaElement | null;
      if (meta) {
        meta.content = scheme ?? "light dark";
      }
      document.documentElement.classList.toggle("dark", scheme === "dark");
      document.documentElement.classList.toggle("light", scheme === "light");
      setIsDark(computeIsDark());
    };

    setIsDark(computeIsDark());

    const handleMediaChange = () => {
      setIsDark(computeIsDark());
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "color-scheme") {
        applyDomScheme(e.newValue);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const toggleColorScheme = () => {
    const systemIsDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const systemScheme = systemIsDark ? "dark" : "light";
    const targetScheme = isDark ? "light" : "dark";

    const meta = document.querySelector(
      'meta[name="color-scheme"]'
    ) as HTMLMetaElement | null;

    if (targetScheme === systemScheme) {
      try {
        localStorage.removeItem("color-scheme");
      } catch {
        // Ignore storage errors
      }
      if (meta) meta.content = "light dark";
      document.documentElement.classList.remove("dark", "light");
    } else {
      try {
        localStorage.setItem("color-scheme", targetScheme);
      } catch {
        // Ignore storage errors
      }
      if (meta) meta.content = targetScheme;
      document.documentElement.classList.toggle("dark", targetScheme === "dark");
      document.documentElement.classList.toggle(
        "light",
        targetScheme === "light"
      );
    }

    setIsDark(targetScheme === "dark");
  };

  // Scrollspy with native CSS `scroll-target-group: auto` + IntersectionObserver fallback
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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav
        aria-label="Primary Navigation"
        className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16"
      >
        {/* Left: Name in Serif */}
        <a
          href="#hero"
          onClick={(e) => navigateToSection("#hero", "Overview", e)}
          className="font-serif text-xl sm:text-2xl tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-none"
        >
          {siteData.name}
        </a>

        {/* Right: Small Uppercase Links + Tiny Live Location & Clock */}
        <div className="flex items-center gap-6 lg:gap-8">
          <ul
            ref={navListRef}
            className="scrollspy-nav hidden md:flex items-center gap-6 lg:gap-7"
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => navigateToSection(item.href, item.label, e)}
                  className="editorial-link text-[11px] uppercase tracking-[0.16em] text-foreground focus-visible:outline-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <span
             aria-hidden="true"
            className="hidden md:inline-block h-3.5 w-px bg-border"
          />

          <div className="flex items-center gap-4">
            <span
              className="text-[11px] uppercase tracking-[0.14em] text-muted tabular-nums"
              aria-label="Location and local time"
            >
              Phnom Penh{clockText ? `, ${clockText}` : ""}
            </span>

            <button
              type="button"
              onClick={toggleColorScheme}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
              className="editorial-link text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground transition-colors focus-visible:outline-none"
            >
              Dark / Light
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="inline-flex md:hidden items-center justify-center text-foreground transition-colors hover:text-accent focus-visible:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Flat Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <ul className="flex flex-col divide-y divide-border">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateToSection(item.href, item.label, e);
                  }}
                  className="flex items-center justify-between py-3 text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors hover:text-accent"
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="text-muted">
                    →
                  </span>
                </a>
              </li>
            ))}
            <li className="pt-3">
              <button
                type="button"
                onClick={() => {
                  toggleColorScheme();
                }}
                className="flex w-full items-center justify-between py-2 text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground"
              >
                <span>Theme</span>
                <span className="editorial-link text-foreground">Dark / Light</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

