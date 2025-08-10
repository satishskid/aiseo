import React, { useState } from 'react';
import type { TechnicalSeoPlan } from '../types';

interface ActionableTechnicalSeoProps {
  data: TechnicalSeoPlan;
}

export const ActionableTechnicalSeo: React.FC<ActionableTechnicalSeoProps> = ({ data }) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CopyButton: React.FC<{ text: string; label: string }> = ({ text, label }) => (
    <button
      onClick={() => handleCopy(text, label)}
      className={`ml-2 px-3 py-1 text-xs rounded-full transition-all ${
        copiedItem === label
          ? 'bg-green-100 text-green-800'
          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      }`}
    >
      {copiedItem === label ? '✓ Copied!' : '📋 Copy'}
    </button>
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        ⚙️ Technical SEO Action Plan
        <span className="ml-2 text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
          Ready to Implement
        </span>
      </h3>

      {/* Technical Issues Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          🚨 Technical Issues to Fix
          <CopyButton 
            text={data.technicalIssues.map(issue => `${issue.priority}: ${issue.issue} - ${issue.solution}`).join('\n')}
            label="technical-issues"
          />
        </h4>
        <div className="space-y-3">
          {data.technicalIssues.map((issue, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              issue.priority === 'High' ? 'bg-red-50 border-red-200' :
              issue.priority === 'Medium' ? 'bg-yellow-50 border-yellow-200' :
              'bg-green-50 border-green-200'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-semibold text-gray-800">{issue.issue}</h5>
                  <p className="text-gray-600 text-sm mt-1">{issue.description}</p>
                  <p className="text-gray-700 text-sm mt-2"><strong>Solution:</strong> {issue.solution}</p>
                  <span className="text-xs text-gray-500">Estimated time: {issue.estimatedTime}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  issue.priority === 'High' ? 'bg-red-100 text-red-800' :
                  issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {issue.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* On-Page Optimization Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          📄 On-Page Optimization
          <CopyButton 
            text={data.onPageOptimization.map(item => `${item.element}: ${item.current} → ${item.recommended}`).join('\n')}
            label="onpage-optimization"
          />
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.onPageOptimization.map((item, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800">{item.element}</h5>
              <p className="text-blue-700 text-sm">Current: {item.current}</p>
              <p className="text-blue-700 text-sm">Recommended: {item.recommended}</p>
              <div className="mt-2 flex gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.impact === 'High' ? 'bg-red-100 text-red-800' :
                  item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  Impact: {item.impact}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Difficulty: {item.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Data Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          🏷️ Structured Data Implementation
          <CopyButton 
            text={data.structuredData.map(item => `${item.type}: ${item.description}\n${item.implementation}`).join('\n\n')}
            label="structured-data"
          />
        </h4>
        <div className="space-y-3">
          {data.structuredData.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h5 className="font-semibold text-gray-800">{item.type}</h5>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              <div className="mt-3 p-3 bg-white rounded border">
                <h6 className="text-xs font-medium text-gray-700 mb-1">Implementation:</h6>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap">{item.implementation}</pre>
              </div>
              <div className="mt-2">
                <h6 className="text-xs font-medium text-gray-700 mb-1">Benefits:</h6>
                <ul className="text-xs text-gray-600 list-disc list-inside">
                  {item.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Site Speed Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          🚀 Site Speed Optimization
          <CopyButton 
            text={data.siteSpeed.map(item => `${item.metric}: Current ${item.current} → Target ${item.target}\nImprovement: ${item.improvement}`).join('\n\n')}
            label="site-speed"
          />
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.siteSpeed.map((item, index) => (
            <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h5 className="font-semibold text-orange-800">{item.metric}</h5>
              <p className="text-orange-700 text-sm">Current: {item.current}</p>
              <p className="text-orange-700 text-sm">Target: {item.target}</p>
              <p className="text-gray-600 text-sm mt-2">{item.improvement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Optimization Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          📱 Mobile Optimization
          <CopyButton 
            text={data.mobileOptimization.map(item => `${item.aspect}: ${item.status}\nRecommendation: ${item.recommendation}`).join('\n\n')}
            label="mobile-optimization"
          />
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.mobileOptimization.map((item, index) => (
            <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h5 className="font-semibold text-purple-800">{item.aspect}</h5>
              <p className="text-purple-700 text-sm">Status: {item.status}</p>
              <p className="text-gray-600 text-sm mt-2">{item.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Local SEO Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          📍 Local SEO Optimization
          <CopyButton 
            text={data.localSeo.map(item => `${item.element}: ${item.current}\nOptimization: ${item.optimization}`).join('\n\n')}
            label="local-seo"
          />
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.localSeo.map((item, index) => (
            <div key={index} className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <h5 className="font-semibold text-teal-800">{item.element}</h5>
              <p className="text-teal-700 text-sm">Current: {item.current}</p>
              <p className="text-gray-600 text-sm mt-2">{item.optimization}</p>
              <span className="text-xs text-gray-500">Impact: {item.impact}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Priority */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          ✅ Implementation Priority
          <CopyButton 
            text={data.implementationPriority.map((item, i) => `${i + 1}. ${item}`).join('\n')}
            label="implementation-priority"
          />
        </h4>
        <div className="space-y-2">
          {data.implementationPriority.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="bg-blue-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700 flex-1">{item}</span>
              <button
                onClick={() => handleCopy(item, `priority-${index}`)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                {copiedItem === `priority-${index}` ? '✓' : '📋'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="font-bold text-blue-800 mb-2">📋 Implementation Tips</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Start with high-impact, easy-difficulty items first</li>
          <li>• Focus on technical issues marked as "High" priority</li>
          <li>• Copy individual items to share with your development team</li>
          <li>• Test changes in a staging environment before production</li>
        </ul>
      </div>
    </div>
  );
};
