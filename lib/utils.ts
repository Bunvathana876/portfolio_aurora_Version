import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidLiveUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed !== "" && trimmed !== "#";
}
