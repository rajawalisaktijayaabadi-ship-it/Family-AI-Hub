import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMoodStore } from '../../stores/useMoodStore';
import { useToastStore } from '../../stores/useToastStore';
import { EmotionTagType } from '../../types/mood';
import {
  BookOpen,
  Plus,
  Search,
  Tag,
  MapPin,
  Calendar,
  Trash2,
  Image as ImageIcon,
  Check,
  X,
} from 'lucide-react';

const TAG_LIST: EmotionTagType[] = [
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

export const MoodJournalScreen: React.FC = () => {
  const { journals, addJournalEntry, deleteJournalEntry } = useMoodStore();
  const { addToast } = useToastStore();

  const [search, setSearch] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string>('Semua');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('Ayah (Budi)');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [tags, setTags] = useState<EmotionTagType[]>(['Rumah']);
  const [activity, setActivity] = useState('Kumpul Keluarga');
  const [photoUrl, setPhotoUrl] = useState('');
  const [location, setLocation] = useState('Rumah Utama');

  const filteredJournals = journals.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.note.toLowerCase().includes(search.toLowerCase()) ||
      j.userName.toLowerCase().includes(search.toLowerCase());

    const matchesTag =
      selectedTagFilter === 'Semua' || j.tags.includes(selectedTagFilter);

    return matchesSearch && matchesTag;
  });

  const handleToggleTagForm = (t: EmotionTagType) => {
    if (tags.includes(t)) setTags(tags.filter((x) => x !== t));
    else setTags([...tags, t]);
  };

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !note.trim()) {
      addToast('Judul dan isi catatan wajib diisi!', 'error');
      return;
    }

    addJournalEntry(
      authorName,
      title.trim(),
      note.trim(),
      tags,
      activity,
      photoUrl.trim() || undefined,
      location.trim() || undefined
    );

    addToast('Jurnal emosi berhasil disimpan!', 'success');
    setIsAddOpen(false);
    setTitle('');
    setNote('');
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Search & Add Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-700">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari jurnal emosi & refleksi..."
            className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
        <button
          onClick={() => setIsAddOpen(!isAddOpen)}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold flex items-center gap-1 shrink-0 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Tulis
        </button>
      </div>

      {/* Tags Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setSelectedTagFilter('Semua')}
          className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition ${
            selectedTagFilter === 'Semua'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          Semua Tag
        </button>
        {TAG_LIST.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTagFilter(t)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition ${
              selectedTagFilter === t
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            #{t}
          </button>
        ))}
      </div>

      {/* Add Entry Drawer Form */}
      <AnimatePresence>
        {isAddOpen && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSaveJournal}
            className="p-4 bg-slate-50 dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
                Tulis Catatan Jurnal Emosi Baru
              </h4>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Nama Penulis (cth: Ayah Budi)"
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            />

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul Catatan (cth: Syukuran Hasil Ujian Anak)"
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
            />

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tulis cerita lengkap perasaan, peristiwa, dan refleksi Anda hari ini..."
              rows={3}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lokasi"
                className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="URL Foto Placeholder"
                className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 block">Pilih Tag:</span>
              <div className="flex flex-wrap gap-1">
                {TAG_LIST.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => handleToggleTagForm(t)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                      tags.includes(t)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-900 text-slate-600 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm"
              >
                Simpan Jurnal
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Journal Entry Feed */}
      <div className="space-y-3">
        {filteredJournals.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p>Belum ada catatan jurnal emosi ditemukan.</p>
          </div>
        ) : (
          filteredJournals.map((j) => (
            <div
              key={j.id}
              className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 space-y-3 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {j.userName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(j.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading mt-1">
                    {j.title}
                  </h4>
                </div>

                <button
                  onClick={() => {
                    deleteJournalEntry(j.id);
                    addToast('Jurnal dihapus', 'info');
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {j.note}
              </p>

              {j.photoUrl && (
                <div className="rounded-2xl overflow-hidden max-h-48 border border-slate-200 dark:border-slate-700">
                  <img
                    src={j.photoUrl}
                    alt={j.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] font-bold text-slate-400">
                <div className="flex items-center gap-2">
                  {j.location && (
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3 h-3 text-rose-500" /> {j.location}
                    </span>
                  )}
                  {j.activity && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {j.activity}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {j.tags.map((t) => (
                    <span key={t} className="text-blue-600 dark:text-teal-400">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
