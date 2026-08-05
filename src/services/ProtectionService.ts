import { ProtectionRepository } from '../repositories/ProtectionRepository';
import { ProtectionScoreModel } from '../types/protection';

export class ProtectionService {
  private repo = new ProtectionRepository();

  async fetchProtectionScore(): Promise<ProtectionScoreModel> {
    return this.repo.getProtectionScore();
  }
}
