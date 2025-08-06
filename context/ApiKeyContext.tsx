
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { ApiKeys } from '../types';

interface ApiKeyContextType {
  apiKeys: ApiKeys;
  setApiKeys: (keys: ApiKeys) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKeys, setApiKeysInternal] = useState<ApiKeys>(() => {
    try {
      const storedKeys = localStorage.getItem('api-keys');
      return storedKeys ? JSON.parse(storedKeys) : {};
    } catch (error) {
      console.error("Could not access localStorage or parse keys", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('api-keys', JSON.stringify(apiKeys));
    } catch (error) {
       console.error("Could not access localStorage to save keys", error);
    }
  }, [apiKeys]);

  const setApiKeys = (keys: ApiKeys) => {
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
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
