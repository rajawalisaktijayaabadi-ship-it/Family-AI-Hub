import {
  LiveLocationModel,
  LocationHistoryModel,
  DeviceModel,
  ConsentModel,
  LocationPermissionModel,
  TrackingSettingModel,
  SafeZoneModel,
  SOSModel,
} from '../types/family_location';

const STORAGE_KEYS = {
  LIVE_LOCATIONS: 'familyai_live_locations_v2',
  LOCATION_HISTORY: 'familyai_location_history_v2',
  REGISTERED_DEVICES: 'familyai_registered_devices_v2',
  PRIVACY_CONSENTS: 'familyai_privacy_consents_v2',
  LOCATION_PERMISSIONS: 'familyai_location_permissions_v2',
  TRACKING_SETTINGS: 'familyai_tracking_settings_v2',
  SAFE_ZONES: 'familyai_safe_zones_v2',
  SOS_ALERTS: 'familyai_sos_alerts_v2',
};

const INITIAL_LOCATIONS: LiveLocationModel[] = [
  {
    id: 'loc_1',
    userId: 'usr_fai_father',
    memberName: 'Bapak Hendra (Ayah)',
    role: 'Father',
    avatarBg: 'bg-blue-600',
    latitude: -6.2088,
    longitude: 106.8456,
    address: 'Jl. Sudirman No. 42, Jakarta Selatan (Kantor PT Maju Jaya)',
    accuracyMeters: 8,
    movementStatus: 'Stopped',
    speedKmH: 0,
    batteryLevel: 88,
    networkStatus: '4G/5G',
    isOnline: true,
    lastSeen: 'Baru saja',
    isSharingLocation: true,
    isInSafeZone: true,
    safeZoneName: 'Kantor Sudirman',
  },
  {
    id: 'loc_2',
    userId: 'usr_fai_mother',
    memberName: 'Ibu Ratna (Ibu)',
    role: 'Mother',
    avatarBg: 'bg-rose-600',
    latitude: -6.2297,
    longitude: 106.8091,
    address: 'Jl. Senopati Indah No. 12, Kebayoran Baru (Rumah Utama)',
    accuracyMeters: 5,
    movementStatus: 'Stopped',
    speedKmH: 0,
    batteryLevel: 94,
    networkStatus: 'Wi-Fi',
    isOnline: true,
    lastSeen: '2 menit lalu',
    isSharingLocation: true,
    isInSafeZone: true,
    safeZoneName: 'Rumah Utama',
  },
  {
    id: 'loc_3',
    userId: 'usr_fai_child1',
    memberName: 'Rizky (Anak Pertama)',
    role: 'Child',
    avatarBg: 'bg-amber-600',
    latitude: -6.2115,
    longitude: 106.8229,
    address: 'SMA Negeri 8 Jakarta, Tebet Raya',
    accuracyMeters: 12,
    movementStatus: 'Walking',
    speedKmH: 4,
    batteryLevel: 62,
    networkStatus: '4G/5G',
    isOnline: true,
    lastSeen: '1 menit lalu',
    isSharingLocation: true,
    isInSafeZone: true,
    safeZoneName: 'Sekolah SMA 8',
  },
  {
    id: 'loc_4',
    userId: 'usr_fai_grandparent',
    memberName: 'Opa Bambang (Kakek)',
    role: 'Grandparent',
    avatarBg: 'bg-teal-600',
    latitude: -6.2295,
    longitude: 106.8095,
    address: 'Taman Bunga Senopati, Kebayoran Baru',
    accuracyMeters: 10,
    movementStatus: 'Stopped',
    speedKmH: 0,
    batteryLevel: 78,
    networkStatus: 'Wi-Fi',
    isOnline: true,
    lastSeen: '10 menit lalu',
    isSharingLocation: true,
    isInSafeZone: true,
    safeZoneName: 'Rumah Utama',
  },
];

