import { create } from 'zustand';
import { NotificationModel, NotificationCategory } from '../types/dashboard';
import { NotificationService } from '../services/NotificationService';

interface NotificationState {
  notifications: NotificationModel[];
  activeCategory: NotificationCategory | 'ALL';
  isOpen: boolean;

  fetchNotifications: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  setActiveCategory: (cat: NotificationCategory | 'ALL') => void;
  setIsOpen: (val: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: NotificationService.getNotifications(),
  activeCategory: 'ALL',
  isOpen: false,

  fetchNotifications: () => {
    set({ notifications: NotificationService.getNotifications() });
  },

  markAsRead: (id) => {
    const updated = NotificationService.markAsRead(id);
    set({ notifications: updated });
  },

  markAllAsRead: () => {
    const updated = NotificationService.markAllAsRead();
    set({ notifications: updated });
  },

  deleteNotification: (id) => {
    const updated = NotificationService.deleteNotification(id);
    set({ notifications: updated });
  },

  clearAll: () => {
    const updated = NotificationService.clearAll();
    set({ notifications: updated });
  },

  setActiveCategory: (cat) => set({ activeCategory: cat }),

  setIsOpen: (val) => set({ isOpen: val }),
}));
