"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { siteData } from "@/data/site";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Next.js App Router Error:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <p className="editorial-label text-xs uppercase tracking-[0.2em] text-accent mb-4">
        Application Error
      </p>
      <h1 className="font-serif text-3xl sm:text-5xl text-foreground mb-4">
        Something went wrong
      </h1>
      <p className="max-w-md text-sm text-muted leading-relaxed mb-8">
        An unexpected error occurred while rendering the page. Click below to
        reload or return to the main overview.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="editorial-link text-xs uppercase tracking-[0.16em] text-foreground border border-border px-5 py-2.5 rounded-full hover:border-foreground transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="editorial-link text-xs uppercase tracking-[0.16em] text-muted hover:text-foreground"
        >
          Return to {siteData.name} Overview &rarr;
        </Link>
      </div>
    </main>
  );
}

