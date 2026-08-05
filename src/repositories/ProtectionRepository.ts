import { ProtectionScoreModel } from '../types/protection';

export class ProtectionRepository {
  private score: ProtectionScoreModel = {
    totalScore: 82,
    policyCount: 3,
    documentsCount: 6,
    emergencyReadinessScore: 85,
    coverageScore: 80,
    lastEvaluatedAt: new Date().toISOString(),
  };

  async getProtectionScore(): Promise<ProtectionScoreModel> {
    return this.score;
  }
}
