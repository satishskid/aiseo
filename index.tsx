import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthWrapper } from './components/AuthWrapper';
import { ApiKeyProvider } from './context/ApiKeyContext';
import { FirebaseProvider } from './context/FirebaseContext';
import { ClerkProvider } from '@clerk/clerk-react';
import { ClerkAuthContextProvider } from './context/ClerkAuthContext';
import './src/index.css';

// Vite provides type definitions for import.meta.env
// We don't need to define ImportMeta interfaces manually
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("Missing Publishable Key. Please check your .env.local file.");
  console.error("Expected variable: VITE_CLERK_PUBLISHABLE_KEY");
  console.error("Current value:", PUBLISHABLE_KEY);
  throw new Error("Missing Publishable Key. Please check the console for more details.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ClerkAuthContextProvider>
        <FirebaseProvider>
          <ApiKeyProvider>
            <AuthWrapper />
          </ApiKeyProvider>
        </FirebaseProvider>
      </ClerkAuthContextProvider>
    </ClerkProvider>
  </React.StrictMode>
);