import React, { useEffect, useState } from 'react';
import { useEducationStore } from '../../stores/useEducationStore';
import { EducationOverviewTab } from './EducationOverviewTab';
import { HomeworkExamTab } from './HomeworkExamTab';
import { StudyReadingTab } from './StudyReadingTab';
import { QuizFlashcardTab } from './QuizFlashcardTab';
import { KnowledgeHubTab } from './KnowledgeHubTab';
import { AchievementsCertificatesTab } from './AchievementsCertificatesTab';
import { EducationAnalyticsTab } from './EducationAnalyticsTab';
import {
  AddHomeworkModal,
  AddStudyPlanModal,
  AddExamModal,
  AddReadingModal,
  AddFlashcardModal,
} from './EducationModals';
import {
  GraduationCap,
  BookOpen,
  FileCheck,
  Clock,
  HelpCircle,
  Award,
  BarChart2,
  Sparkles,
  WifiOff,
} from 'lucide-react';

export const EducationHomeScreen: React.FC = () => {
  const { initialize, isLoading } = useEducationStore();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'homework' | 'study' | 'quiz' | 'knowledge' | 'cert' | 'analytics'
  >('overview');

  // Modal Open States
  const [isAddHomeworkOpen, setIsAddHomeworkOpen] = useState(false);
  const [isAddStudyPlanOpen, setIsAddStudyPlanOpen] = useState(false);
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [isAddReadingOpen, setIsAddReadingOpen] = useState(false);
  const [isAddFlashcardOpen, setIsAddFlashcardOpen] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center space-y-3 flex-col">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        <p className="text-xs font-semibold text-slate-500">Memuat Pusat Pembelajaran AI...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Top Header */}
      <div className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 px-4 py-3.5 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-extrabold text-slate-900">Education & Learning Center</h1>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[9px] font-extrabold text-indigo-700 border border-indigo-100">
                  Fase 11
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Pusat Belajar Anak, Sekolah & Knowledge Hub</p>
            </div>
          </div>

          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
            <WifiOff className="h-3 w-3 text-emerald-600" />
            Mock Engine Active
          </span>
        </div>

        {/* Horizontal Nav Bar */}
        <div className="mt-3 flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Beranda</span>
          </button>

          <button
            onClick={() => setActiveTab('homework')}
            className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'homework'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileCheck className="h-3.5 w-3.5" />
            <span>Tugas & Ujian</span>
          </button>

          <button
            onClick={() => setActiveTab('study')}
            className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'study'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>Jadwal & Buku</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Kuis & Flashcard</span>
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'knowledge'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Knowledge Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('cert')}
            className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'cert'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Sertifikat & Goal</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            <span>Analitik</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4">
        {activeTab === 'overview' && (
          <EducationOverviewTab
            onOpenAddHomework={() => setIsAddHomeworkOpen(true)}
            onOpenAddStudyPlan={() => setIsAddStudyPlanOpen(true)}
          />
        )}
        {activeTab === 'homework' && (
          <HomeworkExamTab
            onOpenAddHomework={() => setIsAddHomeworkOpen(true)}
            onOpenAddExam={() => setIsAddExamOpen(true)}
          />
        )}
        {activeTab === 'study' && (
          <StudyReadingTab
            onOpenAddStudyPlan={() => setIsAddStudyPlanOpen(true)}
            onOpenAddReading={() => setIsAddReadingOpen(true)}
          />
        )}
        {activeTab === 'quiz' && (
          <QuizFlashcardTab
            onOpenAddFlashcard={() => setIsAddFlashcardOpen(true)}
          />
        )}
        {activeTab === 'knowledge' && <KnowledgeHubTab />}
        {activeTab === 'cert' && (
          <AchievementsCertificatesTab
            onOpenAddGoal={() => {}}
            onOpenAddCertificate={() => {}}
          />
        )}
        {activeTab === 'analytics' && <EducationAnalyticsTab />}
      </div>

      {/* Modals */}
      <AddHomeworkModal isOpen={isAddHomeworkOpen} onClose={() => setIsAddHomeworkOpen(false)} />
      <AddStudyPlanModal isOpen={isAddStudyPlanOpen} onClose={() => setIsAddStudyPlanOpen(false)} />
      <AddExamModal isOpen={isAddExamOpen} onClose={() => setIsAddExamOpen(false)} />
      <AddReadingModal isOpen={isAddReadingOpen} onClose={() => setIsAddReadingOpen(false)} />
      <AddFlashcardModal isOpen={isAddFlashcardOpen} onClose={() => setIsAddFlashcardOpen(false)} />
    </div>
  );
};
