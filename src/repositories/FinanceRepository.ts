import {
  IncomeModel,
  ExpenseModel,
  DebtModel,
  BillModel,
  AllowanceModel,
  SubscriptionModel,
  ReceiptModel,
} from '../types/finance';

const initialIncomes: IncomeModel[] = [
  {
    id: 'inc-1',
    memberId: 'm-1',
    memberName: 'Ayah Hendra',
    amount: 15000000,
    category: 'Salary',
    date: '2026-08-01',
    source: 'Gaji Bulanan Utama PT Tech Indonesia',
    notes: 'Transfer rekening utama awal bulan',
  },
  {
    id: 'inc-2',
    memberId: 'm-2',
    memberName: 'Ibu Ratna',
    amount: 4500000,
    category: 'Freelance',
    date: '2026-08-03',
    source: 'Project Desain Graphic Boutique',
    notes: 'Honor project freelance harian',
  },
];

const initialExpenses: ExpenseModel[] = [
  {
    id: 'exp-1',
    memberId: 'm-2',
    memberName: 'Ibu Ratna',
    amount: 1850000,
    category: 'Food',
    date: '2026-08-02',
    merchant: 'Supermarket Grand Lucky',
    paymentMethod: 'Credit Card',
    notes: 'Belanja bahan makanan & kebutuhan pokok dapur bulanan',
  },
  {
    id: 'exp-2',
    memberId: 'm-1',
    memberName: 'Ayah Hendra',
    amount: 750000,
    category: 'Utilities',
    date: '2026-08-02',
    merchant: 'PLN & Indihome',
    paymentMethod: 'E-Wallet',
    notes: 'Pembayaran listrik token dan langganan WiFi rumah',
  },
  {
    id: 'exp-3',
    memberId: 'm-1',
    memberName: 'Ayah Hendra',
    amount: 1200000,
    category: 'Education',
    date: '2026-08-03',
    merchant: 'Sekolah Dasar Islam Rayhan',
    paymentMethod: 'Bank Transfer',
    notes: 'SPP bulanan anak Rayhan',
  },
  {
    id: 'exp-4',
    memberId: 'm-2',
    memberName: 'Ibu Ratna',
    amount: 350000,
    category: 'Health',
    date: '2026-08-04',
    merchant: 'Apotek K-24',
    paymentMethod: 'Cash',
    notes: 'Vitamin keluarga & suplemen',
  },
];

const initialDebts: DebtModel[] = [
  {
    id: 'dbt-1',
    category: 'Mortgage',
    title: 'KPR Rumah Cluster Asri',
    totalAmount: 450000000,
    remainingAmount: 280000000,
    monthlyPayment: 3800000,
    dueDateDay: 10,
    creditor: 'Bank Mandiri KPR',
    isPaidOff: false,
  },
  {
    id: 'dbt-2',
    category: 'Installment',
    title: 'Cicilan Laptop Kerja Ibu',
    totalAmount: 12000000,
    remainingAmount: 3000000,
    monthlyPayment: 1000000,
    dueDateDay: 20,
    creditor: 'BCA Finance',
    isPaidOff: false,
  },
];

const initialBills: BillModel[] = [
  {
    id: 'bll-1',
    category: 'Electricity',
    title: 'Tagihan Listrik PLN 3500VA',
    amount: 850000,
    dueDate: '2026-08-15',
    isPaid: true,
    billerName: 'PLN Indonesia',
  },
  {
    id: 'bll-2',
    category: 'Internet',
    title: 'WiFi Fiber Optik 100Mbps',
    amount: 450000,
    dueDate: '2026-08-20',
    isPaid: false,
    billerName: 'Indihome / Telkom',
  },
  {
    id: 'bll-3',
    category: 'Insurance',
    title: 'Asuransi Kesehatan Keluarga (Prudential)',
    amount: 1650000,
    dueDate: '2026-08-25',
    isPaid: false,
    billerName: 'Prudential Indonesia',
  },
];

const initialAllowances: AllowanceModel[] = [
  {
    id: 'alw-1',
    memberId: 'm-3',
    memberName: 'Rayhan',
    type: 'Pocket Money',
    amount: 150000,
    frequency: 'Weekly',
    lastGivenDate: '2026-08-01',
  },
];

const initialSubscriptions: SubscriptionModel[] = [
  {
    id: 'sub-1',
    category: 'Netflix',
    serviceName: 'Netflix Family Premium 4K',
    cost: 186000,
    billingCycle: 'Monthly',
    nextBillingDate: '2026-08-18',
    isActive: true,
  },
  {
    id: 'sub-2',
    category: 'Spotify',
    serviceName: 'Spotify Family Plan',
    cost: 86000,
    billingCycle: 'Monthly',
    nextBillingDate: '2026-08-22',
    isActive: true,
  },
  {
    id: 'sub-3',
    category: 'Cloud Storage',
    serviceName: 'Google One 2TB Family Sharing',
    cost: 135000,
    billingCycle: 'Monthly',
    nextBillingDate: '2026-08-28',
    isActive: true,
  },
];

