import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, UserProfile } from '../types/auth';
import { getItemIndexedDB, setItemIndexedDB } from '../utils/storage';

interface AuthContextType extends AuthState {
  loginWithEmail: (email: string, pass: string, remember: boolean) => Promise<boolean>;
  registerWithEmail: (fullName: string, familyName: string, email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginAsGuest: () => Promise<boolean>;
  loginWithApple: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  setRememberMe: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_FAMILY_PROFILE: UserProfile = {
  uid: 'usr_pratama_01',
  email: 'keluarga.pratama@familyai.id',
  displayName: 'Ayah Pratama',
  familyName: 'Keluarga Pratama',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Kepala Keluarga',
  subscriptionTier: 'FamilyAI Premium',
  createdAt: '2026-01-15',
  members: [
    {
      id: 'm1',
      name: 'Bapak Pratama',
      role: 'Kepala Keluarga',
      status: 'Aktif di Pekerjaan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'm2',
      name: 'Ibu Ratna Pratama',
      role: 'Ibu',
      status: 'Di Rumah (Harmonis)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'm3',
      name: 'Budi Pratama',
      role: 'Anak',
      status: 'Sekolah SMPN 1',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'm4',
      name: 'Sisi Pratama',
      role: 'Anak',
      status: 'Les Musik',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
  ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    rememberMe: true,
  });

  useEffect(() => {
    // Auto login check from IndexedDB
    getItemIndexedDB<UserProfile>('auth_user_session').then((savedUser) => {
      if (savedUser) {
        setAuthState({
          user: savedUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          rememberMe: true,
        });
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    });
  }, []);

  const loginWithEmail = async (email: string, _pass: string, remember: boolean): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    await new Promise((r) => setTimeout(r, 600));

    const loggedUser: UserProfile = {
      ...DEMO_FAMILY_PROFILE,
      email: email,
      displayName: email.split('@')[0] || 'Pengguna FamilyAI',
    };

    setAuthState({
      user: loggedUser,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      rememberMe: remember,
    });

    if (remember) {
      setItemIndexedDB('auth_user_session', loggedUser);
    }
    return true;
  };

  const registerWithEmail = async (
    fullName: string,
    familyName: string,
    email: string,
    _pass: string
  ): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    await new Promise((r) => setTimeout(r, 700));

    const newUser: UserProfile = {
      uid: `usr_${Date.now()}`,
      email,
      displayName: fullName,
      familyName: familyName.startsWith('Keluarga') ? familyName : `Keluarga ${familyName}`,
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'Kepala Keluarga',
      subscriptionTier: 'FamilyAI Free',
      createdAt: new Date().toISOString().split('T')[0],
      members: [
        {
          id: 'm1',
          name: fullName,
          role: 'Kepala Keluarga',
          status: 'Aktif',
        },
      ],
    };

    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      rememberMe: true,
    });

    setItemIndexedDB('auth_user_session', newUser);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    await new Promise((r) => setTimeout(r, 800));

    const googleUser: UserProfile = {
      ...DEMO_FAMILY_PROFILE,
      displayName: 'Bapak Pratama (Google)',
      email: 'pratama.google@familyai.id',
    };

    setAuthState({
      user: googleUser,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      rememberMe: true,
    });

    setItemIndexedDB('auth_user_session', googleUser);
    return true;
  };

  const loginAsGuest = async (): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    await new Promise((r) => setTimeout(r, 400));

    const guestUser: UserProfile = {
      uid: `guest_${Date.now()}`,
      email: 'guest@familyai.id',
      displayName: 'Tamu Keluarga',
      familyName: 'Keluarga Indonesia',
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'Anggota Tamu',
      subscriptionTier: 'FamilyAI Free',
      createdAt: new Date().toISOString().split('T')[0],
      members: [
        {
          id: 'mg1',
          name: 'Tamu Utama',
          role: 'Kepala Keluarga',
          status: 'Mode Percobaan',
        },
      ],
    };

    setAuthState({
      user: guestUser,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      rememberMe: false,
    });

    return true;
  };

  const loginWithApple = async (): Promise<boolean> => {
    return loginWithGoogle();
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600));
    console.log('Firebase auth password reset sent to:', email);
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      rememberMe: true,
    });
    setItemIndexedDB('auth_user_session', null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!authState.user) return;
    const newProfile = { ...authState.user, ...updated };
    setAuthState((prev) => ({ ...prev, user: newProfile }));
    if (authState.rememberMe) {
      setItemIndexedDB('auth_user_session', newProfile);
    }
  };

  const setRememberMe = (val: boolean) => {
    setAuthState((prev) => ({ ...prev, rememberMe: val }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginAsGuest,
        loginWithApple,
        resetPassword,
        logout,
        updateProfile,
        setRememberMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
