import React from 'react';
import { useEducationStore } from '../../stores/useEducationStore';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  FileCheck,
  Calendar,
  Clock,
  CheckCircle2,
  Award,
  ChevronRight,
  TrendingUp,
  User,
} from 'lucide-react';

interface Props {
  onOpenAddHomework: () => void;
  onOpenAddStudyPlan: () => void;
}

export const EducationOverviewTab: React.FC<Props> = ({ onOpenAddHomework, onOpenAddStudyPlan }) => {
  const {
    students,
    selectedStudent,
    setSelectedStudentId,
    homeworks,
    exams,
    readings,
    studyPlans,
    report,
    aiInsight,
    updateHomeworkStatus,
  } = useEducationStore();

  const pendingHomeworks = homeworks.filter((h) => h.status !== 'Selesai');
  const upcomingExams = exams.filter((e) => new Date(e.examDate) >= new Date());
  const activeReadings = readings.filter((r) => !r.isCompleted);

  return (
    <div className="space-y-6 pb-20">
      {/* Student Profile Switcher Bar */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
            {selectedStudent ? selectedStudent.name.charAt(0) : 'S'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900">{selectedStudent?.name}</h3>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[9px] font-extrabold text-indigo-700">
                {selectedStudent?.gradeLevel}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {selectedStudent?.schoolName} • {selectedStudent?.className}
            </p>
          </div>
        </div>

        <select
          value={selectedStudent?.id || ''}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* AI Learning Summary Card */}
      {aiInsight && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-purple-900 p-6 text-white shadow-xl border border-indigo-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-indigo-300">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-semibold tracking-wider uppercase">AI Learning Insight</span>
            </div>
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/30">
              Evaluasi Belajar
            </span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed mb-4">{aiInsight.learningSummary}</p>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center text-xs">
            <div>
              <span className="text-indigo-300 text-[10px]">Tugas Selesai</span>
              <p className="font-extrabold text-white text-base">{report?.homeworkCompletionRatePercent}%</p>
            </div>
            <div>
              <span className="text-indigo-300 text-[10px]">Jam Belajar/Mgg</span>
              <p className="font-extrabold text-indigo-400 text-base">{report?.totalStudyHoursThisWeek} Jam</p>
            </div>
            <div>
              <span className="text-indigo-300 text-[10px]">Rata Skor Kuis</span>
              <p className="font-extrabold text-emerald-400 text-base">{report?.averageQuizScore}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenAddHomework}
          className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 p-3.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition active:scale-[0.98]"
        >
          <FileCheck className="h-4 w-4" />
          <span>Tambah Tugas Sekolah</span>
        </button>
        <button
          onClick={onOpenAddStudyPlan}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 p-3.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition active:scale-[0.98]"
        >
          <Clock className="h-4 w-4 text-indigo-400" />
          <span>Jadwalkan Belajar</span>
        </button>
      </div>

      {/* Today's Learning & Study Plan Widget */}
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-600" />
            <span>Jadwal Belajar Hari Ini (Today's Learning)</span>
          </h3>
          <span className="text-[11px] font-semibold text-slate-400">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}
          </span>
        </div>

        <div className="space-y-2">
          {studyPlans.map((stp) => (
            <div
              key={stp.id}
              className={`rounded-2xl border p-3.5 shadow-sm flex items-center justify-between text-xs ${
                stp.isCompleted ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-indigo-50/50 border-indigo-100 text-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{stp.startTime} - {stp.endTime}</span>
                  <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-200">
                    {stp.focusSubject}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">{stp.title}</p>
              </div>

              <button className="p-1 text-slate-400 hover:text-indigo-600">
                <CheckCircle2 className={`h-5 w-5 ${stp.isCompleted ? 'text-emerald-500 fill-emerald-100' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Homework Summary Widget */}
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-indigo-600" />
            <span>Tugas Sekolah Perlu Dikerjakan ({pendingHomeworks.length})</span>
          </h3>
        </div>

        <div className="space-y-2">
          {pendingHomeworks.slice(0, 3).map((hw) => (
            <div
              key={hw.id}
              className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-extrabold text-indigo-800">
                  {hw.subjectName}
                </span>
                <span className="text-[10px] text-amber-600 font-bold">
                  Tenggat: {hw.deadlineDate}
                </span>
              </div>
              <h4 className="font-bold text-slate-900">{hw.title}</h4>
              <p className="text-[11px] text-slate-600">{hw.description}</p>
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => updateHomeworkStatus(hw.id, 'Selesai')}
                  className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Tandai Selesai</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Progress Summary Widget */}
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-600" />
            <span>Target Bacaan Aktif</span>
          </h3>
        </div>

        <div className="space-y-3">
          {activeReadings.map((rd) => {
            const pct = Math.round((rd.pagesRead / rd.totalPages) * 100);
            return (
              <div key={rd.id} className="rounded-2xl border border-slate-100 p-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900">{rd.bookTitle}</h4>
                    <p className="text-[11px] text-slate-500">Penulis: {rd.author}</p>
                  </div>
                  <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                    {rd.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                    <span>{rd.pagesRead} dari {rd.totalPages} Halaman</span>
                    <span>{pct}% Selesai</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
