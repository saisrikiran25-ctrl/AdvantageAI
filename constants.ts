
import type { AssetType } from './types';
import {
  Megaphone,
  LayoutTemplate,
  Mail,
  Users,
  Award,
  MousePointerClick,
  Search,
  Target
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

type IconComponent = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export const MARKETING_ASSETS: { name: AssetType; icon: IconComponent }[] = [
  { name: 'Headline', icon: Megaphone },
  { name: 'Landing Page Content', icon: LayoutTemplate },
  { name: 'Email Marketing', icon: Mail },
  { name: 'Social Media Content', icon: Users },
  { name: 'Slogan/Motto', icon: Award },
  { name: 'CTAs', icon: MousePointerClick },
  { name: 'SEO Keywords', icon: Search },
  { name: 'Google Ads Strategy', icon: Target },
];

export const LOADING_MESSAGES = [
  "Analyzing Brand DNA...",
  "Crafting High-Converting Copy...",
  "Mapping Consumer Psychology...",
  "Optimizing for Conversion...",
  "Synthesizing Strategy...",
  "Finalizing Marketing Assets...",
];
