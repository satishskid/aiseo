import React from 'react';

interface StepProps {
    stepNumber?: string;
    title: string;
    children: React.ReactNode;
    isAlwaysOpen?: boolean;
    isUnlocked?: boolean;
    stepKey?: string;
    isCompleted?: boolean;
    isLoading?: boolean;
}

export const Step: React.FC<StepProps> = ({
    stepNumber,
    title,
    children,
    isAlwaysOpen = false,
    isUnlocked = false,
    isCompleted = false,
    isLoading = false
}) => {
    if (!isAlwaysOpen && !isUnlocked) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-depth transition-all duration-400 hover:shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary-start via-brand-primary-end to-brand-secondary-start transform -translate-x-full transition-transform duration-600 ease-in-out group-hover:translate-x-0"></div>
            <div className="flex items-center mb-6">
                {stepNumber && (
                    <div className="bg-gradient-to-br from-brand-primary-start to-brand-primary-end text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-elegant flex-shrink-0 hover:scale-110 transition-transform duration-300">
                        {stepNumber}
                    </div>
                )}
                <h2 className="text-gray-900 text-xl md:text-2xl font-bold ml-4 flex-1">{title}</h2>
                {isCompleted && (
                    <div className="ml-4 glass-effect bg-green-100/80 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-elegant flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Completed
                    </div>
                )}
                {isLoading && (
                    <div className="ml-4 glass-effect bg-blue-100/80 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-elegant flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        Generating...
                    </div>
                )}
            </div>
            <div className="fade-in">{children}</div>
        </div>
    );
};
