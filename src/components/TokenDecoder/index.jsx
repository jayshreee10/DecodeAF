"use client";

import { useState } from "react";
import { AlertCircle, ArrowLeftRight } from "lucide-react";
import { useTokenDecoder } from "../../hooks/useTokenDecoder";
import { TokenInput } from "./TokenInput";
import { JsonDisplay, TableDisplay } from "./OutputDisplay";
import { JSONEncoder } from "../JSONEncoder";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import {
  TOKEN_TYPES,
  TOKEN_TYPE_COLORS,
  MODES,
} from "../../constants/tokenTypes";

export const TokenDecoder = () => {
  const [mode, setMode] = useState(MODES.DECODE);

  const {
    token,
    setToken,
    tokenType,
    decodedData,
    error,
    loading,
    secretKey,
    setSecretKey,
    signatureValid,
  } = useTokenDecoder();

  return (
    <div className="space-y-8">
      {/* Mode Selector */}
      <Card className="bg-black border-2 border-green-400 rounded-lg shadow-lg shadow-green-400/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-4 font-mono">
            <Button
              onClick={() => setMode(MODES.DECODE)}
              variant={mode === MODES.DECODE ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                mode === MODES.DECODE
                  ? "bg-green-900 text-green-400 border-green-400 hover:bg-green-800"
                  : "bg-black text-green-400 border-green-400 hover:bg-gray-900"
              } transition-all duration-300`}
            >
              <ArrowLeftRight className="h-4 w-4 animate-pulse" />
              <span className="blink">$ DECRYPT_JWT</span>
            </Button>

            <div className="text-green-400 text-sm px-2">|</div>

            <Button
              onClick={() => setMode(MODES.ENCODE)}
              variant={mode === MODES.ENCODE ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                mode === MODES.ENCODE
                  ? "bg-green-900 text-green-400 border-green-400 hover:bg-green-800"
                  : "bg-black text-green-400 border-green-400 hover:bg-gray-900"
              } transition-all duration-300`}
            >
              <ArrowLeftRight className="h-4 w-4 rotate-180" />
              <span className="blink">$ ENCRYPT_JSON</span>
            </Button>
          </div>

          {/* Hacker status text */}
          <div className="mt-3 text-center text-xs text-green-600 font-mono">
            {mode === MODES.DECODE
              ? "[STATUS] READY_FOR_TOKEN_INPUT"
              : "[STATUS] AWAITING_JSON_DATA"}
          </div>
        </CardContent>
      </Card>

      {/* Content based on mode */}
      {mode === MODES.DECODE ? (
        <>
          {/* Existing decode functionality */}
          <Card className="bg-black border-2 border-green-400 rounded-lg shadow-lg shadow-green-400/20">
            <CardContent className="p-6">
              <TokenInput
                token={token}
                setToken={setToken}
                secretKey={secretKey}
                setSecretKey={setSecretKey}
                showJWTSecret={true}
                tokenType={tokenType}
                className="font-mono text-green-400"
              />

              {/* Status Badges - Hacker style */}
              {tokenType && (
                <div className="flex items-center gap-4 mt-4">
                  <Badge
                    className={`${TOKEN_TYPE_COLORS[tokenType]} bg-black border border-green-400 font-mono text-green-400`}
                  >
                    [root@localhost ~] Detected: {tokenType}
                  </Badge>

                  {tokenType === TOKEN_TYPES.JWT && signatureValid !== null && (
                    <Badge
                      className={`font-mono border ${
                        signatureValid
                          ? "border-green-400 text-green-400"
                          : "border-red-400 text-red-400"
                      }`}
                    >
                      $
                      {signatureValid ? "ACCESS_GRANTED" : "INTRUSION_DETECTED"}
                    </Badge>
                  )}
                </div>
              )}

              {/* Error Display - CRT style */}
              {error && (
                <div className="flex items-center gap-2 p-4 mt-4 bg-black border-2 border-red-400 rounded-lg text-red-400 font-mono">
                  <AlertCircle className="h-5 w-5 animate-pulse" />
                  <span className="blink">
                    {">>"} {error}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output Section */}
          {decodedData && !loading && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Decoded Results
              </h2>

              {tokenType === TOKEN_TYPES.JWT && (
                <>
                  <JsonDisplay
                    data={decodedData.header}
                    title="Header (JSON)"
                  />
                  <TableDisplay
                    data={decodedData.header}
                    title="Header (Table)"
                  />

                  <JsonDisplay
                    data={decodedData.payload}
                    title="Payload (JSON)"
                  />
                  <TableDisplay
                    data={decodedData.payload}
                    title="Payload (Table)"
                  />

                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Signature
                      </h4>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <code className="text-sm break-all">
                          {decodedData.signature}
                        </code>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {tokenType !== TOKEN_TYPES.JWT && (
                <>
                  {decodedData.isJSON ? (
                    <>
                      <JsonDisplay
                        data={decodedData.decoded}
                        title="Decoded Content (JSON)"
                      />
                      {typeof decodedData.decoded === "object" && (
                        <TableDisplay
                          data={decodedData.decoded}
                          title="Decoded Content (Table)"
                        />
                      )}
                    </>
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          Decoded Content (Text)
                        </h4>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap break-words text-sm">
                            {decodedData.decoded}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          )}
        </>
      ) : (
        /* New encode functionality */
        <JSONEncoder />
      )}
    </div>
  );
};
