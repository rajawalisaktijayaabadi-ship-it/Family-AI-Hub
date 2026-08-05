import React from 'react';
import { useAIStore } from '../../../stores/useAIStore';
import { Sliders, Cpu, Globe, MessageSquare, Sparkles, Check, ShieldCheck } from 'lucide-react';

export const AISettingsTab: React.FC = () => {
  const { settings, updateSettings } = useAIStore();

  return (
    <div className="space-y-5 pb-12">
      {/* Settings Header */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-slate-800">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base">Pengaturan AI Engine Production</h3>
            <p className="text-xs text-slate-500">Konfigurasi Google Gemini 3.6 Flash & Engine Konteks</p>
          </div>
        </div>
      </div>

      {/* Provider Selector */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
        <h4 className="font-bold text-slate-800 text-xs flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-emerald-600" />
          <span>Provider AI Aktif</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/30 flex items-start justify-between">
            <div>
              <p className="font-bold text-xs text-slate-800">Google Gemini AI</p>
              <p className="text-[10px] text-emerald-700 font-medium mt-0.5">gemini-3.6-flash</p>
              <span className="inline-block mt-2 text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                Rekomendasi Utama
              </span>
            </div>
            <Check className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 opacity-60 flex items-start justify-between cursor-not-allowed">
            <div>
              <p className="font-bold text-xs text-slate-700">OpenAI GPT-4o</p>
              <p className="text-[10px] text-slate-500 mt-0.5">gpt-4o-mini</p>
              <span className="inline-block mt-2 text-[9px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-medium">
                Opsional Multi-Provider
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 opacity-60 flex items-start justify-between cursor-not-allowed">
            <div>
              <p className="font-bold text-xs text-slate-700">Claude 3.5 Sonnet</p>
              <p className="text-[10px] text-slate-500 mt-0.5">claude-3-5</p>
              <span className="inline-block mt-2 text-[9px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-medium">
                Opsional Multi-Provider
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Core AI Engines Toggle */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
        <h4 className="font-bold text-slate-800 text-xs">Modul & Engine Otomatisasi</h4>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-800">Status Production AI</p>
              <p className="text-[11px] text-slate-500">Aktifkan integrasi penuh Google Gemini API</p>
            </div>
            <input
              type="checkbox"
              checked={settings.aiEnabled}
              onChange={(e) => updateSettings({ aiEnabled: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-800">AI Memory Engine</p>
              <p className="text-[11px] text-slate-500">Ingat fakta penting & kebiasaan keluarga</p>
            </div>
            <input
              type="checkbox"
              checked={settings.memoryEnabled}
              onChange={(e) => updateSettings({ memoryEnabled: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-800">AI Context Engine</p>
              <p className="text-[11px] text-slate-500">Gunakan layar aktif & log aktivitas harian</p>
            </div>
            <input
              type="checkbox"
              checked={settings.contextEnabled}
              onChange={(e) => updateSettings({ contextEnabled: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Tone & Response Style */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
        <h4 className="font-bold text-slate-800 text-xs">Gaya & Bahasa AI</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Bahasa Respons</label>
            <select
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value as 'id' | 'en' })}
              className="w-full p-2.5 border rounded-xl bg-slate-50 text-xs focus:ring-2 focus:ring-emerald-500"
            >
              <option value="id">Bahasa Indonesia (Ramah & Hangat)</option>
              <option value="en">English (Professional)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tone AI</label>
            <select
              value={settings.tone}
              onChange={(e) =>
                updateSettings({
                  tone: e.target.value as 'ramah' | 'profesional' | 'santai' | 'edukatif',
                })
              }
              className="w-full p-2.5 border rounded-xl bg-slate-50 text-xs focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ramah">Ramah & Berempati</option>
              <option value="profesional">Profesional & Terstruktur</option>
              <option value="santai">Santai & Bersahabat</option>
              <option value="edukatif">Edukatif & Informatif</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Panjang Jawaban</label>
            <select
              value={settings.responseLength}
              onChange={(e) =>
                updateSettings({
                  responseLength: e.target.value as 'ringkas' | 'sedang' | 'detail',
                })
              }
              className="w-full p-2.5 border rounded-xl bg-slate-50 text-xs focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ringkas">Ringkas (To the point)</option>
              <option value="sedang">Sedang (Seimbang)</option>
              <option value="detail">Detail & Penjelasan Lengkap</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Kreativitas (Temperature)</label>
            <select
              value={settings.creativity}
              onChange={(e) =>
                updateSettings({
                  creativity: e.target.value as 'terfokus' | 'seimbang' | 'kreatif',
                })
              }
              className="w-full p-2.5 border rounded-xl bg-slate-50 text-xs focus:ring-2 focus:ring-emerald-500"
            >
              <option value="terfokus">Terfokus & Presisi (Low Temp)</option>
              <option value="seimbang">Seimbang (Medium Temp)</option>
              <option value="kreatif">Kreatif & Eksploratif (High Temp)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
