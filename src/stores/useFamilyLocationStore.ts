import { create } from 'zustand';
import {
  InvitationModel,
  LiveLocationModel,
  LocationHistoryModel,
  DeviceModel,
  SafeZoneModel,
  ConsentModel,
  LocationPermissionModel,
  TrackingSettingModel,
  SOSModel,
  FamilyRole,
} from '../types/family_location';
import { LocationRepository } from '../repositories/LocationRepository';
import { LocationService } from '../services/LocationService';
import { DeviceService } from '../services/DeviceService';
import { ConsentService } from '../services/ConsentService';
import { TrackingService } from '../services/TrackingService';
import { InvitationService } from '../services/InvitationService';
import { MapProvider, MapStyleMode } from '../services/MapProviderService';
import { useToastStore } from './useToastStore';

interface FamilyLocationState {
  invitations: InvitationModel[];
  liveLocations: LiveLocationModel[];
  locationHistory: LocationHistoryModel[];
  registeredDevices: DeviceModel[];
  safeZones: SafeZoneModel[];
  myConsent: ConsentModel;
  myPermissions: LocationPermissionModel;
  trackingSettings: TrackingSettingModel;
  activeSOS: SOSModel | null;
  selectedMemberId: string | null;
  mapProvider: MapProvider;
  mapStyle: MapStyleMode;
  isLoading: boolean;

  // Actions
  initialize: (currentUserId?: string) => void;
  createInvitation: (role: FamilyRole, recipientEmail?: string, maxUses?: number) => InvitationModel;
  revokeInvitation: (id: string) => void;
  acceptInvitationByCode: (code: string, memberName: string, role: FamilyRole) => boolean;
  updateMyLocation: (lat: number, lng: number, address?: string) => void;
  simulateLocationMovement: () => void;
  registerCurrentDevice: (userId: string, memberName: string) => void;
  updateConsent: (newConsent: Partial<ConsentModel>) => void;
  updatePermissions: (newPerms: Partial<LocationPermissionModel>) => void;
  updateTrackingSettings: (newSettings: Partial<TrackingSettingModel>) => void;
  createSafeZone: (zone: Omit<SafeZoneModel, 'id' | 'activeMembersCount'>) => void;
  deleteSafeZone: (id: string) => void;
  triggerSOS: (notes?: string) => void;
  resolveSOS: () => void;
  setMapProvider: (provider: MapProvider) => void;
  setMapStyle: (style: MapStyleMode) => void;
  setSelectedMemberId: (id: string | null) => void;
}

const CURRENT_USER_ID = 'usr_fai_me';

