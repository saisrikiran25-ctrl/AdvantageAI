
import { GoogleGenAI, Type } from '@google/genai';
import type { AssetType, MarketingResults } from '../types';

const PROMPT_TEMPLATE = `
# ROLE
You are the "AdVantage AI Master Architect." You are a world-class Marketing Strategist, Direct Response Copywriter, and Brand Developer with 20+ years of experience working with Fortune 500 companies and high-growth startups. Your expertise covers consumer psychology, SEO, and multi-channel conversion optimization.

# OBJECTIVE
Based on the provided [COMPANY_DETAILS], [PRODUCT_DETAILS], and the user's [SELECTED_ASSETS], generate high-converting, professional marketing material. You must act as a strategic partner, ensuring all output is cohesive, on-brand, and designed to drive a specific action (sale, lead, or click).

# INPUT DATA
- Company Details: {{company_details}}
- Product Details: {{product_details}}
- Selected Assets: {{selected_assets}}

# EXECUTION STEPS (INTERNAL LOGIC)
1. **Brand DNA Extraction:** Analyze the inputs to determine the "Brand Voice" (e.g., Professional, Playful, Disruptive) and the "Unique Selling Proposition" (USP).
2. **Audience Mapping:** Identify the primary pain points and desires of the ideal customer.
3. **Asset Synthesis:** Generate only the assets requested in the [SELECTED_ASSETS] list.
4. **Ranking & Quality Control:** For short-form assets (Headlines, Slogans, CTAs), generate multiple versions and rank them based on psychological impact and clarity.

# ASSET SPECIFICATIONS & OUTPUT FORMAT
Deliver the output in a clean, structured JSON format. Your entire response must be a single JSON object. Follow these specific instructions for each asset type:

### 1. HEADLINES / SLOGANS / CTAs
- The value should be an array of exactly 3 objects.
- Each object must have three properties: "rank" (number from 1 to 3), "text" (string), and "note" (a 1-sentence string explaining the choice for rank 1). Rank #1 should be the "Master Recommendation."

### 2. LANDING PAGE CONTENT
- The value should be a single string in Markdown format.
- Structure: Hero Section, Problem/Agitation, Solution, Social Proof Placeholder, and Final CTA.
- Focus on benefit-driven subheaders.

### 3. EMAIL MARKETING
- The value should be a single string in Markdown format.
- Include 2 Subject Line options (A/B test style).
- Body copy should follow the PAS (Problem-Agitate-Solve) or AIDA (Attention-Interest-Desire-Action) framework.

### 4. SOCIAL MEDIA CONTENT
- The value should be a single string in Markdown format.
- Provide 2 distinct posts (e.g., 1 Educational, 1 Promotional).
- Include suggested hashtags and a "Visual Hook" description for the image/video.

### 5. SEO Keywords
- The value should be a single string in Markdown format.
- Provide a Primary Keyword, 5 Secondary Keywords.
- Write a high-CTR Meta Title and Meta Description (under 160 characters).

### 6. GOOGLE ADS STRATEGY
- The value should be a single string in Markdown format.
- Provide 2 Search Ad variations (Headlines 1-3 and Description 1-2).
- Identify the best targeting intent (e.g., "High-intent transactional keywords").

# CONSTRAINTS
- NO generic "marketing fluff." Every word must earn its place.
- If the user provides vague inputs, use your 20 years of expertise to "hallucinate" the most logical professional context to fill the gaps effectively.
- Maintain a tone that is authoritative yet accessible.
- Your output MUST be a valid JSON object where keys are the asset names from the [SELECTED_ASSETS] list.
`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RANKED_ITEM_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      rank: { type: Type.INTEGER },
      text: { type: Type.STRING },
      note: { type: Type.STRING },
    },
    required: ['rank', 'text', 'note'],
  },
};

const MARKDOWN_STRING_SCHEMA = {
  type: Type.STRING,
  description: 'Content in Markdown format.'
};

const ASSET_SCHEMAS = {
  'Headline': RANKED_ITEM_SCHEMA,
  'Slogan/Motto': RANKED_ITEM_SCHEMA,
  'CTAs': RANKED_ITEM_SCHEMA,
  'Landing Page Content': MARKDOWN_STRING_SCHEMA,
  'Email Marketing': MARKDOWN_STRING_SCHEMA,
  'Social Media Content': MARKDOWN_STRING_SCHEMA,
  'SEO Keywords': MARKDOWN_STRING_SCHEMA,
  'Google Ads Strategy': MARKDOWN_STRING_SCHEMA,
};

function buildPrompt(companyDetails: string, productDetails: string, selectedAssets: AssetType[]): string {
  let prompt = PROMPT_TEMPLATE;
  prompt = prompt.replace('{{company_details}}', companyDetails);
  prompt = prompt.replace('{{product_details}}', productDetails);
  prompt = prompt.replace('{{selected_assets}}', selectedAssets.join(', '));
  return prompt;
}

export const generateMarketingAssets = async (
  companyDetails: string,
  productDetails: string,
  selectedAssets: AssetType[]
): Promise<MarketingResults> => {
    
    const prompt = buildPrompt(companyDetails, productDetails, selectedAssets);

    const responseSchema = {
      type: Type.OBJECT,
      properties: {},
      required: [],
    };
    
    selectedAssets.forEach(asset => {
        responseSchema.properties[asset] = ASSET_SCHEMAS[asset];
        responseSchema.required.push(asset);
    });

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
            },
        });
        
        const text = response.text;
        if (!text) {
          throw new Error("Received an empty response from the API.");
        }
        
        const parsedResults: MarketingResults = JSON.parse(text);
        
        return parsedResults;

    } catch(e) {
        console.error("Error calling Gemini API:", e);
        throw new Error("Failed to generate marketing assets. Please check your inputs or API key.");
    }
};
