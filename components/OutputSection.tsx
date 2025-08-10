import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="text-center p-8">
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-gray-200 border-t-brand-primary-start rounded-full animate-spin"></div>
        <p className="text-gray-600 font-semibold">Gemini is analyzing and generating content...</p>
    </div>
);

interface OutputSectionProps {
    title: string;
    isLoading: boolean;
    content: string | null;
    placeholder: string;
    isCompleted: boolean;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ title, isLoading, content, placeholder, isCompleted }) => {
    const sectionClasses = `
        bg-gradient-to-br from-gray-50 to-gray-100 
        rounded-2xl p-6 mt-6 
        border-2 border-dashed border-gray-300 relative
        ${isCompleted 
            ? 'border-solid border-brand-secondary-start bg-gradient-to-br from-green-50 to-teal-50 animate-contentAppear' 
            : ''
        }
    `;
    
    return (
        <div className={sectionClasses.trim()}>
            <h3 className="text-lg font-bold text-gray-700">{title}</h3>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className={`mt-4 ${content ? 'animate-contentAppear' : ''}`}>
                    {content ? (
                         <pre className="bg-white p-6 rounded-xl border-l-[5px] border-brand-secondary-start mt-5 whitespace-pre-wrap font-mono text-sm max-h-[400px] overflow-y-auto shadow-lg text-gray-800">{content}</pre>
                    ) : (
                        <p className="text-gray-500 italic p-4">{placeholder}</p>
                    )}
                </div>
            )}
        </div>
    );
};
