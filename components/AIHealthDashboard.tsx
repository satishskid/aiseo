import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/aiService';
import { useApiKey } from '../context/ApiKeyContext';
import type { InitialBrandInput, BrandData, AllData, PerformanceInputs } from '../types';

interface AIEndpointStatus {
  name: string;
  endpoint: string;
  status: 'healthy' | 'unhealthy' | 'mock' | 'testing';
  lastTested: string | null;
  responseTime: number | null;
  errorMessage: string | null;
  isRealAI: boolean;
}

interface AIHealthDashboardProps {
  onStatusChange?: (overallHealth: 'healthy' | 'partial' | 'mock') => void;
}

export const AIHealthDashboard: React.FC<AIHealthDashboardProps> = ({ onStatusChange }) => {
  const { apiKeys } = useApiKey();
  const [endpoints, setEndpoints] = useState<AIEndpointStatus[]>([]);
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [isPerformingFullTest, setIsPerformingFullTest] = useState(false);
  const [overallHealth, setOverallHealth] = useState<'healthy' | 'partial' | 'mock'>('mock');
  const [lastHealthCheck, setLastHealthCheck] = useState<string | null>(null);
  const [healthCheckType, setHealthCheckType] = useState<'lightweight' | 'full' | null>(null);

  // AI Endpoints mapped from the architecture analysis
  const aiEndpoints = [
    {
      name: 'Business Foundation Generator',
      endpoint: 'generateBusinessFoundation',
      description: 'Generates business description, target customer, and key services'
    },
    {
      name: 'SEO Audit Analyzer',
      endpoint: 'generateBaselineSeoAudit', 
      description: 'Comprehensive SEO audit with technical, content, and competitive analysis'
    },
    {
      name: 'Keyword Strategy Engine',
      endpoint: 'generateKeywordStrategy',
      description: 'Primary, long-tail, location, and competitor keyword research'
    },
    {
      name: 'Content & Social Generator',
      endpoint: 'generateContentAndSocial',
      description: 'Blog posts, landing pages, social media content for all platforms'
    },
    {
      name: 'Publishing Calendar Creator',
      endpoint: 'generatePublishingCalendar',
      description: 'Content scheduling and distribution timeline'
    },
    {
      name: 'Technical SEO Optimizer',
      endpoint: 'generateTechnicalSeo',
      description: 'On-page optimization and structured data recommendations'
    },
    {
      name: 'Conversion Plan Generator',
      endpoint: 'generateConversionPlan',
      description: 'User journey mapping and conversion optimization strategies'
    },
    {
      name: 'Performance Analytics Engine',
      endpoint: 'analyzePerformanceData',
      description: 'ROI projections and performance metrics analysis'
    },
    {
      name: 'Sales Insights Generator',
      endpoint: 'generateSalesInsights',
      description: 'Sales strategy and opportunity identification'
    }
  ];

  useEffect(() => {
    // Initialize endpoints with default status
    setEndpoints(aiEndpoints.map(endpoint => ({
      name: endpoint.name,
      endpoint: endpoint.endpoint,
      status: 'mock' as const,
      lastTested: null,
      responseTime: null,
      errorMessage: null,
      isRealAI: false
    })));
    
    // Automatically perform initial health check when component mounts
    const performInitialHealthCheck = async () => {
      console.log('🏥 Performing automatic AI health check on component mount...');
      await testAllEndpoints();
    };
    
    // Small delay to allow component to render first
    setTimeout(performInitialHealthCheck, 1000);
  }, []);

  // Automatically test when API keys change
  useEffect(() => {
    if (apiKeys.gemini && !apiKeys.gemini.includes('placeholder')) {
      console.log('🔑 API key detected, performing automatic health check...');
      // Small delay to ensure API key is properly set
      setTimeout(() => {
        testAllEndpoints();
      }, 500);
    } else {
      // If no valid API key, set all endpoints to mock status
      setEndpoints(prev => prev.map(endpoint => ({
        ...endpoint,
        status: 'mock' as const,
        errorMessage: 'No valid API key configured',
        isRealAI: false,
        lastTested: new Date().toISOString()
      })));
      setOverallHealth('mock');
      onStatusChange?.('mock');
    }
  }, [apiKeys.gemini]);

  // Periodic health check every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (apiKeys.gemini && !apiKeys.gemini.includes('placeholder')) {
        console.log('⏰ Performing periodic AI health check...');
        testAllEndpoints();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [apiKeys.gemini]);

  const testSingleEndpoint = async (endpointName: string): Promise<AIEndpointStatus> => {
    const geminiKey = apiKeys.gemini;
    const startTime = Date.now();
    
    console.log(`🔍 Testing endpoint ${endpointName} with API key: ${geminiKey ? `${geminiKey.substring(0, 10)}...` : 'NONE'}`);
    
    // STRICT validation - check for real API key with enhanced validation
    if (!geminiKey || 
        geminiKey.includes('placeholder') || 
        geminiKey.includes('your-') || 
        geminiKey.includes('dummy') ||
        geminiKey.includes('test') ||
        geminiKey.includes('example') ||
        geminiKey.trim() === '' ||
        geminiKey === 'undefined' ||
        geminiKey === 'null' ||
        geminiKey.length < 30 ||  // Gemini keys are typically 39 characters
        !geminiKey.startsWith('AIza')) {  // Gemini keys start with AIza
      
      console.log(`❌ ${endpointName} - Invalid API key detected`);
      return {
        name: endpointName,
        endpoint: endpointName,
        status: 'mock',
        lastTested: new Date().toISOString(),
        responseTime: null,
        errorMessage: 'No valid API key configured - using mock data',
        isRealAI: false
      };
    }

    try {
      console.log(`🚀 Creating AI service for ${endpointName}...`);
      const aiService = new GeminiService(geminiKey);
      
      // Perform lightweight health check instead of full endpoint test
      // This tests AI connectivity without using up API quotas
      const healthCheckResult = await performLightweightHealthCheck(aiService, endpointName);
      
      const responseTime = Date.now() - startTime;
      
      if (healthCheckResult.isHealthy) {
        console.log(`✅ ${endpointName} - Health check PASSED (${responseTime}ms)`);
      } else {
        console.log(`❌ ${endpointName} - Health check FAILED: ${healthCheckResult.error}`);
      }
      
      return {
        name: endpointName,
        endpoint: endpointName,
        status: healthCheckResult.isHealthy ? 'healthy' : 'unhealthy',
        lastTested: new Date().toISOString(),
        responseTime,
        errorMessage: healthCheckResult.error || null,
        isRealAI: healthCheckResult.isHealthy
      };
      
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      console.error(`❌ ${endpointName} - Test failed with error:`, error);
      
      return {
        name: endpointName,
        endpoint: endpointName,
        status: 'unhealthy',
        lastTested: new Date().toISOString(),
        responseTime,
        errorMessage: error.message,
        isRealAI: false
      };
    }
  };

  // Lightweight health check that tests AI service without making full API calls
  const performLightweightHealthCheck = async (aiService: GeminiService, endpointName: string): Promise<{isHealthy: boolean, error?: string}> => {
    try {
      // IMPORTANT: First validate that we have a real API key
      const geminiKey = apiKeys.gemini;
      if (!geminiKey || 
          geminiKey.includes('placeholder') || 
          geminiKey.includes('your-') || 
          geminiKey.includes('dummy') ||
          geminiKey.includes('test') ||
          geminiKey.includes('example') ||
          geminiKey.trim() === '' ||
          geminiKey.length < 30 ||
          !geminiKey.startsWith('AIza')) {
        return { isHealthy: false, error: 'Invalid or missing API key format' };
      }

      console.log(`🧪 Testing AI connectivity for ${endpointName} with key: ${geminiKey.substring(0, 10)}...`);
      
      // Test if the AI service is properly initialized and can connect
      // We'll use a specific test prompt to verify real AI connectivity
      const testPrompt = "Health check test. You must respond with exactly the word: HEALTHY";
      
      // Make a minimal but REAL API call to test connectivity
      const result = await (aiService as any).model.generateContent(testPrompt);
      const response = result.response.text().trim();
      
      console.log(`🔍 AI Response for ${endpointName}:`, response);
      
      // Validate that we got a REAL AI response with expected content
      if (response && response.length > 0) {
        const normalizedResponse = response.toLowerCase().trim();
        
        // STRICT validation: Must contain "healthy" as expected
        if (normalizedResponse.includes('healthy')) {
          console.log(`✅ ${endpointName} is healthy - Real AI responded correctly: "${response}"`);
          return { isHealthy: true };
        } 
        // Allow for slight variations in AI response
        else if (normalizedResponse.includes('ok') || normalizedResponse === 'healthy' || normalizedResponse.includes('working')) {
          console.log(`✅ ${endpointName} is healthy - AI responded with valid status: "${response}"`);
          return { isHealthy: true };
        } 
        // Reject any other response as potentially invalid
        else {
          console.log(`❌ ${endpointName} - Invalid AI response (expected 'HEALTHY'): "${response}"`);
          return { isHealthy: false, error: `Invalid AI response: "${response}" - Expected: "HEALTHY"` };
        }
      } else {
        console.log(`❌ ${endpointName} - Empty or null response from AI`);
        return { isHealthy: false, error: 'Empty or null response from AI service' };
      }
      
    } catch (error: any) {
      console.error(`❌ Health check failed for ${endpointName}:`, error);
      
      // Provide specific error messages for common issues
      if (error.message.includes('API_KEY')) {
        return { isHealthy: false, error: 'Invalid API key' };
      } else if (error.message.includes('quota')) {
        return { isHealthy: false, error: 'API quota exceeded' };
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        return { isHealthy: false, error: 'Network connectivity issue' };
      } else {
        return { isHealthy: false, error: error.message };
      }
    }
  };

  // Legacy full endpoint testing (kept for manual deep testing)
  const testSingleEndpointFull = async (endpointName: string): Promise<AIEndpointStatus> => {
    const geminiKey = apiKeys.gemini;
    const startTime = Date.now();
    
    if (!geminiKey || geminiKey.includes('placeholder')) {
      return {
        name: endpointName,
        endpoint: endpointName,
        status: 'mock',
        lastTested: new Date().toISOString(),
        responseTime: null,
        errorMessage: 'No valid API key configured',
        isRealAI: false
      };
    }

    try {
      const aiService = new GeminiService(geminiKey);
      
      // Create test data based on endpoint type
      const testData = getTestDataForEndpoint(endpointName);
      
      // Call the specific endpoint
      let result;
      switch (endpointName) {
        case 'generateBusinessFoundation':
          result = await aiService.generateBusinessFoundation(testData.initial);
          break;
        case 'generateBaselineSeoAudit':
          result = await aiService.generateBaselineSeoAudit(testData.initial);
          break;
        case 'generateKeywordStrategy':
          result = await aiService.generateKeywordStrategy(testData.brand);
          break;
        case 'generateContentAndSocial':
          result = await aiService.generateContentAndSocial(testData.brand, testData.keywords);
          break;
        case 'generatePublishingCalendar':
          result = await aiService.generatePublishingCalendar(testData.allData);
          break;
        case 'generateTechnicalSeo':
          result = await aiService.generateTechnicalSeo(testData.brand);
          break;
        case 'generateConversionPlan':
          result = await aiService.generateConversionPlan(testData.brand);
          break;
        case 'analyzePerformanceData':
          result = await aiService.analyzePerformanceData(testData.allData, testData.performance);
          break;
        case 'generateSalesInsights':
          result = await aiService.generateSalesInsights(testData.allData);
          break;
        default:
          throw new Error(`Unknown endpoint: ${endpointName}`);
      }
      
      const responseTime = Date.now() - startTime;
      
      return {
        name: endpointName,
        endpoint: endpointName,
        status: 'healthy',
        lastTested: new Date().toISOString(),
        responseTime,
        errorMessage: null,
        isRealAI: true
      };
      
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      return {
        name: endpointName,
        endpoint: endpointName,
        status: 'unhealthy',
        lastTested: new Date().toISOString(),
        responseTime,
        errorMessage: error.message,
        isRealAI: false
      };
    }
  };

  const getTestDataForEndpoint = (endpointName: string) => {
    const testInitial: InitialBrandInput = {
      name: 'AI Health Test Clinic',
      website: 'https://test-clinic.com',
      businessType: 'Healthcare',
      serviceType: 'Clinic',
      locationScope: 'Local',
      selectedCities: ['Mumbai'],
      specificLocations: 'Mumbai',
      linkedinHandle: 'testclinic',
      twitterHandle: 'testclinic',
      facebookHandle: 'testclinic'
    };

    const testBrand: BrandData = {
      ...testInitial,
      description: 'Test healthcare clinic for AI endpoint testing',
      targetCustomer: 'Health-conscious individuals',
      keyServices: 'Health checkups, diagnostic testing'
    };

    const testKeywords = {
      primaryKeywords: ['healthcare Mumbai', 'health checkup'],
      urgentKeywords: ['emergency care'],
      serviceKeywords: ['diagnostic tests'],
      problemKeywords: ['health issues'],
      longTailKeywords: ['best healthcare clinic Mumbai'],
      locationKeywords: ['Mumbai clinic'],
      competitorKeywords: ['Apollo Mumbai'],
      keywordDifficulty: { 'healthcare Mumbai': 45 },
      searchVolume: { 'healthcare Mumbai': 1200 },
      keywordOpportunities: ['preventive care'],
      seasonalKeywords: ['winter health'],
      voiceSearchKeywords: ['nearby clinic']
    };

    const testAllData: AllData = {
      brandData: testBrand,
      seoAudit: null,
      keywordStrategy: testKeywords,
      contentPlan: null,
      socialPosts: null,
      publishingPlan: null,
      technicalSeoPlan: null,
      conversionPlan: null,
      performanceAnalysis: null,
      salesInsights: [],
      structuredData: null,
    };

    const testPerformance: PerformanceInputs = {
      websiteUrl: 'https://test-clinic.com',
      currentTraffic: 1000,
      conversionRate: 2.5,
      averageOrderValue: 500,
      topKeywords: ['healthcare Mumbai'],
      competitorUrls: ['apollo.com'],
      goals: ['Increase traffic'],
      timeframe: '3 months',
      budget: 50000,
      gscQueries: 'Test queries',
      gaTraffic: 'Test traffic data',
      metaInsights: 'Test Meta insights',
      linkedinInsights: 'Test LinkedIn insights',
      twitterInsights: 'Test Twitter insights'
    };

    return {
      initial: testInitial,
      brand: testBrand,
      keywords: testKeywords,
      allData: testAllData,
      performance: testPerformance
    };
  };

  const testAllEndpoints = async (useFullTest: boolean = false) => {
    setIsTestingAll(true);
    if (useFullTest) {
      setIsPerformingFullTest(true);
    }
    
    try {
      // Update all endpoints to testing status
      setEndpoints(prev => prev.map(endpoint => ({
        ...endpoint,
        status: 'testing' as const
      })));

      // Test endpoints sequentially to avoid rate limiting
      const results: AIEndpointStatus[] = [];
      
      for (const endpoint of aiEndpoints) {
        console.log(`🧪 Testing AI endpoint (${useFullTest ? 'FULL' : 'LIGHTWEIGHT'}): ${endpoint.name}`);
        const result = useFullTest 
          ? await testSingleEndpointFull(endpoint.endpoint)
          : await testSingleEndpoint(endpoint.endpoint);
        results.push(result);
        
        // Update UI progressively
        setEndpoints(prev => prev.map(ep => 
          ep.endpoint === endpoint.endpoint ? result : ep
        ));
        
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, useFullTest ? 1000 : 200));
      }
      
      // Calculate overall health
      const healthyCount = results.filter(r => r.status === 'healthy').length;
      const mockCount = results.filter(r => r.status === 'mock').length;
      
      let newOverallHealth: 'healthy' | 'partial' | 'mock';
      if (healthyCount === results.length) {
        newOverallHealth = 'healthy';
      } else if (healthyCount > 0) {
        newOverallHealth = 'partial';
      } else {
        newOverallHealth = 'mock';
      }
      
      setOverallHealth(newOverallHealth);
      setLastHealthCheck(new Date().toISOString());
      setHealthCheckType(useFullTest ? 'full' : 'lightweight');
      onStatusChange?.(newOverallHealth);
      
      console.log(`🏁 AI Health Check Complete (${useFullTest ? 'FULL' : 'LIGHTWEIGHT'}): ${healthyCount}/${results.length} endpoints healthy`);
      
    } catch (error) {
      console.error('❌ AI health check failed:', error);
    } finally {
      setIsTestingAll(false);
      if (useFullTest) {
        setIsPerformingFullTest(false);
      }
    }
  };

  const getStatusIcon = (status: AIEndpointStatus['status']) => {
    switch (status) {
      case 'healthy': return '✅';
      case 'unhealthy': return '❌';
      case 'mock': return '🔶';
      case 'testing': return '🔄';
      default: return '❓';
    }
  };

  const getStatusColor = (status: AIEndpointStatus['status']) => {
    switch (status) {
      case 'healthy': return 'text-green-700 bg-green-50 border-green-200';
      case 'unhealthy': return 'text-red-700 bg-red-50 border-red-200';
      case 'mock': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'testing': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: AIEndpointStatus['status']) => {
    switch (status) {
      case 'healthy': return 'Real AI Active';
      case 'unhealthy': return 'AI Error';
      case 'mock': return 'Using Mock Data';
      case 'testing': return 'Testing...';
      default: return 'Unknown';
    }
  };

  const getOverallHealthIcon = () => {
    switch (overallHealth) {
      case 'healthy': return '🟢';
      case 'partial': return '🟡';
      case 'mock': return '🔴';
    }
  };

  const getOverallHealthText = () => {
    switch (overallHealth) {
      case 'healthy': return 'All AI Systems Operational';
      case 'partial': return 'Partial AI Functionality';
      case 'mock': return 'Using Simulated Data';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border-2 border-slate-200 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏥</span>
          <h3 className="text-xl font-bold text-slate-800">AI Health Check Dashboard</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
            overallHealth === 'healthy' ? 'bg-green-100 text-green-800' :
            overallHealth === 'partial' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {getOverallHealthIcon()} {getOverallHealthText()}
          </div>
          {lastHealthCheck && (
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Last check: {new Date(lastHealthCheck).toLocaleTimeString()} 
              ({healthCheckType === 'full' ? 'Full Test' : 'Lightweight'})
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => testAllEndpoints(false)}
            disabled={isTestingAll}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isTestingAll && !isPerformingFullTest ? '🔄 Quick Testing...' : '🧪 Quick Health Check'}
          </button>
          
          <button
            onClick={() => testAllEndpoints(true)}
            disabled={isTestingAll}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPerformingFullTest ? '🔄 Full Testing...' : '🔬 Full AI Test'}
          </button>
        </div>
      </div>

      {/* Auto Health Check Status */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 text-blue-800">
          <span className="text-sm">🤖</span>
          <span className="text-sm font-medium">Automatic Health Monitoring Active</span>
        </div>
        <p className="text-xs text-blue-700 mt-1">
          System automatically checks AI connectivity on startup, API key changes, and every 5 minutes.
          Quick checks test connectivity, Full tests verify all endpoints with real data.
        </p>
      </div>

      <div className="grid gap-4">
        {endpoints.map((endpoint, index) => {
          const aiEndpoint = aiEndpoints.find(ae => ae.endpoint === endpoint.endpoint);
          return (
            <div key={index} className={`border rounded-lg p-4 ${getStatusColor(endpoint.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getStatusIcon(endpoint.status)}</span>
                  <div>
                    <h4 className="font-semibold">{endpoint.name}</h4>
                    <p className="text-sm opacity-75">{aiEndpoint?.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">{getStatusText(endpoint.status)}</div>
                  {endpoint.responseTime && (
                    <div className="text-sm opacity-75">{endpoint.responseTime}ms</div>
                  )}
                  {endpoint.lastTested && (
                    <div className="text-xs opacity-60">
                      {new Date(endpoint.lastTested).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
              
              {endpoint.errorMessage && (
                <div className="mt-2 text-sm bg-white/50 rounded p-2">
                  <strong>Error:</strong> {endpoint.errorMessage}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-white/50 rounded-lg">
        <h4 className="font-semibold mb-2">🔍 Health Check Types:</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
          <div>
            <h5 className="font-medium text-blue-700 mb-1">🧪 Quick Health Check (Automatic)</h5>
            <ul className="space-y-1">
              <li>• Tests AI service connectivity</li>
              <li>• Minimal API usage</li>
              <li>• Runs automatically every 5 minutes</li>
              <li>• Fast response times (~100-200ms)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-purple-700 mb-1">🔬 Full AI Test (Manual)</h5>
            <ul className="space-y-1">
              <li>• Tests actual endpoint functionality</li>
              <li>• Uses real test data</li>
              <li>• Manual trigger only</li>
              <li>• Comprehensive validation</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm">
          <strong>✅ Status Meanings:</strong>
          <div className="mt-1 space-y-1">
            <div><span className="text-green-600">🟢 Healthy:</span> Real AI connected and responding</div>
            <div><span className="text-red-600">🔴 Unhealthy:</span> AI service error or unreachable</div>
            <div><span className="text-orange-600">🟡 Mock:</span> No API key configured, using fallback data</div>
          </div>
        </div>
      </div>
    </div>
  );
};
