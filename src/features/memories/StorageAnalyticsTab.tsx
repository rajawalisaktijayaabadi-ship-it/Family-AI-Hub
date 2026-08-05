import React from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { HardDrive, Image as ImageIcon, Film, Mic, FileText, PieChart, TrendingUp, ShieldCheck } from 'lucide-react';

export const StorageAnalyticsTab: React.FC = () => {
  const { storage } = useMemoryStore();

  const totalGb = (storage.totalBytes / (1024 * 1024 * 1024)).toFixed(1);
  const usedGb = (storage.usedBytes / (1024 * 1024 * 1024)).toFixed(2);
  const usedPercent = Math.min(
    100,
    Math.round((storage.usedBytes / storage.totalBytes) * 100)
  );

  return (
    <div className="space-y-4">
      {/* Storage Capacity Banner */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-950/60 text-amber-600 rounded-2xl">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Kapasitas Storage Cloud & Lokal
              </h3>
              <p className="text-[10px] text-slate-500">
                Terpakai {usedGb} GB dari {totalGb} GB ({usedPercent}%)
              </p>
            </div>
          </div>

          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Aman & Enkripsi</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex">
          <div
            className="bg-amber-500 h-full transition-all duration-500"
            style={{ width: `${usedPercent * 0.5}%` }}
            title="Foto"
          />
          <div
            className="bg-indigo-500 h-full transition-all duration-500"
            style={{ width: `${usedPercent * 0.3}%` }}
            title="Video"
          />
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${usedPercent * 0.15}%` }}
            title="Audio"
          />
          <div
            className="bg-rose-500 h-full transition-all duration-500"
            style={{ width: `${usedPercent * 0.05}%` }}
            title="Dokumen"
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Foto ({storage.photoSizeMb} MB)</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Video ({storage.videoSizeMb} MB)</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Audio ({storage.audioSizeMb} MB)</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Dokumen ({storage.docSizeMb} MB)</span>
          </div>
        </div>
      </div>

      {/* Media Count Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-amber-600">
            <ImageIcon className="w-5 h-5" />
            <span className="text-[10px] font-extrabold bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
              Foto
            </span>
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white">{storage.photoCount}</p>
          <p className="text-[10px] text-slate-400">Berkas Foto Tersimpan</p>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-indigo-600">
            <Film className="w-5 h-5" />
            <span className="text-[10px] font-extrabold bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
              Video
            </span>
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white">{storage.videoCount}</p>
          <p className="text-[10px] text-slate-400">Video Kenangan</p>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <Mic className="w-5 h-5" />
            <span className="text-[10px] font-extrabold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              Voice
            </span>
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white">{storage.audioCount}</p>
          <p className="text-[10px] text-slate-400">Rekaman Suara</p>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-rose-600">
            <FileText className="w-5 h-5" />
            <span className="text-[10px] font-extrabold bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">
              Vault
            </span>
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white">{storage.documentCount}</p>
          <p className="text-[10px] text-slate-400">Dokumen Rahasia</p>
        </div>
      </div>
    </div>
  );
};
