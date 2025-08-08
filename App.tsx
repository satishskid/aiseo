import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { BusinessInputForm } from './components/BusinessInputForm';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Step } from './components/Step';
import { OutputSection } from './components/OutputSection';
import { SocialCard } from './components/SocialCard';
import { FinalActions } from './components/FinalActions';
import { ApiManagerModal } from './components/ApiManagerModal';
import { PublishingCalendar } from './components/PublishingCalendar';
import { CalendarEventModal } from './components/CalendarEventModal';
import { CalendarDownload } from './components/CalendarDownload';
import { PerformanceInputForm } from './components/PerformanceInputForm';
import { DemoGenerationModal } from './components/DemoGenerationModal';
import { SalesCoachPanel } from './components/SalesCoachPanel';
import { ActionableTechnicalSeo } from './components/ActionableTechnicalSeo';
import { ActionableConversionPlan } from './components/ActionableConversionPlan';
import { ProjectManager } from './components/ProjectManager';
import { StructuredDataInput } from './components/StructuredDataInput';
import { UserGuidance, Notification } from './components/UserGuidance';
import { UserManual } from './components/UserManual';
import { useApiKey } from './context/ApiKeyContext';
import { GeminiService, AIService } from './services/aiService';
import { exportToGoogleCalendar, exportToICS, exportToCSV } from './services/calendarExportService';
import { SOCIAL_PLATFORMS, baseButtonClasses, secondaryButtonClasses } from './constants';
import type { 
  InitialBrandInput,
  BrandData, 
  AnalyticsData,
  KeywordStrategy,
  ContentPlan,
  SocialPosts,
  TechnicalSeoPlan,
  ConversionPlan,
  PublishingPlan,
  CalendarEvent,
  LoadingStates,
  StepKey,
  PerformanceInputs,
  PerformanceAnalysis,
  AllData,
  SeoAudit,
  SalesInsight,
  Project,
  StructuredDataConfig,
  StructuredDataOutput,
  NotificationState
} from './types';

