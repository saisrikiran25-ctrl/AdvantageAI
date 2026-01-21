
import React from 'react';
import type { AssetType } from '../types';
import { AssetSelector } from './AssetSelector';
import { BrainCircuit } from 'lucide-react';

interface InputMatrixProps {
  companyDetails: string;
  setCompanyDetails: (value: string) => void;
  productDetails: string;
  setProductDetails: (value: string) => void;
  selectedAssets: AssetType[];
  setSelectedAssets: (assets: AssetType[]) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputMatrix: React.FC<InputMatrixProps> = ({
  companyDetails,
  setCompanyDetails,
  productDetails,
  setProductDetails,
  selectedAssets,
  setSelectedAssets,
  onGenerate,
  isLoading,
}) => {
  const isButtonDisabled = isLoading || selectedAssets.length === 0 || !companyDetails || !productDetails;

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Step 1: Provide Context</h2>
        <p className="text-sm text-slate-400 mb-4">The more detail you provide, the better the results.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <textarea
            value={companyDetails}
            onChange={(e) => setCompanyDetails(e.target.value)}
            placeholder="Company Details: What is your mission, values, brand voice? (e.g., 'We are a fun, eco-friendly brand for young professionals...')"
            className="w-full h-36 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition"
            disabled={isLoading}
          />
          <textarea
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            placeholder="Product Details: What are its features, benefits, and price point? (e.g., 'Our smart coffee mug keeps drinks at 145°F for 3 hours, costs $99...')"
            className="w-full h-36 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Step 2: Select Your Assets</h2>
        <p className="text-sm text-slate-400 mb-4">Choose which marketing materials you need.</p>
        <AssetSelector
          selectedAssets={selectedAssets}
          setSelectedAssets={setSelectedAssets}
          isDisabled={isLoading}
        />
      </div>

      <div className="pt-4">
        <button
          onClick={onGenerate}
          disabled={isButtonDisabled}
          className="w-full flex items-center justify-center gap-2 bg-brand-blue text-brand-charcoal font-bold py-3 px-6 rounded-lg hover:bg-sky-400 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.99]"
        >
          <BrainCircuit className="h-5 w-5" />
          {isLoading ? 'Generating...' : 'Generate Strategy'}
        </button>
      </div>
    </div>
  );
};
