import { z } from 'zod';

export type UserRole = 'super_admin' | 'workspace_owner' | 'family_member' | 'guest';

export interface PDPConsentModel {
  userId: string;
  analyticsConsent: boolean;
  marketingConsent: boolean;
  aiDataSharingConsent: boolean;
  locationTrackingConsent: boolean;
  lastUpdated: string;
  ipAddress: string;
}

export interface SecurityAuditModel {
  id: string;
  timestamp: string;
  actorId: string;
  actorEmail: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: 'success' | 'blocked' | 'warning';
  details?: string;
}

export interface BackupRecordModel {
  id: string;
  timestamp: string;
  sizeMB: number;
  type: 'automated_daily' | 'manual_snapshot';
  status: 'completed' | 'in_progress' | 'failed';
  location: string;
}

export interface DeploymentRecordModel {
  id: string;
  version: string;
  environment: 'production' | 'staging' | 'preview';
  deployedAt: string;
  commitHash: string;
  status: 'successful' | 'rolled_back' | 'deploying';
  author: string;
}

export interface SystemHealthMetricModel {
  cpuUsagePct: number;
  memoryUsageMB: number;
  apiLatencyMs: number;
  activeSockets: number;
  firestoreReadsToday: number;
  firestoreWritesToday: number;
  status: 'healthy' | 'degraded' | 'critical';
}

export interface TestSuiteResultModel {
  id: string;
  name: string;
  type: 'unit' | 'integration' | 'component' | 'e2e';
  passed: number;
  failed: number;
  durationMs: number;
  coveragePct: number;
  status: 'passed' | 'failed';
}

// Zod Validation Schemas
export const PDPConsentSchema = z.object({
  userId: z.string(),
  analyticsConsent: z.boolean(),
  marketingConsent: z.boolean(),
  aiDataSharingConsent: z.boolean(),
  locationTrackingConsent: z.boolean(),
  lastUpdated: z.string(),
  ipAddress: z.string(),
});

export const SecurityAuditSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  actorId: z.string(),
  actorEmail: z.string(),
  action: z.string(),
  resource: z.string(),
  ipAddress: z.string(),
  status: z.enum(['success', 'blocked', 'warning']),
});
