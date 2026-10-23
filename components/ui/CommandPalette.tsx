"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { siteData } from "@/data/site";
import { navigateToSection } from "@/components/ui/SectionTransition";

interface CommandItem {
  id: string;
  num: string;
  label: string;
  category: string;
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
      num: "00",
      label: "Cover / Overview",
      category: "Index",
      action: () => jumpTo("#hero"),
    },
    {
      id: "about",
      num: "01",
      label: "About & Biography",
      category: "Index",
      action: () => jumpTo("#about"),
    },
    {
      id: "skills",
      num: "02",
      label: "Capabilities & Disciplines",
      category: "Index",
      action: () => jumpTo("#skills"),
    },
    {
      id: "projects",
      num: "03",
      label: "Selected Work",
      category: "Index",
      action: () => jumpTo("#projects"),
    },
    {
      id: "experience",
      num: "04",
      label: "Experience & Education",
      category: "Index",
      action: () => jumpTo("#experience"),
    },
    {
      id: "contact",
      num: "05",
      label: "Contact & Inquiries",
      category: "Index",
      action: () => jumpTo("#contact"),
    },
    ...siteData.projects.map((p, idx) => ({
      id: `proj-${p.id}`,
      num: `03.${idx + 1}`,
      label: p.title,
      category: `${p.category} · ${p.year}`,
      action: () => {
        closeDialog();
        window.location.href = `/projects/${p.slug}`;
      },
    })),
    {
      id: "email",
      num: "—",
      label: `Email (${siteData.socials.email})`,
      category: "Direct",
      action: () => {
        closeDialog();
        window.location.href = `mailto:${siteData.socials.email}`;
      },
    },
    {
      id: "phone",
      num: "—",
      label: `Phone (${siteData.socials.phone})`,
      category: "Direct",
      action: () => {
        closeDialog();
        window.location.href = `tel:${siteData.socials.phone.replace(/[^+\d]/g, "")}`;
      },
    },
    {
      id: "github",
      num: "—",
      label: "GitHub Archive (github.com/Bunvathana876)",
      category: "Direct",
      action: () => {
        closeDialog();
        window.open(siteData.socials.github, "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "linkedin",
      num: "—",
      label: "LinkedIn Profile",
      category: "Direct",
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
      className="m-auto w-[92vw] max-w-xl rounded-[2px] border border-border bg-background p-0 text-foreground focus:outline-none"
    >
      <div className="flex flex-col" onKeyDown={handleListKeyDown}>
        <h2 id="command-palette-title" className="sr-only">
          Editorial Index Navigation
        </h2>

        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-4 w-4 text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search index, sections, or works..."
            className="w-full bg-transparent text-sm text-foreground placeholder-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={closeDialog}
            className="rounded-[2px] border border-border px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Esc
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-border">
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">
              No matching entries in index.
            </p>
          ) : (
            <ul role="listbox" aria-label="Directory entries">
              {filtered.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={item.id} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={item.action}
                      className={`flex w-full items-center justify-between px-5 py-3 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-surface text-accent"
                          : "text-foreground hover:bg-surface"
                      }`}
                    >
                      <div className="flex items-baseline gap-4 min-w-0">
                        <span className="w-8 shrink-0 text-[11px] uppercase tracking-[0.14em] text-muted">
                          {item.num}
                        </span>
                        <div className="truncate">
                          <p className="truncate font-serif text-lg tracking-tight">
                            {item.label}
                          </p>
                          <p className="editorial-label mt-0.5">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      {item.category === "Direct" ? (
                        <ArrowUpRight
                          className={`h-3.5 w-3.5 shrink-0 ${
                            isSelected ? "text-accent" : "text-muted"
                          }`}
                        />
                      ) : (
                        <CornerDownLeft
                          className={`h-3.5 w-3.5 shrink-0 ${
                            isSelected ? "text-accent" : "opacity-0"
                          }`}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface px-5 py-2.5">
          <span className="editorial-label">↑↓ Navigate • ↵ Select</span>
          <span className="editorial-label">{siteData.name} — Index</span>
        </div>
      </div>
    </dialog>
  );
}
