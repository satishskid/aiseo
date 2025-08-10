import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    id: number;
    title: string;
    description?: string;
    icon?: string;
  }>;
  onStepClick?: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps,
  onStepClick
}) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0">
          <div 
            className="h-full bg-gradient-to-r from-brand-primary-start to-brand-primary-end transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step Items */}
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isClickable = onStepClick && step.id <= currentStep;

          return (
            <div
              key={step.id}
              className={`relative z-10 flex flex-col items-center group ${
                isClickable ? 'cursor-pointer' : ''
              }`}
              onClick={() => isClickable && onStepClick(step.id)}
            >
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-brand-primary-start to-brand-primary-end text-white border-brand-primary-start shadow-depth'
                    : isCurrent
                    ? 'bg-white text-brand-primary-start border-brand-primary-start shadow-depth ring-4 ring-brand-primary-start/20'
                    : 'bg-white text-gray-400 border-gray-200 shadow-elegant'
                } ${isClickable ? 'hover:scale-110 hover:shadow-xl' : ''}`}
              >
                {isCompleted ? (
                  <span className="text-lg">✓</span>
                ) : step.icon ? (
                  <span className="text-lg">{step.icon}</span>
                ) : (
                  step.id
                )}
              </div>

              {/* Step Label */}
              <div className="mt-3 text-center max-w-[120px]">
                <div
                  className={`text-sm font-medium transition-colors ${
                    isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-gray-500 mt-1 leading-tight">
                    {step.description}
                  </div>
                )}
              </div>

              {/* Current Step Indicator */}
              {isCurrent && (
                <div className="absolute -bottom-2 w-2 h-2 bg-brand-primary-start rounded-full animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Percentage */}
      <div className="mt-6 text-center">
        <div className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps} completed
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}% progress
        </div>
      </div>
    </div>
  );
};

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  animated?: boolean;
  striped?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'primary',
  size = 'md',
  showPercentage = true,
  animated = true,
  striped = false
}) => {
  const variants = {
    primary: 'from-brand-primary-start to-brand-primary-end',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    error: 'from-red-500 to-red-600'
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      <div className={`bg-gray-200 rounded-full overflow-hidden ${sizes[size]} shadow-inner`}>
        <div
          className={`h-full bg-gradient-to-r ${variants[variant]} transition-all duration-500 ease-out ${
            animated ? 'transition-transform' : ''
          } ${striped ? 'bg-stripes' : ''}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-center mt-2 text-sm text-gray-600 font-medium">
          {Math.round(clampedProgress)}%
        </div>
      )}
    </div>
  );
};
