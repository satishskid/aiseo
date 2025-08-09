import { 
  signInWithEmailLink, 
  isSignInWithEmailLink, 
  sendSignInLinkToEmail,
  onAuthStateChanged,
  signOut,
  User,
  sendEmailVerification,
  applyActionCode,
  checkActionCode,
  confirmPasswordReset,
  verifyPasswordResetCode,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "./config";
import { isUserInvited } from "./userService";

// Action code settings for email links
const actionCodeSettings = {
  url: window.location.origin,
  handleCodeInApp: true,
};

// Check if we're in development mode
const isDevelopment = window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname === '0.0.0.0';

// Send magic link to email
export const sendMagicLink = async (email: string): Promise<boolean> => {
  try {
    // In development mode, bypass invitation check
    if (!isDevelopment) {
      // Check if user is invited
      const isInvited = await isUserInvited(email);
      if (!isInvited) {
        throw new Error("You must be invited to access this application.");
      }
    }

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Save email in localStorage for redirect
    window.localStorage.setItem('emailForSignIn', email);
    return true;
  } catch (error) {
    console.error("Error sending magic link:", error);
    return false;
  }
};

// Verify and sign in with email link
export const signInWithMagicLink = async (): Promise<User | null> => {
  try {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');

      // If missing, prompt user for email
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }

      if (email) {
        // In development mode, bypass invitation check
        if (!isDevelopment) {
          // Check if user is invited
          const isInvited = await isUserInvited(email);
          if (!isInvited) {
            throw new Error("You must be invited to access this application.");
          }
        }

        const result = await signInWithEmailLink(auth, email, window.location.href);
        // Clear email from storage after successful sign in
        window.localStorage.removeItem('emailForSignIn');
        return result.user;
      }
    }
    return null;
  } catch (error) {
    console.error("Error signing in with magic link:", error);
    return null;
  }
};

// Traditional email/password sign up
export const signUpWithEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
  try {
    // In development mode, bypass invitation check
    if (!isDevelopment) {
      // Check if user is invited
      const isInvited = await isUserInvited(email);
      if (!isInvited) {
        throw new Error("You must be invited to access this application.");
      }
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send email verification
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

// Traditional email/password sign in
export const signInWithEmailAndPasswordFunc = async (email: string, password: string): Promise<User | null> => {
  try {
    // In development mode, bypass invitation check
    if (!isDevelopment) {
      // Check if user is invited
      const isInvited = await isUserInvited(email);
      if (!isInvited) {
        throw new Error("You must be invited to access this application.");
      }
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
};

// Send email verification
export const sendEmailVerificationToUser = async (user: User): Promise<boolean> => {
  try {
    await sendEmailVerification(user);
    return true;
  } catch (error) {
    console.error("Error sending email verification:", error);
    return false;
  }
};

// Check if user's email is verified
export const isUserEmailVerified = (user: User | null): boolean => {
  return user ? user.emailVerified : false;
};

// Listen for auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Sign out user
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Re-export isUserInvited from userService
export { isUserInvited } from "./userService";