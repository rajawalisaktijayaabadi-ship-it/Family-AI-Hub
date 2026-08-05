import React, { useState } from 'react';
import { useAnalyticsStore } from '../../stores/useAnalyticsStore';
import {
  Activity,
  Heart,
  DollarSign,
  Smile,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  Filter,
} from 'lucide-react';

export const DashboardAnalyticsTab: React.FC = () => {
  const { analytics } = useAnalyticsStore();
  const [timeframe, setTimeframe] = useState<'Overview' | 'Today' | 'Weekly' | 'Monthly' | 'Yearly'>('Overview');

  // Chart view selector
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  return (
    <div className="space-y-4">
      {/* Family Score Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-3xl border border-indigo-900/60 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Family Health & Harmony Index</h3>
              <p className="text-[11px] text-indigo-200">Skor Terpadu Kesehatan, Keuangan & Aktivitas</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-amber-400">{analytics.familyScore}</span>
            <span className="text-xs text-slate-300">/100</span>
          </div>
        </div>

        {/* AI Summary Quote */}
        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs text-indigo-100 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-amber-300">AI Analytics Summary:</strong> Kondisi keharmonisan keluarga minggu ini sangat prima. Tingkat kesehatan 92% & keamanan 96% terjaga sempurna.
          </p>
        </div>

        {/* Score Grid Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs font-bold">
          <div className="p-2.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-rose-400">
              <Heart className="w-4 h-4" /> Health
            </span>
            <span className="text-white font-black">{analytics.healthScore}%</span>
          </div>

          <div className="p-2.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <DollarSign className="w-4 h-4" /> Finance
            </span>
            <span className="text-white font-black">{analytics.financeScore}%</span>
          </div>

          <div className="p-2.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Smile className="w-4 h-4" /> Mood
            </span>
            <span className="text-white font-black">{analytics.moodScore}%</span>
          </div>

          <div className="p-2.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-blue-400">
              <BookOpen className="w-4 h-4" /> Education
            </span>
            <span className="text-white font-black">{analytics.educationScore}%</span>
          </div>

          <div className="p-2.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <ShieldCheck className="w-4 h-4" /> Safety
            </span>
            <span className="text-white font-black">{analytics.safetyScore}%</span>
          </div>

          <div className="p-2.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-purple-400">
              <CheckCircle2 className="w-4 h-4" /> Productivity
            </span>
            <span className="text-white font-black">{analytics.productivityCompletionRate}%</span>
          </div>
        </div>
      </div>

      {/* Global Dashboard Timeframe Switcher */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-600" />
            <span>Global Analytics Dashboard</span>
          </h4>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            {(['Overview', 'Today', 'Weekly', 'Monthly', 'Yearly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold transition ${
                  timeframe === t
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Chart Graphic Section */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">
              Tren Indeks Performa ({timeframe})
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setChartType('bar')}
                className={`p-1.5 rounded-lg text-xs font-bold ${
                  chartType === 'bar' ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Bar
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`p-1.5 rounded-lg text-xs font-bold ${
                  chartType === 'line' ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Line
              </button>
            </div>
          </div>

          {/* Render Bars / Lines */}
          {chartType === 'bar' ? (
            <div className="flex items-end justify-between gap-2 h-36 pt-4">
              {[
                { label: 'Sen', val: 82, col: 'bg-indigo-500' },
                { label: 'Sel', val: 88, col: 'bg-emerald-500' },
                { label: 'Rab', val: 92, col: 'bg-amber-500' },
                { label: 'Kam', val: 85, col: 'bg-rose-500' },
                { label: 'Jum', val: 95, col: 'bg-cyan-500' },
                { label: 'Sab', val: 90, col: 'bg-purple-500' },
                { label: 'Min', val: 88, col: 'bg-blue-500' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] font-bold text-slate-500">{bar.val}%</span>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-t-xl h-24 relative overflow-hidden flex items-end">
                    <div
                      className={`w-full ${bar.col} rounded-t-xl transition-all duration-500`}
                      style={{ height: `${bar.val}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-600 dark:text-slate-400">{bar.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-36 flex items-center justify-center border border-dashed border-amber-300 dark:border-amber-900 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 text-xs font-bold text-amber-800 dark:text-amber-300 gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600 animate-bounce" />
              <span>Garis Kurva Tren Menunjukkan Grafik Positif Naik 4.8% Minggu Ini</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
