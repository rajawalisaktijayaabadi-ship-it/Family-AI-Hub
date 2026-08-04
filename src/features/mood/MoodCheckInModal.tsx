import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useMoodStore } from '../../stores/useMoodStore';
import { useToastStore } from '../../stores/useToastStore';
import { MoodCategoryType, EmotionTagType, FamilyMemberRole } from '../../types/mood';
import {
  Smile,
  X,
  Sliders,
  Tag,
  MapPin,
  Camera,
  Check,
  Sparkles,
  Heart,
  Palette,
  Activity,
} from 'lucide-react';

interface MoodCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOOD_CATEGORIES: { label: MoodCategoryType; color: string }[] = [
  { label: '😊 Bahagia', color: '#3b82f6' },
  { label: '😁 Sangat Bahagia', color: '#10b981' },
  { label: '😌 Tenang', color: '#14b8a6' },
  { label: '❤️ Bersyukur', color: '#f59e0b' },
  { label: '😐 Biasa', color: '#64748b' },
  { label: '😴 Lelah', color: '#8b5cf6' },
  { label: '😟 Cemas', color: '#ec4899' },
  { label: '😢 Sedih', color: '#06b6d4' },
  { label: '😡 Marah', color: '#ef4444' },
  { label: '🤯 Stres', color: '#f97316' },
];

const EMOTION_TAGS: EmotionTagType[] = [
  'Pekerjaan',
  'Sekolah',
  'Pasangan',
  'Anak',
  'Keuangan',
  'Kesehatan',
  'Teman',
  'Rumah',
  'Liburan',
  'Lainnya',
];

const ACTIVITIES = [
  'Bekerja/Sekolah',
  'Olahraga',
  'Makan Bersama',
  'Istirahat/Tidur',
  'Kumpul Keluarga',
  'Bermain/Hobi',
];

const COLOR_WHEEL = [
  '#3b82f6',
  '#10b981',
  '#14b8a6',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#ef4444',
  '#f97316',
];

export const MoodCheckInModal: React.FC<MoodCheckInModalProps> = ({ isOpen, onClose }) => {
  const { addMoodCheckIn } = useMoodStore();
  const { addToast } = useToastStore();

  const [selectedRole, setSelectedRole] = useState<FamilyMemberRole>('Ayah');
  const [userName, setUserName] = useState('Ayah (Budi)');
  const [selectedCategory, setSelectedCategory] = useState<MoodCategoryType>('😊 Bahagia');
  const [intensity, setIntensity] = useState<number>(8);
  const [selectedColor, setSelectedColor] = useState<string>('#3b82f6');
  const [selectedTags, setSelectedTags] = useState<EmotionTagType[]>(['Rumah']);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['Kumpul Keluarga']);
  const [note, setNote] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [location, setLocation] = useState('Rumah Utama');

  if (!isOpen) return null;

  const handleRoleChange = (role: FamilyMemberRole) => {
    setSelectedRole(role);
    if (role === 'Ayah') setUserName('Ayah (Budi)');
    else if (role === 'Ibu') setUserName('Ibu (Siti)');
    else if (role === 'Anak') setUserName('Siti Jr (Anak)');
    else setUserName('Kakek / Nenek');
  };

  const toggleTag = (tag: EmotionTagType) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleActivity = (act: string) => {
    if (selectedActivities.includes(act)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== act));
    } else {
      setSelectedActivities([...selectedActivities, act]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMoodCheckIn(
      userName,
      selectedRole,
      selectedCategory,
      intensity,
      selectedColor,
      note.trim() || undefined,
      selectedTags,
      selectedActivities,
      photoUrl.trim() || undefined,
      location.trim() || undefined
    );

    addToast(`Mood ${selectedCategory} berhasil dicatat!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 font-heading">
                Check-In Mood Hari Ini
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
                Catat Perasaan & Emosi Keluarga
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 no-scrollbar pr-1">
          {/* Member Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Anggota Keluarga
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['Ayah', 'Ibu', 'Anak', 'Lainnya'] as FamilyMemberRole[]).map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition border ${
                    selectedRole === role
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Category Grid */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Pilih Suasana Hati (Emoji)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MOOD_CATEGORIES.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => {
                    setSelectedCategory(item.label);
                    setSelectedColor(item.color);
                  }}
                  className={`p-2.5 rounded-2xl border text-left font-bold text-xs flex items-center justify-between transition ${
                    selectedCategory === item.label
                      ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{item.label}</span>
                  {selectedCategory === item.label && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Slider Intensity */}
          <div className="space-y-1.5 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-blue-500" /> Intensitas Perasaan
              </span>
              <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-[10px]">
                {intensity} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-400 font-bold">
              <span>Sangat Ringan (1)</span>
              <span>Sedang (5)</span>
              <span>Sangat Kuat (10)</span>
            </div>
          </div>

          {/* Color Picker Wheel Presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-purple-500" /> Warna Aura Mood
            </label>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {COLOR_WHEEL.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-full shrink-0 transition flex items-center justify-center ${
                    selectedColor === c ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''
                  }`}
                >
                  {selectedColor === c && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Emotion Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-teal-500" /> Kategori Terkait (Emotion Tag)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {EMOTION_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition border ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-indigo-500" /> Aktivitas Saat Ini
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ACTIVITIES.map((act) => {
                const isSelected = selectedActivities.includes(act);
                return (
                  <button
                    type="button"
                    key={act}
                    onClick={() => toggleActivity(act)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {act}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note & Location */}
          <div className="space-y-2">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ceritakan sedikit tentang perasaan Anda hari ini..."
              rows={2}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Lokasi"
                  className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="URL Foto (Opsional)"
                  className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-2xl text-xs font-extrabold shadow-md transition"
          >
            Simpan Mood & Minta Analisis AI
          </button>
        </form>
      </motion.div>
    </div>
  );
};
