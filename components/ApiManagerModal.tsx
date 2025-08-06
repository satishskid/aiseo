
import React, { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { API_PROVIDERS, baseButtonClasses, primaryButtonClasses } from '../constants';
import type { ApiKeys, ApiProviderId } from '../types';

interface ApiManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiManagerModal: React.FC<ApiManagerModalProps> = ({ isOpen, onClose }) => {
  const { apiKeys, setApiKeys } = useApiKey();
  const [localKeys, setLocalKeys] = useState<ApiKeys>(apiKeys);

  const handleSave = () => {
    setApiKeys(localKeys);
    onClose();
  };
  
  const handleKeyChange = (providerId: ApiProviderId, value: string) => {
    setLocalKeys(prev => ({
        ...prev,
        [providerId]: value,
    }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">API Key Manager</h2>
        <p className="text-gray-600 mb-6">
            Manage API keys for different AI providers. Your keys are saved locally and are never sent to our servers.
        </p>
        
        <div className="space-y-6">
            {API_PROVIDERS.map(provider => (
                <div key={provider.id} className={`p-5 rounded-lg border-2 ${provider.rank === 1 ? 'border-brand-primary-start' : 'border-gray-200'} ${!provider.isEnabled ? 'opacity-50' : ''}`}>
                    <div className="flex justify-between items-start">
                        <div>
                             <h3 className="text-lg font-bold text-gray-800">{provider.name}</h3>
                             <span className={`text-xs font-bold py-0.5 px-2 rounded-full ${provider.rank === 1 ? 'bg-brand-primary-start/20 text-brand-primary-start' : 'bg-gray-200 text-gray-600'}`}>
                                {provider.rank}{provider.rank === 1 ? 'st' : 'th'} Choice
                             </span>
                        </div>
                        <a href={provider.getApiKeyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary-start hover:underline font-semibold">
                            Get API Key
                        </a>
                    </div>

                    <div className="mt-4">
                        <label htmlFor={`${provider.id}-key`} className="block text-sm font-bold text-gray-700 mb-2">
                           Your {provider.name} API Key
                        </label>
                        <input
                            id={`${provider.id}-key`}
                            type="password"
                            value={localKeys[provider.id] || ''}
                            onChange={(e) => handleKeyChange(provider.id, e.target.value)}
                            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary-start focus:border-transparent disabled:bg-gray-100"
                            placeholder={provider.isEnabled ? `Enter your ${provider.name} key` : "Coming Soon"}
                            disabled={!provider.isEnabled}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        <strong>Free Tier:</strong> {provider.freeTierInfo}
                    </p>
                </div>
            ))}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className={`${baseButtonClasses} bg-gray-200 text-gray-700 hover:bg-gray-300 !py-3 !px-6`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`${baseButtonClasses} ${primaryButtonClasses} !py-3 !px-6`}
          >
            Save Keys
          </button>
        </div>
      </div>
    </div>
  );
};
