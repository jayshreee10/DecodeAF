"use client";

import { Eye, EyeOff, Code, Key } from 'lucide-react';
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
    <div className="space-y-4">
      {targetFormat === TOKEN_TYPES.JWT ? (
        // JWT-specific inputs
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5" />
                JWT Header
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={jwtHeader}
                onChange={(e) => setJwtHeader(e.target.value)}
                className="font-mono text-sm h-24"
                placeholder="JWT Header JSON"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  JWT Payload
                </CardTitle>
                <Button onClick={loadSample} variant="outline" size="sm">
                  Load Sample
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={jwtPayload}
                onChange={(e) => setJwtPayload(e.target.value)}
                className="font-mono text-sm h-32"
                placeholder="JWT Payload JSON"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Key className="h-5 w-5" />
                Secret Key
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Input
                  type={showSecret ? 'text' : 'password'}
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter secret key for signing"
                  className="font-mono text-sm pr-12"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // General JSON input
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5" />
                JSON Input
              </CardTitle>
              <Button onClick={loadSample} variant="outline" size="sm">
                Load Sample
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="font-mono text-sm h-40"
              placeholder="Enter your JSON data here..."
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};