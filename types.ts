export type SocialPlatform = 'linkedin' | 'twitter' | 'facebook' | 'instagram';

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
  targetAudience?: string;
  uniqueValueProposition?: string;
}

export interface AnalyticsData {
  keywords: number;
  contentPieces: number;
  socialPosts: number;
  estimatedReach: number;
  competitiveScore: number;
  seoScore: number;
}

export type StepKey = 'keywords' | 'content' | 'publishing' | 'technical' | 'conversion' | 'performance' | 'structured';

export interface LoadingStates {
  foundation: boolean;
  keywords: boolean;
  content: boolean;
  publishing: boolean;
  technical: boolean;
  conversion: boolean;
  performance: boolean;
  demo: boolean;
  structured: boolean;
}

// Structured Data Configuration
export interface StructuredDataConfig {
  businessName: string;
  businessType: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  website: string;
  openingHours: {
    [key: string]: string;
  };
  socialProfiles: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  description: string;
  priceRange?: string;
  paymentAccepted?: string[];
  servicesOffered?: string[];
}

export interface StructuredDataOutput {
  jsonLd: string;
  implementation: string;
  benefits: string[];
  testingInstructions: string;
}

// Notification types
export interface NotificationState {
  message: string;
  type: 'success' | 'info' | 'warning';
  isVisible: boolean;
}

export interface KeywordStrategy {
  primaryKeywords: string[];
  urgentKeywords: string[];
  serviceKeywords: string[];
  problemKeywords: string[];
  longTailKeywords: string[];
  locationKeywords: string[];
  competitorKeywords: string[];
  keywordDifficulty: { [key: string]: number };
  searchVolume: { [key: string]: number };
  keywordOpportunities: string[];
  seasonalKeywords: string[];
  voiceSearchKeywords: string[];
}

export interface ContentPlan {
  blogPosts: BlogPost[];
  landingPages: LandingPage[];
  emailCampaigns: EmailCampaign[];
  contentCalendar: ContentCalendarItem[];
  contentThemes: string[];
  contentPillars: string[];
  repurposingStrategy: string[];
}

export interface BlogPost {
  title: string;
  slug: string;
  metaDescription: string;
  targetKeywords: string[];
  outline: string[];
  wordCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  priority: 'High' | 'Medium' | 'Low';
  estimatedTraffic: number;
  contentType: string;
  callToAction: string;
}

export interface LandingPage {
  title: string;
  url: string;
  purpose: string;
  targetKeywords: string[];
  sections: string[];
  conversionGoal: string;
  targetAudience: string;
}

export interface EmailCampaign {
  subject: string;
  type: string;
  audience: string;
  content: string;
  callToAction: string;
  timing: string;
}

export interface ContentCalendarItem {
  date: string;
  contentType: string;
  title: string;
  platform: string;
  status: string;
  priority: string;
}

export interface SocialPosts {
  [platform: string]: SocialPost[];
}

export interface SocialPost {
  content: string;
  hashtags: string[];
  bestTime: string;
  engagement: string;
  callToAction: string;
  visualSuggestion: string;
}

export interface TechnicalSeoPlan {
  onPageOptimization: OnPageItem[];
  technicalIssues: TechnicalIssue[];
  structuredData: StructuredDataItem[];
  siteSpeed: SiteSpeedItem[];
  mobileOptimization: MobileItem[];
  localSeo: LocalSeoItem[];
  implementationPriority: string[];
}

