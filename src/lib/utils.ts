import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single className string.
 * This utility merges Tailwind CSS classes properly, handling conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}