"use client";
import { Eye, EyeOff, Terminal, Cpu, Key, ScanEye } from 'lucide-react';
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
    <div className="space-y-4 font-mono">
      <div className="relative">
        <div className="flex items-center gap-2 mb-2 text-green-400">
          <Terminal className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-medium tracking-wider">[ROOT@TERMINAL ~]$ TOKEN_INPUT</span>
        </div>
        <Textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          className="bg-black border-2 border-green-400 text-green-400 text-sm resize-none h-32 placeholder-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        />
        <div className="absolute bottom-2 right-2 text-xs text-green-600">
          {token.length}/∞ CHARS
        </div>
      </div>

      {showJWTSecret && tokenType === 'JWT' && (
        <div className="relative">
          <div className="flex items-center gap-2 mb-2 text-green-400">
            <Key className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wider">[SECURE] DECRYPTION_KEY=</span>
          </div>
          <div className="relative">
            <Input
              type={showSecret ? 'text' : 'password'}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="••••••••••••••••••••••••••••••"
              className="bg-black border-2 border-green-400 text-green-400 text-sm pr-12 placeholder-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            />
            <Button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-green-900 hover:bg-green-800 border border-green-700 text-green-400"
            >
              {showSecret ? (
                <ScanEye className="h-4 w-4 animate-pulse" />
              ) : (
                <Cpu className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-green-600">
            {secretKey.length}/256-bit
          </div>
        </div>
      )}
    </div>
  );
};