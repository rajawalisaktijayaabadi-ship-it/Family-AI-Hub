import { z } from 'zod';

export type ProviderType = 'maps' | 'weather' | 'notification' | 'email' | 'sms' | 'whatsapp' | 'storage' | 'ocr';

export type ProviderStatus = 'active' | 'degraded' | 'offline' | 'mock';

export interface ProviderModel {
  id: string;
  name: string;
  type: ProviderType;
  status: ProviderStatus;
  isDefault: boolean;
  apiKeyConfigured: boolean;
  endpoint: string;
}

export interface IntegrationModel {
  id: string;
  providerId: string;
  providerName: string;
  type: ProviderType;
  lastHealthCheck: string;
  latencyMs: number;
  successRate: number;
}

export type NotificationCategory =
  | 'family'
  | 'ai'
  | 'health'
  | 'finance'
  | 'education'
  | 'calendar'
  | 'emergency'
  | 'system';

export interface NotificationModel {
  id: string;
  workspaceId: string;
  title: string;
  body: string;
  category: NotificationCategory;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  icon?: string;
}

export interface AutomationTrigger {
  type: 'weather_rain' | 'geofence_exit' | 'budget_exceeded' | 'calendar_event' | 'schedule_daily';
  label: string;
  value?: string;
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains';
  value: string;
}

export interface AutomationAction {
  type: 'send_push' | 'create_ai_reminder' | 'trigger_whatsapp' | 'lock_smart_home';
  label: string;
  target?: string;
}

export interface AutomationModel {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  isEnabled: boolean;
  trigger: AutomationTrigger;
  condition?: AutomationCondition;
  action: AutomationAction;
  lastTriggeredAt?: string;
  triggerCount: number;
}

export interface QueueJobModel {
  id: string;
  type: 'email' | 'notification' | 'ai_task' | 'ocr' | 'sync';
  payload: Record<string, any>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  retryCount: number;
  createdAt: string;
  processedAt?: string;
}

export interface WeatherModel {
  city: string;
  province: string;
  temperatureC: number;
  condition: 'Cerah' | 'Cerah Berawan' | 'Hujan Ringan' | 'Hujan Lebat' | 'Berawan';
  humidity: number;
  windSpeedKmH: number;
  uvIndex: number;
  airQualityAQI: number;
  forecast7Days: Array<{
    day: string;
    condition: string;
    tempHigh: number;
    tempLow: number;
  }>;
}

export interface HolidayModel {
  date: string;
  name: string;
  type: 'Hari Libur Nasional' | 'Cuti Bersama' | 'Hari Besar Agama';
  description: string;
}

export interface LocationModel {
  id: string;
  memberName: string;
  role: string;
  latitude: number;
  longitude: number;
  address: string;
  batteryLevel: number;
  lastUpdated: string;
  isSafeZone: boolean;
}

export interface LogMetricModel {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  service: string;
  message: string;
  executionTimeMs?: number;
}

// Zod Validation Schemas
export const NotificationSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  title: z.string(),
  body: z.string(),
  category: z.enum(['family', 'ai', 'health', 'finance', 'education', 'calendar', 'emergency', 'system']),
  isRead: z.boolean(),
  createdAt: z.string(),
});

export const AutomationSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  description: z.string(),
  isEnabled: z.boolean(),
});
