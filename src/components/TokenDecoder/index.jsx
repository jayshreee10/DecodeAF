"use client";
import { AlertCircle } from 'lucide-react';
import { useTokenDecoder } from '../../hooks/useTokenDecoder';
import { TokenInput } from './TokenInput';
import { JsonDisplay, TableDisplay } from './OutputDisplay';
import { Badge } from '../ui/Badge';
import { Card, CardContent } from '../ui/Card';
import { TOKEN_TYPES, TOKEN_TYPE_COLORS } from '../../constants/tokenTypes';

export const TokenDecoder = () => {
  const {
    token,
    setToken,
    tokenType,
    decodedData,
    error,
    loading,
    secretKey,
    setSecretKey,
    signatureValid
  } = useTokenDecoder();

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card>
        <CardContent className="p-6">
          <TokenInput
            token={token}
            setToken={setToken}
            secretKey={secretKey}
            setSecretKey={setSecretKey}
            showJWTSecret={true}
            tokenType={tokenType}
          />

          {/* Status Badges */}
          {tokenType && (
            <div className="flex items-center gap-4 mt-4">
              <Badge className={TOKEN_TYPE_COLORS[tokenType]}>
                Detected: {tokenType}
              </Badge>
              
              {tokenType === TOKEN_TYPES.JWT && signatureValid !== null && (
                <Badge variant={signatureValid ? 'success' : 'error'}>
                  Signature: {signatureValid ? 'Valid' : 'Invalid'}
                </Badge>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-4 mt-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output Section */}
      {decodedData && !loading && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Decoded Results</h2>
          
          {tokenType === TOKEN_TYPES.JWT && (
            <>
              <JsonDisplay data={decodedData.header} title="Header (JSON)" />
              <TableDisplay data={decodedData.header} title="Header (Table)" />
              
              <JsonDisplay data={decodedData.payload} title="Payload (JSON)" />
              <TableDisplay data={decodedData.payload} title="Payload (Table)" />
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Signature</h4>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <code className="text-sm break-all">{decodedData.signature}</code>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {tokenType !== TOKEN_TYPES.JWT && (
            <>
              {decodedData.isJSON ? (
                <>
                  <JsonDisplay data={decodedData.decoded} title="Decoded Content (JSON)" />
                  {typeof decodedData.decoded === 'object' && (
                    <TableDisplay data={decodedData.decoded} title="Decoded Content (Table)" />
                  )}
                </>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Decoded Content (Text)</h4>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap break-words text-sm">{decodedData.decoded}</pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};