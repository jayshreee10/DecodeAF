import { TOKEN_TYPES } from '../constants/tokenTypes';

export const detectTokenType = (token) => {
  if (!token || typeof token !== 'string') return TOKEN_TYPES.UNKNOWN;
  
  const trimmedToken = token.trim();
  
  // JWT pattern (3 parts separated by dots)
  if (trimmedToken.split('.').length === 3) {
    return TOKEN_TYPES.JWT;
  }
  
  // Base64 pattern
  if (/^[A-Za-z0-9+/]*={0,2}$/.test(trimmedToken)) {
    return TOKEN_TYPES.BASE64;
  }
  
  // URL encoded
  if (trimmedToken.includes('%') && decodeURIComponent(trimmedToken) !== trimmedToken) {
    return TOKEN_TYPES.URL_ENCODED;
  }
  
  // Hex pattern
  if (/^[0-9a-fA-F]+$/.test(trimmedToken) && trimmedToken.length % 2 === 0) {
    return TOKEN_TYPES.HEXADECIMAL;
  }
  
  return TOKEN_TYPES.UNKNOWN;
};