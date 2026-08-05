import { InsuranceRepository } from '../repositories/InsuranceRepository';
import { InsurancePolicyModel, ClaimModel } from '../types/protection';

export class InsuranceService {
  private repo = new InsuranceRepository();

  async fetchPolicies(): Promise<InsurancePolicyModel[]> {
    return this.repo.getPolicies();
  }

  async addPolicy(policy: Omit<InsurancePolicyModel, 'id'>): Promise<InsurancePolicyModel> {
    return this.repo.addPolicy(policy);
  }

  async updatePolicy(id: string, updates: Partial<InsurancePolicyModel>): Promise<InsurancePolicyModel | undefined> {
    return this.repo.updatePolicy(id, updates);
  }

  async togglePremiumPaid(policyId: string): Promise<InsurancePolicyModel | undefined> {
    return this.repo.togglePremiumPaid(policyId);
  }

  async fetchClaims(): Promise<ClaimModel[]> {
    return this.repo.getClaims();
  }

  async addClaim(claim: Omit<ClaimModel, 'id' | 'status' | 'timeline'>): Promise<ClaimModel> {
    return this.repo.addClaim(claim);
  }
}
