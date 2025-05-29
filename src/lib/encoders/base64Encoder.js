"use client";

export const encodeToBase64 = (data) => {
  try {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    return btoa(jsonString);
  } catch (error) {
    throw new Error(`Base64 encoding failed: ${error.message}`);
  }
};

export const encodeToBase64URL = (data) => {
  try {
    const base64 = encodeToBase64(data);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (error) {
    throw new Error(`Base64URL encoding failed: ${error.message}`);
  }
};