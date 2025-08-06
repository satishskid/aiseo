import React, { useState } from 'react';
import type { ConversionPlan } from '../types';

interface ActionableConversionPlanProps {
  data: ConversionPlan;
}

export const ActionableConversionPlan: React.FC<ActionableConversionPlanProps> = ({ data }) => {
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
          : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
      }`}
    >
      {copiedItem === label ? '✓ Copied!' : '📋 Copy'}
    </button>
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        💰 Conversion Optimization Action Plan
        <span className="ml-2 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
          Ready to Deploy
        </span>
      </h3>

      {/* Call-to-Action Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          🎯 High-Converting Call-to-Actions
          <CopyButton 
            text={data.ctas.join('\n')}
            label="all-ctas"
          />
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.ctas.map((cta, index) => (
            <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 relative group">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-purple-800 flex-1 pr-4">{cta}</span>
                <button
                  onClick={() => handleCopy(cta, `cta-${index}`)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                >
                  {copiedItem === `cta-${index}` ? '✓' : '📋'}
                </button>
              </div>
              <p className="text-xs text-purple-600 mt-2">Click to copy for your website buttons</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          💳 Indian Payment Method Integration
          <CopyButton 
            text={`Payment Methods to Integrate:\n${data.indianPaymentMethods.join('\n')}`}
            label="payment-methods"
          />
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.indianPaymentMethods.map((method, index) => (
            <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-200 text-center relative group">
              <div className="font-semibold text-green-800 text-sm">{method}</div>
              <button
                onClick={() => handleCopy(method, `payment-${index}`)}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-green-600 hover:text-green-800 text-xs"
              >
                {copiedItem === `payment-${index}` ? '✓' : '📋'}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>💡 Implementation tip:</strong> Integrate UPI, Paytm, and major credit cards first. 
            Add "Pay Later" options for higher-value services.
          </p>
        </div>
      </div>

      {/* Trust Signals Section */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          🛡️ Trust Building Elements
          <CopyButton 
            text={data.trustSignals.join('\n')}
            label="trust-signals"
          />
        </h4>
        <div className="space-y-3">
          {data.trustSignals.map((signal, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200 relative group">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <p className="text-blue-800">{signal}</p>
                  <p className="text-xs text-blue-600 mt-1">Add this element to your website</p>
                </div>
                <button
                  onClick={() => handleCopy(signal, `trust-${index}`)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                >
                  {copiedItem === `trust-${index}` ? '✓' : '📋'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Adaptations Section */}
      <div>
        <h4 className="font-bold text-gray-700 mb-3 flex items-center">
          🌍 City-Specific Conversion Strategies
          <CopyButton 
            text={data.regionalAdaptations.map(region => 
              `${region.city}:\n${region.adaptations.map(a => `- ${a}`).join('\n')}`
            ).join('\n\n')}
            label="regional-adaptations"
          />
        </h4>
        <div className="space-y-4">
          {data.regionalAdaptations.map((region, index) => (
            <div key={index} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex justify-between items-start mb-3">
                <h5 className="font-bold text-orange-800">{region.city}</h5>
                <button
                  onClick={() => handleCopy(
                    `${region.city} Adaptations:\n${region.adaptations.map(a => `- ${a}`).join('\n')}`,
                    `region-${index}`
                  )}
                  className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded hover:bg-orange-200"
                >
                  {copiedItem === `region-${index}` ? '✓ Copied!' : '📋 Copy City Plan'}
                </button>
              </div>
              <ul className="space-y-2">
                {region.adaptations.map((adaptation, adaptIndex) => (
                  <li key={adaptIndex} className="flex items-start space-x-2">
                    <span className="text-orange-600 text-sm">•</span>
                    <span className="text-orange-700 text-sm flex-1">{adaptation}</span>
                    <button
                      onClick={() => handleCopy(adaptation, `adaptation-${index}-${adaptIndex}`)}
                      className="text-orange-600 hover:text-orange-800 transition-colors text-xs"
                    >
                      {copiedItem === `adaptation-${index}-${adaptIndex}` ? '✓' : '📋'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
        <h5 className="font-bold text-purple-800 mb-3">🚀 Quick Implementation Guide</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h6 className="font-semibold text-purple-700 mb-2">Phase 1: Trust & Payment</h6>
            <ul className="text-purple-600 space-y-1">
              <li>• Add trust signals to header/footer</li>
              <li>• Integrate UPI and major payment methods</li>
              <li>• Display security certifications</li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-purple-700 mb-2">Phase 2: CTAs & Regional</h6>
            <ul className="text-purple-600 space-y-1">
              <li>• Update all button text with high-converting CTAs</li>
              <li>• Implement city-specific landing pages</li>
              <li>• A/B test different CTA variations</li>
            </ul>
          </div>
        </div>
        <div className="mt-3 p-3 bg-purple-100 rounded-lg">
          <p className="text-purple-800 text-sm">
            <strong>💡 Pro Tip:</strong> Implement these changes gradually and measure conversion rates. 
            Use Google Analytics goals to track the impact of each modification.
          </p>
        </div>
      </div>
    </div>
  );
};
