import { create } from 'zustand';
import { WidgetModel, LayoutModel, FavoriteModuleModel, QuickActionModel } from '../types/dashboard';
import { WidgetService } from '../services/WidgetService';
import { DashboardService } from '../services/DashboardService';
import { DashboardRepository } from '../repositories/DashboardRepository';

interface DashboardState {
  widgets: WidgetModel[];
  layout: LayoutModel;
  favoriteModules: FavoriteModuleModel[];
  quickActions: QuickActionModel[];
  isCustomizing: boolean;
  searchQuery: string;
  isRefreshing: boolean;
  isOfflineCached: boolean;

  // Actions
  fetchDashboard: () => void;
  toggleWidgetVisibility: (id: string) => void;
  toggleWidgetPin: (id: string) => void;
  reorderWidgets: (startIndex: number, endIndex: number) => void;
  moveWidgetUp: (id: string) => void;
  moveWidgetDown: (id: string) => void;
  resetWidgets: () => void;
  setIsCustomizing: (val: boolean) => void;
  setSearchQuery: (query: string) => void;
  setDensity: (density: 'compact' | 'comfortable') => void;
  setAccentColor: (color: LayoutModel['accentColor']) => void;
  togglePinFavorite: (id: string) => void;
  refreshDashboard: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  widgets: WidgetService.getAllWidgets(),
  layout: DashboardRepository.getLayout(),
  favoriteModules: DashboardService.getFavoriteModules(),
  quickActions: DashboardRepository.getQuickActions(),
  isCustomizing: false,
  searchQuery: '',
  isRefreshing: false,
  isOfflineCached: false,

  fetchDashboard: () => {
    const widgets = WidgetService.getAllWidgets();
    const layout = DashboardRepository.getLayout();
    const favoriteModules = DashboardService.getFavoriteModules();
    set({ widgets, layout, favoriteModules });
  },

  toggleWidgetVisibility: (id) => {
    const updated = WidgetService.toggleWidgetVisibility(id);
    set({ widgets: updated });
  },

  toggleWidgetPin: (id) => {
    const updated = WidgetService.toggleWidgetPin(id);
    set({ widgets: updated });
  },

  reorderWidgets: (startIndex, endIndex) => {
    const updated = WidgetService.reorderWidgets(startIndex, endIndex);
    set({ widgets: updated });
  },

  moveWidgetUp: (id) => {
    const { widgets } = get();
    const index = widgets.findIndex((w) => w.id === id);
    if (index > 0) {
      const updated = WidgetService.reorderWidgets(index, index - 1);
      set({ widgets: updated });
    }
  },

  moveWidgetDown: (id) => {
    const { widgets } = get();
    const index = widgets.findIndex((w) => w.id === id);
    if (index >= 0 && index < widgets.length - 1) {
      const updated = WidgetService.reorderWidgets(index, index + 1);
      set({ widgets: updated });
    }
  },

  resetWidgets: () => {
    const reset = WidgetService.resetWidgets();
    const layout = DashboardService.updateLayout({ density: 'comfortable', accentColor: 'indigo' });
    set({ widgets: reset, layout });
  },

  setIsCustomizing: (val) => set({ isCustomizing: val }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setDensity: (density) => {
    const updatedLayout = DashboardService.updateLayout({ density });
    set({ layout: updatedLayout });
  },

  setAccentColor: (accentColor) => {
    const updatedLayout = DashboardService.updateLayout({ accentColor });
    set({ layout: updatedLayout });
  },

  togglePinFavorite: (id) => {
    const updated = DashboardService.togglePinFavoriteModule(id);
    set({ favoriteModules: updated });
  },

  refreshDashboard: () => {
    set({ isRefreshing: true });
    setTimeout(() => {
      set({
        isRefreshing: false,
        widgets: WidgetService.getAllWidgets(),
        favoriteModules: DashboardService.getFavoriteModules(),
      });
    }, 800);
  },
}));
