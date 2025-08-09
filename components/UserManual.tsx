import React from 'react';

interface UserManualProps {
  onClose: () => void;
  isOpen?: boolean;
}

export const UserManual: React.FC<UserManualProps> = ({ onClose, isOpen = true }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">AI SEO Platform - User Manual</h1>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        </div>

        <div className="prose max-w-none">
          <p>Welcome to the AI SEO Platform! This guide will walk you through the steps to generate a comprehensive SEO strategy for your business.</p>

          <h2>1. Initial Setup: Your Business Information</h2>
          <p>The first step is to provide some basic information about your business. This information is crucial for the AI to understand your brand and generate a relevant strategy.</p>
          <ul>
            <li><strong>Brand/Business Name:</strong> The name of your company.</li>
            <li><strong>Website URL:</strong> Your company's website address.</li>
            <li><strong>Industry Focus:</strong> The industry your business operates in.</li>
            <li><strong>Service Model:</strong> How you provide your services (e.g., B2B, B2C).</li>
            <li><strong>Social Media Handles:</strong> Your social media presence (optional).</li>
            <li><strong>Target Locations:</strong> The geographical areas you serve.</li>
          </ul>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <p><strong>Tip:</strong> The more accurate this information is, the better the AI-generated results will be.</p>
          </div>

          <h2>2. AI-Powered SEO Analysis</h2>
          <p>After providing your business information, the AI will generate a baseline SEO audit and recommendations.</p>
          <ul>
            <li><strong>SEO Audit:</strong> An analysis of your current SEO status and areas for improvement.</li>
            <li><strong>Keyword Strategy:</strong> Recommended keywords and phrases for your business.</li>
            <li><strong>Content Plan:</strong> A tailored content strategy to boost your online presence.</li>
          </ul>

          <h2>3. Strategy Implementation</h2>
          <p>Once the AI generates the strategy, you can review and implement the recommendations.</p>
          <ul>
            <li><strong>Export Options:</strong> Download your strategy in various formats (PDF, CSV, JSON).</li>
            <li><strong>Actionable Steps:</strong> Clear, implementable steps for each recommendation.</li>
            <li><strong>Progress Tracking:</strong> Monitor your implementation progress.</li>
          </ul>

          <h2>4. Advanced Features</h2>
          <p>The platform offers several advanced features to enhance your SEO efforts.</p>
          <ul>
            <li><strong>API Key Management:</strong> Configure API keys for different AI providers.</li>
            <li><strong>Project Management:</strong> Save and manage multiple SEO projects.</li>
            <li><strong>Sales Demo Hub:</strong> Pre-populated strategies for sales demonstrations.</li>
          </ul>

          <h2>5. Troubleshooting</h2>
          <p>If you encounter any issues, try these solutions:</p>
          <ul>
            <li><strong>Page Not Loading:</strong> Refresh the page or clear your browser cache.</li>
            <li><strong>Export Not Working:</strong> Check your browser's popup blocker settings.</li>
            <li><strong>AI Generation Stuck:</strong> Ensure your API keys are correctly configured.</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4">
            <p><strong>Need Help?</strong> Contact our support team at support@aiseoplatform.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};