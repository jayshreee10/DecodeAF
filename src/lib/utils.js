import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const safeBase64Decode = (str) => {
  try {
    const padded = str + '='.repeat((4 - str.length % 4) % 4);
    return atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
  } catch (e) {
    throw new Error('Invalid Base64 encoding');
  }
};

export const safeJSONParse = (str) => {
  try {
    return { data: JSON.parse(str), isJSON: true };
  } catch {
    return { data: str, isJSON: false };
  }
};

export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  return new Date(timestamp * 1000).toLocaleString();
};