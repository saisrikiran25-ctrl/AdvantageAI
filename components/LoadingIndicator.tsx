
import React, { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from '../constants';

export const LoadingIndicator: React.FC = () => {
  const [message, setMessage] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = LOADING_MESSAGES.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
        return LOADING_MESSAGES[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-16">
      <div className="inline-block relative w-12 h-12">
        <div className="w-12 h-12 border-4 border-brand-blue rounded-full"></div>
        <div className="w-12 h-12 border-4 border-brand-navy border-t-brand-blue rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-slate-300 transition-opacity duration-500">{message}</p>
    </div>
  );
};
