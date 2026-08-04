import { WorkspaceModel } from '../types/userWorkspace';

const WORKSPACE_STORAGE_KEY = 'familyai_workspaces';
const ACTIVE_WORKSPACE_KEY = 'familyai_active_workspace_id';

export const initialWorkspacesMock: WorkspaceModel[] = [
  {
    id: 'ws_inti_01',
    name: 'Keluarga Inti Rahardjo',
    type: 'Keluarga Inti',
    icon: '🏠',
    description: 'Workspace utama untuk ayah, ibu, dan anak-anak.',
    ownerId: 'usr_fai_9921',
    createdAt: '2024-01-15T08:00:00Z',
    memberCount: 4,
  },
  {
    id: 'ws_besar_02',
    name: 'Keluarga Besar Sastrowardoyo',
    type: 'Keluarga Besar',
    icon: '🌳',
    description: 'Workspace silaturahmi kakek, nenek, paman, dan sepupu.',
    ownerId: 'usr_fai_9921',
    createdAt: '2024-02-10T10:30:00Z',
    memberCount: 8,
  },
  {
    id: 'ws_ortu_03',
    name: 'Keluarga Orang Tua',
    type: 'Orang Tua',
    icon: '❤️',
    description: 'Workspace khusus pendampingan kesehatan & aktivitas orang tua.',
    ownerId: 'usr_fai_9921',
    createdAt: '2024-03-01T14:15:00Z',
    memberCount: 3,
  },
];

export class WorkspaceRepository {
  static getWorkspaces(): WorkspaceModel[] {
    try {
      const stored = localStorage.getItem(WORKSPACE_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load workspaces:', e);
    }
    return initialWorkspacesMock;
  }

  static saveWorkspaces(workspaces: WorkspaceModel[]): void {
    try {
      localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspaces));
    } catch (e) {
      console.error('Failed to save workspaces:', e);
    }
  }

  static getActiveWorkspaceId(): string {
    try {
      const stored = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
      if (stored) return stored;
    } catch (e) {
      console.warn('Failed to load active workspace id:', e);
    }
    return initialWorkspacesMock[0].id;
  }

  static saveActiveWorkspaceId(id: string): void {
    try {
      localStorage.setItem(ACTIVE_WORKSPACE_KEY, id);
    } catch (e) {
      console.error('Failed to save active workspace id:', e);
    }
  }
}
