import React, { useState } from 'react';
import { useParentingStore } from '../../stores/useParentingStore';
import { ScreenTimeModel, LearningGoalModel } from '../../types/parenting';
import {
  Smartphone,
  Target,
  Plus,
  Clock,
  Bell,
  BookOpen,
  Brain,
  Dumbbell,
  Sparkles,
  Award,
} from 'lucide-react';

export const ScreenTimeAndGoalsModule: React.FC = () => {
  const {
    children,
    selectedChildId,
    screenTimeMap,
    learningGoals,
    updateScreenTime,
    addLearningGoal,
  } = useParentingStore();

  const activeChild = children.find((c) => c.id === selectedChildId) || children[0];
  const activeSt: ScreenTimeModel | undefined = activeChild
    ? screenTimeMap[activeChild.id]
    : undefined;
  const childGoals = activeChild
    ? learningGoals.filter((l) => l.childId === activeChild.id)
    : learningGoals;

  // Modals state
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalType, setGoalType] = useState<LearningGoalModel['goalType']>('reading');
  const [goalTarget, setGoalTarget] = useState(5);
  const [goalUnit, setGoalUnit] = useState('Buku');
  const [goalDeadline, setGoalDeadline] = useState('2026-08-31');

  const [showEditSt, setShowEditSt] = useState(false);
  const [stTarget, setStTarget] = useState(activeSt?.targetMinutes || 60);

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle || !activeChild) return;

    await addLearningGoal({
      childId: activeChild.id,
      goalType,
      title: goalTitle,
      targetValue: Number(goalTarget),
      currentValue: 0,
      unit: goalUnit,
      deadline: goalDeadline,
    });

    setShowAddGoal(false);
    setGoalTitle('');
  };

  const handleSaveScreenTime = async () => {
    if (!activeChild) return;
    await updateScreenTime(activeChild.id, {
      targetMinutes: Number(stTarget),
    });
    setShowEditSt(false);
  };

  const getGoalIcon = (type: LearningGoalModel['goalType']) => {
    switch (type) {
      case 'reading':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'memorization':
        return <Brain className="w-4 h-4 text-purple-500" />;
      case 'exercise':
        return <Dumbbell className="w-4 h-4 text-emerald-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Screen Time Dashboard */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-indigo-500" /> Screen Time & Batas Layar ({activeChild?.nickname})
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Keseimbangan penggunaan gawai & aktivitas fisik
            </span>
          </div>

          <button
            onClick={() => setShowEditSt(true)}
            className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400"
          >
            Atur Batas
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 text-center">
            <span className="text-[10px] text-slate-400 font-bold block flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" /> Pemakaian Hari Ini
            </span>
            <span className="text-lg font-black font-mono text-slate-800 dark:text-slate-100">
              {activeSt?.dailyUsageMinutes || 0}m
            </span>
            <span className="text-[9px] text-slate-400 block font-mono">
              Batas Maks: {activeSt?.targetMinutes || 60}m
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 text-center">
            <span className="text-[10px] text-slate-400 font-bold block flex items-center justify-center gap-1">
              <Target className="w-3.5 h-3.5 text-emerald-500" /> Sisa Kuota
            </span>
            <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
              {Math.max(0, (activeSt?.targetMinutes || 60) - (activeSt?.dailyUsageMinutes || 0))}m
            </span>
            <span className="text-[9px] text-emerald-600 font-bold block">Aman & Terkontrol</span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 text-center col-span-2 sm:col-span-1 flex flex-col justify-center items-center">
            <span className="text-[10px] text-slate-400 font-bold block flex items-center justify-center gap-1">
              <Bell className="w-3.5 h-3.5 text-amber-500" /> Pengingat Otomatis
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold mt-1">
              Aktif (Notifikasi 10m)
            </span>
          </div>
        </div>
      </div>

      {/* Learning Goals Section */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-500" /> Target Belajar & Keterampilan (Learning Goals)
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Pencapaian membaca, hafalan, dan olahraga anak
            </span>
          </div>

          <button
            onClick={() => setShowAddGoal(true)}
            className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Goal
          </button>
        </div>

        <div className="space-y-2.5">
          {childGoals.map((g) => {
            const percent = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100));
            return (
              <div
                key={g.id}
                className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                      {getGoalIcon(g.goalType)}
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold uppercase text-blue-600 dark:text-blue-400">
                        {g.goalType}
                      </span>
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {g.title}
                      </h5>
                    </div>
                  </div>

                  <span className="text-xs font-black font-mono text-slate-800 dark:text-slate-200">
                    {g.currentValue} / {g.targetValue} {g.unit}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Target s.d. {g.deadline}</span>
                    <span>{percent}% Tercapai</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Add Goal */}
      {showAddGoal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Tambah Target Belajar Baru ({activeChild?.nickname})
            </h3>

            <form onSubmit={handleCreateGoal} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Judul Target Belajar
                </label>
                <input
                  type="text"
                  required
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="Contoh: Membaca 10 Cerita Rakyat"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Jenis Target
                  </label>
                  <select
                    value={goalType}
                    onChange={(e) =>
                      setGoalType(e.target.value as LearningGoalModel['goalType'])
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="reading">Membaca Buku</option>
                    <option value="memorization">Hafalan Surat</option>
                    <option value="exercise">Olahraga</option>
                    <option value="skill">Keterampilan Baru</option>
                    <option value="custom">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Angka
                  </label>
                  <input
                    type="number"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Satuan Unit
                  </label>
                  <input
                    type="text"
                    value={goalUnit}
                    onChange={(e) => setGoalUnit(e.target.value)}
                    placeholder="Buku, Surat, Jam..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={goalDeadline}
                    onChange={(e) => setGoalDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-blue-600 text-white shadow-md"
                >
                  Simpan Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Screen Time */}
      {showEditSt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Atur Batas Layar Harian ({activeChild?.nickname})
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Maksimal (Menit/Hari)
                </label>
                <input
                  type="number"
                  value={stTarget}
                  onChange={(e) => setStTarget(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditSt(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveScreenTime}
                  className="px-4 py-2 rounded-xl font-bold bg-indigo-600 text-white shadow-md"
                >
                  Simpan Batas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
