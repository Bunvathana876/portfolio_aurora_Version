"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js Global Root Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#0F0F0E] text-[#EDEAE3] font-sans">
        <p className="text-xs uppercase tracking-[0.2em] text-[#E56350] mb-3">
          Fatal Error
        </p>
        <h2 className="text-3xl font-serif mb-4">Something went wrong</h2>
        <p className="text-sm text-[#A8A69E] mb-8 max-w-md">
          A critical system error prevented this page from rendering.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#EDEAE3] text-[#0F0F0E] rounded-full hover:bg-white transition-colors"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}

