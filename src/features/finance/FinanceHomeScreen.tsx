import React, { useEffect, useState } from 'react';
import { useFinanceStore } from '../../stores/useFinanceStore';
import { FinanceOverviewTab } from './FinanceOverviewTab';
import { FinanceBudgetTab } from './FinanceBudgetTab';
import { FinanceSavingsTab } from './FinanceSavingsTab';
import { FinanceBillsTab } from './FinanceBillsTab';
import { FinanceReceiptsTab } from './FinanceReceiptsTab';
import {
  Wallet,
  PieChart,
  PiggyBank,
  Clock,
  FileSpreadsheet,
  Plus,
  X,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

export const FinanceHomeScreen: React.FC = () => {
  const { initialize, addIncome, addExpense, isLoading } = useFinanceStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'savings' | 'bills' | 'receipts'>('overview');

  // Modals state
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  // Form states
  const [memberName, setMemberName] = useState('Ayah Hendra');
  const [memberId, setMemberId] = useState('m-1');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [merchant, setMerchant] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Debit Card' | 'Credit Card' | 'E-Wallet' | 'Bank Transfer'>('E-Wallet');

  useEffect(() => {
    initialize();
  }, []);

  const handleIncomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    await addIncome({
      memberId,
      memberName,
      amount: Number(amount),
      category: category as any,
      date: new Date().toISOString().split('T')[0],
      source: notes || 'Pemasukan Kas',
      notes,
    });

    setAmount('');
    setNotes('');
    setShowIncomeModal(false);
  };

  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    await addExpense({
      memberId,
      memberName,
      amount: Number(amount),
      category: category as any,
      date: new Date().toISOString().split('T')[0],
      merchant: merchant || 'Toko / Merchant',
      paymentMethod,
      notes,
    });

    setAmount('');
    setNotes('');
    setMerchant('');
    setShowExpenseModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <p className="text-xs font-semibold text-slate-500">Memuat Modul Finance AI...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-4 space-y-4 max-w-md mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Wallet className="h-6 w-6 text-emerald-600" />
            <span>Finance AI</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Pengelolaan Keuangan, Anggaran & Investasi</p>
        </div>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-200">
          IDR • Rupiah
        </span>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wallet className="h-3.5 w-3.5" />
          <span>Ringkasan</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'budget'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PieChart className="h-3.5 w-3.5" />
          <span>Anggaran & Target</span>
        </button>

        <button
          onClick={() => setActiveTab('savings')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'savings'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PiggyBank className="h-3.5 w-3.5" />
          <span>Tabungan & Investasi</span>
        </button>

        <button
          onClick={() => setActiveTab('bills')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'bills'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>Tagihan & KPR</span>
        </button>

        <button
          onClick={() => setActiveTab('receipts')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'receipts'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="h-3.5 w-3.5" />
          <span>Struk & Laporan</span>
        </button>
      </div>

      {/* Main Tab Contents */}
      {activeTab === 'overview' && (
        <FinanceOverviewTab
          onOpenAddIncome={() => setShowIncomeModal(true)}
          onOpenAddExpense={() => setShowExpenseModal(true)}
        />
      )}
      {activeTab === 'budget' && <FinanceBudgetTab />}
      {activeTab === 'savings' && <FinanceSavingsTab />}
      {activeTab === 'bills' && <FinanceBillsTab />}
      {activeTab === 'receipts' && <FinanceReceiptsTab />}

      {/* Add Income Modal */}
      {showIncomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span>Tambah Pemasukan Kas</span>
              </h3>
              <button onClick={() => setShowIncomeModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleIncomeSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700">Anggota Keluarga</label>
                <select
                  value={memberId}
                  onChange={(e) => {
                    setMemberId(e.target.value);
                    setMemberName(e.target.value === 'm-1' ? 'Ayah Hendra' : 'Ibu Ratna');
                  }}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="m-1">Ayah Hendra</option>
                  <option value="m-2">Ibu Ratna</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Nominal (Rp)</label>
                <input
                  type="number"
                  placeholder="misal: 5000000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                  required
                >
                  <option value="">-- Pilih Kategori --</option>
                  <option value="Salary">Gaji Bulanan Utama</option>
                  <option value="Freelance">Honor Freelance</option>
                  <option value="Business">Hasil Usaha / Bisnis</option>
                  <option value="Investment Return">Deviden / Gain Investasi</option>
                  <option value="Bonus">Bonus / THR</option>
                  <option value="Other">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Catatan / Sumber</label>
                <input
                  type="text"
                  placeholder="misal: Transfer Gaji Kantor"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowIncomeModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm"
                >
                  Simpan Pemasukan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-rose-600" />
                <span>Catat Pengeluaran Baru</span>
              </h3>
              <button onClick={() => setShowExpenseModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleExpenseSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700">Anggota Keluarga</label>
                <select
                  value={memberId}
                  onChange={(e) => {
                    setMemberId(e.target.value);
                    setMemberName(e.target.value === 'm-1' ? 'Ayah Hendra' : 'Ibu Ratna');
                  }}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="m-1">Ayah Hendra</option>
                  <option value="m-2">Ibu Ratna</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Nominal Pengeluaran (Rp)</label>
                <input
                  type="number"
                  placeholder="misal: 150000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Merchant / Toko</label>
                <input
                  type="text"
                  placeholder="misal: Supermarket Grand Lucky"
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Kategori Pos Anggaran</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                  required
                >
                  <option value="">-- Pilih Kategori Pos --</option>
                  <option value="Food">Food (Bahan Makanan / Makan)</option>
                  <option value="Utilities">Utilities (Listrik/Air/WiFi)</option>
                  <option value="Education">Education (Sekolah/Les)</option>
                  <option value="Health">Health (Obat/Kesehatan)</option>
                  <option value="Shopping">Shopping (Belanja)</option>
                  <option value="Transportation">Transportation (Bensin/Tol)</option>
                  <option value="Entertainment">Entertainment (Hiburan)</option>
                  <option value="Debt Payment">Debt Payment (Cicilan)</option>
                  <option value="Other">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Metode Pembayaran</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="E-Wallet">E-Wallet (GoPay/OVO/ShopeePay/Dana)</option>
                  <option value="Credit Card">Kartu Kredit</option>
                  <option value="Debit Card">Kartu Debit</option>
                  <option value="Bank Transfer">Transfer Bank</option>
                  <option value="Cash">Uang Tunai (Cash)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-rose-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm"
                >
                  Simpan Pengeluaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
