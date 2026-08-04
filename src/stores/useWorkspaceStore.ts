import { create } from 'zustand';
import {
  WorkspaceModel,
  WorkspaceType,
  FamilyMemberModel,
  InvitationModel,
  RoleModel,
  RelationshipType,
  MemberStatus,
  FamilyRoleType,
  InvitationType,
  PermissionModel,
} from '../types/userWorkspace';
import { WorkspaceService } from '../services/WorkspaceService';
import { FamilyRepository, defaultRolesMock } from '../repositories/FamilyRepository';
import { InvitationService } from '../services/InvitationService';

interface WorkspaceState {
  workspaces: WorkspaceModel[];
  activeWorkspaceId: string;
  familyMembers: FamilyMemberModel[];
  invitations: InvitationModel[];
  roles: RoleModel[];

  // Search & Filters for Family Members
  searchQuery: string;
  filterRole: FamilyRoleType | 'ALL';
  filterStatus: MemberStatus | 'ALL';
  filterRelationship: RelationshipType | 'ALL';

  setSearchQuery: (query: string) => void;
  setFilterRole: (role: FamilyRoleType | 'ALL') => void;
  setFilterStatus: (status: MemberStatus | 'ALL') => void;
  setFilterRelationship: (rel: RelationshipType | 'ALL') => void;
  resetFilters: () => void;

  // Workspace Actions
  setActiveWorkspace: (id: string) => void;
  createWorkspace: (name: string, type: WorkspaceType, icon?: string, description?: string) => void;
  updateWorkspace: (id: string, updates: Partial<WorkspaceModel>) => void;
  deleteWorkspace: (id: string) => void;

  // Member Actions
  addMember: (member: Omit<FamilyMemberModel, 'id' | 'createdAt'>) => void;
  updateMember: (id: string, updates: Partial<FamilyMemberModel>) => void;
  deleteMember: (id: string) => void;

  // Invitation Actions
  createInvitation: (
    type: InvitationType,
    roleName: FamilyRoleType,
    email?: string
  ) => InvitationModel;
  updateInvitationStatus: (id: string, status: 'accepted' | 'rejected') => void;
  revokeInvitation: (id: string) => void;

  // Role & Permissions Matrix Actions
  updateRolePermission: (roleId: string, permissionKey: keyof PermissionModel, value: boolean) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: WorkspaceService.getAllWorkspaces(),
  activeWorkspaceId: WorkspaceService.getActiveWorkspaceId(),
  familyMembers: FamilyRepository.getMembers(),
  invitations: InvitationService.getInvitations(),
  roles: defaultRolesMock,

  searchQuery: '',
  filterRole: 'ALL',
  filterStatus: 'ALL',
  filterRelationship: 'ALL',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterRole: (role) => set({ filterRole: role }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setFilterRelationship: (rel) => set({ filterRelationship: rel }),
  resetFilters: () => set({ searchQuery: '', filterRole: 'ALL', filterStatus: 'ALL', filterRelationship: 'ALL' }),

  setActiveWorkspace: (id) => {
    WorkspaceService.setActiveWorkspace(id);
    set({ activeWorkspaceId: id });
  },

  createWorkspace: (name, type, icon = '🏠', description) => {
    const newWs = WorkspaceService.createWorkspace(name, type, icon, description);
    set({
      workspaces: WorkspaceService.getAllWorkspaces(),
      activeWorkspaceId: newWs.id,
    });
  },

  updateWorkspace: (id, updates) => {
    const updated = WorkspaceService.updateWorkspace(id, updates);
    set({ workspaces: updated });
  },

  deleteWorkspace: (id) => {
    const updated = WorkspaceService.deleteWorkspace(id);
    const newActive = WorkspaceService.getActiveWorkspaceId();
    set({ workspaces: updated, activeWorkspaceId: newActive });
  },

  addMember: (memberData) => {
    const newMem: FamilyMemberModel = {
      ...memberData,
      id: `mem_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const current = get().familyMembers;
    const updated = [newMem, ...current];
    FamilyRepository.saveMembers(updated);
    set({ familyMembers: updated });
  },

  updateMember: (id, updates) => {
    const current = get().familyMembers;
    const updated = current.map((m) => (m.id === id ? { ...m, ...updates } : m));
    FamilyRepository.saveMembers(updated);
    set({ familyMembers: updated });
  },

  deleteMember: (id) => {
    const current = get().familyMembers;
    const updated = current.filter((m) => m.id !== id);
    FamilyRepository.saveMembers(updated);
    set({ familyMembers: updated });
  },

  createInvitation: (type, roleName, email) => {
    const activeWsId = get().activeWorkspaceId;
    const activeWs = get().workspaces.find((w) => w.id === activeWsId);
    const wsName = activeWs ? activeWs.name : 'Workspace Keluarga';

    const newInv = InvitationService.createInvitation(
      activeWsId,
      wsName,
      'Budi Rahardjo',
      type,
      roleName,
      email
    );
    set({ invitations: InvitationService.getInvitations() });
    return newInv;
  },

  updateInvitationStatus: (id, status) => {
    const updated = InvitationService.updateInvitationStatus(id, status);
    set({ invitations: updated });
  },

  revokeInvitation: (id) => {
    const updated = InvitationService.revokeInvitation(id);
    set({ invitations: updated });
  },

  updateRolePermission: (roleId, permissionKey, value) => {
    const currentRoles = get().roles;
    const updatedRoles = currentRoles.map((r) => {
      if (r.id === roleId) {
        return {
          ...r,
          permissions: {
            ...r.permissions,
            [permissionKey]: value,
          },
        };
      }
      return r;
    });
    set({ roles: updatedRoles });
  },
}));
