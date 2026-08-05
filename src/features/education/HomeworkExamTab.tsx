import React, { useState } from 'react';
import { useEducationStore } from '../../stores/useEducationStore';
import { FileCheck, Calendar, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Props {
  onOpenAddHomework: () => void;
  onOpenAddExam: () => void;
}

export const HomeworkExamTab: React.FC<Props> = ({ onOpenAddHomework, onOpenAddExam }) => {
  const { homeworks, exams, updateHomeworkStatus } = useEducationStore();
  const [activeSubTab, setActiveSubTab] = useState<'homework' | 'exam'>('homework');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredHomeworks = homeworks.filter((h) => {
    if (filterStatus === 'All') return true;
    return h.status === filterStatus;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Sub Tabs Toggle */}
      <div className="flex rounded-2xl bg-slate-100 p-1">
        <button
          onClick={() => setActiveSubTab('homework')}
          className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'homework' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          <FileCheck className="h-4 w-4" />
          <span>Tugas Sekolah ({homeworks.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('exam')}
          className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'exam' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>Jadwal Ujian ({exams.length})</span>
        </button>
      </div>

      {activeSubTab === 'homework' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {/* Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Belum Dikerjakan', 'Dalam Proses', 'Selesai'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold whitespace-nowrap transition ${
                    filterStatus === st ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {st === 'All' ? 'Semua Status' : st}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenAddHomework}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredHomeworks.map((hw) => (
              <div
                key={hw.id}
                className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-extrabold text-indigo-700 border border-indigo-100">
                      {hw.subjectName}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold ${
                        hw.priority === 'High'
                          ? 'bg-rose-50 text-rose-700'
                          : hw.priority === 'Medium'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      Prioritas {hw.priority}
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      hw.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800'
                        : hw.status === 'Dalam Proses'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {hw.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{hw.title}</h4>
                  <p className="text-slate-600 mt-1">{hw.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    Tenggat: <strong className="text-slate-800">{hw.deadlineDate}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {hw.status !== 'Selesai' && (
                      <button
                        onClick={() => updateHomeworkStatus(hw.id, 'Selesai')}
                        className="rounded-xl bg-emerald-50 px-3 py-1 font-bold text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                      >
                        Selesaikan
                      </button>
                    )}
                    {hw.status === 'Belum Dikerjakan' && (
                      <button
                        onClick={() => updateHomeworkStatus(hw.id, 'Dalam Proses')}
                        className="rounded-xl bg-indigo-50 px-3 py-1 font-bold text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                      >
                        Mulai Kerjakan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'exam' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Jadwal Ujian & Evaluasi</h3>
            <button
              onClick={onOpenAddExam}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Ujian</span>
            </button>
          </div>

          <div className="space-y-3">
            {exams.map((ex) => (
              <div
                key={ex.id}
                className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-extrabold text-purple-700 border border-purple-100">
                    {ex.examType}
                  </span>
                  <span className="text-slate-500 font-medium text-[11px]">{ex.examDate}</span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{ex.subjectName}</h4>
                  {ex.notes && <p className="text-slate-600 mt-1">{ex.notes}</p>}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-[11px]">
                  <span className="text-slate-500">
                    Target Nilai: <strong className="text-indigo-600">{ex.targetScore}</strong>
                  </span>
                  {ex.achievedScore ? (
                    <span className="font-extrabold text-emerald-600">
                      Nilai Diraih: {ex.achievedScore}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-bold">Belum Dilaksanakan</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
