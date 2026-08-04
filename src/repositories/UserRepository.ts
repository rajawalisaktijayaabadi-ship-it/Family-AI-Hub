import { UserModel, DeviceModel } from '../types/userWorkspace';

const USER_STORAGE_KEY = 'familyai_user_profile';
const DEVICES_STORAGE_KEY = 'familyai_user_devices';

export const initialUserMock: UserModel = {
  uid: 'usr_fai_9921',
  fullName: 'Budi Rahardjo',
  nickname: 'Budi',
  email: 'budi.rahardjo@familyai.id',
  phoneNumber: '+62 812-3456-7890',
  dateOfBirth: '1985-06-15',
  gender: 'pria',
  address: 'Jl. Senopati No. 45, Kebayoran Baru',
  province: 'DKI Jakarta',
  city: 'Jakarta Selatan',
  language: 'id',
  timezone: 'Asia/Jakarta (WIB)',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  coverURL: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&auto=format&fit=crop&q=80',
  bio: 'Kepala Keluarga & Ayah dari 2 anak. Berkomitmen menjaga kesehatan, keharmonisan, dan pendidikan keluarga dengan teknologi AI.',
  subscriptionTier: 'FamilyAI Premium',
  createdAt: '2024-01-15T08:00:00Z',
  updatedAt: new Date().toISOString(),
};

export const initialDevicesMock: DeviceModel[] = [
  {
    id: 'dev_01',
    deviceName: 'Samsung Galaxy S24 Ultra',
    deviceType: 'Android',
    browser: 'Chrome Mobile 122.0',
    lastActive: 'Aktif sekarang',
    isCurrentDevice: true,
    isTrusted: true,
    ipAddress: '180.252.120.45',
    location: 'Jakarta Selatan, Indonesia',
  },
  {
    id: 'dev_02',
    deviceName: 'iPad Air 5th Gen',
    deviceType: 'Tablet',
    browser: 'Safari Mobile 17.2',
    lastActive: '2 jam yang lalu',
    isCurrentDevice: false,
    isTrusted: true,
    ipAddress: '180.252.120.45',
    location: 'Jakarta Selatan, Indonesia',
  },
  {
    id: 'dev_03',
    deviceName: 'MacBook Pro M3',
    deviceType: 'Desktop',
    browser: 'Chrome 122.0',
    lastActive: 'Kemarin, 21:40',
    isCurrentDevice: false,
    isTrusted: true,
    ipAddress: '114.124.201.88',
    location: 'Jakarta Pusat, Indonesia',
  },
];

export class UserRepository {
  static getUser(): UserModel {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load user from localStorage:', e);
    }
    return initialUserMock;
  }

  static saveUser(user: UserModel): void {
    try {
      user.updatedAt = new Date().toISOString();
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user:', e);
    }
  }

  static getDevices(): DeviceModel[] {
    try {
      const stored = localStorage.getItem(DEVICES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load devices:', e);
    }
    return initialDevicesMock;
  }

  static saveDevices(devices: DeviceModel[]): void {
    try {
      localStorage.setItem(DEVICES_STORAGE_KEY, JSON.stringify(devices));
    } catch (e) {
      console.error('Failed to save devices:', e);
    }
  }
}
