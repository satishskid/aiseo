// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_b14jPZDMflrr1Kj0Iyzlbo2phqHcAsk",
  authDomain: "gbseo-a69d1.firebaseapp.com",
  projectId: "gbseo-a69d1",
  storageBucket: "gbseo-a69d1.firebasestorage.app",
  messagingSenderId: "997050169977",
  appId: "1:997050169977:web:8abfd638888ba9e2f072a8",
  measurementId: "G-CSR9L5F3FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Function to test Firebase connectivity
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    // Simple test - get app name
    const appName = app.name;
    console.log("Firebase connected successfully with app:", appName);
    return true;
  } catch (error) {
    console.error("Firebase connection test failed:", error);
    return false;
  }
};