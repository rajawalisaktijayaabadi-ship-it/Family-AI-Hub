import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useMoodStore } from '../../stores/useMoodStore';
import { MoodCheckInModal } from './MoodCheckInModal';
import { FamilyMoodDashboard } from './FamilyMoodDashboard';
import { MoodJournalScreen } from './MoodJournalScreen';
import { MoodAnalyticsScreen } from './MoodAnalyticsScreen';
import { MedicalDisclaimerBanner } from '../../components/common/MedicalDisclaimerBanner';
import {
  Smile,
  Sparkles,
  Bell,
  Plus,
  BookOpen,
  BarChart2,
  Users,
  Quote,
  Heart,
  ChevronRight,
  Brain,
} from 'lucide-react';

export interface MoodHomeScreenProps {
  onNavigateToPsychology?: () => void;
}

export const MoodHomeScreen: React.FC<MoodHomeScreenProps> = ({ onNavigateToPsychology }) => {
  const {
    moods,
    aiInsight,
    isMoodReminderActive,
    toggleMoodReminder,
    loadInitialData,
  } = useMoodStore();

  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'family' | 'journal' | 'analytics'>('family');

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const latestMood = moods[0];

  return (
    <div className="space-y-4 pb-20 font-sans max-w-md mx-auto px-1">
      {/* Disclaimer Banner */}
      <MedicalDisclaimerBanner />

      {/* Hero Widget: Mood Hari Ini & Mood Score */}
      <div className="p-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl text-white shadow-xl relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-md">
              <Smile className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-100">
                AI Mood Detection & Wellness
              </span>
              <h2 className="text-base font-extrabold font-heading">Suasana Hati Hari Ini</h2>
            </div>
          </div>

          <button
            onClick={toggleMoodReminder}
            className={`p-2 rounded-2xl backdrop-blur-md transition flex items-center gap-1 text-[10px] font-bold ${
              isMoodReminderActive
                ? 'bg-emerald-500/80 text-white'
                : 'bg-white/20 text-blue-100'
            }`}
            title="Pengingat Mood Harian"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{isMoodReminderActive ? 'Pengingat Aktif' : 'Mati'}</span>
          </button>
        </div>

        {/* Latest Mood Banner */}
        <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] text-blue-100 font-bold block">Status Terakhir</span>
            <span className="text-sm font-extrabold font-heading block">
              {latestMood ? `${latestMood.userName}: ${latestMood.category}` : 'Belum Check-In Hari Ini'}
            </span>
            {latestMood?.note && (
              <p className="text-[11px] text-blue-100/90 italic line-clamp-1">"{latestMood.note}"</p>
            )}
          </div>

          <button
            onClick={() => setIsCheckInOpen(true)}
            className="px-3 py-2 bg-white text-blue-700 hover:bg-blue-50 rounded-2xl text-xs font-extrabold shadow-md flex items-center gap-1 shrink-0"
          >
            <Plus className="w-4 h-4" /> Check-In
          </button>
        </div>

        {/* Today's AI Insight */}
        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-amber-200">
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-300" /> Today's AI Insight
            </span>
            <span className="text-[9px] px-2 py-0.5 bg-amber-400/20 rounded-full font-mono">
              Mock AI Engine
            </span>
          </div>
          <p className="text-xs text-white/95 leading-relaxed font-medium">
            {aiInsight.summary}
          </p>

          <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-blue-100 italic flex items-center gap-1 line-clamp-1">
              <Quote className="w-3 h-3 text-amber-200 shrink-0" /> "{aiInsight.motivationQuote}"
            </span>
          </div>
        </div>
      </div>

      {/* Psychology Hub Shortcut */}
      {onNavigateToPsychology && (
        <button
          onClick={onNavigateToPsychology}
          className="w-full p-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl text-white shadow-md flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-md">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold font-heading">Pusat Psikologi & Stress Check</h4>
              <p className="text-[10px] text-teal-100">Tes Stres, Refleksi Diri, Pernapasan 4-4-4</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-teal-100" />
        </button>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
        <button
          onClick={() => setActiveTab('family')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'family'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-teal-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> Family Mood
        </button>
        <button
          onClick={() => setActiveTab('journal')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'journal'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-teal-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Jurnal Emosi
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'analytics'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-teal-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart2 className="w-4 h-4" /> Analitik
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'family' && <FamilyMoodDashboard />}
      {activeTab === 'journal' && <MoodJournalScreen />}
      {activeTab === 'analytics' && <MoodAnalyticsScreen />}

      {/* Mood Check-In Modal */}
      <MoodCheckInModal isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />
    </div>
  );
};
