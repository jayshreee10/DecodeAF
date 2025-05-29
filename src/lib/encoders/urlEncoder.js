"use client";

export const encodeToURL = (data) => {
  try {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
    return encodeURIComponent(jsonString);
  } catch (error) {
    throw new Error(`URL encoding failed: ${error.message}`);
  }
};