"use client";

import { Badge } from '../ui/Badge';
import { ENCODE_TARGETS, TOKEN_TYPE_COLORS } from '../../constants/tokenTypes';

export const FormatSelector = ({ targetFormat, setTargetFormat }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select Target Format:
      </label>
      <div className="flex flex-wrap gap-2">
        {ENCODE_TARGETS.map((format) => (
          <button
            key={format.value}
            onClick={() => setTargetFormat(format.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              targetFormat === format.value
                ? TOKEN_TYPE_COLORS[format.value] + ' ring-2 ring-offset-2 ring-blue-500'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {format.label}
          </button>
        ))}
      </div>
    </div>
  );
};