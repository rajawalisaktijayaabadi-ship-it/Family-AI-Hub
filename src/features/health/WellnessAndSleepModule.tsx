import React, { useState } from 'react';
import { useHealthStore } from '../../stores/useHealthStore';
import {
  Flame,
  Footprints,
  Moon,
  Droplets,
  Plus,
  Dumbbell,
  Clock,
  Sparkles,
} from 'lucide-react';

export const WellnessAndSleepModule: React.FC = () => {
  const {
    profiles,
    selectedMemberId,
    wellness,
    sleep,
    water,
    addWater,
    addSteps,
  } = useHealthStore();

  const activeProfile = profiles.find((p) => p.memberId === selectedMemberId) || profiles[0];

  const stepsProgress = wellness
    ? Math.min(100, Math.round((wellness.dailySteps / wellness.stepTarget) * 100))
    : 0;

  const waterProgress = water
    ? Math.min(100, Math.round((water.consumedMl / water.targetMl) * 100))
    : 0;

  return (
    <div className="space-y-4 font-sans">
      {/* Steps & Exercise Tracker */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Footprints className="w-4 h-4 text-emerald-500" /> Kebugaran & Aktivitas Fisik ({activeProfile?.memberName})
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Langkah harian, kalori terbakar, & durasi aktif
            </span>
          </div>

          <button
            onClick={() => addSteps(1000)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> +1000 Langkah
          </button>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">
                Total Langkah Hari Ini
              </span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {wellness?.dailySteps || 0}
              </span>
              <span className="text-[10px] text-slate-400 font-bold font-mono">
                / {wellness?.stepTarget || 10000} Langkah
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs font-black font-mono text-slate-800 dark:text-slate-200">
                {stepsProgress}%
              </span>
              <span className="text-[10px] text-emerald-600 block font-bold">Target Terpenuhi</span>
            </div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2.5 rounded-full transition-all"
              style={{ width: `${stepsProgress}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono font-bold pt-1">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
              <span className="text-[9px] text-slate-400 block font-sans">Kalori Terbakar</span>
              <span className="text-amber-600 dark:text-amber-400">{wellness?.caloriesBurned || 0} kcal</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
              <span className="text-[9px] text-slate-400 block font-sans">Durasi Aktif</span>
              <span className="text-blue-600 dark:text-blue-400">{wellness?.activeMinutes || 0} Menit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sleep Tracker */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div>
          <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
            <Moon className="w-4 h-4 text-indigo-500" /> Sleep Quality & Durasi Tidur
          </h4>
          <span className="text-[10px] text-slate-400 font-bold">
            Pemantauan istirahat malam & ritme sirkadian
          </span>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Jam Tidur → Bangun</span>
              <span className="text-sm font-black font-mono text-indigo-600 dark:text-indigo-400">
                {sleep?.sleepTime || '22:15'} - {sleep?.wakeTime || '05:30'}
              </span>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
              {sleep?.quality || 'Sangat Baik'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-slate-500">Durasi Tidur Nyenyak:</span>
            <span className="font-mono text-slate-800 dark:text-slate-200">{sleep?.durationHours || 7.25} Jam</span>
          </div>
        </div>
      </div>

      {/* Water Intake Tracker */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-blue-500" /> Asupan Air Putih (Water Tracker)
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Kebutuhan hidrasi harian keluarga
            </span>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => addWater(250)}
              className="px-2.5 py-1 rounded-xl bg-blue-600 text-white text-[10px] font-bold shadow-2xs"
            >
              +250ml
            </button>
            <button
              onClick={() => addWater(500)}
              className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white text-[10px] font-bold shadow-2xs"
            >
              +500ml
            </button>
          </div>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Terkonsumsi Hari Ini</span>
              <span className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
                {water?.consumedMl || 0}
              </span>
              <span className="text-[10px] text-slate-400 font-bold font-mono">
                / {water?.targetMl || 2500} ml
              </span>
            </div>

            <span className="text-xs font-black font-mono text-blue-600">{waterProgress}%</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-indigo-600 h-2.5 rounded-full transition-all"
              style={{ width: `${waterProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
