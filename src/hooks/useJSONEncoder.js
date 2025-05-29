"use client";

import { useState } from 'react';
import { createJWT } from '../lib/encoders/jwtEncoder';
import { encodeToBase64 } from '../lib/encoders/base64Encoder';
import { encodeToURL } from '../lib/encoders/urlEncoder';
import { encodeToHex } from '../lib/encoders/hexEncoder';
import { TOKEN_TYPES } from '../constants/tokenTypes';

export const useJSONEncoder = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jwtHeader, setJwtHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [jwtPayload, setJwtPayload] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [targetFormat, setTargetFormat] = useState(TOKEN_TYPES.BASE64);
  const [encodedResult, setEncodedResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const encodeJSON = async () => {
    if (!jsonInput.trim() && !jwtPayload.trim()) {
      setError('Please provide JSON input');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let result = '';
      
      switch (targetFormat) {
        case TOKEN_TYPES.JWT:
          if (!jwtPayload.trim()) {
            throw new Error('JWT payload is required');
          }
          result = createJWT(jwtHeader, jwtPayload, secretKey);
          break;
          
        case TOKEN_TYPES.BASE64:
          result = encodeToBase64(jsonInput || jwtPayload);
          break;
          
        case TOKEN_TYPES.URL_ENCODED:
          result = encodeToURL(jsonInput || jwtPayload);
          break;
          
        case TOKEN_TYPES.HEXADECIMAL:
          result = encodeToHex(jsonInput || jwtPayload);
          break;
          
        default:
          throw new Error('Unsupported encoding format');
      }
      
      setEncodedResult(result);
    } catch (err) {
      setError(err.message);
      setEncodedResult('');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setJsonInput('');
    setJwtHeader('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
    setJwtPayload('');
    setSecretKey('');
    setEncodedResult('');
    setError('');
  };

  return {
    jsonInput,
    setJsonInput,
    jwtHeader,
    setJwtHeader,
    jwtPayload,
    setJwtPayload,
    secretKey,
    setSecretKey,
    targetFormat,
    setTargetFormat,
    encodedResult,
    error,
    loading,
    encodeJSON,
    clearAll
  };
};