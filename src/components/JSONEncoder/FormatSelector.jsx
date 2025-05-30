"use client";

import { Badge } from '../ui/Badge';
import { ENCODE_TARGETS, TOKEN_TYPE_COLORS } from '../../constants/tokenTypes';
import { Cpu, Lock, Shield, Key, Terminal } from 'lucide-react';

const formatIcons = {
  JWT: <Key className="h-4 w-4" />,
  PASETO: <Shield className="h-4 w-4" />,
  CUSTOM: <Terminal className="h-4 w-4" />,
  DEFAULT: <Cpu className="h-4 w-4" />
};

export const FormatSelector = ({ targetFormat, setTargetFormat }) => {
  return (
    <div className="font-mono">
      <div className="flex items-center gap-2 mb-3 text-green-400">
        <Cpu className="h-4 w-4 animate-pulse" />
        <span className="text-sm font-medium tracking-wider">[SYSTEM]$ SELECT_FORMAT</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {ENCODE_TARGETS.map((format) => (
          <button
            key={format.value}
            onClick={() => setTargetFormat(format.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border-2 font-mono flex items-center gap-2 ${
              targetFormat === format.value
                ? `${TOKEN_TYPE_COLORS[format.value]} border-green-400 bg-black text-green-400 shadow-lg shadow-green-400/20`
                : 'bg-black text-gray-400 border-gray-700 hover:border-green-400 hover:text-green-400'
            }`}
          >
            {formatIcons[format.value] || formatIcons.DEFAULT}
            <span>{format.label}</span>
            {targetFormat === format.value && (
              <span className="ml-1 text-xs text-green-400 animate-pulse">ACTIVE</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};