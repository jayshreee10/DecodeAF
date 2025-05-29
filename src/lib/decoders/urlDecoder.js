import { safeJSONParse } from '../utils';

export const decodeURL = (token) => {
  const decoded = decodeURIComponent(token);
  const parsed = safeJSONParse(decoded);
  
  return {
    decoded: parsed.data,
    raw: decoded,
    isJSON: parsed.isJSON
  };
};