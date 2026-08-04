import React, { useState } from 'react';
import { Activity, Clock, Heart, Users, Building2 } from 'lucide-react';
import { FamilyWorkspaceScreen } from '../family/FamilyWorkspaceScreen';

export const ActivityScreen: React.FC = () => {
  const [subTab, setSubTab] = useState<'workspace' | 'timeline'>('workspace');

  const activities = [
    {
      id: 1,
      time: '10 menit lalu',
      author: 'Ibu Siti',
      role: 'Admin Keluarga',
      title: 'Menambahkan Jadwal Belanja Bulanan',
      desc: 'Membeli bahan sayur segar & sembako untuk persiapan akhir pekan.',
      tag: 'Keuangan & Belanja',
      color: 'text-blue-500',
    },
    {
      id: 2,
      time: '1 jam lalu',
      author: 'Budi Rahardjo',
      role: 'Owner',
      title: 'Check-in Lokasi Safe Zone',
      desc: 'Tiba di kantor Gedung Senopati dengan selamat.',
      tag: 'Keamanan',
      color: 'text-teal-500',
    },
    {
      id: 3,
      time: '3 jam lalu',
      author: 'Ahmad Rizky',
      role: 'Anak',
      title: 'Menyelesaikan Tugas Matematika',
      desc: 'Tugas Geometri telah dikirimkan secara mandiri.',
      tag: 'Pendidikan',
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Sub Tab Selector */}
      <div className="px-4 pt-2 flex gap-2 max-w-xl mx-auto">
        <button
          onClick={() => setSubTab('workspace')}
          className={`flex-1 py-2.5 px-3 text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all ${
            subTab === 'workspace'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Family Workspace
        </button>
        <button
          onClick={() => setSubTab('timeline')}
          className={`flex-1 py-2.5 px-3 text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all ${
            subTab === 'timeline'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          Linimasa Aktivitas
        </button>
      </div>

      {subTab === 'workspace' ? (
        <FamilyWorkspaceScreen />
      ) : (
        <div className="px-4 py-2 space-y-4 pb-28 font-sans max-w-xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Linimasa Aktivitas Keluarga
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Catatan & kejadian penting seluruh anggota keluarga
              </p>
            </div>
            <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] rounded-full">
              Real-time
            </span>
          </div>

          <div className="space-y-3">
            {activities.map((act) => (
              <div
                key={act.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-3xl space-y-2 border border-slate-200/80 dark:border-slate-800 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{act.author}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full font-bold">
                      {act.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {act.time}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  {act.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {act.desc}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className={`text-[10px] font-bold ${act.color}`}>#{act.tag}</span>
                  <button className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1">
                    <Heart className="w-3 h-3" /> Apresiasi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
