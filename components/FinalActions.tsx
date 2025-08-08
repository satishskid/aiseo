
import React from 'react';
import type { AllData } from '../types';
import { baseButtonClasses, primaryButtonClasses, secondaryButtonClasses, analyticsButtonClasses } from '../constants';

const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const FinalActions: React.FC<{ allData: AllData }> = ({ allData }) => {
    const { brandData, keywordStrategy, contentPlan, technicalSeoPlan, conversionPlan, performanceAnalysis } = allData;
    
    const handleExport = (format: 'md' | 'csv') => {
        if (!brandData) return;
        let content = '';
        const filename = `${brandData.name.replace(/\s+/g, '_')}_SEO_Strategy`;

        if (format === 'md') {
            content = `# ${brandData.name} - SEO Strategy Export\n\n`;
            content += `## Brand Information\n${JSON.stringify(brandData, null, 2)}\n\n`;
            content += `## Keyword Strategy\n${JSON.stringify(keywordStrategy, null, 2)}\n\n`;
            content += `## Content Plan\n${JSON.stringify(contentPlan, null, 2)}\n\n`;
            content += `## Technical SEO\n${JSON.stringify(technicalSeoPlan, null, 2)}\n\n`;
            content += `## Conversion Plan\n${JSON.stringify(conversionPlan, null, 2)}\n\n`;
            content += `## Performance Analysis\n${JSON.stringify(performanceAnalysis, null, 2)}\n\n`;
            content += `## Social Posts\n${JSON.stringify(allData.socialPosts, null, 2)}\n\n`;
            content += `## Publishing Plan\n${JSON.stringify(allData.publishingPlan, null, 2)}\n\n`;
            downloadFile(`${filename}.md`, content, 'text/markdown');
        } else if (format === 'csv') {
            content = "Category,Item,Details\n";

            // Brand Data
            if (brandData) {
                content += `"Brand","Name","${brandData.name}"\n`;
                content += `"Brand","Website","${brandData.website}"\n`;
                content += `"Brand","Description","${brandData.description}"\n`;
            }

            // Keywords
            keywordStrategy?.primaryKeywords.forEach(k => content += `"Keywords","Primary","${k}"\n`);
            keywordStrategy?.longTailKeywords.forEach(k => content += `"Keywords","Long Tail","${k}"\n`);
            keywordStrategy?.localKeywords.forEach(k => content += `"Keywords","Local","${k}"\n`);
            keywordStrategy?.competitorKeywords.forEach(k => content += `"Keywords","Competitor","${k}"\n`);

            // Content Plan
            contentPlan?.blogPosts.forEach((post, index) => {
                content += `"Content","Blog Post ${index + 1}","${post.title}"\n`;
                if (post.content) content += `"Content","Blog Content ${index + 1}","${post.content.substring(0, 100)}..."\n`;
            });

            contentPlan?.landingPages.forEach((page, index) => {
                content += `"Content","Landing Page ${index + 1}","${page.title}"\n`;
            });

            // Technical SEO
            technicalSeoPlan?.onPageOptimization.forEach((item, index) => {
                content += `"Technical SEO","On-Page ${index + 1}","${item.item}"\n`;
            });

            technicalSeoPlan?.structuredData.forEach((item, index) => {
                content += `"Technical SEO","Structured Data ${index + 1}","${item.item}"\n`;
            });

            // Conversion Optimization
            conversionPlan?.goals.forEach((goal, index) => {
                content += `"Conversion","Goal ${index + 1}","${goal.description}"\n`;
            });

            conversionPlan?.userJourneys.forEach((journey, index) => {
                content += `"Conversion","User Journey ${index + 1}","${journey.name}"\n`;
            });

            // Performance Analysis
            performanceAnalysis?.currentPerformance.forEach((item, index) => {
                content += `"Performance","Current Performance ${index + 1}","${item.metric}: ${item.value}"\n`;
            });

            performanceAnalysis?.opportunities.forEach((item, index) => {
                content += `"Performance","Opportunity ${index + 1}","${item.description}"\n`;
            });

            performanceAnalysis?.recommendations.forEach((item, index) => {
                content += `"Performance","Recommendation ${index + 1}","${item.action}"\n`;
            });

            // Conversion Plan
            conversionPlan?.goals.forEach((goal, index) => {
                content += `"Conversion","Goal ${index + 1}","${goal.name}"\n`;
            });

            conversionPlan?.userJourneys.forEach((journey, index) => {
                content += `"Conversion","User Journey ${index + 1}","${journey.name}"\n`;
            });

            // Performance Analysis
            performanceAnalysis?.currentPerformance.forEach((metric, index) => {
                content += `"Performance","Metric ${index + 1}","${metric.name}: ${metric.value}"\n`;
            });

            downloadFile(`${filename}.csv`, content, 'text/csv');
        }
    };

    return (
        <div className="bg-gradient-to-br from-brand-secondary-start/10 to-brand-secondary-end/10 p-8 rounded-2xl border-l-8 border-brand-secondary-start mt-8 animate-contentAppear">
            <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-brand-secondary-start to-brand-secondary-end text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0">
                    ✅
                </div>
                <h2 className="text-gray-800 text-2xl font-bold ml-4">Complete SEO Automation Package</h2>
            </div>
            <p className="text-gray-600 mb-6">Your comprehensive SEO strategy is complete. Export your data or generate reports below.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="font-bold text-gray-700 mb-2">📊 Export & Analytics:</h4>
                    <div className="flex flex-wrap gap-3">
                         <button className={`${baseButtonClasses} ${primaryButtonClasses}`} onClick={() => handleExport('md')}>Export as Markdown</button>
                         <button className={`${baseButtonClasses} ${primaryButtonClasses}`} onClick={() => handleExport('csv')}>Export as CSV</button>
                         <button className={`${baseButtonClasses} ${analyticsButtonClasses}`} onClick={() => alert('Generating Analytics Report...')}>Generate Analytics Report</button>
                    </div>
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-700 mb-2">🔗 Integration & Service:</h4>
                    <div className="flex flex-wrap gap-3">
                        <button className={`${baseButtonClasses} ${secondaryButtonClasses}`} onClick={() => alert('Generating Client Package...')}>Generate Client Package</button>
                        <button className={`${baseButtonClasses} ${secondaryButtonClasses}`} onClick={() => alert('Generating Make.com Workflow...')}>Generate Make.com Workflow</button>
                    </div>
                </div>
            </div>
        </div>
    );
}