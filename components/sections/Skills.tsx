import React from "react";
import { Check, Globe, Layers, Sparkles } from "lucide-react";
import { siteData } from "@/data/site";
import { FadeIn } from "@/components/ui/SectionTransition";

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-[1320px] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      {/* Section Header */}
      <FadeIn className="mb-12 sm:mb-16">
        <p className="editorial-label mb-3">02 / Capabilities</p>
        <h2 className="font-serif project-title-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.04] tracking-[-0.025em] text-foreground">
          Technical &amp; Core <em className="italic">competencies.</em>
        </h2>
        <p className="editorial-prose text-muted mt-4 max-w-2xl">
          A verified breakdown of cross-platform mobile engineering, modern web architectures,
          relational databases, professional workflow traits, and spoken languages.
        </p>
      </FadeIn>

      {/* 4 Technical Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 sm:gap-y-12 border-t border-neutral-200 dark:border-neutral-800 pt-8 sm:pt-10">
        {siteData.skills.map((column, idx) => (
          <FadeIn key={column.heading} delay={idx * 0.05}>
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs uppercase tracking-widest text-muted">
                {column.heading}
              </h3>
              <span className="font-mono text-[10px] text-muted/70">
                0{idx + 1}
              </span>
            </div>
            <ul className="space-y-3">
              {column.items.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2.5 text-sm sm:text-base text-foreground/90 leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-accent/70 shrink-0 self-center"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>

      {/* Secondary Skills Block: Core Skills, Personal Traits & Spoken Languages */}
      <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Core Professional Skills (5 cols) */}
        <FadeIn delay={0.15} className="md:col-span-5 lg:col-span-5 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <h3 className="text-xs uppercase tracking-widest text-foreground font-medium">
              Core Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {siteData.coreSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-surface/70 text-xs font-mono text-foreground"
              >
                <span className="text-accent">&rsaquo;</span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Personal Traits (4 cols) */}
        <FadeIn delay={0.2} className="md:col-span-4 lg:col-span-4 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <h3 className="text-xs uppercase tracking-widest text-foreground font-medium">
              Personal Traits
            </h3>
          </div>
          <ul className="space-y-2.5">
            {siteData.personalTraits.map((trait) => (
              <li
                key={trait}
                className="flex items-center gap-2 text-xs sm:text-sm text-foreground/90 font-mono"
              >
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{trait}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Spoken Languages (3 cols) */}
        <FadeIn delay={0.25} className="md:col-span-3 lg:col-span-3 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <Globe className="w-3.5 h-3.5 text-accent" />
            <h3 className="text-xs uppercase tracking-widest text-foreground font-medium">
              Languages
            </h3>
          </div>
          <div className="space-y-3">
            {siteData.languages.map((lang) => (
              <div
                key={lang.language}
                className="flex items-center justify-between p-3 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-surface/40"
              >
                <span className="text-sm font-medium text-foreground">
                  {lang.language}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-foreground/10 text-foreground">
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
