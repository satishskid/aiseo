
import React from 'react';
import type { CalendarEvent } from '../types';
import { SOCIAL_PLATFORMS } from '../constants';
import { baseButtonClasses, primaryButtonClasses } from '../constants';

interface CalendarEventModalProps {
    event: CalendarEvent | null;
    onClose: () => void;
}

export const CalendarEventModal: React.FC<CalendarEventModalProps> = ({ event, onClose }) => {
    if (!event) return null;

    const platformConfig = SOCIAL_PLATFORMS.find(p => p.id === event.platform);
    const PlatformIcon = platformConfig?.icon;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative" onClick={e => e.stopPropagation()}>
                <div className="flex items-start mb-4">
                    <div className={`mr-4 p-3 rounded-lg ${event.type === 'Blog Post' ? 'bg-green-100' : 'bg-blue-100'}`}>
                        {PlatformIcon ? <PlatformIcon className="w-6 h-6 text-blue-700" /> : <span className="text-2xl">📝</span>}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
                        <p className="text-sm text-gray-500">Scheduled for Day {event.day}</p>
                    </div>
                </div>
                
                <div className="my-6 p-4 bg-gray-50 rounded-lg border max-h-80 overflow-y-auto">
                    <h3 className="font-bold text-gray-700 mb-2">Details:</h3>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{event.details}</p>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className={`${baseButtonClasses} ${primaryButtonClasses} !py-2 !px-5`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
