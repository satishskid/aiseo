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
import type { User } from "firebase/auth";

// Interface for invited users
export interface InvitedUser {
  id: string;
  email: string;
  invitedBy: string;
  invitedAt: Date;
  status: 'pending' | 'accepted' | 'revoked';
  role: 'admin' | 'user';
}

// Invite a new user
export const inviteUser = async (invitedBy: string, email: string, role: 'admin' | 'user' = 'user'): Promise<boolean> => {
  try {
    const invitationId = `${email}_${Date.now()}`;
    const invitationRef = doc(db, "invitations", invitationId);
    
    const invitationData: InvitedUser = {
      id: invitationId,
      email,
      invitedBy,
      invitedAt: new Date(),
      status: 'pending',
      role
    };
    
    await setDoc(invitationRef, invitationData);
    return true;
  } catch (error) {
    console.error("Error inviting user:", error);
    return false;
  }
};

// Get all invited users
export const getInvitedUsers = async (): Promise<InvitedUser[] | null> => {
  try {
    const invitationsRef = collection(db, "invitations");
    const querySnapshot = await getDocs(invitationsRef);
    const invitations: InvitedUser[] = [];
    
    querySnapshot.forEach((doc) => {
      invitations.push({
        ...doc.data(),
        invitedAt: doc.data().invitedAt.toDate()
      } as InvitedUser);
    });
    
    return invitations;
  } catch (error) {
    console.error("Error getting invited users:", error);
    return null;
  }
};

// Revoke user invitation
export const revokeUserInvitation = async (invitationId: string): Promise<boolean> => {
  try {
    const invitationRef = doc(db, "invitations", invitationId);
    await updateDoc(invitationRef, { status: 'revoked' });
    return true;
  } catch (error) {
    console.error("Error revoking user invitation:", error);
    return false;
  }
};

// Check if user is invited
export const isUserInvited = async (email: string): Promise<boolean> => {
  try {
    const invitationsRef = collection(db, "invitations");
    const q = query(invitationsRef, where("email", "==", email), where("status", "==", "pending"));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking if user is invited:", error);
    return false;
  }
};

// Update user status to accepted
export const acceptUserInvitation = async (invitationId: string): Promise<boolean> => {
  try {
    const invitationRef = doc(db, "invitations", invitationId);
    await updateDoc(invitationRef, { status: 'accepted' });
    return true;
  } catch (error) {
    console.error("Error accepting user invitation:", error);
    return false;
  }
};