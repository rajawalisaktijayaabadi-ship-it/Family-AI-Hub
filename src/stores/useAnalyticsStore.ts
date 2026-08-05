import { create } from 'zustand';
import {
  AnalyticsModel,
  ReportModel,
  InsightModel,
  NotificationModel,
  AnnouncementModel,
  AuditLogModel,
  SystemStatusModel,
  FeatureFlagModel,
  AdminModel,
} from '../types/analytics';
import { MockAnalyticsService } from '../services/MockAnalyticsService';
import { useToastStore } from './useToastStore';

interface AnalyticsStoreState {
  analytics: AnalyticsModel;
  reports: ReportModel[];
  insights: InsightModel[];
  notifications: NotificationModel[];
  announcements: AnnouncementModel[];
  auditLogs: AuditLogModel[];
  featureFlags: FeatureFlagModel[];
  adminStats: AdminModel;
  systemStatus: SystemStatusModel;

  // Actions
  initialize: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  togglePinNotification: (id: string) => void;
  archiveNotification: (id: string) => void;
  generateReport: (category: string, timeframe: string) => void;
  toggleFeatureFlag: (id: string) => void;
  addAuditLog: (action: AuditLogModel['action'], module: string, details: string) => void;
}

export const useAnalyticsStore = create<AnalyticsStoreState>((set, get) => ({
  analytics: MockAnalyticsService.getInitialAnalytics(),
  reports: MockAnalyticsService.getInitialReports(),
  insights: MockAnalyticsService.getInitialInsights(),
  notifications: MockAnalyticsService.getInitialNotifications(),
  announcements: MockAnalyticsService.getInitialAnnouncements(),
  auditLogs: MockAnalyticsService.getInitialAuditLogs(),
  featureFlags: MockAnalyticsService.getInitialFeatureFlags(),
  adminStats: MockAnalyticsService.getInitialAdminStats(),
  systemStatus: MockAnalyticsService.getInitialSystemStatus(),

  initialize: () => {
    // If empty or initial sync
    if (!get().reports.length) {
      set({
        analytics: MockAnalyticsService.getInitialAnalytics(),
        reports: MockAnalyticsService.getInitialReports(),
        insights: MockAnalyticsService.getInitialInsights(),
        notifications: MockAnalyticsService.getInitialNotifications(),
        announcements: MockAnalyticsService.getInitialAnnouncements(),
        auditLogs: MockAnalyticsService.getInitialAuditLogs(),
        featureFlags: MockAnalyticsService.getInitialFeatureFlags(),
        adminStats: MockAnalyticsService.getInitialAdminStats(),
        systemStatus: MockAnalyticsService.getInitialSystemStatus(),
      });
    }
  },

  markNotificationAsRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    }));
    useToastStore.getState().addToast('Semua notifikasi ditandai dibaca', 'success');
  },

  togglePinNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isPinned: !n.isPinned } : n
      ),
    }));
  },

  archiveNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
    useToastStore.getState().addToast('Notifikasi telah diarsipkan', 'info');
  },

  generateReport: (category: string, timeframe: string) => {
    const newReport: ReportModel = {
      id: `rep_${Date.now()}`,
      title: `Laporan ${category} (${timeframe}) - ${new Date().toLocaleDateString('id-ID')}`,
      category,
      timeframe,
      dateRange: 'Periode Terkini',
      summary: `Ringkasan otomatis tergenerasi untuk kategori ${category} dengan indikator performa stabil dan optimal.`,
      keyMetrics: { 'Skor Indeks': 90, 'Status Terverifikasi': 'Aman' },
      generatedAt: new Date().toISOString().slice(0, 10),
    };

    set((state) => ({
      reports: [newReport, ...state.reports],
    }));

    get().addAuditLog('Export', 'Report Center', `Membuat laporan ${category} ${timeframe}`);
    useToastStore.getState().addToast(`Laporan ${category} berhasil dibuat`, 'success');
  },

  toggleFeatureFlag: (id: string) => {
    set((state) => ({
      featureFlags: state.featureFlags.map((ff) =>
        ff.id === id ? { ...ff, isEnabled: !ff.isEnabled } : ff
      ),
    }));
    const flag = get().featureFlags.find((f) => f.id === id);
    if (flag) {
      get().addAuditLog('Update', 'Super Admin', `Mengubah feature flag ${flag.name}`);
      useToastStore.getState().addToast(`Feature flag ${flag.name} diperbarui`, 'info');
    }
  },

  addAuditLog: (action, module, details) => {
    const newLog: AuditLogModel = {
      id: `log_${Date.now()}`,
      actor: 'User (Session)',
      action,
      module,
      details,
      ipAddress: '180.252.11.45',
      timestamp: new Date().toLocaleString('id-ID'),
    };

    set((state) => ({
      auditLogs: [newLog, ...state.auditLogs],
    }));
  },
}));
