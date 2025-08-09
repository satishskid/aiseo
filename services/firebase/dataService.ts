import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc,
  query,
  where,
  updateDoc
} from "firebase/firestore";
import { db } from "./config";
import { Project } from "../../types";

// Save project to Firestore
export const saveProjectToFirestore = async (userId: string, project: Project): Promise<boolean> => {
  try {
    const projectRef = doc(db, "users", userId, "projects", project.id);
    await setDoc(projectRef, project);
    return true;
  } catch (error) {
    console.error("Error saving project to Firestore:", error);
    return false;
  }
};

// Load all projects for a user from Firestore
export const loadProjectsFromFirestore = async (userId: string): Promise<Project[] | null> => {
  try {
    const projectsRef = collection(db, "users", userId, "projects");
    const querySnapshot = await getDocs(projectsRef);
    const projects: Project[] = [];
    
    querySnapshot.forEach((doc) => {
      projects.push(doc.data() as Project);
    });
    
    return projects;
  } catch (error) {
    console.error("Error loading projects from Firestore:", error);
    return null;
  }
};

// Load a specific project from Firestore
export const loadProjectFromFirestore = async (userId: string, projectId: string): Promise<Project | null> => {
  try {
    const projectRef = doc(db, "users", userId, "projects", projectId);
    const projectSnap = await getDoc(projectRef);
    
    if (projectSnap.exists()) {
      return projectSnap.data() as Project;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error loading project from Firestore:", error);
    return null;
  }
};

// Delete project from Firestore
export const deleteProjectFromFirestore = async (userId: string, projectId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "users", userId, "projects", projectId));
    return true;
  } catch (error) {
    console.error("Error deleting project from Firestore:", error);
    return false;
  }
};

// Update project in Firestore
export const updateProjectInFirestore = async (userId: string, project: Project): Promise<boolean> => {
  try {
    const projectRef = doc(db, "users", userId, "projects", project.id);
    await updateDoc(projectRef, project as any);
    return true;
  } catch (error) {
    console.error("Error updating project in Firestore:", error);
    return false;
  }
};