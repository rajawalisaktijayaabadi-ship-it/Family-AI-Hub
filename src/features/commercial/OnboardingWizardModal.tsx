import React, { useState } from 'react';
import { useCommercialStore } from '../../stores/useCommercialStore';
import { Sparkles, Users, Bell, ShieldCheck, HeartHandshake, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface OnboardingWizardModalProps {
  onClose: () => void;
}

export const OnboardingWizardModal: React.FC<OnboardingWizardModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const { completeOnboarding } = useCommercialStore();

  const handleFinish = () => {
    completeOnboarding();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Selamat Datang di FamilyAI Hub
            </span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Content */}
        {step === 1 && (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/40">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Kecerdasan AI Spesialis Keluarga Indonesia</h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              Ditenagai Gemini 2.5 Flash, memori keluarga terenkripsi, pencatatan keuangan otomatis, dan pengingat jadwal sekolah anak.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-3xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mx-auto shadow-lg shadow-sky-950/40">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Workspace Multi-Tenant & Peran Anggota</h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              Undang pasangan, anak, dan asisten keluarga dengan kontrol akses ketat (Owner, Member, Guest).
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto shadow-lg shadow-purple-950/40">
              <Bell className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Integrasi BMKG & Cuaca Darurat Lokal</h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              Terima peringatan dini gempa bumi, banjir, dan cuaca ekstrem langsung ke WhatsApp & push notification seluruh keluarga.
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-lg shadow-amber-950/40">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Privasi UU PDP No. 27/2022 Terjamin</h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              Privasi data pribadi keluarga Anda dilindungi dengan enkripsi AES-256 dan hak kendali penuh portabilitas data.
            </p>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  step === i ? 'w-7 bg-emerald-400' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/40"
            >
              Lanjut <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
            >
              Mulai Pakai Aplikasi <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
