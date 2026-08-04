import React, { useState } from 'react';
import { useFinanceStore } from '../../stores/useFinanceStore';
import { PiggyBank, TrendingUp, Plus, ShieldCheck, DollarSign, Award } from 'lucide-react';

export const FinanceSavingsTab: React.FC = () => {
  const { savings, investments, depositSaving, addInvestment, addSaving } = useFinanceStore();

  const [showAddInv, setShowAddInv] = useState(false);
  const [assetName, setAssetName] = useState('');
  const [assetCategory, setAssetCategory] = useState<
    'Mutual Fund' | 'Stock' | 'Gold' | 'Crypto' | 'Property' | 'Government Bond'
  >('Mutual Fund');
  const [initialVal, setInitialVal] = useState('');
  const [currentVal, setCurrentVal] = useState('');

  const [depositModalId, setDepositModalId] = useState<string | null>(null);
  const [depositAmt, setDepositAmt] = useState('');

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const totalPortfolioValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalInitialPortfolio = investments.reduce((sum, inv) => sum + inv.initialValue, 0);
  const totalReturnAmount = totalPortfolioValue - totalInitialPortfolio;
  const overallReturnPercent =
    totalInitialPortfolio > 0
      ? Number(((totalReturnAmount / totalInitialPortfolio) * 100).toFixed(1))
      : 0;

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositModalId || !depositAmt) return;
    await depositSaving(depositModalId, Number(depositAmt));
    setDepositModalId(null);
    setDepositAmt('');
  };

  const handleAddInvestment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName || !initialVal || !currentVal) return;
    await addInvestment({
      assetName,
      category: assetCategory,
      initialValue: Number(initialVal),
      currentValue: Number(currentVal),
      returnPercent: 0,
    });
    setAssetName('');
    setInitialVal('');
    setCurrentVal('');
    setShowAddInv(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Total Investment Summary Card */}
      <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-lg space-y-4 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs font-bold tracking-wider uppercase">Portfolio Portofolio Investasi</span>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
            Gain: +{overallReturnPercent}%
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-white">{formatIDR(totalPortfolioValue)}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Keuntungan Bersih: <span className="text-emerald-400 font-bold">+{formatIDR(totalReturnAmount)}</span>
          </p>
        </div>
      </div>

      {/* Savings Pos Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-emerald-600" />
              <span>Pos Tabungan Terpisah</span>
            </h3>
            <p className="text-xs text-slate-500">Rekening & pos alokasi dana khusus</p>
          </div>
        </div>

        <div className="space-y-3">
          {savings.map((s) => {
            const pct = Math.min(100, Math.round((s.currentAmount / s.targetAmount) * 100));

            return (
              <div
                key={s.id}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{s.title}</span>
                    <p className="text-[11px] text-slate-500">{s.notes}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    {formatIDR(s.currentAmount)}
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Tercapai: {pct}%</span>
                  <button
                    onClick={() => setDepositModalId(s.id)}
                    className="font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    + Setor Dana
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {depositModalId && (
          <form onSubmit={handleDeposit} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 space-y-3">
            <h4 className="text-xs font-bold text-emerald-900">Setor Tambahan Pos Tabungan</h4>
            <input
              type="number"
              placeholder="Jumlah Setoran (Rp)"
              value={depositAmt}
              onChange={(e) => setDepositAmt(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDepositModalId(null)}
                className="px-3 py-1 text-xs font-medium text-slate-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white"
              >
                Konfirmasi Setoran
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Investment Assets Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-600" />
              <span>Aset Investasi Keluarga</span>
            </h3>
            <p className="text-xs text-slate-500">Pertumbuhan aset jangka panjang</p>
          </div>
          <button
            onClick={() => setShowAddInv(true)}
            className="flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Aset Baru</span>
          </button>
        </div>

        {showAddInv && (
          <form onSubmit={handleAddInvestment} className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-3">
            <h4 className="text-xs font-bold text-emerald-900">Tambah Aset Investasi Baru</h4>
            <input
              type="text"
              placeholder="Nama Aset (misal: SBN ORI025 / Emas Antam)"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
              required
            />
            <select
              value={assetCategory}
              onChange={(e) => setAssetCategory(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
            >
              <option value="Mutual Fund">Reksadana</option>
              <option value="Gold">Emas Antam / Mulia</option>
              <option value="Stock">Saham / ETF</option>
              <option value="Government Bond">Obligasi Negara / ORI / SBR</option>
              <option value="Property">Properti / Tanah</option>
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Modal Awal (Rp)"
                value={initialVal}
                onChange={(e) => setInitialVal(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                required
              />
              <input
                type="number"
                placeholder="Nilai Sekarang (Rp)"
                value={currentVal}
                onChange={(e) => setCurrentVal(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddInv(false)}
                className="px-3 py-1.5 text-xs text-slate-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white"
              >
                Simpan Aset
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {investments.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div>
                <p className="text-xs font-bold text-slate-900">{inv.assetName}</p>
                <p className="text-[11px] text-slate-500">
                  Modal: {formatIDR(inv.initialValue)} • {inv.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">{formatIDR(inv.currentValue)}</p>
                <span className="text-[11px] font-bold text-emerald-600">
                  +{inv.returnPercent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
