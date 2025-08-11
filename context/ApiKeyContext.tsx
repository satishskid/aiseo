import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { ApiKeys } from '../types';

interface ApiKeyContextType {
  apiKeys: ApiKeys;
  setApiKeys: (keys: ApiKeys) => void;
}

// Create context with a default value that won't cause issues
const ApiKeyContext = createContext<ApiKeyContextType | null>(null);

export const ApiKeyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKeys, setApiKeysInternal] = useState<ApiKeys>(() => {
    try {
      const storedKeys = localStorage.getItem('api-keys');
      console.log('🔑 Loading API keys from localStorage:', storedKeys ? 'Keys found' : 'No keys found');
      const parsedKeys = storedKeys ? JSON.parse(storedKeys) : {};
      console.log('🔑 Parsed API keys:', Object.keys(parsedKeys).length, 'keys loaded');
      return parsedKeys;
    } catch (error) {
      console.error("Could not access localStorage or parse keys", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      console.log('🔑 Saving API keys to localStorage:', Object.keys(apiKeys).length, 'keys');
      localStorage.setItem('api-keys', JSON.stringify(apiKeys));
    } catch (error) {
       console.error("Could not access localStorage to save keys", error);
    }
  }, [apiKeys]);

  const setApiKeys = (keys: ApiKeys) => {
    console.log('🔑 Setting new API keys:', Object.keys(keys).length, 'keys');
    setApiKeysInternal(keys);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKeys, setApiKeys }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  if (context === null) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};