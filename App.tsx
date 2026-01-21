
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InputMatrix } from './components/InputMatrix';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ResultsDashboard } from './components/ResultsDashboard';
import { generateMarketingAssets } from './services/geminiService';
import type { AssetType, MarketingResults } from './types';
import { HowItWorksPage } from './components/HowItWorksPage';

const App: React.FC = () => {
  const [companyDetails, setCompanyDetails] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<AssetType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MarketingResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'main' | 'howItWorks'>('main');

  const handleGenerate = useCallback(async () => {
    if (selectedAssets.length === 0 || !companyDetails || !productDetails) {
      setError('Please fill in all details and select at least one asset.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setResults(null);
    try {
      const generatedResults = await generateMarketingAssets(
        companyDetails,
        productDetails,
        selectedAssets
      );
      setResults(generatedResults);
    } catch (e) {
      setError('An error occurred while generating the assets. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [companyDetails, productDetails, selectedAssets]);

  const navigateTo = (page: 'main' | 'howItWorks') => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  return (
    <div className="min-h-screen bg-brand-navy text-slate-200 font-sans">
      <Header onGoHome={() => navigateTo('main')} onShowHowItWorks={() => navigateTo('howItWorks')} />
      <main className="container mx-auto px-4 py-8 md:py-16">
        {currentPage === 'main' ? (
          <>
            <Hero />
            <InputMatrix
              companyDetails={companyDetails}
              setCompanyDetails={setCompanyDetails}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
              selectedAssets={selectedAssets}
              setSelectedAssets={setSelectedAssets}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
            {error && <p className="text-center text-red-400 mt-4">{error}</p>}
            {isLoading && <LoadingIndicator />}
            {results && !isLoading && <ResultsDashboard results={results} />}
          </>
        ) : (
          <HowItWorksPage onGetStarted={() => navigateTo('main')} />
        )}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AdVantage AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
