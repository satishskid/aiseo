import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChange, isUserEmailVerified } from '../services/firebase/authService';
import type { User } from 'firebase/auth';

interface FirebaseContextType {
  user: User | null;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  loading: boolean;
  setUserData: (user: User | null) => void;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setIsEmailVerified(user ? isUserEmailVerified(user) : false);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setUserData = (userData: User | null) => {
    setUser(userData);
    setIsEmailVerified(userData ? isUserEmailVerified(userData) : false);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isEmailVerified,
    loading,
    setUserData
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};