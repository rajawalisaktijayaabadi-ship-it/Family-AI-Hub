import React from 'react';
import { BarChart2, TrendingUp, PieChart, ShieldCheck } from 'lucide-react';

export const ChartPlaceholderWidget: React.FC = () => {
  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
            Analitik & Performa Keluarga
          </span>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
          +14% Keharmonisan
        </span>
      </div>

      {/* Simulated Bar Chart UI */}
      <div className="space-y-2">
        <div className="flex items-end justify-between h-24 pt-2 gap-2 px-2 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          {[
            { day: 'Sen', val: 60, color: 'bg-indigo-500' },
            { day: 'Sel', val: 80, color: 'bg-indigo-500' },
            { day: 'Rab', val: 45, color: 'bg-indigo-400' },
            { day: 'Kam', val: 95, color: 'bg-indigo-600' },
            { day: 'Jum', val: 70, color: 'bg-indigo-500' },
            { day: 'Sab', val: 100, color: 'bg-purple-600' },
            { day: 'Min', val: 85, color: 'bg-indigo-500' },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <div
                className={`w-full rounded-t-lg transition-all ${bar.color}`}
                style={{ height: `${bar.val}%` }}
              />
              <span className="text-[9px] font-bold text-slate-400">{bar.day}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <span className="text-[10px] text-slate-400 block font-semibold">Produktivitas</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">92/100</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <span className="text-[10px] text-slate-400 block font-semibold">Skor Sehat</span>
            <span className="font-bold text-teal-600 dark:text-teal-400">95%</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <span className="text-[10px] text-slate-400 block font-semibold">Hemat Belanja</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Rp 450K</span>
          </div>
        </div>
      </div>
    </div>
  );
};
