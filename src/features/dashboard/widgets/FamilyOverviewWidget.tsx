import React from 'react';
import { Users, Activity, HeartPulse, Wallet, GraduationCap, ShieldCheck } from 'lucide-react';

interface FamilyOverviewWidgetProps {
  onCardClick?: (moduleKey: string) => void;
}

export const FamilyOverviewWidget: React.FC<FamilyOverviewWidgetProps> = ({ onCardClick }) => {
  const overviewCards = [
    {
      id: 'members',
      title: 'Anggota Keluarga',
      value: '4 Orang',
      sub: 'Semua Aktif',
      icon: Users,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 border-indigo-200 dark:border-indigo-800',
    },
    {
      id: 'activity',
      title: 'Aktivitas Hari Ini',
      value: '12 Catatan',
      sub: '+3 dibanding kemarin',
      icon: Activity,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/40 border-purple-200 dark:border-purple-800',
    },
    {
      id: 'health',
      title: 'Kesehatan (Placeholder)',
      value: 'Skor 95%',
      sub: 'Cek Obat & Tensi',
      icon: HeartPulse,
      color: 'text-teal-600 bg-teal-50 dark:bg-teal-900/40 border-teal-200 dark:border-teal-800',
    },
    {
      id: 'finance',
      title: 'Keuangan (Placeholder)',
      value: 'Rp 4.250.000',
      sub: 'Anggaran Bulan Ini',
      icon: Wallet,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-800',
    },
    {
      id: 'education',
      title: 'Pendidikan (Placeholder)',
      value: '2 Tugas',
      sub: 'Les Matematika Hari Ini',
      icon: GraduationCap,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/40 border-amber-200 dark:border-amber-800',
    },
    {
      id: 'safety',
      title: 'Keamanan (Placeholder)',
      value: 'Aman 100%',
      sub: 'Semua di Safe Zone',
      icon: ShieldCheck,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {overviewCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => onCardClick?.(card.id)}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-indigo-400 transition-all cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className={`p-2 rounded-xl border ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 line-clamp-1">
                {card.title}
              </span>
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white block">
                {card.value}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block line-clamp-1">
                {card.sub}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
