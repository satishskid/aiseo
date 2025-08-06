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

      {/* Core Web Vitals Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          🚀 Core Web Vitals Optimization
          <CopyButton 
            text={`Core Web Vitals Checklist:
- LCP (Largest Contentful Paint): ${data.coreWebVitals.lcp}
- FID (First Input Delay): ${data.coreWebVitals.fid}
- CLS (Cumulative Layout Shift): ${data.coreWebVitals.cls}`}
            label="core-web-vitals"
          />
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800">LCP Target: &lt;2.5s</h5>
            <p className="text-sm text-blue-700 mt-2">{data.coreWebVitals.lcp}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h5 className="font-semibold text-green-800">FID Target: &lt;100ms</h5>
            <p className="text-sm text-green-700 mt-2">{data.coreWebVitals.fid}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h5 className="font-semibold text-purple-800">CLS Target: &lt;0.1</h5>
            <p className="text-sm text-purple-700 mt-2">{data.coreWebVitals.cls}</p>
          </div>
        </div>
      </div>

      {/* Schema Markup Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          🏷️ Schema Markup Implementation
          <CopyButton 
            text={data.schema.join('\n\n')}
            label="schema-markup"
          />
        </h4>
        <div className="space-y-3">
          {data.schema.map((schemaItem, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
              <div className="flex justify-between items-start">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap flex-1 pr-4">{schemaItem}</pre>
                <button
                  onClick={() => handleCopy(schemaItem, `schema-${index}`)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                >
                  {copiedItem === `schema-${index}` ? '✓' : '📋'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Checklist Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          ✅ Technical Implementation Checklist
          <CopyButton 
            text={data.technicalChecklist.map((item, i) => `${i + 1}. ${item}`).join('\n')}
            label="technical-checklist"
          />
        </h4>
        <div className="space-y-2">
          {data.technicalChecklist.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <input 
                type="checkbox" 
                className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                id={`tech-${index}`}
              />
              <label htmlFor={`tech-${index}`} className="text-gray-700 flex-1 cursor-pointer">
                {item}
              </label>
              <button
                onClick={() => handleCopy(item, `tech-item-${index}`)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                {copiedItem === `tech-item-${index}` ? '✓' : '📋'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* India-Specific Optimizations */}
      <div>
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          🇮🇳 India-Specific SEO Optimizations
          <CopyButton 
            text={data.indiaSpecificOptimizations.map((item, i) => `${i + 1}. ${item}`).join('\n')}
            label="india-optimizations"
          />
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.indiaSpecificOptimizations.map((item, index) => (
            <div key={index} className="bg-orange-50 p-4 rounded-lg border border-orange-200 relative group">
              <div className="flex justify-between items-start">
                <p className="text-orange-800 text-sm flex-1 pr-4">{item}</p>
                <button
                  onClick={() => handleCopy(item, `india-${index}`)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-600 hover:text-orange-800"
                >
                  {copiedItem === `india-${index}` ? '✓' : '📋'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="font-bold text-blue-800 mb-2">📋 Implementation Tips</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use the checkboxes to track your progress</li>
          <li>• Copy individual items to share with your development team</li>
          <li>• Implement Core Web Vitals optimizations first for maximum impact</li>
          <li>• Test schema markup using Google's Rich Results Test tool</li>
        </ul>
      </div>
    </div>
  );
};
