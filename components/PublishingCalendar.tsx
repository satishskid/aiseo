
import React from 'react';
import type { PublishingPlan, CalendarEvent } from '../types';

interface PublishingCalendarProps {
    plan: PublishingPlan | null;
    isLoading: boolean;
    onEventClick: (event: CalendarEvent) => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="text-center p-8">
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-gray-200 border-t-brand-primary-start rounded-full animate-spin"></div>
        <p className="text-gray-600 font-semibold">Gemini is creating your action plan...</p>
    </div>
);

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const PublishingCalendar: React.FC<PublishingCalendarProps> = ({ plan, isLoading, onEventClick }) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (!plan) {
        return <p className="text-gray-500 italic p-4 text-center">Your publishing plan will appear here once generated.</p>;
    }

    const firstDay = 1; // Assuming calendar starts on day 1
    const startDayOfWeek = new Date(new Date().getFullYear(), new Date().getMonth(), firstDay).getDay();
    const emptyCells = Array(startDayOfWeek).fill(null);
    const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);

    const eventsByDay = plan.calendar.reduce((acc, event) => {
        if (!acc[event.day]) {
            acc[event.day] = [];
        }
        acc[event.day].push(event);
        return acc;
    }, {} as Record<number, CalendarEvent[]>);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mt-6 animate-contentAppear">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Actionable Publishing Plan</h3>
            
            {/* Expert Advice Section */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-700">🗓️ Publishing Cadence</h4>
                    <p className="text-sm text-gray-600 mt-1">{plan.expertAdvice.publishingCadence}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-700">⏳ Strategy Duration</h4>
                    <p className="text-sm text-gray-600 mt-1">{plan.expertAdvice.strategyDuration}</p>
                </div>
                 <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-700">📈 Metrics to Track</h4>
                    <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                        {plan.expertAdvice.metricsToTrack.map((metric, i) => <li key={i}>{metric}</li>)}
                    </ul>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-gray-600 text-sm mb-2">
                {dayNames.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {emptyCells.map((_, i) => <div key={`empty-${i}`} className="border rounded-lg bg-gray-50"></div>)}
                {calendarDays.map(day => (
                    <div key={day} className="border rounded-lg p-2 h-32 flex flex-col bg-white overflow-hidden">
                        <span className="font-bold text-gray-800 text-sm">{day}</span>
                        <div className="mt-1 space-y-1 overflow-y-auto text-left">
                            {(eventsByDay[day] || []).map((event, i) => (
                                <button
                                    key={i}
                                    onClick={() => onEventClick(event)}
                                    className={`w-full text-left text-xs p-1 rounded transition-colors duration-200 truncate ${
                                        event.type === 'Blog Post' 
                                        ? 'bg-green-100 hover:bg-green-200 text-green-800'
                                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                                    }`}
                                >
                                    {event.title}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
