import React from 'react';
import { useSubscriptionStore } from '../../stores/useSubscriptionStore';
import {
  Brain,
  HardDrive,
  Users,
  Image,
  Video,
  Mic,
  Sparkles,
  Database,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const UsageStorageTab: React.FC = () => {
  const { usage, plans, activeSubscription } = useSubscriptionStore();

  const currentPlan = plans.find((p) => p.id === activeSubscription.planId) || plans[0];
  const limits = currentPlan.quotaLimits;

  const storageUsedGB = (usage.storageUsedBytes / (1024 * 1024 * 1024)).toFixed(1);
  const storagePercentage = Math.min(100, Math.round((Number(storageUsedGB) / limits.storageGB) * 100));

  const aiTokenPercentage = Math.min(
    100,
    Math.round((usage.aiTokensUsedToday / limits.aiTokensPerDay) * 100)
  );

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* Overview Banner */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Database className="w-4 h-4 text-emerald-600" />
          Metrik Penggunaan Kuota & Penyimpanan Cloud ({currentPlan.name})
        </h4>

        {/* AI Tokens Meter */}
        <div className="space-y-1.5 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-emerald-600" />
              Token AI Gemini 3.6 Flash / Hari
            </span>
            <span className="font-mono font-bold text-slate-600 dark:text-slate-300">
              {usage.aiTokensUsedToday} / {limits.aiTokensPerDay >= 999999 ? '∞ (Unlimited)' : limits.aiTokensPerDay} Token
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${aiTokenPercentage}%` }}
            />
          </div>
          <span className="text-[9px] text-slate-500 block">
            Reset kuota harian otomatis pada jam 00:00 WIB.
          </span>
        </div>

        {/* Cloud Storage Meter */}
        <div className="space-y-1.5 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-teal-600" />
              Penyimpanan Cloud Media & Dokumen
            </span>
            <span className="font-mono font-bold text-slate-600 dark:text-slate-300">
              {storageUsedGB} GB / {limits.storageGB} GB ({storagePercentage}%)
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                storagePercentage > 85
                  ? 'bg-amber-500'
                  : 'bg-gradient-to-r from-teal-500 to-cyan-500'
              }`}
              style={{ width: `${storagePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Detail Categories Breakdown */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <Image className="w-3.5 h-3.5" /> Foto Terunggah
          </div>
          <span className="font-black text-sm text-slate-900 dark:text-white block">
            {usage.photosUploadedThisMonth} Foto
          </span>
          <span className="text-[9px] text-slate-500">
            Batas: {limits.photoUploadsPerMonth >= 999999 ? 'Tanpa Batas' : `${limits.photoUploadsPerMonth}/bln`}
          </span>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-purple-600 font-bold">
            <Video className="w-3.5 h-3.5" /> Video Terunggah
          </div>
          <span className="font-black text-sm text-slate-900 dark:text-white block">
            {usage.videosUploadedThisMonth} Video
          </span>
          <span className="text-[9px] text-slate-500">
            Batas: {limits.videoUploadsPerMonth >= 999999 ? 'Tanpa Batas' : `${limits.videoUploadsPerMonth}/bln`}
          </span>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-600 font-bold">
            <Mic className="w-3.5 h-3.5" /> Perintah Vokal AI
          </div>
          <span className="font-black text-sm text-slate-900 dark:text-white block">
            {usage.voiceMinutesUsedThisMonth} Menit
          </span>
          <span className="text-[9px] text-slate-500">
            Batas: {limits.voiceMinutesPerMonth >= 999999 ? 'Tanpa Batas' : `${limits.voiceMinutesPerMonth} Min/bln`}
          </span>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-500 font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Slot Memori AI
          </div>
          <span className="font-black text-sm text-slate-900 dark:text-white block">
            {usage.memorySlotsUsed} Slot
          </span>
          <span className="text-[9px] text-slate-500">
            Batas: {limits.memorySlots >= 999999 ? 'Tanpa Batas' : `${limits.memorySlots} Slot`}
          </span>
        </div>
      </div>
    </div>
  );
};
