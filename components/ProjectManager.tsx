import React, { useState, useEffect } from 'react';
import type { Project, AllData } from '../types';

interface ProjectManagerProps {
  currentProject: Project | null;
  onProjectSelect: (project: Project | null) => void;
  onProjectSave: (projectData: AllData, projectName: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  currentProject,
  onProjectSelect,
  onProjectSave,
  isOpen,
  onClose
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectWebsite, setNewProjectWebsite] = useState('');
  const [newProjectIndustry, setNewProjectIndustry] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    try {
      const stored = localStorage.getItem('seo-app-projects');
      if (stored) {
        const projectsData = JSON.parse(stored);
        setProjects(projectsData);
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const saveProjects = (updatedProjects: Project[]) => {
    try {
      localStorage.setItem('seo-app-projects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Failed to save projects:', error);
    }
  };

  const createNewProject = () => {
    if (!newProjectName.trim()) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      website: newProjectWebsite.trim(),
      industry: newProjectIndustry.trim(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      data: {
        brandData: null,
        analyticsData: { keywords: 0, contentPieces: 0, socialPosts: 0, estimatedReach: 0, competitiveScore: 0, seoScore: 0 },
        keywordStrategy: null,
        contentPlan: null,
        socialPosts: null,
        technicalSeoPlan: null,
        conversionPlan: null,
        publishingPlan: null,
        performanceAnalysis: null,
        seoAudit: null,
        salesInsights: []
      }
    };

    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    onProjectSelect(newProject);
    setShowNewProjectForm(false);
    setNewProjectName('');
    setNewProjectWebsite('');
    setNewProjectIndustry('');
    onClose();
  };

  const deleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      saveProjects(updatedProjects);
      
      if (currentProject && currentProject.id === projectId) {
        onProjectSelect(null);
      }
    }
  };

  const selectProject = (project: Project) => {
    onProjectSelect(project);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">📂 Project Manager</h2>
              <p className="text-gray-600">Manage multiple brands and SEO projects</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowNewProjectForm(true)}
                className="px-4 py-2 bg-brand-primary-start text-white rounded-lg hover:bg-brand-primary-end transition-colors"
              >
                + New Project
              </button>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* New Project Form */}
          {showNewProjectForm && (
            <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-4">Create New Project</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name *</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="e.g., HealthTech Solutions"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={newProjectWebsite}
                    onChange={(e) => setNewProjectWebsite(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                  <input
                    type="text"
                    value={newProjectIndustry}
                    onChange={(e) => setNewProjectIndustry(e.target.value)}
                    placeholder="e.g., Healthcare AI"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewProjectForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewProject}
                  disabled={!newProjectName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Project
                </button>
              </div>
            </div>
          )}

          {/* Current Project */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-700 mb-3">🎯 Current Active Project</h3>
            {currentProject ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-green-800">{currentProject.name}</h4>
                    <p className="text-green-600 text-sm">{currentProject.website}</p>
                    <p className="text-green-600 text-sm">{currentProject.industry}</p>
                    <p className="text-green-500 text-xs">Last modified: {formatDate(currentProject.lastModified)}</p>
                  </div>
                  <button
                    onClick={() => onProjectSelect(null)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
                  >
                    Switch Project
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-600">No active project. Select or create a project to get started.</p>
              </div>
            )}
          </div>

          {/* Projects List */}
          <div>
            <h3 className="font-bold text-gray-700 mb-3">📋 All Projects ({projects.length})</h3>
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">📂</div>
                <p className="text-gray-600 mb-4">No projects yet. Create your first project to get started!</p>
                <button
                  onClick={() => setShowNewProjectForm(true)}
                  className="px-6 py-3 bg-brand-primary-start text-white rounded-lg hover:bg-brand-primary-end transition-colors"
                >
                  + Create First Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    className={`border-2 rounded-lg p-4 transition-all cursor-pointer hover:shadow-lg ${
                      currentProject?.id === project.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 bg-white hover:border-brand-primary-start'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 truncate">{project.name}</h4>
                        {project.website && (
                          <p className="text-gray-600 text-sm truncate">{project.website}</p>
                        )}
                        {project.industry && (
                          <p className="text-gray-500 text-sm">{project.industry}</p>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            selectProject(project);
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Select Project"
                        >
                          📂
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project.id);
                          }}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete Project"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-2">
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Created: {formatDate(project.createdAt)}</p>
                        <p>Modified: {formatDate(project.lastModified)}</p>
                      </div>
                      
                      {/* Progress indicators */}
                      <div className="mt-2 flex space-x-2 text-xs">
                        {project.data.brandData && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Foundation ✓</span>}
                        {project.data.keywordStrategy && <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Keywords ✓</span>}
                        {project.data.contentPlan && <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Content ✓</span>}
                      </div>
                    </div>
                    
                    {currentProject?.id === project.id && (
                      <div className="mt-2 text-center">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active Project</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 rounded-b-2xl border-t border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Projects are stored locally in your browser. Export important data regularly.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
