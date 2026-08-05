import { NotificationModel, NotificationCategory } from '../../types/integration';
import { EventBus } from './EventBus';

export interface PushNotificationPayload {
  title: string;
  body: string;
  category: NotificationCategory;
  workspaceId: string;
  actionUrl?: string;
}

export class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async sendPushNotification(payload: PushNotificationPayload): Promise<NotificationModel> {
    const notification: NotificationModel = {
      id: `notif_${Date.now()}`,
      workspaceId: payload.workspaceId,
      title: payload.title,
      body: payload.body,
      category: payload.category,
      isRead: false,
      createdAt: new Date().toISOString(),
      actionUrl: payload.actionUrl,
    };

    // Trigger local push sound / browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(payload.title, { body: payload.body });
    }

    EventBus.getInstance().publish('NOTIFICATION_RECEIVED', notification);
    return notification;
  }
}
