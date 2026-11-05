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
        viewBox="0 0 380 210"
        className="w-full h-full max-h-[82%] max-w-[90%] mx-auto"
        fill="none"
        aria-hidden="true"
      >
        {/* Left Node: Symptom Input (Khmer & English) */}
        <rect
          x="16"
          y="36"
          width="112"
          height="138"
          rx="10"
          fill="var(--surface)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <rect
          x="28"
          y="50"
          width="88"
          height="22"
          rx="5"
          fill="var(--accent-muted)"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <text
          x="36"
          y="64"
          fill="var(--accent)"
          fontSize="8.5"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
        >
          LEAF SYMPTOMS
        </text>
        <text
          x="28"
          y="92"
          fill="var(--fg)"
          fontSize="8.5"
          fontFamily="ui-monospace, monospace"
        >
          • Yellowing Leaf
        </text>
        <text
          x="28"
          y="110"
          fill="var(--fg)"
          fontSize="8.5"
          fontFamily="ui-monospace, monospace"
        >
          • Dark Stem Lesions
        </text>
        <text
          x="28"
          y="128"
          fill="var(--fg)"
          fontSize="8.5"
          fontFamily="ui-monospace, monospace"
        >
          • Spore Rust Layer
        </text>
        <rect
          x="28"
          y="142"
          width="88"
          height="18"
          rx="4"
          fill="var(--bg)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="37"
          y="154"
          fill="var(--muted)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          LANG: KHMER / EN
        </text>

        {/* Center Node: Rule-Based Inference Engine */}
        <line
          x1="128"
          y1="105"
          x2="152"
          y2="105"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle cx="140" cy="105" r="3" fill="var(--accent)" />

        <rect
          x="152"
          y="52"
          width="96"
          height="106"
          rx="10"
          fill="var(--accent-muted)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <text
          x="166"
          y="78"
          fill="var(--accent)"
          fontSize="9"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
        >
          FASTAPI ENGINE
        </text>
        <text
          x="164"
          y="98"
          fill="var(--fg)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          IF-THEN Rules
        </text>
        <text
          x="164"
          y="114"
          fill="var(--fg)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          PostgreSQL DB
        </text>
        <text
          x="164"
          y="130"
          fill="var(--fg)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          REST Endpoint
        </text>

        {/* Right Node: Diagnosis & Treatment Output */}
        <line
          x1="248"
          y1="105"
          x2="270"
          y2="105"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle cx="259" cy="105" r="3" fill="#10B981" />

        <rect
          x="270"
          y="36"
          width="94"
          height="138"
          rx="10"
          fill="var(--surface)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <rect
          x="280"
          y="50"
          width="74"
          height="20"
          rx="4"
          fill="rgba(16, 185, 129, 0.14)"
          stroke="#10B981"
          strokeWidth="1"
        />
        <text
          x="290"
          y="63"
          fill="#10B981"
          fontSize="8"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
        >
          DIAGNOSIS OK
        </text>
        <text
          x="280"
          y="90"
          fill="var(--fg)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          Disease Match
        </text>
        <text
          x="280"
          y="108"
          fill="var(--muted)"
          fontSize="7.5"
          fontFamily="ui-monospace, monospace"
        >
          + Treatment Plan
        </text>
        <text
          x="280"
          y="124"
          fill="var(--muted)"
          fontSize="7.5"
          fontFamily="ui-monospace, monospace"
        >
          + Prevention Guide
        </text>
        <text
          x="280"
          y="148"
          fill="var(--accent)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          React UI Output
        </text>
      </svg>
    );
  }

  // 2. Full-Stack Dual-Client E-Commerce Platform
  if (slug === "dual-client-ecommerce" || slug === "shop-panda") {
    return (
      <svg
        viewBox="0 0 380 210"
        className="w-full h-full max-h-[82%] max-w-[90%] mx-auto"
        fill="none"
        aria-hidden="true"
      >
        {/* Left: Flutter Mobile Shopping App */}
        <rect
          x="18"
          y="22"
          width="98"
          height="166"
          rx="10"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <text
          x="30"
          y="42"
          fill="var(--accent)"
          fontSize="8.5"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
        >
          FLUTTER APP
        </text>
        <rect
          x="28"
          y="52"
          width="78"
          height="46"
          rx="5"
          fill="var(--accent-muted)"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <text
          x="36"
          y="74"
          fill="var(--fg)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          Product Catalog
        </text>
        <text
          x="36"
          y="87"
          fill="var(--muted)"
          fontSize="7.5"
          fontFamily="ui-monospace, monospace"
        >
          Cart &amp; Checkout
        </text>
        <rect
          x="28"
          y="108"
          width="78"
          height="22"
          rx="4"
          fill="var(--bg)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="36"
          y="122"
          fill="var(--fg)"
          fontSize="7.5"
          fontFamily="ui-monospace, monospace"
        >
          Order Tracking
        </text>
        <rect
          x="28"
          y="140"
          width="78"
          height="24"
          rx="5"
          fill="var(--accent)"
        />
        <text
          x="42"
          y="155"
          fill="#FFFFFF"
          fontSize="8"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
        >
          PLACE ORDER
        </text>

        {/* Center: FastAPI + Docker Hub */}
        <line
          x1="116"
          y1="105"
          x2="142"
          y2="105"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <rect
          x="142"
          y="64"
          width="82"
          height="82"
          rx="12"
          fill="var(--surface)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <text
          x="155"
          y="92"
          fill="var(--accent)"
          fontSize="9"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
        >
          FastAPI
        </text>
        <text
          x="151"
          y="108"
          fill="var(--fg)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          PostgreSQL
        </text>
        <text
          x="155"
          y="124"
          fill="#10B981"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          Dockerized
        </text>
        <line
          x1="224"
          y1="105"
          x2="246"
          y2="105"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />

        {/* Right: Next.js Admin Dashboard */}
        <rect
          x="246"
          y="28"
          width="118"
          height="154"
          rx="10"
          fill="var(--surface)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <text
          x="258"
          y="48"
          fill="var(--fg)"
          fontSize="8.5"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
        >
          NEXT.JS ADMIN
        </text>
        <line
          x1="246"
          y1="56"
          x2="364"
          y2="56"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <rect
          x="258"
          y="68"
          width="94"
          height="26"
          rx="4"
          fill="var(--bg)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="266"
          y="84"
          fill="var(--fg)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          Inventory Control
        </text>
        <rect
          x="258"
          y="102"
          width="94"
          height="26"
          rx="4"
          fill="var(--accent-muted)"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <text
          x="266"
          y="118"
          fill="var(--accent)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          Order Fulfillment
        </text>
        <rect
          x="258"
          y="136"
          width="94"
          height="26"
          rx="4"
          fill="var(--bg)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="266"
          y="152"
          fill="var(--muted)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          Catalog Analytics
        </text>
      </svg>
    );
  }

  // 3. Daily Flow — Habit & Routine Tracker
  if (slug === "daily-flow") {
    return (
      <svg
        viewBox="0 0 380 210"
        className="w-full h-full max-h-[82%] max-w-[90%] mx-auto"
        fill="none"
        aria-hidden="true"
      >
        {/* Mobile Routine Tracker Screen */}
        <rect
          x="28"
          y="18"
          width="132"
          height="174"
          rx="12"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <text
          x="44"
          y="40"
          fill="var(--fg)"
          fontSize="9"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
        >
          DAILY FLOW APP
        </text>
        {/* 7-Day Streak Row */}
        <circle cx="48" cy="58" r="5" fill="#10B981" />
        <circle cx="63" cy="58" r="5" fill="#10B981" />
        <circle cx="78" cy="58" r="5" fill="#10B981" />
        <circle cx="93" cy="58" r="5" fill="#10B981" />
        <circle cx="108" cy="58" r="5" fill="var(--accent)" />
        <circle cx="123" cy="58" r="5" stroke="var(--border)" strokeWidth="1.2" />
        <circle cx="138" cy="58" r="5" stroke="var(--border)" strokeWidth="1.2" />

        {/* Habit Check-in Rows */}
        <rect
          x="40"
          y="74"
          width="108"
          height="28"
          rx="6"
          fill="var(--accent-muted)"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <text
          x="50"
          y="91"
          fill="var(--accent)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          ✓ Morning Study
        </text>

        <rect
          x="40"
          y="110"
          width="108"
          height="28"
          rx="6"
          fill="var(--bg)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="50"
          y="127"
          fill="var(--fg)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          ✓ Code Practice
        </text>

        <rect
          x="40"
          y="146"
          width="108"
          height="28"
          rx="6"
          fill="var(--bg)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="50"
          y="163"
          fill="var(--muted)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          ○ Evening Review
        </text>

        {/* Connector to SQLite */}
        <line
          x1="160"
          y1="105"
          x2="202"
          y2="105"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle cx="181" cy="105" r="3" fill="var(--accent)" />

        {/* Right: Offline-First SQLite & Notifications */}
        <rect
          x="202"
          y="34"
          width="150"
          height="64"
          rx="10"
          fill="var(--surface)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <text
          x="216"
          y="56"
          fill="var(--accent)"
          fontSize="9"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
        >
          OFFLINE-FIRST SQLITE
        </text>
        <text
          x="216"
          y="74"
          fill="var(--fg)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          100% Local Persistence
        </text>
        <text
          x="216"
          y="88"
          fill="var(--muted)"
          fontSize="7.5"
          fontFamily="ui-monospace, monospace"
        >
          Zero-Latency Streaks
        </text>

        <rect
          x="202"
          y="112"
          width="150"
          height="64"
          rx="10"
          fill="var(--surface)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <text
          x="216"
          y="134"
          fill="#10B981"
          fontSize="9"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
        >
          SCHEDULED REMINDERS
        </text>
        <text
          x="216"
          y="152"
          fill="var(--fg)"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          Local Push Alerts
        </text>
        <text
          x="216"
          y="166"
          fill="var(--muted)"
          fontSize="7.5"
          fontFamily="ui-monospace, monospace"
        >
          Daily Routine Prompts
        </text>
      </svg>
    );
  }

  // 4. Coffee & Milk Tea Shop POS System
  return (
    <svg
      viewBox="0 0 380 210"
      className="w-full h-full max-h-[82%] max-w-[90%] mx-auto"
      fill="none"
      aria-hidden="true"
    >
      {/* Left: Cashier POS Ordering Screen */}
      <rect
        x="20"
        y="24"
        width="200"
        height="162"
        rx="10"
        fill="var(--surface)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <text
        x="34"
        y="46"
        fill="var(--fg)"
        fontSize="9"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
      >
        CASHIER POS TERMINAL
      </text>
      {/* Drink Grid */}
      <rect
        x="34"
        y="56"
        width="52"
        height="38"
        rx="6"
        fill="var(--accent-muted)"
        stroke="var(--accent)"
        strokeWidth="1.2"
      />
      <text
        x="42"
        y="78"
        fill="var(--accent)"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        fontWeight="700"
      >
        Milk Tea
      </text>

      <rect
        x="94"
        y="56"
        width="52"
        height="38"
        rx="6"
        fill="var(--bg)"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <text
        x="106"
        y="78"
        fill="var(--fg)"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
      >
        Latte
      </text>

      <rect
        x="154"
        y="56"
        width="52"
        height="38"
        rx="6"
        fill="var(--bg)"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <text
        x="164"
        y="78"
        fill="var(--fg)"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
      >
        Matcha
      </text>

      {/* Drink Modifiers */}
      <rect
        x="34"
        y="104"
        width="172"
        height="26"
        rx="5"
        fill="var(--bg)"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <text
        x="42"
        y="120"
        fill="var(--fg)"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
      >
        Sugar: 50% · Ice: 70% · +Boba
      </text>

      {/* Checkout Button */}
      <rect
        x="34"
        y="140"
        width="172"
        height="30"
        rx="6"
        fill="var(--accent)"
      />
      <text
        x="68"
        y="158"
        fill="#FFFFFF"
        fontSize="8.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
      >
        CHECKOUT · $4.50 USD
      </text>

      {/* Right: Real-Time Receipt */}
      <rect
        x="240"
        y="24"
        width="118"
        height="162"
        rx="10"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />
      <text
        x="256"
        y="46"
        fill="var(--accent)"
        fontSize="8.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
      >
        INSTANT RECEIPT
      </text>
      <line
        x1="254"
        y1="56"
        x2="344"
        y2="56"
        stroke="var(--border)"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <text
        x="254"
        y="76"
        fill="var(--fg)"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
      >
        1x Milk Tea   $3.75
      </text>
      <text
        x="254"
        y="94"
        fill="var(--muted)"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
      >
        + Boba Pearl  $0.75
      </text>
      <text
        x="254"
        y="112"
        fill="var(--muted)"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
      >
        + 50% Sweet   $0.00
      </text>
      <line
        x1="254"
        y1="126"
        x2="344"
        y2="126"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <text
        x="254"
        y="146"
        fill="#10B981"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        fontWeight="700"
      >
        TOTAL: $4.50
      </text>
      <text
        x="254"
        y="168"
        fill="var(--muted)"
        fontSize="7.5"
        fontFamily="ui-monospace, monospace"
      >
        React · Tailwind CSS
      </text>
    </svg>
  );
}

