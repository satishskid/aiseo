
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
import { PerformanceInputForm } from './components/PerformanceInputForm';
import { DemoGenerationModal } from './components/DemoGenerationModal';
import { SalesCoachPanel } from './components/SalesCoachPanel';
import { ActionableTechnicalSeo } from './components/ActionableTechnicalSeo';
import { ActionableConversionPlan } from './components/ActionableConversionPlan';
import { ProjectManager } from './components/ProjectManager';
import { useApiKey } from './context/ApiKeyContext';
import { GeminiService, AIService } from './services/aiService';
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
  Project
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
  const [salesInsights, setSalesInsights] = useState<SalesInsight[]>([]);

  // --- State for UI and Loading ---
  const [loading, setLoading] = useState<LoadingStates>({
    foundation: false, keywords: false, content: false, publishing: false,
    technical: false, conversion: false, performance: false, demo: false,
  });
  const [completedSteps, setCompletedSteps] = useState<StepKey[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // --- Modals and Panels State ---
  const [isApiManagerOpen, setApiManagerOpen] = useState(false);
  const [isDemoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isSalesCoachOpen, setSalesCoachOpen] = useState(true);

  // --- Demo Mode State ---
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [savedDemos, setSavedDemos] = useState<Record<string, AllData>>({});

  // --- Project Management State ---
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isProjectManagerOpen, setProjectManagerOpen] = useState(false);

  useEffect(() => {
    try {
      const storedDemos = localStorage.getItem('seo-app-demos');
      if (storedDemos) {
        setSavedDemos(JSON.parse(storedDemos));
      }
    } catch (e) { console.error("Could not load demos from localStorage", e); }
  }, []);

  // Check for first-time user and prompt for API keys
  useEffect(() => {
    const hasAnyApiKey = Object.values(apiKeys).some(key => key && key.trim() !== '');
    const hasSeenWelcome = localStorage.getItem('seo-app-welcome-seen');
    
    if (!hasAnyApiKey && !hasSeenWelcome) {
      // Show welcome message after a short delay
      const timer = setTimeout(() => {
        setApiManagerOpen(true);
        localStorage.setItem('seo-app-welcome-seen', 'true');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [apiKeys]);

  useEffect(() => {
    if (apiKeys.gemini) {
      try {
        setAiService(new GeminiService(apiKeys.gemini));
        setApiManagerOpen(false);
      } catch (error) {
        console.error("Failed to initialize Gemini service:", error);
        setAiService(null);
      }
    } else {
      setAiService(null);
    }
  }, [apiKeys]);
  
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
      setSalesInsights([]);
      setCompletedSteps([]);
      setAnalyticsData({
          keywords: 0, contentPieces: 0, socialPosts: 0,
          estimatedReach: 0, competitiveScore: 0, seoScore: 0,
      });
      setIsDemoMode(false);
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
    setAnalyticsData(data.analyticsData);
    setSalesInsights(data.salesInsights || []);
    setCompletedSteps(['keywords', 'content', 'publishing', 'technical', 'conversion', 'performance']);
    setIsDemoMode(true);
    setShowAnalytics(true);
  };
  
  const handleLoadDemo = (demoName: string) => {
    if(demoName === 'live') {
        resetAllState();
        return;
    }
    const demoData = savedDemos[demoName];
    if (demoData) {
        loadDemoData(demoData);
    }
  };

  // --- Project Management Handlers ---
  const handleProjectSelect = (project: Project | null) => {
    setCurrentProject(project);
    if (project) {
      loadDemoData(project.data);
    } else {
      resetAllState();
    }
  };

  const handleProjectSave = (projectData: AllData, projectName: string) => {
    if (currentProject) {
      // Update existing project
      const updatedProject: Project = {
        ...currentProject,
        lastModified: new Date().toISOString(),
        data: projectData
      };
      setCurrentProject(updatedProject);
      
      // Save to localStorage
      try {
        const projects = JSON.parse(localStorage.getItem('seo-app-projects') || '[]');
        const updatedProjects = projects.map((p: Project) => 
          p.id === currentProject.id ? updatedProject : p
        );
        localStorage.setItem('seo-app-projects', JSON.stringify(updatedProjects));
      } catch (error) {
        console.error('Failed to save project:', error);
      }
    }
  };

  // Auto-save current project data when it changes
  useEffect(() => {
    if (currentProject && (brandData || keywordStrategy || contentPlan)) {
      const currentData: AllData = {
        brandData,
        seoAudit,
        analyticsData,
        keywordStrategy,
        contentPlan,
        socialPosts,
        technicalSeoPlan,
        conversionPlan,
        publishingPlan,
        performanceAnalysis,
        salesInsights
      };
      handleProjectSave(currentData, currentProject.name);
    }
  }, [brandData, keywordStrategy, contentPlan, socialPosts, technicalSeoPlan, conversionPlan, publishingPlan, performanceAnalysis]);

  const runGeneration = async <T,>(
    generationFunc: (service: AIService) => Promise<T>,
    setLoadingKey: keyof LoadingStates
  ): Promise<T> => {
    if (!aiService) {
      setApiManagerOpen(true);
      throw new Error("API service not initialized. Please enter your Gemini API key.");
    }

    setLoading(prev => ({ ...prev, [setLoadingKey]: true }));
    try {
      const result = await generationFunc(aiService);
      return result;
    } catch (error) {
      console.error(`Error during ${setLoadingKey} generation:`, error);
      alert(`An error occurred during generation. ${error instanceof Error ? error.message : 'Please check the console for details.'}`);
      throw error; // Re-throw to be caught by the caller
    } finally {
      setLoading(prev => ({ ...prev, [setLoadingKey]: false }));
    }
  };

  const handleUpdateAnalytics = useCallback((newData: Partial<AnalyticsData>) => {
    setAnalyticsData(prev => ({ ...prev, ...newData }));
  }, []);

  const handleGenerateInitialAnalysis = async (initialData: InitialBrandInput) => {
    resetAllState();
    
    if (!aiService) {
      setApiManagerOpen(true);
      alert("Please enter your Gemini API key to proceed.");
      return;
    }
    
    setLoading(prev => ({ ...prev, foundation: true }));
    try {
      const [foundationResult, auditResult] = await Promise.all([
        aiService.generateBusinessFoundation(initialData),
        aiService.generateBaselineSeoAudit(initialData)
      ]);

      const fullBrandData = { ...initialData, ...foundationResult };
      setBrandData(fullBrandData);
      setSeoAudit(auditResult);
      handleUpdateAnalytics({ seoScore: auditResult.overallScore });
      setShowAnalytics(true);

    } catch (error) {
      // Error is already alerted in runGeneration
    } finally {
      setLoading(prev => ({ ...prev, foundation: false }));
    }
  };

  const handleConfirmAndGenerateStrategy = async (finalBrandData: BrandData) => {
    setBrandData(finalBrandData);
    try {
        const result = await runGeneration(
            (service) => service.generateKeywordStrategy(finalBrandData),
            'keywords'
        );
        setKeywordStrategy(result);
        handleUpdateAnalytics({ 
            keywords: result.totalKeywords,
            competitiveScore: result.competitiveScore ?? 0,
            seoScore: Math.max(analyticsData.seoScore, result.seoScore ?? analyticsData.seoScore),
        });
        setCompletedSteps(['keywords']);
    } catch (error) {}
  };

  const handleGenerateContent = async () => {
    if (!brandData || !keywordStrategy) return;
    try {
        const result = await runGeneration(
            (service) => service.generateContentAndSocial(brandData, keywordStrategy),
            'content'
        );
        setContentPlan(result.contentPlan);
        setSocialPosts(result.socialPosts);
        handleUpdateAnalytics({
            contentPieces: result.contentPlan.totalPages,
            socialPosts: Object.values(result.socialPosts).flat().length,
            estimatedReach: 25000 + (brandData.selectedCities.length * 5000),
            seoScore: Math.min(100, analyticsData.seoScore + 15),
        });
        setCompletedSteps(prev => [...prev, 'content']);
    } catch (error) {}
  };

  const handleGeneratePublishingPlan = async () => {
    const currentData = { brandData, contentPlan, socialPosts };
    if (!currentData.brandData || !currentData.contentPlan || !currentData.socialPosts) return;
    try {
        const result = await runGeneration(
            (service) => service.generatePublishingCalendar(currentData as AllData),
            'publishing'
        );
        setPublishingPlan(result);
        handleUpdateAnalytics({ seoScore: Math.min(100, analyticsData.seoScore + 10) });
        setCompletedSteps(prev => [...prev, 'publishing']);
    } catch (error) {}
  };
  
  const handleGenerateTechnicalSEO = async () => {
    if (!brandData) return;
    try {
        const result = await runGeneration(
            (service) => service.generateTechnicalSeo(brandData),
            'technical'
        );
        setTechnicalSeoPlan(result);
        handleUpdateAnalytics({ seoScore: Math.min(100, analyticsData.seoScore + 15) });
        setCompletedSteps(prev => [...prev, 'technical']);
    } catch (error) {}
  };

  const handleGenerateConversion = async () => {
    if (!brandData) return;
    try {
        const result = await runGeneration(
            (service) => service.generateConversionPlan(brandData),
            'conversion'
        );
        setConversionPlan(result);
        handleUpdateAnalytics({ 
            seoScore: Math.min(100, analyticsData.seoScore + 10),
            estimatedReach: analyticsData.estimatedReach + 10000 
        });
        setCompletedSteps(prev => [...prev, 'conversion']);
    } catch (error) {}
  };

   const handleAnalyzePerformance = async (inputs: PerformanceInputs) => {
    if (!brandData) return;
    const currentStrategy: AllData = { brandData, analyticsData, keywordStrategy, contentPlan, socialPosts, technicalSeoPlan, conversionPlan, publishingPlan, performanceAnalysis: null, seoAudit };
    try {
        const result = await runGeneration(
            (service) => service.analyzePerformanceData(currentStrategy, inputs),
            'performance'
        );
        setPerformanceAnalysis(result);
        setCompletedSteps(prev => [...prev, 'performance']);
    } catch(e) {}
  };
  
  const handleGenerateNewDemo = async (initialData: InitialBrandInput, onProgress: (message: string) => void) => {
    if (!aiService) {
        setApiManagerOpen(true);
        alert("Please enter your Gemini API key to generate a demo.");
        return;
    }
    setLoading(prev => ({...prev, demo: true}));
    
    try {
        onProgress("Generating Business Foundation & SEO Audit...");
        const [foundationResult, auditResult] = await Promise.all([
            aiService.generateBusinessFoundation(initialData),
            aiService.generateBaselineSeoAudit(initialData)
        ]);
        const fullBrandData = { ...initialData, ...foundationResult };

        onProgress("Generating Keyword Strategy...");
        const keywords = await aiService.generateKeywordStrategy(fullBrandData);

        onProgress("Generating Content & Social Posts...");
        const { contentPlan, socialPosts } = await aiService.generateContentAndSocial(fullBrandData, keywords);
        
        const tempAllData = { brandData: fullBrandData, contentPlan, socialPosts };
        
        onProgress("Creating Publishing Calendar...");
        const publishingPlan = await aiService.generatePublishingCalendar(tempAllData as AllData);

        onProgress("Generating Technical SEO Plan...");
        const techPlan = await aiService.generateTechnicalSeo(fullBrandData);

        onProgress("Generating Conversion Plan...");
        const convPlan = await aiService.generateConversionPlan(fullBrandData);
        
        const finalAnalytics = {
            keywords: keywords.totalKeywords,
            contentPieces: contentPlan.totalPages,
            socialPosts: Object.values(socialPosts).flat().length,
            estimatedReach: 35000 + (fullBrandData.selectedCities.length * 5000),
            competitiveScore: keywords.competitiveScore ?? 0,
            seoScore: 95
        };

        const finalStrategy: AllData = { 
            brandData: fullBrandData, seoAudit: auditResult, keywordStrategy: keywords, contentPlan, socialPosts, publishingPlan, technicalSeoPlan: techPlan, conversionPlan: convPlan, performanceAnalysis: null, analyticsData: finalAnalytics
        };

        onProgress("Generating Sales Insights...");
        const insights = await aiService.generateSalesInsights(finalStrategy);
        finalStrategy.salesInsights = insights;
        
        const newDemos = { ...savedDemos, [fullBrandData.name]: finalStrategy };
        setSavedDemos(newDemos);
        localStorage.setItem('seo-app-demos', JSON.stringify(newDemos));
        
        onProgress("Done!");
        loadDemoData(finalStrategy);
        setDemoModalOpen(false);

    } catch(e) {
        alert("Failed to generate demo. Please check console.");
    } finally {
        setLoading(prev => ({...prev, demo: false}));
    }
  };

  const isStepCompleted = (step: StepKey) => completedSteps.includes(step);

  const formatOutput = (title: string, data: object | null) => {
    if (!data) return null;
    try {
        const formattedJson = JSON.stringify(data, null, 2);
        return `${title.toUpperCase()}\n\n${formattedJson}`;
    } catch {
        return "Could not format output.";
    }
  };

  const allData = useMemo(() => ({
      brandData, analyticsData, keywordStrategy, contentPlan, socialPosts, technicalSeoPlan, conversionPlan, publishingPlan, performanceAnalysis, seoAudit,
  }), [brandData, analyticsData, keywordStrategy, contentPlan, socialPosts, technicalSeoPlan, conversionPlan, publishingPlan, performanceAnalysis, seoAudit]);


  return (
    <>
    <ApiManagerModal 
      isOpen={isApiManagerOpen}
      onClose={() => setApiManagerOpen(false)}
    />
    <DemoGenerationModal 
        isOpen={isDemoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onGenerate={handleGenerateNewDemo}
        isLoading={loading.demo}
    />
    <ProjectManager
        currentProject={currentProject}
        onProjectSelect={handleProjectSelect}
        onProjectSave={handleProjectSave}
        isOpen={isProjectManagerOpen}
        onClose={() => setProjectManagerOpen(false)}
    />
    <CalendarEventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
    />

    <div className={`flex ${isDemoMode ? 'pr-80' : ''} transition-all duration-300`}>
        <div className="flex-grow p-2 md:p-5">
          <div className="container max-w-7xl mx-auto bg-white/95 rounded-2xl shadow-2xl overflow-hidden">
            <Header 
              onManageApiKeys={() => setApiManagerOpen(true)}
              onGenerateNewDemo={() => setDemoModalOpen(true)}
              onLoadDemo={handleLoadDemo}
              onManageProjects={() => setProjectManagerOpen(true)}
              savedDemos={Object.keys(savedDemos)}
              currentProject={currentProject}
            />
            <main className="p-4 md:p-8 lg:p-12 space-y-8">
              <Step stepNumber="1" title="Business Information & SEO Audit" isAlwaysOpen>
                <BusinessInputForm 
                  isLoadingFoundation={loading.foundation}
                  isLoadingStrategy={loading.keywords}
                  onGenerateInitialAnalysis={handleGenerateInitialAnalysis}
                  onConfirmAndGenerateStrategy={handleConfirmAndGenerateStrategy}
                  foundationData={brandData}
                  seoAudit={seoAudit}
                  onToggleAnalytics={() => setShowAnalytics(prev => !prev)}
                  isDemoMode={isDemoMode}
                />
              </Step>

              {showAnalytics && <AnalyticsDashboard data={analyticsData} />}

              <Step stepNumber="2" title="AI Keyword Research & Strategy" isUnlocked={isStepCompleted('keywords')}>
                <OutputSection
                  title="Generated Keywords & Strategy"
                  isLoading={loading.keywords}
                  content={formatOutput('Keyword Research Results', keywordStrategy)}
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
                  content={formatOutput('Content Generation Plan', contentPlan)}
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
                 {isStepCompleted('technical') && !isDemoMode && (
                  <div className="mt-6 text-center">
                    <button className={`${baseButtonClasses} ${secondaryButtonClasses}`} onClick={handleGenerateConversion} disabled={loading.conversion}>
                      💰 Generate Conversion Strategy
                    </button>
                  </div>
                )}
              </Step>

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
                  content={formatOutput('Performance Analysis', performanceAnalysis)}
                  placeholder="Your AI-powered performance analysis will appear here after you submit your data."
                  isCompleted={isStepCompleted('performance')}
                />
              </Step>

              {isStepCompleted('conversion') && <FinalActions allData={allData} />}
            </main>
          </div>
        </div>
        {isDemoMode && <SalesCoachPanel insights={salesInsights} isOpen={isSalesCoachOpen} onToggle={() => setSalesCoachOpen(p => !p)} />}
    </div>
    </>
  );
};

export default App;
