import { safeJSONParse } from '../utils';

export const decodeHex = (token) => {
  const decoded = token.match(/.{1,2}/g)
    ?.map(byte => String.fromCharCode(parseInt(byte, 16)))
    .join('') || '';
  
  const parsed = safeJSONParse(decoded);
  
  return {
    decoded: parsed.data,
    raw: decoded,
    isJSON: parsed.isJSON
  };
};