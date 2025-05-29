"use client";
import { useState, useEffect } from 'react';
import { detectTokenType } from '../lib/tokenDetector';
import { decodeJWT, verifyJWTSignature } from '../lib/decoders/jwtDecoder';
import { decodeBase64 } from '../lib/decoders/base64Decoder';
import { decodeURL } from '../lib/decoders/urlDecoder';
import { decodeHex } from '../lib/decoders/hexDecoder';
import { TOKEN_TYPES } from '../constants/tokenTypes';

export const useTokenDecoder = () => {
  const [token, setToken] = useState('');
  const [tokenType, setTokenType] = useState('');
  const [decodedData, setDecodedData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [signatureValid, setSignatureValid] = useState(null);

  const decodeToken = async (inputToken) => {
    if (!inputToken.trim()) {
      setDecodedData(null);
      setTokenType('');
      setError('');
      setSignatureValid(null);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const type = detectTokenType(inputToken);
      setTokenType(type);

      let result = null;

      switch (type) {
        case TOKEN_TYPES.JWT:
          result = decodeJWT(inputToken);
          if (secretKey) {
            const isValid = await verifyJWTSignature(inputToken, secretKey);
            setSignatureValid(isValid);
          }
          break;
        case TOKEN_TYPES.BASE64:
          result = decodeBase64(inputToken);
          break;
        case TOKEN_TYPES.URL_ENCODED:
          result = decodeURL(inputToken);
          break;
        case TOKEN_TYPES.HEXADECIMAL:
          result = decodeHex(inputToken);
          break;
        default:
          throw new Error('Unsupported token type');
      }

      setDecodedData(result);
    } catch (err) {
      setError(err.message);
      setDecodedData(null);
      setSignatureValid(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    decodeToken(token);
  }, [token, secretKey]);

  return {
    token,
    setToken,
    tokenType,
    decodedData,
    error,
    loading,
    secretKey,
    setSecretKey,
    signatureValid,
    decodeToken
  };
};