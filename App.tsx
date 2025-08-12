import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BusinessInputForm } from './components/BusinessInputForm';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AIHealthDashboard } from './components/AIHealthDashboard';
import { AIArchitectureMap } from './components/AIArchitectureMap';
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
import { SystemErrorAlert } from './components/SystemErrorAlert';
import { useApiKey } from './context/ApiKeyContext';
import { useDemoAuth } from './context/DemoAuthContext';
import { GeminiService, AIService } from './services/aiService';
import { SOCIAL_PLATFORMS, baseButtonClasses, primaryButtonClasses } from './constants';
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
  CalendarEvent,
  InitialBrandInput,
  AllData,
  PerformanceInputs
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
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  
  // Real vs Mock Analytics Data
  const [realAnalyticsData, setRealAnalyticsData] = useState<AnalyticsData | null>(null);
  const [analyticsResponseTime, setAnalyticsResponseTime] = useState<number | null>(null);
  const [analyticsLastUpdated, setAnalyticsLastUpdated] = useState<string | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState<boolean>(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [showHealthDashboard, setShowHealthDashboard] = useState(false);
  const [showArchitectureMap, setShowArchitectureMap] = useState(false);
  const [aiHealthStatus, setAiHealthStatus] = useState<'healthy' | 'partial' | 'mock'>('mock');
  
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
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info' | 'warning' | 'error', isVisible: boolean} | null>(null);
  const [showGuidance, setShowGuidance] = useState(true);
  const [currentGuidanceStep, setCurrentGuidanceStep] = useState('start');

  // System Error Alert State
  const [systemError, setSystemError] = useState<{
    isVisible: boolean;
    errorType: 'API_KEY_MISSING' | 'AI_SERVICE_FAILURE' | 'INVALID_STATE' | 'GENERIC';
    message?: string;
  }>({ isVisible: false, errorType: 'GENERIC' });

  const handleEventClick = (eventInfo: any) => {
    // This is a simplified version. You might need to adjust based on how you store events.
    const clickedEvent = calendarEvents.find(e => e.id === eventInfo.id);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setShowEventModal(true);
    }
  };

  // For calendar events
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Dummy handlers for Header props
  const handleManageApiKeys = () => setShowApiManager(true);
  const handleManageProjects = () => setShowProjectManager(true);
  const handleOpenUserManual = () => setShowUserManual(true);
  const handleSignOut = () => logout();


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

  // 🚨 MOCK DATA DEFINITIONS (RETAINED FOR TESTING/DEVELOPMENT ONLY)
  // These mock objects are NO LONGER USED as fallbacks in the strict AI-only approach
  // They are kept only for testing components, health checks, and development purposes
  // The main application flow now REQUIRES real AI and will NOT fall back to this data
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
    keyServices: "Diagnostic testing, health checkups, specialized screenings"  };

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
    expertAdvice: {
      publishingCadence: "2 blog posts and 5 social media posts per week",
      strategyDuration: "90 days",
      metricsToTrack: ["Organic Traffic", "Keyword Rankings", "Conversion Rate"]
    },
    calendar: [
      {
        day: 15,
        type: "blog",
        platform: "Website",
        title: "10 Signs You Need Advanced Diagnostic Testing",
        details: "A detailed blog post about the importance of diagnostic testing."
      },
      {
        day: 17,
        type: "social",
        platform: "LinkedIn",
        title: "LinkedIn Post: Early Detection",
        details: "A post about how early detection can save lives."
      },
      {
        day: 20,
        type: "social",
        platform: "Facebook",
        title: "Facebook Post: Health Checkups",
        details: "A post promoting comprehensive health checkup packages."
      }
    ],
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
    recommendations: [{ category: "Content", action: "Create more video content", rationale: "Higher engagement", priority: "High", resources: ["Video editor"] }],
    projectedResults: [{ metric: "Organic Traffic", current: "1000/month", projected: "1500/month", timeline: "3 months", confidence: "High" }],
    actionPlan: [{ task: "Optimize landing page", owner: "Marketing", deadline: "2 weeks", dependencies: [], success_criteria: "10% conversion increase" }],
    competitorAnalysis: [{ competitor: "competitor.com", strength: "High domain authority", weakness: "Poor mobile experience", opportunity: "Target long-tail keywords" }]
  };

  const mockSalesInsights: SalesInsight[] = [
    {
      type: 'opportunity',
      title: 'High demand for "same-day results"',
      description: 'Keyword analysis shows high search volume for "same-day test results", indicating a strong market need.',
      impact: 'High',
      actionRequired: true,
      suggestedAction: 'Create a dedicated landing page for same-day result services.'
    },
    {
      type: 'risk',
      title: 'Competitor "Apollo" ranks high for primary keywords',
      description: 'Apollo Hospitals has strong SEO for our target keywords. We need a robust content strategy to compete.',
      impact: 'Medium',
      actionRequired: true,
      suggestedAction: 'Focus on long-tail keywords and local SEO to find a niche.'
    }
  ];

  const handleGenerateFoundation = async (input: InitialBrandInput) => {
    if (!aiService) return;
    setLoading(prev => ({ ...prev, foundation: true }));
    try {
      const foundationResult = await aiService.generateBusinessFoundation(input);
      const fullBrandData: BrandData = { ...input, ...foundationResult };
      setBrandData(fullBrandData);
      setCompletedSteps(prev => [...prev, 'foundation']);
      setNotification({ message: 'Foundation data generated successfully!', type: 'success', isVisible: true });
    } catch (error) {
      setNotification({ message: 'Error generating foundation data.', type: 'error', isVisible: true });
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, foundation: false }));
    }
  };

  const handleGenerateKeywords = async () => {
    if (!aiService || !brandData) return;
    setLoading(prev => ({ ...prev, keywords: true }));
    try {
      const result = await aiService.generateKeywordStrategy(brandData);
      setKeywordStrategy(result);
      setCompletedSteps(prev => [...prev, 'keywords']);
      setNotification({ message: 'Keyword strategy generated successfully!', type: 'success', isVisible: true });
    } catch (error) {
      setNotification({ message: 'Error generating keyword strategy.', type: 'error', isVisible: true });
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, keywords: false }));
    }
  };

  const handleGenerateContent = async () => {
    if (!aiService || !brandData || !keywordStrategy) return;
    setLoading(prev => ({ ...prev, content: true }));
    try {
      const { contentPlan, socialPosts } = await aiService.generateContentAndSocial(brandData, keywordStrategy);
      setContentPlan(contentPlan);
      setSocialPosts(socialPosts);
      setCompletedSteps(prev => [...prev, 'content']);
      setNotification({ message: 'Content plan generated successfully!', type: 'success', isVisible: true });
    } catch (error) {
      setNotification({ message: 'Error generating content plan.', type: 'error', isVisible: true });
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, content: false }));
    }
  };

  const handleGenerateCalendar = async () => {
    if (!aiService || !brandData || !keywordStrategy || !contentPlan) return;
    setLoading(prev => ({ ...prev, calendar: true }));
    try {
      const allData: AllData = {
        brandData,
        seoAudit,
        keywordStrategy,
        contentPlan,
        socialPosts,
        publishingPlan,
        technicalSeoPlan,
        conversionPlan,
        performanceAnalysis,
        salesInsights,
        structuredData: null,
      };
      const result = await aiService.generatePublishingCalendar(allData);
      setPublishingPlan(result);

      const events: CalendarEvent[] = result.calendar.map((item, index) => {
        const eventDate = new Date();
        eventDate.setDate(eventDate.getDate() + item.day);
        return {
          id: `${item.type}-${index}`,
          title: item.title,
          start: eventDate.toISOString().split('T')[0],
          allDay: true,
          extendedProps: {
            type: item.type,
            platform: item.platform,
            details: item.details,
            status: 'planned',
          },
        };
      });
      setCalendarEvents(events);

      setCompletedSteps(prev => [...prev, 'calendar']);
      setNotification({ message: 'Publishing calendar generated successfully!', type: 'success', isVisible: true });
    } catch (error) {
      setNotification({ message: 'Error generating publishing calendar.', type: 'error', isVisible: true });
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, calendar: false }));
    }
  };

  const handleGenerateTechnicalSeo = async () => {
    if (!aiService || !brandData) return;
    setLoading(prev => ({ ...prev, technical: true }));
    try {
      const result = await aiService.generateTechnicalSeo(brandData);
      setTechnicalSeoPlan(result);
      setCompletedSteps(prev => [...prev, 'technical']);
      setNotification({ message: 'Technical SEO plan generated successfully!', type: 'success', isVisible: true });
    } catch (error) {
      setNotification({ message: 'Error generating technical SEO plan.', type: 'error', isVisible: true });
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, technical: false }));
    }
  };

  const handleGenerateConversion = async () => {
    if (!aiService || !brandData) return;
    setLoading(prev => ({ ...prev, conversion: true }));
    try {
      const result = await aiService.generateConversionPlan(brandData);
      setConversionPlan(result);
      setCompletedSteps(prev => [...prev, 'conversion']);
      setNotification({ message: 'Conversion plan generated successfully!', type: 'success', isVisible: true });
    } catch (error) {
      setNotification({ message: 'Error generating conversion plan.', type: 'error', isVisible: true });
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, conversion: false }));
    }
  };

  const handleGeneratePerformance = async () => {
    if (!aiService || !brandData) return;
    setLoading(prev => ({ ...prev, performance: true }));
    try {
      const allData: AllData = {
        brandData,
        seoAudit,
        keywordStrategy,
        contentPlan,
        socialPosts,
        publishingPlan,
        technicalSeoPlan,
        conversionPlan,
        performanceAnalysis,
        salesInsights,
        structuredData: null,
      };
      // Mock inputs as there's no UI to collect this yet
      const performanceInputs: PerformanceInputs = {
        websiteUrl: brandData.website || '',
        currentTraffic: 15000,
        conversionRate: 0.03,
        averageOrderValue: 100,
        topKeywords: keywordStrategy?.primaryKeywords.slice(0, 5) || [],
        competitorUrls: [],
        goals: ['Increase organic traffic by 20%', 'Improve conversion rate to 4%'],
        timeframe: '3 months',
        budget: 5000,
      };
      const result = await aiService.analyzePerformanceData(allData, performanceInputs);
      setPerformanceAnalysis(result);
      setCompletedSteps(prev => [...prev, 'performance']);
      setNotification({ message: 'Performance analysis generated successfully!', type: 'success', isVisible: true });
    } catch (error) {
      setNotification({ message: 'Error generating performance analysis.', type: 'error', isVisible: true });
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, performance: false }));
    }
  };

  const allData: AllData = {
    brandData,
    seoAudit,
    keywordStrategy,
    contentPlan,
    socialPosts,
    publishingPlan,
    technicalSeoPlan,
    conversionPlan,
    performanceAnalysis,
    salesInsights,
    structuredData: null,
  };

  const keywordCategories: (keyof KeywordStrategy)[] = [
    'primaryKeywords', 'urgentKeywords', 'serviceKeywords', 
    'problemKeywords', 'longTailKeywords', 'locationKeywords', 
    'competitorKeywords', 'keywordOpportunities', 'seasonalKeywords', 'voiceSearchKeywords'
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header 
        onManageApiKeys={handleManageApiKeys}
        onManageProjects={handleManageProjects}
        onOpenUserManual={handleOpenUserManual}
        onSignOut={handleSignOut}
        currentUser={currentUser}
        currentProject={currentProject}
      />
      <main className="p-4 md:p-8">
        <SystemErrorAlert
          isVisible={systemError.isVisible}
          errorType={systemError.errorType}
          errorMessage={systemError.message}
          onClose={() => setSystemError({ isVisible: false, errorType: 'GENERIC' })}
          onContactAdmin={() => alert('Please contact your system administrator.')}
          onRetry={() => window.location.reload()}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Step title="Step 1: Business Foundation" isAlwaysOpen isCompleted={completedSteps.includes('foundation')}>
              <BusinessInputForm
                foundationData={brandData}
                onGenerateInitialAnalysis={handleGenerateFoundation}
                isLoadingFoundation={loading.foundation}
                seoAudit={seoAudit}
                onConfirmAndGenerateStrategy={() => {}} // Placeholder
                isLoadingStrategy={loading.keywords} // Or other relevant loading state
                onToggleAnalytics={() => {}} // Placeholder
                isDemoMode={isDemoMode}
                currentProject={currentProject}
              />
            </Step>

            <Step title="Step 2: Keyword Strategy" isUnlocked={completedSteps.includes('foundation')} isCompleted={completedSteps.includes('keywords')} isLoading={loading.keywords}>
              {keywordStrategy ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Keyword Categories</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {keywordCategories.map(key => {
                        const keywords = keywordStrategy[key];
                        if (Array.isArray(keywords) && keywords.length > 0) {
                            return <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {keywords.join(', ')}</li>;
                        }
                        return null;
                    })}
                  </ul>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-4 text-gray-600">Click the button to generate your keyword strategy.</p>
                  <button
                      onClick={handleGenerateKeywords}
                      disabled={loading.keywords || !completedSteps.includes('foundation')}
                      className={`${baseButtonClasses} ${primaryButtonClasses}`}
                  >
                      {loading.keywords ? 'Generating...' : 'Generate Keyword Strategy'}
                  </button>
                </div>
              )}
            </Step>

            <Step title="Step 3: Content & Social Plan" isUnlocked={completedSteps.includes('keywords')} isCompleted={completedSteps.includes('content')} isLoading={loading.content}>
              {contentPlan && socialPosts ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Content Plan</h3>
                    <p>Blog Posts: {contentPlan.blogPosts.length}</p>
                    <p>Landing Pages: {contentPlan.landingPages.length}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Social Media Posts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {socialPosts && Object.entries(socialPosts).map(([platformId, posts]) => {
                        const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === platformId);
                        if (!platformInfo || posts.length === 0) return null;
                        return <SocialCard key={platformId} platform={platformInfo} posts={posts} />;
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-4 text-gray-600">Generate your content and social media plan.</p>
                  <button
                      onClick={handleGenerateContent}
                      disabled={loading.content || !completedSteps.includes('keywords')}
                      className={`${baseButtonClasses} ${primaryButtonClasses}`}
                  >
                      {loading.content ? 'Generating...' : 'Generate Content Plan'}
                  </button>
                </div>
              )}
            </Step>

            <Step title="Step 4: Publishing Plan" isUnlocked={completedSteps.includes('content')} isCompleted={completedSteps.includes('calendar')} isLoading={loading.calendar}>
              {publishingPlan ? (
                <PublishingCalendar events={calendarEvents} onEventClick={handleEventClick} isLoading={loading.calendar} />
              ) : (
                <div className="text-center">
                  <p className="mb-4 text-gray-600">Create a publishing schedule for your content.</p>
                  <button
                      onClick={handleGenerateCalendar}
                      disabled={loading.calendar || !completedSteps.includes('content')}
                      className={`${baseButtonClasses} ${primaryButtonClasses}`}
                  >
                      {loading.calendar ? 'Generating...' : 'Generate Publishing Plan'}
                  </button>
                </div>
              )}
            </Step>

            <Step title="Step 5: Technical SEO" isUnlocked={completedSteps.includes('foundation')} isCompleted={completedSteps.includes('technical')} isLoading={loading.technical}>
              {technicalSeoPlan ? (
                <ActionableTechnicalSeo data={technicalSeoPlan} />
              ) : (
                <div className="text-center">
                  <p className="mb-4 text-gray-600">Generate a technical SEO audit and action plan.</p>
                   <button
                      onClick={handleGenerateTechnicalSeo}
                      disabled={loading.technical || !completedSteps.includes('foundation')}
                      className={`${baseButtonClasses} ${primaryButtonClasses}`}
                  >
                      {loading.technical ? 'Generating...' : 'Generate Technical SEO Plan'}
                  </button>
                </div>
              )}
            </Step>

            <Step title="Step 6: Conversion Plan" isUnlocked={completedSteps.includes('foundation')} isCompleted={completedSteps.includes('conversion')} isLoading={loading.conversion}>
              {conversionPlan ? (
                <ActionableConversionPlan plan={conversionPlan} />
              ) : (
                <div className="text-center">
                  <p className="mb-4 text-gray-600">Develop a plan to convert visitors into customers.</p>
                  <button
                      onClick={handleGenerateConversion}
                      disabled={loading.conversion || !completedSteps.includes('foundation')}
                      className={`${baseButtonClasses} ${primaryButtonClasses}`}
                  >
                      {loading.conversion ? 'Generating...' : 'Generate Conversion Plan'}
                  </button>
                </div>
              )}
            </Step>

            <Step title="Step 7: Performance Analysis & ROI Projections" isUnlocked={completedSteps.includes('conversion')} isCompleted={completedSteps.includes('performance')} isLoading={loading.performance}>
              {performanceAnalysis ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Performance Analysis</h3>
                  {/* A simple display for now */}
                  <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(performanceAnalysis, null, 2)}</pre>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-4 text-gray-600">Analyze performance and project return on investment.</p>
                  <button
                      onClick={handleGeneratePerformance}
                      disabled={loading.performance || !completedSteps.includes('conversion')}
                      className={`${baseButtonClasses} ${primaryButtonClasses}`}
                  >
                      {loading.performance ? 'Generating...' : 'Generate Performance Analysis'}
                  </button>
                </div>
              )}
            </Step>

            <Step title="Final Actions" isUnlocked={completedSteps.length > 0} isAlwaysOpen>
              <FinalActions allData={allData} />
            </Step>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <AnalyticsDashboard 
              data={realAnalyticsData} 
              isRealData={!!realAnalyticsData}
              responseTime={analyticsResponseTime}
              lastUpdated={analyticsLastUpdated}
              isLoading={analyticsLoading}
              error={analyticsError}
              onGenerate={() => { /* Add generate logic if needed */ }}
            />
            <SalesCoachPanel 
              isOpen={isSalesCoachOpen}
              onToggle={() => setSalesCoachOpen(!isSalesCoachOpen)}
              insights={salesInsights}
            />
            <AIHealthDashboard onStatusChange={setAiHealthStatus} />
            <AIArchitectureMap />
          </div>
        </div>
        <ApiManagerModal 
          isOpen={showApiManager}
          onClose={() => setShowApiManager(false)}
        />
        <ProjectManager 
          isOpen={showProjectManager}
          onClose={() => setShowProjectManager(false)}
          onProjectSelect={setCurrentProject}
          onProjectSave={() => { /* Add save logic */ }}
          currentProject={currentProject}
        />
        <UserManual 
          isOpen={showUserManual}
          onClose={() => setShowUserManual(false)}
        />
        {selectedEvent && (
          <CalendarEventModal
            event={selectedEvent}
            onClose={() => setShowEventModal(false)}
          />
        )}
        {notification && (
          <Notification 
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
            isVisible={notification.isVisible}
          />
        )}
        {showGuidance && (
          <UserGuidance 
            currentStep={currentGuidanceStep}
            completedSteps={completedSteps}
            onClose={() => setShowGuidance(false)}
            isVisible={showGuidance}
          />
        )}
      </main>
    </div>
  );
};

export default App;