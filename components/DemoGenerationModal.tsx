
import React, { useState } from 'react';
import type { InitialBrandInput } from '../types';
import { baseButtonClasses, primaryButtonClasses } from '../constants';

interface DemoGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: InitialBrandInput, onProgress: (message: string) => void) => Promise<void>;
  isLoading: boolean;
}

const inputClasses = "w-full py-3 px-4 border-2 border-gray-300 rounded-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary-start focus:border-transparent";

export const DemoGenerationModal: React.FC<DemoGenerationModalProps> = ({ isOpen, onClose, onGenerate, isLoading }) => {
  const [brandName, setBrandName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [progressMessage, setProgressMessage] = useState('');

  const handleGenerate = () => {
    if (!brandName) {
      alert("Please enter a Brand Name for the demo.");
      return;
    }
    const data: InitialBrandInput = {
      name: brandName,
      website: websiteUrl,
      businessType: 'telemedicine', // Use defaults for demo generation
      serviceType: 'b2c',
      locationScope: 'pan-india',
      specificLocations: '',
      selectedCities: ['Mumbai', 'Delhi', 'Bangalore'],
    };
    onGenerate(data, setProgressMessage);
  };

  const handleClose = () => {
    setBrandName('');
    setWebsiteUrl('');
    setProgressMessage('');
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Generate New Sales Demo</h2>
        <p className="text-gray-600 mb-6">
          Enter a prospective client's details to generate a complete, real-data report. The demo will be saved for offline use.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="demo-brand-name" className="block text-sm font-bold text-gray-700 mb-2">Brand Name *</label>
            <input
              id="demo-brand-name"
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className={inputClasses}
              placeholder="e.g., Client Health Inc."
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="demo-website-url" className="block text-sm font-bold text-gray-700 mb-2">Website URL (Optional)</label>
            <input
              id="demo-website-url"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className={inputClasses}
              placeholder="https://client.com"
              disabled={isLoading}
            />
          </div>
        </div>
        
        {isLoading && (
            <div className="mt-6 text-center p-4 bg-indigo-50 rounded-lg">
                <div className="w-8 h-8 mx-auto mb-3 border-4 border-gray-200 border-t-brand-primary-start rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-brand-primary-start">{progressMessage || 'Generating...'}</p>
            </div>
        )}

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleClose}
            className={`${baseButtonClasses} bg-gray-200 text-gray-700 hover:bg-gray-300 !py-3 !px-6`}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className={`${baseButtonClasses} ${primaryButtonClasses} !py-3 !px-6`}
            disabled={isLoading || !brandName}
          >
            {isLoading ? 'Generating...' : 'Generate Demo'}
          </button>
        </div>
      </div>
    </div>
  );
};
