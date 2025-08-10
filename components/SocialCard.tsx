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
        <div className={`glass-effect rounded-2xl p-6 shadow-depth border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}>
            <h4 className="flex items-center gap-3 mb-6 text-gray-900 font-bold text-xl">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${platform.color} shadow-elegant`}>
                    <PlatformIcon className="w-6 h-6 text-white" />
                </div>
                {platform.name}
                <span className="ml-auto text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                    {posts.length} posts
                </span>
            </h4>
            <div className="space-y-5 max-h-96 overflow-y-auto pr-2">
                {posts.map((post, index) => (
                    <div key={index} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-elegant hover:shadow-depth transition-all duration-300">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed mb-3 font-medium">{post}</p>
                        <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-700 flex items-center gap-2 font-medium">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                Ready to publish
                            </div>
                            <button 
                                onClick={() => handleCopy(post, index)}
                                className={`text-white border-none py-2 px-4 rounded-lg text-xs font-medium cursor-pointer transition-all duration-300 hover:scale-105 shadow-elegant
                                  ${copiedStates[index] 
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                                    : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                                  }`}
                            >
                                {copiedStates[index] ? '✓ Copied!' : '📋 Copy'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
