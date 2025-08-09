import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

interface AuthScreenProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ isSignUp, onToggleMode }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Sign up to create and manage your SEO strategies' 
              : 'Sign in to access your saved projects and strategies'}
          </p>
        </div>
        
        {/* Clerk Authentication Components */}
        <div className="mb-6">
          {isSignUp ? (
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors',
                  formFieldInput: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                  formFieldLabel: 'block text-sm font-medium text-gray-700 mb-1',
                }
              }}
              redirectUrl="/"
            />
          ) : (
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors',
                  formFieldInput: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                  formFieldLabel: 'block text-sm font-medium text-gray-700 mb-1',
                }
              }}
              redirectUrl="/"
            />
          )}
        </div>
        
        <div className="text-center">
          <button
            onClick={onToggleMode}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};