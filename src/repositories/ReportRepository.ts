import { FinancialReportModel, CashFlowSummary, ExpenseModel } from '../types/finance';

export class ReportRepository {
  async generateReport(
    period: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly',
    cashFlow: CashFlowSummary,
    expenses: ExpenseModel[]
  ): Promise<FinancialReportModel> {
    // Find top expense category
    const categoryTotals: Record<string, number> = {};
    expenses.forEach((e) => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    let topCategory = 'Food';
    let maxAmt = 0;
    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      if (amt > maxAmt) {
        maxAmt = amt;
        topCategory = cat;
      }
    });

    return {
      id: `rpt-${Date.now()}`,
      period,
      totalIncome: cashFlow.totalIncome,
      totalExpense: cashFlow.totalExpense,
      netSavings: cashFlow.netBalance,
      topExpenseCategory: topCategory,
      financialHealthScore: Math.min(95, Math.max(60, Math.round(cashFlow.savingsRatePercent * 2 + 50))),
      generatedAt: new Date().toISOString(),
    };
  }
}
