
import React from 'react';
import type { AnalyticsData } from '../types';

interface MetricCardProps {
    value: string | number;
    label: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label }) => (
    <div className="glass-effect p-6 rounded-2xl text-center shadow-depth transition-all duration-300 hover:shadow-xl hover:scale-105 border border-white/50">
        <div className="text-4xl font-extrabold bg-gradient-to-r from-brand-primary-start to-brand-primary-end bg-clip-text text-transparent mb-2">{value}</div>
        <div className="text-sm font-semibold text-gray-800">{label}</div>
    </div>
);

interface AnalyticsDashboardProps {
    data: AnalyticsData;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-depth animate-contentAppear border border-white/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">📊</span>
                Real-time SEO Analytics Dashboard
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <MetricCard value={data.keywords} label="Keywords Generated" />
                <MetricCard value={data.contentPieces} label="Content Pieces" />
                <MetricCard value={data.socialPosts} label="Social Media Posts" />
                <MetricCard value={data.estimatedReach.toLocaleString()} label="Est. Monthly Reach" />
                <MetricCard value={`${data.competitiveScore}%`} label="Competitive Score" />
                <MetricCard value={`${data.seoScore}%`} label="SEO Readiness" />
            </div>
        </div>
    );
};
