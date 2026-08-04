import { BudgetRepository } from '../repositories/BudgetRepository';
import { BudgetModel, FinancialGoalModel } from '../types/finance';

export class BudgetService {
  private repo = new BudgetRepository();

  async fetchBudgets(): Promise<BudgetModel[]> {
    return this.repo.getBudgets();
  }

  async saveBudget(budget: BudgetModel): Promise<BudgetModel> {
    return this.repo.saveBudget(budget);
  }

  async fetchGoals(): Promise<FinancialGoalModel[]> {
    return this.repo.getGoals();
  }

  async addGoal(goal: Omit<FinancialGoalModel, 'id' | 'status'>): Promise<FinancialGoalModel> {
    return this.repo.addGoal(goal);
  }

  async updateGoalProgress(id: string, amount: number): Promise<FinancialGoalModel | undefined> {
    return this.repo.updateGoalProgress(id, amount);
  }
}
