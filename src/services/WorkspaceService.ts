import { WorkspaceModel, WorkspaceType } from '../types/userWorkspace';
import { WorkspaceRepository } from '../repositories/WorkspaceRepository';

export class WorkspaceService {
  static getAllWorkspaces(): WorkspaceModel[] {
    return WorkspaceRepository.getWorkspaces();
  }

  static getActiveWorkspaceId(): string {
    return WorkspaceRepository.getActiveWorkspaceId();
  }

  static setActiveWorkspace(id: string): void {
    WorkspaceRepository.saveActiveWorkspaceId(id);
  }

  static createWorkspace(name: string, type: WorkspaceType, icon: string = '🏠', description?: string): WorkspaceModel {
    const list = WorkspaceRepository.getWorkspaces();
    const newWs: WorkspaceModel = {
      id: `ws_${Date.now()}`,
      name,
      type,
      icon,
      description,
      ownerId: 'usr_fai_9921',
      createdAt: new Date().toISOString(),
      memberCount: 1,
    };
    const updatedList = [...list, newWs];
    WorkspaceRepository.saveWorkspaces(updatedList);
    WorkspaceRepository.saveActiveWorkspaceId(newWs.id);
    return newWs;
  }

  static updateWorkspace(id: string, updates: Partial<WorkspaceModel>): WorkspaceModel[] {
    const list = WorkspaceRepository.getWorkspaces();
    const updated = list.map((ws) => (ws.id === id ? { ...ws, ...updates } : ws));
    WorkspaceRepository.saveWorkspaces(updated);
    return updated;
  }

  static deleteWorkspace(id: string): WorkspaceModel[] {
    const list = WorkspaceRepository.getWorkspaces().filter((ws) => ws.id !== id);
    WorkspaceRepository.saveWorkspaces(list);
    if (list.length > 0) {
      WorkspaceRepository.saveActiveWorkspaceId(list[0].id);
    }
    return list;
  }
}
