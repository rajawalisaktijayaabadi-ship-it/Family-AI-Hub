import { create } from 'zustand';
import {
  IncomeModel,
  ExpenseModel,
  BudgetModel,
  SavingModel,
  InvestmentModel,
  DebtModel,
  BillModel,
  FinancialGoalModel,
  AllowanceModel,
  SubscriptionModel,
  ReceiptModel,
  CashFlowSummary,
  AIFinancialInsight,
} from '../types/finance';
import { FinanceService } from '../services/FinanceService';
import { BudgetService } from '../services/BudgetService';
import { SavingService, InvestmentService } from '../services/SavingService';
import { MockFinanceAIService } from '../services/MockFinanceAIService';

interface FinanceState {
  incomes: IncomeModel[];
  expenses: ExpenseModel[];
  budgets: BudgetModel[];
  savings: SavingModel[];
  investments: InvestmentModel[];
  debts: DebtModel[];
  bills: BillModel[];
  goals: FinancialGoalModel[];
  allowances: AllowanceModel[];
  subscriptions: SubscriptionModel[];
  receipts: ReceiptModel[];
  cashFlow: CashFlowSummary;
  aiInsight: AIFinancialInsight | undefined;
  isLoading: boolean;
  searchQuery: string;

  // Actions
  initialize: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  addIncome: (inc: Omit<IncomeModel, 'id'>) => Promise<void>;
  addExpense: (exp: Omit<ExpenseModel, 'id'>) => Promise<void>;
  saveBudget: (budget: BudgetModel) => Promise<void>;
  addSaving: (saving: Omit<SavingModel, 'id'>) => Promise<void>;
  depositSaving: (id: string, amount: number) => Promise<void>;
  addInvestment: (inv: Omit<InvestmentModel, 'id' | 'lastUpdated'>) => Promise<void>;
  addDebt: (dbt: Omit<DebtModel, 'id' | 'isPaidOff'>) => Promise<void>;
  payDebt: (id: string, amount: number) => Promise<void>;
  addBill: (bill: Omit<BillModel, 'id' | 'isPaid'>) => Promise<void>;
  toggleBill: (id: string) => Promise<void>;
  addGoal: (goal: Omit<FinancialGoalModel, 'id' | 'status'>) => Promise<void>;
  updateGoalProgress: (id: string, amount: number) => Promise<void>;
  addAllowance: (alw: Omit<AllowanceModel, 'id'>) => Promise<void>;
  addSubscription: (sub: Omit<SubscriptionModel, 'id'>) => Promise<void>;
  addReceipt: (rcp: Omit<ReceiptModel, 'id' | 'status'>) => Promise<void>;
}

const financeService = new FinanceService();
const budgetService = new BudgetService();
const savingService = new SavingService();
const investmentService = new InvestmentService();

