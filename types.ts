
export interface InitialBrandInput {
  name: string;
  website: string;
  businessType: string;
  serviceType: string;
  locationScope: string;
  specificLocations: string;
  selectedCities: string[];
  linkedinHandle?: string;
  twitterHandle?: string;
  facebookHandle?: string;
}

export interface BrandData extends InitialBrandInput {
  description: string;
  targetCustomer: string;
  keyServices: string;
}

export interface AnalyticsData {
  keywords: number;
  contentPieces: number;
  socialPosts: number;
  estimatedReach: number;
  competitiveScore: number;
  seoScore: number;
}

export type StepKey = 'keywords' | 'content' | 'publishing' | 'technical' | 'conversion' | 'performance';

export interface LoadingStates {
  foundation: boolean;
  keywords: boolean;
  content: boolean;
  publishing: boolean;
  technical: boolean;
  conversion: boolean;
  performance: boolean;
  demo: boolean;
}

export interface KeywordStrategy {
  primaryKeywords: string[];
  urgentKeywords: string[];
  serviceKeywords: string[];
  problemKeywords: string[];
  longTailKeywords: string[];
  locationKeywords: string[];
  contentPillars: string[];
  strategicInsights: string;
  totalKeywords: number;
  competitiveScore?: number;
  seoScore?: number;
}

export interface SeoAudit {
    overallScore: number;
    summary: string;
    contentObservations: string[];
    technicalObservations: string[];
    socialObservations: string[];
    quickWins: string[];
}

export interface ContentPage {
  title: string;
  url: string;
  wordCount: string;
  features: string[];
}

export interface ContentPlan {
  homepageTitle: string;
  homepageMetaDescription: string;
  servicePages: ContentPage[];
  urgentPages: ContentPage[];
  locationPages: ContentPage[];
  blogPosts: string[];
  totalPages: number;
}

export type ApiProviderId = 'gemini' | 'claude' | 'openai' | 'groq' | 'openrouter';

export type SocialPlatform = 'linkedin' | 'twitter' | 'facebook' | 'instagram';

export type SocialPosts = {
  [key in SocialPlatform]: string[];
};

export interface TechnicalSeoPlan {
  coreWebVitals: {
    lcp: string;
    fid: string;
    cls: string;
  };
  schema: string[];
  technicalChecklist: string[];
  indiaSpecificOptimizations: string[];
}

export interface ConversionPlan {
  ctas: string[];
  indianPaymentMethods: string[];
  trustSignals: string[];
  regionalAdaptations: Array<{ city: string; adaptations: string[] }>;
}

export interface PublishingPlan {
  expertAdvice: {
    publishingCadence: string;
    strategyDuration: string;
    metricsToTrack: string[];
  };
  calendar: CalendarEvent[];
}

export interface CalendarEvent {
  day: number;
  type: 'Blog Post' | 'Social Post';
  platform?: SocialPlatform;
  title: string;
  details: string;
}

export interface PerformanceInputs {
  gscQueries: string;
  gaTraffic: string;
  metaInsights: string;
  linkedinInsights: string;
  twitterInsights: string;
}

export interface PerformanceAnalysis {
  keyWins: string[];
  opportunities: string[];
  recommendations: string[];
  contentPrioritization: string[];
}

export interface SalesInsight {
    step: string;
    point: string;
}

export interface AllData {
    brandData: BrandData | null;
    analyticsData: AnalyticsData;
    keywordStrategy: KeywordStrategy | null;
    contentPlan: ContentPlan | null;
    socialPosts: SocialPosts | null;
    technicalSeoPlan: TechnicalSeoPlan | null;
    conversionPlan: ConversionPlan | null;
    publishingPlan: PublishingPlan | null;
    performanceAnalysis: PerformanceAnalysis | null;
    seoAudit: SeoAudit | null;
    salesInsights?: SalesInsight[];
}

export interface ApiKeys {
    gemini?: string;
    claude?: string;
    openai?: string;
    groq?: string;
    openrouter?: string;
}

export interface Project {
    id: string;
    name: string;
    website: string;
    industry: string;
    createdAt: string;
    lastModified: string;
    data: AllData;
}
