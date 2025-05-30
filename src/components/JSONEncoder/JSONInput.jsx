"use client";

import { Eye, EyeOff, Cpu, Lock, Binary, Terminal, ScanEye } from 'lucide-react';
import { useState } from 'react';
import { Textarea, Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { TOKEN_TYPES } from '../../constants/tokenTypes';

export const JSONInput = ({
  jsonInput,
  setJsonInput,
  jwtHeader,
  setJwtHeader,
  jwtPayload,
  setJwtPayload,
  secretKey,
  setSecretKey,
  targetFormat
}) => {
  const [showSecret, setShowSecret] = useState(false);

  const sampleJSON = `{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622,
  "role": "admin"
}`;

  const loadSample = () => {
    if (targetFormat === TOKEN_TYPES.JWT) {
      setJwtPayload(sampleJSON);
    } else {
      setJsonInput(sampleJSON);
    }
  };

  return (
    <div className="space-y-4 font-mono">
      {targetFormat === TOKEN_TYPES.JWT ? (
        // JWT-specific inputs
        <div className="space-y-4">
          {/* Header Card */}
          <Card className="bg-black/90 border-2 border-cyan-400 rounded-lg shadow-lg shadow-cyan-400/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-300">
                <Binary className="h-5 w-5 text-cyan-400" />
                <span className="text-sm tracking-widest">HEADER.JSON</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={jwtHeader}
                onChange={(e) => setJwtHeader(e.target.value)}
                className="font-mono text-sm h-24 bg-black/50 text-cyan-300 border-cyan-400/50 placeholder-purple-500/70 focus:ring-1 focus:ring-cyan-400"
                placeholder={'{\n  "alg": "HS256",\n  "typ": "JWT"\n}'}
              />
            </CardContent>
          </Card>

          {/* Payload Card */}
          <Card className="bg-black/90 border-2 border-purple-400 rounded-lg shadow-lg shadow-purple-400/10 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-purple-300">
                  <Cpu className="h-5 w-5 text-purple-400" />
                  <span className="text-sm tracking-widest">PAYLOAD.JSON</span>
                </CardTitle>
                <Button 
                  onClick={loadSample} 
                  variant="outline"
                  size="sm"
                  className="bg-black/70 text-purple-300 border-purple-400 hover:bg-purple-900/50 hover:text-purple-100 transition-all"
                >
                  <span className="text-xs">LOAD_SAMPLE.JSON</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={jwtPayload}
                onChange={(e) => setJwtPayload(e.target.value)}
                className="font-mono text-sm h-32 bg-black/50 text-purple-300 border-purple-400/50 placeholder-purple-500/70 focus:ring-1 focus:ring-purple-400"
                placeholder={'{\n  "sub": "1234567890",\n  "name": "John Doe"\n}'}
              />
            </CardContent>
          </Card>

          {/* Secret Key Card */}
          <Card className="bg-black/90 border-2 border-red-400 rounded-lg shadow-lg shadow-red-400/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-300">
                <Lock className="h-5 w-5 text-red-400" />
                <span className="text-sm tracking-widest">ENCRYPTION_KEY</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Input
                  type={showSecret ? 'text' : 'password'}
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="••••••••••••••••••••••••••••••"
                  className="font-mono text-sm pr-12 bg-black/50 text-red-300 border-red-400/50 placeholder-red-500/70 focus:ring-1 focus:ring-red-400"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-red-900/50 border-red-400 text-red-300 hover:bg-red-900/70"
                >
                  {showSecret ? (
                    <ScanEye className="h-4 w-4 animate-pulse" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // General JSON input
        <Card className="bg-black/90 border-2 border-green-400 rounded-lg shadow-lg shadow-green-400/10 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-green-300">
                <Terminal className="h-5 w-5 text-green-400" />
                <span className="text-sm tracking-widest">RAW_JSON_INPUT</span>
              </CardTitle>
              <Button 
                onClick={loadSample} 
                variant="outline"
                size="sm"
                className="bg-black/70 text-green-300 border-green-400 hover:bg-green-900/50 hover:text-green-100 transition-all"
              >
                <span className="text-xs">LOAD_SAMPLE.JSON</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="font-mono text-sm h-40 bg-black/50 text-green-300 border-green-400/50 placeholder-green-500/70 focus:ring-1 focus:ring-green-400"
              placeholder={'{\n  "id": "xyz123",\n  "data": {\n    "key": "value"\n  }\n}'}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};