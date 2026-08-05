import React, { useState } from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import {
  Grid,
  List,
  Calendar,
  Heart,
  Plus,
  Search,
  Filter,
  Image as ImageIcon,
  Tag,
  Share2,
} from 'lucide-react';
import { useToastStore } from '../..//stores/useToastStore';

export const PhotoGalleryTab: React.FC = () => {
  const { photos, albums, addPhoto, searchQuery, setSearchQuery } = useMemoryStore();

  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>('grid');
  const [selectedAlbumFilter, setSelectedAlbumFilter] = useState<string>('All');
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);

  // Form states for new photo
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80'
  );
  const [photoAlbumId, setPhotoAlbumId] = useState('');

  const filteredPhotos = photos.filter((pho) => {
    const matchesSearch =
      pho.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pho.takenAt.includes(searchQuery);
    const matchesAlbum = selectedAlbumFilter === 'All' || pho.albumId === selectedAlbumFilter;
    return matchesSearch && matchesAlbum;
  });

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle || !photoUrl) return;

    addPhoto({
      title: photoTitle,
      url: photoUrl,
      thumbnailUrl: photoUrl,
      sizeMb: 3.5,
      width: 1920,
      height: 1080,
      isFavorite: false,
      memberId: 'usr_fai_me',
      albumId: photoAlbumId || undefined,
      takenAt: new Date().toISOString().slice(0, 10),
    });

    setPhotoTitle('');
    setIsAddPhotoOpen(false);
  };

  const handleSharePhoto = (title: string) => {
    navigator.clipboard.writeText(`Lihat foto kenangan "${title}" di FamilyAI Hub!`);
    useToastStore.getState().addToast('Tautan bagikan foto telah disalin!', 'success');
  };

  return (
    <div className="space-y-4">
      {/* Search & View Mode Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari foto kenangan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          {/* Album Filter */}
          <select
            value={selectedAlbumFilter}
            onChange={(e) => setSelectedAlbumFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="All">Semua Album</option>
            {albums.map((alb) => (
              <option key={alb.id} value={alb.id}>
                {alb.name}
              </option>
            ))}
          </select>

          {/* View Toggles */}
          <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-sm' : 'text-slate-500'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-sm' : 'text-slate-500'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'timeline' ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-sm' : 'text-slate-500'
              }`}
              title="Timeline View"
            >
              <Calendar className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsAddPhotoOpen(true)}
            className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl shadow-sm transition active:scale-95 flex items-center justify-center"
            title="Tambah Foto"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add Photo Form Card */}
      {isAddPhotoOpen && (
        <form onSubmit={handleAddPhotoSubmit} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-amber-200 dark:border-amber-900/50 shadow-md space-y-3">
          <h4 className="text-xs font-black text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span>Unggah Foto Baru Ke Galeri</span>
          </h4>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Judul Foto</label>
            <input
              type="text"
              placeholder="Contoh: Senyum Ceria Aisyah"
              value={photoTitle}
              onChange={(e) => setPhotoTitle(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">URL Foto / Gambar</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Pilih Album (Opsional)</label>
            <select
              value={photoAlbumId}
              onChange={(e) => setPhotoAlbumId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="">Tanpa Album (Galeri Utama)</option>
              {albums.map((alb) => (
                <option key={alb.id} value={alb.id}>
                  {alb.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsAddPhotoOpen(false)}
              className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-amber-600 text-white text-xs font-black rounded-xl shadow-sm hover:bg-amber-700"
            >
              Simpan Foto
            </button>
          </div>
        </form>
      )}

      {/* Gallery Content View */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs space-y-2">
          <ImageIcon className="w-8 h-8 mx-auto text-slate-300" />
          <p>Belum ada foto dalam galeri ini.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {filteredPhotos.map((pho) => (
            <div
              key={pho.id}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800 shadow-sm"
            >
              <img
                src={pho.url}
                alt={pho.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end text-white">
                <p className="text-[11px] font-extrabold truncate">{pho.title}</p>
                <div className="flex items-center justify-between text-[9px] text-slate-300 pt-0.5">
                  <span>{pho.takenAt}</span>
                  <button onClick={() => handleSharePhoto(pho.title)} className="hover:text-amber-300">
                    <Share2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === 'list' ? (
        <div className="space-y-2">
          {filteredPhotos.map((pho) => (
            <div
              key={pho.id}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img src={pho.thumbnailUrl} alt={pho.title} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">{pho.title}</h4>
                  <p className="text-[10px] text-slate-500">{pho.takenAt} • {pho.sizeMb} MB</p>
                </div>
              </div>

              <button
                onClick={() => handleSharePhoto(pho.title)}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Timeline View */
        <div className="space-y-4 relative border-l-2 border-amber-500/30 ml-3 pl-4">
          {filteredPhotos.map((pho) => (
            <div key={pho.id} className="relative space-y-1">
              <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-900" />
              <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400">{pho.takenAt}</span>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <img src={pho.thumbnailUrl} alt={pho.title} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">{pho.title}</h4>
                  <p className="text-[10px] text-slate-500">Ukuran berkas: {pho.sizeMb} MB</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