const initialReceipts: ReceiptModel[] = [
  {
    id: 'rcp-1',
    merchant: 'Supermarket Grand Lucky',
    amount: 1850000,
    date: '2026-08-02',
    category: 'Food',
    status: 'Verified',
  },
];

export class FinanceRepository {
  private incomes: IncomeModel[] = [...initialIncomes];
  private expenses: ExpenseModel[] = [...initialExpenses];
  private debts: DebtModel[] = [...initialDebts];
  private bills: BillModel[] = [...initialBills];
  private allowances: AllowanceModel[] = [...initialAllowances];
  private subscriptions: SubscriptionModel[] = [...initialSubscriptions];
  private receipts: ReceiptModel[] = [...initialReceipts];

  async getIncomes(memberId?: string): Promise<IncomeModel[]> {
    if (!memberId) return this.incomes;
    return this.incomes.filter((i) => i.memberId === memberId);
  }

  async addIncome(inc: Omit<IncomeModel, 'id'>): Promise<IncomeModel> {
    const newInc: IncomeModel = {
      ...inc,
      id: `inc-${Date.now()}`,
    };
    this.incomes.unshift(newInc);
    return newInc;
  }

  async getExpenses(memberId?: string): Promise<ExpenseModel[]> {
    if (!memberId) return this.expenses;
    return this.expenses.filter((e) => e.memberId === memberId);
  }

  async addExpense(exp: Omit<ExpenseModel, 'id'>): Promise<ExpenseModel> {
    const newExp: ExpenseModel = {
      ...exp,
      id: `exp-${Date.now()}`,
    };
    this.expenses.unshift(newExp);
    return newExp;
  }

  async getDebts(): Promise<DebtModel[]> {
    return this.debts;
  }

  async addDebt(dbt: Omit<DebtModel, 'id' | 'isPaidOff'>): Promise<DebtModel> {
    const newDbt: DebtModel = {
      ...dbt,
      id: `dbt-${Date.now()}`,
      isPaidOff: false,
    };
    this.debts.unshift(newDbt);
    return newDbt;
  }

  async payDebtInstallment(id: string, amount: number): Promise<DebtModel | undefined> {
    const dbt = this.debts.find((d) => d.id === id);
    if (dbt) {
      dbt.remainingAmount = Math.max(0, dbt.remainingAmount - amount);
      if (dbt.remainingAmount === 0) dbt.isPaidOff = true;
    }
    return dbt;
  }

  async getBills(): Promise<BillModel[]> {
    return this.bills;
  }

  async toggleBillPaid(id: string): Promise<BillModel | undefined> {
    const bill = this.bills.find((b) => b.id === id);
    if (bill) {
      bill.isPaid = !bill.isPaid;
    }
    return bill;
  }

  async addBill(bill: Omit<BillModel, 'id' | 'isPaid'>): Promise<BillModel> {
    const newBill: BillModel = {
      ...bill,
      id: `bll-${Date.now()}`,
      isPaid: false,
    };
    this.bills.unshift(newBill);
    return newBill;
  }

  async getAllowances(): Promise<AllowanceModel[]> {
    return this.allowances;
  }

  async addAllowance(alw: Omit<AllowanceModel, 'id'>): Promise<AllowanceModel> {
    const newAlw: AllowanceModel = {
      ...alw,
      id: `alw-${Date.now()}`,
    };
    this.allowances.unshift(newAlw);
    return newAlw;
  }

  async getSubscriptions(): Promise<SubscriptionModel[]> {
    return this.subscriptions;
  }

  async addSubscription(sub: Omit<SubscriptionModel, 'id'>): Promise<SubscriptionModel> {
    const newSub: SubscriptionModel = {
      ...sub,
      id: `sub-${Date.now()}`,
    };
    this.subscriptions.unshift(newSub);
    return newSub;
  }

  async getReceipts(): Promise<ReceiptModel[]> {
    return this.receipts;
  }

  async addReceipt(rcp: Omit<ReceiptModel, 'id' | 'status'>): Promise<ReceiptModel> {
    const newRcp: ReceiptModel = {
      ...rcp,
      id: `rcp-${Date.now()}`,
      status: 'Verified',
    };
    this.receipts.unshift(newRcp);
    return newRcp;
  }
}