export const useFamilyLocationStore = create<FamilyLocationState>((set, get) => ({
  invitations: [],
  liveLocations: [],
  locationHistory: [],
  registeredDevices: [],
  safeZones: [],
  myConsent: {
    userId: CURRENT_USER_ID,
    shareLocationEnabled: true,
    selectedMemberIds: ['all'],
    pauseSharing: false,
    hideLocation: false,
    termsAccepted: true,
    privacyAcceptedAt: new Date().toISOString(),
  },
  myPermissions: {
    userId: CURRENT_USER_ID,
    locationPermission: 'Granted',
    backgroundLocationPermission: 'While Using App',
    preciseLocation: true,
    notificationPermission: true,
    updatedAt: new Date().toISOString(),
  },
  trackingSettings: {
    userId: CURRENT_USER_ID,
    refreshIntervalMinutes: 5,
    mode: 'Balanced',
    pauseTracking: false,
    geofenceAlerts: true,
    soundAlerts: true,
    backgroundSync: true,
  },
  activeSOS: null,
  selectedMemberId: null,
  mapProvider: 'OpenStreetMap',
  mapStyle: 'Light',
  isLoading: false,

  initialize: (currentUserId = CURRENT_USER_ID) => {
    set({ isLoading: true });

    // Fetch initial data
    const rawInvs = InvitationService.getInvitations();
    const formattedInvs: InvitationModel[] = rawInvs.map((inv) => ({
      id: inv.id,
      code: inv.inviteCode || `FAI-${Math.floor(1000 + Math.random() * 9000)}`,
      link: `https://familyai.app/join?code=${inv.inviteCode || 'FAI-9921'}`,
      qrData: JSON.stringify({ code: inv.inviteCode, family: inv.workspaceName }),
      familyId: inv.workspaceId,
      familyName: inv.workspaceName,
      inviterName: inv.inviterName,
      role: (inv.roleName as FamilyRole) || 'Father',
      status: inv.status === 'accepted' ? 'Accepted' : inv.status === 'rejected' ? 'Rejected' : 'Pending',
      createdAt: inv.createdAt,
      expiresAt: inv.expiresAt,
      maxUses: 5,
      usedCount: 1,
      recipientEmail: inv.inviteeEmail,
    }));

    const liveLocations = LocationService.getLiveLocations(currentUserId);
    const registeredDevices = DeviceService.getDevices();
    const safeZones = LocationService.getSafeZones();
    const myConsent = ConsentService.getConsent(currentUserId);
    const myPermissions = ConsentService.getPermissions(currentUserId);
    const trackingSettings = TrackingService.getSettings(currentUserId);
    const locationHistory = LocationRepository.getLocationHistory();

    set({
      invitations: formattedInvs,
      liveLocations,
      registeredDevices,
      safeZones,
      myConsent,
      myPermissions,
      trackingSettings,
      locationHistory,
      isLoading: false,
    });
  },

  createInvitation: (role, recipientEmail, maxUses = 5) => {
    const code = `FAI-${Math.floor(1000 + Math.random() * 9000)}-${role.toUpperCase().slice(0, 3)}`;
    const newInv: InvitationModel = {
      id: `inv_loc_${Date.now()}`,
      code,
      link: `https://familyai.app/join?code=${code}`,
      qrData: JSON.stringify({ code, family: 'Keluarga Utama Hendra' }),
      familyId: 'ws_fai_primary',
      familyName: 'Keluarga Utama Hendra',
      inviterName: 'Bapak Hendra',
      role,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      maxUses,
      usedCount: 0,
      recipientEmail,
    };

    const current = get().invitations;
    const updated = [newInv, ...current];
    set({ invitations: updated });

    useToastStore.getState().addToast(`Undangan untuk role ${role} berhasil dibuat!`, 'success');
    return newInv;
  },

  revokeInvitation: (id) => {
    const updated = get().invitations.filter((inv) => inv.id !== id);
    set({ invitations: updated });
    useToastStore.getState().addToast('Undangan berhasil dibatalkan', 'info');
  },

  acceptInvitationByCode: (code, memberName, role) => {
    const inv = get().invitations.find((i) => i.code.toLowerCase() === code.trim().toLowerCase());
    if (inv) {
      const updatedInvs = get().invitations.map((i) =>
        i.id === inv.id ? { ...i, status: 'Accepted' as const, usedCount: i.usedCount + 1 } : i
      );

      // Register device and add to live locations
      const newLiveLoc: LiveLocationModel = {
        id: `loc_${Date.now()}`,
        userId: `usr_${Date.now()}`,
        memberName,
        role,
        avatarBg: 'bg-emerald-600',
        latitude: -6.2088,
        longitude: 106.8456,
        address: 'Baru saja bergabung (Lokasi Semanggi)',
        accuracyMeters: 10,
        movementStatus: 'Stopped',
        speedKmH: 0,
        batteryLevel: 95,
        networkStatus: '4G/5G',
        isOnline: true,
        lastSeen: 'Baru saja',
        isSharingLocation: true,
      };

      set({
        invitations: updatedInvs,
        liveLocations: [newLiveLoc, ...get().liveLocations],
      });

      useToastStore
        .getState()
        .addToast(`Selamat datang ${memberName}! Anda telah bergabung dalam keluarga.`, 'success');
      return true;
    }

    // Default match simulation for any valid code entry
    useToastStore.getState().addToast('Kode undangan valid! Bergabung dengan keluarga...', 'success');
    return true;
  },

  updateMyLocation: (lat, lng, address) => {
    const updated = LocationService.updateMyLocation(CURRENT_USER_ID, lat, lng, address);
    const history = LocationRepository.getLocationHistory();
    set({ liveLocations: updated, locationHistory: history });
    useToastStore.getState().addToast('Lokasi terkini berhasil diperbarui', 'info');
  },

  simulateLocationMovement: () => {
    const updated = LocationService.simulateMovement(CURRENT_USER_ID);
    set({ liveLocations: updated });
    useToastStore.getState().addToast('Simulasi gerakan GPS aktif', 'info');
  },

  registerCurrentDevice: (userId, memberName) => {
    const registered = DeviceService.registerCurrentDevice(userId, memberName);
    const devices = DeviceService.getDevices();
    set({ registeredDevices: devices });
    useToastStore
      .getState()
      .addToast(`Perangkat ${registered.deviceName} telah terdaftar untuk ${memberName}`, 'success');
  },

  updateConsent: (newConsent) => {
    const updated = ConsentService.updateConsent(CURRENT_USER_ID, newConsent);
    set({ myConsent: updated });

    if (newConsent.shareLocationEnabled === false) {
      useToastStore.getState().addToast('Berbagi lokasi telah dinonaktifkan (Mode Privasi)', 'warning');
    } else {
      useToastStore.getState().addToast('Pengaturan privasi lokasi diperbarui', 'success');
    }
  },

  updatePermissions: (newPerms) => {
    const updated = ConsentService.updatePermissions(CURRENT_USER_ID, newPerms);
    set({ myPermissions: updated });
    useToastStore.getState().addToast('Izin akses lokasi perangkat diperbarui', 'info');
  },

  updateTrackingSettings: (newSettings) => {
    const updated = TrackingService.updateSettings(CURRENT_USER_ID, newSettings);
    set({ trackingSettings: updated });
    useToastStore.getState().addToast('Pengaturan pelacakan GPS diperbarui', 'success');
  },

  createSafeZone: (zone) => {
    const created = LocationService.createSafeZone(zone);
    set({ safeZones: LocationService.getSafeZones() });
    useToastStore.getState().addToast(`Safe Zone "${created.name}" berhasil ditambahkan!`, 'success');
  },

  deleteSafeZone: (id) => {
    LocationService.deleteSafeZone(id);
    set({ safeZones: LocationService.getSafeZones() });
    useToastStore.getState().addToast('Safe zone berhasil dihapus', 'info');
  },

  triggerSOS: (notes = 'Bantuan darurat dibutuhkan!') => {
    const myLoc = get().liveLocations.find((l) => l.userId === CURRENT_USER_ID);
    const sos: SOSModel = {
      id: `sos_${Date.now()}`,
      userId: CURRENT_USER_ID,
      senderName: myLoc?.memberName || 'Bapak Hendra',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      latitude: myLoc?.latitude || -6.2088,
      longitude: myLoc?.longitude || 106.8456,
      address: myLoc?.address || 'Jl. Sudirman, Jakarta Pusat',
      batteryLevel: myLoc?.batteryLevel || 88,
      status: 'Active',
      notes,
      emergencyContactsNotified: 3,
    };

    set({ activeSOS: sos });
    useToastStore
      .getState()
      .addToast('🚨 SOS DARURAT DIAKTIFKAN! Lokasi dibagikan ke keluarga & kontak darurat', 'error');
  },

  resolveSOS: () => {
    set({ activeSOS: null });
    useToastStore.getState().addToast('Status SOS darurat telah diselesaikan', 'success');
  },

  setMapProvider: (provider) => {
    set({ mapProvider: provider });
  },

  setMapStyle: (style) => {
    set({ mapStyle: style });
  },

  setSelectedMemberId: (id) => {
    set({ selectedMemberId: id });
  },
}));
