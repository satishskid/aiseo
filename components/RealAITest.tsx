/**
 * REAL AI INTEGRATION TEST COMPONENT
 * 
 * This component demonstrates that the platform CAN use real AI APIs
 * when properly configured, proving the AI service works.
 */

import React, { useState } from 'react';
import { GeminiService } from '../services/aiService';
import { useApiKey } from '../context/ApiKeyContext';
import type { InitialBrandInput, BrandData, SeoAudit } from '../types';

export const RealAITest: React.FC = () => {
  const { apiKeys } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testRealAI = async () => {
    const geminiKey = apiKeys.gemini;
    
    if (!geminiKey || geminiKey.includes('placeholder')) {
      setError('❌ No valid Gemini API key found. Please add a real API key in the API Keys section.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Test data
      const testInput: InitialBrandInput = {
        name: 'AI Health Clinic',
        website: 'https://aihealth.com',
        businessType: 'Healthcare',
        serviceType: 'Clinic',
        locationScope: 'Local',
        selectedCities: ['Mumbai'],
        specificLocations: 'Mumbai',
        linkedinHandle: 'aihealth',
        twitterHandle: 'aihealth',
        facebookHandle: 'aihealth'
      };

      // Initialize real AI service
      const aiService = new GeminiService(geminiKey);
      
      console.log('🤖 Making REAL AI API call...');
      
      // Make actual API call
      const businessFoundation = await aiService.generateBusinessFoundation(testInput);
      
      console.log('✅ Real AI response received:', businessFoundation);
      
      setResult({
        type: 'Business Foundation',
        input: testInput,
        output: businessFoundation,
        timestamp: new Date().toISOString(),
        isRealAI: true
      });

    } catch (apiError: any) {
      console.error('❌ Real AI API call failed:', apiError);
      setError(`Real AI API Error: ${apiError.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testSEOAudit = async () => {
    const geminiKey = apiKeys.gemini;
    
    if (!geminiKey || geminiKey.includes('placeholder')) {
      setError('❌ No valid Gemini API key found.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const testInput: InitialBrandInput = {
        name: 'TechStartup AI',
        website: 'https://techstartup.ai',
        businessType: 'AI/Tech',
        serviceType: 'Software',
        locationScope: 'National',
        selectedCities: ['Bangalore', 'Mumbai'],
        specificLocations: 'Bangalore, Mumbai',
        linkedinHandle: 'techstartupai',
        twitterHandle: 'techstartupai',
        facebookHandle: 'techstartupai'
      };

      const aiService = new GeminiService(geminiKey);
      
      console.log('🔍 Making REAL SEO Audit API call...');
      
      const seoAudit = await aiService.generateBaselineSeoAudit(testInput);
      
      console.log('✅ Real SEO Audit received:', seoAudit);
      
      setResult({
        type: 'SEO Audit',
        input: testInput,
        output: seoAudit,
        timestamp: new Date().toISOString(),
        isRealAI: true
      });

    } catch (apiError: any) {
      console.error('❌ SEO Audit API call failed:', apiError);
      setError(`SEO Audit API Error: ${apiError.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🧪</span>
        <h3 className="text-xl font-bold text-green-800">Real AI Integration Test</h3>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
          LIVE API TESTING
        </span>
      </div>
      
      <p className="text-green-700 mb-4">
        Test the platform's real AI capabilities. This proves the AI service works when properly configured.
      </p>

      <div className="flex gap-3 mb-4">
        <button
          onClick={testRealAI}
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '🔄 Testing...' : '🤖 Test Business Foundation'}
        </button>
        
        <button
          onClick={testSEOAudit}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '🔄 Testing...' : '🔍 Test SEO Audit'}
        </button>
      </div>

      {/* API Key Status */}
      <div className="mb-4 p-3 bg-white rounded-lg border border-green-200">
        <div className="text-sm">
          <strong>Gemini API Key Status:</strong>{' '}
          {apiKeys.gemini && !apiKeys.gemini.includes('placeholder') ? (
            <span className="text-green-600 font-bold">✅ Valid Key Detected</span>
          ) : (
            <span className="text-red-600 font-bold">❌ No Valid Key (using placeholder)</span>
          )}
        </div>
        {apiKeys.gemini && (
          <div className="text-xs text-gray-600 mt-1">
            Key: {apiKeys.gemini.substring(0, 10)}...{apiKeys.gemini.slice(-4)}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="text-red-800 font-medium">⚠️ Test Failed</div>
          <div className="text-red-700 text-sm mt-1">{error}</div>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="bg-white border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-600 font-bold">✅ Real AI Response Received!</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              {result.type}
            </span>
          </div>
          
          <div className="space-y-3">
            <div>
              <strong>Input Business:</strong> {result.input.name} ({result.input.businessType})
            </div>
            
            <div>
              <strong>AI Generated Output:</strong>
              <pre className="bg-gray-50 p-3 rounded text-xs mt-1 overflow-auto max-h-40">
                {JSON.stringify(result.output, null, 2)}
              </pre>
            </div>
            
            <div className="text-xs text-gray-500">
              Generated at: {new Date(result.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-blue-800 font-medium text-sm mb-2">📝 How to Test:</div>
        <ol className="text-blue-700 text-xs space-y-1">
          <li>1. Click "🔑 API Keys" in the header</li>
          <li>2. Add your real Google Gemini API key</li>
          <li>3. Click one of the test buttons above</li>
          <li>4. Watch the Network tab for real API calls</li>
          <li>5. See unique, AI-generated responses (not mock data)</li>
        </ol>
      </div>
    </div>
  );
};

export default RealAITest;
