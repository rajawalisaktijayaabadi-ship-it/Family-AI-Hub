import React, { useState } from 'react';
import { useIntegrationStore } from '../../stores/useIntegrationStore';
import {
  Zap,
  Play,
  CheckCircle2,
  AlertCircle,
  Plus,
  CloudRain,
  ShieldCheck,
  DollarSign,
  Clock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

export const AutomationBuilderTab: React.FC = () => {
  const { automations, toggleAutomation, triggerAutomationNow } = useIntegrationStore();
  const [showNewModal, setShowNewModal] = useState(false);

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* Header Banner */}
      <div className="p-4 bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 text-white rounded-3xl space-y-2 border border-indigo-800 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-400/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">AI Automation Engine (Trigger-Condition-Action)</h3>
              <p className="text-[10px] text-indigo-200">
                Automasi cerdas keluarga berbasis sensor cuaca BMKG, GPS Geofence & Budget AI
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center px-1">
          <span className="font-extrabold text-slate-800 dark:text-slate-200">
            Aturan Automasi Aktif ({automations.filter((a) => a.isEnabled).length}/{automations.length})
          </span>
          <button
            onClick={() => setShowNewModal(true)}
            className="px-2.5 py-1 bg-indigo-600 text-white font-extrabold rounded-xl text-[10px] flex items-center gap-1 hover:bg-indigo-700 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Buat Automasi Baru
          </button>
        </div>

        {automations.map((rule) => (
          <div
            key={rule.id}
            className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-xs transition hover:border-indigo-300"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  {rule.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                  {rule.description}
                </p>
              </div>

              <button
                onClick={() => toggleAutomation(rule.id)}
                className="text-indigo-600 dark:text-indigo-400 transition"
                title="Toggle Active Status"
              >
                {rule.isEnabled ? (
                  <ToggleRight className="w-7 h-7 text-emerald-500" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-slate-400" />
                )}
              </button>
            </div>

            {/* Workflow Pipeline Visualization */}
            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center gap-2 text-[10px] font-bold text-slate-700 dark:text-slate-300 overflow-x-auto no-scrollbar">
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded-md border border-amber-500/20 whitespace-nowrap">
                Trigger: {rule.trigger.label}
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded-md border border-emerald-500/20 whitespace-nowrap">
                Aksi: {rule.action.label}
              </span>
            </div>

            {/* Status Footer */}
            <div className="flex justify-between items-center text-[9px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2">
              <span>
                Dieksekusi: <strong className="text-slate-700 dark:text-slate-300">{rule.triggerCount}x</strong>{' '}
                {rule.lastTriggeredAt && `• Terakhir: ${new Date(rule.lastTriggeredAt).toLocaleTimeString()}`}
              </span>

              <button
                onClick={() => triggerAutomationNow(rule.id)}
                className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 font-bold transition flex items-center gap-1"
              >
                <Play className="w-3 h-3 text-emerald-600" /> Tes Eksekusi AI
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Modal for New Automation */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-4 border border-slate-200 dark:border-slate-800 space-y-3 font-sans text-xs">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-600" /> Buat Rule Automasi Baru
            </h3>

            <div className="space-y-2">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">Nama Automasi</label>
                <input
                  type="text"
                  placeholder="Contoh: Pengingat Obat Kakek Jam 8 Pagi"
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">Pemicu (Trigger)</label>
                <select className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">
                  <option>Jadwal Harian Otomatis (Cron)</option>
                  <option>Laporan Cuaca Hujan BMKG</option>
                  <option>Anggota Keluar Zona Safe Geofence</option>
                  <option>Pengeluaran Dompet &gt; 80%</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">Aksi AI (Action)</label>
                <select className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">
                  <option>Kirim Push Notification HP Keluarga</option>
                  <option>Kirim Pesan WhatsApp Pengingat</option>
                  <option>Buat Catatan Tugas AI Otomatis</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                onClick={() => setShowNewModal(false)}
                className="flex-1 py-2 bg-indigo-600 text-white font-extrabold rounded-xl"
              >
                Simpan Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
