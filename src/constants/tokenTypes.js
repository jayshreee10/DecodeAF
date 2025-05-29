export const TOKEN_TYPES = {
  JWT: 'JWT',
  BASE64: 'Base64',
  URL_ENCODED: 'URL Encoded',
  HEXADECIMAL: 'Hexadecimal',
  UNKNOWN: 'Unknown'
};

export const TOKEN_TYPE_COLORS = {
  [TOKEN_TYPES.JWT]: 'bg-green-100 text-green-800',
  [TOKEN_TYPES.BASE64]: 'bg-blue-100 text-blue-800',
  [TOKEN_TYPES.URL_ENCODED]: 'bg-purple-100 text-purple-800',
  [TOKEN_TYPES.HEXADECIMAL]: 'bg-orange-100 text-orange-800',
  [TOKEN_TYPES.UNKNOWN]: 'bg-gray-100 text-gray-800'
};

export const MODES = {
  DECODE: 'decode',
  ENCODE: 'encode'
};

export const ENCODE_TARGETS = [
  { value: TOKEN_TYPES.JWT, label: 'JWT Token' },
  { value: TOKEN_TYPES.BASE64, label: 'Base64' },
  { value: TOKEN_TYPES.URL_ENCODED, label: 'URL Encoded' },
  { value: TOKEN_TYPES.HEXADECIMAL, label: 'Hexadecimal' }
];