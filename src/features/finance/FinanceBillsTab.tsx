import React, { useState } from 'react';
import { useFinanceStore } from '../../stores/useFinanceStore';
import { FileText, CheckCircle2, Clock, Plus, CreditCard, Shield, UserCheck } from 'lucide-react';

export const FinanceBillsTab: React.FC = () => {
  const { bills, debts, allowances, toggleBill, addBill, payDebt, addDebt, addAllowance } = useFinanceStore();

  const [showAddBill, setShowAddBill] = useState(false);
  const [billTitle, setBillTitle] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billCategory, setBillCategory] = useState<
    'Electricity' | 'Water' | 'Internet' | 'Insurance' | 'School' | 'Credit Card' | 'Other'
  >('Electricity');
  const [billDueDate, setBillDueDate] = useState('');

  const [payDebtModalId, setPayDebtModalId] = useState<string | null>(null);
  const [debtPayAmt, setDebtPayAmt] = useState('');

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAddBill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!billTitle || !billAmount) return;

    await addBill({
      title: billTitle,
      amount: Number(billAmount),
      category: billCategory,
      dueDate: billDueDate || '2026-08-25',
      billerName: billCategory,
    });

    setBillTitle('');
    setBillAmount('');
    setBillDueDate('');
    setShowAddBill(false);
  };

  const handlePayDebtSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payDebtModalId || !debtPayAmt) return;

    await payDebt(payDebtModalId, Number(debtPayAmt));
    setPayDebtModalId(null);
    setDebtPayAmt('');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Bill Reminders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-600" />
              <span>Pengingat Tagihan Bulanan</span>
            </h3>
            <p className="text-xs text-slate-500">Peringatan otomatis sebelum jatuh tempo</p>
          </div>
          <button
            onClick={() => setShowAddBill(true)}
            className="flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tagihan Baru</span>
          </button>
        </div>

        {showAddBill && (
          <form onSubmit={handleAddBill} className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-3">
            <h4 className="text-xs font-bold text-emerald-900">Tambah Tagihan Rutin</h4>
            <input
              type="text"
              placeholder="Judul Tagihan (misal: Listrik PLN)"
              value={billTitle}
              onChange={(e) => setBillTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Jumlah (Rp)"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                required
              />
              <input
                type="date"
                value={billDueDate}
                onChange={(e) => setBillDueDate(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddBill(false)}
                className="px-3 py-1 text-xs text-slate-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white"
              >
                Simpan Tagihan
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2.5">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className={`flex items-center justify-between rounded-2xl border p-4 shadow-sm transition ${
                bill.isPaid ? 'bg-slate-50/70 border-slate-200' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleBill(bill.id)}
                  className={`p-1.5 rounded-full transition ${
                    bill.isPaid ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                </button>
                <div>
                  <p className={`text-xs font-bold ${bill.isPaid ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                    {bill.title}
                  </p>
                  <p className="text-[11px] text-slate-500">Jatuh Tempo: {bill.dueDate}</p>
                </div>
              </div>

              <div className="text-right">
                <p className={`text-xs font-bold ${bill.isPaid ? 'text-slate-400' : 'text-slate-900'}`}>
                  {formatIDR(bill.amount)}
                </p>
                <span
                  className={`text-[10px] font-semibold ${
                    bill.isPaid ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  {bill.isPaid ? 'Lunas' : 'Belum Dibayar'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Debt & KPR Installments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-emerald-600" />
              <span>Manajemen Cicilan & KPR</span>
            </h3>
            <p className="text-xs text-slate-500">Pantau sisa pokok & pembayaran rutin bulanan</p>
          </div>
        </div>

        {payDebtModalId && (
          <form onSubmit={handlePayDebtSubmit} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 space-y-3">
            <h4 className="text-xs font-bold text-emerald-900">Bayar Angsuran Cicilan</h4>
            <input
              type="number"
              placeholder="Jumlah Pembayaran (Rp)"
              value={debtPayAmt}
              onChange={(e) => setDebtPayAmt(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPayDebtModalId(null)}
                className="px-3 py-1 text-xs text-slate-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white"
              >
                Catat Pembayaran
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {debts.map((dbt) => {
            const pctPaid = Math.min(
              100,
              Math.round(((dbt.totalAmount - dbt.remainingAmount) / dbt.totalAmount) * 100)
            );

            return (
              <div key={dbt.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{dbt.title}</h4>
                    <p className="text-[11px] text-slate-500">Pemberi Pinjaman: {dbt.creditor}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    Sisa: {formatIDR(dbt.remainingAmount)}
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                    style={{ width: `${pctPaid}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Angsuran: {formatIDR(dbt.monthlyPayment)}/bln</span>
                  {!dbt.isPaidOff ? (
                    <button
                      onClick={() => setPayDebtModalId(dbt.id)}
                      className="font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      + Bayar Cicilan
                    </button>
                  ) : (
                    <span className="font-bold text-emerald-600">Lunas Sepenuhnya</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Family Allowance Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-emerald-600" />
              <span>Uang Saku Anggota Keluarga</span>
            </h3>
            <p className="text-xs text-slate-500">Alokasi uang saku anak & kebutuhan mandiri</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {allowances.map((alw) => (
            <div key={alw.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
              <div>
                <p className="text-xs font-bold text-slate-900">{alw.memberName}</p>
                <p className="text-[11px] text-slate-500">
                  Frekuensi: {alw.frequency} • Terakhir: {alw.lastGivenDate}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {formatIDR(alw.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
