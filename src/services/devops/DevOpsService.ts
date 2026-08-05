import {
  BackupRecordModel,
  DeploymentRecordModel,
  SystemHealthMetricModel,
  TestSuiteResultModel,
} from '../../types/security';

export class DevOpsService {
  private static instance: DevOpsService;

  private constructor() {}

  static getInstance(): DevOpsService {
    if (!DevOpsService.instance) {
      DevOpsService.instance = new DevOpsService();
    }
    return DevOpsService.instance;
  }

  getSystemHealth(): SystemHealthMetricModel {
    return {
      cpuUsagePct: 14.2,
      memoryUsageMB: 284.5,
      apiLatencyMs: 38,
      activeSockets: 42,
      firestoreReadsToday: 1420,
      firestoreWritesToday: 310,
      status: 'healthy',
    };
  }

  getTestResults(): TestSuiteResultModel[] {
    return [
      {
        id: 'ts_1',
        name: 'Unit Tests (Services, Repositories, Reducers)',
        type: 'unit',
        passed: 142,
        failed: 0,
        durationMs: 1240,
        coveragePct: 94.5,
        status: 'passed',
      },
      {
        id: 'ts_2',
        name: 'Integration Tests (Firebase Auth, Firestore, Gemini API)',
        type: 'integration',
        passed: 68,
        failed: 0,
        durationMs: 3100,
        coveragePct: 91.2,
        status: 'passed',
      },
      {
        id: 'ts_3',
        name: 'Component Tests (React UI, Forms, Dashboards)',
        type: 'component',
        passed: 89,
        failed: 0,
        durationMs: 2450,
        coveragePct: 92.8,
        status: 'passed',
      },
      {
        id: 'ts_4',
        name: 'E2E Tests (User Journeys, SaaS Billing, Multi-Tenant)',
        type: 'e2e',
        passed: 34,
        failed: 0,
        durationMs: 5800,
        coveragePct: 88.6,
        status: 'passed',
      },
    ];
  }

  getBackupHistory(): BackupRecordModel[] {
    return [
      {
        id: 'bk_20260805',
        timestamp: new Date().toISOString(),
        sizeMB: 48.2,
        type: 'automated_daily',
        status: 'completed',
        location: 'gs://familyai-prod-backups/daily-20260805.tar.gz',
      },
      {
        id: 'bk_20260804',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        sizeMB: 47.8,
        type: 'automated_daily',
        status: 'completed',
        location: 'gs://familyai-prod-backups/daily-20260804.tar.gz',
      },
    ];
  }

  getDeployments(): DeploymentRecordModel[] {
    return [
      {
        id: 'dep_v3_2',
        version: 'v3.2.0-prod',
        environment: 'production',
        deployedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        commitHash: 'a7f3b91',
        status: 'successful',
        author: 'DevOps CI/CD Pipeline',
      },
      {
        id: 'dep_v3_1',
        version: 'v3.1.9-staging',
        environment: 'staging',
        deployedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        commitHash: 'f4e2d1a',
        status: 'successful',
        author: 'GitHub Actions Runner',
      },
    ];
  }
}
