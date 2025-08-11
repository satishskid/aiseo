import React from 'react';

interface SystemErrorAlertProps {
  isVisible: boolean;
  errorType: 'API_KEY_MISSING' | 'AI_SERVICE_FAILURE' | 'INVALID_STATE' | 'GENERIC';
  errorMessage?: string;
  onContactAdmin: () => void;
  onRetry?: () => void;
  onClose?: () => void;
}

export const SystemErrorAlert: React.FC<SystemErrorAlertProps> = ({
  isVisible,
  errorType,
  errorMessage,
  onContactAdmin,
  onRetry,
  onClose
}) => {
  if (!isVisible) return null;

  const getErrorConfig = () => {
    switch (errorType) {
      case 'API_KEY_MISSING':
        return {
          title: '🚨 AI Service Not Configured',
          description: 'This application requires a valid AI API key to function. Mock data fallbacks are disabled to ensure you receive genuine AI-powered insights.',
          icon: '🔑',
          primaryAction: 'Contact System Administrator',
          secondaryAction: 'Add API Key'
        };
      case 'AI_SERVICE_FAILURE':
        return {
          title: '🚨 AI Service Unavailable',
          description: 'The AI service is currently experiencing issues and cannot generate content. The system is designed to not fall back to mock data to prevent misleading results.',
          icon: '🤖',
          primaryAction: 'Contact System Administrator',
          secondaryAction: 'Retry Connection'
        };
      case 'INVALID_STATE':
        return {
          title: '🚨 System State Error',
          description: 'The application is in an invalid state and cannot proceed. This typically occurs when required data is missing or corrupted.',
          icon: '⚠️',
          primaryAction: 'Contact System Administrator',
          secondaryAction: 'Restart Process'
        };
      default:
        return {
          title: '🚨 System Error',
          description: 'An unexpected error has occurred. The system cannot function properly without real AI services.',
          icon: '❌',
          primaryAction: 'Contact System Administrator',
          secondaryAction: 'Retry'
        };
    }
  };

  const config = getErrorConfig();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{config.icon}</span>
            <div>
              <h3 className="text-xl font-bold">{config.title}</h3>
              <p className="text-red-100 text-sm mt-1">System Protection Active</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4 leading-relaxed">
            {config.description}
          </p>

          {errorMessage && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <p className="text-sm font-mono text-gray-600">
                <strong>Error:</strong> {errorMessage}
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">📞 Contact Information</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>System Administrator:</strong> admin@yourcompany.com</p>
              <p><strong>Support Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Help Desk:</strong> support.yourcompany.com</p>
              <p><strong>Error Code:</strong> {errorType}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onContactAdmin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {config.primaryAction}
            </button>

            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {config.secondaryAction}
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Dismiss Alert
              </button>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              This application prioritizes data accuracy by requiring real AI services.
              Mock data fallbacks have been disabled to prevent misleading results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
