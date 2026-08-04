import { UserModel, DeviceModel } from '../types/userWorkspace';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  static getUserProfile(): UserModel {
    return UserRepository.getUser();
  }

  static updateUserProfile(updates: Partial<UserModel>): UserModel {
    const current = UserRepository.getUser();
    const updated = { ...current, ...updates };
    UserRepository.saveUser(updated);
    return updated;
  }

  static getActiveDevices(): DeviceModel[] {
    return UserRepository.getDevices();
  }

  static revokeDevice(deviceId: string): DeviceModel[] {
    const devices = UserRepository.getDevices().filter((d) => d.id !== deviceId);
    UserRepository.saveDevices(devices);
    return devices;
  }

  static logoutOtherDevices(): DeviceModel[] {
    const devices = UserRepository.getDevices().filter((d) => d.isCurrentDevice);
    UserRepository.saveDevices(devices);
    return devices;
  }

  static async simulateUploadPhoto(file: File): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeUrl = URL.createObjectURL(file);
        resolve(fakeUrl);
      }, 600);
    });
  }
}
