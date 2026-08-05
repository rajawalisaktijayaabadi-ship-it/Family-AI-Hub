import React, { useState } from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { MemoryCategory } from '../../types/memories';
import { X, Sparkles, MapPin, Tag, Calendar, User, Camera } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMemoryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addMemory, familyTree } = useMemoryStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MemoryCategory>('Daily Life');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('12:00 WIB');
  const [locationName, setLocationName] = useState('');
  const [familyMemberName, setFamilyMemberName] = useState('Bapak Hendra');
  const [tagsInput, setTagsInput] = useState('Keluarga, Bahagia');
  const [coverUrl, setCoverUrl] = useState(
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addMemory({
      title,
      description,
      category,
      date,
      time,
      locationName: locationName || 'Rumah Keluarga',
      familyMemberId: 'usr_fai_me',
      familyMemberName,
      tags,
      isFavorite: false,
      isArchived: false,
      coverUrl,
      mediaType: 'photo',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-2xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Tambah Kenangan Baru</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Abadikan momen manis keluarga Anda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Judul Kenangan
            </label>
            <input
              type="text"
              placeholder="Contoh: Pesta Kelulusan Aisyah"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MemoryCategory)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Birthday">Ulang Tahun</option>
                <option value="Vacation">Liburan</option>
                <option value="Wedding">Pernikahan</option>
                <option value="Graduation">Wisuda</option>
                <option value="Baby">Bayi & Balita</option>
                <option value="School">Sekolah</option>
                <option value="Achievement">Prestasi</option>
                <option value="Holiday">Hari Raya</option>
                <option value="Daily Life">Kehidupan Harian</option>
                <option value="Pets">Hewan Peliharaan</option>
                <option value="Custom">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tanggal</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Anggota Keluarga Utama
            </label>
            <select
              value={familyMemberName}
              onChange={(e) => setFamilyMemberName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              {familyTree.map((member) => (
                <option key={member.id} value={member.name}>
                  {member.name} ({member.relation})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Lokasi Momen
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Contoh: Taman Mini Indonesia Indah"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Kisah / Deskripsi Kenangan
            </label>
            <textarea
              rows={3}
              placeholder="Ceritakan momen manis yang berkesan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              URL Foto Sampul / Media
            </label>
            <input
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tag (pisahkan dengan koma)
            </label>
            <input
              type="text"
              placeholder="Ceria, Kebersamaan, Kebanggaan"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-2xl shadow-md active:scale-98 transition mt-2"
          >
            Simpan Ke Memori Keluarga
          </button>
        </form>
      </div>
    </div>
  );
};