const App: React.FC = () => {
  const { apiKeys } = useApiKey();
  const [aiService, setAiService] = useState<AIService | null>(null);

  // --- State for Data ---
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [seoAudit, setSeoAudit] = useState<SeoAudit | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    keywords: 0, contentPieces: 0, socialPosts: 0,
    estimatedReach: 0, competitiveScore: 0, seoScore: 0,
  });
  const [keywordStrategy, setKeywordStrategy] = useState<KeywordStrategy | null>(null);
  const [contentPlan, setContentPlan] = useState<ContentPlan | null>(null);
  const [socialPosts, setSocialPosts] = useState<SocialPosts | null>(null);
  const [publishingPlan, setPublishingPlan] = useState<PublishingPlan | null>(null);
  const [technicalSeoPlan, setTechnicalSeoPlan] = useState<TechnicalSeoPlan | null>(null);
  const [conversionPlan, setConversionPlan] = useState<ConversionPlan | null>(null);
  const [performanceAnalysis, setPerformanceAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [structuredData, setStructuredData] = useState<StructuredDataOutput | null>(null);

  // --- UI State ---
  const [loading, setLoading] = useState<LoadingStates>({
    foundation: false, keywords: false, content: false, publishing: false,
    technical: false, conversion: false, performance: false, demo: false, structured: false
  });
  const [completedSteps, setCompletedSteps] = useState<StepKey[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [salesInsights, setSalesInsights] = useState<SalesInsight[]>([]);
  const [isSalesCoachOpen, setSalesCoachOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // --- New UI State for Missing Features ---
  const [showUserGuidance, setShowUserGuidance] = useState(true);
  const [showUserManual, setShowUserManual] = useState(false);
  const [currentGuidanceStep, setCurrentGuidanceStep] = useState<StepKey>('foundation');
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    type: 'info',
    isVisible: false
  });
  const [showApiManagerModal, setShowApiManagerModal] = useState(false);
  const [showStructuredDataInput, setShowStructuredDataInput] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // --- Computed Values ---
  const allData: AllData = useMemo(() => ({
    brandData, seoAudit, keywordStrategy, contentPlan, socialPosts,
    publishingPlan, technicalSeoPlan, conversionPlan, performanceAnalysis, structuredData
  }), [brandData, seoAudit, keywordStrategy, contentPlan, socialPosts, publishingPlan, technicalSeoPlan, conversionPlan, performanceAnalysis, structuredData]);

  const isStepCompleted = useCallback((step: StepKey) => completedSteps.includes(step), [completedSteps]);

  // --- Effects ---
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('seo-app-welcome-seen');
    if (!hasSeenWelcome && !apiKeys.gemini) {
      // Show welcome message after a short delay
      const timer = setTimeout(() => {
        setShowApiManagerModal(true);
        localStorage.setItem('seo-app-welcome-seen', 'true');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [apiKeys]);

  useEffect(() => {
    if (apiKeys.gemini) {
      try {
        setAiService(new GeminiService(apiKeys.gemini));
        setShowApiManagerModal(false);
        showNotification('API key configured successfully! 🎉', 'success');
      } catch (error) {
        console.error("Failed to initialize Gemini service:", error);
        setAiService(null);
        showNotification('Failed to initialize AI service. Please check your API key.', 'warning');
      }
    } else {
      setAiService(null);
    }
  }, [apiKeys]);

  // Update guidance step based on completed steps
  useEffect(() => {
    if (completedSteps.length === 0) {
      setCurrentGuidanceStep('start');
    } else {
      const lastCompleted = completedSteps[completedSteps.length - 1];
      const stepMap: { [key in StepKey]: string } = {
        keywords: 'keywords',
        content: 'content',
        publishing: 'publishing',
        technical: 'technical',
        conversion: 'conversion',
        performance: 'performance',
        structured: 'technical'
      };
      setCurrentGuidanceStep(stepMap[lastCompleted] || 'start');
    }
  }, [completedSteps]);

  // --- Utility Functions ---

  const showNotification = (message: string, type: NotificationState['type'] = 'info') => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const resetAllState = () => {
    setBrandData(null);
    setSeoAudit(null);
    setKeywordStrategy(null);
    setContentPlan(null);
    setSocialPosts(null);
    setPublishingPlan(null);
    setTechnicalSeoPlan(null);
    setConversionPlan(null);
    setPerformanceAnalysis(null);
    setStructuredData(null);
    setSalesInsights([]);
    setCompletedSteps([]);
    setAnalyticsData({
        keywords: 0, contentPieces: 0, socialPosts: 0,
        estimatedReach: 0, competitiveScore: 0, seoScore: 0,
    });
    setIsDemoMode(false);
    setCurrentGuidanceStep('start');
  };

  const handleBusinessSubmit = async (data: InitialBrandInput) => {
    await handleGenerateFoundationAndAudit(data);
  };

  const loadDemoData = (data: AllData) => {
    setBrandData(data.brandData);
    setSeoAudit(data.seoAudit);
    setKeywordStrategy(data.keywordStrategy);
    setContentPlan(data.contentPlan);
    setSocialPosts(data.socialPosts);
    setPublishingPlan(data.publishingPlan);
    setTechnicalSeoPlan(data.technicalSeoPlan);
    setConversionPlan(data.conversionPlan);
    setPerformanceAnalysis(data.performanceAnalysis);
    setStructuredData(data.structuredData || null);
    
    // Set completed steps based on available data
    const steps: StepKey[] = [];
    if (data.keywordStrategy) steps.push('keywords');
    if (data.contentPlan) steps.push('content');
    if (data.publishingPlan) steps.push('publishing');
    if (data.technicalSeoPlan) steps.push('technical');
    if (data.conversionPlan) steps.push('conversion');
    if (data.performanceAnalysis) steps.push('performance');
    if (data.structuredData) steps.push('structured');
    
    setCompletedSteps(steps);
    setIsDemoMode(true);
    setSalesInsights([
      { type: 'opportunity', title: 'High-Value Keywords Identified', description: 'Found 15 keywords with high search volume and low competition', impact: 'High', actionRequired: true, suggestedAction: 'Create targeted content for these keywords within 2 weeks' },
      { type: 'trend', title: 'Seasonal Content Opportunity', description: 'Upcoming festival season shows 300% increase in related searches', impact: 'Medium', actionRequired: false },
      { type: 'risk', title: 'Competitor Content Gap', description: 'Main competitor launched new content series targeting your keywords', impact: 'Medium', actionRequired: true, suggestedAction: 'Accelerate content production timeline' }
    ]);
    
    showNotification('Demo data loaded successfully! Explore all features.', 'info');
  };

  // --- Calendar Export Functions ---
  const handleCalendarDownload = async (format: 'google' | 'ics' | 'csv') => {
    if (!publishingPlan?.calendar) {
      showNotification('No calendar data available to download.', 'warning');
      return;
    }

    setLoading(prev => ({ ...prev, publishing: true }));

    try {
      switch (format) {
        case 'google':
          // For Google Calendar, we need to export each event individually
          // or create a single event with all details
          if (publishingPlan.calendar.length > 0) {
            // Create a consolidated event with all calendar items
            const consolidatedEvent: CalendarEvent = {
              id: 'consolidated-calendar',
              title: "SEO Content Calendar",
              date: new Date().toISOString(),
              time: "00:00",
                type: "content-calendar",
              platform: "all",
            description: publishingPlan.calendar.map(event =>
            `${event.date}: ${event.title} - ${event.type}\n${event.description || ''}`
            ).join('\n\n'),
          keywords: [],
          status: 'completed',
          priority: 'high'
            };
            exportToGoogleCalendar(consolidatedEvent);
            showNotification('Opening Google Calendar with consolidated event...', 'success');
          } else {
            showNotification('No events to export to Google Calendar.', 'warning');
          }
          break;
        case 'ics':
          exportToICS(publishingPlan.calendar);
          showNotification('Calendar file downloaded!', 'success');
          break;
        case 'csv':
          exportToCSV(publishingPlan.calendar);
          showNotification('CSV file downloaded!', 'success');
          break;
      }
    } catch (error) {
      console.error('Calendar export error:', error);
      showNotification('Failed to export calendar. Please try again.', 'warning');
    } finally {
      setLoading(prev => ({ ...prev, publishing: false }));
    }
  };

  // --- AI Generation Functions ---
  const handleGenerateFoundationAndAudit = async (data: InitialBrandInput) => {
    if (!aiService) {
      showNotification('Please configure your API key first.', 'warning');
      return;
    }

    setLoading(prev => ({ ...prev, foundation: true }));
    setCurrentGuidanceStep('business');

    try {
      // First generate the business foundation
      const foundationData = await aiService.generateBusinessFoundation(data);
      const enhancedData = { ...data, ...foundationData };
      setBrandData(enhancedData);

      // Then generate the SEO audit
      const audit = await aiService.generateBaselineSeoAudit(data);
      setSeoAudit(audit);

      setAnalyticsData({
        keywords: Math.floor(Math.random() * 50) + 20,
        contentPieces: Math.floor(Math.random() * 20) + 10,
        socialPosts: Math.floor(Math.random() * 30) + 15,
        estimatedReach: Math.floor(Math.random() * 10000) + 5000,
        competitiveScore: Math.floor(Math.random() * 40) + 60,
        seoScore: audit.overallScore,
      });

      setShowAnalytics(true);
      setCurrentGuidanceStep('audit');
      showNotification('SEO audit completed! Review your results below.', 'success');
    } catch (error) {
      console.error('Error generating audit:', error);
      showNotification('Failed to generate SEO audit. Please try again.', 'warning');
    } finally {
      setLoading(prev => ({ ...prev, foundation: false }));
    }
  };

  const handleGenerateKeywords = async () => {
    if (!aiService || !brandData) {
      showNotification('Please complete the business information first.', 'warning');
      return;
    }

    setLoading(prev => ({ ...prev, keywords: true }));

    try {
      const keywords = await aiService.generateKeywordStrategy(brandData);
      setKeywordStrategy(keywords);
      setCompletedSteps(prev => [...prev, 'keywords']);
      showNotification('Keyword strategy generated! 🎯 Ready for content creation.', 'success');
    } catch (error) {
      console.error('Error generating keywords:', error);
      showNotification('Failed to generate keywords. Please try again.', 'warning');
    } finally {
      setLoading(prev => ({ ...prev, keywords: false }));
    }
  };

  const handleGenerateContent = async () => {
    if (!aiService || !brandData || !keywordStrategy) {
      showNotification('Please complete keyword research first.', 'warning');
      return;
    }

    setLoading(prev => ({ ...prev, content: true }));

    try {
      const { contentPlan, socialPosts } = await aiService.generateContentAndSocial(brandData, keywordStrategy);

      setContentPlan(contentPlan);
      setSocialPosts(socialPosts);
      setCompletedSteps(prev => [...prev, 'content']);
      showNotification('Content strategy created! 📝 Ready for publishing calendar.', 'success');
    } catch (error) {
      console.error('Error generating content:', error);
      showNotification('Failed to generate content. Please try again.', 'warning');
    } finally {
      setLoading(prev => ({ ...prev, content: false }));
    }
  };

  const handleGeneratePublishingPlan = async () => {
    if (!aiService || !brandData || !contentPlan) {
      showNotification('Please complete content generation first.', 'warning');
      return;
    }

    setLoading(prev => ({ ...prev, publishing: true }));

    try {
      const allData: AllData = {
        brandData,
        seoAudit: seoAudit!,
        keywordStrategy: keywordStrategy!,
        contentPlan,
        socialPosts: socialPosts!,
        technicalSeoPlan: technicalSeoPlan!,
        conversionPlan: conversionPlan!,
        performanceAnalysis: performanceAnalysis!,
        publishingPlan: publishingPlan!,
        structuredData: structuredData!,
      };

      const publishing = await aiService.generatePublishingCalendar(allData);
      setPublishingPlan(publishing);
      setCompletedSteps(prev => [...prev, 'publishing']);
      showNotification('Publishing calendar ready! 📅 Download it to your calendar app.', 'success');
    } catch (error) {
      console.error('Error generating publishing plan:', error);
      showNotification('Failed to generate publishing plan. Please try again.', 'warning');
    } finally {
      setLoading(prev => ({ ...prev, publishing: false }));
    }
  };

  const handleGenerateTechnicalSEO = async () => {
    if (!aiService || !brandData) {
      showNotification('Please complete the previous steps first.', 'warning');
      return;
    }

    setLoading(prev => ({ ...prev, technical: true }));

    try {
      const technical = await aiService.generateTechnicalSeo(brandData);
      setTechnicalSeoPlan(technical);
      setCompletedSteps(prev => [...prev, 'technical']);
      showNotification('Technical SEO plan ready! ⚙️ Consider adding structured data.', 'success');
    } catch (error) {
      console.error('Error generating technical SEO:', error);
      showNotification('Failed to generate technical SEO. Please try again.', 'warning');
    } finally {
      setLoading(prev => ({ ...prev, technical: false }));
    }
  };

  const handleGenerateConversion = async () => {
    if (!aiService || !brandData) {
      showNotification('Please complete the previous steps first.', 'warning');
      return;
    }

    setLoading(prev => ({ ...prev, conversion: true }));

    try {
      const conversion = await aiService.generateConversionPlan(brandData);
      setConversionPlan(conversion);
      setCompletedSteps(prev => [...prev, 'conversion']);
      showNotification('Conversion optimization ready! 💰 Track your performance next.', 'success');
    } catch (error) {
      console.error('Error generating conversion plan:', error);
      showNotification('Failed to generate conversion plan. Please try again.', 'warning');
    } finally {
      setLoading(prev => ({ ...prev, conversion: false }));
    }
  };

  const handleAnalyzePerformance = async (performanceData: PerformanceInputs) => {
    if (!aiService || !brandData) {
      showNotification('Please complete the initial setup first.', 'warning');
      return;
    }

    setLoading(prev => ({ ...prev, performance: true }));

    try {
      const allData: AllData = {
        brandData,
        seoAudit: seoAudit!,
        keywordStrategy: keywordStrategy!,
        contentPlan: contentPlan!,
        socialPosts: socialPosts!,
        technicalSeoPlan: technicalSeoPlan!,
        conversionPlan: conversionPlan!,
        performanceAnalysis: performanceAnalysis!,
        publishingPlan: publishingPlan!,
        structuredData: structuredData!,
      };

      const analysis = await aiService.analyzePerformanceData(allData, performanceData);
      setPerformanceAnalysis(analysis);
      setCompletedSteps(prev => [...prev, 'performance']);
      showNotification('Performance analysis complete! 📊 Review your insights.', 'success');
    } catch (error) {
      console.error('Error analyzing performance:', error);
      showNotification('Failed to analyze performance. Please try again.', 'warning');
    } finally {
      setLoading(prev => ({ ...prev, performance: false }));
    }
  };

  // --- Structured Data Functions ---

  const handleGenerateStructuredData = async (config: StructuredDataConfig) => {
    if (!aiService) {
      showNotification('Please configure your API key first.', 'warning');
      return;
    }

    setLoading(prev => ({ ...prev, structured: true }));

    try {
      // Create a proper structured data output matching the expected interface
      const socialUrls = [
        config.socialProfiles.facebook,
        config.socialProfiles.twitter,
        config.socialProfiles.instagram,
        config.socialProfiles.linkedin
      ].filter(url => url) as string[];

      const jsonData = {
        "@context": "https://schema.org",
        "@type": config.businessType || "LocalBusiness",
        "name": config.businessName,
        "description": config.description,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": config.address.street,
          "addressLocality": config.address.city,
          "addressRegion": config.address.state,
          "postalCode": config.address.postalCode,
          "addressCountry": config.address.country
        },
        "telephone": config.phone,
        "email": config.email,
        "url": config.website,
        "openingHoursSpecification": Object.entries(config.openingHours).map(([day, hours]) => ({
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": day,
          "opens": typeof hours === 'object' && hours !== null ? (hours as any).open : '',
          "closes": typeof hours === 'object' && hours !== null ? (hours as any).close : ''
        })),
        "priceRange": config.priceRange,
        "sameAs": socialUrls
      };

      const structuredDataOutput: StructuredDataOutput = {
        jsonLd: JSON.stringify(jsonData, null, 2),
        implementation: `Add the following JSON-LD code to the <head> section of your website:

<script type="application/ld+json">
${JSON.stringify(jsonData, null, 2)}
</script>`,
        benefits: [
          'Enhanced search visibility',
          'Rich snippets in search results',
          'Better local SEO performance',
          'Improved click-through rates',
          'Voice search optimization'
        ],
        testingInstructions: '1. Add the JSON-LD code to your website\'s <head> section\n2. Test with Google\'s Rich Results Test tool\n3. Monitor performance in Google Search Console\n4. Update information regularly to maintain accuracy\n5. Consider adding additional schema types as your business grows'
      };

      setStructuredData(structuredDataOutput);
      setCompletedSteps(prev => [...prev, 'structured']);
      showNotification('Structured data generated! 🎯 Ready for implementation.', 'success');
    } catch (error) {
      console.error('Error generating structured data:', error);
      showNotification('Failed to generate structured data. Please try again.', 'warning');
    } finally {
      setLoading(prev => ({ ...prev, structured: false }));
    }
  };

  // --- Project Management Functions ---
  const handleProjectSelect = (project: Project | null) => {
    setCurrentProject(project);
    if (project && project.data) {
      setBrandData(project.data.brandData);
      setSeoAudit(project.data.seoAudit);
      setKeywordStrategy(project.data.keywordStrategy);
      setContentPlan(project.data.contentPlan);
      setSocialPosts(project.data.socialPosts);
      setTechnicalSeoPlan(project.data.technicalSeoPlan);
      setConversionPlan(project.data.conversionPlan);
      setPublishingPlan(project.data.publishingPlan);
      setPerformanceAnalysis(project.data.performanceAnalysis);
      setStructuredData(project.data.structuredData);
      
      // Set completed steps based on available data
      const steps: StepKey[] = [];
      if (project.data.keywordStrategy) steps.push('keywords');
      if (project.data.contentPlan) steps.push('content');
      if (project.data.publishingPlan) steps.push('publishing');
      if (project.data.technicalSeoPlan) steps.push('technical');
      if (project.data.conversionPlan) steps.push('conversion');
      if (project.data.performanceAnalysis) steps.push('performance');
      if (project.data.structuredData) steps.push('structured');
      
      setCompletedSteps(steps);
    } else {
      // Reset all data when no project is selected
      resetAllState();
    }
  };

  const handleProjectSave = (projectData: AllData, projectName: string) => {
    // Create or update project in localStorage
    const projectsData = JSON.parse(localStorage.getItem('seo-app-projects') || '[]');
    const existingProjectIndex = projectsData.findIndex((p: Project) => p.name === projectName);
    
    const project: Project = {
      id: existingProjectIndex !== -1 ? projectsData[existingProjectIndex].id : Date.now().toString(),
      name: projectName,
      createdAt: existingProjectIndex !== -1 ? projectsData[existingProjectIndex].createdAt : new Date().toISOString(),
      lastModified: new Date().toISOString(),
      data: projectData,
      status: 'active'
    };
    
    if (existingProjectIndex !== -1) {
      projectsData[existingProjectIndex] = project;
    } else {
      projectsData.push(project);
    }
    
    localStorage.setItem('seo-app-projects', JSON.stringify(projectsData));
    setCurrentProject(project);
    showNotification(`Project "${projectName}" saved successfully!`, 'success');
  };

  // --- Render ---
  return (
    <>
      {socialPosts && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOCIAL_PLATFORMS.map(platform => (
            <SocialCard
              key={platform.id}
              platform={platform}
              posts={socialPosts[platform.id] || []}
            />
          ))}
        </div>
      )}
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Header
          onManageApiKeys={() => setShowApiManagerModal(true)}
          onGenerateNewDemo={() => setShowDemoModal(true)}
          onLoadDemo={(demoName) => {
            console.log('Loading demo:', demoName);
          }}
          onManageProjects={() => setShowProjectManager(true)}
          onOpenUserManual={() => setShowUserManual(true)}
          savedDemos={[]}
          currentProject={currentProject}
          currentAiProvider={aiService ? 'Gemini' : null}
        />
        
        <div className="flex gap-8">
          <main className="flex-1 space-y-8">
            <Step stepNumber="1" title="Business Information & SEO Foundation" isUnlocked={true}>
              <BusinessInputForm
                isLoadingFoundation={loading.foundation}
                isLoadingStrategy={loading.keywords}
                onGenerateInitialAnalysis={handleGenerateFoundationAndAudit}
                onConfirmAndGenerateStrategy={(data) => {
                  setBrandData(data);
                  handleGenerateKeywords();
                }}
                foundationData={brandData}
                seoAudit={seoAudit}
                onToggleAnalytics={() => setShowAnalytics(!showAnalytics)}
                isDemoMode={isDemoMode}
                currentProject={currentProject}
              />
              
              {seoAudit && (
                <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 SEO Audit Results</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{seoAudit.overallScore}/100</div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{seoAudit.technicalScore}/100</div>
                      <div className="text-sm text-gray-600">Technical SEO</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{seoAudit.contentScore}/100</div>
                      <div className="text-sm text-gray-600">Content Quality</div>
                    </div>
                  </div>
                  
                  {!isDemoMode && (
                    <div className="text-center">
                      <button 
                        className={`${baseButtonClasses} ${secondaryButtonClasses}`} 
                        onClick={handleGenerateKeywords} 
                        disabled={loading.keywords}
                      >
                        🎯 Generate Keyword Strategy
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Step>

            {showAnalytics && <AnalyticsDashboard data={analyticsData} />}

            <Step stepNumber="2" title="AI Keyword Research & Strategy" isUnlocked={isStepCompleted('keywords')}>
              <OutputSection
                title="Generated Keywords & Strategy"
                isLoading={loading.keywords}
                content={JSON.stringify(keywordStrategy, null, 2)}
                placeholder="Your AI-generated keyword research will appear here..."
                isCompleted={isStepCompleted('keywords')}
              />
              {isStepCompleted('keywords') && !isDemoMode && (
                <div className="mt-6 text-center">
                  <button className={`${baseButtonClasses} ${secondaryButtonClasses}`} onClick={handleGenerateContent} disabled={loading.content}>
                    📝 Generate SEO Content
                  </button>
                </div>
              )}
            </Step>
            
            <Step stepNumber="3" title="AI Content & Social Media Generation" isUnlocked={isStepCompleted('keywords')}>
              <OutputSection
                title="Generated Content Strategy"
                isLoading={loading.content}
                content={JSON.stringify(contentPlan, null, 2)}
                placeholder="Your AI-generated content strategy will appear here..."
                isCompleted={isStepCompleted('content')}
              />
              {socialPosts && isStepCompleted('content') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 animate-contentAppear">
                      {SOCIAL_PLATFORMS.map(platform => (
                          <SocialCard key={platform.id} platform={platform} posts={socialPosts[platform.id] || []} />
                      ))}
                  </div>
              )}
              {isStepCompleted('content') && !isDemoMode && (
                <div className="mt-6 text-center">
                  <button className={`${baseButtonClasses} ${secondaryButtonClasses}`} onClick={handleGeneratePublishingPlan} disabled={loading.publishing}>
                    📅 Generate Publishing Plan
                  </button>
                </div>
              )}
            </Step>

            <Step stepNumber="4" title="Actionable Publishing Calendar & Plan" isUnlocked={isStepCompleted('publishing')}>
                <PublishingCalendar
                    plan={publishingPlan}
                    isLoading={loading.publishing}
                    onEventClick={setSelectedEvent}
                />
                
                {/* Calendar Download Component */}
                {publishingPlan && (
                  <div className="mt-6">
                    <CalendarDownload
                      publishingPlan={publishingPlan}
                      onDownload={handleCalendarDownload}
                      isLoading={loading.publishing}
                    />
                  </div>
                )}
                
                 {isStepCompleted('publishing') && !isDemoMode &&(
                   <div className="mt-6 text-center">
                     <button className={`${baseButtonClasses} ${secondaryButtonClasses}`} onClick={handleGenerateTechnicalSEO} disabled={loading.technical}>
                       ⚙️ Generate Technical SEO
                     </button>
                   </div>
                 )}
            </Step>

            <Step stepNumber="5" title="Technical SEO for Indian Market" isUnlocked={isStepCompleted('publishing')}>
              {loading.technical ? (
                <div className="text-center p-8">
                  <div className="w-12 h-12 mx-auto mb-4 border-4 border-gray-200 border-t-brand-primary-start rounded-full animate-spin"></div>
                  <p className="text-gray-600 font-semibold">Generating technical SEO recommendations...</p>
                </div>
              ) : technicalSeoPlan ? (
                <ActionableTechnicalSeo data={technicalSeoPlan} />
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300">
                  <h3 className="text-lg font-bold text-gray-700">Technical SEO Strategy</h3>
                  <p className="text-gray-500 italic p-4 mt-4">Your technical SEO recommendations will appear here...</p>
                </div>
              )}
              
              {/* Structured Data Input */}
              {isStepCompleted('technical') && (
                <div className="mt-6">
                  <div className="flex justify-center gap-4">
                    <button 
                      className={`${baseButtonClasses} bg-gradient-to-r from-green-600 to-blue-600 text-white`}
                      onClick={() => setShowStructuredDataInput(true)}
                    >
                      📊 Add Structured Data
                    </button>
                    {!isDemoMode && (
                      <button className={`${baseButtonClasses} ${secondaryButtonClasses}`} onClick={handleGenerateConversion} disabled={loading.conversion}>
                        💰 Generate Conversion Strategy
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Step>

            {/* Structured Data Input Modal/Section */}
            {showStructuredDataInput && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
                  <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Configure Structured Data</h2>
                    <button
                      onClick={() => setShowStructuredDataInput(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-6">
                    <StructuredDataInput
                      onSubmit={handleGenerateStructuredData}
                      isLoading={loading.structured}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Structured Data Output */}
            {structuredData && (
              <Step stepNumber="5.1" title="Generated Structured Data" isUnlocked={true}>
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Your Structured Data</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">JSON-LD Code:</h4>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">{structuredData.jsonLd}</pre>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(structuredData.jsonLd);
                          showNotification('Structured data copied to clipboard!', 'success');
                        }}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        📋 Copy Code
                      </button>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Implementation Instructions:</h4>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap">{structuredData.implementation}</pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {structuredData.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Testing:</h4>
                      <p className="text-gray-600">{structuredData.testingInstructions}</p>
                    </div>
                  </div>
                </div>
              </Step>
            )}

            <Step stepNumber="6" title="Conversion Optimization for Indian Users" isUnlocked={isStepCompleted('technical')}>
              {loading.conversion ? (
                <div className="text-center p-8">
                  <div className="w-12 h-12 mx-auto mb-4 border-4 border-gray-200 border-t-brand-primary-start rounded-full animate-spin"></div>
                  <p className="text-gray-600 font-semibold">Generating conversion optimization plan...</p>
                </div>
              ) : conversionPlan ? (
                <ActionableConversionPlan data={conversionPlan} />
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300">
                  <h3 className="text-lg font-bold text-gray-700">Conversion Strategy</h3>
                  <p className="text-gray-500 italic p-4 mt-4">Your conversion optimization plan will appear here...</p>
                </div>
              )}
            </Step>
            
            <Step stepNumber="7" title="Performance Review & AI Analysis" isUnlocked={isStepCompleted('conversion')}>
              <PerformanceInputForm
                isLoading={loading.performance}
                onSubmit={handleAnalyzePerformance}
              />
              <OutputSection
                title="Performance Analysis & Recommendations"
                isLoading={loading.performance}
                content={JSON.stringify(performanceAnalysis, null, 2)}
                placeholder="Your AI-powered performance analysis will appear here after you submit your data."
                isCompleted={isStepCompleted('performance')}
              />
            </Step>

            {isStepCompleted('conversion') && <FinalActions allData={allData} />}
          </main>
        </div>
      </div>
      {isDemoMode && <SalesCoachPanel insights={salesInsights} isOpen={isSalesCoachOpen} onToggle={() => setSalesCoachOpen(p => !p)} />}
      
      {/* User Guidance */}
      <UserGuidance
        currentStep={currentGuidanceStep}
        completedSteps={completedSteps}
        onClose={() => setShowUserGuidance(false)}
        isVisible={showUserGuidance}
      />
      
      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
    
    {/* Modals */}
    {showUserManual && <UserManual onClose={() => setShowUserManual(false)} />}
    <ApiManagerModal isOpen={showApiManagerModal} onClose={() => setShowApiManagerModal(false)} />
    {showDemoModal && (
      <DemoGenerationModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        onGenerate={async (data, onProgress) => {
          onProgress('Generating demo...');
          await handleGenerateFoundationAndAudit(data);
        }}
        isLoading={loading.foundation}
      />
    )}
    {showProjectManager && (
      <ProjectManager
        currentProject={currentProject}
        onProjectSelect={handleProjectSelect}
        onProjectSave={handleProjectSave}
        isOpen={showProjectManager}
        onClose={() => setShowProjectManager(false)}
      />
    )}
    {selectedEvent && (
      <CalendarEventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    )}
    </>
  );
};

export default App;