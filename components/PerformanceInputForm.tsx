
import React, { useState } from 'react';
import type { PerformanceInputs } from '../types';
import { baseButtonClasses, primaryButtonClasses } from '../constants';

interface PerformanceInputFormProps {
    isLoading: boolean;
    onSubmit: (data: PerformanceInputs) => void;
}

const labelClasses = "block mb-2 font-bold text-gray-600 text-[15px]";
const textareaClasses = "w-full p-4 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 bg-gray-50 focus:outline-none focus:border-brand-primary-start focus:bg-white focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] resize-y min-h-[150px]";
const linkClasses = "text-sm text-brand-primary-start hover:underline font-semibold";

export const PerformanceInputForm: React.FC<PerformanceInputFormProps> = ({ isLoading, onSubmit }) => {
    const [formData, setFormData] = useState<PerformanceInputs>({
        websiteUrl: '',
        currentTraffic: 0,
        conversionRate: 0,
        averageOrderValue: 0,
        topKeywords: [],
        competitorUrls: [],
        goals: [],
        timeframe: '',
        budget: 0,
        gscQueries: '',
        gaTraffic: '',
        metaInsights: '',
        linkedinInsights: '',
        twitterInsights: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <p className="text-gray-600 mb-6">
                To analyze your performance, please visit the following links, export or copy the relevant data as plain text/CSV, and paste it into the corresponding fields below. Provide data for at least the last 30-90 days.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Google Search Console */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="gscQueries" className={labelClasses}>Google Search Console Data</label>
                        <a href="https://search.google.com/search-console/performance/search-analytics" target="_blank" rel="noopener noreferrer" className={linkClasses}>
                            Open GSC
                        </a>
                    </div>
                    <textarea 
                        id="gscQueries"
                        name="gscQueries"
                        value={formData.gscQueries}
                        onChange={handleInputChange}
                        className={textareaClasses}
                        placeholder="Go to Performance > Search results. In the table below the chart, click 'Queries'. Export the top 50-100 queries with their clicks and impressions, then paste the content here."
                        rows={6}
                    />
                </div>
                
                {/* Google Analytics */}
                <div>
                     <div className="flex justify-between items-center mb-2">
                        <label htmlFor="gaTraffic" className={labelClasses}>Google Analytics 4 Data</label>
                        <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className={linkClasses}>
                            Open GA4
                        </a>
                    </div>
                    <textarea 
                        id="gaTraffic"
                        name="gaTraffic"
                        value={formData.gaTraffic}
                        onChange={handleInputChange}
                        className={textareaClasses}
                        placeholder="Go to Reports > Acquisition > Traffic acquisition. Set the primary dimension to 'Session source / medium' or 'Session default channel group'. Export the table data and paste it here."
                        rows={6}
                    />
                </div>
                
                {/* Meta (Facebook/Instagram) */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="metaInsights" className={labelClasses}>Meta Business Suite Insights</label>
                        <a href="https://business.facebook.com/latest/insights/overview" target="_blank" rel="noopener noreferrer" className={linkClasses}>
                           Open Meta Insights
                        </a>
                    </div>
                    <textarea 
                        id="metaInsights"
                        name="metaInsights"
                        value={formData.metaInsights}
                        onChange={handleInputChange}
                        className={textareaClasses}
                        placeholder="Go to Insights > Content. Note the reach, likes, comments, and shares for your recent posts (especially those related to the generated strategy). Summarize the top 5-10 performing posts and their metrics here."
                        rows={6}
                    />
                </div>

                {/* LinkedIn Analytics */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="linkedinInsights" className={labelClasses}>LinkedIn Page Analytics</label>
                        <a href="https://www.linkedin.com/company/dashboard/" target="_blank" rel="noopener noreferrer" className={linkClasses}>
                           Open LinkedIn Analytics
                        </a>
                    </div>
                    <textarea 
                        id="linkedinInsights"
                        name="linkedinInsights"
                        value={formData.linkedinInsights}
                        onChange={handleInputChange}
                        className={textareaClasses}
                        placeholder="Go to your Company Page > Analytics > Visitors & Content. Summarize your visitor demographics and top-performing post impressions, clicks, and engagement rates here."
                        rows={6}
                    />
                </div>
                 {/* Twitter (X) Analytics */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="twitterInsights" className={labelClasses}>X (Twitter) Analytics</label>
                        <a href="https://analytics.twitter.com/" target="_blank" rel="noopener noreferrer" className={linkClasses}>
                           Open X Analytics
                        </a>
                    </div>
                    <textarea 
                        id="twitterInsights"
                        name="twitterInsights"
                        value={formData.twitterInsights}
                        onChange={handleInputChange}
                        className={textareaClasses}
                        placeholder="In your X Analytics dashboard, review your top Tweets. Paste the text and key metrics (impressions, engagement rate, link clicks) for your 5-10 most relevant tweets here."
                        rows={6}
                    />
                </div>
            </div>

            <div className="text-center pt-4">
                <button type="submit" className={`${baseButtonClasses} ${primaryButtonClasses}`} disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : '🔍 Analyze Performance'}
                </button>
            </div>
        </form>
    );
};
