import React from 'react';
import { useClerkAuth } from '../context/ClerkAuthContext';
import { useFirebase } from '../context/FirebaseContext';
import { AuthScreen } from './AuthScreen';
import App from '../App';

export const AuthWrapper: React.FC = () => {
  const { isSignedIn, isLoaded } = useClerkAuth();
  const { isAuthenticated, loading: authLoading } = useFirebase();
  const [isSignUp, setIsSignUp] = React.useState(false);

  // Show loading state while checking auth status
  if (!isLoaded || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth screen if not authenticated
  if (!isSignedIn && !isAuthenticated) {
    return (
      <AuthScreen 
        isSignUp={isSignUp}
        onToggleMode={() => setIsSignUp(!isSignUp)}
      />
    );
  }

  // Show main app if authenticated
  return <App />;
};