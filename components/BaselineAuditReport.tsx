
import React from 'react';
import type { SeoAudit } from '../types';

interface BaselineAuditReportProps {
  audit: SeoAudit;
}

const AuditSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div>
    <h4 className="font-bold text-gray-700 mb-2">{title}</h4>
    <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

export const BaselineAuditReport: React.FC<BaselineAuditReportProps> = ({ audit }) => {
  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-red-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-dashed border-brand-primary-start/50 mt-6 animate-contentAppear">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Initial SEO Baseline Audit</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md">
          <p className="text-sm font-semibold text-gray-600 mb-2">Overall SEO Score</p>
          <div className={`text-6xl font-extrabold ${getScoreColor(audit.overallScore)}`}>
            {audit.overallScore}
          </div>
          <p className="text-xs text-gray-500 mt-2">out of 100</p>
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h4 className="font-bold text-gray-700 mb-2">Audit Summary</h4>
          <p className="text-gray-600 text-sm">{audit.summary}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AuditSection title="📝 Content Observations" items={audit.contentObservations} />
        <AuditSection title="🔧 Technical Observations" items={audit.technicalObservations} />
        <AuditSection title="📱 Social Presence" items={audit.socialObservations} />
        <AuditSection title="🚀 Quick Wins" items={audit.quickWins} />
      </div>
    </div>
  );
};