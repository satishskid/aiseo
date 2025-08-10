import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BusinessInputForm } from './components/BusinessInputForm';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Step } from './components/Step';
import { SocialCard } from './components/SocialCard';
import { FinalActions } from './components/FinalActions';
import { ApiManagerModal } from './components/ApiManagerModal';
import { PublishingCalendar } from './components/PublishingCalendar';
import { CalendarEventModal } from './components/CalendarEventModal';
import { SalesCoachPanel } from './components/SalesCoachPanel';
import { ActionableTechnicalSeo } from './components/ActionableTechnicalSeo';
import { ActionableConversionPlan } from './components/ActionableConversionPlan';
import { ProjectManager } from './components/ProjectManager';
import { UserGuidance, Notification } from './components/UserGuidance';
import { UserManual } from './components/UserManual';
import { useApiKey } from './context/ApiKeyContext';
import { useDemoAuth } from './context/DemoAuthContext';
import { GeminiService, AIService } from './services/aiService';
import { SOCIAL_PLATFORMS } from './constants';
import type { 
  BrandData, 
  AnalyticsData,
  KeywordStrategy,
  ContentPlan,
  SocialPosts,
  PublishingPlan,
  TechnicalSeoPlan,
  ConversionPlan,
  PerformanceAnalysis,
  SeoAudit,
  Project,
  SalesInsight,
  CalendarEvent
} from './types';

