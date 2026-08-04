import React, { useState } from 'react';
import { useParentingStore } from '../../stores/useParentingStore';
import { ChoreModel, SchoolActivity } from '../../types/parenting';
import {
  CheckSquare,
  Square,
  Clock,
  Plus,
  BookOpen,
  Calendar as CalendarIcon,
  FileText,
  UserCheck,
  Award,
} from 'lucide-react';

export const ChoreAndSchoolModule: React.FC = () => {
  const {
    children,
    selectedChildId,
    chores,
    schoolActivities,
    toggleChore,
    addChore,
    toggleSchoolActivity,
  } = useParentingStore();

  const activeChild = children.find((c) => c.id === selectedChildId) || children[0];
  const childChores = activeChild
    ? chores.filter((c) => c.childId === activeChild.id)
    : chores;
  const childSchoolActs = activeChild
    ? schoolActivities.filter((s) => s.childId === activeChild.id)
    : schoolActivities;

  // Modals state
  const [showAddChore, setShowAddChore] = useState(false);
  const [choreTitle, setChoreTitle] = useState('');
  const [choreDeadline, setChoreDeadline] = useState('Hari ini, 18:00');
  const [chorePoints, setChorePoints] = useState(15);

  const handleCreateChore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!choreTitle || !activeChild) return;

    await addChore({
      childId: activeChild.id,
      title: choreTitle,
      assignedChildName: activeChild.nickname,
      deadline: choreDeadline,
      rewardPoints: Number(chorePoints),
    });

    setShowAddChore(false);
    setChoreTitle('');
  };

  const getSchoolTypeBadge = (type: 'homework' | 'exam' | 'event') => {
    if (type === 'homework') {
      return (
        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[9px] font-bold">
          PR Sekolah
        </span>
      );
    }
    if (type === 'exam') {
      return (
        <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[9px] font-bold">
          Jadwal Ujian
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[9px] font-bold">
        Acara Sekolah
      </span>
    );
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Chore Management */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-500" /> Pengelolaan Tugas Rumah (Chores)
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Tugas membantu orang tua di rumah
            </span>
          </div>

          <button
            onClick={() => setShowAddChore(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Chore
          </button>
        </div>

        <div className="space-y-2">
          {childChores.map((c) => {
            const isCompleted = c.status === 'completed';
            return (
              <div
                key={c.id}
                onClick={() => toggleChore(c.id)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" />
                  )}

                  <div>
                    <span
                      className={`text-xs font-bold block ${
                        isCompleted
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {c.title}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {c.deadline}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                        <Award className="w-3 h-3 text-amber-500" /> +{c.rewardPoints} Poin
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  {isCompleted ? 'Selesai' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* School Planner & Activities */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div>
          <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-500" /> Jurnal & Kalender Sekolah ({activeChild?.nickname})
          </h4>
          <span className="text-[10px] text-slate-400 font-bold">
            PR, Jadwal Ujian, Catatan Guru, & Agenda Kegiatan Sekolah
          </span>
        </div>

        <div className="space-y-2.5">
          {childSchoolActs.map((s) => (
            <div
              key={s.id}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSchoolTypeBadge(s.type)}
                  <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
                    {s.title}
                  </h5>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3 text-slate-400" /> {s.date}
                </span>
              </div>

              {s.teacherNote && (
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-blue-600 dark:text-blue-400 block text-[10px]">
                      Catatan Guru:
                    </span>
                    <p className="leading-relaxed">{s.teacherNote}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => toggleSchoolActivity(s.id)}
                  className={`px-3 py-1 rounded-xl text-[10px] font-extrabold transition ${
                    s.isDone
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      : 'bg-blue-600 text-white shadow-2xs'
                  }`}
                >
                  {s.isDone ? 'Ditandai Selesai' : 'Tandai Selesai'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Chore */}
      {showAddChore && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Tambah Chore Rumah Baru
            </h3>

            <form onSubmit={handleCreateChore} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nama Tugas Rumah
                </label>
                <input
                  type="text"
                  required
                  value={choreTitle}
                  onChange={(e) => setChoreTitle(e.target.value)}
                  placeholder="Contoh: Menyapu Ruang Keluarga"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Deadline
                  </label>
                  <input
                    type="text"
                    value={choreDeadline}
                    onChange={(e) => setChoreDeadline(e.target.value)}
                    placeholder="Hari ini, 18:00"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Reward Poin
                  </label>
                  <input
                    type="number"
                    value={chorePoints}
                    onChange={(e) => setChorePoints(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddChore(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-emerald-600 text-white shadow-md"
                >
                  Simpan Chore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
