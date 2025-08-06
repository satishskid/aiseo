import React, { useState, useCallback } from 'react';
import type { SocialPlatform } from '../types';

interface SocialCardProps {
    platform: {
        id: SocialPlatform;
        name: string;
        icon: React.FC<{className?: string}>;
        color: string;
        copyAction: string;
    };
    posts: string[];
}

export const SocialCard: React.FC<SocialCardProps> = ({ platform, posts }) => {
    const [copiedStates, setCopiedStates] = useState<boolean[]>(Array(posts.length).fill(false));

    const handleCopy = useCallback((text: string, index: number) => {
        navigator.clipboard.writeText(text);
        const newCopiedStates = Array(posts.length).fill(false);
        newCopiedStates[index] = true;
        setCopiedStates(newCopiedStates);
        setTimeout(() => {
            setCopiedStates(Array(posts.length).fill(false));
        }, 2000);
    }, [posts.length]);

    const PlatformIcon = platform.icon;

    return (
        <div className={`bg-white rounded-xl p-5 shadow-lg border-l-4 ${platform.color}`}>
            <h4 className="flex items-center gap-2 mb-4 text-gray-800 font-bold text-lg">
                <PlatformIcon className="w-6 h-6" />
                {platform.name}
            </h4>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {posts.map((post, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{post}</p>
                        <div className="text-right mt-2">
                            <button 
                                onClick={() => handleCopy(post, index)}
                                className={`text-white border-none py-1.5 px-3 rounded-md text-xs cursor-pointer transition-all duration-300 hover:-translate-y-px
                                  ${copiedStates[index] ? 'bg-brand-secondary-start' : 'bg-gray-600 hover:bg-gray-800'}`}
                            >
                                {copiedStates[index] ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
