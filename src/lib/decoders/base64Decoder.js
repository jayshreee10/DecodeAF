import { safeBase64Decode, safeJSONParse } from '../utils';

export const decodeBase64 = (token) => {
  const decoded = safeBase64Decode(token);
  const parsed = safeJSONParse(decoded);
  
  return {
    decoded: parsed.data,
    raw: decoded,
    isJSON: parsed.isJSON
  };
};