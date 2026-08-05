import React, { useState } from 'react';
import { useAnalyticsStore } from '../../stores/useAnalyticsStore';
import {
  CheckCircle2,
  Target,
  Trophy,
  Flame,
  CalendarCheck,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { useToastStore } from '../../stores/useToastStore';

export const ProductivityCenterTab: React.FC = () => {
  const { analytics } = useAnalyticsStore();

  const [routines, setRoutines] = useState([
    { id: 'r1', title: 'Olahraga Pagi 15 Menit', done: true, streak: 12 },
    { id: 'r2', title: 'Membaca Buku Edukasi Anak', done: true, streak: 8 },
    { id: 'r3', title: 'Cek Anggaran Harian', done: false, streak: 5 },
    { id: 'r4', title: 'Evaluasi Mood & Jurnal', done: true, streak: 15 },
  ]);

  const [goals, setGoals] = useState([
    { id: 'g1', title: 'Tabungan Edukasi Rp 50 Juta', progress: 75, target: 'Rp 50.000.000' },
    { id: 'g2', title: 'Target 100 Jam Belajar Anak', progress: 82, target: '100 Jam' },
    { id: 'g3', title: 'Aktivitas Fisik 30 Hari', progress: 90, target: '30 Hari' },
  ]);

  const toggleRoutine = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              done: !r.done,
              streak: !r.done ? r.streak + 1 : Math.max(1, r.streak - 1),
            }
          : r
      )
    );
    useToastStore.getState().addToast('Status rutinitas diperbarui!', 'success');
  };

  return (
    <div className="space-y-4">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-5 rounded-3xl border border-emerald-800/60 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Productivity & Habit Center</h3>
              <p className="text-[11px] text-emerald-200">Pencapaian Rutinitas, Goal & Challenge</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xl font-black text-emerald-400">
              {analytics.productivityCompletionRate}%
            </span>
            <span className="text-[10px] text-slate-300 block">Completion Rate</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${analytics.productivityCompletionRate}%` }}
          />
        </div>
      </div>

      {/* Daily Routines */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500" />
          <span>Rutinitas Harian Keluarga ({routines.length})</span>
        </h4>

        <div className="space-y-2">
          {routines.map((r) => (
            <div
              key={r.id}
              onClick={() => toggleRoutine(r.id)}
              className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer hover:border-emerald-500 transition"
            >
              <div className="flex items-center gap-3">
                <button
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
                    r.done
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 dark:border-slate-600 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </button>

                <span
                  className={`text-xs font-bold ${
                    r.done
                      ? 'line-through text-slate-400'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {r.title}
                </span>
              </div>

              <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 rounded-full font-black flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-500" />
                {r.streak} Hari Streak
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Target Goals */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-600" />
          <span>Target & Challenge Jangka Panjang</span>
        </h4>

        <div className="space-y-3">
          {goals.map((g) => (
            <div key={g.id} className="space-y-1.5 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-900 dark:text-white">{g.title}</span>
                <span className="text-emerald-600">{g.progress}%</span>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${g.progress}%` }}
                />
              </div>

              <span className="text-[10px] text-slate-400 font-bold block text-right">
                Target: {g.target}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
