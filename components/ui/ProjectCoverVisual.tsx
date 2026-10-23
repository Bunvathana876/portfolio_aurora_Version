"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";

function SchematicIllustration({ slug }: { slug: string }) {
  // 1. Sunflower Disease Diagnostic Expert System
  if (slug === "sunflower-expert-system") {
    return (
      <svg
        viewBox="0 0 360 220"
        className="w-full h-full max-h-[76%] max-w-[82%] mx-auto"
        fill="none"
        aria-hidden="true"
      >
        {/* Leaf Silhouette Outline */}
        <path
          d="M60 170 C50 110, 110 50, 170 40 C210 90, 200 150, 120 180 Z"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />
        {/* Leaf Veins / Diagnostic Neural Paths */}
        <path
          d="M80 160 Q130 115 165 45"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <path
          d="M110 135 Q140 130 160 145"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <path
          d="M130 100 Q160 90 180 105"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        {/* Diagnostic Engine Nodes (Right Side Decision Tree) */}
        <rect
          x="200"
          y="35"
          width="130"
          height="32"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text
          x="210"
          y="55"
          fill="currentColor"
          fontSize="9"
          fontFamily="monospace"
          fillOpacity="0.8"
        >
          SYMPTOM EVAL (KM/EN)
        </text>

        <rect
          x="215"
          y="94"
          width="115"
          height="32"
          stroke="var(--accent)"
          strokeWidth="1.2"
        />
        <text
          x="225"
          y="114"
          fill="var(--accent)"
          fontSize="9"
          fontFamily="monospace"
        >
          RULE INFERENCE
        </text>

        <rect
          x="200"
          y="153"
          width="130"
          height="32"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text
          x="210"
          y="173"
          fill="currentColor"
          fontSize="9"
          fontFamily="monospace"
          fillOpacity="0.8"
        >
          TREATMENT PROTOCOL
        </text>

        {/* Connectors */}
        <line
          x1="170"
          y1="51"
          x2="200"
          y2="51"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <line
          x1="265"
          y1="67"
          x2="265"
          y2="94"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <line
          x1="265"
          y1="126"
          x2="265"
          y2="153"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <circle cx="170" cy="51" r="3.5" fill="var(--accent)" />
        <circle cx="265" cy="94" r="3" fill="var(--accent)" />
      </svg>
    );
  }

  // 2. Full-Stack Dual-Client E-Commerce Platform
  if (slug === "dual-client-ecommerce" || slug === "shop-panda") {
    return (
      <svg
        viewBox="0 0 360 220"
        className="w-full h-full max-h-[76%] max-w-[82%] mx-auto"
        fill="none"
        aria-hidden="true"
      >
        {/* Mobile Phone - Flutter Consumer App */}
        <rect
          x="24"
          y="22"
          width="96"
          height="176"
          rx="6"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        {/* Phone Notch & Header */}
        <line
          x1="52"
          y1="30"
          x2="92"
          y2="30"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        {/* Product Card */}
        <rect
          x="36"
          y="46"
          width="72"
          height="54"
          stroke="var(--accent)"
          strokeWidth="1.2"
        />
        {/* Product rows */}
        <line
          x1="36"
          y1="112"
          x2="108"
          y2="112"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        {/* Add to Cart button */}
        <rect
          x="36"
          y="126"
          width="72"
          height="18"
          fill="var(--accent)"
          fillOpacity="0.15"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <line
          x1="48"
          y1="135"
          x2="96"
          y2="135"
          stroke="var(--accent)"
          strokeWidth="1"
        />

        {/* Central Docker / FastAPI Hub */}
        <circle
          cx="158"
          cy="110"
          r="22"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text
          x="142"
          y="113"
          fill="var(--accent)"
          fontSize="8"
          fontFamily="monospace"
        >
          FastAPI
        </text>
        <line
          x1="120"
          y1="110"
          x2="136"
          y2="110"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <line
          x1="180"
          y1="110"
          x2="196"
          y2="110"
          stroke="var(--accent)"
          strokeWidth="1"
        />

        {/* Next.js Admin Web Dashboard */}
        <rect
          x="196"
          y="32"
          width="144"
          height="156"
          rx="3"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        {/* Admin Header Bar */}
        <line
          x1="196"
          y1="56"
          x2="340"
          y2="56"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <circle cx="206" cy="44" r="2.5" fill="currentColor" fillOpacity="0.4" />
        <circle cx="215" cy="44" r="2.5" fill="currentColor" fillOpacity="0.4" />
        <circle cx="224" cy="44" r="2.5" fill="currentColor" fillOpacity="0.4" />
        {/* Admin Sidebar */}
        <line
          x1="240"
          y1="56"
          x2="240"
          y2="188"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
        {/* Inventory Table Rows */}
        <rect
          x="248"
          y="66"
          width="84"
          height="22"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <rect
          x="248"
          y="96"
          width="84"
          height="22"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <rect
          x="248"
          y="126"
          width="84"
          height="22"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <rect
          x="248"
          y="156"
          width="84"
          height="20"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
      </svg>
    );
  }

  // 3. Daily Flow — Habit & Routine Tracker
  if (slug === "daily-flow") {
    return (
      <svg
        viewBox="0 0 360 220"
        className="w-full h-full max-h-[76%] max-w-[82%] mx-auto"
        fill="none"
        aria-hidden="true"
      >
        {/* Mobile Device Outline */}
        <rect
          x="40"
          y="20"
          width="110"
          height="180"
          rx="6"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        {/* Routine Header */}
        <line
          x1="56"
          y1="36"
          x2="100"
          y2="36"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        {/* 7-Day Streak Pills */}
        <circle cx="56" cy="56" r="4" fill="var(--accent)" />
        <circle cx="70" cy="56" r="4" fill="var(--accent)" />
        <circle cx="84" cy="56" r="4" fill="var(--accent)" />
        <circle cx="98" cy="56" r="4" fill="var(--accent)" />
        <circle cx="112" cy="56" r="4" fill="var(--accent)" />
        <circle cx="126" cy="56" r="4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="140" cy="56" r="4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />

        {/* Habit Cards */}
        <rect
          x="52"
          y="74"
          width="86"
          height="26"
          rx="2"
          stroke="var(--accent)"
          strokeWidth="1"
          fill="var(--accent)"
          fillOpacity="0.1"
        />
        <circle cx="64" cy="87" r="4" fill="var(--accent)" />
        <line x1="74" y1="87" x2="128" y2="87" stroke="var(--accent)" strokeWidth="1.2" />

        <rect
          x="52"
          y="108"
          width="86"
          height="26"
          rx="2"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <circle cx="64" cy="121" r="4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
        <line x1="74" y1="121" x2="120" y2="121" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />

        <rect
          x="52"
          y="142"
          width="86"
          height="26"
          rx="2"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <circle cx="64" cy="155" r="4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
        <line x1="74" y1="155" x2="114" y2="155" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />

        {/* Offline-First SQLite Cylinder Schematic on the Right */}
        <g transform="translate(180, 40)">
          <text x="18" y="10" fill="currentColor" fontSize="10" fontFamily="monospace" fillOpacity="0.8">
            OFFLINE PERSISTENCE
          </text>
          {/* SQLite Database Cylinder */}
          <ellipse cx="70" cy="40" rx="42" ry="14" stroke="var(--accent)" strokeWidth="1.2" />
          <path
            d="M28 40 V86 C28 94, 112 94, 112 86 V40"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <path
            d="M28 63 C28 71, 112 71, 112 63"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <text x="50" y="70" fill="var(--accent)" fontSize="9" fontFamily="monospace">
            SQLite
          </text>

          {/* Sync arrows */}
          <path
            d="M-15 70 C0 70, 10 70, 20 70"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle cx="20" cy="70" r="3" fill="var(--accent)" />

          {/* Local notification badge */}
          <rect
            x="20"
            y="114"
            width="100"
            height="26"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <text x="28" y="130" fill="currentColor" fontSize="8" fontFamily="monospace" fillOpacity="0.7">
            ALARM NOTIFICATION
          </text>
        </g>
      </svg>
    );
  }

  // 4. Coffee & Milk Tea Shop POS System
  if (slug === "tea-pos-system") {
    return (
      <svg
        viewBox="0 0 360 220"
        className="w-full h-full max-h-[76%] max-w-[82%] mx-auto"
        fill="none"
        aria-hidden="true"
      >
        {/* POS Cashier Screen */}
        <rect
          x="30"
          y="28"
          width="190"
          height="145"
          rx="4"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        {/* Screen Stand */}
        <path d="M100 173 L90 200 H160 L150 173" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
        <line x1="80" y1="200" x2="170" y2="200" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />

        {/* Beverage Items Grid on Screen */}
        {/* Item 1 - Selected Cup */}
        <rect
          x="42"
          y="40"
          width="46"
          height="46"
          rx="2"
          stroke="var(--accent)"
          strokeWidth="1.2"
          fill="var(--accent)"
          fillOpacity="0.1"
        />
        {/* Milk Tea Cup Shape */}
        <path
          d="M56 48 L58 72 H72 L74 48 Z"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <line x1="65" y1="44" x2="65" y2="52" stroke="var(--accent)" strokeWidth="1" />

        {/* Item 2 */}
        <rect
          x="94"
          y="40"
          width="46"
          height="46"
          rx="2"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <path d="M108 50 L110 72 H124 L126 50 Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />

        {/* Item 3 */}
        <rect
          x="146"
          y="40"
          width="46"
          height="46"
          rx="2"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <path d="M160 50 L162 72 H176 L178 50 Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />

        {/* Customization Options Bar (Sweetness / Ice / Toppings) */}
        <rect
          x="42"
          y="94"
          width="150"
          height="22"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <text x="48" y="108" fill="currentColor" fontSize="7.5" fontFamily="monospace" fillOpacity="0.7">
          OPT: SWEET 50% · ICE 70% · BOBA
        </text>

        {/* Checkout Button */}
        <rect
          x="42"
          y="124"
          width="150"
          height="20"
          fill="var(--accent)"
          fillOpacity="0.2"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <text x="82" y="138" fill="var(--accent)" fontSize="8.5" fontFamily="monospace">
          CHARGE &middot; $4.50
        </text>

        {/* Printed Receipt Tape on the Right */}
        <g transform="translate(245, 20)">
          <path
            d="M0 0 H85 V175 L75 168 L65 175 L55 168 L45 175 L35 168 L25 175 L15 168 L5 175 L0 168 Z"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1"
            fill="var(--bg)"
          />
          <line x1="12" y1="20" x2="73" y2="20" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="12" y1="36" x2="55" y2="36" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="60" y1="36" x2="73" y2="36" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
          <line x1="12" y1="52" x2="45" y2="52" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="60" y1="52" x2="73" y2="52" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
          <line x1="12" y1="68" x2="73" y2="68" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="12" y1="84" x2="35" y2="84" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="50" y1="84" x2="73" y2="84" stroke="var(--accent)" strokeWidth="1.5" />

          {/* Barcode */}
          <line x1="16" y1="110" x2="16" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
          <line x1="20" y1="110" x2="20" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" />
          <line x1="24" y1="110" x2="24" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2.5" />
          <line x1="30" y1="110" x2="30" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" />
          <line x1="34" y1="110" x2="34" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
          <line x1="38" y1="110" x2="38" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" />
          <line x1="44" y1="110" x2="44" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" />
          <line x1="50" y1="110" x2="50" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" />
          <line x1="56" y1="110" x2="56" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
          <line x1="62" y1="110" x2="62" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" />
          <line x1="68" y1="110" x2="68" y2="135" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" />
        </g>
      </svg>
    );
  }

  // Fallback
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-full max-h-[76%] max-w-[82%] mx-auto"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="72"
        cy="110"
        r="24"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <circle
        cx="180"
        cy="60"
        r="20"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <circle
        cx="180"
        cy="160"
        r="20"
        stroke="var(--accent)"
        strokeWidth="1.2"
      />
      <circle
        cx="288"
        cy="110"
        r="28"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <line
        x1="96"
        y1="101"
        x2="160"
        y2="67"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <line
        x1="96"
        y1="119"
        x2="160"
        y2="153"
        stroke="var(--accent)"
        strokeWidth="1.2"
      />
      <line
        x1="200"
        y1="67"
        x2="260"
        y2="99"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <line
        x1="200"
        y1="153"
        x2="260"
        y2="121"
        stroke="var(--accent)"
        strokeWidth="1.2"
      />
      <circle cx="288" cy="110" r="4.5" fill="var(--accent)" />
    </svg>
  );
}

