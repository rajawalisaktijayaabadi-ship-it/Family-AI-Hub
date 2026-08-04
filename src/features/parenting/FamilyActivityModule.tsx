import React, { useState } from 'react';
import { useParentingStore } from '../../stores/useParentingStore';
import { FamilyActivityModel, FamilyChallenge, ParentingJournalModel } from '../../types/parenting';
import {
  Calendar,
  Plus,
  Compass,
  Film,
  Utensils,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Trophy,
  BookMarked,
  Sparkles,
  Users,
} from 'lucide-react';

export const FamilyActivityModule: React.FC = () => {
  const {
    children,
    selectedChildId,
    familyActivities,
    familyChallenges,
    journals,
    addFamilyActivity,
    addJournal,
  } = useParentingStore();

  const activeChild = children.find((c) => c.id === selectedChildId) || children[0];
  const childJournals = activeChild
    ? journals.filter((j) => j.childId === activeChild.id)
    : journals;

  // Modals state
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [actTitle, setActTitle] = useState('');
  const [actCategory, setActCategory] = useState<FamilyActivityModel['category']>('Weekend Plan');
  const [actDate, setActDate] = useState('2026-08-09');
  const [actNotes, setActNotes] = useState('');

  const [showAddJournal, setShowAddJournal] = useState(false);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalNote, setJournalNote] = useState('');
  const [journalTag, setJournalTag] = useState('Perkembangan Karakter');

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle) return;

    await addFamilyActivity({
      title: actTitle,
      category: actCategory,
      date: actDate,
      participants: ['Ayah', 'Ibu', activeChild ? activeChild.nickname : 'Anak'],
      status: 'planned',
      notes: actNotes,
    });

    setShowAddActivity(false);
    setActTitle('');
    setActNotes('');
  };

  const handleCreateJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalTitle || !activeChild) return;

    await addJournal({
      childId: activeChild.id,
      title: journalTitle,
      note: journalNote,
      milestoneTag: journalTag,
    });

    setShowAddJournal(false);
    setJournalTitle('');
    setJournalNote('');
  };

  const getCategoryIcon = (cat: FamilyActivityModel['category']) => {
    switch (cat) {
      case 'Weekend Plan':
      case 'Family Trip':
        return <Compass className="w-4 h-4 text-blue-500" />;
      case 'Movie Night':
        return <Film className="w-4 h-4 text-purple-500" />;
      case 'Cooking Together':
        return <Utensils className="w-4 h-4 text-amber-500" />;
      case 'Exercise':
        return <Dumbbell className="w-4 h-4 text-emerald-500" />;
      case 'Reading Together':
        return <BookOpen className="w-4 h-4 text-indigo-500" />;
      case 'Game Night':
        return <Gamepad2 className="w-4 h-4 text-pink-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-teal-500" />;
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Family Activities Planner */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-500" /> Perencana Aktivitas Keluarga
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Agenda kebersamaan hangat & seru bersama anak
            </span>
          </div>

          <button
            onClick={() => setShowAddActivity(true)}
            className="px-3 py-1.5 rounded-xl bg-teal-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Agenda
          </button>
        </div>

        <div className="space-y-2">
          {familyActivities.map((act) => (
            <div
              key={act.id}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {getCategoryIcon(act.category)}
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase text-teal-600 dark:text-teal-400">
                      {act.category}
                    </span>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {act.title}
                    </h5>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" /> {act.date}
                </span>
              </div>

              {act.notes && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-7">
                  {act.notes}
                </p>
              )}

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                <span>Peserta: {act.participants.join(', ')}</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-full ${
                    act.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}
                >
                  {act.status === 'completed' ? 'Terlaksana' : 'Rencana'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Family Challenges */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-500" /> Tantangan Keluarga Mingguan
        </h4>

        <div className="space-y-2">
          {familyChallenges.map((ch) => (
            <div
              key={ch.id}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800 dark:text-slate-200">{ch.title}</span>
                <span className="text-amber-500 font-mono">+{ch.pointsReward} Poin</span>
              </div>

              <div className="space-y-1">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${ch.progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Progres Tantangan</span>
                  <span>{ch.progressPercent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parenting Journal */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-purple-500" /> Jurnal Pengasuhan ({activeChild?.nickname})
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              Catatan momen berharga & refleksi orang tua
            </span>
          </div>

          <button
            onClick={() => setShowAddJournal(true)}
            className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Catat Jurnal
          </button>
        </div>

        <div className="space-y-2">
          {childJournals.map((j) => (
            <div
              key={j.id}
              className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[9px] font-bold">
                  {j.milestoneTag || 'Refleksi'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">{j.createdAt}</span>
              </div>

              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{j.title}</h5>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {j.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Activity */}
      {showAddActivity && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Tambah Agenda Keluarga Baru
            </h3>

            <form onSubmit={handleCreateActivity} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Judul Aktivitas
                </label>
                <input
                  type="text"
                  required
                  value={actTitle}
                  onChange={(e) => setActTitle(e.target.value)}
                  placeholder="Contoh: Berenang Bersama Sabtu Pagi"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kategori
                  </label>
                  <select
                    value={actCategory}
                    onChange={(e) =>
                      setActCategory(e.target.value as FamilyActivityModel['category'])
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="Weekend Plan">Weekend Plan</option>
                    <option value="Family Trip">Family Trip</option>
                    <option value="Movie Night">Movie Night</option>
                    <option value="Cooking Together">Cooking Together</option>
                    <option value="Exercise">Exercise</option>
                    <option value="Reading Together">Reading Together</option>
                    <option value="Game Night">Game Night</option>
                    <option value="Custom Activity">Custom Activity</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={actDate}
                    onChange={(e) => setActDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Catatan Perlengkapan / Rencana
                </label>
                <textarea
                  rows={2}
                  value={actNotes}
                  onChange={(e) => setActNotes(e.target.value)}
                  placeholder="Membawa kacamata renang, makanan ringan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddActivity(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-teal-600 text-white shadow-md"
                >
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Journal */}
      {showAddJournal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Catat Jurnal Pengasuhan ({activeChild?.nickname})
            </h3>

            <form onSubmit={handleCreateJournal} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Judul Momen / Pengalaman
                </label>
                <input
                  type="text"
                  required
                  value={journalTitle}
                  onChange={(e) => setJournalTitle(e.target.value)}
                  placeholder="Contoh: Kejujuran Rayhan Saat Mengaku Pecahkan Gelas"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Tag Perkembangan
                </label>
                <input
                  type="text"
                  value={journalTag}
                  onChange={(e) => setJournalTag(e.target.value)}
                  placeholder="Emosional, Kemandirian, dll."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Catatan Refleksi Orang Tua
                </label>
                <textarea
                  rows={3}
                  required
                  value={journalNote}
                  onChange={(e) => setJournalNote(e.target.value)}
                  placeholder="Tuliskan pengalaman, respon emosi, dan hikmah yang dipetik..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddJournal(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-purple-600 text-white shadow-md"
                >
                  Simpan Jurnal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
