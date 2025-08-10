import React from 'react';
import { useDemoAuth } from '../context/DemoAuthContext';
import { DemoAuthScreen } from './DemoAuthScreen';
import App from '../App';

export const AuthWrapper: React.FC = () => {
  const { isAuthenticated, isLoading, login } = useDemoAuth();

  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-gray-200 border-t-brand-primary-start rounded-full animate-spin"></div>
          <p className="text-gray-800 font-semibold">Loading AI SEO Platform...</p>
        </div>
      </div>
    );
  }

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return <DemoAuthScreen onLogin={login} />;
  }

  // Show main app if authenticated
  return <App />;
};