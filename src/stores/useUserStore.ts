import { create } from 'zustand';
import { UserModel, DeviceModel } from '../types/userWorkspace';
import { UserService } from '../services/UserService';
import { ProfileService } from '../services/ProfileService';

interface UserState {
  user: UserModel;
  devices: DeviceModel[];
  updateProfile: (updates: Partial<UserModel>) => void;
  updateBiodata: (data: {
    fullName: string;
    nickname: string;
    dateOfBirth: string;
    gender: 'pria' | 'wanita';
    bio: string;
  }) => void;
  updateContactAndLocation: (data: {
    email: string;
    phoneNumber: string;
    address: string;
    province: string;
    city: string;
    timezone: string;
  }) => void;
  updatePhotos: (photoURL?: string, coverURL?: string) => void;
  revokeDevice: (id: string) => void;
  logoutOtherDevices: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: UserService.getUserProfile(),
  devices: UserService.getActiveDevices(),

  updateProfile: (updates) => {
    const updated = UserService.updateUserProfile(updates);
    set({ user: updated });
  },

  updateBiodata: (data) => {
    const updated = ProfileService.updateBiodata(data);
    set({ user: updated });
  },

  updateContactAndLocation: (data) => {
    const updated = ProfileService.updateContactAndLocation(data);
    set({ user: updated });
  },

  updatePhotos: (photoURL, coverURL) => {
    const updated = ProfileService.updatePhotos(photoURL, coverURL);
    set({ user: updated });
  },

  revokeDevice: (id) => {
    const updatedDevices = UserService.revokeDevice(id);
    set({ devices: updatedDevices });
  },

  logoutOtherDevices: () => {
    const updatedDevices = UserService.logoutOtherDevices();
    set({ devices: updatedDevices });
  },
}));
