import { ReportRepository } from '../repositories/ReportRepository';
import { FinancialReportModel, CashFlowSummary, ExpenseModel } from '../types/finance';

export class ReportService {
  private repo = new ReportRepository();

  async generateReport(
    period: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly',
    cashFlow: CashFlowSummary,
    expenses: ExpenseModel[]
  ): Promise<FinancialReportModel> {
    return this.repo.generateReport(period, cashFlow, expenses);
  }
}
