import React from 'react';

export type DataSourceType = 'real-ai' | 'mock' | 'loading' | 'error';

interface DataSourceIndicatorProps {
  source: DataSourceType;
  label?: string;
  className?: string;
  showDetails?: boolean;
}

export const DataSourceIndicator: React.FC<DataSourceIndicatorProps> = ({ 
  source, 
  label, 
  className = '',
  showDetails = false 
}) => {
  const getIndicatorConfig = (source: DataSourceType) => {
    switch (source) {
      case 'real-ai':
        return {
          icon: '🤖',
          text: 'Real AI Generated',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
          description: 'This content was generated using real AI APIs'
        };
      case 'mock':
        return {
          icon: '🔶',
          text: 'Simulated Data',
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-800',
          borderColor: 'border-orange-200',
          description: 'This is demo data for testing and presentation purposes'
        };
      case 'loading':
        return {
          icon: '🔄',
          text: 'AI Processing...',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200',
          description: 'AI is currently generating this content'
        };
      case 'error':
        return {
          icon: '⚠️',
          text: 'Fallback Data',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
          description: 'AI generation failed, using fallback demo data'
        };
      default:
        return {
          icon: '❓',
          text: 'Unknown Source',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
          description: 'Data source could not be determined'
        };
    }
  };

  const config = getIndicatorConfig(source);

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}>
      <span className="text-sm">{config.icon}</span>
      <span>{label || config.text}</span>
      {showDetails && (
        <div className="relative group">
          <span className="text-xs opacity-70 cursor-help">ℹ️</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            {config.description}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
          </div>
        </div>
      )}
    </div>
  );
};

interface SectionHeaderWithIndicatorProps {
  title: string;
  icon?: string;
  source: DataSourceType;
  children?: React.ReactNode;
  className?: string;
}

export const SectionHeaderWithIndicator: React.FC<SectionHeaderWithIndicatorProps> = ({
  title,
  icon,
  source,
  children,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        {children}
        <DataSourceIndicator source={source} showDetails />
      </div>
    </div>
  );
};

interface DataQualityBadgeProps {
  isRealAI: boolean;
  responseTime?: number;
  lastUpdated?: string;
  className?: string;
}

export const DataQualityBadge: React.FC<DataQualityBadgeProps> = ({
  isRealAI,
  responseTime,
  lastUpdated,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <DataSourceIndicator 
        source={isRealAI ? 'real-ai' : 'mock'} 
        showDetails 
      />
      {responseTime && isRealAI && (
        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {responseTime}ms
        </span>
      )}
      {lastUpdated && (
        <span className="text-xs text-gray-500">
          {new Date(lastUpdated).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};

interface ContentCardWithSourceProps {
  title: string;
  children: React.ReactNode;
  source: DataSourceType;
  responseTime?: number;
  lastUpdated?: string;
  className?: string;
}

export const ContentCardWithSource: React.FC<ContentCardWithSourceProps> = ({
  title,
  children,
  source,
  responseTime,
  lastUpdated,
  className = ''
}) => {
  const getCardBorder = (source: DataSourceType) => {
    switch (source) {
      case 'real-ai': return 'border-l-4 border-l-green-500';
      case 'mock': return 'border-l-4 border-l-orange-500';
      case 'loading': return 'border-l-4 border-l-blue-500';
      case 'error': return 'border-l-4 border-l-red-500';
      default: return 'border-l-4 border-l-gray-500';
    }
  };

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm ${getCardBorder(source)} ${className}`}>
      <SectionHeaderWithIndicator title={title} source={source}>
        {responseTime && source === 'real-ai' && (
          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {responseTime}ms
          </span>
        )}
        {lastUpdated && (
          <span className="text-xs text-gray-500">
            {new Date(lastUpdated).toLocaleTimeString()}
          </span>
        )}
      </SectionHeaderWithIndicator>
      {children}
    </div>
  );
};
