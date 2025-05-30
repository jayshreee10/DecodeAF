"use client";

import { AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { useJSONEncoder } from '../../hooks/useJSONEncoder';
import { JSONInput } from './JSONInput';
import { EncodedOutput } from './EncodedOutput';
import { FormatSelector } from './FormatSelector';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { TOKEN_TYPES } from '../../constants/tokenTypes';

export const JSONEncoder = () => {
  const {
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
  } = useJSONEncoder();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2  ">
            <ArrowRight className="h-6 w-6 text-blue-600" />
            JSON to Token Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Format Selector */}
          <FormatSelector 
            targetFormat={targetFormat} 
            setTargetFormat={setTargetFormat} 
          />

          {/* Input Section */}
          <JSONInput
            jsonInput={jsonInput}
            setJsonInput={setJsonInput}
            jwtHeader={jwtHeader}
            setJwtHeader={setJwtHeader}
            jwtPayload={jwtPayload}
            setJwtPayload={setJwtPayload}
            secretKey={secretKey}
            setSecretKey={setSecretKey}
            targetFormat={targetFormat}
          />

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={encodeJSON} 
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? 'Encoding...' : 'Generate Token'}
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={clearAll} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Clear All
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output Section */}
      {encodedResult && (
        <EncodedOutput result={encodedResult} format={targetFormat} />
      )}
    </div>
  );
};