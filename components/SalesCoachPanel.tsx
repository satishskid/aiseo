
import React from 'react';
import type { SalesInsight } from '../types';

interface SalesCoachPanelProps {
    insights: SalesInsight[];
    isOpen: boolean;
    onToggle: () => void;
}

export const SalesCoachPanel: React.FC<SalesCoachPanelProps> = ({ insights, isOpen, onToggle }) => {
    return (
        <div className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
             style={{ width: '320px' }}>
            
            <button 
                onClick={onToggle}
                className="absolute top-1/2 -left-8 bg-white p-2 rounded-l-lg shadow-lg hover:bg-gray-100 transition-colors"
                title={isOpen ? 'Hide Sales Coach' : 'Show Sales Coach'}
            >
                <svg className="w-5 h-5 text-brand-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                </svg>
            </button>
            
            <div className="p-5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                     <span className="text-2xl">🤖</span>
                     <h3 className="text-lg font-bold text-gray-800">AI Sales Coach</h3>
                </div>
                <p className="text-xs text-gray-500 mb-5">Use these AI-generated talking points to guide your demo.</p>

                <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                    {insights.map((insight, index) => (
                        <div key={index} className="p-3 bg-indigo-50/70 rounded-lg border-l-4 border-indigo-300">
                            <p className="text-xs font-bold text-indigo-800 mb-1">{insight.title}</p>
                            <p className="text-sm text-gray-700">{insight.description}</p>
                            {insight.suggestedAction && (
                                <p className="text-xs text-indigo-600 mt-1">💡 {insight.suggestedAction}</p>
                            )}
                        </div>
                    ))}
                     {insights.length === 0 && <p className="text-sm text-gray-500 italic">No sales insights available for this demo.</p>}
                </div>
            </div>
        </div>
    );
};
