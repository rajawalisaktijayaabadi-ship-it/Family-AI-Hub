export type CardCategory =
  | 'mood'
  | 'health'
  | 'finance'
  | 'education'
  | 'meal'
  | 'calendar'
  | 'safety'
  | 'smarthome'
  | 'memory'
  | 'ai';

export interface DashboardCardItem {
  id: CardCategory;
  title: string;
  subtitle: string;
  iconName: string;
  badgeText?: string;
  gradient: string;
  accentColor: string;
  metrics: {
    label: string;
    value: string;
  }[];
  summary: string;
  recentItems: string[];
}

export type WidgetType =
  | 'today_summary'
  | 'quick_actions'
  | 'family_overview'
  | 'calendar_preview'
  | 'weather'
  | 'quote_motivation'
  | 'recent_activity'
  | 'favorite_modules'
  | 'chart_placeholder'
  | 'ai_placeholder';

export type WidgetCategory = 'summary' | 'action' | 'overview' | 'utility' | 'analytics' | 'ai';

export interface WidgetModel {
  id: string;
  title: string;
  type: WidgetType;
  category: WidgetCategory;
  description: string;
  icon: string;
  isVisible: boolean;
  isPinned: boolean;
  order: number;
  colSpan?: 1 | 2; // 1 column or full width 2 columns
  minHeight?: string;
  config?: Record<string, any>;
}

export interface LayoutModel {
  density: 'compact' | 'comfortable';
  accentColor: 'indigo' | 'purple' | 'emerald' | 'amber' | 'rose' | 'teal';
  gridCols: number;
  widgets: WidgetModel[];
  updatedAt: string;
}

export interface DashboardModel {
  id: string;
  userId: string;
  workspaceId: string;
  greeting: string;
  weather: {
    location: string;
    temperature: number;
    condition: string;
    humidity: number;
    icon: string;
  };
  quote: {
    text: string;
    author: string;
  };
  layout: LayoutModel;
  updatedAt: string;
}

export interface QuickActionModel {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  category: 'mood' | 'ai' | 'calendar' | 'notes' | 'finance' | 'meal' | 'emergency' | 'family';
  gradient: string;
  actionKey: string;
  isPopular?: boolean;
}

export interface ActivityModel {
  id: string;
  time: string;
  timestamp: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  title: string;
  description: string;
  category: 'Login' | 'Family Update' | 'Reminder' | 'Calendar' | 'Health' | 'Finance' | 'Safety';
  badgeColor: string;
}

export type NotificationCategory =
  | 'system'
  | 'family'
  | 'reminder'
  | 'announcement'
  | 'ai';

export interface NotificationModel {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  senderName?: string;
  senderAvatar?: string;
}

export interface FavoriteModuleModel {
  id: string;
  title: string;
  icon: string;
  route: string;
  color: string;
  order: number;
  isPinned: boolean;
}
