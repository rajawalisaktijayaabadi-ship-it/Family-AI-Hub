export type IncomeCategory = 'Salary' | 'Business' | 'Bonus' | 'Gift' | 'Investment Return' | 'Freelance' | 'Other Income';

export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Education'
  | 'Health'
  | 'Insurance'
  | 'Shopping'
  | 'Entertainment'
  | 'Utilities'
  | 'Charity'
  | 'Investment'
  | 'Others';

export type SavingCategory = 'Emergency Fund' | 'Education Fund' | 'Vacation Fund' | 'House Fund' | 'Vehicle Fund' | 'Custom Saving';

export type InvestmentCategory = 'Stock' | 'Mutual Fund' | 'Gold' | 'Crypto' | 'Property' | 'Custom Investment';

export type DebtCategory = 'Loan' | 'Mortgage' | 'Credit Card' | 'Installment' | 'Borrowing';

export type BillCategory = 'Electricity' | 'Water' | 'Internet' | 'School' | 'Insurance' | 'Credit Card' | 'Custom Bill';

export type SubscriptionCategory = 'Netflix' | 'Spotify' | 'Disney+' | 'Cloud Storage' | 'Gym' | 'Custom Subscription';

export interface IncomeModel {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  category: IncomeCategory;
  date: string; // YYYY-MM-DD
  source: string;
  notes?: string;
  isRecurring?: boolean;
}

export interface ExpenseModel {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // YYYY-MM-DD
  merchant?: string;
  paymentMethod: 'Cash' | 'Bank Transfer' | 'E-Wallet' | 'Credit Card';
  notes?: string;
  receiptUrl?: string;
}

export interface BudgetModel {
  id: string;
  category: ExpenseCategory;
  monthlyLimit: number;
  spentAmount: number;
  period: string; // YYYY-MM
  alertThresholdPercent: number; // e.g., 80%
}

export interface SavingModel {
  id: string;
  category: SavingCategory;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  notes?: string;
}

export interface InvestmentModel {
  id: string;
  category: InvestmentCategory;
  assetName: string;
  initialValue: number;
  currentValue: number;
  returnPercent: number;
  lastUpdated: string;
}

export interface DebtModel {
  id: string;
  category: DebtCategory;
  title: string;
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  dueDateDay: number; // 1-31
  creditor: string;
  isPaidOff: boolean;
}

export interface BillModel {
  id: string;
  category: BillCategory;
  title: string;
  amount: number;
  dueDate: string; // YYYY-MM-DD
  isPaid: boolean;
  billerName: string;
}

export interface FinancialGoalModel {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Achieved' | 'On Hold';
}

export interface AllowanceModel {
  id: string;
  memberId: string;
  memberName: string;
  type: 'Pocket Money' | 'Child Allowance' | 'Weekly Allowance' | 'Monthly Allowance';
  amount: number;
  frequency: 'Weekly' | 'Monthly';
  lastGivenDate: string;
}

export interface SubscriptionModel {
  id: string;
  category: SubscriptionCategory;
  serviceName: string;
  cost: number;
  billingCycle: 'Monthly' | 'Yearly';
  nextBillingDate: string;
  isActive: boolean;
}

export interface ReceiptModel {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  imageUrl?: string;
  status: 'Scanned' | 'Verified' | 'Pending';
}

export interface FinancialReportModel {
  id: string;
  period: string; // Daily, Weekly, Monthly, Yearly
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  topExpenseCategory: string;
  financialHealthScore: number;
  generatedAt: string;
}

export interface AIFinancialInsight {
  financialScore: number; // 0 - 100
  dailySummary: string;
  budgetRecommendations: string[];
  savingSuggestions: string[];
  expenseAlerts: string[];
  financialMotivation: string;
}

export interface CashFlowSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  savingsRatePercent: number;
}
