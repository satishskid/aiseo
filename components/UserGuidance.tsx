import React, { useState, useEffect } from 'react';

interface DownloadReminderProps {
  step: string;
  onDownload: () => void;
  isVisible: boolean;
  onDismiss: () => void;
}

export const DownloadReminder: React.FC<DownloadReminderProps> = ({ 
  step, 
  onDownload, 
  isVisible, 
  onDismiss 
}) => {
  if (!isVisible) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-yellow-600 text-xl">⚠️</span>
          <div>
            <span className="font-semibold text-yellow-800">
              Don't forget to download your {step} data!
            </span>
            <p className="text-yellow-700 text-sm mt-1">
              This app uses browser storage only. Download to avoid data loss.
            </p>
          </div>
        </div>
        <button 
          onClick={onDismiss}
          className="text-yellow-600 hover:text-yellow-800 text-lg font-bold"
        >
          ×
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <button 
          onClick={onDownload} 
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          📥 Download Now
        </button>
        <button 
          onClick={onDismiss}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
};

interface StorageMonitorProps {
  className?: string;
}

export const StorageMonitor: React.FC<StorageMonitorProps> = ({ className = '' }) => {
  const [storageUsed, setStorageUsed] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkStorage = () => {
      try {
        const used = JSON.stringify(localStorage).length;
        const limit = 5 * 1024 * 1024; // 5MB typical limit
        const percentage = (used / limit) * 100;
        setStorageUsed(percentage);
        setShowWarning(percentage > 80);
      } catch (error) {
        console.warn('Could not check storage usage:', error);
      }
    };
    
    checkStorage();
    const interval = setInterval(checkStorage, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (storageUsed < 50) return null; // Only show when storage is getting full

  const getStorageColor = () => {
    if (storageUsed > 90) return 'text-red-600 bg-red-50 border-red-200';
    if (storageUsed > 80) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  const getStorageIcon = () => {
    if (storageUsed > 90) return '🚨';
    if (storageUsed > 80) return '⚠️';
    return '💾';
  };

  return (
    <div className={`${getStorageColor()} border rounded-lg p-3 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{getStorageIcon()}</span>
        <div className="flex-1">
          <div className="text-sm font-medium">
            Browser Storage: {storageUsed.toFixed(1)}% used
          </div>
          {showWarning && (
            <div className="text-xs mt-1">
              Consider downloading your data to free up space
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            storageUsed > 90 ? 'bg-red-500' : 
            storageUsed > 80 ? 'bg-orange-500' : 'bg-blue-500'
          }`}
          style={{ width: `${Math.min(storageUsed, 100)}%` }}
        />
      </div>
    </div>
  );
};

interface ExportSuccessNotificationProps {
  type: string;
  isVisible: boolean;
  onClose: () => void;
}

export const ExportSuccessNotification: React.FC<ExportSuccessNotificationProps> = ({ 
  type, 
  isVisible, 
  onClose 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex items-center gap-2">
        <span className="text-lg">✅</span>
        <div>
          <div className="font-semibold">{type} exported successfully!</div>
          <div className="text-green-100 text-sm">Data saved to your downloads</div>
        </div>
        <button 
          onClick={onClose}
          className="ml-2 text-green-100 hover:text-white text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

interface DataPersistenceWarningProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const DataPersistenceWarning: React.FC<DataPersistenceWarningProps> = ({ 
  isVisible, 
  onDismiss 
}) => {
  if (!isVisible) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <span className="text-blue-600 text-xl">💡</span>
        <div className="flex-1">
          <h3 className="font-semibold text-blue-800 mb-2">
            Important: Data Storage Information
          </h3>
          <div className="text-blue-700 text-sm space-y-2">
            <p>• This app stores data in your browser only - no cloud backup</p>
            <p>• Download your work regularly to prevent data loss</p>
            <p>• Clearing browser data will remove all your projects</p>
            <p>• Use the download buttons after each major step</p>
          </div>
          <div className="mt-3 flex gap-2">
            <button 
              onClick={onDismiss}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
        <button 
          onClick={onDismiss}
          className="text-blue-600 hover:text-blue-800 text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Hook for managing user guidance state
export const useUserGuidance = () => {
  const [showDataWarning, setShowDataWarning] = useState(false);
  const [dismissedReminders, setDismissedReminders] = useState<Set<string>>(new Set());
  const [exportNotification, setExportNotification] = useState<{type: string; visible: boolean}>({
    type: '',
    visible: false
  });

  useEffect(() => {
    // Show data warning for first-time users
    const hasSeenWarning = localStorage.getItem('seo-app-data-warning-seen');
    if (!hasSeenWarning) {
      setShowDataWarning(true);
    }
  }, []);

  const dismissDataWarning = () => {
    setShowDataWarning(false);
    localStorage.setItem('seo-app-data-warning-seen', 'true');
  };

  const dismissReminder = (step: string) => {
    setDismissedReminders(prev => new Set([...prev, step]));
  };

  const showExportSuccess = (type: string) => {
    setExportNotification({ type, visible: true });
  };

  const hideExportNotification = () => {
    setExportNotification(prev => ({ ...prev, visible: false }));
  };

  const shouldShowReminder = (step: string) => {
    return !dismissedReminders.has(step);
  };

  return {
    showDataWarning,
    dismissDataWarning,
    dismissReminder,
    showExportSuccess,
    exportNotification,
    hideExportNotification,
    shouldShowReminder
  };
};