const INITIAL_DEVICES: DeviceModel[] = [
  {
    id: 'dev_1',
    userId: 'usr_fai_father',
    memberName: 'Bapak Hendra',
    deviceId: 'dev_s24_ultra',
    deviceName: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    model: 'SM-S928B',
    operatingSystem: 'Android 14 (One UI 6.1)',
    browser: 'Chrome Mobile 126',
    pwaStatus: 'Installed',
    pushToken: 'fcm_token_hendra_s24_8812',
    batteryLevel: 88,
    networkStatus: '4G/5G',
    isOnline: true,
    registeredAt: '2026-01-10T08:00:00Z',
    lastSyncAt: '2026-08-05T07:25:00Z',
  },
  {
    id: 'dev_2',
    userId: 'usr_fai_mother',
    memberName: 'Ibu Ratna',
    deviceId: 'dev_iphone_15_pro',
    deviceName: 'iPhone 15 Pro Max',
    brand: 'Apple',
    model: 'iPhone16,2',
    operatingSystem: 'iOS 17.5.1',
    browser: 'Mobile Safari 17.5',
    pwaStatus: 'Standalone',
    pushToken: 'apns_token_ratna_ip15_9011',
    batteryLevel: 94,
    networkStatus: 'Wi-Fi',
    isOnline: true,
    registeredAt: '2026-01-12T10:30:00Z',
    lastSyncAt: '2026-08-05T07:23:00Z',
  },
  {
    id: 'dev_3',
    userId: 'usr_fai_child1',
    memberName: 'Rizky',
    deviceId: 'dev_poco_f5',
    deviceName: 'POCO F5 5G',
    brand: 'Xiaomi',
    model: '23049PCD8G',
    operatingSystem: 'Android 14 (HyperOS 1.0)',
    browser: 'Chrome Mobile 125',
    pwaStatus: 'Installed',
    pushToken: 'fcm_token_rizky_poco_3321',
    batteryLevel: 62,
    networkStatus: '4G/5G',
    isOnline: true,
    registeredAt: '2026-02-01T14:15:00Z',
    lastSyncAt: '2026-08-05T07:24:00Z',
  },
];

const INITIAL_SAFE_ZONES: SafeZoneModel[] = [
  {
    id: 'sz_1',
    name: 'Rumah Utama (Senopati)',
    address: 'Jl. Senopati Indah No. 12, Kebayoran Baru, Jakarta Selatan',
    latitude: -6.2297,
    longitude: 106.8091,
    radiusMeters: 200,
    notifyOnEnter: true,
    notifyOnExit: true,
    activeMembersCount: 2,
    category: 'Home',
    icon: 'home',
    color: 'emerald',
  },
  {
    id: 'sz_2',
    name: 'Sekolah SMA 8 Jakarta',
    address: 'Jl. Taman Bukit Duri No. 2, Tebet, Jakarta Selatan',
    latitude: -6.2115,
    longitude: 106.8229,
    radiusMeters: 300,
    notifyOnEnter: true,
    notifyOnExit: true,
    activeMembersCount: 1,
    category: 'School',
    icon: 'school',
    color: 'amber',
  },
  {
    id: 'sz_3',
    name: 'Kantor Sudirman PT Maju Jaya',
    address: 'Gedung Sudirman Tower Lt. 18, Jakarta Selatan',
    latitude: -6.2088,
    longitude: 106.8456,
    radiusMeters: 250,
    notifyOnEnter: true,
    notifyOnExit: true,
    activeMembersCount: 1,
    category: 'Office',
    icon: 'building',
    color: 'blue',
  },
];

const INITIAL_CONSENT: ConsentModel = {
  userId: 'usr_fai_me',
  shareLocationEnabled: true,
  selectedMemberIds: ['all'],
  pauseSharing: false,
  hideLocation: false,
  termsAccepted: true,
  privacyAcceptedAt: new Date().toISOString(),
};

const INITIAL_PERMISSIONS: LocationPermissionModel = {
  userId: 'usr_fai_me',
  locationPermission: 'Granted',
  backgroundLocationPermission: 'While Using App',
  preciseLocation: true,
  notificationPermission: true,
  updatedAt: new Date().toISOString(),
};

const INITIAL_TRACKING: TrackingSettingModel = {
  userId: 'usr_fai_me',
  refreshIntervalMinutes: 5,
  mode: 'Balanced',
  pauseTracking: false,
  geofenceAlerts: true,
  soundAlerts: true,
  backgroundSync: true,
};

