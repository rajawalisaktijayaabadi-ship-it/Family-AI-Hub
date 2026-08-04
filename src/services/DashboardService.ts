import { DashboardModel, LayoutModel, FavoriteModuleModel } from '../types/dashboard';
import { DashboardRepository } from '../repositories/DashboardRepository';

export class DashboardService {
  static getDashboard(userId: string, workspaceId: string): DashboardModel {
    return DashboardRepository.getDashboard(userId, workspaceId);
  }

  static updateLayout(layout: Partial<LayoutModel>): LayoutModel {
    const current = DashboardRepository.getLayout();
    const updated: LayoutModel = {
      ...current,
      ...layout,
      updatedAt: new Date().toISOString(),
    };
    DashboardRepository.saveLayout(updated);
    return updated;
  }

  static getFavoriteModules(): FavoriteModuleModel[] {
    return DashboardRepository.getFavoriteModules();
  }

  static saveFavoriteModules(modules: FavoriteModuleModel[]): FavoriteModuleModel[] {
    DashboardRepository.saveFavoriteModules(modules);
    return modules;
  }

  static togglePinFavoriteModule(id: string): FavoriteModuleModel[] {
    const current = DashboardRepository.getFavoriteModules();
    const updated = current.map((m) =>
      m.id === id ? { ...m, isPinned: !m.isPinned } : m
    );
    DashboardRepository.saveFavoriteModules(updated);
    return updated;
  }
}
