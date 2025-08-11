import React, { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { API_PROVIDERS } from '../constants';
import type { ApiKeys, ApiProviderId } from '../types';
import { validateApiKey } from '../services/apiValidationService';

interface ApiKeySectionProps {
  onOpenFullManager: () => void;
}

export const ApiKeySection: React.FC<ApiKeySectionProps> = ({ onOpenFullManager }) => {
  const { apiKeys, setApiKeys } = useApiKey();
  const [localKeys, setLocalKeys] = useState<ApiKeys>(apiKeys);
  const [validating, setValidating] = useState<Record<ApiProviderId, boolean>>({
    gemini: false,
    openai: false,
    claude: false,
    groq: false,
    openrouter: false
  });
  const [validationResults, setValidationResults] = useState<Record<ApiProviderId, boolean | null>>({
    gemini: null,
    openai: null,
    claude: null,
    groq: null,
    openrouter: null
  });

  const handleKeyChange = (providerId: ApiProviderId, value: string) => {
    const newKeys = { ...localKeys, [providerId]: value };
    setLocalKeys(newKeys);
    setApiKeys(newKeys); // Auto-save as user types
    
    // Clear validation result when key changes
    setValidationResults(prev => ({
      ...prev,
      [providerId]: null
    }));
  };

  const validateKey = async (providerId: ApiProviderId, key: string) => {
    setValidating(prev => ({ ...prev, [providerId]: true }));
    try {
      const isValid = await validateApiKey(providerId, key);
      setValidationResults(prev => ({ ...prev, [providerId]: isValid }));
    } catch (error) {
      console.error(`Error validating ${providerId} key:`, error);
      setValidationResults(prev => ({ ...prev, [providerId]: false }));
    } finally {
      setValidating(prev => ({ ...prev, [providerId]: false }));
    }
  };

  // Get the primary provider (Gemini) for quick setup
  const primaryProvider = API_PROVIDERS.find(p => p.rank === 1 && p.isEnabled);
  const hasAnyKeys = Object.values(apiKeys).some(key => key && key.length > 0);
  const validKeysCount = Object.entries(validationResults).filter(([, isValid]) => isValid === true).length;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>🔑</span>
            API Key Setup
            {hasAnyKeys && (
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                {validKeysCount} configured
              </span>
            )}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Connect AI providers to unlock powerful SEO generation features
          </p>
        </div>
        <button
          onClick={onOpenFullManager}
          className="text-sm bg-white text-blue-600 hover:text-blue-800 px-4 py-2 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors font-medium"
        >
          Manage All →
        </button>
      </div>

      {!hasAnyKeys && (
        <div className="mb-4 p-4 bg-white rounded-lg border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
            <span>🚀</span>
            Quick Start
          </h4>
          <p className="text-blue-700 text-sm mb-3">
            Get started instantly with a free <strong>Google Gemini API key</strong> (recommended)
          </p>
          {primaryProvider && (
            <a
              href={primaryProvider.getApiKeyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <span>Get Free {primaryProvider.name} Key</span>
              <span>↗</span>
            </a>
          )}
        </div>
      )}

      {primaryProvider && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {primaryProvider.name} API Key {primaryProvider.rank === 1 && '(Recommended)'}
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={localKeys[primaryProvider.id] || ''}
              onChange={(e) => handleKeyChange(primaryProvider.id, e.target.value)}
              className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${primaryProvider.name} API key...`}
            />
            {localKeys[primaryProvider.id] && (
              <button
                onClick={() => validateKey(primaryProvider.id, localKeys[primaryProvider.id] || '')}
                disabled={validating[primaryProvider.id]}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  validating[primaryProvider.id]
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {validating[primaryProvider.id] ? 'Testing...' : 'Test'}
              </button>
            )}
          </div>

          {validationResults[primaryProvider.id] !== null && (
            <div className={`text-sm flex items-center ${
              validationResults[primaryProvider.id] ? 'text-green-600' : 'text-red-600'
            }`}>
              {validationResults[primaryProvider.id] ? (
                <>
                  <span className="mr-2">✅</span>
                  <span>API key is valid and ready to use!</span>
                </>
              ) : (
                <>
                  <span className="mr-2">❌</span>
                  <span>Invalid API key. Please check and try again.</span>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {hasAnyKeys && (
        <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
          <div className="flex items-center text-green-700 text-sm">
            <span className="mr-2">🔒</span>
            <span>API keys are stored securely in your browser and never sent to our servers</span>
          </div>
        </div>
      )}
    </div>
  );
};