export function ProjectCoverVisual({
  project,
  index = 0,
  className,
  imageClassName,
  compact = false,
  showSchematic = false,
}: {
  project: Project;
  index?: number;
  className?: string;
  imageClassName?: string;
  compact?: boolean;
  showSchematic?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const formattedIndex = String(index + 1).padStart(2, "0");

  if (project.image && !imageError && !showSchematic) {
    return (
      <div
        className={cn(
          "relative w-full h-full overflow-hidden bg-[#070913] select-none group",
          className
        )}
      >
        <Image
          src={project.image}
          alt={`Concept illustration for ${project.title}`}
          fill
          sizes="(max-width: 1024px) 100vw, 840px"
          className={cn(
            "object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105",
            imageClassName
          )}
          onError={() => setImageError(true)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070913]/80 via-transparent to-transparent opacity-50" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full min-h-[300px] overflow-hidden bg-[#0d1324] rounded-xl border border-white/[0.08] select-none",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-between p-4 sm:p-6 text-foreground",
          imageClassName
        )}
      >
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 font-semibold text-slate-200">
            <span className="size-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            <span>Architecture Diagram &middot; Project {formattedIndex}</span>
          </span>
          <span className="truncate max-w-[65%] text-slate-400 font-medium">
            {project.category}
          </span>
        </div>

        {/* Center Architecture Diagram */}
        <div className="my-6 flex items-center justify-center py-2 overflow-x-auto">
          <SchematicIllustration slug={project.slug} />
        </div>

        {/* Bottom Tech Bar */}
        {!compact && (
          <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs font-mono text-slate-400">
            <span className="truncate max-w-[78%] text-sky-400 font-medium">
              {project.techStack.slice(0, 4).join(" · ")}
            </span>
            <span className="text-slate-300 font-medium">{project.year}</span>
          </div>
        )}
      </div>
    </div>
  );
}
