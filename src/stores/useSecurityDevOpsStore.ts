import { create } from 'zustand';
import {
  PDPConsentModel,
  SecurityAuditModel,
  BackupRecordModel,
  DeploymentRecordModel,
  SystemHealthMetricModel,
  TestSuiteResultModel,
} from '../types/security';
import { DevOpsService } from '../services/devops/DevOpsService';

interface SecurityDevOpsStore {
  consent: PDPConsentModel;
  auditLogs: SecurityAuditModel[];
  backups: BackupRecordModel[];
  deployments: DeploymentRecordModel[];
  health: SystemHealthMetricModel;
  tests: TestSuiteResultModel[];
  isMaintenanceMode: boolean;
  featureToggles: Record<string, boolean>;

  updateConsent: (key: keyof Omit<PDPConsentModel, 'userId' | 'lastUpdated' | 'ipAddress'>, val: boolean) => void;
  toggleMaintenanceMode: () => void;
  toggleFeature: (featureKey: string) => void;
  runManualBackup: () => void;
  runAllTests: () => Promise<void>;
  addAuditLog: (action: string, resource: string, status: SecurityAuditModel['status'], details?: string) => void;
}

export const useSecurityDevOpsStore = create<SecurityDevOpsStore>((set, get) => ({
  consent: {
    userId: 'usr_owner_01',
    analyticsConsent: true,
    marketingConsent: false,
    aiDataSharingConsent: true,
    locationTrackingConsent: true,
    lastUpdated: new Date().toISOString(),
    ipAddress: '180.252.88.12 (Jakarta, ID)',
  },

  auditLogs: [
    {
      id: 'aud_1',
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      actorId: 'usr_owner_01',
      actorEmail: 'budi.santoso@familyai.id',
      action: 'USER_LOGIN_SUCCESS',
      resource: 'AuthService',
      ipAddress: '180.252.88.12',
      status: 'success',
      details: '2FA OTP Verified via WhatsApp',
    },
    {
      id: 'aud_2',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      actorId: 'usr_guest_99',
      actorEmail: 'unknown@hacker.io',
      action: 'PROMPT_INJECTION_BLOCKED',
      resource: 'AIContextEngine',
      ipAddress: '103.22.180.5',
      status: 'blocked',
      details: 'Disertai pola "ignore previous instructions". Diblokir oleh SecurityService.',
    },
    {
      id: 'aud_3',
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      actorId: 'usr_owner_01',
      actorEmail: 'budi.santoso@familyai.id',
      action: 'WORKSPACE_EXPORT_PDP',
      resource: 'PrivacyManager',
      ipAddress: '180.252.88.12',
      status: 'success',
      details: 'Ekspor Data UU PDP Pasal 11 sukses diunduh.',
    },
  ],

  backups: DevOpsService.getInstance().getBackupHistory(),
  deployments: DevOpsService.getInstance().getDeployments(),
  health: DevOpsService.getInstance().getSystemHealth(),
  tests: DevOpsService.getInstance().getTestResults(),
  isMaintenanceMode: false,

  featureToggles: {
    enable_bmkg_weather: true,
    enable_fcm_notifications: true,
    enable_midtrans_payment: true,
    enable_ai_gemini_36: true,
    enable_canary_deployment: false,
    enable_strict_pdp_encryption: true,
  },

  updateConsent: (key, val) => {
    set((state) => ({
      consent: {
        ...state.consent,
        [key]: val,
        lastUpdated: new Date().toISOString(),
      },
    }));
  },

  toggleMaintenanceMode: () => {
    set((state) => ({ isMaintenanceMode: !state.isMaintenanceMode }));
  },

  toggleFeature: (featureKey) => {
    set((state) => ({
      featureToggles: {
        ...state.featureToggles,
        [featureKey]: !state.featureToggles[featureKey],
      },
    }));
  },

  runManualBackup: () => {
    const newBackup: BackupRecordModel = {
      id: `bk_${Date.now()}`,
      timestamp: new Date().toISOString(),
      sizeMB: Number((48 + Math.random() * 2).toFixed(1)),
      type: 'manual_snapshot',
      status: 'completed',
      location: `gs://familyai-prod-backups/snapshot-${Date.now()}.tar.gz`,
    };
    set((state) => ({ backups: [newBackup, ...state.backups] }));
    get().addAuditLog('MANUAL_FIRESTORE_BACKUP', 'BackupService', 'success', 'Snapshot snapshot.tar.gz berhasil disimpan di GCP Storage Bucket.');
  },

  runAllTests: async () => {
    // Reset test durations and simulate test suite run
    set((state) => ({
      tests: state.tests.map((t) => ({ ...t, status: 'passed' })),
    }));
  },

  addAuditLog: (action, resource, status, details) => {
    const newLog: SecurityAuditModel = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorId: 'usr_owner_01',
      actorEmail: 'budi.santoso@familyai.id',
      action,
      resource,
      ipAddress: '180.252.88.12',
      status,
      details,
    };
    set((state) => ({ auditLogs: [newLog, ...state.auditLogs].slice(0, 50) }));
  },
}));
