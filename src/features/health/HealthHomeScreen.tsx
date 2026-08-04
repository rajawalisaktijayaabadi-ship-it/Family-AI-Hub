import React, { useEffect, useState } from 'react';
import { useHealthStore } from '../../stores/useHealthStore';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import { FamilyHealthProfileModule } from './FamilyHealthProfileModule';
import { MedicationAndReminderModule } from './MedicationAndReminderModule';
import { WellnessAndSleepModule } from './WellnessAndSleepModule';
import { NutritionAndFoodDiaryModule } from './NutritionAndFoodDiaryModule';
import {
  HeartPulse,
  Sparkles,
  Search,
  Filter,
  User,
  Activity,
  Pill,
  Droplets,
  Moon,
  Footprints,
  Apple,
  Stethoscope,
  TrendingUp,
  Quote,
  Layers,
  Bell,
  CheckCircle2,
} from 'lucide-react';

type HealthSubTab = 'overview' | 'profile' | 'medication' | 'wellness' | 'nutrition';

export const HealthHomeScreen: React.FC = () => {
  const {
    profiles,
    selectedMemberId,
    setSelectedMemberId,
    medicalRecords,
    medications,
    checkups,
    wellness,
    sleep,
    water,
    reminders,
    aiInsight,
    searchQuery,
    setSearchQuery,
    initialize,
  } = useHealthStore();

  const [activeSubTab, setActiveSubTab] = useState<HealthSubTab>('overview');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const activeProfile = profiles.find((p) => p.memberId === selectedMemberId) || profiles[0];

  const filteredMedRecords = medicalRecords.filter(
    (m) =>
      m.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.complaints.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMeds = medications.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-20 font-sans max-w-md mx-auto px-1">
      {/* Medical Disclaimer */}
      <MedicalDisclaimerBanner />

      {/* Header Banner */}
      <div className="p-4 bg-gradient-to-br from-rose-600 via-pink-600 to-indigo-600 rounded-3xl text-white shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <HeartPulse className="w-6 h-6 text-rose-200" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-100">
                AI Health & Family Medical Center
              </span>
              <h2 className="text-base font-extrabold font-heading">Kesehatan Keluarga</h2>
            </div>
          </div>

          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-mono font-black">
            Skor: {aiInsight?.healthScore || 88}/100
          </span>
        </div>

        {/* Member Selector Pill in Header */}
        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
          {profiles.map((p) => (
            <button
              key={p.memberId}
              onClick={() => setSelectedMemberId(p.memberId)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition whitespace-nowrap ${
                p.memberId === activeProfile?.memberId
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {p.memberName} ({p.bloodType})
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari obat, rekam medis, diagnosis, atau vaksin..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden"
        />
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'overview'
              ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-rose-500" /> Utama
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'profile'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5 text-indigo-500" /> Profil
        </button>

        <button
          onClick={() => setActiveSubTab('medication')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'medication'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Pill className="w-3.5 h-3.5 text-emerald-500" /> Obat
        </button>

        <button
          onClick={() => setActiveSubTab('wellness')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'wellness'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Footprints className="w-3.5 h-3.5 text-blue-500" /> Kebugaran
        </button>

        <button
          onClick={() => setActiveSubTab('nutrition')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'nutrition'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Apple className="w-3.5 h-3.5 text-amber-500" /> Nutrisi
        </button>
      </div>

      {/* Main Overview View */}
      {activeSubTab === 'overview' && (
        <div className="space-y-4">
          {/* Today's Health Dashboard Widget */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-500" /> Health Dashboard ({activeProfile?.memberName})
              </h3>
              <span className="text-[10px] font-mono font-bold text-slate-400">
                BMI: {activeProfile?.bmi} ({activeProfile?.bmiCategory})
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold block flex items-center justify-center gap-1">
                  <Footprints className="w-3 h-3 text-emerald-500" /> Langkah
                </span>
                <span className="text-base font-black font-mono text-emerald-600">
                  {wellness?.dailySteps || 0}
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold block flex items-center justify-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-500" /> Air Putih
                </span>
                <span className="text-base font-black font-mono text-blue-600">
                  {water?.consumedMl || 0} ml
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold block flex items-center justify-center gap-1">
                  <Moon className="w-3 h-3 text-indigo-500" /> Tidur
                </span>
                <span className="text-base font-black font-mono text-indigo-600">
                  {sleep?.durationHours || 7.25} Jam
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold block flex items-center justify-center gap-1">
                  <Pill className="w-3 h-3 text-rose-500" /> Pengingat
                </span>
                <span className="text-base font-black font-mono text-rose-600">
                  {reminders.filter((r) => !r.isCompletedToday).length} Pending
                </span>
              </div>
            </div>
          </div>

          {/* AI Health Insight */}
          {aiInsight && (
            <div className="p-4 bg-gradient-to-br from-slate-900 via-rose-950 to-indigo-950 rounded-3xl text-white shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
                  <Sparkles className="w-5 h-5 text-rose-300" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300">
                    Mock AI Health Insight
                  </span>
                  <h4 className="text-xs font-extrabold font-heading">
                    Analisis Kebugaran AI ({activeProfile?.memberName})
                  </h4>
                </div>
              </div>

              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-xs leading-relaxed space-y-2">
                <p className="font-bold text-rose-100">{aiInsight.dailySummary}</p>

                <div className="pt-2 border-t border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-300 font-bold block">
                    Rekomendasi Pola Hidup Sehat:
                  </span>
                  {aiInsight.lifestyleTips.map((tip, i) => (
                    <div key={i} className="text-[11px] text-slate-200 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-rose-300 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] italic text-slate-300 font-serif">
                <Quote className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{aiInsight.motivationQuote}</span>
              </div>
            </div>
          )}

          {/* Search results overlay if searching */}
          {searchQuery && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Hasil Pencarian ("{searchQuery}"):
              </h4>

              <div className="space-y-2">
                {filteredMeds.map((m) => (
                  <div key={m.id} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border text-xs">
                    <span className="font-bold text-emerald-600 block">[Obat] {m.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Dosis: {m.dosage}</span>
                  </div>
                ))}

                {filteredMedRecords.map((m) => (
                  <div key={m.id} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border text-xs">
                    <span className="font-bold text-rose-600 block">[Rekam Medis] {m.diagnosis}</span>
                    <span className="text-[10px] text-slate-400">{m.doctorName} • {m.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Sub-Modules */}
          <FamilyHealthProfileModule />
          <MedicationAndReminderModule />
          <WellnessAndSleepModule />
          <NutritionAndFoodDiaryModule />
        </div>
      )}

      {/* Sub-Tabs View */}
      {activeSubTab === 'profile' && <FamilyHealthProfileModule />}
      {activeSubTab === 'medication' && <MedicationAndReminderModule />}
      {activeSubTab === 'wellness' && <WellnessAndSleepModule />}
      {activeSubTab === 'nutrition' && <NutritionAndFoodDiaryModule />}
    </div>
  );
};
