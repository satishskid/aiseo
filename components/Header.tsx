import React, { useState } from 'react';
import type { Project } from '../types';
import type { DemoUser } from '../demoUsers';

interface HeaderProps {
    onManageApiKeys: () => void;
    onManageProjects: () => void;
    onOpenUserManual: () => void;
    onSignOut: () => void;
    currentProject: Project | null;
    currentUser: DemoUser | null;
}

export const Header: React.FC<HeaderProps> = ({ onManageApiKeys, onManageProjects, onOpenUserManual, onSignOut, currentProject, currentUser }) => {
    
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
                
                {/* User Info Display */}
                {currentUser && (
                    <div className="bg-black/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 md:px-4 py-2 flex items-center gap-2 shadow-elegant">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                            {currentUser.firstName[0]}{currentUser.lastName[0]}
                        </div>
                        <div className="hidden lg:block text-left">
                            <div className="text-white font-semibold text-xs leading-tight">
                                {currentUser.firstName} {currentUser.lastName}
                            </div>
                            <div className="text-white/80 text-xs leading-tight">
                                {currentUser.company} • {currentUser.industry}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* API Keys Button */}
                <button 
                    onClick={onManageApiKeys}
                    className="bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white font-semibold py-2 px-3 md:px-4 border border-white/30 rounded-lg transition-all duration-300 text-xs md:text-sm flex items-center gap-1 md:gap-2 shadow-elegant hover:shadow-depth hover:scale-105"
                    title="Manage API Keys"
                >
                    <span className="text-base">🔑</span>
                    <span className="hidden sm:inline text-white font-semibold">API Keys</span>
                </button>
            </div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' patternUnits='userSpaceOnUse' width='100' height='100'><circle cx='50' cy='50' r='1' fill='white' opacity='0.1'/></pattern></defs><rect width='100' height='100' fill='url(%23grain)'/></svg>')] opacity-30 animate-float"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    <span className="inline-block animate-float">🧬</span>
                    <span className="inline-block animate-float" style={{animationDelay: '0.5s'}}>🎯</span>
                    <span className="inline-block animate-float" style={{animationDelay: '1s'}}>📊</span>
                    <span className="block mt-2 text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        AI Scientific SEO Marketing Platform
                    </span>
                </h1>
                <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl mx-auto leading-relaxed">
                    <span className="font-bold text-yellow-200">Scientific methodology meets AI intelligence</span> to generate evidence-based SEO cum marketing strategies across India
                </p>
                <div className="flex justify-center flex-wrap gap-3 mt-5">
                    <span className="bg-black/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-elegant hover:shadow-depth transition-all duration-300 hover:scale-105">
                        🧬 Scientific Method
                    </span>
                    <span className="bg-black/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-elegant hover:shadow-depth transition-all duration-300 hover:scale-105">
                        🎯 SEO + Marketing
                    </span>
                    <span className="bg-black/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-elegant hover:shadow-depth transition-all duration-300 hover:scale-105">
                        📊 Evidence-Based
                    </span>
                    <span className="bg-yellow-400/20 backdrop-blur-sm border border-yellow-300/30 text-white py-2 px-4 rounded-full text-sm font-semibold">Data-Driven Results</span>
                </div>
            </div>
        </header>
    );
};