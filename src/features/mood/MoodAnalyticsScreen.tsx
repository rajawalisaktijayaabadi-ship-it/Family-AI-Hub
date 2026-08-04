import React, { useState } from 'react';
import { useMoodStore } from '../../stores/useMoodStore';
import { MoodService } from '../../services/MoodService';
import { BarChart3, TrendingUp, PieChart, Calendar as CalendarIcon, Filter, Activity } from 'lucide-react';

export const MoodAnalyticsScreen: React.FC = () => {
  const { moods, filterTimeRange, filterMember, setFilterTimeRange, setFilterMember } = useMoodStore();

  const filteredMoods = MoodService.filterMoods(moods, filterTimeRange, filterMember);

  // Frequency calculation for Categories
  const categoryCounts: Record<string, number> = {};
  filteredMoods.forEach((m) => {
    categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
  });

  const totalCount = Math.max(filteredMoods.length, 1);

  // Tag Frequency
  const tagCounts: Record<string, number> = {};
  filteredMoods.forEach((m) => {
    m.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Days simulation for calendar view
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-4 font-sans">
      {/* Filter Toolbar */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-2 justify-between items-center text-xs">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          {(['today', '7d', '30d', '90d', '1y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setFilterTimeRange(range)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase transition ${
                filterTimeRange === range
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300'
              }`}
            >
              {range === 'today' ? 'Hari Ini' : range}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 w-full sm:w-auto justify-end">
          {(['all', 'Ayah', 'Ibu', 'Anak'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setFilterMember(m)}
              className={`px-2 py-1 rounded-xl text-[10px] font-bold transition ${
                filterMember === m
                  ? 'bg-teal-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-500'
              }`}
            >
              {m === 'all' ? 'Semua' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Chart 1: Mood Trend (Line / Area Representation) */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
                Tren Stabilitas Emosi (Mood Trend)
              </h4>
              <p className="text-[10px] text-slate-400">Variasi intensitas energi emosi harian</p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-blue-600 dark:text-teal-400 font-mono">
            Rata-rata: 8.2 / 10
          </span>
        </div>

        {/* Dynamic SVG Sparkline Area Chart */}
        <div className="h-32 w-full pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Background Grid Lines */}
            <line x1="0" y1="10" x2="300" y2="10" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeDasharray="3 3" />
            <line x1="0" y1="40" x2="300" y2="40" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeDasharray="3 3" />
            <line x1="0" y1="70" x2="300" y2="70" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeDasharray="3 3" />

            {/* Area path */}
            <path
              d="M 0,50 Q 50,20 100,30 T 200,15 T 300,35 L 300,80 L 0,80 Z"
              fill="url(#moodGradient)"
            />

            {/* Line path */}
            <path
              d="M 0,50 Q 50,20 100,30 T 200,15 T 300,35"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Data points */}
            <circle cx="0" cy="50" r="4" fill="#3b82f6" />
            <circle cx="75" cy="25" r="4" fill="#10b981" />
            <circle cx="150" cy="22" r="4" fill="#3b82f6" />
            <circle cx="225" cy="18" r="4" fill="#f59e0b" />
            <circle cx="300" cy="35" r="4" fill="#3b82f6" />
          </svg>
        </div>

        <div className="flex justify-between text-[9px] font-bold text-slate-400 pt-1">
          <span>Senin</span>
          <span>Rabu</span>
          <span>Jumat</span>
          <span>Minggu</span>
        </div>
      </div>

      {/* Chart 2: Mood Distribution Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-500" />
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
              Distribusi Kategori Mood
            </h4>
          </div>

          <div className="space-y-2">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / totalCount) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    <span>{cat}</span>
                    <span>{pct}% ({count})</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 3: Top Emotion Frequency Tags */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-500" />
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
              Frekuensi Emosi Terbanyak
            </h4>
          </div>

          <div className="space-y-2">
            {sortedTags.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Belum ada tag tercatat</p>
            ) : (
              sortedTags.map(([tag, count]) => {
                const maxCount = Math.max(...sortedTags.map((x) => x[1]), 1);
                const pct = Math.round((count / maxCount) * 100);
                return (
                  <div key={tag} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      <span>#{tag}</span>
                      <span>{count}x</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Mood Calendar View */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-teal-500" />
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
              Kalender Mood Bulanan
            </h4>
          </div>
          <span className="text-[10px] font-bold text-slate-400">Bulan Ini</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
            <span key={d} className="text-[9px] font-bold text-slate-400">
              {d}
            </span>
          ))}

          {daysInMonth.map((day) => {
            // Mock day colors
            const moodColor =
              day % 5 === 0
                ? 'bg-amber-400 text-slate-900'
                : day % 3 === 0
                ? 'bg-emerald-500 text-white'
                : day % 7 === 0
                ? 'bg-purple-500 text-white'
                : 'bg-blue-500 text-white';

            return (
              <div
                key={day}
                className={`h-8 rounded-xl flex items-center justify-center text-[10px] font-extrabold transition shadow-2xs ${moodColor}`}
                title={`Tanggal ${day}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
