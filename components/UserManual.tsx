import React from 'react';

interface UserManualProps {
  onClose: () => void;
}

export const UserManual: React.FC<UserManualProps> = ({ onClose }) => {
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

          <h2>2. Generate Foundation & SEO Audit</h2>
          <p>Once you've filled in the initial details, click the <strong>"Generate Foundation & SEO Audit"</strong> button. The AI will then:</p>
          <ul>
            <li>Analyze your business information.</li>
            <li>Generate a detailed description of your business, your target customer, and key services.</li>
            <li>Perform a baseline SEO audit of your website.</li>
          </ul>

          <h2>3. Review and Refine</h2>
          <p>The AI-generated content will appear in the form. This is your opportunity to review and edit the text to ensure it accurately reflects your brand. You can modify the following fields:</p>
          <ul>
            <li><strong>About Your Business</strong></li>
            <li><strong>Target Customer Persona</strong></li>
            <li><strong>Key Services/Features</strong></li>
          </ul>

          <h2>4. Confirm & Generate SEO Strategy</h2>
          <p>After you've reviewed and are happy with the AI-generated content, click the <strong>"Confirm & Generate SEO Strategy"</strong> button. This will trigger the final step, where the AI creates a complete, actionable SEO plan.</p>

          <h2>5. Explore Your Actionable Plan</h2>
          <p>The final output is a comprehensive dashboard that includes:</p>
          <ul>
            <li><strong>Real-time SEO Analytics Dashboard:</strong> Key metrics and scores.</li>
            <li><strong>Actionable Publishing Plan:</strong> A calendar with suggested content (blog posts, social media updates) for the next month.</li>
            <li><strong>Expert Advice:</strong> Recommendations on publishing cadence, strategy duration, and key metrics to track.</li>
          </ul>
          <p>You can click on individual events in the calendar to see more details and get specific content ideas.</p>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4">
            <p><strong>What to do next:</strong> Use the generated plan as a guide for your content creation and SEO efforts. The calendar provides a clear roadmap for the next few weeks.</p>
          </div>
        </div>
      </div>
    </div>
  );
};