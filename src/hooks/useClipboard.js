"use client";
import { useState } from 'react';

export const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return { copied, copyToClipboard };
};