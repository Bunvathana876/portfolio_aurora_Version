import React from "react";
import Link from "next/link";
import { siteData } from "@/data/site";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <p className="editorial-label text-xs uppercase tracking-[0.2em] text-muted mb-4">
        404 &mdash; Not Found
      </p>
      <h1 className="font-serif text-4xl sm:text-6xl text-foreground mb-6">
        This page could not be found.
      </h1>
      <p className="max-w-md text-sm text-muted leading-relaxed mb-8">
        The requested URL was not found on this portfolio. Return to the home
        overview to explore work and experience.
      </p>
      <Link
        href="/"
        className="editorial-link text-xs uppercase tracking-[0.16em] text-foreground inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-full hover:border-foreground transition-colors"
      >
        <span>&larr; Back to {siteData.name} Overview</span>
      </Link>
    </main>
  );
}

