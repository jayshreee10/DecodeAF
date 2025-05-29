"use client";
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Textarea, Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const TokenInput = ({ 
  token, 
  setToken, 
  secretKey, 
  setSecretKey, 
  showJWTSecret, 
  tokenType 
}) => {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paste your token here:
        </label>
        <Textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          className="font-mono text-sm resize-none h-32"
        />
      </div>

      {showJWTSecret && tokenType === 'JWT' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secret Key (for signature verification):
          </label>
          <div className="relative">
            <Input
              type={showSecret ? 'text' : 'password'}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter your secret key"
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
        </div>
      )}
    </div>
  );
};