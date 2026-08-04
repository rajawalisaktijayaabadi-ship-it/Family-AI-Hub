import { NotificationModel, NotificationCategory } from '../types/dashboard';
import { NotificationRepository } from '../repositories/NotificationRepository';

export class NotificationService {
  static getNotifications(): NotificationModel[] {
    return NotificationRepository.getNotifications();
  }

  static markAsRead(id: string): NotificationModel[] {
    const current = NotificationRepository.getNotifications();
    const updated = current.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    NotificationRepository.saveNotifications(updated);
    return updated;
  }

  static markAllAsRead(): NotificationModel[] {
    return NotificationRepository.markAllAsRead();
  }

  static deleteNotification(id: string): NotificationModel[] {
    const current = NotificationRepository.getNotifications();
    const updated = current.filter((n) => n.id !== id);
    NotificationRepository.saveNotifications(updated);
    return updated;
  }

  static clearAll(): NotificationModel[] {
    return NotificationRepository.clearAll();
  }

  static filterByCategory(category: NotificationCategory | 'ALL'): NotificationModel[] {
    const all = NotificationRepository.getNotifications();
    if (category === 'ALL') return all;
    return all.filter((n) => n.category === category);
  }
}
