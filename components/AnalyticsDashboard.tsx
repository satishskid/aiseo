
import React from 'react';
import type { AnalyticsData } from '../types';

interface MetricCardProps {
    value: string | number;
    label: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label }) => (
    <div className="bg-white p-4 rounded-xl text-center shadow-md transition-transform duration-300 hover:-translate-y-1">
        <div className="text-3xl font-extrabold text-brand-primary-start mb-1">{value}</div>
        <div className="text-sm font-semibold text-gray-600">{label}</div>
    </div>
);

interface AnalyticsDashboardProps {
    data: AnalyticsData;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner animate-contentAppear">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Real-time SEO Analytics Dashboard</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
