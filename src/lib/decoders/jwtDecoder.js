import { safeBase64Decode, safeJSONParse } from '../utils';

export const decodeJWT = (token) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  const [headerB64, payloadB64, signature] = parts;
  
  const headerStr = safeBase64Decode(headerB64);
  const payloadStr = safeBase64Decode(payloadB64);
  
  const header = safeJSONParse(headerStr);
  const payload = safeJSONParse(payloadStr);
  
  if (!header.isJSON || !payload.isJSON) {
    throw new Error('JWT header or payload is not valid JSON');
  }
  
  return {
    header: header.data,
    payload: payload.data,
    signature,
    raw: {
      header: headerB64,
      payload: payloadB64,
      signature
    }
  };
};

export const verifyJWTSignature = async (token, secret) => {
  if (!secret) return null;
  
  try {
    // Simple verification - in production, use a proper JWT library
    const [header, payload] = token.split('.');
    const data = `${header}.${payload}`;
    
    // This is a simplified version - use jsonwebtoken library for production
    const crypto = await import('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    const signature = hmac.digest('base64url');
    
    return signature === token.split('.')[2];
  } catch (e) {
    return false;
  }
};