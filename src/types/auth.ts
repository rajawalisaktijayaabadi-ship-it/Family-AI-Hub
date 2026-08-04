export interface FamilyMember {
  id: string;
  name: string;
  role: 'Kepala Keluarga' | 'Ibu' | 'Anak' | 'Kakek' | 'Nenek' | 'Pengasuh';
  avatar?: string;
  status: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  familyName: string;
  photoURL?: string;
  role: string;
  subscriptionTier: 'FamilyAI Free' | 'FamilyAI Premium' | 'FamilyAI Ultimate';
  createdAt: string;
  members: FamilyMember[];
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  rememberMe: boolean;
}
