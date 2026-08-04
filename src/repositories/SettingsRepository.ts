import { SettingsModel } from '../types/userWorkspace';

const SETTINGS_STORAGE_KEY = 'familyai_settings';

export const initialSettingsMock: SettingsModel = {
  theme: 'light',
  language: 'id',
  notification: {
    push: true,
    email: true,
    aiReminder: true,
    calendar: true,
    health: true,
    finance: true,
    education: true,
    family: true,
  },
  privacy: {
    profileVisibility: 'family',
    familyVisibility: 'members',
    locationPermission: true,
    cameraPermission: true,
    microphonePermission: true,
  },
  security: {
    pinEnabled: false,
    pinCode: '',
    biometricEnabled: true,
    sessionTimeoutMinutes: 30,
  },
};

export class SettingsRepository {
  static getSettings(): SettingsModel {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load settings:', e);
    }
    return initialSettingsMock;
  }

  static saveSettings(settings: SettingsModel): void {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }
}
