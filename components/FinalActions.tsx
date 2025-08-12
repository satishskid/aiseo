import React from 'react';
import type { AllData, KeywordStrategy, SocialPlatform } from '../types';
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

const escapeCsvField = (field: any): string => {
    if (field === null || field === undefined) {
        return '""';
    }
    const stringField = String(field);
    // Replace quotes with double quotes and wrap in quotes
    const escapedField = stringField.replace(/"/g, '""');
    return `"${escapedField}"`;
};


export const FinalActions: React.FC<{ allData: AllData }> = ({ allData }) => {
    const { brandData, keywordStrategy, contentPlan, technicalSeoPlan, conversionPlan, performanceAnalysis, socialPosts, publishingPlan } = allData;
    
    const handleExport = (format: 'md' | 'csv') => {
        if (!brandData) return;
        let content = '';
        const filename = `${brandData.name.replace(/\s+/g, '_')}_SEO_Strategy`;

        if (format === 'md') {
            content = `# ${brandData.name} - SEO Strategy Export\n\n`;
            content += `## Brand Information\n${JSON.stringify(brandData, null, 2)}\n\n`;
            content += `## Keyword Strategy\n${JSON.stringify(keywordStrategy, null, 2)}\n\n`;
            content += `## Content Plan\n${JSON.stringify(contentPlan, null, 2)}\n\n`;
            content += `## Social Posts\n${JSON.stringify(socialPosts, null, 2)}\n\n`;
            content += `## Publishing Plan\n${JSON.stringify(publishingPlan, null, 2)}\n\n`;
            content += `## Technical SEO\n${JSON.stringify(technicalSeoPlan, null, 2)}\n\n`;
            content += `## Conversion Plan\n${JSON.stringify(conversionPlan, null, 2)}\n\n`;
            content += `## Performance Analysis\n${JSON.stringify(performanceAnalysis, null, 2)}\n\n`;
            downloadFile(`${filename}.md`, content, 'text/markdown');
        } else if (format === 'csv') {
            const headers = ["Category", "Sub-Category", "Item", "Details", "Details 2", "Details 3"];
            content = headers.join(',') + '\n';

            // Helper to add a row
            const addRow = (cat: string, subCat: string, item: string, ...details: any[]) => {
                const row = [cat, subCat, item, ...details].map(escapeCsvField).join(',');
                content += row + '\n';
            };

            // Brand Data
            if (brandData) {
                addRow("Brand", "Core Info", "Name", brandData.name);
                addRow("Brand", "Core Info", "Website", brandData.website);
                addRow("Brand", "Core Info", "Description", brandData.description);
                addRow("Brand", "Core Info", "Target Customer", brandData.targetCustomer);
                addRow("Brand", "Core Info", "Key Services", brandData.keyServices);
            }

            // Keywords
            if (keywordStrategy) {
                const keywordFields: {key: keyof KeywordStrategy, label: string}[] = [
                    { key: 'primaryKeywords', label: 'Primary' },
                    { key: 'urgentKeywords', label: 'Urgent' },
                    { key: 'serviceKeywords', label: 'Service' },
                    { key: 'problemKeywords', label: 'Problem-Solving' },
                    { key: 'longTailKeywords', label: 'Long Tail' },
                    { key: 'locationKeywords', label: 'Location-Based' },
                    { key: 'competitorKeywords', label: 'Competitor' },
                    { key: 'keywordOpportunities', label: 'Opportunities' },
                    { key: 'seasonalKeywords', label: 'Seasonal' },
                    { key: 'voiceSearchKeywords', label: 'Voice Search' },
                ];
                keywordFields.forEach(({key, label}) => {
                    const keywords = keywordStrategy[key];
                    if (Array.isArray(keywords)) {
                        keywords.forEach(k => addRow("Keywords", label, k));
                    }
                });
            }

            // Content Plan
            if (contentPlan) {
                contentPlan.blogPosts.forEach(post => {
                    addRow("Content", "Blog Post", post.title, post.targetKeywords.join(', '), post.metaDescription, `Outline: ${post.outline.join(' | ')}`);
                });
                contentPlan.landingPages.forEach(page => {
                    addRow("Content", "Landing Page", page.title, page.targetKeywords.join(', '), page.purpose);
                });
            }

            // Social Posts
            if (socialPosts) {
                Object.keys(socialPosts).forEach(platform => {
                    socialPosts[platform as SocialPlatform].forEach(post => {
                        addRow("Social", platform, post.content, post.hashtags.join(' '), post.callToAction);
                    });
                });
            }

            // Publishing Plan
            if (publishingPlan) {
                publishingPlan.calendar.forEach(event => {
                    addRow("Publishing", event.type, `Day ${event.day}: ${event.title}`, event.details, event.platform);
                });
            }

            // Technical SEO
            if (technicalSeoPlan) {
                technicalSeoPlan.onPageOptimization.forEach(item => {
                    addRow("Technical SEO", "On-Page", item.element, item.recommended, `Impact: ${item.impact}`, `Difficulty: ${item.difficulty}`);
                });
                technicalSeoPlan.technicalIssues.forEach(item => {
                    addRow("Technical SEO", "Issues", item.issue, item.solution, `Priority: ${item.priority}`);
                });
            }

            // Conversion Plan
            if (conversionPlan) {
                conversionPlan.conversionGoals.forEach(goal => {
                    addRow("Conversion", "Goal", goal.goal, `Target: ${goal.targetRate}`, `Current: ${goal.currentRate}`);
                });
                conversionPlan.optimizationTactics.forEach(tactic => {
                    addRow("Conversion", "Tactic", tactic.tactic, tactic.description, `Impact: ${tactic.expectedImpact}`);
                });
            }

            // Performance Analysis
            if (performanceAnalysis) {
                performanceAnalysis.recommendations.forEach(rec => {
                    addRow("Performance", "Recommendation", rec.action, rec.rationale, `Priority: ${rec.priority}`);
                });
                performanceAnalysis.opportunities.forEach(opp => {
                    addRow("Performance", "Opportunity", opp.area, `Potential: ${opp.potential}`, `Impact: ${opp.impact}`);
                });
            }

            downloadFile(`${filename}.csv`, content, 'text/csv;charset=utf-8;');
        }
    };

    return (
        <div className="bg-gradient-to-br from-brand-secondary-start/10 to-brand-secondary-end/10 p-8 rounded-2xl border-l-8 border-brand-secondary-start mt-8 animate-contentAppear">
            <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-brand-secondary-start to-brand-secondary-end text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0">
                    ✅
                </div>
                <h2 className="text-gray-900 text-2xl font-bold ml-4">Complete SEO Automation Package</h2>
            </div>
            <p className="text-gray-800 mb-6 font-medium">Your comprehensive SEO strategy is complete. Export your data or generate reports below.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">📊 Export & Analytics:</h4>
                    <div className="flex flex-wrap gap-3">
                         <button className="py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-base rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl" onClick={() => handleExport('md')}>
                            Export as Markdown
                         </button>
                         <button className="py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-base rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl" onClick={() => handleExport('csv')}>
                            Export as CSV
                         </button>
                         <button className="py-4 px-6 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold text-base rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl" onClick={() => alert('Generating Analytics Report...')}>
                            Generate Analytics Report
                         </button>
                    </div>
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">🔗 Integration & Service:</h4>
                    <div className="flex flex-wrap gap-3">
                        <button className="py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-base rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl" onClick={() => alert('Generating Client Package...')}>
                            Generate Client Package
                        </button>
                        <button className="py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-base rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl" onClick={() => alert('Generating Make.com Workflow...')}>
                            Generate Make.com Workflow
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}