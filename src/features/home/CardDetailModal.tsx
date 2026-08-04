import React from 'react';
import { DashboardCardItem } from '../../types/dashboard';
import { X, Check, Sparkles, Plus, ChevronRight } from 'lucide-react';

interface CardDetailModalProps {
  card: DashboardCardItem | null;
  onClose: () => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-[32px] sm:rounded-3xl p-6 w-full max-w-md shadow-2xl relative max-h-[85vh] overflow-y-auto no-scrollbar font-sans">
        {/* Drag handle pill for mobile modal feel */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-300 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.gradient} flex items-center justify-center p-1 border border-slate-200/50 dark:border-slate-700/50`}
          >
            <Sparkles className="w-6 h-6 text-slate-800 dark:text-white" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Modul Keluarga
            </span>
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white leading-tight">
              {card.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed bg-white/60 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
          {card.summary}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {card.metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm"
            >
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block">
                {m.label}
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white font-heading mt-0.5 block">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Items / Timeline List */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs font-bold font-heading text-slate-800 dark:text-slate-200">
            Catatan Harian Terkini:
          </h4>
          <div className="space-y-2">
            {card.recentItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300"
              >
                <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span className="leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-2xl shadow-md active-press flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Tambah Catatan Baru
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-2xl active-press flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
