import { z } from 'zod';

export const AnalyticsModelSchema = z.object({
  familyScore: z.number(), // 0 - 100
  healthScore: z.number(),
  financeScore: z.number(),
  moodScore: z.number(),
  educationScore: z.number(),
  safetyScore: z.number(),
  activityScore: z.number(),
  nutritionScore: z.number(),
  productivityCompletionRate: z.number(),
  lastUpdated: z.string(),
});

export type AnalyticsModel = z.infer<typeof AnalyticsModelSchema>;

export type ReportCategory =
  | 'Family'
  | 'Mood'
  | 'Health'
  | 'Finance'
  | 'Education'
  | 'Meal'
  | 'Calendar'
  | 'Safety';

export type ReportTimeframe =
  | 'Daily Report'
  | 'Weekly Report'
  | 'Monthly Report'
  | 'Quarterly Report'
  | 'Yearly Report';

export const ReportModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  timeframe: z.string(),
  dateRange: z.string(),
  summary: z.string(),
  keyMetrics: z.record(z.string(), z.union([z.string(), z.number()])),
  generatedAt: z.string(),
  downloadUrl: z.string().optional(),
});

export type ReportModel = z.infer<typeof ReportModelSchema>;

export type InsightCategory =
  | 'Family'
  | 'Health'
  | 'Finance'
  | 'Education'
  | 'Parenting'
  | 'Mood'
  | 'Meal'
  | 'Safety';

export const InsightModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  priority: z.enum(['High', 'Medium', 'Low']),
  description: z.string(),
  actionableStep: z.string(),
  riskDetection: z.string().optional(),
  trendPrediction: z.string().optional(),
  date: z.string(),
  isArchived: z.boolean(),
});

export type InsightModel = z.infer<typeof InsightModelSchema>;

export type NotificationType =
  | 'System'
  | 'Family'
  | 'Reminder'
  | 'Health'
  | 'Finance'
  | 'Education'
  | 'Security'
  | 'Promotion';

export const NotificationModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  type: z.string(),
  priority: z.enum(['Urgent', 'High', 'Normal', 'Low']),
  timestamp: z.string(),
  isRead: z.boolean(),
  isPinned: z.boolean(),
  isArchived: z.boolean(),
  actionUrl: z.string().optional(),
});

export type NotificationModel = z.infer<typeof NotificationModelSchema>;

export const AnnouncementModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  category: z.enum(['System Announcement', 'Feature Update', 'Maintenance']),
  publishedAt: z.string(),
  isImportant: z.boolean(),
});

export type AnnouncementModel = z.infer<typeof AnnouncementModelSchema>;

export const AuditLogModelSchema = z.object({
  id: z.string(),
  actor: z.string(),
  action: z.enum(['Login', 'Update', 'Delete', 'Export', 'System Event']),
  module: z.string(),
  details: z.string(),
  ipAddress: z.string(),
  timestamp: z.string(),
});

export type AuditLogModel = z.infer<typeof AuditLogModelSchema>;

export const SystemStatusModelSchema = z.object({
  apiStatus: z.enum(['Operational', 'Degraded', 'Maintenance']),
  databaseStatus: z.enum(['Healthy', 'Syncing', 'Error']),
  storageUsageMb: z.number(),
  activeUsersCount: z.number(),
  lastCheckTimestamp: z.string(),
});

export type SystemStatusModel = z.infer<typeof SystemStatusModelSchema>;

export const FeatureFlagModelSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  isEnabled: z.boolean(),
  description: z.string(),
});

export type FeatureFlagModel = z.infer<typeof FeatureFlagModelSchema>;

export const AdminModelSchema = z.object({
  totalUsers: z.number(),
  totalWorkspaces: z.number(),
  activeSubscriptions: z.number(),
  mrrEstimate: z.number(),
});

export type AdminModel = z.infer<typeof AdminModelSchema>;
