
import React from 'react';
import { Database, MousePointerClick, Sparkles, BrainCircuit } from 'lucide-react';

interface HowItWorksPageProps {
  onGetStarted: () => void;
}

const Step: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; stepNumber: number }> = ({ icon, title, children, stepNumber }) => (
    <div className="relative pl-16 pt-1">
        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border border-slate-700">
            <span className="text-xl font-bold text-brand-blue">{stepNumber}</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
            {icon}
            <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-slate-400">{children}</p>
    </div>
);


export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onGetStarted }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">
          From <span className="text-brand-blue">Prompt</span> to <span className="text-brand-green">Profit</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 md:text-lg">
          AdVantage AI transforms your raw ideas into polished, high-converting marketing assets in three simple steps.
        </p>
      </div>

      <div className="space-y-12">
        <Step
          stepNumber={1}
          icon={<Database className="h-7 w-7 text-brand-blue" />}
          title="Provide Context"
        >
          Start by telling us about your business. Input your company's mission, brand voice, and core values, along with key details about the product you're promoting. The richer the context, the more tailored and effective your results will be.
        </Step>

        <Step
          stepNumber={2}
          icon={<MousePointerClick className="h-7 w-7 text-brand-blue" />}
          title="Select Your Assets"
        >
          Choose from a comprehensive suite of marketing materials. Whether you need compelling headlines, full landing page copy, an email campaign, or a complete Google Ads strategy, just select what you need from our grid.
        </Step>

        <Step
          stepNumber={3}
          icon={<Sparkles className="h-7 w-7 text-brand-blue" />}
          title="Generate & Deploy"
        >
          With a single click, our AI Marketing Master Architect gets to work. It analyzes your input, maps it against proven marketing frameworks, and generates a complete set of professional assets, ranked and ready for you to copy, paste, and deploy.
        </Step>
      </div>

      <div className="text-center mt-20">
        <button
          onClick={onGetStarted}
          className="flex items-center justify-center gap-2 bg-brand-blue text-brand-charcoal font-bold py-3 px-8 rounded-lg hover:bg-sky-400 transition-all transform hover:scale-[1.05] active:scale-[0.99] mx-auto"
        >
          <BrainCircuit className="h-5 w-5" />
          Generate Your Strategy Now
        </button>
      </div>
    </div>
  );
};
