import React from 'react';
import { Smartphone, Tablet, Monitor, Sparkles, SmartphoneCharging } from 'lucide-react';

interface DesktopShieldProps {
  onSimulateMobile: () => void;
}

export const DesktopShield: React.FC<DesktopShieldProps> = ({ onSimulateMobile }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative z-10 flex flex-col items-center">
        {/* Animated Badge */}
        <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 animate-pulse">
          <Smartphone className="w-8 h-8 text-white" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Mobile Web Edition Only
        </span>

        <h1 className="text-2xl font-bold font-heading text-white mb-3">
          FamilyAI Hub Mobile Edition
        </h1>

        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          FamilyAI Hub Mobile Edition hanya dapat digunakan melalui perangkat mobile.
        </p>

        {/* Device Badges */}
        <div className="grid grid-cols-2 gap-2.5 w-full mb-8">
          <div className="flex items-center gap-2 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 text-xs text-slate-300">
            <Smartphone className="w-4 h-4 text-blue-400" /> Android Phone
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 text-xs text-slate-300">
            <SmartphoneCharging className="w-4 h-4 text-teal-400" /> iPhone (iOS)
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 text-xs text-slate-300">
            <Tablet className="w-4 h-4 text-indigo-400" /> iPad & Android Tablet
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 text-xs text-slate-300">
            <Monitor className="w-4 h-4 text-rose-400" /> Foldable Devices
          </div>
        </div>

        {/* CTA Button to Simulate Mobile Frame */}
        <button
          onClick={onSimulateMobile}
          className="w-full py-3.5 px-5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <Smartphone className="w-4 h-4" /> Simulasikan Perangkat Mobile
        </button>

        <p className="text-xs text-slate-500 mt-4">
          Atau buka link ini dari smartphone Anda untuk pengalaman terbaik.
        </p>
      </div>
    </div>
  );
};
