import React, { useState } from 'react';
import { PublishingPlan } from '../types';

interface CalendarDownloadProps {
  publishingPlan: PublishingPlan | null;
  onDownload: (format: 'google' | 'ics' | 'csv') => void;
  isLoading?: boolean;
}

export const CalendarDownload: React.FC<CalendarDownloadProps> = ({ 
  publishingPlan, 
  onDownload, 
  isLoading = false 
}) => {
  const [showOptions, setShowOptions] = useState(false);

  if (!publishingPlan) return null;

  const totalEvents = publishingPlan.calendar?.length || 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">📅 Download Calendar</h3>
          <p className="text-sm text-gray-600">
            {totalEvents} events ready to download
          </p>
        </div>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          {showOptions ? 'Hide Options' : 'Download Calendar'}
        </button>
      </div>

      {showOptions && (
        <div className="space-y-3 animate-fadeIn">
          {/* Google Calendar */}
          <button
            onClick={() => onDownload('google')}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">G</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">Google Calendar</div>
                <div className="text-sm text-gray-600">Add directly to your Google Calendar</div>
              </div>
            </div>
            <span className="text-red-600">→</span>
          </button>

          {/* ICS File */}
          <button
            onClick={() => onDownload('ics')}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">📅</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">ICS File</div>
                <div className="text-sm text-gray-600">Compatible with Outlook, Apple Calendar</div>
              </div>
            </div>
            <span className="text-blue-600">↓</span>
          </button>

          {/* CSV Export */}
          <button
            onClick={() => onDownload('csv')}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">📊</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">CSV Spreadsheet</div>
                <div className="text-sm text-gray-600">Open in Excel, Google Sheets</div>
              </div>
            </div>
            <span className="text-green-600">↓</span>
          </button>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-yellow-800 mb-2">📋 Quick Setup Instructions:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li><strong>Google Calendar:</strong> Opens directly in your browser</li>
              <li><strong>ICS File:</strong> Download and open with your calendar app</li>
              <li><strong>CSV File:</strong> Import into your project management tool</li>
            </ul>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
              <span className="text-gray-600">Preparing your calendar...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};