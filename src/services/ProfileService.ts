import { UserModel } from '../types/userWorkspace';
import { UserRepository } from '../repositories/UserRepository';

export class ProfileService {
  static updateBiodata(data: {
    fullName: string;
    nickname: string;
    dateOfBirth: string;
    gender: 'pria' | 'wanita';
    bio: string;
  }): UserModel {
    const current = UserRepository.getUser();
    const updated = {
      ...current,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    UserRepository.saveUser(updated);
    return updated;
  }

  static updateContactAndLocation(data: {
    email: string;
    phoneNumber: string;
    address: string;
    province: string;
    city: string;
    timezone: string;
  }): UserModel {
    const current = UserRepository.getUser();
    const updated = { ...current, ...data, updatedAt: new Date().toISOString() };
    UserRepository.saveUser(updated);
    return updated;
  }

  static updatePhotos(photoURL?: string, coverURL?: string): UserModel {
    const current = UserRepository.getUser();
    const updated = {
      ...current,
      ...(photoURL ? { photoURL } : {}),
      ...(coverURL ? { coverURL } : {}),
      updatedAt: new Date().toISOString(),
    };
    UserRepository.saveUser(updated);
    return updated;
  }
}
