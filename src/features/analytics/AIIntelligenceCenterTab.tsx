import React, { useState } from 'react';
import { useAnalyticsStore } from '../../stores/useAnalyticsStore';
import {
  Brain,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Filter,
  CheckCircle,
  Clock,
  Archive,
} from 'lucide-react';
import { InsightCategory } from '../../types/analytics';

export const AIIntelligenceCenterTab: React.FC = () => {
  const { insights } = useAnalyticsStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: string[] = [
    'All',
    'Family',
    'Health',
    'Finance',
    'Education',
    'Parenting',
    'Mood',
    'Meal',
    'Safety',
  ];

  const filteredInsights = insights.filter(
    (ins) => selectedCategory === 'All' || ins.category === selectedCategory
  );

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-900 text-white p-5 rounded-3xl border border-purple-800/60 shadow-xl space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">AI Intelligence Center</h3>
            <p className="text-[11px] text-purple-200">Rekomendasi Cerdas, Deteksi Risiko & Prediksi Tren</p>
          </div>
        </div>

        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs text-purple-100 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" /> Model Prediktif Mock Active
          </span>
          <span className="text-[10px] bg-purple-500/30 px-2.5 py-0.5 rounded-full font-black border border-purple-400/30">
            3 Insight Baru
          </span>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Insight Cards List */}
      <div className="space-y-3">
        {filteredInsights.map((ins) => (
          <div
            key={ins.id}
            className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-amber-300 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <span
                  className={`text-[9px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider ${
                    ins.priority === 'High'
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  Prioritas {ins.priority} • {ins.category}
                </span>
                <h4 className="text-xs font-black text-slate-900 dark:text-white pt-1">
                  {ins.title}
                </h4>
              </div>

              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> {ins.date}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {ins.description}
            </p>

            {/* Actionable Step Box */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900/50 space-y-1">
              <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                Langkah Tindakan Direkomendasikan:
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {ins.actionableStep}
              </p>
            </div>

            {/* Risk & Trend Prediction Placeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {ins.riskDetection && (
                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200 flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black block text-[10px]">Deteksi Risiko</span>
                    <span>{ins.riskDetection}</span>
                  </div>
                </div>
              )}

              {ins.trendPrediction && (
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-900/40 text-indigo-900 dark:text-indigo-200 flex items-start gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black block text-[10px]">Prediksi Tren</span>
                    <span>{ins.trendPrediction}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
