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
        <div className="bg-white rounded-2xl p-6 md:p-8 border-l-[6px] border-brand-primary-start shadow-lg transition-all duration-400 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary-start via-brand-primary-end to-brand-secondary-start transform -translate-x-full transition-transform duration-600 ease-in-out group-hover:translate-x-0"></div>
            <div className="flex items-center mb-6">
                {stepNumber && (
                    <div className="bg-gradient-to-br from-brand-primary-start to-brand-primary-end text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0">
                        {stepNumber}
                    </div>
                )}
                <h2 className="text-gray-800 text-xl md:text-2xl font-bold ml-4">{title}</h2>
                {isCompleted && (
                    <div className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Completed
                    </div>
                )}
                {isLoading && (
                    <div className="ml-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Generating...
                    </div>
                )}
            </div>
            <div>{children}</div>
        </div>
    );
};
