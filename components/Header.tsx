import React, { useState } from 'react';
import type { Project } from '../types';

interface HeaderProps {
    onManageApiKeys: () => void;
    onGenerateNewDemo: () => void;
    onLoadDemo: (demoName: string) => void;
    onManageProjects: () => void;
    onOpenUserManual: () => void;
    onSignOut: () => void;
    savedDemos: string[];
    currentProject: Project | null;
}

export const Header: React.FC<HeaderProps> = ({ onManageApiKeys, onGenerateNewDemo, onLoadDemo, onManageProjects, onOpenUserManual, onSignOut, savedDemos, currentProject }) => {
    const [isHubOpen, setIsHubOpen] = useState(false);
    const [selectedDemo, setSelectedDemo] = useState('live');

    const handleSelect = (demoName: string) => {
        setSelectedDemo(demoName);
        onLoadDemo(demoName);
        setIsHubOpen(false);
    }
    
    return (
        <header className="bg-gradient-to-br from-brand-header-start to-brand-header-end text-white p-6 md:p-8 text-center relative overflow-hidden shadow-depth">
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center space-x-2 md:space-x-3">
                {/* User Manual Button */}
                <button 
                    onClick={onOpenUserManual}
                    className="bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white font-semibold py-2 px-3 md:px-4 border border-white/30 rounded-lg transition-all duration-300 text-xs md:text-sm flex items-center gap-1 md:gap-2 shadow-elegant hover:shadow-depth hover:scale-105"
                    title="Open User Manual"
                >
                    <span className="text-base">📖</span>
                    <span className="hidden sm:inline text-white font-semibold">User Manual</span>
                </button>

                {/* Project Manager Button */}
                <button 
                    onClick={onManageProjects}
                    className="bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white font-semibold py-2 px-3 md:px-4 border border-white/30 rounded-lg transition-all duration-300 text-xs md:text-sm flex items-center gap-1 md:gap-2 shadow-elegant hover:shadow-depth hover:scale-105"
                    title={currentProject ? `Current: ${currentProject.name}` : 'Manage Projects'}
                >
                    <span className="text-base">📂</span>
                    {currentProject ? (
                        <span className="max-w-[60px] md:max-w-[100px] truncate hidden sm:inline text-white font-semibold">{currentProject.name}</span>
                    ) : (
                        <span className="hidden sm:inline text-white font-semibold">Projects</span>
                    )}
                </button>
                
                {/* Sign Out Button */}
                <button 
                    onClick={onSignOut}
                    className="bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white font-semibold py-2 px-3 md:px-4 border border-white/30 rounded-lg transition-all duration-300 text-xs md:text-sm flex items-center gap-1 md:gap-2 shadow-elegant hover:shadow-depth hover:scale-105"
                    title="Sign Out"
                >
                    <span className="text-base">🚪</span>
                    <span className="hidden sm:inline text-white font-semibold">Sign Out</span>
                </button>
                
                {/* Demo Hub Button */}
                <div className="relative">
                    <button 
                        onClick={() => setIsHubOpen(prev => !prev)}
                        className="bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white font-semibold py-2 px-3 md:px-4 border border-white/30 rounded-lg transition-all duration-300 text-xs md:text-sm flex items-center gap-1 md:gap-2 shadow-elegant hover:shadow-depth hover:scale-105"
                    >
                        <span className="text-base">🚀</span>
                        <span className="hidden sm:inline text-white font-semibold">Demo Hub</span>
                        <svg className={`w-3 h-3 md:w-4 md:h-4 transition-transform text-white ${isHubOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {isHubOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-depth py-2 text-left animate-contentAppear border border-gray-100">
                            <div className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wide">Select Mode</div>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleSelect('live')}} className={`block px-4 py-3 text-sm transition-colors ${selectedDemo === 'live' ? 'bg-indigo-50 text-brand-primary-start font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                    Live Mode
                                </span>
                            </a>
                            <div className="border-t my-2 mx-2 border-gray-100"></div>
                            <div className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wide">Saved Demos</div>
                            {savedDemos.length > 0 ? (
                                savedDemos.map(demoName => (
                                     <a href="#" key={demoName} onClick={(e) => {e.preventDefault(); handleSelect(demoName)}} className={`block px-4 py-3 text-sm truncate transition-colors ${selectedDemo === demoName ? 'bg-indigo-50 text-brand-primary-start font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                            {demoName}
                                        </span>
                                    </a>
                                ))
                            ) : (
                                <p className="px-4 py-3 text-sm text-gray-500 italic">No saved demos yet.</p>
                            )}
                             <div className="border-t my-2 mx-2 border-gray-100"></div>
                             <a href="#" onClick={(e) => {e.preventDefault(); onGenerateNewDemo(); setIsHubOpen(false);}} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <span className="flex items-center gap-2">
                                    <span className="text-green-500">+</span>
                                    Generate New Sales Demo...
                                </span>
                            </a>
                            <div className="border-t my-2 mx-2 border-gray-100"></div>
                             <a href="#" onClick={(e) => {e.preventDefault(); onManageApiKeys(); setIsHubOpen(false);}} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <span className="flex items-center gap-2">
                                    <span>🔑</span>
                                    Manage API Keys
                                </span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' patternUnits='userSpaceOnUse' width='100' height='100'><circle cx='50' cy='50' r='1' fill='white' opacity='0.1'/></pattern></defs><rect width='100' height='100' fill='url(%23grain)'/></svg>')] opacity-30 animate-float"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    <span className="inline-block animate-float">🏥</span>
                    <span className="inline-block animate-float" style={{animationDelay: '0.5s'}}>💡</span>
                    <span className="inline-block animate-float" style={{animationDelay: '1s'}}>🎓</span>
                    <span className="block mt-2 text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        AI SEO Automation Platform
                    </span>
                </h1>
                <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl mx-auto leading-relaxed">
                    Transform your digital health, education & AI solutions into ranking powerhouses across India
                </p>
                <div className="flex justify-center flex-wrap gap-3 mt-5">
                    <span className="bg-black/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-elegant hover:shadow-depth transition-all duration-300 hover:scale-105">
                        🏥 Healthcare
                    </span>
                    <span className="bg-black/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-elegant hover:shadow-depth transition-all duration-300 hover:scale-105">
                        🎓 EdTech
                    </span>
                    <span className="bg-black/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-elegant hover:shadow-depth transition-all duration-300 hover:scale-105">
                        🤖 AI Solutions
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold">Pan India</span>
                </div>
            </div>
        </header>
    );
};