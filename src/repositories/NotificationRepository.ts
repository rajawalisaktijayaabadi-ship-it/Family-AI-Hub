import { NotificationModel } from '../types/dashboard';

const STORAGE_KEY_NOTIFS = 'familyai_notifications_v1';

export const DEFAULT_NOTIFICATIONS: NotificationModel[] = [
  {
    id: 'notif_1',
    title: 'Pengingat AI Orchestrator 🤖',
    message: 'Ibu Siti menjadwalkan pemeriksaan kesehatan rutin besok jam 09.00 WIB.',
    category: 'ai',
    timestamp: '10 menit lalu',
    isRead: false,
    senderName: 'Gemini AI Hub',
  },
  {
    id: 'notif_2',
    title: 'Update Aktivitas Keluarga 👨‍👩‍👧',
    message: 'Budi Rahardjo baru saja check-in di Safe Zone Kantor Gedung Senopati.',
    category: 'family',
    timestamp: '1 jam lalu',
    isRead: false,
    senderName: 'Budi Rahardjo',
  },
  {
    id: 'notif_3',
    title: 'Pengingat Agenda & Les Anak 📚',
    message: 'Les Matematika Ahmad Rizky dijadwalkan pukul 15.30 WIB hari ini.',
    category: 'reminder',
    timestamp: '2 jam lalu',
    isRead: true,
    senderName: 'Kalender Keluarga',
  },
  {
    id: 'notif_4',
    title: 'Pengumuman Workspace Keluarga 📢',
    message: 'Ibu Siti menambahkan 3 daftar belanja kebutuhan bulanan baru.',
    category: 'announcement',
    timestamp: 'Yesterday',
    isRead: true,
    senderName: 'Workspace Admin',
  },
  {
    id: 'notif_5',
    title: 'Pembaruan Sistem Aplikasi ⚡',
    message: 'FamilyAI Hub Mobile Web v3.0 telah berhasil diperbarui dengan performa lebih cepat.',
    category: 'system',
    timestamp: '2 hari lalu',
    isRead: true,
    senderName: 'Sistem Hub',
  },
];

export class NotificationRepository {
  static getNotifications(): NotificationModel[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Failed to load notifications from localStorage', err);
    }
    return DEFAULT_NOTIFICATIONS;
  }

  static saveNotifications(notifications: NotificationModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
    } catch (err) {
      console.warn('Failed to save notifications to localStorage', err);
    }
  }

  static markAllAsRead(): NotificationModel[] {
    const list = this.getNotifications().map((n) => ({ ...n, isRead: true }));
    this.saveNotifications(list);
    return list;
  }

  static clearAll(): NotificationModel[] {
    this.saveNotifications([]);
    return [];
  }
}