export interface OnPageItem {
  element: string;
  current: string;
  recommended: string;
  impact: 'High' | 'Medium' | 'Low';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface TechnicalIssue {
  issue: string;
  description: string;
  solution: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
}

export interface StructuredDataItem {
  type: string;
  description: string;
  implementation: string;
  benefits: string[];
}

export interface SiteSpeedItem {
  metric: string;
  current: string;
  target: string;
  improvement: string;
}

export interface MobileItem {
  aspect: string;
  status: string;
  recommendation: string;
}

export interface LocalSeoItem {
  element: string;
  current: string;
  optimization: string;
  impact: string;
}

export interface ConversionPlan {
  conversionGoals: ConversionGoal[];
  userJourney: UserJourneyStep[];
  optimizationTactics: OptimizationTactic[];
  testingPlan: TestingPlan[];
  kpis: KPI[];
}

export interface ConversionGoal {
  goal: string;
  currentRate: string;
  targetRate: string;
  value: string;
  timeline: string;
}

export interface UserJourneyStep {
  stage: string;
  touchpoint: string;
  userIntent: string;
  optimization: string;
  metrics: string[];
}

export interface OptimizationTactic {
  tactic: string;
  description: string;
  implementation: string;
  expectedImpact: string;
  effort: 'Low' | 'Medium' | 'High';
}

export interface TestingPlan {
  test: string;
  hypothesis: string;
  metrics: string[];
  duration: string;
  successCriteria: string;
}

export interface KPI {
  metric: string;
  current: string;
  target: string;
  measurement: string;
}

export interface PublishingPlan {
  calendar: CalendarEvent[];
  contentTypes: ContentType[];
  distributionChannels: DistributionChannel[];
  timeline: TimelineItem[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  platform: string;
  description: string;
  keywords: string[];
  status: 'planned' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export interface ContentType {
  type: string;
  frequency: string;
  purpose: string;
  targetAudience: string;
}

export interface DistributionChannel {
  channel: string;
  contentTypes: string[];
  frequency: string;
  audience: string;
}

export interface TimelineItem {
  week: string;
  focus: string;
  deliverables: string[];
  metrics: string[];
}

export interface PerformanceInputs {
  websiteUrl: string;
  currentTraffic: number;
  conversionRate: number;
  averageOrderValue: number;
  topKeywords: string[];
  competitorUrls: string[];
  goals: string[];
  timeframe: string;
  budget: number;
  gscQueries?: string;
  gaTraffic?: string;
  metaInsights?: string;
  linkedinInsights?: string;
  twitterInsights?: string;
}

export interface PerformanceAnalysis {
  currentPerformance: PerformanceMetric[];
  opportunities: Opportunity[];
  recommendations: Recommendation[];
  projectedResults: ProjectedResult[];
  actionPlan: ActionItem[];
  competitorAnalysis: CompetitorInsight[];
}

export interface PerformanceMetric {
  metric: string;
  current: string;
  benchmark: string;
  status: 'good' | 'average' | 'poor';
}

export interface Opportunity {
  area: string;
  potential: string;
  effort: 'Low' | 'Medium' | 'High';
  timeline: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface Recommendation {
  category: string;
  action: string;
  rationale: string;
  priority: 'High' | 'Medium' | 'Low';
  resources: string[];
}

export interface ProjectedResult {
  metric: string;
  current: string;
  projected: string;
  timeline: string;
  confidence: string;
}

export interface ActionItem {
  task: string;
  owner: string;
  deadline: string;
  dependencies: string[];
  success_criteria: string;
}

export interface CompetitorInsight {
  competitor: string;
  strength: string;
  weakness: string;
  opportunity: string;
}

export interface SeoAudit {
  overallScore: number;
  technicalScore: number;
  contentScore: number;
  backlinksScore: number;
  userExperienceScore: number;
  localSeoScore: number;
  issues: AuditIssue[];
  opportunities: AuditOpportunity[];
  recommendations: AuditRecommendation[];
  competitorAnalysis: CompetitorAnalysis[];
}

export interface AuditIssue {
  category: string;
  issue: string;
  severity: 'High' | 'Medium' | 'Low';
  impact: string;
  solution: string;
}

export interface AuditOpportunity {
  area: string;
  opportunity: string;
  potential: string;
  effort: 'Low' | 'Medium' | 'High';
}

export interface AuditRecommendation {
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  action: string;
  expectedImpact: string;
  timeframe: string;
}

export interface CompetitorAnalysis {
  competitor: string;
  domain: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
}

export interface SalesInsight {
  type: 'opportunity' | 'risk' | 'trend';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  actionRequired: boolean;
  suggestedAction?: string;
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  lastModified: string;
  data: AllData;
  status: 'active' | 'completed' | 'archived';
}

export interface AllData {
  brandData: BrandData | null;
  seoAudit: SeoAudit | null;
  keywordStrategy: KeywordStrategy | null;
  contentPlan: ContentPlan | null;
  socialPosts: SocialPosts | null;
  publishingPlan: PublishingPlan | null;
  technicalSeoPlan: TechnicalSeoPlan | null;
  conversionPlan: ConversionPlan | null;
  performanceAnalysis: PerformanceAnalysis | null;
  structuredData?: StructuredDataOutput | null;
  analyticsData?: AnalyticsData;

}

export interface ApiKeys {
  gemini: string;
  openai: string;
  claude: string;
  groq: string;
  openrouter: string;
}

export type ApiProviderId = keyof ApiKeys;