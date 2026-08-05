import React, { useState } from 'react';
import { useEducationStore } from '../../stores/useEducationStore';
import { Clock, BookOpen, Plus, Play, Pause, RotateCcw, CheckCircle2, Star } from 'lucide-react';

interface Props {
  onOpenAddStudyPlan: () => void;
  onOpenAddReading: () => void;
}

export const StudyReadingTab: React.FC<Props> = ({ onOpenAddStudyPlan, onOpenAddReading }) => {
  const { studyPlans, readings, toggleStudyPlanCompleted } = useEducationStore();
  const [activeSub, setActiveSub] = useState<'study' | 'reading'>('study');

  // Pomodoro Mock Timer State
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setPomodoroMinutes(25);
    setPomodoroSeconds(0);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Sub tabs */}
      <div className="flex rounded-2xl bg-slate-100 p-1">
        <button
          onClick={() => setActiveSub('study')}
          className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSub === 'study' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>Jadwal Belajar ({studyPlans.length})</span>
        </button>
        <button
          onClick={() => setActiveSub('reading')}
          className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSub === 'reading' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Reading Center ({readings.length})</span>
        </button>
      </div>

      {activeSub === 'study' && (
        <div className="space-y-6">
          {/* Pomodoro Focus Timer Card */}
          <div className="rounded-3xl bg-gradient-to-tr from-indigo-900 via-indigo-800 to-purple-900 p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-200">
                Mode Fokus Pomodoro (25 Min Focus)
              </span>
              <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] text-indigo-200 border border-indigo-400/30">
                Offline Supported
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-5xl font-black font-mono tracking-tight text-white">
                {String(pomodoroMinutes).padStart(2, '0')}:{String(pomodoroSeconds).padStart(2, '0')}
              </span>
              <p className="text-xs text-indigo-200 mt-1">Fokus belajar tanpa distraksi gadget & sosial media</p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={toggleTimer}
                className="flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-xs font-extrabold text-indigo-900 shadow-md hover:bg-indigo-50 active:scale-95"
              >
                {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-indigo-900" />}
                <span>{isTimerRunning ? 'Jeda' : 'Mulai Fokus'}</span>
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center gap-1.5 rounded-2xl bg-indigo-700/50 px-4 py-2.5 text-xs font-bold text-indigo-100 hover:bg-indigo-700"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Study List Header & Add Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Rencana Sesi Belajar</h3>
            <button
              onClick={onOpenAddStudyPlan}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Sesi</span>
            </button>
          </div>

          <div className="space-y-3">
            {studyPlans.map((stp) => (
              <div
                key={stp.id}
                className={`rounded-3xl border p-4 shadow-sm flex items-center justify-between text-xs transition ${
                  stp.isCompleted ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-white border-slate-100 text-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900">{stp.startTime} - {stp.endTime}</span>
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                      {stp.focusSubject}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900">{stp.title}</h4>
                  {stp.notes && <p className="text-[11px] text-slate-500">{stp.notes}</p>}
                </div>

                <button
                  onClick={() => toggleStudyPlanCompleted(stp.id)}
                  className="p-2 text-slate-400 hover:text-indigo-600"
                >
                  <CheckCircle2
                    className={`h-6 w-6 ${stp.isCompleted ? 'text-emerald-500 fill-emerald-100' : ''}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSub === 'reading' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Daftar Buku & Literasi Read</h3>
            <button
              onClick={onOpenAddReading}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Buku</span>
            </button>
          </div>

          <div className="space-y-3">
            {readings.map((rd) => {
              const pct = Math.round((rd.pagesRead / rd.totalPages) * 100);
              return (
                <div key={rd.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm space-y-3 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                        {rd.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{rd.bookTitle}</h4>
                      <p className="text-slate-500 text-[11px]">Penulis: {rd.author}</p>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star className="h-4 w-4 fill-amber-400" />
                      <span className="text-xs font-extrabold text-slate-800">{rd.rating}</span>
                    </div>
                  </div>

                  {rd.notes && <p className="text-slate-600 text-[11px] italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">{rd.notes}</p>}

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                      <span>Progres Hal: {rd.pagesRead} / {rd.totalPages}</span>
                      <span className="text-indigo-600">{pct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
