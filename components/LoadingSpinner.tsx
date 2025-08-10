import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  variant?: 'primary' | 'secondary' | 'white';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message,
  variant = 'primary' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const variantClasses = {
    primary: 'border-brand-primary-start',
    secondary: 'border-brand-secondary-start',
    white: 'border-white'
  };

  const messageSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} border-4 ${variantClasses[variant]} border-t-transparent rounded-full animate-spin`}></div>
      {message && (
        <p className={`${messageSize[size]} text-gray-800 font-semibold animate-pulse`}>
          {message}
        </p>
      )}
    </div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  variant?: 'light' | 'dark';
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  message = "Loading...",
  variant = 'light' 
}) => {
  if (!isVisible) return null;

  const backgroundClass = variant === 'dark' 
    ? 'bg-black/60' 
    : 'bg-white/80';

  const spinnerVariant = variant === 'dark' ? 'white' : 'primary';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${backgroundClass} backdrop-blur-sm`}>
      <div className="glass-effect rounded-2xl p-8 shadow-depth border border-white/50">
        <LoadingSpinner size="lg" message={message} variant={spinnerVariant} />
      </div>
    </div>
  );
};
