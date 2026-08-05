import React from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import {
  Sparkles,
  Calendar,
  Heart,
  MapPin,
  Clock,
  ChevronRight,
  FolderHeart,
  Image as ImageIcon,
  Film,
  Mic,
  Star,
  Plus,
} from 'lucide-react';

interface Props {
  onOpenAddMemory: () => void;
  onNavigateTab: (tab: string) => void;
}

export const MemoriesOverviewTab: React.FC<Props> = ({ onOpenAddMemory, onNavigateTab }) => {
  const { memories, albums, favorites, aiInsight, toggleFavoriteMemory } = useMemoryStore();

  const recentMemories = memories.slice(0, 4);

  return (
    <div className="space-y-4">
      {/* Quick Action & Today's Flashback */}
      {aiInsight && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 p-4 text-white shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full font-extrabold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-200" />
              <span>Flashback Hari Ini ({aiInsight.todayFlashback.yearsAgo} Tahun Lalu)</span>
            </span>
            <span className="text-[10px] text-amber-100 font-bold">
              {aiInsight.todayFlashback.dateFormatted}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <img
              src={aiInsight.todayFlashback.imageUrl}
              alt={aiInsight.todayFlashback.title}
              className="w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white/30 flex-shrink-0"
            />
            <div className="space-y-1">
              <h3 className="text-sm font-black leading-tight">
                {aiInsight.todayFlashback.title}
              </h3>
              <p className="text-[11px] text-amber-100/90 line-clamp-2">
                {aiInsight.todayFlashback.description}
              </p>
              <button
                onClick={() => onNavigateTab('timeline')}
                className="text-[10px] font-bold text-amber-200 hover:underline flex items-center gap-1 pt-0.5"
              >
                <span>Lihat Kenangan Lengkap</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Memory Insight Card */}
      {aiInsight && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                AI Memory Insight
              </h3>
            </div>
            <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              Mock AI Active
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            {aiInsight.summary}
          </p>

          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              Rekomendasi Aksi AI:
            </p>
            {aiInsight.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-extrabold text-amber-950 dark:text-amber-200">{rec.title}</p>
                  <p className="text-[10px] text-amber-800/80 dark:text-amber-300/70">{rec.reason}</p>
                </div>
                <span className="text-[9px] bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                  {rec.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Memories Header & Add Button */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Kenangan Terbaru ({memories.length})
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Momen berharga yang baru diabadikan</p>
        </div>
        <button
          onClick={onOpenAddMemory}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-extrabold shadow-sm transition flex items-center gap-1 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah</span>
        </button>
      </div>

      {/* Recent Memories Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recentMemories.map((mem) => (
          <div
            key={mem.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition space-y-2 p-3"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
              <img
                src={mem.coverUrl || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80'}
                alt={mem.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleFavoriteMemory(mem)}
                className="absolute top-2 right-2 p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white hover:text-rose-400 transition"
              >
                <Heart className={`w-4 h-4 ${mem.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <span className="absolute bottom-2 left-2 text-[10px] bg-slate-900/70 backdrop-blur-md text-white px-2 py-0.5 rounded-full font-bold">
                {mem.category}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">{mem.title}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">{mem.description}</p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-500" />
                  {mem.date}
                </span>
                <span className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300">
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  {mem.familyMemberName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Album Highlights */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <FolderHeart className="w-4 h-4 text-amber-600" />
            <span>Album Keluarga ({albums.length})</span>
          </h3>
          <button
            onClick={() => onNavigateTab('albums')}
            className="text-[11px] font-bold text-amber-600 hover:underline"
          >
            Lihat Semua
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {albums.map((alb) => (
            <div
              key={alb.id}
              onClick={() => onNavigateTab('albums')}
              className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-100 transition space-y-1.5"
            >
              <img
                src={alb.coverUrl}
                alt={alb.name}
                className="w-full h-20 rounded-xl object-cover shadow-sm"
              />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{alb.name}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {alb.itemCount} Item • {alb.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
