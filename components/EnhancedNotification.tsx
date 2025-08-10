import React, { useEffect, useState } from 'react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  message: string;
  type: NotificationType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
}

const typeConfig = {
  success: {
    icon: '✅',
    bgColor: 'from-green-500 to-green-600',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    bgLight: 'bg-green-50'
  },
  error: {
    icon: '❌',
    bgColor: 'from-red-500 to-red-600',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    bgLight: 'bg-red-50'
  },
  warning: {
    icon: '⚠️',
    bgColor: 'from-yellow-500 to-yellow-600',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    bgLight: 'bg-yellow-50'
  },
  info: {
    icon: 'ℹ️',
    bgColor: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    bgLight: 'bg-blue-50'
  }
};

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2'
};

export const EnhancedNotification: React.FC<NotificationProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 5000,
  position = 'top-right'
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const config = typeConfig[type];

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 transition-all duration-300 ${
        isShowing ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <div className={`glass-effect ${config.bgLight} border ${config.borderColor} rounded-xl shadow-depth p-4 max-w-md`}>
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0 mt-0.5">{config.icon}</span>
          <div className="flex-1">
            <p className={`${config.textColor} font-medium leading-relaxed`}>
              {message}
            </p>
          </div>
          <button
            onClick={() => {
              setIsShowing(false);
              setTimeout(onClose, 300);
            }}
            className={`${config.textColor} hover:opacity-70 transition-opacity flex-shrink-0 text-lg font-bold`}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast notification system
interface ToastProps {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, type: NotificationType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (message: string, type: NotificationType, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, message, type, duration };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <EnhancedNotification
            key={toast.id}
            message={toast.message}
            type={toast.type}
            isVisible={true}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        ))}
      </div>
    </>
  );
};
