import { TrackingSettingModel } from '../types/family_location';
import { LocationRepository } from '../repositories/LocationRepository';

export class TrackingService {
  static getSettings(userId: string): TrackingSettingModel {
    return LocationRepository.getTrackingSettings(userId);
  }

  static updateSettings(
    userId: string,
    newSettings: Partial<TrackingSettingModel>
  ): TrackingSettingModel {
    const current = LocationRepository.getTrackingSettings(userId);
    const updated = { ...current, ...newSettings };
    LocationRepository.saveTrackingSettings(userId, updated);
    return updated;
  }
}
