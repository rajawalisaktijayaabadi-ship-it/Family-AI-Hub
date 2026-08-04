export type Gender = 'pria' | 'wanita';

export type WorkspaceType =
  | 'Keluarga Inti'
  | 'Keluarga Besar'
  | 'Orang Tua'
  | 'Custom Workspace';

export type RelationshipType =
  | 'Ayah'
  | 'Ibu'
  | 'Suami'
  | 'Istri'
  | 'Anak'
  | 'Kakek'
  | 'Nenek'
  | 'Paman'
  | 'Bibi'
  | 'Saudara'
  | 'Pengasuh'
  | 'Lainnya';

export type MemberStatus = 'Aktif' | 'Pending' | 'Inaktif';

export type FamilyRoleType =
  | 'Owner'
  | 'Admin Keluarga'
  | 'Orang Tua'
  | 'Wali'
  | 'Anak'
  | 'Tamu';

export interface PermissionModel {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  invite: boolean;
  manage: boolean;
  aiAccess: boolean;
}

export interface RoleModel {
  id: string;
  name: FamilyRoleType;
  isCustom: boolean;
  permissions: PermissionModel;
}

export interface UserModel {
  uid: string;
  fullName: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  province: string;
  city: string;
  language: 'id' | 'en';
  timezone: string;
  photoURL: string;
  coverURL: string;
  bio: string;
  subscriptionTier: 'FamilyAI Free' | 'FamilyAI Premium' | 'FamilyAI Ultimate';
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceModel {
  id: string;
  name: string;
  type: WorkspaceType;
  icon: string;
  description?: string;
  ownerId: string;
  createdAt: string;
  memberCount: number;
}

export interface FamilyMemberModel {
  id: string;
  workspaceId: string;
  userId?: string;
  photoURL?: string;
  name: string;
  nickname?: string;
  relationship: RelationshipType;
  dateOfBirth?: string;
  gender?: Gender;
  phoneNumber?: string;
  email?: string;
  status: MemberStatus;
  roleId: string;
  roleName: FamilyRoleType;
  createdAt: string;
}

export type InvitationType = 'email' | 'link' | 'qr';
export type InvitationStatus = 'pending' | 'accepted' | 'rejected';

export interface InvitationModel {
  id: string;
  workspaceId: string;
  workspaceName: string;
  invitedBy: string;
  inviterName: string;
  inviteeEmail?: string;
  inviteCode: string;
  type: InvitationType;
  roleName: FamilyRoleType;
  status: InvitationStatus;
  createdAt: string;
  expiresAt: string;
}

export type DeviceType = 'Android' | 'iPhone' | 'Tablet' | 'Desktop' | 'Foldable';

export interface DeviceModel {
  id: string;
  deviceName: string;
  deviceType: DeviceType;
  browser: string;
  lastActive: string;
  isCurrentDevice: boolean;
  isTrusted: boolean;
  ipAddress: string;
  location?: string;
}

export interface NotificationSettings {
  push: boolean;
  email: boolean;
  aiReminder: boolean;
  calendar: boolean;
  health: boolean;
  finance: boolean;
  education: boolean;
  family: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'family' | 'private';
  familyVisibility: 'members' | 'admins' | 'private';
  locationPermission: boolean;
  cameraPermission: boolean;
  microphonePermission: boolean;
}

export interface SecuritySettings {
  pinEnabled: boolean;
  pinCode?: string;
  biometricEnabled: boolean;
  sessionTimeoutMinutes: number;
}

export interface SettingsModel {
  theme: 'light' | 'dark' | 'system';
  language: 'id' | 'en';
  notification: NotificationSettings;
  privacy: PrivacySettings;
  security: SecuritySettings;
}