export function ProjectCoverVisual({
  project,
  index = 0,
  className,
  imageClassName,
  compact = false,
}: {
  project: Project;
  index?: number;
  className?: string;
  imageClassName?: string;
  compact?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-surface select-none",
        className
      )}
    >
      {/* Editorial Gradient & Architectural Schematic Fallback Placeholder */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between bg-gradient-to-br p-4 sm:p-6 text-foreground transition-transform duration-700 ease-editorial",
          project.accentColor || "from-neutral-500/15 via-neutral-500/5 to-transparent",
          imageClassName
        )}
      >
        {/* Top Plate Meta Bar */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800/80 pb-2.5 text-[10px] font-mono uppercase tracking-widest text-muted">
          <span>Plate {formattedIndex}</span>
          <span className="truncate max-w-[65%]">{project.category}</span>
        </div>

        {/* Center Schematic Diagram */}
        <div className="my-auto flex items-center justify-center py-2">
          <SchematicIllustration slug={project.slug} />
        </div>

        {/* Bottom Caption Bar */}
        {!compact && (
          <div className="flex items-center justify-between border-t border-neutral-200/80 dark:border-neutral-800/80 pt-2.5 text-[10px] font-mono uppercase tracking-widest text-muted">
            <span className="truncate max-w-[75%]">
              {project.techStack.slice(0, 3).join(" · ")}
            </span>
            <span>{project.year}</span>
          </div>
        )}
      </div>

      {/* Actual Cover Image (renders seamlessly when file exists) */}
      {project.image && !failed && (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "object-cover transition-all duration-700 ease-editorial",
            loaded ? "opacity-100" : "opacity-0 pointer-events-none",
            imageClassName
          )}
        />
      )}
    </div>
  );
}
