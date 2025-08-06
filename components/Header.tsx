
import React, { useState } from 'react';

interface HeaderProps {
    onManageApiKeys: () => void;
    onGenerateNewDemo: () => void;
    onLoadDemo: (demoName: string) => void;
    savedDemos: string[];
}

export const Header: React.FC<HeaderProps> = ({ onManageApiKeys, onGenerateNewDemo, onLoadDemo, savedDemos }) => {
    const [isHubOpen, setIsHubOpen] = useState(false);
    const [selectedDemo, setSelectedDemo] = useState('live');

    const handleSelect = (demoName: string) => {
        setSelectedDemo(demoName);
        onLoadDemo(demoName);
        setIsHubOpen(false);
    }
    
    return (
        <header className="bg-gradient-to-br from-brand-header-start to-brand-header-end text-white p-6 md:p-10 text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                <div className="relative">
                    <button 
                        onClick={() => setIsHubOpen(prev => !prev)}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 border border-white/30 rounded-lg transition-colors duration-300 text-sm flex items-center gap-2"
                    >
                        <span>🚀</span>
                        Demo Hub
                        <svg className={`w-4 h-4 transition-transform ${isHubOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {isHubOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 text-left animate-contentAppear">
                            <div className="px-4 py-2 text-xs text-gray-400 font-bold uppercase">Select Mode</div>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleSelect('live')}} className={`block px-4 py-2 text-sm ${selectedDemo === 'live' ? 'bg-indigo-50 text-brand-primary-start' : 'text-gray-700 hover:bg-gray-100'}`}>
                                Live Mode
                            </a>
                            <div className="border-t my-2"></div>
                            <div className="px-4 py-2 text-xs text-gray-400 font-bold uppercase">Saved Demos</div>
                            {savedDemos.length > 0 ? (
                                savedDemos.map(demoName => (
                                     <a href="#" key={demoName} onClick={(e) => {e.preventDefault(); handleSelect(demoName)}} className={`block px-4 py-2 text-sm truncate ${selectedDemo === demoName ? 'bg-indigo-50 text-brand-primary-start' : 'text-gray-700 hover:bg-gray-100'}`}>
                                        {demoName}
                                    </a>
                                ))
                            ) : (
                                <p className="px-4 py-2 text-sm text-gray-500 italic">No saved demos.</p>
                            )}
                             <div className="border-t my-2"></div>
                             <a href="#" onClick={(e) => {e.preventDefault(); onGenerateNewDemo(); setIsHubOpen(false);}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                + Generate New Sales Demo...
                            </a>
                            <div className="border-t my-2"></div>
                             <a href="#" onClick={(e) => {e.preventDefault(); onManageApiKeys(); setIsHubOpen(false);}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                🔑 Manage API Keys
                            </a>
                        </div>
                    )}
                </div>
            </div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' patternUnits='userSpaceOnUse' width='100' height='100'><circle cx='50' cy='50' r='1' fill='white' opacity='0.1'/></pattern></defs><rect width='100' height='100' fill='url(%23grain)'/></svg>')] opacity-50 animate-float"></div>
            <div className="relative z-10">
                <h1 className="text-2xl md:text-4xl font-extrabold mb-3">🏥💡🎓 Healthcare, EdTech & AI SEO Platform</h1>
                <p className="text-lg md:text-xl opacity-95">Transform your digital health, education & AI solutions into ranking powerhouses across India</p>
                <div className="flex justify-center flex-wrap gap-3 mt-5">
                    <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold">Healthcare</span>
                    <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold">EdTech</span>
                    <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold">AI Solutions</span>
                    <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold">Pan India</span>
                </div>
            </div>
        </header>
    );
};
