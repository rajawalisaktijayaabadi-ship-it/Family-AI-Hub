import React from 'react';
import { useAIStore } from '../../../stores/useAIStore';
import { ShieldCheck, Lock, Eye, Download, Trash2, CheckCircle, Info, Sparkles } from 'lucide-react';

export const AIPrivacyConsentTab: React.FC = () => {
  const { privacyConsent, updatePrivacyConsent, clearAllMemories, clearHistory } = useAIStore();

  const handleExportData = () => {
    const dataStr = JSON.stringify(
      {
        consent: privacyConsent,
        exportedAt: new Date().toISOString(),
        info: 'FamilyAI Hub Indonesia Data Privacy Export',
      },
      null,
      2
    );
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `familyai-privacy-export-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Privacy Shield Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 text-white shadow-xl border border-indigo-950">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-indigo-500/20 backdrop-blur-md rounded-xl border border-indigo-500/30">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Pusat Privasi & Konsen AI</h2>
            <p className="text-xs text-indigo-200">
              Kendalikan penuh bagaimana AI memproses data keluarga Anda
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mt-3 bg-white/5 p-3 rounded-xl border border-white/10">
          🔒 **Komitmen Privasi FamilyAI Hub Indonesia**: Semua kunci API Google Gemini dieksekusi di server terisolasi. Data keluarga Anda tidak pernah dijual, digunakan untuk pelatihan publik, atau dibagikan ke pihak ketiga tanpa izin eksplisit.
        </p>
      </div>

      {/* Consent Toggles */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 shadow-sm">
        <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-2">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>Pengaturan Izin & Konsen Pemrosesan</span>
        </h3>

        <div className="space-y-3 pt-2">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold text-slate-800">Pemrosesan Data AI Umum</h4>
              <p className="text-[11px] text-slate-500">
                Izinkan AI menjawab pertanyaan & analisis keluarga.
              </p>
            </div>
            <button
              onClick={() =>
                updatePrivacyConsent({ aiDataUsageAccepted: !privacyConsent.aiDataUsageAccepted })
              }
              className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                privacyConsent.aiDataUsageAccepted ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold text-slate-800">Pengumpulan Memori AI</h4>
              <p className="text-[11px] text-slate-500">
                Simpan preferensi penting keluarga secara konfidensial.
              </p>
            </div>
            <button
              onClick={() =>
                updatePrivacyConsent({ memoryCollectionAccepted: !privacyConsent.memoryCollectionAccepted })
              }
              className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                privacyConsent.memoryCollectionAccepted ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold text-slate-800">Personalisasi Kontekstual</h4>
              <p className="text-[11px] text-slate-500">
                Gunakan data layar & aktivitas harian untuk saran cerdas.
              </p>
            </div>
            <button
              onClick={() =>
                updatePrivacyConsent({ personalizationAccepted: !privacyConsent.personalizationAccepted })
              }
              className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                privacyConsent.personalizationAccepted ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>
        </div>
      </div>

      {/* Legal & Medical Disclaimers Section */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 space-y-2">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
          <Info className="w-4 h-4 text-amber-700" />
          <span>Sanggahan Resmi Medis & Keuangan</span>
        </div>
        <p className="text-[11px] text-amber-800 leading-relaxed">
          Semua fitur rekomendasi AI Kesehatan, Keuangan, dan Psikologi bersifat edukatif & pendukung. Hasil keluaran Google Gemini AI tidak dapat dijadikan rujukan medis profesional atau nasihat keuangan legal.
        </p>
      </div>

      {/* Data Export & Purge Tools */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">Hak Data Pengguna</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleExportData}
            className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium py-2.5 px-4 rounded-xl transition border border-slate-200"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Ekspor Data AI (JSON)</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Hapus seluruh obrolan dan riwayat AI?')) {
                clearHistory();
                clearAllMemories();
                alert('Seluruh data AI berhasil dibersihkan.');
              }
            }}
            className="flex items-center justify-center space-x-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-medium py-2.5 px-4 rounded-xl transition border border-rose-200"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>Purge Semua Data AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
