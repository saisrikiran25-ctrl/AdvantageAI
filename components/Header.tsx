
import React from 'react';
import { Target } from 'lucide-react';

interface HeaderProps {
  onGoHome: () => void;
  onShowHowItWorks: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, onShowHowItWorks }) => {
  return (
    <header className="bg-brand-navy/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button onClick={onGoHome} className="flex items-center gap-2 group" aria-label="Go to homepage">
          <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-brand-blue/20 transition-colors">
            <Target className="text-brand-blue h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">AdVantage AI</h1>
        </button>
        <nav>
          <button onClick={onShowHowItWorks} className="text-sm font-medium text-slate-300 hover:text-brand-blue transition-colors">
            How it works
          </button>
        </nav>
      </div>
    </header>
  );
};
