import React, { useState } from 'react';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { StressCheckModule } from './StressCheckModule';
import { SelfReflectionModule } from './SelfReflectionModule';
import { RelationshipModule } from './RelationshipModule';
import { BreathingExerciseModule } from './BreathingExerciseModule';
import { AIRecommendationsModule } from './AIRecommendationsModule';
import { Brain, Activity, Sparkles, Users, Wind, Compass } from 'lucide-react';

type PsychologyTab = 'stress' | 'reflection' | 'relationship' | 'breathing' | 'recommendations';

export const PsychologyCenterScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PsychologyTab>('stress');

  return (
    <div className="space-y-4 pb-20 font-sans max-w-md mx-auto px-1">
      {/* Disclaimer Banner */}
      <MedicalDisclaimerBanner />

      {/* Header Banner */}
      <div className="p-4 bg-gradient-to-br from-purple-600 via-indigo-600 to-teal-500 rounded-3xl text-white shadow-xl space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
            <Brain className="w-6 h-6 text-purple-200" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-200">
              Mental Wellness & Family Psychology
            </span>
            <h2 className="text-base font-extrabold font-heading">Pusat Psikologi Keluarga</h2>
          </div>
        </div>
        <p className="text-xs text-purple-100/90 leading-relaxed font-medium">
          Dampingi kesehatan mental, kelola tingkat stres, latih pernapasan relaksasi, dan pelihara
          kehangatan hubungan keluarga Anda.
        </p>
      </div>

      {/* Sub Menu Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
        <button
          onClick={() => setActiveTab('stress')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeTab === 'stress'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-purple-500" /> Stres
        </button>

        <button
          onClick={() => setActiveTab('reflection')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeTab === 'reflection'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-teal-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Refleksi
        </button>

        <button
          onClick={() => setActiveTab('relationship')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeTab === 'relationship'
              ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-teal-500" /> Hubungan
        </button>

        <button
          onClick={() => setActiveTab('breathing')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeTab === 'breathing'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wind className="w-3.5 h-3.5 text-emerald-500" /> Napas
        </button>

        <button
          onClick={() => setActiveTab('recommendations')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] col-span-2 sm:col-span-1 ${
            activeTab === 'recommendations'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-indigo-500" /> Rekomendasi
        </button>
      </div>

      {/* Module Render */}
      {activeTab === 'stress' && <StressCheckModule />}
      {activeTab === 'reflection' && <SelfReflectionModule />}
      {activeTab === 'relationship' && <RelationshipModule />}
      {activeTab === 'breathing' && <BreathingExerciseModule />}
      {activeTab === 'recommendations' && <AIRecommendationsModule />}
    </div>
  );
};
