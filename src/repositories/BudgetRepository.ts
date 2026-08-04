import { BudgetModel, FinancialGoalModel } from '../types/finance';

const initialBudgets: BudgetModel[] = [
  {
    id: 'bdg-1',
    category: 'Food',
    monthlyLimit: 5000000,
    spentAmount: 1850000,
    period: '2026-08',
    alertThresholdPercent: 80,
  },
  {
    id: 'bdg-2',
    category: 'Education',
    monthlyLimit: 3000000,
    spentAmount: 1200000,
    period: '2026-08',
    alertThresholdPercent: 80,
  },
  {
    id: 'bdg-3',
    category: 'Utilities',
    monthlyLimit: 1500000,
    spentAmount: 750000,
    period: '2026-08',
    alertThresholdPercent: 80,
  },
  {
    id: 'bdg-4',
    category: 'Shopping',
    monthlyLimit: 2000000,
    spentAmount: 650000,
    period: '2026-08',
    alertThresholdPercent: 80,
  },
  {
    id: 'bdg-5',
    category: 'Health',
    monthlyLimit: 1000000,
    spentAmount: 350000,
    period: '2026-08',
    alertThresholdPercent: 80,
  },
];

const initialGoals: FinancialGoalModel[] = [
  {
    id: 'fgl-1',
    title: 'Dana Darurat 6 Bulan Pengeluaran',
    targetAmount: 50000000,
    currentAmount: 32000000,
    deadline: '2026-12-31',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 'fgl-2',
    title: 'DP Mobil Keluarga Baru',
    targetAmount: 60000000,
    currentAmount: 22500000,
    deadline: '2027-06-30',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: 'fgl-3',
    title: 'Liburan Keluarga ke Bali',
    targetAmount: 15000000,
    currentAmount: 15000000,
    deadline: '2026-07-01',
    priority: 'Low',
    status: 'Achieved',
  },
];

export class BudgetRepository {
  private budgets: BudgetModel[] = [...initialBudgets];
  private goals: FinancialGoalModel[] = [...initialGoals];

  async getBudgets(): Promise<BudgetModel[]> {
    return this.budgets;
  }

  async saveBudget(budget: BudgetModel): Promise<BudgetModel> {
    const idx = this.budgets.findIndex((b) => b.id === budget.id || b.category === budget.category);
    if (idx >= 0) {
      this.budgets[idx] = { ...this.budgets[idx], ...budget };
    } else {
      this.budgets.push(budget);
    }
    return budget;
  }

  async getGoals(): Promise<FinancialGoalModel[]> {
    return this.goals;
  }

  async addGoal(goal: Omit<FinancialGoalModel, 'id' | 'status'>): Promise<FinancialGoalModel> {
    const newGoal: FinancialGoalModel = {
      ...goal,
      id: `fgl-${Date.now()}`,
      status: 'In Progress',
    };
    this.goals.unshift(newGoal);
    return newGoal;
  }

  async updateGoalProgress(id: string, amount: number): Promise<FinancialGoalModel | undefined> {
    const goal = this.goals.find((g) => g.id === id);
    if (goal) {
      goal.currentAmount += amount;
      if (goal.currentAmount >= goal.targetAmount) {
        goal.status = 'Achieved';
      }
    }
    return goal;
  }
}
