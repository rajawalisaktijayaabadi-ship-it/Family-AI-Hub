import React, { useEffect, useState } from 'react';
import { useParentingStore } from '../../stores/useParentingStore';
import { ChildDevelopmentDisclaimer } from '../../components/common/ChildDevelopmentDisclaimer';
import { ChildProfileAndDevModule } from './ChildProfileAndDevModule';
import { HabitAndRewardModule } from './HabitAndRewardModule';
import { ChoreAndSchoolModule } from './ChoreAndSchoolModule';
import { FamilyActivityModule } from './FamilyActivityModule';
import { ScreenTimeAndGoalsModule } from './ScreenTimeAndGoalsModule';
import {
  Baby,
  Sparkles,
  Trophy,
  CheckCircle2,
  BookOpen,
  Calendar,
  Smartphone,
  Quote,
  Flame,
  Star,
  Layers,
  Heart,
  Users,
} from 'lucide-react';

type ParentingSubTab =
  | 'overview'
  | 'profile'
  | 'habits'
  | 'chores'
  | 'activities'
  | 'screentime';

export const ParentingHomeScreen: React.FC = () => {
  const {
    children,
    selectedChildId,
    setSelectedChildId,
    developmentMap,
    habits,
    totalFamilyPoints,
    schoolActivities,
    aiInsight,
    initialize,
  } = useParentingStore();

  const [activeSubTab, setActiveSubTab] = useState<ParentingSubTab>('overview');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const activeChild = children.find((c) => c.id === selectedChildId) || children[0];
  const activeDev = activeChild ? developmentMap[activeChild.id] : undefined;
  const activeChildHabits = activeChild
    ? habits.filter((h) => h.childId === activeChild.id)
    : habits;
  const activeSchoolActs = activeChild
    ? schoolActivities.filter((s) => s.childId === activeChild.id && !s.isDone)
    : schoolActivities;

  const todayStr = new Date().toISOString().split('T')[0];
  const completedHabitsToday = activeChildHabits.filter((h) =>
    h.completedDates.includes(todayStr)
  ).length;

  return (
    <div className="space-y-4 pb-20 font-sans max-w-md mx-auto px-1">
      {/* Disclaimer Banner */}
      <ChildDevelopmentDisclaimer />

      {/* Header Banner */}
      <div className="p-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500 rounded-3xl text-white shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <Baby className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-100">
                AI Parenting & Child Development
              </span>
              <h2 className="text-base font-extrabold font-heading">Sistem Parenting Digital</h2>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-mono font-black">
            {totalFamilyPoints} Poin
          </span>
        </div>

        {/* Child Selector Pill in Header */}
        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
          {children.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedChildId(c.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition whitespace-nowrap ${
                c.id === activeChild?.id
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {c.nickname}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Sub-Menu */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'overview'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-blue-500" /> Utama
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'profile'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Baby className="w-3.5 h-3.5 text-indigo-500" /> Tumbuh
        </button>

        <button
          onClick={() => setActiveSubTab('habits')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'habits'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-500" /> Habit
        </button>

        <button
          onClick={() => setActiveSubTab('chores')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'chores'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> Tugas
        </button>

        <button
          onClick={() => setActiveSubTab('activities')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'activities'
              ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-teal-500" /> Agenda
        </button>

        <button
          onClick={() => setActiveSubTab('screentime')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1 transition text-[11px] ${
            activeSubTab === 'screentime'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-purple-500" /> Layar
        </button>
      </div>

      {/* Main Overview Dashboard */}
      {activeSubTab === 'overview' && (
        <div className="space-y-4">
          {/* Today's Parenting Summary */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" /> Today's Parenting Overview ({activeChild?.nickname})
              </h3>
              <span className="text-[10px] font-mono font-bold text-slate-400">{todayStr}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold block">Habit Selesai</span>
                <span className="text-base font-black font-mono text-emerald-600">
                  {completedHabitsToday} / {activeChildHabits.length}
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold block">Tinggi / Berat</span>
                <span className="text-xs font-black font-mono text-slate-800 dark:text-slate-100">
                  {activeDev?.heightCm || 0}cm / {activeDev?.weightKg || 0}kg
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold block">Tugas PR Aktif</span>
                <span className="text-base font-black font-mono text-blue-600">
                  {activeSchoolActs.length} Agenda
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 font-bold block">Poin Reward</span>
                <span className="text-base font-black font-mono text-amber-500">
                  {totalFamilyPoints} Poin
                </span>
              </div>
            </div>
          </div>

          {/* AI Parenting Insight Card */}
          {aiInsight && (
            <div className="p-4 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl text-white shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
                  <Sparkles className="w-5 h-5 text-teal-300" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-300">
                    Mock AI Parenting Insight
                  </span>
                  <h4 className="text-xs font-extrabold font-heading">Saran Pengasuhan Hari Ini</h4>
                </div>
              </div>

              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-xs leading-relaxed space-y-1.5">
                <p className="font-bold text-teal-100">{aiInsight.dailyTips}</p>

                <div className="pt-2 border-t border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-300 font-bold block">
                    Saran Aktivitas Penguat Karakter:
                  </span>
                  {aiInsight.activityRecommendations.map((act, i) => (
                    <div key={i} className="text-[11px] text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-teal-300 shrink-0" /> {act}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] italic text-slate-300 font-serif">
                <Quote className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{aiInsight.motivationQuote}</span>
              </div>
            </div>
          )}

          {/* Quick Sub-Modules View Summary */}
          <ChildProfileAndDevModule />
          <HabitAndRewardModule />
        </div>
      )}

      {/* Render Specific Sub-Tabs */}
      {activeSubTab === 'profile' && <ChildProfileAndDevModule />}
      {activeSubTab === 'habits' && <HabitAndRewardModule />}
      {activeSubTab === 'chores' && <ChoreAndSchoolModule />}
      {activeSubTab === 'activities' && <FamilyActivityModule />}
      {activeSubTab === 'screentime' && <ScreenTimeAndGoalsModule />}
    </div>
  );
};
