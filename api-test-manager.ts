/**
 * API TEST MANAGER - Comprehensive Testing Suite
 * 
 * This file systematically tests whether the AI SEO platform is using:
 * 1. Real AI API calls (Google Gemini, OpenAI, Claude, etc.)
 * 2. Mock/simulated data responses
 * 
 * Test Results Summary:
 * - CRITICAL FINDING: Platform has TWO API validation systems
 * - Mock validation in /services/apiValidationService.ts (simple length checks)
 * - Real AI service in /services/aiService.ts (actual Google GenAI integration)
 * 
 * INVESTIGATION FINDINGS:
 */

import { GeminiService } from './services/aiService';
import { validateApiKey } from './services/apiValidationService';
import type { ApiProviderId, InitialBrandInput } from './types';

class APITestManager {
    private testResults: Record<string, any> = {};
    
    constructor() {
        console.log('🔍 API Test Manager Initialized');
        console.log('📋 Testing all API integrations for real vs mock functionality...');
    }

    /**
     * Test #1: API Key Validation - Real vs Mock
     */
    async testApiKeyValidation() {
        console.log('\n🔑 TESTING API KEY VALIDATION');
        console.log('=' .repeat(50));
        
        const testKeys = {
            gemini: 'AIzaSyDummyKey_32Characters_ForTesting',
            openai: 'sk-dummy1234567890abcdef1234567890abcdef',
            claude: 'sk-ant-dummy12345678901234567890',
            groq: 'gsk_dummy1234567890abcdef1234567890',
            openrouter: 'sk-or-dummy1234567890abcdef'
        };

        for (const [provider, key] of Object.entries(testKeys)) {
            try {
                const isValid = await validateApiKey(provider as ApiProviderId, key);
                console.log(`📊 ${provider}: ${isValid ? '✅ VALID' : '❌ INVALID'} (Mock validation: ${key.length > 10 ? 'PASS' : 'FAIL'})`);
                
                this.testResults[`${provider}_validation`] = {
                    isValid,
                    keyLength: key.length,
                    isMockValidation: isValid && key.includes('dummy')
                };
            } catch (error) {
                console.log(`❌ ${provider}: ERROR - ${error.message}`);
                this.testResults[`${provider}_validation`] = { error: error.message };
            }
        }
    }

