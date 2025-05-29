"use client";

export const encodeToHex = (data) => {
  try {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
    return jsonString
      .split('')
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    throw new Error(`Hex encoding failed: ${error.message}`);
  }
};