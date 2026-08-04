import { DashboardModel, LayoutModel, QuickActionModel, FavoriteModuleModel } from '../types/dashboard';

const STORAGE_KEY_LAYOUT = 'familyai_dashboard_layout_v1';
const STORAGE_KEY_FAVORITES = 'familyai_dashboard_favorites_v1';

export const DEFAULT_LAYOUT: LayoutModel = {
  density: 'comfortable',
  accentColor: 'indigo',
  gridCols: 2,
  widgets: [],
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_QUICK_ACTIONS: QuickActionModel[] = [
  {
    id: 'qa_mood',
    title: 'Mood Check',
    subtitle: 'Catat Perasaan',
    icon: 'Smile',
    category: 'mood',
    gradient: 'from-amber-500 to-orange-500',
    actionKey: 'OPEN_MOOD_MODAL',
    isPopular: true,
  },
  {
    id: 'qa_ai',
    title: 'AI Chat',
    subtitle: 'Asisten AI',
    icon: 'Sparkles',
    category: 'ai',
    gradient: 'from-indigo-600 to-purple-600',
    actionKey: 'OPEN_AI_CHAT',
    isPopular: true,
  },
  {
    id: 'qa_schedule',
    title: 'Tambah Jadwal',
    subtitle: 'Kalender / Agenda',
    icon: 'CalendarPlus',
    category: 'calendar',
    gradient: 'from-blue-600 to-cyan-500',
    actionKey: 'ADD_SCHEDULE_MODAL',
    isPopular: true,
  },
  {
    id: 'qa_note',
    title: 'Tambah Catatan',
    subtitle: 'Memo Keluarga',
    icon: 'FilePlus',
    category: 'notes',
    gradient: 'from-teal-500 to-emerald-600',
    actionKey: 'ADD_NOTE_MODAL',
  },
  {
    id: 'qa_finance',
    title: 'Pengeluaran',
    subtitle: 'Catat Belanja',
    icon: 'Wallet',
    category: 'finance',
    gradient: 'from-emerald-600 to-teal-600',
    actionKey: 'ADD_EXPENSE_MODAL',
    isPopular: true,
  },
  {
    id: 'qa_menu',
    title: 'Tambah Menu',
    subtitle: 'Rencana Makan',
    icon: 'Utensils',
    category: 'meal',
    gradient: 'from-rose-500 to-pink-500',
    actionKey: 'ADD_MENU_MODAL',
  },
  {
    id: 'qa_emergency',
    title: 'Emergency SOS',
    subtitle: 'Bantuan Darurat',
    icon: 'ShieldAlert',
    category: 'emergency',
    gradient: 'from-red-600 to-rose-700',
    isPopular: true,
    actionKey: 'OPEN_EMERGENCY_MODAL',
  },
  {
    id: 'qa_family',
    title: 'Anggota',
    subtitle: 'Ruang Keluarga',
    icon: 'Users',
    category: 'family',
    gradient: 'from-purple-600 to-indigo-700',
    actionKey: 'NAVIGATE_FAMILY_WORKSPACE',
  },
];

export const DEFAULT_FAVORITE_MODULES: FavoriteModuleModel[] = [
  {
    id: 'fav_mood',
    title: 'Mood & Jurnal AI',
    icon: 'Smile',
    route: 'mood',
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    order: 1,
    isPinned: true,
  },
  {
    id: 'fav_health',
    title: 'Kesehatan & Obat',
    icon: 'Activity',
    route: 'health',
    color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800',
    order: 2,
    isPinned: true,
  },
  {
    id: 'fav_finance',
    title: 'Keuangan & Belanja',
    icon: 'Wallet',
    route: 'finance',
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
    order: 3,
    isPinned: true,
  },
  {
    id: 'fav_education',
    title: 'Pendidikan Anak',
    icon: 'GraduationCap',
    route: 'education',
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800',
    order: 4,
    isPinned: true,
  },
  {
    id: 'fav_meal',
    title: 'Menu & Belanja',
    icon: 'Utensils',
    route: 'meal',
    color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
    order: 5,
    isPinned: false,
  },
  {
    id: 'fav_calendar',
    title: 'Kalender Bersama',
    icon: 'Calendar',
    route: 'calendar',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
    order: 6,
    isPinned: false,
  },
];

export class DashboardRepository {
  static getDashboard(userId: string, workspaceId: string): DashboardModel {
    const layout = this.getLayout();
    return {
      id: `dash_${userId}_${workspaceId}`,
      userId,
      workspaceId,
      greeting: this.getGreetingByTime(),
      weather: {
        location: 'Jakarta, Indonesia',
        temperature: 29,
        condition: 'Cerah Berawan',
        humidity: 68,
        icon: 'CloudSun',
      },
      quote: {
        text: 'Keharmonisan dalam keluarga adalah fondasi terkuat untuk melangkah meraih setiap impian.',
        author: 'Kutipan Motivasi Keluarga',
      },
      layout,
      updatedAt: new Date().toISOString(),
    };
  }

  static getGreetingByTime(): string {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'Selamat Pagi 🌅';
    if (hour >= 11 && hour < 15) return 'Selamat Siang ☀️';
    if (hour >= 15 && hour < 18) return 'Selamat Sore 🌇';
    return 'Selamat Malam 🌙';
  }

  static getLayout(): LayoutModel {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LAYOUT);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Failed to parse layout from localStorage', err);
    }
    return DEFAULT_LAYOUT;
  }

  static saveLayout(layout: LayoutModel): void {
    try {
      localStorage.setItem(STORAGE_KEY_LAYOUT, JSON.stringify(layout));
    } catch (err) {
      console.warn('Failed to save layout to localStorage', err);
    }
  }

  static getFavoriteModules(): FavoriteModuleModel[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Failed to parse favorites from localStorage', err);
    }
    return DEFAULT_FAVORITE_MODULES;
  }

  static saveFavoriteModules(modules: FavoriteModuleModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(modules));
    } catch (err) {
      console.warn('Failed to save favorites to localStorage', err);
    }
  }

  static getQuickActions(): QuickActionModel[] {
    return DEFAULT_QUICK_ACTIONS;
  }
}
