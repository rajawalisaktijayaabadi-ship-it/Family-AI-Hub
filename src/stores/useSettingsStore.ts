import { create } from 'zustand';
import { SettingsModel } from '../types/userWorkspace';
import { SettingsService } from '../services/SettingsService';

interface SettingsState {
  settings: SettingsModel;
  updateSettings: (partial: Partial<SettingsModel>) => void;
  updateNotification: (key: keyof SettingsModel['notification'], val: boolean) => void;
  updatePrivacy: (key: keyof SettingsModel['privacy'], val: any) => void;
  updateSecurity: (key: keyof SettingsModel['security'], val: any) => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: SettingsService.getSettings(),

  updateSettings: (partial) => {
    const updated = SettingsService.updateSettings(partial);
    set({ settings: updated });
  },

  updateNotification: (key, val) => {
    const current = get().settings;
    const updatedNotif = { ...current.notification, [key]: val };
    const updated = SettingsService.updateSettings({ notification: updatedNotif });
    set({ settings: updated });
  },

  updatePrivacy: (key, val) => {
    const current = get().settings;
    const updatedPriv = { ...current.privacy, [key]: val };
    const updated = SettingsService.updateSettings({ privacy: updatedPriv });
    set({ settings: updated });
  },

  updateSecurity: (key, val) => {
    const current = get().settings;
    const updatedSec = { ...current.security, [key]: val };
    const updated = SettingsService.updateSettings({ security: updatedSec });
    set({ settings: updated });
  },
}));
