import {
  LiveLocationModel,
  LocationHistoryModel,
  SafeZoneModel,
  MovementStatus,
} from '../types/family_location';
import { LocationRepository } from '../repositories/LocationRepository';
import { ConsentService } from './ConsentService';

export class LocationService {
  // Haversine formula to calculate distance in meters between two lat/lng points
  static calculateDistanceMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371e3; // Earth radius in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  }

  static getLiveLocations(currentUserId: string): LiveLocationModel[] {
    const all = LocationRepository.getLiveLocations();
    const myConsent = ConsentService.getConsent(currentUserId);

    if (!myConsent.shareLocationEnabled || myConsent.hideLocation) {
      // Hide current user's live location from list or mark as hidden
      return all.map((loc) =>
        loc.userId === currentUserId
          ? { ...loc, isSharingLocation: false, address: 'Lokasi disembunyikan (Privacy Mode)' }
          : loc
      );
    }

    return all;
  }

  static updateMyLocation(
    userId: string,
    latitude: number,
    longitude: number,
    addressName?: string
  ): LiveLocationModel[] {
    const locations = LocationRepository.getLiveLocations();
    const safeZones = LocationRepository.getSafeZones();

    // Determine nearest safe zone
    let nearestZone: SafeZoneModel | null = null;
    let minDistance = Infinity;

    for (const zone of safeZones) {
      const dist = this.calculateDistanceMeters(
        latitude,
        longitude,
        zone.latitude,
        zone.longitude
      );
      if (dist <= zone.radiusMeters && dist < minDistance) {
        minDistance = dist;
        nearestZone = zone;
      }
    }

    const updated = locations.map((loc) => {
      if (loc.userId === userId) {
        const isInSafeZone = !!nearestZone;
        const safeZoneName = nearestZone ? nearestZone.name : undefined;
        const address =
          addressName ||
          (nearestZone
            ? nearestZone.address
            : `Koordinat ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);

        return {
          ...loc,
          latitude,
          longitude,
          address,
          lastSeen: 'Baru saja',
          isInSafeZone,
          safeZoneName,
        };
      }
      return loc;
    });

    LocationRepository.saveLiveLocations(updated);

    // Record history
    const userLoc = updated.find((l) => l.userId === userId);
    if (userLoc) {
      const historyEntry: LocationHistoryModel = {
        id: `hist_${Date.now()}`,
        userId,
        memberName: userLoc.memberName,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        dateStr: new Date().toISOString().slice(0, 10),
        latitude,
        longitude,
        address: userLoc.address,
        speedKmH: userLoc.speedKmH,
        movementStatus: userLoc.movementStatus,
      };
      LocationRepository.addHistoryEntry(historyEntry);
    }

    return updated;
  }

  static simulateMovement(userId: string): LiveLocationModel[] {
    const locations = LocationRepository.getLiveLocations();
    const userLoc = locations.find((l) => l.userId === userId);
    if (!userLoc) return locations;

    // Small random shift (~50-100m)
    const latDelta = (Math.random() - 0.5) * 0.002;
    const lngDelta = (Math.random() - 0.5) * 0.002;

    const newLat = userLoc.latitude + latDelta;
    const newLng = userLoc.longitude + lngDelta;

    const statuses: MovementStatus[] = ['Stopped', 'Walking', 'Driving', 'Traveling'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const speed = randomStatus === 'Driving' ? Math.floor(20 + Math.random() * 40) : randomStatus === 'Walking' ? 4 : 0;

    const updated = locations.map((loc) => {
      if (loc.userId === userId) {
        return {
          ...loc,
          latitude: newLat,
          longitude: newLng,
          movementStatus: randomStatus,
          speedKmH: speed,
          lastSeen: 'Baru saja',
        };
      }
      return loc;
    });

    LocationRepository.saveLiveLocations(updated);
    return updated;
  }

  static getSafeZones(): SafeZoneModel[] {
    return LocationRepository.getSafeZones();
  }

  static createSafeZone(zone: Omit<SafeZoneModel, 'id' | 'activeMembersCount'>): SafeZoneModel {
    const zones = LocationRepository.getSafeZones();
    const newZone: SafeZoneModel = {
      ...zone,
      id: `sz_${Date.now()}`,
      activeMembersCount: 0,
    };
    const updated = [newZone, ...zones];
    LocationRepository.saveSafeZones(updated);
    return newZone;
  }

  static deleteSafeZone(id: string): SafeZoneModel[] {
    const zones = LocationRepository.getSafeZones();
    const updated = zones.filter((z) => z.id !== id);
    LocationRepository.saveSafeZones(updated);
    return updated;
  }
}
