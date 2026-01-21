
import React from 'react';
import type { RankedItem as RankedItemType } from '../types';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { Copy, Check } from 'lucide-react';

export const RankedListItem: React.FC<RankedItemType> = ({ rank, text, note }) => {
  const [copied, copy] = useCopyToClipboard();

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex-shrink-0 h-6 w-6 bg-brand-blue/20 text-brand-blue text-xs font-bold rounded-full flex items-center justify-center">
              {rank}
            </span>
            <p className="font-semibold text-white">{text}</p>
          </div>
          <p className="text-xs text-slate-400 ml-9 italic">
            <span className="font-semibold">Strategist’s Note:</span> {note}
          </p>
        </div>
        <button
          onClick={() => copy(text)}
          className="flex-shrink-0 p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition-colors"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-brand-green" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};
