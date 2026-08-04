import React from 'react';
import { Calendar, CheckCircle2, Clock, Bell, Sparkles, ChevronRight, AlertCircle } from 'lucide-react';

interface TodaySummaryWidgetProps {
  onActionClick?: (actionKey: string) => void;
}

export const TodaySummaryWidget: React.FC<TodaySummaryWidgetProps> = ({ onActionClick }) => {
  const todayDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const summaryItems = [
    {
      id: 1,
      time: '08:00 WIB',
      title: 'Sarapan Bersama & Briefing Keluarga',
      status: 'Selesai',
      badge: 'Utama',
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    },
    {
      id: 2,
      time: '13:00 WIB',
      title: 'Cek Tensi & Obat Rutin Kakek',
      status: 'Mendatang',
      badge: 'Kesehatan',
      badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    },
    {
      id: 3,
      time: '15:30 WIB',
      title: 'Les Matematika Ahmad Rizky',
      status: 'Mendatang',
      badge: 'Pendidikan',
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    },
  ];

  return (
    <div className="space-y-3">
      {/* Date Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
            Agenda & Ringkasan ({todayDate})
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          3 Event Hari Ini
        </span>
      </div>

      {/* Summary List Items */}
      <div className="space-y-2">
        {summaryItems.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {item.status === 'Selesai' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              )}
              <div className="min-w-0">
                <p className="font-bold text-slate-800 dark:text-slate-100 truncate">
                  {item.title}
                </p>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {item.time}
                </span>
              </div>
            </div>

            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full shrink-0 ${item.badgeColor}`}>
              {item.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Upcoming Event Alert Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-100 text-[11px]">
              Upcoming Event: Arisan Keluarga Besar
            </p>
            <p className="text-[10px] text-slate-500">
              Sabtu, 8 Agustus 2026 • Rumah Ibu Siti
            </p>
          </div>
        </div>
        <button
          onClick={() => onActionClick?.('ADD_SCHEDULE_MODAL')}
          className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5"
        >
          Detail <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
