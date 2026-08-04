import React, { useState } from 'react';
import { useFinanceStore } from '../../stores/useFinanceStore';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Sparkles,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  AlertCircle,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

interface Props {
  onOpenAddIncome: () => void;
  onOpenAddExpense: () => void;
}

export const FinanceOverviewTab: React.FC<Props> = ({ onOpenAddIncome, onOpenAddExpense }) => {
  const { cashFlow, aiInsight, expenses, incomes, bills, subscriptions } = useFinanceStore();

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const unpaidBills = bills.filter((b) => !b.isPaid);

  return (
    <div className="space-y-6 pb-20">
      {/* Animated Luxury Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-emerald-950 to-emerald-900 p-6 text-white shadow-xl border border-emerald-500/20">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-emerald-300">
            <Wallet className="h-5 w-5" />
            <span className="text-xs font-semibold tracking-wider uppercase">Saldo Bersih Kas Keluarga</span>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/30">
            Rasio Tabungan: {cashFlow.savingsRatePercent}%
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            {formatIDR(cashFlow.netBalance)}
          </h2>
          <p className="text-xs text-slate-300 mt-1">Perhitungan Arus Kas Real-time Bulan Agustus 2026</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ArrowDownLeft className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-300">Total Pemasukan</p>
              <p className="text-sm font-bold text-white">{formatIDR(cashFlow.totalIncome)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-300">Total Pengeluaran</p>
              <p className="text-sm font-bold text-white">{formatIDR(cashFlow.totalExpense)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Transaction Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenAddIncome}
          className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 p-3.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 transition active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Pemasukan</span>
        </button>
        <button
          onClick={onOpenAddExpense}
          className="flex items-center justify-center gap-2 rounded-2xl bg-rose-500 p-3.5 text-sm font-semibold text-white shadow-md hover:bg-rose-600 transition active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Catat Pengeluaran</span>
        </button>
      </div>

      {/* AI Financial Insight Card */}
      {aiInsight && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Finance AI Insight</h3>
                <p className="text-xs text-emerald-800 font-medium">Skor Kesehatan: {aiInsight.financialScore}/100</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              Mock AI Engine
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed mb-4">{aiInsight.dailySummary}</p>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Rekomendasi AI:</h4>
            {aiInsight.budgetRecommendations.slice(0, 2).map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{rec}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center gap-2 text-xs text-emerald-800 font-medium italic">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>"{aiInsight.financialMotivation}"</span>
          </div>
        </div>
      )}

      {/* Unpaid Bills Alert Header */}
      {unpaidBills.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900">{unpaidBills.length} Tagihan Menunggu Pembayaran</p>
              <p className="text-xs text-amber-700">Total: {formatIDR(unpaidBills.reduce((s, b) => s + b.amount, 0))}</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-amber-800 underline">Lihat Tagihan</span>
        </div>
      )}

      {/* Active Subscriptions Quick Overview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-emerald-600" />
            <span>Langganan Aktif Keluarga ({subscriptions.length})</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Total: {formatIDR(subscriptions.reduce((s, sub) => s + sub.cost, 0))}/bln
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
              <div>
                <p className="text-xs font-bold text-slate-900">{sub.serviceName}</p>
                <p className="text-[11px] text-slate-500">Jatuh Tempo: {sub.nextBillingDate}</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {formatIDR(sub.cost)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Expense History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Riwayat Pengeluaran Terakhir</h3>
          <span className="text-xs text-emerald-600 font-semibold">Lihat Semua</span>
        </div>

        <div className="space-y-2">
          {expenses.slice(0, 5).map((exp) => (
            <div
              key={exp.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs">
                  {exp.category.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{exp.merchant}</p>
                  <p className="text-[11px] text-slate-500">
                    {exp.memberName} • {exp.date}
                  </p>
                </div>
              </div>
              <p className="text-xs font-bold text-rose-600">-{formatIDR(exp.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
