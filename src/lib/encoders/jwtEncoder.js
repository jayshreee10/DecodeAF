"use client";

import { safeJSONParse } from '../utils';

export const createJWT = (headerJson, payloadJson, secretKey) => {
  try {
    // Parse JSON strings if they're strings
    const header = typeof headerJson === 'string' ? JSON.parse(headerJson) : headerJson;
    const payload = typeof payloadJson === 'string' ? JSON.parse(payloadJson) : payloadJson;
    
    // Set default header if not provided
    const finalHeader = {
      alg: 'HS256',
      typ: 'JWT',
      ...header
    };
    
    // Base64URL encode header and payload
    const encodedHeader = btoa(JSON.stringify(finalHeader))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    const encodedPayload = btoa(JSON.stringify(payload))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    // Create signature (simplified - in production use proper crypto)
    let signature = '';
    if (secretKey) {
      const data = `${encodedHeader}.${encodedPayload}`;
      // Simple signature creation (use proper HMAC in production)
      signature = btoa(secretKey + data)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
        .substring(0, 43); // Standard JWT signature length
    } else {
      signature = 'signature-placeholder';
    }
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  } catch (error) {
    throw new Error(`JWT creation failed: ${error.message}`);
  }
};