import { WidgetModel } from '../types/dashboard';

const STORAGE_KEY_WIDGETS = 'familyai_dashboard_widgets_v1';

export const DEFAULT_WIDGETS: WidgetModel[] = [
  {
    id: 'w_today_summary',
    title: 'Ringkasan Hari Ini',
    type: 'today_summary',
    category: 'summary',
    description: 'Agenda, tugas, dan sorotan aktivitas utama keluarga hari ini',
    icon: 'Calendar',
    isVisible: true,
    isPinned: true,
    order: 1,
    colSpan: 2,
  },
  {
    id: 'w_quick_actions',
    title: 'Pintasan Cepat (Quick Action)',
    type: 'quick_actions',
    category: 'action',
    description: 'Akses cepat Mood, Chat AI, Tambah Jadwal, Catatan, dan Darurat',
    icon: 'Zap',
    isVisible: true,
    isPinned: true,
    order: 2,
    colSpan: 2,
  },
  {
    id: 'w_weather',
    title: 'Prakiraan Cuaca & Lokasi',
    type: 'weather',
    category: 'utility',
    description: 'Suhu, kondisi cuaca, kelembapan, dan lokasi terdeteksi',
    icon: 'CloudSun',
    isVisible: true,
    isPinned: false,
    order: 3,
    colSpan: 1,
  },
  {
    id: 'w_quote',
    title: 'Kutipan & Motivasi Harian',
    type: 'quote_motivation',
    category: 'utility',
    description: 'Kata motivasi hari ini untuk menyemangati keluarga',
    icon: 'Quote',
    isVisible: true,
    isPinned: false,
    order: 4,
    colSpan: 1,
  },
  {
    id: 'w_family_overview',
    title: 'Ikhtisar Keluarga (Family Overview)',
    type: 'family_overview',
    category: 'overview',
    description: 'Kesehatan, Keuangan, Pendidikan, dan Keamanan Keluarga',
    icon: 'Users',
    isVisible: true,
    isPinned: true,
    order: 5,
    colSpan: 2,
  },
  {
    id: 'w_calendar_preview',
    title: 'Pratinjau Kalender & Event',
    type: 'calendar_preview',
    category: 'utility',
    description: 'Jadwal hari ini, besok, dan event penting minggu ini',
    icon: 'CalendarDays',
    isVisible: true,
    isPinned: false,
    order: 6,
    colSpan: 2,
  },
  {
    id: 'w_favorite_modules',
    title: 'Modul Favorit Tersemat',
    type: 'favorite_modules',
    category: 'action',
    description: 'Akses cepat ke modul-modul pilihan keluarga Anda',
    icon: 'Star',
    isVisible: true,
    isPinned: false,
    order: 7,
    colSpan: 2,
  },
  {
    id: 'w_recent_activity',
    title: 'Linimasa Aktivitas Terbaru',
    type: 'recent_activity',
    category: 'summary',
    description: 'Catatan aktivitas, update status, dan kabar anggota',
    icon: 'Activity',
    isVisible: true,
    isPinned: false,
    order: 8,
    colSpan: 2,
  },
  {
    id: 'w_chart_placeholder',
    title: 'Statistik & Analitik Keluarga',
    type: 'chart_placeholder',
    category: 'analytics',
    description: 'Grafik pengeluaran, produktivitas, dan skor kesehatan',
    icon: 'BarChart2',
    isVisible: true,
    isPinned: false,
    order: 9,
    colSpan: 2,
  },
  {
    id: 'w_ai_placeholder',
    title: 'Rekomendasi Pintar AI Orchestrator',
    type: 'ai_placeholder',
    category: 'ai',
    description: 'Saran otomatis AI untuk keharmonisan dan efisiensi keluarga',
    icon: 'Sparkles',
    isVisible: true,
    isPinned: false,
    order: 10,
    colSpan: 2,
  },
];

export class WidgetRepository {
  static getWidgets(): WidgetModel[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WIDGETS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Failed to load widgets from localStorage', err);
    }
    return DEFAULT_WIDGETS;
  }

  static saveWidgets(widgets: WidgetModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_WIDGETS, JSON.stringify(widgets));
    } catch (err) {
      console.warn('Failed to save widgets to localStorage', err);
    }
  }

  static resetToDefault(): WidgetModel[] {
    try {
      localStorage.removeItem(STORAGE_KEY_WIDGETS);
    } catch (err) {
      console.warn('Failed to reset widgets in localStorage', err);
    }
    return DEFAULT_WIDGETS;
  }
}
