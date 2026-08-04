import React from 'react';
import { Activity, Clock, Heart, Users, CheckCircle, ShieldCheck, Bell } from 'lucide-react';
import { ActivityModel } from '../../../types/dashboard';

export const RECENT_ACTIVITIES: ActivityModel[] = [
  {
    id: 'act_1',
    time: '10 menit lalu',
    timestamp: '2026-08-04T08:00:00Z',
    authorName: 'Ibu Siti',
    authorRole: 'Admin Keluarga',
    title: 'Menambahkan Jadwal Belanja Bulanan',
    description: 'Beli sayur segar, daging, sembako, dan keperluan dapur.',
    category: 'Calendar',
    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  },
  {
    id: 'act_2',
    time: '45 menit lalu',
    timestamp: '2026-08-04T07:25:00Z',
    authorName: 'Budi Rahardjo',
    authorRole: 'Owner',
    title: 'Check-in Safe Zone Kantor Gedung Senopati',
    description: 'Tiba di lokasi kantor dengan kondisi selamat.',
    category: 'Safety',
    badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  },
  {
    id: 'act_3',
    time: '2 jam lalu',
    timestamp: '2026-08-04T06:00:00Z',
    authorName: 'Ahmad Rizky',
    authorRole: 'Anak',
    title: 'Menyelesaikan Tugas Matematika',
    description: 'Tugas Bab Geometri & Aljabar telah diunggah.',
    category: 'Health',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  },
];

export const RecentActivityWidget: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
            Linimasa Aktivitas Terbaru
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
          Real-time Sync
        </span>
      </div>

      <div className="space-y-2.5">
        {RECENT_ACTIVITIES.map((act) => (
          <div
            key={act.id}
            className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1.5"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {act.authorName}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-bold">
                  {act.authorRole}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {act.time}
              </span>
            </div>

            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{act.title}</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {act.description}
            </p>

            <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[10px]">
              <span className={`px-2 py-0.5 font-bold rounded-full ${act.badgeColor}`}>
                #{act.category}
              </span>
              <button className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> Apresiasi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
