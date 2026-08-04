import { InvestmentRepository } from '../repositories/InvestmentRepository';
import { SavingModel, InvestmentModel } from '../types/finance';

export class SavingService {
  private repo = new InvestmentRepository();

  async fetchSavings(): Promise<SavingModel[]> {
    return this.repo.getSavings();
  }

  async addSaving(saving: Omit<SavingModel, 'id'>): Promise<SavingModel> {
    return this.repo.addSaving(saving);
  }

  async depositSaving(id: string, amount: number): Promise<SavingModel | undefined> {
    return this.repo.depositSaving(id, amount);
  }
}

export class InvestmentService {
  private repo = new InvestmentRepository();

  async fetchInvestments(): Promise<InvestmentModel[]> {
    return this.repo.getInvestments();
  }

  async addInvestment(inv: Omit<InvestmentModel, 'id' | 'lastUpdated'>): Promise<InvestmentModel> {
    return this.repo.addInvestment(inv);
  }
}
