import { FinanceRepository } from '../repositories/FinanceRepository';
import {
  IncomeModel,
  ExpenseModel,
  DebtModel,
  BillModel,
  AllowanceModel,
  SubscriptionModel,
  ReceiptModel,
  CashFlowSummary,
} from '../types/finance';

export class FinanceService {
  private repo = new FinanceRepository();

  async fetchIncomes(memberId?: string): Promise<IncomeModel[]> {
    return this.repo.getIncomes(memberId);
  }

  async addIncome(inc: Omit<IncomeModel, 'id'>): Promise<IncomeModel> {
    return this.repo.addIncome(inc);
  }

  async fetchExpenses(memberId?: string): Promise<ExpenseModel[]> {
    return this.repo.getExpenses(memberId);
  }

  async addExpense(exp: Omit<ExpenseModel, 'id'>): Promise<ExpenseModel> {
    return this.repo.addExpense(exp);
  }

  async calculateCashFlow(memberId?: string): Promise<CashFlowSummary> {
    const incomes = await this.repo.getIncomes(memberId);
    const expenses = await this.repo.getExpenses(memberId);

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netBalance = totalIncome - totalExpense;
    const savingsRatePercent = totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0;

    return {
      totalIncome,
      totalExpense,
      netBalance,
      savingsRatePercent: Math.max(0, savingsRatePercent),
    };
  }

  async fetchDebts(): Promise<DebtModel[]> {
    return this.repo.getDebts();
  }

  async addDebt(dbt: Omit<DebtModel, 'id' | 'isPaidOff'>): Promise<DebtModel> {
    return this.repo.addDebt(dbt);
  }

  async payDebt(id: string, amount: number): Promise<DebtModel | undefined> {
    return this.repo.payDebtInstallment(id, amount);
  }

  async fetchBills(): Promise<BillModel[]> {
    return this.repo.getBills();
  }

  async toggleBill(id: string): Promise<BillModel | undefined> {
    return this.repo.toggleBillPaid(id);
  }

  async addBill(bill: Omit<BillModel, 'id' | 'isPaid'>): Promise<BillModel> {
    return this.repo.addBill(bill);
  }

  async fetchAllowances(): Promise<AllowanceModel[]> {
    return this.repo.getAllowances();
  }

  async addAllowance(alw: Omit<AllowanceModel, 'id'>): Promise<AllowanceModel> {
    return this.repo.addAllowance(alw);
  }

  async fetchSubscriptions(): Promise<SubscriptionModel[]> {
    return this.repo.getSubscriptions();
  }

  async addSubscription(sub: Omit<SubscriptionModel, 'id'>): Promise<SubscriptionModel> {
    return this.repo.addSubscription(sub);
  }

  async fetchReceipts(): Promise<ReceiptModel[]> {
    return this.repo.getReceipts();
  }

  async addReceipt(rcp: Omit<ReceiptModel, 'id' | 'status'>): Promise<ReceiptModel> {
    return this.repo.addReceipt(rcp);
  }
}
