"use client";

import { Copy, Check, Download, Terminal, Cpu, Lock, Binary } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useClipboard } from '../../hooks/useClipboard';
import { TOKEN_TYPE_COLORS } from '../../constants/tokenTypes';

export const EncodedOutput = ({ result, format }) => {
  const { copied, copyToClipboard } = useClipboard();

  const downloadAsFile = () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `token_${format.toLowerCase().replace(' ', '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Cyberpunk color mapping
  const CYBER_COLORS = {
    JWT: 'border-purple-400 text-purple-300',
    PASETO: 'border-cyan-400 text-cyan-300',
    CUSTOM: 'border-green-400 text-green-300',
    DEFAULT: 'border-red-400 text-red-300'
  };

  return (
    <Card className="bg-black/90 border-2 border-green-400 rounded-lg shadow-lg shadow-green-400/10 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg flex items-center gap-2 text-green-300">
              <Terminal className="h-5 w-5 text-green-400" />
              <span className="tracking-wider">[OUTPUT] GENERATED_TOKEN</span>
            </CardTitle>
            <Badge className={`${CYBER_COLORS[format] || CYBER_COLORS.DEFAULT} bg-black/50 border font-mono`}>
              {format}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => copyToClipboard(result)}
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 bg-black/50 ${copied ? 'text-green-400 border-green-400' : 'text-purple-400 border-purple-400'} hover:bg-green-900/30 transition-all`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 animate-pulse" />
                  <span className="font-mono text-xs">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span className="font-mono text-xs">COPY_TO_CLIPBOARD</span>
                </>
              )}
            </Button>
            <Button
              onClick={downloadAsFile}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-black/50 text-cyan-400 border-cyan-400 hover:bg-cyan-900/30 font-mono"
            >
              <Download className="h-4 w-4" />
              <span className="text-xs">DOWNLOAD_TXT</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-black/70 border-2 border-green-400/50 text-green-300 p-4 rounded-lg overflow-x-auto font-mono">
          <pre className="whitespace-pre-wrap break-all text-sm">
            <code className="blink-cursor">{result}</code>
          </pre>
        </div>
        <div className="mt-4 text-sm text-green-500/80 font-mono flex items-center gap-2">
          <Cpu className="h-4 w-4" />
          <span>TOKEN_LENGTH: {result.length} CHARS</span>
        </div>
      </CardContent>
    </Card>
  );
};