export class LocationRepository {
  static getLiveLocations(): LiveLocationModel[] {
    const raw = localStorage.getItem(STORAGE_KEYS.LIVE_LOCATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LIVE_LOCATIONS, JSON.stringify(INITIAL_LOCATIONS));
      return INITIAL_LOCATIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_LOCATIONS;
    }
  }

  static saveLiveLocations(locations: LiveLocationModel[]): void {
    localStorage.setItem(STORAGE_KEYS.LIVE_LOCATIONS, JSON.stringify(locations));
  }

  static getRegisteredDevices(): DeviceModel[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_DEVICES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_DEVICES, JSON.stringify(INITIAL_DEVICES));
      return INITIAL_DEVICES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_DEVICES;
    }
  }

  static saveRegisteredDevices(devices: DeviceModel[]): void {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_DEVICES, JSON.stringify(devices));
  }

  static getSafeZones(): SafeZoneModel[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SAFE_ZONES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SAFE_ZONES, JSON.stringify(INITIAL_SAFE_ZONES));
      return INITIAL_SAFE_ZONES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_SAFE_ZONES;
    }
  }

  static saveSafeZones(zones: SafeZoneModel[]): void {
    localStorage.setItem(STORAGE_KEYS.SAFE_ZONES, JSON.stringify(zones));
  }

  static getConsent(userId: string): ConsentModel {
    const raw = localStorage.getItem(`${STORAGE_KEYS.PRIVACY_CONSENTS}_${userId}`);
    if (!raw) {
      localStorage.setItem(
        `${STORAGE_KEYS.PRIVACY_CONSENTS}_${userId}`,
        JSON.stringify(INITIAL_CONSENT)
      );
      return INITIAL_CONSENT;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_CONSENT;
    }
  }

  static saveConsent(userId: string, consent: ConsentModel): void {
    localStorage.setItem(`${STORAGE_KEYS.PRIVACY_CONSENTS}_${userId}`, JSON.stringify(consent));
  }

  static getPermissions(userId: string): LocationPermissionModel {
    const raw = localStorage.getItem(`${STORAGE_KEYS.LOCATION_PERMISSIONS}_${userId}`);
    if (!raw) {
      localStorage.setItem(
        `${STORAGE_KEYS.LOCATION_PERMISSIONS}_${userId}`,
        JSON.stringify(INITIAL_PERMISSIONS)
      );
      return INITIAL_PERMISSIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_PERMISSIONS;
    }
  }

  static savePermissions(userId: string, perms: LocationPermissionModel): void {
    localStorage.setItem(`${STORAGE_KEYS.LOCATION_PERMISSIONS}_${userId}`, JSON.stringify(perms));
  }

  static getTrackingSettings(userId: string): TrackingSettingModel {
    const raw = localStorage.getItem(`${STORAGE_KEYS.TRACKING_SETTINGS}_${userId}`);
    if (!raw) {
      localStorage.setItem(
        `${STORAGE_KEYS.TRACKING_SETTINGS}_${userId}`,
        JSON.stringify(INITIAL_TRACKING)
      );
      return INITIAL_TRACKING;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_TRACKING;
    }
  }

  static saveTrackingSettings(userId: string, settings: TrackingSettingModel): void {
    localStorage.setItem(`${STORAGE_KEYS.TRACKING_SETTINGS}_${userId}`, JSON.stringify(settings));
  }

  static getLocationHistory(userId?: string): LocationHistoryModel[] {
    const raw = localStorage.getItem(STORAGE_KEYS.LOCATION_HISTORY);
    if (!raw) {
      const today = new Date().toISOString().slice(0, 10);
      const mockHistory: LocationHistoryModel[] = [
        {
          id: 'hist_1',
          userId: 'usr_fai_father',
          memberName: 'Bapak Hendra',
          timestamp: '07:30 WIB',
          dateStr: today,
          latitude: -6.2297,
          longitude: 106.8091,
          address: 'Berangkat dari Rumah Utama Senopati',
          speedKmH: 25,
          movementStatus: 'Driving',
        },
        {
          id: 'hist_2',
          userId: 'usr_fai_father',
          memberName: 'Bapak Hendra',
          timestamp: '08:05 WIB',
          dateStr: today,
          latitude: -6.2088,
          longitude: 106.8456,
          address: 'Tiba di Kantor PT Maju Jaya Sudirman',
          speedKmH: 0,
          movementStatus: 'Stopped',
        },
        {
          id: 'hist_3',
          userId: 'usr_fai_child1',
          memberName: 'Rizky',
          timestamp: '06:45 WIB',
          dateStr: today,
          latitude: -6.2297,
          longitude: 106.8091,
          address: 'Berangkat dari Rumah Senopati',
          speedKmH: 15,
          movementStatus: 'Traveling',
        },
        {
          id: 'hist_4',
          userId: 'usr_fai_child1',
          memberName: 'Rizky',
          timestamp: '07:12 WIB',
          dateStr: today,
          latitude: -6.2115,
          longitude: 106.8229,
          address: 'Tiba di Sekolah SMA Negeri 8 Jakarta',
          speedKmH: 0,
          movementStatus: 'Stopped',
        },
      ];
      localStorage.setItem(STORAGE_KEYS.LOCATION_HISTORY, JSON.stringify(mockHistory));
      return userId ? mockHistory.filter((h) => h.userId === userId) : mockHistory;
    }
    try {
      const all: LocationHistoryModel[] = JSON.parse(raw);
      return userId ? all.filter((h) => h.userId === userId) : all;
    } catch {
      return [];
    }
  }

  static addHistoryEntry(entry: LocationHistoryModel): void {
    const history = this.getLocationHistory();
    const updated = [entry, ...history];
    localStorage.setItem(STORAGE_KEYS.LOCATION_HISTORY, JSON.stringify(updated));
  }
}
