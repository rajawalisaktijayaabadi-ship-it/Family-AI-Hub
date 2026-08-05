import React, { useState } from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { Film, Play, Plus, Clock, Video as VideoIcon, Sparkles } from 'lucide-react';
import { useToastStore } from '../../stores/useToastStore';

export const VideoGalleryTab: React.FC = () => {
  const { videos, addVideo } = useMemoryStore();

  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activePlayUrl, setActivePlayUrl] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [videoType, setVideoType] = useState<
    'Short Video' | 'Long Video' | 'Family Event' | 'School Activity' | 'Holiday'
  >('Family Event');
  const [url, setUrl] = useState(
    'https://assets.mixkit.co/videos/preview/mixkit-happy-birthday-cake-with-candles-41618-large.mp4'
  );

  const filteredVideos = videos.filter(
    (v) => selectedFilter === 'All' || v.videoType === selectedFilter
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    addVideo({
      title,
      url,
      durationSeconds: 120,
      videoType,
      sizeMb: 52.0,
      isFavorite: false,
      memberId: 'usr_fai_me',
      takenAt: new Date().toISOString().slice(0, 10),
    });

    setTitle('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar & Add Button */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5">
          {['All', 'Family Event', 'Short Video', 'School Activity', 'Holiday'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                selectedFilter === cat
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat === 'All' ? 'Semua Video' : cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-3 py-1.5 bg-amber-600 text-white rounded-2xl text-xs font-extrabold flex items-center gap-1 hover:bg-amber-700 transition shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Video</span>
        </button>
      </div>

      {/* Add Video Modal Form */}
      {isAddOpen && (
        <form onSubmit={handleAddSubmit} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-amber-200 dark:border-amber-900 shadow-md space-y-3">
          <h4 className="text-xs font-black text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <VideoIcon className="w-4 h-4" />
            <span>Unggah Video Kenangan Baru</span>
          </h4>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Judul Video</label>
            <input
              type="text"
              placeholder="Contoh: Pentas Seni Sekolah Aisyah"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Kategori Video</label>
            <select
              value={videoType}
              onChange={(e) => setVideoType(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Family Event">Acara Keluarga</option>
              <option value="Short Video">Video Pendek (Shorts/Reels)</option>
              <option value="School Activity">Kegiatan Sekolah</option>
              <option value="Holiday">Hari Libur / Wisata</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">URL Video (MP4)</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-amber-600 text-white text-xs font-black rounded-xl shadow-sm hover:bg-amber-700"
            >
              Simpan Video
            </button>
          </div>
        </form>
      )}

      {/* Video Player Overlay */}
      {activePlayUrl && (
        <div className="p-4 bg-slate-900 rounded-3xl text-white space-y-2 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold flex items-center gap-1.5 text-amber-400">
              <Film className="w-4 h-4" />
              <span>Memutar Video Kenangan</span>
            </span>
            <button
              onClick={() => setActivePlayUrl(null)}
              className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold hover:bg-white/30"
            >
              Tutup
            </button>
          </div>
          <video src={activePlayUrl} controls autoPlay className="w-full rounded-2xl aspect-video bg-black" />
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm space-y-2 p-3"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 group">
              <img
                src={vid.thumbnailUrl || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80'}
                alt={vid.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-300"
              />
              <button
                onClick={() => setActivePlayUrl(vid.url)}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-lg hover:bg-amber-500 active:scale-95 transition"
              >
                <Play className="w-6 h-6 fill-white ml-1" />
              </button>

              <span className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {Math.floor(vid.durationSeconds / 60)}:
                {(vid.durationSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">{vid.title}</h4>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>{vid.videoType}</span>
                <span>{vid.sizeMb} MB • {vid.takenAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
