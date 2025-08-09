import React, { useState } from 'react';
import type { ConversionPlan } from '../types';


interface ActionableConversionPlanProps {
  data?: ConversionPlan;
  plan?: ConversionPlan;
}

export const ActionableConversionPlan: React.FC<ActionableConversionPlanProps> = ({ data, plan }) => {
  // Use either data or plan prop, with plan taking precedence
  const conversionPlan = plan || data;

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

  if (!conversionPlan) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Conversion plan data is not available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Conversion Optimization Plan</h3>
        <p className="text-gray-600 mb-4">
          Implement these data-driven strategies to boost your conversion rates and maximize ROI.
        </p>
      </div>

      {conversionPlan.goals && conversionPlan.goals.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">1</span>
            Conversion Goals
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conversionPlan.goals.map((goal, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-800">{goal.name}</h5>
                    <p className="text-gray-600 text-sm mt-1">{goal.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                    goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {goal.priority} priority
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    KPI: {goal.kpi}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                    Target: {goal.target}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {conversionPlan.userJourney && conversionPlan.userJourney.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">2</span>
            User Journey Mapping
          </h4>
          <div className="space-y-4">
            {conversionPlan.userJourney.map((step, index) => (
              <div key={index} className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  {index < conversionPlan.userJourney.length - 1 && (
                    <div className="h-full w-0.5 bg-green-300 my-1"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <h5 className="font-medium text-gray-800">{step.name}</h5>
                  <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {step.channels && step.channels.map((channel, chanIndex) => (
                      <span key={chanIndex} className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-800">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {conversionPlan.optimizationTactics && conversionPlan.optimizationTactics.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mr-2">3</span>
            Optimization Tactics
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {conversionPlan.optimizationTactics.map((tactic, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-800">{tactic.title}</h5>
                    <p className="text-gray-600 text-sm mt-1">{tactic.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                        Element: {tactic.element}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tactic.impact === 'high' ? 'bg-red-100 text-red-800' :
                        tactic.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        Impact: {tactic.impact}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                        Effort: {tactic.effort}
                      </span>
                    </div>
                  </div>
                  {tactic.example && (
                    <CopyButton text={tactic.example} label={`tactic-${index}`} />
                  )}
                </div>
                {tactic.example && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <h6 className="font-medium text-gray-700 text-sm">Example:</h6>
                    <p className="text-gray-600 text-sm mt-1">{tactic.example}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {conversionPlan.testingPlan && conversionPlan.testingPlan.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">4</span>
            A/B Testing Plan
          </h4>
          <div className="space-y-4">
            {conversionPlan.testingPlan.map((test, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-800">{test.hypothesis}</h5>
                    <p className="text-gray-600 text-sm mt-1">{test.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    test.priority === 'high' ? 'bg-red-100 text-red-800' :
                    test.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {test.priority} priority
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <h6 className="font-medium text-blue-800 text-sm">Variation A</h6>
                    <p className="text-blue-600 text-xs mt-1">{test.variationA}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <h6 className="font-medium text-purple-800 text-sm">Variation B</h6>
                    <p className="text-purple-600 text-xs mt-1">{test.variationB}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h6 className="font-medium text-gray-800 text-sm">Success Metric</h6>
                    <p className="text-gray-600 text-xs mt-1">{test.successMetric}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {test.duration && (
                    <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                      Duration: {test.duration}
                    </span>
                  )}
                  {test.trafficAllocation && (
                    <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-800">
                      Traffic: {test.trafficAllocation}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {conversionPlan.kpis && conversionPlan.kpis.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs mr-2">5</span>
            Key Performance Indicators
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conversionPlan.kpis.map((kpi, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
                <h5 className="font-medium text-gray-800">{kpi.name}</h5>
                <div className="mt-2 text-2xl font-bold text-teal-600">{kpi.currentValue}</div>
                <div className="mt-1 text-sm text-gray-600">Current</div>
                <div className="mt-2 text-lg font-semibold text-green-600">{kpi.targetValue}</div>
                <div className="text-sm text-gray-600">Target</div>
                {kpi.improvement && (
                  <div className="mt-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      +{kpi.improvement} improvement
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-gray-50 to-purple-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-2">✅ Implementation Checklist</h4>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Prioritize high-impact, low-effort tactics for quick wins</li>
          <li>Set up proper tracking before implementing changes</li>
          <li>Run A/B tests for major changes to validate impact</li>
          <li>Monitor KPIs regularly and adjust strategies accordingly</li>
        </ul>
      </div>
    </div>
  );
};
