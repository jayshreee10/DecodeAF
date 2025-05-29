"use client";

import { Copy, Check, Download } from 'lucide-react';
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">Generated Token</CardTitle>
            <Badge className={TOKEN_TYPE_COLORS[format]}>
              {format}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => copyToClipboard(result)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              onClick={downloadAsFile}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
          <pre className="whitespace-pre-wrap break-all text-sm font-mono">
            {result}
          </pre>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <strong>Length:</strong> {result.length} characters
        </div>
      </CardContent>
    </Card>
  );
};