import React, { useState } from 'react';
import { useParentingStore } from '../../stores/useParentingStore';
import { ChildModel, DevelopmentModel } from '../../types/parenting';
import {
  Baby,
  User,
  Ruler,
  Weight,
  Trophy,
  CheckCircle2,
  Plus,
  Heart,
  Calendar,
  Sparkles,
  School,
  AlertCircle,
} from 'lucide-react';

export const ChildProfileAndDevModule: React.FC = () => {
  const {
    children,
    selectedChildId,
    setSelectedChildId,
    developmentMap,
    addChild,
    updateDevelopment,
  } = useParentingStore();

  const activeChild = children.find((c) => c.id === selectedChildId) || children[0];
  const activeDev: DevelopmentModel | undefined = activeChild
    ? developmentMap[activeChild.id]
    : undefined;

  // Add child modal state
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildNickname, setNewChildNickname] = useState('');
  const [newChildBirth, setNewChildBirth] = useState('2018-01-01');
  const [newChildGender, setNewChildGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [newChildSchool, setNewChildSchool] = useState('');
  const [newChildGrade, setNewChildGrade] = useState('');

  // Update growth stats state
  const [showUpdateDev, setShowUpdateDev] = useState(false);
  const [heightCm, setHeightCm] = useState(activeDev?.heightCm || 120);
  const [weightKg, setWeightKg] = useState(activeDev?.weightKg || 22);

  const handleCreateChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName) return;

    await addChild({
      name: newChildName,
      nickname: newChildNickname || newChildName,
      birthDate: newChildBirth,
      gender: newChildGender,
      school: newChildSchool || 'Sekolah Dasar',
      grade: newChildGrade || 'Kelas 1',
      hobbies: ['Belajar', 'Bermain'],
      allergies: [],
      parentNotes: 'Anak yang penuh kebaikan dan rasa ingin tahu.',
      photoUrl:
        newChildGender === 'Perempuan'
          ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&auto=format&fit=crop&q=80',
    });

    setShowAddChild(false);
    setNewChildName('');
    setNewChildNickname('');
  };

  const handleSaveDevStats = async () => {
    if (!activeChild) return;
    await updateDevelopment(activeChild.id, {
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
    });
    setShowUpdateDev(false);
  };

  if (!activeChild) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Belum ada data anak. Klik tambah anak untuk memulai.
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans">
      {/* Child Switcher Pills */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {children.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedChildId(c.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
                c.id === activeChild.id
                  ? 'bg-blue-600 text-white shadow-md scale-102'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <img
                src={c.photoUrl}
                alt={c.nickname}
                className="w-5 h-5 rounded-full object-cover border border-white/50"
              />
              <span>{c.nickname}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddChild(true)}
          className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 rounded-2xl text-xs font-bold flex items-center gap-1"
          title="Tambah Profil Anak"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Child Info Profile Card */}
      <div className="p-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500 rounded-3xl text-white shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-start gap-3">
          <img
            src={activeChild.photoUrl}
            alt={activeChild.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30 shadow-md"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-blue-100">
                {activeChild.gender}
              </span>
              <span className="text-[10px] font-bold text-blue-100 font-mono">
                Lahir: {activeChild.birthDate}
              </span>
            </div>
            <h3 className="text-base font-extrabold font-heading text-white truncate">
              {activeChild.name}
            </h3>
            <p className="text-xs text-blue-100/90 flex items-center gap-1">
              <School className="w-3.5 h-3.5" /> {activeChild.school} ({activeChild.grade})
            </p>
          </div>
        </div>

        {/* Hobbies & Allergies Tag */}
        <div className="pt-2 border-t border-white/20 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[9px] text-blue-200 font-bold block uppercase tracking-wider">
              Hobi & Minat
            </span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {activeChild.hobbies.map((h, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg bg-white/10 text-[10px] font-medium"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[9px] text-pink-200 font-bold block uppercase tracking-wider">
              Catatan Alergi
            </span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {activeChild.allergies.length > 0 ? (
                activeChild.allergies.map((a, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-pink-500/30 text-pink-100 text-[10px] font-medium flex items-center gap-1"
                  >
                    <AlertCircle className="w-2.5 h-2.5 text-pink-200" /> {a}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-blue-200 italic">Tidak ada alergi</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Child Growth & Physical Metrics */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-blue-500" /> Pertumbuhan Fisik Anak
          </h4>
          <button
            onClick={() => setShowUpdateDev(true)}
            className="text-[11px] font-bold text-blue-600 dark:text-blue-400"
          >
            Update Pengukuran
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block flex items-center justify-center gap-1">
              <Ruler className="w-3.5 h-3.5 text-emerald-500" /> Tinggi Badan
            </span>
            <span className="text-lg font-black font-mono text-slate-800 dark:text-slate-100">
              {activeDev?.heightCm || '--'} cm
            </span>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold block">
              Ideal Usia Anak
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block flex items-center justify-center gap-1">
              <Weight className="w-3.5 h-3.5 text-indigo-500" /> Berat Badan
            </span>
            <span className="text-lg font-black font-mono text-slate-800 dark:text-slate-100">
              {activeDev?.weightKg || '--'} kg
            </span>
            <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold block">
              Status Gizi Seimbang
            </span>
          </div>
        </div>
      </div>

      {/* Development Milestones */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" /> Milestone Perkembangan
        </h4>

        <div className="space-y-2">
          {activeDev?.milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {m.title}
                </span>
                {m.dateAchieved && (
                  <span className="text-[10px] font-mono text-slate-400 block">
                    Tercapai: {m.dateAchieved}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements List */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-yellow-500" /> Prestasi & Pencapaian
        </h4>

        <div className="flex flex-wrap gap-2">
          {activeDev?.achievements.map((ach, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5 text-yellow-500" />
              <span>{ach}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Child */}
      {showAddChild && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Tambah Profil Anak Baru
            </h3>

            <form onSubmit={handleCreateChild} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="Contoh: Muhammad Rayhan"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  value={newChildNickname}
                  onChange={(e) => setNewChildNickname(e.target.value)}
                  placeholder="Contoh: Rayhan"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={newChildBirth}
                    onChange={(e) => setNewChildBirth(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    value={newChildGender}
                    onChange={(e) =>
                      setNewChildGender(e.target.value as 'Laki-laki' | 'Perempuan')
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Nama Sekolah
                  </label>
                  <input
                    type="text"
                    value={newChildSchool}
                    onChange={(e) => setNewChildSchool(e.target.value)}
                    placeholder="SD IT..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kelas
                  </label>
                  <input
                    type="text"
                    value={newChildGrade}
                    onChange={(e) => setNewChildGrade(e.target.value)}
                    placeholder="Kelas 2 SD"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddChild(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-blue-600 text-white shadow-md"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Update Dev Stats */}
      {showUpdateDev && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
              Update Pengukuran Fisik ({activeChild.nickname})
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Tinggi Badan (cm)
                </label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Berat Badan (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUpdateDev(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveDevStats}
                  className="px-4 py-2 rounded-xl font-bold bg-blue-600 text-white shadow-md"
                >
                  Simpan Pengukuran
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
