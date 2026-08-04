import React, { useState } from 'react';
import { useMoodStore } from '../../stores/useMoodStore';
import { useToastStore } from '../../stores/useToastStore';
import { Sparkles, Heart, Award, BookOpen, Share2, Plus, Calendar } from 'lucide-react';

export const SelfReflectionModule: React.FC = () => {
  const { reflections, gratitudes, addReflection, addGratitude } = useMoodStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<'reflection' | 'gratitude'>('gratitude');

  // Reflection form states
  const [userName, setUserName] = useState('Ayah (Budi)');
  const [dailyReflection, setDailyReflection] = useState('');
  const [achievementInput, setAchievementInput] = useState('');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [lessonsLearned, setLessonsLearned] = useState('');

  // Gratitude form states
  const [gratitudeContent, setGratitudeContent] = useState('');
  const [isShared, setIsShared] = useState(true);

  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      setAchievements([...achievements, achievementInput.trim()]);
      setAchievementInput('');
    }
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dailyReflection.trim()) {
      addToast('Isi refleksi harian wajib diisi!', 'error');
      return;
    }

    addReflection(userName, dailyReflection.trim(), achievements, lessonsLearned.trim());
    addToast('Refleksi diri berhasil disimpan!', 'success');
    setDailyReflection('');
    setAchievements([]);
    setLessonsLearned('');
  };

  const handleSaveGratitude = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gratitudeContent.trim()) {
      addToast('Tuliskan hal yang Anda syukuri hari ini!', 'error');
      return;
    }

    addGratitude(userName, gratitudeContent.trim(), isShared);
    addToast('Ungkapan rasa syukur disimpan!', 'success');
    setGratitudeContent('');
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Sub Tabs */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
        <button
          onClick={() => setActiveTab('gratitude')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'gratitude'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-4 h-4 text-amber-500" /> Jurnal Rasa Syukur (Gratitude)
        </button>
        <button
          onClick={() => setActiveTab('reflection')}
          className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'reflection'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-teal-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-blue-500" /> Refleksi & Pencapaian
        </button>
      </div>

      {activeTab === 'gratitude' ? (
        <div className="space-y-4">
          {/* Gratitude Form */}
          <form
            onSubmit={handleSaveGratitude}
            className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs"
          >
            <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Today's Gratitude (Rasa Syukur Hari Ini)
            </h3>

            <textarea
              value={gratitudeContent}
              onChange={(e) => setGratitudeContent(e.target.value)}
              placeholder="Tuliskan 1 hingga 3 hal sederhana yang membuat Anda bersyukur hari ini..."
              rows={3}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none"
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isShared}
                  onChange={(e) => setIsShared(e.target.checked)}
                  className="rounded accent-amber-500 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5 text-amber-500" /> Bagikan di Family Gratitude Wall
                </span>
              </label>

              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl text-xs font-extrabold shadow-xs"
              >
                Simpan Gratitude
              </button>
            </div>
          </form>

          {/* Family Gratitude Wall */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
              Family Gratitude Feed
            </h4>

            <div className="space-y-2">
              {gratitudes.map((g) => (
                <div
                  key={g.id}
                  className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold">
                      {g.userName}
                    </span>
                    <span>
                      {new Date(g.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 italic">
                    "{g.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Reflection Tab */
        <div className="space-y-4">
          <form
            onSubmit={handleSaveReflection}
            className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs"
          >
            <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-500" /> Refleksi Diri & Pembelajaran
            </h3>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Catatan Refleksi Malam Ini:
              </label>
              <textarea
                value={dailyReflection}
                onChange={(e) => setDailyReflection(e.target.value)}
                placeholder="Apa yang Anda pelajari tentang respon emosi Anda hari ini?"
                rows={2}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Capaian Kecil Hari Ini (Achievement):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={achievementInput}
                  onChange={(e) => setAchievementInput(e.target.value)}
                  placeholder="Cth: Menyelesaikan pekerjaan tanpa menunda"
                  className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {achievements.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {achievements.map((ach, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold"
                    >
                      🏆 {ach}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Pelajaran Berharga (Lesson Learned):
              </label>
              <input
                type="text"
                value={lessonsLearned}
                onChange={(e) => setLessonsLearned(e.target.value)}
                placeholder="Cth: Mengomunikasikan lelah dengan jujur lebih baik daripada dipendam"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold rounded-2xl shadow-xs"
            >
              Simpan Refleksi Harian
            </button>
          </form>

          {/* Past Reflection Feed */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
              Riwayat Refleksi Diri
            </h4>

            <div className="space-y-2">
              {reflections.map((r) => (
                <div
                  key={r.id}
                  className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span className="text-blue-600 dark:text-teal-400 font-extrabold">
                      {r.userName}
                    </span>
                    <span>
                      {new Date(r.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                    "{r.dailyReflection}"
                  </p>

                  {r.lessonsLearned && (
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                      💡 Lesson: {r.lessonsLearned}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
