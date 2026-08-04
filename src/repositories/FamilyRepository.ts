import {
  FamilyMemberModel,
  RoleModel,
  InvitationModel,
} from '../types/userWorkspace';

const MEMBERS_STORAGE_KEY = 'familyai_family_members';
const INVITATIONS_STORAGE_KEY = 'familyai_invitations';

export const defaultRolesMock: RoleModel[] = [
  {
    id: 'role_owner',
    name: 'Owner',
    isCustom: false,
    permissions: { view: true, create: true, update: true, delete: true, invite: true, manage: true, aiAccess: true },
  },
  {
    id: 'role_admin',
    name: 'Admin Keluarga',
    isCustom: false,
    permissions: { view: true, create: true, update: true, delete: true, invite: true, manage: false, aiAccess: true },
  },
  {
    id: 'role_ortu',
    name: 'Orang Tua',
    isCustom: false,
    permissions: { view: true, create: true, update: true, delete: false, invite: true, manage: false, aiAccess: true },
  },
  {
    id: 'role_wali',
    name: 'Wali',
    isCustom: false,
    permissions: { view: true, create: true, update: true, delete: false, invite: false, manage: false, aiAccess: true },
  },
  {
    id: 'role_anak',
    name: 'Anak',
    isCustom: false,
    permissions: { view: true, create: true, update: false, delete: false, invite: false, manage: false, aiAccess: true },
  },
  {
    id: 'role_tamu',
    name: 'Tamu',
    isCustom: false,
    permissions: { view: true, create: false, update: false, delete: false, invite: false, manage: false, aiAccess: false },
  },
];

export const initialMembersMock: FamilyMemberModel[] = [
  {
    id: 'mem_01',
    workspaceId: 'ws_inti_01',
    userId: 'usr_fai_9921',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    name: 'Budi Rahardjo',
    nickname: 'Budi',
    relationship: 'Ayah',
    dateOfBirth: '1985-06-15',
    gender: 'pria',
    phoneNumber: '+62 812-3456-7890',
    email: 'budi.rahardjo@familyai.id',
    status: 'Aktif',
    roleId: 'role_owner',
    roleName: 'Owner',
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: 'mem_02',
    workspaceId: 'ws_inti_01',
    photoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    name: 'Siti Aminah',
    nickname: 'Siti',
    relationship: 'Istri',
    dateOfBirth: '1988-09-22',
    gender: 'wanita',
    phoneNumber: '+62 813-9876-5432',
    email: 'siti.aminah@familyai.id',
    status: 'Aktif',
    roleId: 'role_admin',
    roleName: 'Admin Keluarga',
    createdAt: '2024-01-15T08:05:00Z',
  },
  {
    id: 'mem_03',
    workspaceId: 'ws_inti_01',
    photoURL: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    name: 'Ahmad Rizky',
    nickname: 'Rizky',
    relationship: 'Anak',
    dateOfBirth: '2012-03-10',
    gender: 'pria',
    phoneNumber: '+62 815-1122-3344',
    email: 'rizky.rahardjo@familyai.id',
    status: 'Aktif',
    roleId: 'role_anak',
    roleName: 'Anak',
    createdAt: '2024-01-16T10:00:00Z',
  },
  {
    id: 'mem_04',
    workspaceId: 'ws_inti_01',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    name: 'Mbak Dewi',
    nickname: 'Dewi',
    relationship: 'Pengasuh',
    dateOfBirth: '1995-11-04',
    gender: 'wanita',
    phoneNumber: '+62 857-9900-1122',
    email: 'dewi.pengasuh@gmail.com',
    status: 'Aktif',
    roleId: 'role_wali',
    roleName: 'Wali',
    createdAt: '2024-02-01T09:00:00Z',
  },
];

export const initialInvitationsMock: InvitationModel[] = [
  {
    id: 'inv_101',
    workspaceId: 'ws_inti_01',
    workspaceName: 'Keluarga Inti Rahardjo',
    invitedBy: 'usr_fai_9921',
    inviterName: 'Budi Rahardjo',
    inviteeEmail: 'paman.hadi@gmail.com',
    inviteCode: 'FAI-9821-X',
    type: 'email',
    roleName: 'Orang Tua',
    status: 'pending',
    createdAt: '2026-08-01T10:00:00Z',
    expiresAt: '2026-08-08T10:00:00Z',
  },
];

export class FamilyRepository {
  static getMembers(): FamilyMemberModel[] {
    try {
      const stored = localStorage.getItem(MEMBERS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load family members:', e);
    }
    return initialMembersMock;
  }

  static saveMembers(members: FamilyMemberModel[]): void {
    try {
      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
    } catch (e) {
      console.error('Failed to save family members:', e);
    }
  }

  static getInvitations(): InvitationModel[] {
    try {
      const stored = localStorage.getItem(INVITATIONS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load invitations:', e);
    }
    return initialInvitationsMock;
  }

  static saveInvitations(invitations: InvitationModel[]): void {
    try {
      localStorage.setItem(INVITATIONS_STORAGE_KEY, JSON.stringify(invitations));
    } catch (e) {
      console.error('Failed to save invitations:', e);
    }
  }
}
