import { SettingsModel } from '../types/userWorkspace';
import { SettingsRepository } from '../repositories/SettingsRepository';

export class SettingsService {
  static getSettings(): SettingsModel {
    return SettingsRepository.getSettings();
  }

  static updateSettings(partial: Partial<SettingsModel>): SettingsModel {
    const current = SettingsRepository.getSettings();
    const updated = {
      ...current,
      ...partial,
      notification: { ...current.notification, ...(partial.notification || {}) },
      privacy: { ...current.privacy, ...(partial.privacy || {}) },
      security: { ...current.security, ...(partial.security || {}) },
    };
    SettingsRepository.saveSettings(updated);
    return updated;
  }
}
