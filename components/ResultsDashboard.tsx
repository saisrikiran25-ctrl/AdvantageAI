
import React, { useState } from 'react';
import type { MarketingResults, RankedItem, AssetType } from '../types';
import { RankedListItem } from './RankedListItem';
import { MarkdownRenderer } from './MarkdownRenderer';
import { MARKETING_ASSETS } from '../constants';

interface ResultsDashboardProps {
  results: MarketingResults;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results }) => {
  const availableTabs = Object.keys(results) as AssetType[];
  const [activeTab, setActiveTab] = useState<AssetType>(availableTabs[0]);

  if (!availableTabs.length) {
    return <p className="text-center text-slate-400 mt-8">No results to display.</p>;
  }

  const renderContent = () => {
    const content = results[activeTab];
    if (Array.isArray(content)) {
      return (
        <div className="space-y-4">
          {(content as RankedItem[]).map((item) => (
            <RankedListItem key={item.rank} {...item} />
          ))}
        </div>
      );
    }
    if (typeof content === 'string') {
      return <MarkdownRenderer content={content} />;
    }
    return null;
  };

  return (
    <div className="mt-12 md:mt-16 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Your Marketing Strategy</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <nav className="flex flex-row md:flex-col gap-2 md:gap-1 overflow-x-auto pb-2 md:pb-0">
            {availableTabs.map((tabName) => {
              const assetInfo = MARKETING_ASSETS.find(a => a.name === tabName);
              const Icon = assetInfo?.icon;
              const isActive = activeTab === tabName;
              return (
                <button
                  key={tabName}
                  onClick={() => setActiveTab(tabName)}
                  className={`w-full flex-shrink-0 md:flex-shrink-1 flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors text-left
                    ${isActive
                      ? 'bg-brand-blue/10 text-brand-blue'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`
                  }
                >
                  {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                  {tabName}
                </button>
              );
            })}
          </nav>
        </aside>
        <main className="md:w-3/4 bg-slate-900/50 border border-slate-700 rounded-xl p-6 md:p-8 min-h-[300px]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