export const useFinanceStore = create<FinanceState>((set, get) => ({
  incomes: [],
  expenses: [],
  budgets: [],
  savings: [],
  investments: [],
  debts: [],
  bills: [],
  goals: [],
  allowances: [],
  subscriptions: [],
  receipts: [],
  cashFlow: {
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
    savingsRatePercent: 0,
  },
  aiInsight: undefined,
  isLoading: false,
  searchQuery: '',

  initialize: async () => {
    set({ isLoading: true });
    try {
      const incomes = await financeService.fetchIncomes();
      const expenses = await financeService.fetchExpenses();
      const budgets = await budgetService.fetchBudgets();
      const savings = await savingService.fetchSavings();
      const investments = await investmentService.fetchInvestments();
      const debts = await financeService.fetchDebts();
      const bills = await financeService.fetchBills();
      const goals = await budgetService.fetchGoals();
      const allowances = await financeService.fetchAllowances();
      const subscriptions = await financeService.fetchSubscriptions();
      const receipts = await financeService.fetchReceipts();
      const cashFlow = await financeService.calculateCashFlow();

      const aiInsight = MockFinanceAIService.getInsight(cashFlow, expenses, budgets);

      set({
        incomes,
        expenses,
        budgets,
        savings,
        investments,
        debts,
        bills,
        goals,
        allowances,
        subscriptions,
        receipts,
        cashFlow,
        aiInsight,
        isLoading: false,
      });
    } catch (e) {
      console.error('Failed initializing finance store:', e);
      set({ isLoading: false });
    }
  },

  setSearchQuery: (searchQuery: string) => set({ searchQuery }),

  addIncome: async (inc) => {
    const newInc = await financeService.addIncome(inc);
    set((state) => ({ incomes: [newInc, ...state.incomes] }));
    const cashFlow = await financeService.calculateCashFlow();
    const aiInsight = MockFinanceAIService.getInsight(cashFlow, get().expenses, get().budgets);
    set({ cashFlow, aiInsight });
  },

  addExpense: async (exp) => {
    const newExp = await financeService.addExpense(exp);
    set((state) => ({ expenses: [newExp, ...state.expenses] }));
    const cashFlow = await financeService.calculateCashFlow();
    const aiInsight = MockFinanceAIService.getInsight(cashFlow, get().expenses, get().budgets);
    set({ cashFlow, aiInsight });
  },

  saveBudget: async (budget) => {
    const saved = await budgetService.saveBudget(budget);
    set((state) => ({
      budgets: state.budgets.map((b) => (b.id === saved.id ? saved : b)),
    }));
  },

  addSaving: async (saving) => {
    const newSaving = await savingService.addSaving(saving);
    set((state) => ({ savings: [newSaving, ...state.savings] }));
  },

  depositSaving: async (id, amount) => {
    const updated = await savingService.depositSaving(id, amount);
    if (updated) {
      set((state) => ({
        savings: state.savings.map((s) => (s.id === id ? { ...s, currentAmount: updated.currentAmount } : s)),
      }));
    }
  },

  addInvestment: async (inv) => {
    const newInv = await investmentService.addInvestment(inv);
    set((state) => ({ investments: [newInv, ...state.investments] }));
  },

  addDebt: async (dbt) => {
    const newDbt = await financeService.addDebt(dbt);
    set((state) => ({ debts: [newDbt, ...state.debts] }));
  },

  payDebt: async (id, amount) => {
    const updated = await financeService.payDebt(id, amount);
    if (updated) {
      set((state) => ({
        debts: state.debts.map((d) =>
          d.id === id
            ? { ...d, remainingAmount: updated.remainingAmount, isPaidOff: updated.isPaidOff }
            : d
        ),
      }));
    }
  },

  addBill: async (bill) => {
    const newBill = await financeService.addBill(bill);
    set((state) => ({ bills: [newBill, ...state.bills] }));
  },

  toggleBill: async (id) => {
    const updated = await financeService.toggleBill(id);
    if (updated) {
      set((state) => ({
        bills: state.bills.map((b) => (b.id === id ? { ...b, isPaid: updated.isPaid } : b)),
      }));
    }
  },

  addGoal: async (goal) => {
    const newGoal = await budgetService.addGoal(goal);
    set((state) => ({ goals: [newGoal, ...state.goals] }));
  },

  updateGoalProgress: async (id, amount) => {
    const updated = await budgetService.updateGoalProgress(id, amount);
    if (updated) {
      set((state) => ({
        goals: state.goals.map((g) =>
          g.id === id ? { ...g, currentAmount: updated.currentAmount, status: updated.status } : g
        ),
      }));
    }
  },

  addAllowance: async (alw) => {
    const newAlw = await financeService.addAllowance(alw);
    set((state) => ({ allowances: [newAlw, ...state.allowances] }));
  },

  addSubscription: async (sub) => {
    const newSub = await financeService.addSubscription(sub);
    set((state) => ({ subscriptions: [newSub, ...state.subscriptions] }));
  },

  addReceipt: async (rcp) => {
    const newRcp = await financeService.addReceipt(rcp);
    set((state) => ({ receipts: [newRcp, ...state.receipts] }));
  },
}));
