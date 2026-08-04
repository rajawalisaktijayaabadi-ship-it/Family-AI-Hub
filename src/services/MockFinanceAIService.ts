import { AIFinancialInsight, CashFlowSummary, ExpenseModel, BudgetModel } from '../types/finance';

export class MockFinanceAIService {
  static getInsight(
    cashFlow: CashFlowSummary,
    expenses: ExpenseModel[],
    budgets: BudgetModel[]
  ): AIFinancialInsight {
    const { totalIncome, totalExpense, netBalance, savingsRatePercent } = cashFlow;

    let score = 85;
    if (savingsRatePercent < 15) score -= 15;
    if (savingsRatePercent > 30) score += 5;
    if (netBalance < 0) score -= 25;

    score = Math.min(98, Math.max(45, score));

    const budgetAlerts: string[] = [];
    budgets.forEach((b) => {
      const pct = Math.round((b.spentAmount / b.monthlyLimit) * 100);
      if (pct >= b.alertThresholdPercent) {
        budgetAlerts.push(`Anggaran kategori ${b.category} telah terpakai ${pct}% (Rp ${b.spentAmount.toLocaleString('id-ID')} dari Rp ${b.monthlyLimit.toLocaleString('id-ID')}).`);
      }
    });

    return {
      financialScore: score,
      dailySummary: `Arus kas keluarga bulan ini tercatat sehat dengan total pemasukan Rp ${totalIncome.toLocaleString('id-ID')} dan pengeluaran Rp ${totalExpense.toLocaleString('id-ID')}. Anda berhasil menghemat ${savingsRatePercent}% dari pemasukan.`,
      budgetRecommendations: [
        'Alokasikan minimal 20% dari total penghasilan langsung ke Rekening Pos Dana Darurat.',
        'Batasi pengeluaran kategori Kebutuhan Hiburan & Shopping di bawah 10% dari total anggaran harian.',
        'Manfaatkan promo e-wallet atau pembayaran rutin otomatis untuk mencegah denda keterlambatan tagihan listrik.',
      ],
      savingSuggestions: [
        'Tingkatkan tabungan Dana Pendidikan Anak secara berkala tiap awal bulan.',
        'Sisihkan kembalian belanja harian ke dalam dompet impian koin emas / reksadana pasar uang.',
      ],
      expenseAlerts: budgetAlerts.length > 0 ? budgetAlerts : ['Seluruh anggaran kategori utama masih dalam batas aman di bawah 80%.'],
      financialMotivation: 'Keuangan yang terencana dengan baik adalah fondasi kedamaian dan masa depan cerah keluarga Anda.',
    };
  }
}