const App: React.FC = () => {
  const { apiKeys } = useApiKey();
  const { currentUser, logout } = useDemoAuth();
  const [aiService, setAiService] = useState<AIService | null>(null);

  // --- State for Data ---
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [seoAudit, setSeoAudit] = useState<SeoAudit | null>(null);
  const [keywordStrategy, setKeywordStrategy] = useState<KeywordStrategy | null>(null);
  const [contentPlan, setContentPlan] = useState<ContentPlan | null>(null);
  const [socialPosts, setSocialPosts] = useState<SocialPosts | null>(null);
  const [publishingPlan, setPublishingPlan] = useState<PublishingPlan | null>(null);
  const [technicalSeoPlan, setTechnicalSeoPlan] = useState<TechnicalSeoPlan | null>(null);
  const [conversionPlan, setConversionPlan] = useState<ConversionPlan | null>(null);
  const [performanceAnalysis, setPerformanceAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [salesInsights, setSalesInsights] = useState<SalesInsight[]>([]);
  
  // --- State for UI ---
  const [loading, setLoading] = useState({
    foundation: false,
    keywords: false,
    content: false,
    calendar: false,
    technical: false,
    conversion: false,
    performance: false
  });
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showApiManager, setShowApiManager] = useState(false);
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [showUserManual, setShowUserManual] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [savedDemos, setSavedDemos] = useState<string[]>([]);
  const [isSalesCoachOpen, setSalesCoachOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info' | 'warning'} | null>(null);
  const [showGuidance, setShowGuidance] = useState(true);
  const [currentGuidanceStep, setCurrentGuidanceStep] = useState('start');

  // For calendar events
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);

  // Initialize AI Service when API keys are available
  useEffect(() => {
    if (apiKeys.gemini) {
      try {
        const service = new GeminiService(apiKeys.gemini);
        setAiService(service);
      } catch (error) {
        console.error('Failed to initialize AI service:', error);
      }
    }
  }, [apiKeys]);

  // Mock data for demonstration
  const mockBrandData: BrandData = {
    name: "HealthPlus Clinic",
    website: "https://healthplus.clinic",
    businessType: "Healthcare",
    serviceType: "Clinic",
    locationScope: "Local",
    specificLocations: "Mumbai",
    selectedCities: ["Mumbai"],
    linkedinHandle: "healthplusclinic",
    twitterHandle: "healthplusclinic",
    facebookHandle: "healthplusclinic",
    description: "Advanced diagnostic services with same-day results",
    targetCustomer: "Health-conscious individuals in Mumbai",
    keyServices: "Diagnostic testing, health checkups, specialized screenings"
  };



  const mockAnalyticsData: AnalyticsData = {
    keywords: 125,
    contentPieces: 24,
    socialPosts: 48,
    estimatedReach: 50000,
    competitiveScore: 78,
    seoScore: 82
  };

  const mockSeoAudit: SeoAudit = {
    overallScore: 85,
    technicalScore: 80,
    contentScore: 75,
    backlinksScore: 70,
    userExperienceScore: 90,
    localSeoScore: 85,
    issues: [
      {
        category: "Technical",
        issue: "Missing alt tags on images",
        severity: "Medium",
        impact: "Accessibility and SEO",
        solution: "Add descriptive alt tags to all images"
      }
    ],
    opportunities: [
      {
        area: "Content",
        opportunity: "Add more blog posts about health topics",
        potential: "Increase organic traffic by 30%",
        effort: "Medium"
      }
    ],
    recommendations: [
      {
        priority: "High",
        category: "Technical",
        action: "Optimize site speed",
        expectedImpact: "Improve user experience and SEO",
        timeframe: "2 weeks"
      }
    ],
    competitorAnalysis: [
      {
        competitor: "Apollo Hospitals",
        domain: "apollohospitals.com",
        strengths: ["Strong backlink profile", "Comprehensive content"],
        weaknesses: ["Slow loading times", "Poor mobile experience"],
        opportunities: ["Better local SEO targeting", "More engaging content"]
      }
    ]
  };

  const mockKeywordStrategy: KeywordStrategy = {
    primaryKeywords: ["advanced diagnostics Mumbai", "same day test results Mumbai"],
    urgentKeywords: ["emergency diagnostic tests", "urgent health checkup"],
    serviceKeywords: ["MRI scan Mumbai", "blood test lab"],
    problemKeywords: ["health checkup near me", "diagnostic center Mumbai"],
    longTailKeywords: ["affordable advanced diagnostic tests Mumbai", "fast MRI scan Mumbai same day"],
    locationKeywords: ["Mumbai diagnostic center", "health checkup Mumbai"],
    competitorKeywords: ["Apollo diagnostics Mumbai", "Fortis health checkup"],
    keywordDifficulty: {
      "advanced diagnostics Mumbai": 45,
      "same day test results Mumbai": 35
    },
    searchVolume: {
      "advanced diagnostics Mumbai": 1200,
      "same day test results Mumbai": 800
    },
    keywordOpportunities: ["health screening packages", "preventive health checkup"],
    seasonalKeywords: ["New year health checkup", "summer wellness package"],
    voiceSearchKeywords: ["nearby diagnostic center", "best health checkup"]
  };

  const mockContentPlan: ContentPlan = {
    blogPosts: [
      {
        title: "10 Signs You Need Advanced Diagnostic Testing",
        slug: "10-signs-advanced-diagnostic-testing",
        metaDescription: "Learn when you should consider advanced diagnostic testing for better health outcomes",
        targetKeywords: ["diagnostic testing", "health symptoms"],
        outline: ["Introduction", "10 signs with explanations", "When to see a doctor", "Conclusion"],
        wordCount: 1500,
        difficulty: "Medium",
        priority: "High",
        estimatedTraffic: 500,
        contentType: "Educational",
        callToAction: "Book your comprehensive health checkup today"
      }
    ],
    landingPages: [
      {
        title: "Comprehensive Health Checkup Packages",
        url: "/health-checkup-packages",
        purpose: "Promote health checkup packages",
        targetKeywords: ["health checkup packages", "Mumbai diagnostic tests"],
        sections: ["Package options", "Benefits", "Pricing", "Testimonials", "CTA"],
        conversionGoal: "Booking form submission",
        targetAudience: "Health-conscious professionals in Mumbai"
      }
    ],
    emailCampaigns: [
      {
        subject: "Summer Health Checkup Offers - Limited Period",
        type: "Promotional",
        audience: "Previous customers",
        content: "Promotional offer for summer health checkup packages",
        callToAction: "Book Now",
        timing: "Summer season"
      }
    ],
    contentCalendar: [
      {
        date: "2023-06-15",
        contentType: "Blog Post",
        title: "10 Signs You Need Advanced Diagnostic Testing",
        platform: "Website",
        status: "planned",
        priority: "high"
      }
    ],
    contentThemes: ["Preventive Healthcare", "Diagnostic Technology", "Health Tips"],
    contentPillars: ["Education", "Promotion", "Community"],
    repurposingStrategy: ["Blog to social posts", "Video to infographics"]
  };

  const mockSocialPosts: SocialPosts = {
    linkedin: [
      {
        content: "Did you know early detection can save lives? Our advanced diagnostic services in Mumbai offer same-day results for most tests. Book your comprehensive health checkup today!",
        hashtags: ["#Healthcare", "#Diagnostics", "#Mumbai"],
        bestTime: "Tuesday 10:00 AM",
        engagement: "High",
        callToAction: "Book Now",
        visualSuggestion: "Infographic showing diagnostic process"
      }
    ],
    twitter: [
      {
        content: "Same-day diagnostic results in Mumbai! Our advanced testing facilities ensure you get your health reports within 24 hours. #Healthcare #Diagnostics #Mumbai",
        hashtags: ["#Healthcare", "#Diagnostics", "#Mumbai"],
        bestTime: "Monday 2:00 PM",
        engagement: "Medium",
        callToAction: "Learn More",
        visualSuggestion: "Image of diagnostic equipment"
      }
    ],
    facebook: [
      {
        content: "Your health matters! Get comprehensive health checkups with same-day results at our Mumbai clinic. Early detection saves lives. Book your appointment today!",
        hashtags: ["#Healthcare", "#HealthCheckup", "#Mumbai"],
        bestTime: "Wednesday 4:00 PM",
        engagement: "High",
        callToAction: "Book Appointment",
        visualSuggestion: "Family health image"
      }
    ],
    instagram: [
      {
        content: "Your health journey starts here! Advanced diagnostics with same-day results. Early detection saves lives. #Healthcare #Diagnostics #Mumbai",
        hashtags: ["#Healthcare", "#Diagnostics", "#Mumbai"],
        bestTime: "Friday 11:00 AM",
        engagement: "High",
        callToAction: "Book Your Checkup",
        visualSuggestion: "Doctor with patient"
      }
    ]
  };

  const mockPublishingPlan: PublishingPlan = {
    calendar: [
      {
        id: "1",
        title: "10 Signs You Need Advanced Diagnostic Testing",
        date: "2023-06-15",
        time: "09:00",
        type: "blog",
        platform: "website",
        description: "Educational blog post about diagnostic testing importance",
        keywords: ["diagnostic testing", "health symptoms"],
        status: "planned",
        priority: "high"
      },
      {
        id: "2",
        title: "Same-day diagnostic results in Mumbai!",
        date: "2023-06-17",
        time: "14:00",
        type: "social",
        platform: "twitter",
        description: "Twitter post promoting our fast service",
        keywords: ["same day results", "Mumbai"],
        status: "planned",
        priority: "medium"
      },
      {
        id: "3",
        title: "Comprehensive Health Checkup Packages",
        date: "2023-06-20",
        time: "10:00",
        type: "landing",
        platform: "website",
        description: "New landing page for our health packages",
        keywords: ["health checkup packages", "Mumbai"],
        status: "planned",
        priority: "high"
      }
    ],
    contentTypes: [
      {
        type: "Blog Post",
        frequency: "Weekly",
        purpose: "Education",
        targetAudience: "Health-conscious individuals"
      }
    ],
    distributionChannels: [
      {
        channel: "Website",
        contentTypes: ["Blog Post", "Landing Page"],
        frequency: "Daily",
        audience: "General public"
      }
    ],
    timeline: [
      {
        week: "Week 1",
        focus: "Brand awareness",
        deliverables: ["2 blog posts", "4 social posts"],
        metrics: ["Engagement rate", "Traffic"]
      }
    ]
  };

  const mockTechnicalSeoPlan: TechnicalSeoPlan = {
    onPageOptimization: [
      {
        element: "Title tags",
        current: "Generic titles",
        recommended: "Keyword-rich descriptive titles",
        impact: "High",
        difficulty: "Easy"
      }
    ],
    technicalIssues: [
      {
        issue: "Slow page load times",
        description: "Pages taking more than 3 seconds to load",
        solution: "Optimize images and implement caching",
        priority: "High",
        estimatedTime: "2 weeks"
      }
    ],
    structuredData: [
      {
        type: "MedicalOrganization",
        description: "Schema for clinic information",
        implementation: "Add JSON-LD markup to homepage",
        benefits: ["Rich snippets in search results", "Better understanding by search engines"]
      }
    ],
    siteSpeed: [
      {
        metric: "Page Load Time",
        current: "3.5s",
        target: "Under 2s",
        improvement: "Optimize images and implement lazy loading"
      }
    ],
    mobileOptimization: [
      {
        aspect: "Responsive Design",
        status: "Good",
        recommendation: "Improve touch targets for better UX"
      }
    ],
    localSeo: [
      {
        element: "Google My Business",
        current: "Basic listing",
        optimization: "Add photos, posts, and Q&A",
        impact: "High for local searches"
      }
    ],
    implementationPriority: ["Fix page speed issues", "Implement structured data", "Optimize for mobile"]
  };

  const mockConversionPlan: ConversionPlan = {
    conversionGoals: [
      {
        goal: "Increase online appointment bookings",
        currentRate: "2.5%",
        targetRate: "4.0%",
        value: "Higher patient acquisition",
        timeline: "3 months"
      }
    ],
    userJourney: [
      {
        stage: "Awareness",
        touchpoint: "Social media and blog content",
        userIntent: "Learning about health topics",
        optimization: "Provide valuable educational content",
        metrics: ["Page views", "Time on page"]
      }
    ],
    optimizationTactics: [
      {
        tactic: "Add patient testimonials",
        description: "Display real patient success stories",
        implementation: "Create dedicated testimonials section",
        expectedImpact: "Increase trust and conversion rate",
        effort: "Low"
      }
    ],
    testingPlan: [
      {
        test: "Different CTA button colors",
        hypothesis: "Red buttons will have higher click-through rates",
        metrics: ["Click-through rate", "Conversion rate"],
        duration: "2 weeks",
        successCriteria: "10% increase in clicks"
      }
    ],
    kpis: [
      {
        metric: "Conversion rate",
        current: "2.8%",
        target: "5%",
        measurement: "Booking form submissions"
      }
    ]
  };

  const mockPerformanceAnalysis: PerformanceAnalysis = {
    currentPerformance: [
      {
        metric: "Organic Traffic",
        current: "15,000",
        benchmark: "18,000",
        status: "average"
      }
    ],
    opportunities: [
      {
        area: "Content Quality",
        potential: "20% traffic increase",
        effort: "Medium",
        timeline: "1 month",
        impact: "High"
      }
    ],
    recommendations: [
      {
        category: "SEO",
        action: "Improve content quality",
        rationale: "Current content lacks depth and engagement",
        priority: "High",
        resources: ["Content writer", "SEO specialist"]
      }
    ],
    projectedResults: [
      {
        metric: "Organic Traffic",
        current: "15,000",
        projected: "18,000",
        timeline: "3 months",
        confidence: "High"
      }
    ],
    actionPlan: [
      {
        task: "Create 4 blog posts per month",
        owner: "Content team",
        deadline: "2023-09-30",
        dependencies: ["Keyword research"],
        success_criteria: "Publish 12 posts in 3 months"
      }
    ],
    competitorAnalysis: [
      {
        competitor: "Apollo Hospitals",
        strength: "Strong backlink profile",
        weakness: "Poor mobile experience",
        opportunity: "Better local SEO targeting"
      }
    ],
    organicTrafficProjection: "18,000 visitors/month",
    socialMediaProjection: "25% engagement increase",
    engagementMetrics: {
      avgTimeOnPage: "2:30 minutes",
      bounceRate: "45%",
      pagesPerSession: "3.2"
    },
    conversionEstimates: {
      leadGeneration: "150 leads/month",
      salesConversion: "3.5%",
      roiProjection: "4:1"
    }
  };

  // Initialize with mock data for demo
  useEffect(() => {
    if (isDemoMode) {
      setBrandData(mockBrandData);
      setSeoAudit(mockSeoAudit);
      setKeywordStrategy(mockKeywordStrategy);
      setContentPlan(mockContentPlan);
      setSocialPosts(mockSocialPosts);
      setPublishingPlan(mockPublishingPlan);
      setTechnicalSeoPlan(mockTechnicalSeoPlan);
      setConversionPlan(mockConversionPlan);
      setPerformanceAnalysis(mockPerformanceAnalysis);
    }
  }, [isDemoMode]);

  const handleSignOut = async () => {
    try {
      logout();
      setNotification({ message: 'Successfully signed out', type: 'success' });
    } catch (error) {
      console.error('Sign out error:', error);
      setNotification({ message: 'Failed to sign out', type: 'warning' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' patternUnits='userSpaceOnUse' width='100' height='100'><circle cx='20' cy='20' r='1' fill='%23e2e8f0' opacity='0.4'/><circle cx='80' cy='80' r='1' fill='%23cbd5e1' opacity='0.3'/><circle cx='40' cy='60' r='0.5' fill='%23f1f5f9' opacity='0.6'/></pattern></defs><rect width='100' height='100' fill='url(%23grain)'/></svg>')] opacity-30"></div>
      
      {/* Header */}
      <Header 
        onManageApiKeys={() => setShowApiManager(true)}
        onGenerateNewDemo={() => {}}
        onLoadDemo={() => {}}
        onManageProjects={() => setShowProjectManager(true)}
        onOpenUserManual={() => setShowUserManual(true)}
        onSignOut={handleSignOut}
        savedDemos={savedDemos}
        currentProject={currentProject}
      />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <div className="glass-effect rounded-3xl shadow-depth p-8 mb-8 border border-white/50">
          <div className="text-center mb-8">
            <div className="mb-6">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
                AI SEO Automation Platform
              </h1>
              {currentUser && (
                <div className="inline-flex items-center gap-4 bg-gradient-to-r from-brand-primary-start/15 to-brand-primary-end/15 border-2 border-brand-primary-start/30 rounded-2xl px-8 py-4 mb-6 shadow-depth">
                  <div className="w-10 h-10 bg-gradient-to-r from-brand-primary-start to-brand-primary-end rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {currentUser.firstName[0]}{currentUser.lastName[0]}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg">
                      Welcome, {currentUser.firstName} {currentUser.lastName}
                    </div>
                    <div className="text-base text-gray-700 font-medium">
                      {currentUser.company} • {currentUser.industry}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xl text-gray-900 max-w-3xl mx-auto leading-relaxed font-semibold">
              Generate comprehensive SEO strategies powered by advanced AI algorithms
            </p>
          </div>
          
          {/* Business Input Form */}
          <BusinessInputForm 
            isLoadingFoundation={loading.foundation}
            isLoadingStrategy={loading.keywords}
            onGenerateInitialAnalysis={() => {}}
            onConfirmAndGenerateStrategy={() => {}}
            foundationData={brandData || undefined}
            seoAudit={seoAudit || undefined}
            onToggleAnalytics={() => {}}
            isDemoMode={isDemoMode}
            currentProject={currentProject || undefined}
          />
          
          {/* SEO Strategy Steps */}
          <div className="mt-12 space-y-8">
            {/* SEO Audit Step */}
            <Step 
              stepNumber="1" 
              title="SEO Audit & Baseline Analysis" 
              isUnlocked={true}
              isCompleted={completedSteps.includes('audit')}
              isLoading={loading.foundation}
            >
              {seoAudit ? (
                <div className="mt-4">
                  <AnalyticsDashboard data={mockAnalyticsData} />
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                  <p className="text-blue-900 font-semibold text-lg">Complete the business information to generate your SEO audit.</p>
                </div>
              )}
            </Step>
            
            {/* Keyword Strategy Step */}
            <Step 
              stepNumber="2" 
              title="Keyword Strategy" 
              isUnlocked={completedSteps.includes('audit')}
              isCompleted={completedSteps.includes('keywords')}
              isLoading={loading.keywords}
            >
              {keywordStrategy ? (
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Primary Keywords</h3>
                      <ul className="space-y-2">
                        {keywordStrategy.primaryKeywords.map((keyword, index) => (
                          <li key={index} className="bg-blue-50 p-3 rounded-lg">
                            <div className="font-medium">{keyword}</div>
                            <div className="text-sm text-gray-800 font-medium">
                              Volume: {keywordStrategy.searchVolume[keyword] || 'N/A'} | Difficulty: {keywordStrategy.keywordDifficulty[keyword] || 'N/A'}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Long-tail Keywords</h3>
                      <ul className="space-y-2">
                        {keywordStrategy.longTailKeywords.map((keyword, index) => (
                          <li key={index} className="bg-green-50 p-3 rounded-lg">
                            <div className="font-medium">{keyword}</div>
                            <div className="text-sm text-gray-800 font-medium">
                              Volume: {keywordStrategy.searchVolume[keyword] || 'N/A'} | Difficulty: {keywordStrategy.keywordDifficulty[keyword] || 'N/A'}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Location Keywords</h3>
                      <ul className="space-y-2">
                        {keywordStrategy.locationKeywords.map((keyword, index) => (
                          <li key={index} className="bg-purple-50 p-3 rounded-lg">
                            <div className="font-medium">{keyword}</div>
                            <div className="text-sm text-gray-800 font-medium">
                              Volume: {keywordStrategy.searchVolume[keyword] || 'N/A'} | Difficulty: {keywordStrategy.keywordDifficulty[keyword] || 'N/A'}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
                  <p className="text-orange-900 font-semibold text-lg">Complete the SEO audit to generate your keyword strategy.</p>
                </div>
              )}
            </Step>
            
            {/* Content Plan Step */}
            <Step 
              stepNumber="3" 
              title="Content Plan & Social Media Strategy" 
              isUnlocked={completedSteps.includes('keywords')}
              isCompleted={completedSteps.includes('content')}
              isLoading={loading.content}
            >
              {contentPlan && socialPosts ? (
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Content Plan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {contentPlan.blogPosts.map((post, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium">{post.title}</h4>
                          <p className="text-sm text-gray-800 mt-2">{post.outline.join(', ')}</p>
                          <div className="mt-2 text-xs text-gray-700 font-medium">
                            Target: {post.targetKeywords.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Social Media Posts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {SOCIAL_PLATFORMS.map(platform => {
                        const posts = socialPosts[platform.id as keyof SocialPosts] || [];
                        // Extract the content from each SocialPost object to create an array of strings
                        const postContents = posts.map(post => post.content);
                        return (
                          <SocialCard 
                            key={`${platform.id}-${postContents.length}`} 
                            platform={platform}
                            posts={postContents}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
                  <p className="text-orange-900 font-semibold text-lg">Complete the keyword strategy to generate your content plan.</p>
                </div>
              )}
            </Step>
            
            {/* Publishing Calendar Step */}
            <Step 
              stepNumber="4" 
              title="Publishing Calendar" 
              isUnlocked={completedSteps.includes('content')}
              isCompleted={completedSteps.includes('calendar')}
              isLoading={calendarLoading}
            >
              {publishingPlan ? (
                <div className="mt-4">
                  <PublishingCalendar 
                    plan={publishingPlan}
                    isLoading={calendarLoading}
                    onEventClick={(event) => {
                      setSelectedEvent(event);
                      setShowEventModal(true);
                    }}
                  />
                </div>
              ) : (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
                  <p className="text-purple-900 font-semibold text-lg">Complete the content plan to generate your publishing calendar.</p>
                </div>
              )}
            </Step>
            
            {/* Technical SEO Step */}
            <Step 
              stepNumber="5" 
              title="Technical SEO Recommendations" 
              isUnlocked={completedSteps.includes('calendar')}
              isCompleted={completedSteps.includes('technical')}
              isLoading={loading.technical}
            >
              {technicalSeoPlan ? (
                <div className="mt-4">
                  <ActionableTechnicalSeo data={technicalSeoPlan} />
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <p className="text-green-900 font-semibold text-lg">Complete the publishing calendar to generate technical SEO recommendations.</p>
                </div>
              )}
            </Step>
            
            {/* Conversion Optimization Step */}
            <Step 
              stepNumber="6" 
              title="Conversion Optimization Plan" 
              isUnlocked={completedSteps.includes('technical')}
              isCompleted={completedSteps.includes('conversion')}
              isLoading={loading.conversion}
            >
              {conversionPlan ? (
                <div className="mt-4">
                  <ActionableConversionPlan data={conversionPlan} />
                </div>
              ) : (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center">
                  <p className="text-indigo-900 font-semibold text-lg">Complete the technical SEO recommendations to generate conversion optimization plan.</p>
                </div>
              )}
            </Step>
            
            {/* Performance Analysis Step */}
            <Step 
              stepNumber="7" 
              title="Performance Analysis & ROI Projections" 
              isUnlocked={completedSteps.includes('conversion')}
              isCompleted={completedSteps.includes('performance')}
              isLoading={loading.performance}
            >
              {performanceAnalysis ? (
                <div className="mt-4">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Performance Projections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Current Performance</h4>
                        <ul className="space-y-1 text-sm">
                          {performanceAnalysis.currentPerformance.map((metric, index) => (
                            <li key={index}>{metric.metric}: {metric.current}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">ROI Projections</h4>
                        <ul className="space-y-1 text-sm">
                          <li>Organic Traffic: {performanceAnalysis.organicTrafficProjection}</li>
                          <li>Social Media: {performanceAnalysis.socialMediaProjection}</li>
                          <li>Engagement: {performanceAnalysis.engagementMetrics?.avgTimeOnPage} avg time</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                  <p className="text-yellow-900 font-semibold text-lg">Complete the conversion optimization plan to generate performance analysis.</p>
                </div>
              )}
            </Step>
          </div>
          
          {/* Final Actions */}
          <div className="mt-12">
            <FinalActions 
              allData={{
                brandData: brandData || undefined,
                seoAudit: seoAudit || undefined,
                keywordStrategy: keywordStrategy || undefined,
                contentPlan: contentPlan || undefined,
                socialPosts: socialPosts || undefined,
                publishingPlan: publishingPlan || undefined,
                technicalSeoPlan: technicalSeoPlan || undefined,
                conversionPlan: conversionPlan || undefined,
                performanceAnalysis: performanceAnalysis || undefined
              }}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      {showApiManager && (
        <ApiManagerModal 
          isOpen={showApiManager}
          onClose={() => setShowApiManager(false)}
        />
      )}
      
      {showProjectManager && (
        <ProjectManager 
          currentProject={currentProject}
          onProjectSelect={setCurrentProject}
          onProjectSave={() => {}}
          isOpen={showProjectManager}
          onClose={() => setShowProjectManager(false)}
        />
      )}
      
      {showUserManual && (
        <UserManual 
          isOpen={showUserManual}
          onClose={() => setShowUserManual(false)}
        />
      )}
      
      {selectedEvent && (
        <CalendarEventModal 
          event={selectedEvent}
          onClose={() => setShowEventModal(false)}
        />
      )}
      
      {isDemoMode && (
        <SalesCoachPanel 
          insights={salesInsights}
          isOpen={isSalesCoachOpen}
          onToggle={() => setSalesCoachOpen(!isSalesCoachOpen)}
        />
      )}
      
      {/* User Guidance */}
      <UserGuidance
        currentStep={currentGuidanceStep}
        completedSteps={completedSteps}
        isVisible={showGuidance}
        onClose={() => setShowGuidance(false)}
        onStepChange={(nextStep) => setCurrentGuidanceStep(nextStep)}
      />
      
      {/* Notifications */}
      {notification && (
        <Notification 
          message={notification.message}
          type={notification.type}
          isVisible={!!notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default App;