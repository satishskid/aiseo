import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DemoUser } from '../demoUsers';

interface DemoAuthContextType {
  isAuthenticated: boolean;
  currentUser: DemoUser | null;
  login: (user: DemoUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export const useDemoAuth = () => {
  const context = useContext(DemoAuthContext);
  if (context === undefined) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
};

interface DemoAuthProviderProps {
  children: React.ReactNode;
}

export const DemoAuthProvider: React.FC<DemoAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('demoAuthUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('demoAuthUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (user: DemoUser) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('demoAuthUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('demoAuthUser');
  };

  const value = {
    isAuthenticated,
    currentUser,
    login,
    logout,
    isLoading
  };

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
};
