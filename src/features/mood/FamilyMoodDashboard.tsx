import { useState } from 'react';
import { useMoodStore } from '../../stores/useMoodStore';
import { MoodService } from '../../services/MoodService';
import { Users, Heart, Sparkles, Activity } from 'lucide-react';

export const FamilyMoodDashboard = () => {
  const { moods } = useMoodStore();
  const [selectedMember, setSelectedMember] = useState<'all' | 'Ayah' | 'Ibu' | 'Anak'>('all');

  const ayahMoods = moods.filter((m) => m.userRole === 'Ayah');
  const ibuMoods = moods.filter((m) => m.userRole === 'Ibu');
  const anakMoods = moods.filter((m) => m.userRole === 'Anak');

  const latestAyah = ayahMoods[0];
  const latestIbu = ibuMoods[0];
  const latestAnak = anakMoods[0];

  const familyScore = MoodService.calculateMoodScore(moods);

  // Heatmap data simulation for last 7 days
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const members = ['Ayah', 'Ibu', 'Anak'];

  const getHeatmapColor = (role: string, dayIdx: number) => {
    // Generate deterministic mock color intensity based on role and day
    const intensityVal = (role.length * 3 + dayIdx * 7) % 10;
    if (intensityVal > 7) return 'bg-emerald-500 text-white';
    if (intensityVal > 4) return 'bg-blue-500 text-white';
    if (intensityVal > 2) return 'bg-amber-400 text-slate-900';
    return 'bg-purple-400 text-white';
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Header Harmony Index Card */}
      <div className="p-4 bg-gradient-to-br from-indigo-600 via-blue-600 to-teal-500 rounded-3xl text-white shadow-md relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-md">
              <Heart className="w-5 h-5 text-pink-200 fill-pink-200 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-100">
                Family Harmony Score
              </span>
              <h3 className="text-base font-extrabold font-heading">Suasana Hati Rumah</h3>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-mono font-black">
            {familyScore} / 100
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center">
          <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm">
            <span className="text-[9px] text-blue-100 font-bold block">Mood Ayah</span>
            <span className="text-xs font-extrabold">{latestAyah ? latestAyah.category : 'Belum Check-In'}</span>
          </div>
          <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm">
            <span className="text-[9px] text-blue-100 font-bold block">Mood Ibu</span>
            <span className="text-xs font-extrabold">{latestIbu ? latestIbu.category : 'Belum Check-In'}</span>
          </div>
          <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm">
            <span className="text-[9px] text-blue-100 font-bold block">Mood Anak</span>
            <span className="text-xs font-extrabold">{latestAnak ? latestAnak.category : 'Belum Check-In'}</span>
          </div>
        </div>
      </div>

      {/* Member Cards Grid */}
      <div className="space-y-2">
        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
          <Users className="w-4 h-4 text-blue-500" /> Status Mood Anggota Keluarga
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { role: 'Ayah', data: latestAyah, name: 'Ayah (Budi)', bg: 'from-blue-500/10 to-indigo-500/10' },
            { role: 'Ibu', data: latestIbu, name: 'Ibu (Siti)', bg: 'from-emerald-500/10 to-teal-500/10' },
            { role: 'Anak', data: latestAnak, name: 'Siti Jr (Anak)', bg: 'from-purple-500/10 to-pink-500/10' },
          ].map((item) => (
            <div
              key={item.role}
              className={`p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 space-y-2 shadow-xs`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                  {item.role}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {item.data ? new Date(item.data.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'}
                </span>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white font-heading">
                  {item.name}
                </h5>
                <p className="text-sm font-extrabold text-blue-600 dark:text-teal-400 mt-0.5">
                  {item.data ? item.data.category : 'Belum Check-in Hari Ini'}
                </p>
              </div>

              {item.data?.note && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 italic bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                  "{item.data.note}"
                </p>
              )}

              {item.data?.tags && item.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.data.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mood Heatmap */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-teal-500" /> Matriks Mood Heatmap (7 Hari)
          </h4>
          <span className="text-[10px] font-bold text-slate-400">Pekan Ini</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-8 gap-1.5 text-center font-bold text-slate-400 text-[10px]">
            <span>Role</span>
            {days.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {members.map((mem) => (
            <div key={mem} className="grid grid-cols-8 gap-1.5 items-center">
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                {mem}
              </span>
              {days.map((d, idx) => (
                <div
                  key={d}
                  className={`h-7 rounded-lg flex items-center justify-center font-bold text-[9px] shadow-2xs ${getHeatmapColor(
                    mem,
                    idx
                  )}`}
                  title={`${mem} - ${d}`}
                >
                  {((mem.length + idx * 3) % 4) + 7}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
