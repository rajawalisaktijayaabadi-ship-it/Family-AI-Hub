import { InvitationModel, InvitationType, FamilyRoleType } from '../types/userWorkspace';
import { FamilyRepository } from '../repositories/FamilyRepository';

export class InvitationService {
  static getInvitations(): InvitationModel[] {
    return FamilyRepository.getInvitations();
  }

  static createInvitation(
    workspaceId: string,
    workspaceName: string,
    inviterName: string,
    type: InvitationType,
    roleName: FamilyRoleType,
    inviteeEmail?: string
  ): InvitationModel {
    const code = `FAI-${Math.floor(1000 + Math.random() * 9000)}-${type.toUpperCase().slice(0, 2)}`;
    const newInv: InvitationModel = {
      id: `inv_${Date.now()}`,
      workspaceId,
      workspaceName,
      invitedBy: 'usr_fai_9921',
      inviterName,
      inviteeEmail,
      inviteCode: code,
      type,
      roleName,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const current = FamilyRepository.getInvitations();
    const updated = [newInv, ...current];
    FamilyRepository.saveInvitations(updated);
    return newInv;
  }

  static updateInvitationStatus(id: string, status: 'accepted' | 'rejected'): InvitationModel[] {
    const current = FamilyRepository.getInvitations();
    const updated = current.map((inv) => (inv.id === id ? { ...inv, status } : inv));
    FamilyRepository.saveInvitations(updated);
    return updated;
  }

  static revokeInvitation(id: string): InvitationModel[] {
    const current = FamilyRepository.getInvitations();
    const updated = current.filter((inv) => inv.id !== id);
    FamilyRepository.saveInvitations(updated);
    return updated;
  }
}
