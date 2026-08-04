import React, { useState } from 'react';
import { useParentingStore } from '../../stores/useParentingStore';
import { HabitModel, RewardModel } from '../../types/parenting';
import {
  CheckCircle,
  Circle,
  Flame,
  Award,
  Plus,
  Gift,
  Sparkles,
  BookOpen,
  Compass,
  Box,
  IceCream,
  Star,
  Check,
} from 'lucide-react';

export const HabitAndRewardModule: React.FC = () => {
  const {
    children,
    selectedChildId,
    habits,
    rewards,
    totalFamilyPoints,
    toggleHabit,
    addHabit,
    claimReward,
    addReward,
  } = useParentingStore();

  const activeChild = children.find((c) => c.id === selectedChildId) || children[0];
  const childHabits = activeChild
    ? habits.filter((h) => h.childId === activeChild.id)
    : habits;
  const childRewards = activeChild
    ? rewards.filter((r) => r.childId === activeChild.id)
    : rewards;

  const todayStr = new Date().toISOString().split('T')[0];

  // Modals state
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [habitTitle, setHabitTitle] = useState('');
  const [habitCategory, setHabitCategory] = useState<
    'Belajar' | 'Kesehatan' | 'Karakter' | 'Rutinitas'
  >('Belajar');
  const [habitPoints, setHabitPoints] = useState(10);

  const [showAddReward, setShowAddReward] = useState(false);
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardPoints, setRewardPoints] = useState(50);

  const handleCreateHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitTitle || !activeChild) return;

    await addHabit({
      childId: activeChild.id,
      title: habitTitle,
      category: habitCategory,
      frequency: 'daily',
      pointsReward: Number(habitPoints),
    });

    setShowAddHabit(false);
    setHabitTitle('');
  };

  const handleCreateReward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardTitle || !activeChild) return;

    await addReward({
      childId: activeChild.id,
      title: rewardTitle,
      pointsRequired: Number(rewardPoints),
      iconName: 'Gift',
    });

    setShowAddReward(false);
    setRewardTitle('');
  };

  const renderRewardIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-purple-500" />;
      case 'Box':
        return <Box className="w-5 h-5 text-amber-500" />;
      case 'IceCream':
        return <IceCream className="w-5 h-5 text-pink-500" />;
      default:
        return <Gift className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Family Points Banner */}
      <div className="p-4 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl text-white shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
            <Star className="w-6 h-6 text-yellow-200 fill-yellow-200" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-100">
              Poin Reward Keluarga
            </span>
            <h3 className="text-sm font-extrabold font-heading">
              {activeChild ? activeChild.nickname : 'Semua Anak'}
            </h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black font-mono text-white leading-none block">
            {totalFamilyPoints}
          </span>
          <span className="text-[10px] text-amber-100 font-bold block">Poin Terkumpul</span>
        </div>
      </div>

      {/* Habit Tracker Section */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Habit Tracker & Rutinitas Harian
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Checklist kebiasaan baik hari ini
            </span>
          </div>

          <button
            onClick={() => setShowAddHabit(true)}
            className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Habit
          </button>
        </div>

        <div className="space-y-2">
          {childHabits.map((h) => {
            const isDoneToday = h.completedDates.includes(todayStr);
            return (
              <div
                key={h.id}
                onClick={() => toggleHabit(h.id)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  isDoneToday
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDoneToday ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" />
                  )}

                  <div>
                    <span
                      className={`text-xs font-bold block ${
                        isDoneToday
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {h.title}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-0.5">
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {h.category}
                      </span>
                      <span className="text-amber-500 flex items-center gap-0.5">
                        +{h.pointsReward} Poin
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-[10px] font-bold font-mono">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span>{h.streak} Hari Streak</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reward Catalog Section */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-500" /> Kataloq Reward & Hadiah
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Tukarkan poin kebiasaan baik dengan reward impian
            </span>
          </div>

          <button
            onClick={() => setShowAddReward(true)}
            className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Reward
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {childRewards.map((r) => {
            const canUnlock = totalFamilyPoints >= r.pointsRequired;
            return (
              <div
                key={r.id}
                className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between space-x-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                    {renderRewardIcon(r.iconName)}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {r.title}
                    </h5>
                    <span className="text-[10px] text-amber-500 font-mono font-bold block">
                      {r.pointsRequired} Poin
                    </span>
                  </div>
                </div>

                {r.isClaimed ? (
                  <span className="px-2 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-[10px] font-bold flex items-center gap-1 shrink-0">
                    <Check className="w-3 h-3 text-emerald-500" /> Sudah Diklaim
                  </span>
                ) : canUnlock ? (
                  <button
                    onClick={() => claimReward(r.id)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-extrabold shadow-2xs shrink-0"
                  >
                    Klaim Now
                  </button>
                ) : (
                  <span className="px-2 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-[10px] font-mono font-bold shrink-0">
                    Terkunci
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Add Habit */}
      {showAddHabit && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Tambah Habit Baru ({activeChild?.nickname})
            </h3>

            <form onSubmit={handleCreateHabit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nama Kebiasaan Baik
                </label>
                <input
                  type="text"
                  required
                  value={habitTitle}
                  onChange={(e) => setHabitTitle(e.target.value)}
                  placeholder="Contoh: Belajar Mengaji 15 Menit"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kategori
                  </label>
                  <select
                    value={habitCategory}
                    onChange={(e) =>
                      setHabitCategory(
                        e.target.value as 'Belajar' | 'Kesehatan' | 'Karakter' | 'Rutinitas'
                      )
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="Belajar">Belajar</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Karakter">Karakter</option>
                    <option value="Rutinitas">Rutinitas</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Hadiah Poin
                  </label>
                  <input
                    type="number"
                    value={habitPoints}
                    onChange={(e) => setHabitPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddHabit(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-blue-600 text-white shadow-md"
                >
                  Simpan Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Reward */}
      {showAddReward && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Tambah Reward Impian Baru
            </h3>

            <form onSubmit={handleCreateReward} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nama Reward / Hadiah
                </label>
                <input
                  type="text"
                  required
                  value={rewardTitle}
                  onChange={(e) => setRewardTitle(e.target.value)}
                  placeholder="Contoh: Beli Komik Edukasi Seri 2"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Poin Penukaran
                </label>
                <input
                  type="number"
                  value={rewardPoints}
                  onChange={(e) => setRewardPoints(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReward(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-purple-600 text-white shadow-md"
                >
                  Simpan Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