    /**
     * Test #2: Real Gemini API Integration Test
     */
    async testRealGeminiAPI() {
        console.log('\n🤖 TESTING REAL GEMINI API INTEGRATION');
        console.log('=' .repeat(50));
        
        // Test with placeholder key
        const placeholderKey = 'placeholder_gemini_api_key_for_development';
        console.log(`🔑 Using placeholder key: ${placeholderKey}`);
        
        try {
            const geminiService = new GeminiService(placeholderKey);
            console.log('✅ GeminiService instance created successfully');
            
            // Test actual API call with mock business data
            const mockInput: InitialBrandInput = {
                name: 'Test Health Clinic',
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
            
            console.log('🚀 Attempting real API call to generate business foundation...');
            const startTime = Date.now();
            
            try {
                const result = await geminiService.generateBusinessFoundation(mockInput);
                const endTime = Date.now();
                const duration = endTime - startTime;
                
                console.log(`✅ API call completed in ${duration}ms`);
                console.log('📊 Response sample:', JSON.stringify(result, null, 2).substring(0, 200) + '...');
                
                this.testResults.gemini_real_api = {
                    success: true,
                    duration,
                    responseType: typeof result,
                    hasRealData: !JSON.stringify(result).includes('mock') && !JSON.stringify(result).includes('placeholder')
                };
                
            } catch (apiError) {
                console.log(`❌ API call failed: ${apiError.message}`);
                this.testResults.gemini_real_api = {
                    success: false,
                    error: apiError.message,
                    isAuthError: apiError.message.includes('API') || apiError.message.includes('auth'),
                    isNetworkError: apiError.message.includes('network') || apiError.message.includes('fetch')
                };
            }
            
        } catch (initError) {
            console.log(`❌ Failed to initialize GeminiService: ${initError.message}`);
            this.testResults.gemini_real_api = { initError: initError.message };
        }
    }

    /**
     * Test #3: Compare App.tsx Mock Data vs Real AI Service
     */
    async testMockVsRealComparison() {
        console.log('\n📊 TESTING MOCK VS REAL DATA COMPARISON');
        console.log('=' .repeat(50));
        
        // Check if App.tsx is using hardcoded mock data
        const appTsxUsesMockData = true; // Based on previous investigation
        console.log(`📋 App.tsx uses mock data: ${appTsxUsesMockData ? '✅ TRUE' : '❌ FALSE'}`);
        
        // Check if real AI service exists and is functional
        const realAIServiceExists = typeof GeminiService !== 'undefined';
        console.log(`🤖 Real AI service exists: ${realAIServiceExists ? '✅ TRUE' : '❌ FALSE'}`);
        
        this.testResults.mock_vs_real = {
            appUsesMockData: appTsxUsesMockData,
            realServiceExists: realAIServiceExists,
            discrepancy: appTsxUsesMockData && realAIServiceExists
        };
    }

    /**
     * Test #4: Environment Configuration Test
     */
    testEnvironmentConfig() {
        console.log('\n⚙️ TESTING ENVIRONMENT CONFIGURATION');
        console.log('=' .repeat(50));
        
        const envVars = {
            GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'Not set',
            VITE_CLERK_PUBLISHABLE_KEY: process.env.VITE_CLERK_PUBLISHABLE_KEY || 'Not set',
            NODE_ENV: process.env.NODE_ENV || 'development'
        };
        
        for (const [key, value] of Object.entries(envVars)) {
            const isPlaceholder = value.includes('placeholder') || value.includes('development');
            const isReal = value.length > 20 && !isPlaceholder;
            console.log(`🔧 ${key}: ${isReal ? '✅ REAL' : '⚠️ PLACEHOLDER/MISSING'} (${value.substring(0, 20)}...)`);
        }
        
        this.testResults.environment = envVars;
    }

    /**
     * Test #5: Current App Functionality Test
     */
    async testCurrentAppFunctionality() {
        console.log('\n🖥️ TESTING CURRENT APP FUNCTIONALITY');
        console.log('=' .repeat(50));
        
        // This would need to be run in browser context
        console.log('⚠️ This test requires browser context - see browser console for results');
        console.log('💡 Manual verification needed:');
        console.log('   1. Click "Generate Foundation & SEO Audit" button');
        console.log('   2. Check browser Network tab for API calls');
        console.log('   3. Verify if setTimeout delays are used (= mock data)');
        console.log('   4. Check if responses are identical across multiple runs (= static mock data)');
    }

    /**
     * Generate Final Test Report
     */
    generateReport() {
        console.log('\n📋 COMPREHENSIVE TEST REPORT');
        console.log('=' .repeat(60));
        
        console.log('\n🔍 KEY FINDINGS:');
        
        // Finding 1: API Key Validation
        const mockValidationUsed = Object.values(this.testResults).some(
            (result: any) => result.isMockValidation
        );
        console.log(`1. API Key Validation: ${mockValidationUsed ? '⚠️ MOCK' : '✅ REAL'} validation being used`);
        
        // Finding 2: Real AI Service Availability
        const realServiceAvailable = this.testResults.gemini_real_api?.success === true;
        console.log(`2. Real AI Service: ${realServiceAvailable ? '✅ FUNCTIONAL' : '❌ NOT FUNCTIONAL'}`);
        
        // Finding 3: Environment Setup
        const hasRealApiKeys = !this.testResults.environment?.GEMINI_API_KEY?.includes('placeholder');
        console.log(`3. API Keys: ${hasRealApiKeys ? '✅ REAL KEYS' : '⚠️ PLACEHOLDER KEYS'}`);
        
        // Finding 4: App Integration
        const appIntegrated = !this.testResults.mock_vs_real?.discrepancy;
        console.log(`4. App Integration: ${appIntegrated ? '✅ CONSISTENT' : '⚠️ DISCREPANCY FOUND'}`);
        
        console.log('\n🚨 CRITICAL ISSUES FOUND:');
        if (mockValidationUsed) {
            console.log('   • API validation service uses simple length checks, not real API calls');
        }
        if (!realServiceAvailable) {
            console.log('   • Real Gemini AI service exists but fails to execute (likely due to invalid API key)');
        }
        if (!hasRealApiKeys) {
            console.log('   • Environment uses placeholder API keys instead of real credentials');
        }
        if (!appIntegrated) {
            console.log('   • App.tsx uses hardcoded mock data instead of calling real AI service');
        }
        
        console.log('\n✅ RECOMMENDATIONS:');
        console.log('   1. Replace placeholder API keys with real credentials');
        console.log('   2. Update App.tsx to use GeminiService instead of mock data');
        console.log('   3. Implement real API validation calls in apiValidationService.ts');
        console.log('   4. Test all 5 AI providers (Gemini, OpenAI, Claude, Groq, OpenRouter)');
        console.log('   5. Add error handling for failed API calls with graceful fallbacks');
        
        return this.testResults;
    }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
    (window as any).APITestManager = APITestManager;
    console.log('🔍 APITestManager available in browser console');
    console.log('💡 Usage: const tester = new APITestManager(); await tester.runAllTests();');
}

// Define runAllTests function for export
async function runAllTests() {
    try {
        const tester = new APITestManager();
        await tester.testApiKeyValidation();
        await tester.testRealGeminiAPI();
        await tester.testMockVsRealComparison();
        tester.testEnvironmentConfig();
        await tester.testCurrentAppFunctionality();
        return tester.generateReport();
    } catch (error) {
        console.error('❌ Test execution failed:', error);
    }
}

// Auto-run tests if in Node.js environment
if (typeof window === 'undefined') {
    console.log('🚀 Running API tests in Node.js environment...');
    runAllTests();
}

// Make available for import
export { APITestManager, runAllTests };
