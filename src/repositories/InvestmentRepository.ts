import { SavingModel, InvestmentModel } from '../types/finance';

const initialSavings: SavingModel[] = [
  {
    id: 'svg-1',
    category: 'Emergency Fund',
    title: 'Dana Darurat Siaga Utama',
    targetAmount: 50000000,
    currentAmount: 32000000,
    deadline: '2026-12-31',
    notes: 'Disimpan di Reksadana Pasar Urang liquid',
  },
  {
    id: 'svg-2',
    category: 'Education Fund',
    title: 'Dana S1 Perguruan Tinggi Rayhan',
    targetAmount: 100000000,
    currentAmount: 42000000,
    deadline: '2032-06-01',
    notes: 'Investasi rutin obligasi negara & deposito',
  },
  {
    id: 'svg-3',
    category: 'Vacation Fund',
    title: 'Tabungan Umroh / Liburan Keluarga',
    targetAmount: 35000000,
    currentAmount: 18500000,
    deadline: '2027-04-01',
    notes: 'Target liburan keluarga bersama',
  },
];

const initialInvestments: InvestmentModel[] = [
  {
    id: 'inv-1',
    category: 'Mutual Fund',
    assetName: 'Reksadana Saham Sucorinvest',
    initialValue: 15000000,
    currentValue: 17850000,
    returnPercent: 19.0,
    lastUpdated: '2026-08-04',
  },
  {
    id: 'inv-2',
    category: 'Gold',
    assetName: 'Emas Antam LM (35 Gram)',
    initialValue: 35000000,
    currentValue: 42500000,
    returnPercent: 21.4,
    lastUpdated: '2026-08-04',
  },
  {
    id: 'inv-3',
    category: 'Stock',
    assetName: 'Saham BBCA & TLKM',
    initialValue: 20000000,
    currentValue: 23400000,
    returnPercent: 17.0,
    lastUpdated: '2026-08-04',
  },
];

export class InvestmentRepository {
  private savings: SavingModel[] = [...initialSavings];
  private investments: InvestmentModel[] = [...initialInvestments];

  async getSavings(): Promise<SavingModel[]> {
    return this.savings;
  }

  async addSaving(saving: Omit<SavingModel, 'id'>): Promise<SavingModel> {
    const newSaving: SavingModel = {
      ...saving,
      id: `svg-${Date.now()}`,
    };
    this.savings.unshift(newSaving);
    return newSaving;
  }

  async depositSaving(id: string, amount: number): Promise<SavingModel | undefined> {
    const item = this.savings.find((s) => s.id === id);
    if (item) {
      item.currentAmount += amount;
    }
    return item;
  }

  async getInvestments(): Promise<InvestmentModel[]> {
    return this.investments;
  }

  async addInvestment(inv: Omit<InvestmentModel, 'id' | 'lastUpdated'>): Promise<InvestmentModel> {
    const returnPct = Number(
      (((inv.currentValue - inv.initialValue) / inv.initialValue) * 100).toFixed(1)
    );
    const newInv: InvestmentModel = {
      ...inv,
      id: `inv-${Date.now()}`,
      returnPercent: returnPct,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    this.investments.unshift(newInv);
    return newInv;
  }
}
