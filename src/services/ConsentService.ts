import { ConsentModel, LocationPermissionModel } from '../types/family_location';
import { LocationRepository } from '../repositories/LocationRepository';

export class ConsentService {
  static getConsent(userId: string): ConsentModel {
    return LocationRepository.getConsent(userId);
  }

  static updateConsent(userId: string, newConsent: Partial<ConsentModel>): ConsentModel {
    const current = LocationRepository.getConsent(userId);
    const updated: ConsentModel = {
      ...current,
      ...newConsent,
      privacyAcceptedAt: new Date().toISOString(),
    };
    LocationRepository.saveConsent(userId, updated);
    return updated;
  }

  static getPermissions(userId: string): LocationPermissionModel {
    return LocationRepository.getPermissions(userId);
  }

  static updatePermissions(
    userId: string,
    newPerms: Partial<LocationPermissionModel>
  ): LocationPermissionModel {
    const current = LocationRepository.getPermissions(userId);
    const updated: LocationPermissionModel = {
      ...current,
      ...newPerms,
      updatedAt: new Date().toISOString(),
    };
    LocationRepository.savePermissions(userId, updated);
    return updated;
  }

  static togglePauseSharing(userId: string): boolean {
    const current = LocationRepository.getConsent(userId);
    const newPause = !current.pauseSharing;
    this.updateConsent(userId, { pauseSharing: newPause });
    return newPause;
  }
}
