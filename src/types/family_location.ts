import { z } from 'zod';

export type FamilyRole =
  | 'Owner'
  | 'Father'
  | 'Mother'
  | 'Child'
  | 'Grandparent'
  | 'Guardian'
  | 'Guest'
  | 'Custom Role';

export type InvitationStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Expired' | 'Revoked';

export interface InvitationModel {
  id: string;
  code: string;
  link: string;
  qrData: string;
  familyId: string;
  familyName: string;
  inviterName: string;
  role: FamilyRole;
  status: InvitationStatus;
  createdAt: string;
  expiresAt: string;
  maxUses: number;
  usedCount: number;
  recipientEmail?: string;
}

export interface FamilyMemberModel {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: FamilyRole;
  avatarUrl?: string;
  joinedAt: string;
  isOnline: boolean;
  batteryLevel: number;
  locationConsentGranted: boolean;
  currentDeviceId?: string;
}

export interface DeviceModel {
  id: string;
  userId: string;
  memberName: string;
  deviceId: string;
  deviceName: string;
  brand: string;
  model: string;
  operatingSystem: string;
  browser: string;
  pwaStatus: 'Installed' | 'Browser' | 'Standalone';
  pushToken: string;
  batteryLevel: number;
  networkStatus: 'Wi-Fi' | '4G/5G' | 'Offline';
  isOnline: boolean;
  registeredAt: string;
  lastSyncAt: string;
}

export interface LocationPermissionModel {
  userId: string;
  locationPermission: 'Granted' | 'Denied' | 'Prompt';
  backgroundLocationPermission: 'Always Allow' | 'While Using App' | 'Never Allow';
  preciseLocation: boolean;
  notificationPermission: boolean;
  updatedAt: string;
}

export interface ConsentModel {
  userId: string;
  shareLocationEnabled: boolean;
  selectedMemberIds: string[]; // 'all' or list of member IDs
  pauseSharing: boolean;
  hideLocation: boolean;
  termsAccepted: boolean;
  privacyAcceptedAt: string;
}

export type MovementStatus = 'Stopped' | 'Walking' | 'Driving' | 'Traveling';

export interface LiveLocationModel {
  id: string;
  userId: string;
  memberName: string;
  role: FamilyRole;
  avatarBg: string;
  latitude: number;
  longitude: number;
  address: string;
  accuracyMeters: number;
  movementStatus: MovementStatus;
  speedKmH: number;
  batteryLevel: number;
  networkStatus: string;
  isOnline: boolean;
  lastSeen: string;
  isSharingLocation: boolean;
  isInSafeZone?: boolean;
  safeZoneName?: string;
}

export interface LocationHistoryModel {
  id: string;
  userId: string;
  memberName: string;
  timestamp: string;
  dateStr: string; // YYYY-MM-DD
  latitude: number;
  longitude: number;
  address: string;
  speedKmH: number;
  movementStatus: MovementStatus;
}

export interface SafeZoneModel {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  notifyOnEnter: boolean;
  notifyOnExit: boolean;
  activeMembersCount: number;
  category: 'Home' | 'School' | 'Office' | 'Hospital' | 'Custom';
  icon: string;
  color: string;
}

export interface TrackingSettingModel {
  userId: string;
  refreshIntervalMinutes: number;
  mode: 'High Accuracy' | 'Balanced' | 'Battery Saver';
  pauseTracking: boolean;
  geofenceAlerts: boolean;
  soundAlerts: boolean;
  backgroundSync: boolean;
}

export interface SOSModel {
  id: string;
  userId: string;
  senderName: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  address: string;
  batteryLevel: number;
  status: 'Active' | 'Resolved' | 'Testing';
  notes?: string;
  emergencyContactsNotified: number;
}

// Zod Schemas
export const CreateInvitationSchema = z.object({
  role: z.enum(['Owner', 'Father', 'Mother', 'Child', 'Grandparent', 'Guardian', 'Guest', 'Custom Role']),
  recipientEmail: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  maxUses: z.number().min(1).max(50),
});

export const JoinFamilySchema = z.object({
  invitationCode: z.string().min(6, 'Kode undangan minimal 6 karakter'),
  memberName: z.string().min(2, 'Nama lengkap wajib diisi'),
  role: z.enum(['Father', 'Mother', 'Child', 'Grandparent', 'Guardian', 'Guest', 'Custom Role']),
});

export const SafeZoneSchema = z.object({
  name: z.string().min(2, 'Nama zona aman minimal 2 karakter'),
  address: z.string().min(3, 'Alamat zona wajib diisi'),
  radiusMeters: z.number().min(50, 'Radius minimal 50 meter').max(5000, 'Radius maksimal 5000 meter'),
  category: z.enum(['Home', 'School', 'Office', 'Hospital', 'Custom']),
  notifyOnEnter: z.boolean(),
  notifyOnExit: z.boolean(),
});

export const SOSAlertSchema = z.object({
  senderName: z.string().min(1, 'Nama pengirim wajib diisi'),
  notes: z.string().optional(),
});
