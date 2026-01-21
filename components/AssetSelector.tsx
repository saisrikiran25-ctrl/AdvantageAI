
import React from 'react';
import type { AssetType } from '../types';
import { MARKETING_ASSETS } from '../constants';

interface AssetSelectorProps {
  selectedAssets: AssetType[];
  setSelectedAssets: (assets: AssetType[]) => void;
  isDisabled: boolean;
}

export const AssetSelector: React.FC<AssetSelectorProps> = ({
  selectedAssets,
  setSelectedAssets,
  isDisabled,
}) => {
  const toggleAsset = (assetName: AssetType) => {
    if (isDisabled) return;
    const newSelection = selectedAssets.includes(assetName)
      ? selectedAssets.filter((a) => a !== assetName)
      : [...selectedAssets, assetName];
    setSelectedAssets(newSelection);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {MARKETING_ASSETS.map(({ name, icon: Icon }) => {
        const isSelected = selectedAssets.includes(name);
        return (
          <button
            key={name}
            onClick={() => toggleAsset(name)}
            disabled={isDisabled}
            className={`flex flex-col items-center justify-center text-center p-4 h-28 rounded-lg border-2 transition-all duration-200
              ${isSelected
                ? 'bg-blue-500/10 border-brand-blue text-brand-blue'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <Icon className="h-7 w-7 mb-2" />
            <span className="text-xs font-semibold">{name}</span>
          </button>
        );
      })}
    </div>
  );
};
