import React, { createContext, useContext } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

interface ClerkAuthContextType {
  userId: string | null | undefined;
  user: any;
  isSignedIn: boolean | undefined;
  isLoaded: boolean | undefined;
  signOut: () => Promise<void>;
}

const ClerkAuthContext = createContext<ClerkAuthContextType | undefined>(undefined);

export const useClerkAuth = () => {
  const context = useContext(ClerkAuthContext);
  if (!context) {
    throw new Error('useClerkAuth must be used within a ClerkAuthContextProvider');
  }
  return context;
};

export const ClerkAuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, userId, isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  return (
    <ClerkAuthContext.Provider
      value={{
        userId,
        user,
        isSignedIn,
        isLoaded,
        signOut: signOut as () => Promise<void>
      }}
    >
      {children}
    </ClerkAuthContext.Provider>
  );
};