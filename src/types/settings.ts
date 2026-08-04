export type ThemeMode = 'light' | 'dark' | 'system';
export type LanguageCode = 'id' | 'en';

export interface AppSettings {
  theme: ThemeMode;
  language: LanguageCode;
  pushNotifications: boolean;
  soundEnabled: boolean;
  biometricAuth: boolean;
  appCheckEnabled: boolean;
  dataSaver: boolean;
}
