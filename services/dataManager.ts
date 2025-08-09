import { Project } from "../types";
import { testFirebaseConnection } from "./firebase/config";
import { 
  saveProjectToFirestore,
  loadProjectsFromFirestore,
  deleteProjectFromFirestore,
  updateProjectInFirestore
} from "./firebase/dataService";

// Save project - tries Firebase first, falls back to localStorage
export const saveProject = async (userId: string, project: Project): Promise<boolean> => {
  // Try Firebase first if available
  const isFirebaseAvailable = await testFirebaseConnection();
  
  if (isFirebaseAvailable) {
    const success = await saveProjectToFirestore(userId, project);
    if (success) return true;
    // If Firebase fails, fall back to localStorage
    console.warn("Firebase save failed, falling back to localStorage");
  }
  
  // Fallback to localStorage
  try {
    const projects = getAllProjectsFromLocalStorage();
    projects[project.id] = project;
    localStorage.setItem('seo-app-projects', JSON.stringify(projects));
    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
};

// Load projects - tries Firebase first, falls back to localStorage
export const loadProjects = async (userId: string): Promise<Project[]> => {
  // Try Firebase first if available
  const isFirebaseAvailable = await testFirebaseConnection();
  
  if (isFirebaseAvailable) {
    const projects = await loadProjectsFromFirestore(userId);
    if (projects !== null) return projects;
    // If Firebase fails, fall back to localStorage
    console.warn("Firebase load failed, falling back to localStorage");
  }
  
  // Fallback to localStorage
  try {
    const projects = getAllProjectsFromLocalStorage();
    return Object.values(projects);
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return [];
  }
};

// Delete project - tries Firebase first, falls back to localStorage
export const deleteProject = async (userId: string, projectId: string): Promise<boolean> => {
  // Try Firebase first if available
  const isFirebaseAvailable = await testFirebaseConnection();
  
  if (isFirebaseAvailable) {
    const success = await deleteProjectFromFirestore(userId, projectId);
    if (success) return true;
    // If Firebase fails, fall back to localStorage
    console.warn("Firebase delete failed, falling back to localStorage");
  }
  
  // Fallback to localStorage
  try {
    const projects = getAllProjectsFromLocalStorage();
    delete projects[projectId];
    localStorage.setItem('seo-app-projects', JSON.stringify(projects));
    return true;
  } catch (error) {
    console.error("Error deleting from localStorage:", error);
    return false;
  }
};

// Update project - tries Firebase first, falls back to localStorage
export const updateProject = async (userId: string, project: Project): Promise<boolean> => {
  // Try Firebase first if available
  const isFirebaseAvailable = await testFirebaseConnection();
  
  if (isFirebaseAvailable) {
    const success = await updateProjectInFirestore(userId, project);
    if (success) return true;
    // If Firebase fails, fall back to localStorage
    console.warn("Firebase update failed, falling back to localStorage");
  }
  
  // Fallback to localStorage
  try {
    const projects = getAllProjectsFromLocalStorage();
    projects[project.id] = project;
    localStorage.setItem('seo-app-projects', JSON.stringify(projects));
    return true;
  } catch (error) {
    console.error("Error updating in localStorage:", error);
    return false;
  }
};

// Helper function to get all projects from localStorage
const getAllProjectsFromLocalStorage = (): Record<string, Project> => {
  const projects = localStorage.getItem('seo-app-projects');
  return projects ? JSON.parse(projects) : {};
};

// Sync localStorage data to Firebase when connection is restored
export const syncLocalStorageToFirebase = async (userId: string): Promise<void> => {
  const isFirebaseAvailable = await testFirebaseConnection();
  
  if (isFirebaseAvailable) {
    try {
      const localProjects = getAllProjectsFromLocalStorage();
      const projectArray = Object.values(localProjects);
      
      // Save all local projects to Firebase
      for (const project of projectArray) {
        await saveProjectToFirestore(userId, project);
      }
      
      console.log(`Synced ${projectArray.length} projects from localStorage to Firebase`);
    } catch (error) {
      console.error("Error syncing localStorage to Firebase:", error);
    }
  }
};