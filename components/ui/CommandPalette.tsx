"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Home,
  User,
  Cpu,
  FolderGit2,
  Clock,
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  CornerDownLeft,
} from "lucide-react";
import { siteData } from "@/data/site";
import { navigateToSection } from "@/components/ui/SectionTransition";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const closeDialog = () => {
    dialogRef.current?.close();
    setQuery("");
  };

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) {
      dialog.showModal();
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  };

  const jumpTo = (selector: string) => {
    closeDialog();
    navigateToSection(selector);
  };

  const items: CommandItem[] = [
    {
      id: "hero",
      label: "Go to Top / Hero",
      category: "Navigation",
      icon: <Home className="h-4 w-4 text-cyan-400" />,
      action: () => jumpTo("#hero"),
    },
    {
      id: "about",
      label: "Go to About & Stats",
      category: "Navigation",
      icon: <User className="h-4 w-4 text-purple-400" />,
      action: () => jumpTo("#about"),
    },
    {
      id: "skills",
      label: "Go to Skills & Tech Stack",
      category: "Navigation",
      icon: <Cpu className="h-4 w-4 text-blue-400" />,
      action: () => jumpTo("#skills"),
    },
    {
      id: "projects",
      label: "Go to Featured Projects",
      category: "Navigation",
      icon: <FolderGit2 className="h-4 w-4 text-emerald-400" />,
      action: () => jumpTo("#projects"),
    },
    {
      id: "experience",
      label: "Go to Experience & Timeline",
      category: "Navigation",
      icon: <Clock className="h-4 w-4 text-amber-400" />,
      action: () => jumpTo("#experience"),
    },
    {
      id: "contact",
      label: "Go to Contact Form",
      category: "Navigation",
      icon: <Mail className="h-4 w-4 text-cyan-400" />,
      action: () => jumpTo("#contact"),
    },
    ...siteData.projects.map((p) => ({
      id: `proj-${p.id}`,
      label: `Project: ${p.title}`,
      category: "Projects",
      icon: <ArrowUpRight className="h-4 w-4 text-purple-400" />,
      action: () => jumpTo("#projects"),
    })),
    {
      id: "email",
      label: `Send Email (${siteData.socials.email})`,
      category: "Socials & Contact",
      icon: <Mail className="h-4 w-4 text-cyan-300" />,
      action: () => {
        closeDialog();
        window.location.href = `mailto:${siteData.socials.email}`;
      },
    },
    {
      id: "github",
      label: "Open GitHub Profile",
      category: "Socials & Contact",
      icon: <Github className="h-4 w-4 text-slate-200" />,
      action: () => {
        closeDialog();
        window.open(siteData.socials.github, "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn Profile",
      category: "Socials & Contact",
      icon: <Linkedin className="h-4 w-4 text-blue-400" />,
      action: () => {
        closeDialog();
        window.open(siteData.socials.linkedin, "_blank", "noopener,noreferrer");
      },
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (dialog.open) {
          closeDialog();
        } else {
          openDialog();
        }
      }
    };

    const handleCustomOpen = () => openDialog();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Mandatory light-dismiss fallback for browsers without native `closedby` support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (isDialogContent) return;
        dialog.close();
      };

      dialog.addEventListener("click", handleBackdropClick);
      return () => dialog.removeEventListener("click", handleBackdropClick);
    }
  }, []);

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selectedIndex]?.action();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="command-palette-title"
      onClose={() => setQuery("")}
      className="m-auto w-[92vw] max-w-xl rounded-2xl border border-white/15 bg-[#0f1018]/95 p-0 text-slate-100 shadow-[0_25px_80px_-15px_rgba(34,211,238,0.25)] backdrop-blur-2xl focus:outline-none"
    >
      <div className="flex flex-col" onKeyDown={handleListKeyDown}>
        <h2 id="command-palette-title" className="sr-only">
          Command Palette Navigation
        </h2>

        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
          <Search className="h-4 w-4 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Jump to section, project, or contact ${siteData.name}...`}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={closeDialog}
            className="rounded border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">
              No matching commands found.
            </p>
          ) : (
            <ul role="listbox" aria-label="Commands" className="space-y-1">
              {filtered.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={item.id} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={item.action}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-gradient-to-r from-purple-500/20 via-cyan-500/15 to-blue-500/20 text-white border border-cyan-400/30"
                          : "text-slate-300 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                          {item.icon}
                        </span>
                        <div className="truncate">
                          <p className="truncate font-medium">{item.label}</p>
                          <p className="text-[11px] text-slate-400">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <CornerDownLeft
                        className={`h-3.5 w-3.5 shrink-0 transition-opacity ${
                          isSelected ? "opacity-100 text-cyan-300" : "opacity-0"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2.5 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span>
              <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono">
                ↵
              </kbd>{" "}
              Select
            </span>
          </div>
          <span className="font-mono text-cyan-300/80">{siteData.name}</span>
        </div>
      </div>
    </dialog>
  );
}
