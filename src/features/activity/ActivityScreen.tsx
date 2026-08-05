import React, { useState } from 'react';
import { Activity, Clock, Heart, Building2, PlusCircle, Sparkles } from 'lucide-react';
import { FamilyWorkspaceScreen } from '../family/FamilyWorkspaceScreen';
import { useActivityStore } from '../../stores/useActivityStore';
import { useUIStore } from '../../stores/useUIStore';
import { useToastStore } from '../../stores/useToastStore';

export const ActivityScreen: React.FC = () => {
  const [subTab, setSubTab] = useState<'workspace' | 'timeline'>('workspace');
  const { activities, toggleAppreciation } = useActivityStore();
  const { openQuickInput } = useUIStore();
  const { addToast } = useToastStore();

  const handleAppreciate = (id: string | number) => {
    toggleAppreciation(id);
    addToast({
      title: 'Apresiasi Terkirim! ❤️',
      message: 'Semangat dan dukungan Anda telah dikirimkan ke anggota keluarga.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-4 font-sans">
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
          Linimasa Aktivitas ({activities.length})
        </button>
      </div>

      {subTab === 'workspace' ? (
        <FamilyWorkspaceScreen />
      ) : (
        <div className="px-4 py-2 space-y-4 pb-28 font-sans max-w-xl mx-auto">
          {/* Header & Quick Action */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Linimasa Aktivitas Terpadu
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pembaruan real-time dari seluruh modul & anggota keluarga
              </p>
            </div>
            <button
              onClick={() => openQuickInput()}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition active-press shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Input Data</span>
            </button>
          </div>

          {/* Activities List */}
          <div className="space-y-3">
            {activities.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
                <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Belum ada aktivitas tercatat
                </p>
                <p className="text-[11px] text-slate-400">
                  Klik tombol "+ Input Data" di atas untuk menambah transaksi, agenda, atau catatan baru.
                </p>
              </div>
            ) : (
              activities.map((act) => (
                <div
                  key={act.id}
                  className="bg-white dark:bg-slate-900 p-4 rounded-3xl space-y-2 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-500/40 transition"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{act.author}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full font-bold">
                        {act.role}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
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
                    <span className={`text-[10px] font-bold ${act.color || 'text-indigo-500'}`}>
                      #{act.tag}
                    </span>
                    <button
                      onClick={() => handleAppreciate(act.id)}
                      className={`text-[10px] font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-full transition ${
                        act.likes && act.likes > 0
                          ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                          : 'text-slate-500 hover:text-rose-500 bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      <Heart
                        className={`w-3 h-3 ${
                          act.likes && act.likes > 0 ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                      <span>{act.likes && act.likes > 0 ? `${act.likes} Apresiasi` : 'Apresiasi'}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
