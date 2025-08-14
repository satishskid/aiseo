import React from 'react';
import type { AnalyticsData } from '../types';
import { DataSourceIndicator, SectionHeaderWithIndicator, type DataSourceType } from './DataSourceIndicator';

interface MetricCardProps {
    value: string | number;
    label: string;
    isRealData?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label, isRealData = false }) => {
    const getBorderColor = () => {
        return isRealData ? 'border-green-200 bg-green-50/50' : 'border-orange-200 bg-orange-50/50';
    };

    return (
        <div className={`glass-effect p-6 rounded-2xl text-center shadow-depth transition-all duration-300 hover:shadow-xl hover:scale-105 border ${getBorderColor()}`}>
            <div className="text-4xl font-extrabold bg-gradient-to-r from-brand-primary-start to-brand-primary-end bg-clip-text text-transparent mb-2">{value}</div>
            <div className="text-sm font-semibold text-gray-800 mb-2">{label}</div>
            <DataSourceIndicator 
                source={isRealData ? 'real-ai' : 'mock'} 
                className="text-xs"
            />
        </div>
    );
};

interface AnalyticsDashboardProps {
    data?: AnalyticsData | null;
    isRealData?: boolean;
    responseTime?: number;
    lastUpdated?: string;
    hasSalesInsights?: boolean;
    isLoading?: boolean;
    error?: string | null;
    onGenerate?: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = React.memo(({
    data, 
    isRealData = false,
    responseTime,
    lastUpdated,
    hasSalesInsights = false,
    isLoading = false,
    error = null,
    onGenerate
}) => {
    // Empty state - no data available yet
    if (!data && !isLoading && !error) {
        return (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-depth animate-contentAppear border border-gray-200">
                <SectionHeaderWithIndicator 
                    title="SEO Analytics Dashboard" 
                    icon="📊"
                    source="mock"
                />
                
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Analytics Not Generated Yet</h3>
                    <p className="text-gray-600 mb-6">Complete your SEO strategy generation to calculate real analytics from your data.</p>
                    
                    {onGenerate && (
                        <button
                            onClick={onGenerate}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 mx-auto"
                        >
                            <span className="text-lg">🔄</span>
                            <span>Generate Analytics</span>
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-depth animate-contentAppear border border-blue-200">
                <SectionHeaderWithIndicator 
                    title="SEO Analytics Dashboard" 
                    icon="📊"
                    source="loading"
                />
                
                <div className="text-center py-12">
                    <div className="animate-spin text-6xl mb-4">⚙️</div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Generating Analytics...</h3>
                    <p className="text-blue-600">AI is calculating metrics from your SEO strategy data...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 shadow-depth animate-contentAppear border border-red-200">
                <SectionHeaderWithIndicator 
                    title="SEO Analytics Dashboard" 
                    icon="📊"
                    source="error"
                />
                
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">❌</div>
                    <h3 className="text-xl font-semibold text-red-700 mb-2">Analytics Generation Failed</h3>
                    <p className="text-red-600 mb-6">{error}</p>
                    
                    {onGenerate && (
                        <button
                            onClick={onGenerate}
                            className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 mx-auto"
                        >
                            <span className="text-lg">🔄</span>
                            <span>Retry Analytics Generation</span>
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Success state with data
    const dataSource: DataSourceType = isRealData ? 'real-ai' : 'mock';

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-depth animate-contentAppear border border-white/50">
            <SectionHeaderWithIndicator 
                title="SEO Analytics Dashboard" 
                icon="📊"
                source={dataSource}
            >
                {responseTime && isRealData && (
                    <span className="text-xs text-gray-600 bg-white/70 px-2 py-1 rounded">
                        Generated in {responseTime}ms
                    </span>
                )}
                {lastUpdated && (
                    <span className="text-xs text-gray-500 bg-white/70 px-2 py-1 rounded">
                        Updated: {new Date(lastUpdated).toLocaleTimeString()}
                    </span>
                )}
            </SectionHeaderWithIndicator>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <MetricCard value={data.keywords} label="Keywords Generated" isRealData={isRealData} />
                <MetricCard value={data.contentPieces} label="Content Pieces" isRealData={isRealData} />
                <MetricCard value={data.socialPosts} label="Social Media Posts" isRealData={isRealData} />
                <MetricCard value={data.estimatedReach.toLocaleString()} label="Est. Monthly Reach" isRealData={isRealData} />
                <MetricCard value={`${data.competitiveScore}%`} label="Competitive Score" isRealData={isRealData} />
                <MetricCard value={`${data.seoScore}%`} label="SEO Readiness" isRealData={isRealData} />
            </div>

            {isRealData && (
                <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                        <span className="text-lg">✅</span>
                        <span className="font-medium">Live AI-Generated Analytics</span>
                        {hasSalesInsights && (
                            <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                + Sales Insights Available
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                        These metrics were calculated from your actual SEO strategy using real AI analysis.
                        {hasSalesInsights && ' Sales coaching insights are also available from the complete strategy data.'}
                    </p>
                </div>
            )}
        </div>
    );
});
