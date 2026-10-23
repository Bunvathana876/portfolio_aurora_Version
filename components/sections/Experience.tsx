"use client";

import React from "react";
import { siteData } from "@/data/site";
import { FadeIn } from "@/components/ui/SectionTransition";

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-[1320px] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <FadeIn className="mb-12 sm:mb-16">
        <p className="editorial-label mb-3">04 / Experience</p>
        <h2 className="font-serif project-title-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.04] tracking-[-0.025em] text-foreground">
          Selected <em className="italic">chronology.</em>
        </h2>
      </FadeIn>

      <div className="border-t border-b border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800">
        {siteData.timeline.map((item, idx) => (
          <FadeIn
            key={`${item.role}-${idx}`}
            delay={idx * 0.05}
            className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-x-8 items-baseline"
          >
            {/* Left: Date */}
            <div className="md:col-span-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted tabular-nums">
                {item.period}
              </span>
            </div>

            {/* Middle: Role & Company / Organization */}
            <div className="md:col-span-4">
              <h3 className="font-serif text-xl sm:text-2xl leading-snug text-foreground">
                {item.role}
              </h3>
              <p className="text-xs uppercase tracking-widest text-muted mt-0.5">
                {item.organization}
              </p>
            </div>

            {/* Right: One-Line Description */}
            <div className="md:col-span-5">
              <p className="text-sm text-muted leading-relaxed md:truncate" title={item.description}>
                {item.highlights?.[0] || item.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
