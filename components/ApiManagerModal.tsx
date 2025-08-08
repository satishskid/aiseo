import React, { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { API_PROVIDERS, baseButtonClasses, primaryButtonClasses } from '../constants';
import type { ApiKeys, ApiProviderId } from '../types';
import { validateApiKey } from '../services/apiValidationService';

interface ApiManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiManagerModal: React.FC<ApiManagerModalProps> = ({ isOpen, onClose }) => {
  const { apiKeys, setApiKeys } = useApiKey();
  const [localKeys, setLocalKeys] = useState<ApiKeys>(apiKeys);
  const [validating, setValidating] = useState<Record<ApiProviderId, boolean>>({});
  const [validationResults, setValidationResults] = useState<Record<ApiProviderId, boolean | null>>({});

  const handleSave = () => {
    setApiKeys(localKeys);
    onClose();
  };

  const handleKeyChange = (providerId: ApiProviderId, value: string) => {
    setLocalKeys(prev => ({
        ...prev,
        [providerId]: value,
    }));

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🔑 API Key Manager</h2>
              <p className="text-gray-600">
                Add API keys to unlock AI-powered SEO generation. Keys are stored locally in your browser.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-2">🚀 Quick Start</h3>
            <p className="text-blue-700 text-sm">
              For immediate use, get a free <strong>Google Gemini API key</strong> (recommended). 
              More providers coming soon!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {API_PROVIDERS.map(provider => (
              <div key={provider.id} className={`p-4 rounded-lg border-2 transition-all ${
                provider.rank === 1 ? 'border-brand-primary-start bg-blue-50' : 
                provider.isEnabled ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'
              } ${!provider.isEnabled ? 'opacity-60' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{provider.name}</h3>
                    <span className={`text-xs font-bold py-1 px-2 rounded-full ${
                      provider.rank === 1 ? 'bg-blue-100 text-blue-800' : 
                      provider.isEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {provider.isEnabled ? `#${provider.rank} Choice` : 'Coming Soon'}
                    </span>
                  </div>
                  {provider.isEnabled && (
                    <a
                      href={provider.getApiKeyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-brand-primary-start text-white px-3 py-1 rounded-full hover:bg-brand-primary-end transition-colors"
                    >
                      Get Key
                    </a>
                  )}
                </div>

                <div className="mb-3">
                  <div className="flex gap-2">
                    <input
                      id={`${provider.id}-key`}
                      type="password"
                      value={localKeys[provider.id] || ''}
                      onChange={(e) => handleKeyChange(provider.id, e.target.value)}
                      className="flex-1 py-2 px-3 border-2 border-gray-300 rounded-lg text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary-start focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder={provider.isEnabled ? `Enter ${provider.name} API key...` : "Coming soon"}
                      disabled={!provider.isEnabled}
                    />
                    {provider.isEnabled && localKeys[provider.id] && (
                      <button
                        onClick={() => validateKey(provider.id, localKeys[provider.id] || '')}
                        disabled={validating[provider.id]}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          validating[provider.id]
                            ? 'bg-gray-300 text-gray-600'
                            : 'bg-brand-primary-start text-white hover:bg-brand-primary-end'
                        }`}
                      >
                        {validating[provider.id] ? 'Checking...' : 'Test'}
                      </button>
                    )}
                  </div>

                  {validationResults[provider.id] !== null && (
                    <div className={`mt-2 text-sm flex items-center ${
                      validationResults[provider.id] ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {validationResults[provider.id] ? (
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

                <p className="text-xs text-gray-600">
                  <strong>Free Tier:</strong> {provider.freeTierInfo}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">🔒 Privacy & Security</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• API keys are stored locally in your browser only</li>
              <li>• Keys are never sent to our servers</li>
              <li>• You can clear them anytime from browser settings</li>
              <li>• Use HTTPS in production for maximum security</li>
            </ul>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-200 p-6">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-brand-primary-start text-white rounded-lg hover:bg-brand-primary-end transition-colors"
            >
              Save API Keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};