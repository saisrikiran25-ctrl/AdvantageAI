
export type AssetType =
  | 'Headline'
  | 'Landing Page Content'
  | 'Email Marketing'
  | 'Social Media Content'
  | 'Slogan/Motto'
  | 'CTAs'
  | 'SEO Keywords'
  | 'Google Ads Strategy';

export interface RankedItem {
  rank: number;
  text: string;
  note: string;
}

export type MarketingResults = {
  [key in AssetType]?: RankedItem[] | string;
};
