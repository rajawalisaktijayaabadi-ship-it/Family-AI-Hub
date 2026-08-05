import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  PieChart,
  BarChart3,
  ShieldAlert,
  Award,
  ArrowUpRight,
} from 'lucide-react';

export const AdminSaaSOverviewTab: React.FC = () => {
  return (
    <div className="space-y-4 text-xs font-sans">
      {/* Executive SaaS Metrics Card */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl space-y-3 shadow-xl border border-slate-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-wider block">
                Admin SaaS Executive Overview
              </span>
              <h3 className="text-sm font-extrabold text-white">
                Metrik Pendapatan & Pertumbuhan FamilyAI
              </h3>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-extrabold text-[9px] rounded-full border border-emerald-400/30 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +28.4% MoM
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-0.5">
            <span className="text-[10px] text-indigo-200">MRR (Monthly Recurring Revenue)</span>
            <span className="text-base font-black text-emerald-400 block">
              Rp 48.500.000
            </span>
          </div>

          <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-0.5">
            <span className="text-[10px] text-indigo-200">ARR (Annual Run Rate)</span>
            <span className="text-base font-black text-cyan-400 block">
              Rp 582.000.000
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 font-bold block">Total Workspaces</span>
          <span className="text-lg font-black text-slate-900 dark:text-white">1,420</span>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 font-bold block">Paid Subscribers</span>
          <span className="text-lg font-black text-emerald-600">894</span>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] text-slate-500 font-bold block">Conversion Rate</span>
          <span className="text-lg font-black text-indigo-600">62.9%</span>
        </div>
      </div>

      {/* Subscription Distribution Chart Representation */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <PieChart className="w-4 h-4 text-emerald-600" />
          Distribusi Paket Langganan Terlaris
        </h4>

        <div className="space-y-2 text-[11px]">
          <div>
            <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 pb-1">
              <span>Family Premium Pro (Rp 79rb)</span>
              <span>48% (429 Keluarga)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[48%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 pb-1">
              <span>Family Starter (Rp 29rb)</span>
              <span>32% (286 Keluarga)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 w-[32%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 pb-1">
              <span>Family Plus Ultimate (Rp 149rb)</span>
              <span>12% (107 Keluarga)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[12%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 pb-1">
              <span>Lifetime Enterprise Pass (Rp 1.99jt)</span>
              <span>8% (72 Keluarga)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[8%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
