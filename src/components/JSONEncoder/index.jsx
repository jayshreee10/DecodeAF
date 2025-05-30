"use client";

import { AlertCircle, ArrowRight, RotateCcw, Terminal, Cpu, Key, ScanEye, Binary, Code2 } from 'lucide-react';
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
    <div className="space-y-8 font-mono">
      <Card className="bg-black border-2 border-green-400 rounded-lg shadow-lg shadow-green-400/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Binary className="h-6 w-6 text-green-400 animate-pulse" />
            <span className="blink">[ROOT@ENCODER ~]$ JSON_TO_TOKEN</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Format Selector - Hacker Style */}
          <FormatSelector 
            targetFormat={targetFormat} 
            setTargetFormat={setTargetFormat} 
          />

          {/* Input Section - Cyberpunk Style */}
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

          {/* Action Buttons - Hacker Terminal */}
          <div className="flex gap-4">
            <Button 
              onClick={encodeJSON} 
              disabled={loading}
              className={`flex items-center gap-2 ${
                loading 
                  ? "bg-green-900 text-green-300 border-green-400" 
                  : "bg-green-800 hover:bg-green-700 text-green-400 border-green-400"
              } border-2 font-mono`}
            >
              {loading ? (
                <>
                  <span className="blink">$ ENCRYPTING...</span>
                  <Cpu className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <span>$ GENERATE_TOKEN</span>
                  <Code2 className="h-4 w-4" />
                </>
              )}
            </Button>
            
            <Button 
              onClick={clearAll} 
              variant="outline"
              className="flex items-center gap-2 bg-black text-red-400 border-red-400 hover:bg-gray-900 font-mono border-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>$ CLEAR_ALL</span>
            </Button>
          </div>

          {/* Error Display - CRT Glitch Style */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-black border-2 border-red-400 rounded-lg text-red-400 font-mono">
              <AlertCircle className="h-5 w-5 animate-pulse" />
              <span className="blink">{'>>'} ERROR: {error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output Section - Hacker Terminal */}
      {encodedResult && (
        <EncodedOutput result={encodedResult} format={targetFormat} />
      )}
    </div>
  );
};