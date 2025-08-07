import React, { useState, useEffect } from 'react';

interface UserGuidanceProps {
  currentStep: string;
  completedSteps: string[];
  onClose: () => void;
  isVisible: boolean;
}

interface GuidanceStep {
  id: string;
  title: string;
  description: string;
  tips: string[];
  nextAction?: string;
}

const GUIDANCE_STEPS: GuidanceStep[] = [
  {
    id: 'start',
    title: '🚀 Welcome to AI SEO Platform!',
    description: 'Let\'s create a comprehensive SEO strategy for your business in just a few steps.',
    tips: [
      'Have your business information ready',
      'Think about your target audience',
      'Consider your main products/services',
      'Set aside 15-20 minutes for the complete process'
    ],
    nextAction: 'Fill out your business information below'
  },
  {
    id: 'business',
    title: '🏢 Business Information',
    description: 'Provide accurate business details for personalized SEO recommendations.',
    tips: [
      'Use your official business name',
      'Be specific about your industry',
      'Include your target location',
      'Mention your main products/services clearly'
    ],
    nextAction: 'Click "Generate SEO Audit" when ready'
  },
  {
    id: 'audit',
    title: '🔍 SEO Audit Complete',
    description: 'Great! We\'ve analyzed your business and identified key opportunities.',
    tips: [
      'Review the audit findings carefully',
      'Note the priority recommendations',
      'Check the competitive analysis',
      'Look for quick wins you can implement'
    ],
    nextAction: 'Generate keyword research for targeted traffic'
  },
  {
    id: 'keywords',
    title: '🎯 Keyword Strategy',
    description: 'Your keyword research reveals the best opportunities for ranking.',
    tips: [
      'Focus on long-tail keywords first',
      'Consider local search terms',
      'Balance search volume with competition',
      'Look for buyer-intent keywords'
    ],
    nextAction: 'Generate content strategy based on these keywords'
  },
  {
    id: 'content',
    title: '📝 Content & Social Media',
    description: 'Content is king! Your strategy includes blog posts and social media.',
    tips: [
      'Review each content piece suggestion',
      'Adapt the tone to your brand voice',
      'Plan your content calendar',
      'Consider seasonal trends'
    ],
    nextAction: 'Create your publishing calendar'
  },
  {
    id: 'publishing',
    title: '📅 Publishing Calendar',
    description: 'Your content calendar ensures consistent, strategic publishing.',
    tips: [
      'Click on calendar events for details',
      'Download the calendar to your Google Calendar',
      'Set reminders for content creation',
      'Track your publishing consistency'
    ],
    nextAction: 'Optimize technical SEO elements'
  },
  {
    id: 'technical',
    title: '⚙️ Technical SEO',
    description: 'Technical optimization ensures search engines can find and index your content.',
    tips: [
      'Implement schema markup for rich snippets',
      'Optimize page loading speed',
      'Ensure mobile responsiveness',
      'Fix any crawling issues'
    ],
    nextAction: 'Optimize for conversions'
  },
  {
    id: 'conversion',
    title: '💰 Conversion Optimization',
    description: 'Turn your traffic into customers with conversion-focused strategies.',
    tips: [
      'Focus on user experience improvements',
      'Optimize your call-to-action buttons',
      'Reduce friction in your sales funnel',
      'Test different approaches'
    ],
    nextAction: 'Track and analyze performance'
  },
  {
    id: 'performance',
    title: '📊 Performance Tracking',
    description: 'Monitor your SEO success and get AI-powered recommendations.',
    tips: [
      'Set up Google Analytics and Search Console',
      'Track your target keywords regularly',
      'Monitor your conversion rates',
      'Review and adjust your strategy monthly'
    ],
    nextAction: 'Download your complete SEO package'
  }
];

export const UserGuidance: React.FC<UserGuidanceProps> = ({ 
  currentStep, 
  completedSteps, 
  onClose, 
  isVisible 
}) => {
  const [currentGuidance, setCurrentGuidance] = useState<GuidanceStep | null>(null);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    const guidance = GUIDANCE_STEPS.find(step => step.id === currentStep);
    setCurrentGuidance(guidance || GUIDANCE_STEPS[0]);
  }, [currentStep]);

  if (!isVisible || !currentGuidance) return null;

  const progress = (completedSteps.length / GUIDANCE_STEPS.length) * 100;

  return (
    <div className="fixed top-4 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-slideInRight">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{currentGuidance.title}</h3>
            <div className="text-blue-100 text-sm mt-1">
              Step {GUIDANCE_STEPS.findIndex(s => s.id === currentStep) + 1} of {GUIDANCE_STEPS.length}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl font-bold"
          >
            ×
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="bg-blue-400 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-700 mb-4">
          {currentGuidance.description}
        </p>

        {/* Tips Toggle */}
        <button
          onClick={() => setShowTips(!showTips)}
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-3"
        >
          {showTips ? '▼' : '▶'} Pro Tips
        </button>

        {/* Tips */}
        {showTips && (
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <ul className="space-y-2">
              {currentGuidance.tips.map((tip, index) => (
                <li key={index} className="flex items-start text-sm text-gray-700">
                  <span className="text-blue-500 mr-2">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Next Action */}
        {currentGuidance.nextAction && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">👉</span>
              <span className="text-green-800 font-medium text-sm">
                Next: {currentGuidance.nextAction}
              </span>
            </div>
          </div>
        )}

        {/* Completed Steps Indicator */}
        {completedSteps.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              ✅ Completed: {completedSteps.length} steps
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 rounded-b-2xl">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Need help? Check the user manual
          </div>
          <button
            onClick={onClose}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Hide Guide
          </button>
        </div>
      </div>
    </div>
  );
};

// Notification component for downloads/copies
interface NotificationProps {
  message: string;
  type: 'success' | 'info' | 'warning';
  isVisible: boolean;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ 
  message, 
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

  const bgColor = {
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }[type];

  const icon = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️'
  }[type];

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideInDown">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}>
        <span className="mr-2">{icon}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};