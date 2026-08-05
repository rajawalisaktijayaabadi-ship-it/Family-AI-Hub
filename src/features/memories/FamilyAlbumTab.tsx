import React, { useState } from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { FolderHeart, Plus, Lock, Globe, Tag, Sparkles, Image as ImageIcon } from 'lucide-react';

export const FamilyAlbumTab: React.FC = () => {
  const { albums, createAlbum } = useMemoryStore();

  const [activeSubTab, setActiveSubTab] = useState<'all' | 'shared' | 'private'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Vacation');
  const [isPrivate, setIsPrivate] = useState(false);
  const [coverUrl, setCoverUrl] = useState(
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  );

  const filteredAlbums = albums.filter((alb) => {
    if (activeSubTab === 'shared') return alb.isShared && !alb.isPrivate;
    if (activeSubTab === 'private') return alb.isPrivate;
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    createAlbum({
      name,
      description,
      category,
      coverUrl,
      isPrivate,
      isShared: !isPrivate,
      tags: [category, 'AlbumKeluarga'],
      memberId: 'usr_fai_me',
    });

    setName('');
    setDescription('');
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Sub Tabs Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'all'
                ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Semua ({albums.length})
          </button>
          <button
            onClick={() => setActiveSubTab('shared')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              activeSubTab === 'shared'
                ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Bersama</span>
          </button>
          <button
            onClick={() => setActiveSubTab('private')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              activeSubTab === 'private'
                ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privat</span>
          </button>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-extrabold flex items-center gap-1 shadow-sm transition active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Buat Album</span>
        </button>
      </div>

      {/* Create Album Modal */}
      {isCreateOpen && (
        <form onSubmit={handleCreateSubmit} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-amber-200 dark:border-amber-900 shadow-md space-y-3">
          <h4 className="text-xs font-black text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <FolderHeart className="w-4 h-4" />
            <span>Buat Album Foto Baru</span>
          </h4>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Nama Album</label>
            <input
              type="text"
              placeholder="Contoh: Wisuda & Kelulusan Aisyah"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Deskripsi Singkat</label>
            <input
              type="text"
              placeholder="Album dokumentasi khusus..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Kategori Album</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Vacation">Liburan</option>
                <option value="School">Sekolah</option>
                <option value="Birthday">Ulang Tahun</option>
                <option value="Private Album">Privat & Rahasia</option>
                <option value="Daily Life">Kehidupan Sehari-hari</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Status Privasi</label>
              <select
                value={isPrivate ? 'private' : 'shared'}
                onChange={(e) => setIsPrivate(e.target.value === 'private')}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="shared">Berbagi Ke Keluarga</option>
                <option value="private">Privat Saya Saja</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">URL Cover Foto</label>
            <input
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-amber-600 text-white text-xs font-black rounded-xl shadow-sm hover:bg-amber-700"
            >
              Buat Album
            </button>
          </div>
        </form>
      )}

      {/* Album Cards List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredAlbums.map((alb) => (
          <div
            key={alb.id}
            className="bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:shadow-md transition"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
              <img src={alb.coverUrl} alt={alb.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-slate-900/70 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                {alb.isPrivate ? <Lock className="w-3 h-3 text-amber-400" /> : <Globe className="w-3 h-3 text-emerald-400" />}
                <span>{alb.isPrivate ? 'Privat' : 'Grup Keluarga'}</span>
              </div>
              <span className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {alb.itemCount} Item
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-900 dark:text-white">{alb.name}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">{alb.description}</p>

              <div className="flex flex-wrap gap-1 pt-1">
                {alb.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md font-extrabold"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
