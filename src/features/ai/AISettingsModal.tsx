import React from 'react';
import { motion } from 'motion/react';
import { useAIStore } from '../../stores/useAIStore';
import { useToastStore } from '../../stores/useToastStore';
import { Sliders, X, RefreshCw, Trash2, ShieldCheck, Globe, Zap } from 'lucide-react';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AISettingsModal: React.FC<AISettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, resetChat, clearHistory } = useAIStore();
  const { addToast } = useToastStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 font-heading">
                Pengaturan AI Engine
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">Konfigurasi Parameter & Privasi</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pr-1 text-xs">
          {/* Response Length */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 dark:text-slate-200 block">
              Panjang Respon AI (Response Length)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ringkas', label: 'Ringkas' },
                { id: 'sedang', label: 'Sedang' },
                { id: 'detail', label: 'Detail' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    updateSettings({ responseLength: item.id as any });
                    addToast(`Panjang respon diubah ke ${item.label}`, 'info');
                  }}
                  className={`py-2 rounded-xl border text-center font-bold transition ${
                    settings.responseLength === item.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 dark:text-slate-200 block">Bahasa Utama</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  updateSettings({ language: 'id' });
                  addToast('Bahasa diubah ke Bahasa Indonesia', 'info');
                }}
                className={`py-2 px-3 rounded-xl border text-left font-bold flex items-center justify-between transition ${
                  settings.language === 'id'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>Bahasa Indonesia</span>
                <Globe className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  updateSettings({ language: 'en' });
                  addToast('Bahasa diubah ke English', 'info');
                }}
                className={`py-2 px-3 rounded-xl border text-left font-bold flex items-center justify-between transition ${
                  settings.language === 'en'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>English</span>
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Creativity */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 dark:text-slate-200 block">
              Tingkat Kreativitas (Temperature)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'terfokus', label: 'Terfokus' },
                { id: 'seimbang', label: 'Seimbang' },
                { id: 'kreatif', label: 'Kreatif' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    updateSettings({ creativity: item.id as any });
                    addToast(`Tingkat kreativitas diubah ke ${item.label}`, 'info');
                  }}
                  className={`py-2 rounded-xl border text-center font-bold transition ${
                    settings.creativity === item.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Offline Save Toggle */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Simpan Cache Luring (Offline Cache)</h4>
              <p className="text-[10px] text-slate-400">Simpan percakapan & prompt di penyimpanan lokal browser</p>
            </div>
            <input
              type="checkbox"
              checked={settings.saveOffline}
              onChange={(e) => updateSettings({ saveOffline: e.target.checked })}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Danger Zone Actions */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <label className="font-bold text-rose-600 block">Tindakan Pembersihan</label>

            <button
              onClick={() => {
                resetChat();
                addToast('Obrolan berhasil direset', 'info');
                onClose();
              }}
              className="w-full p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 font-bold flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Reset Obrolan Aktif
            </button>

            <button
              onClick={() => {
                clearHistory();
                addToast('Seluruh riwayat berhasil dibersihkan', 'error');
                onClose();
              }}
              className="w-full p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-bold flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Bersihkan Seluruh Riwayat AI
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
