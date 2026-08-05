import React, { useState } from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { Calendar, Clock, MapPin, Heart, Sparkles, Filter } from 'lucide-react';

export const MemoryTimelineTab: React.FC = () => {
  const { memories, selectedTimeframe, setSelectedTimeframe, toggleFavoriteMemory } = useMemoryStore();

  const [customDate, setCustomDate] = useState('');

  const filteredMemories = memories.filter((mem) => {
    if (selectedTimeframe === 'Today') {
      const todayStr = new Date().toISOString().slice(0, 10);
      return mem.date === todayStr;
    }
    if (selectedTimeframe === 'This Month') {
      const monthStr = new Date().toISOString().slice(0, 7);
      return mem.date.startsWith(monthStr);
    }
    if (selectedTimeframe === 'This Year') {
      const yearStr = new Date().toISOString().slice(0, 4);
      return mem.date.startsWith(yearStr);
    }
    if (customDate) {
      return mem.date === customDate;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Timeframe Filter Buttons */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'Today', 'This Month', 'This Year'].map((tf) => (
          <button
            key={tf}
            onClick={() => {
              setCustomDate('');
              setSelectedTimeframe(tf as any);
            }}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
              selectedTimeframe === tf && !customDate
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {tf === 'All'
              ? 'Semua Garis Waktu'
              : tf === 'Today'
              ? 'Hari Ini'
              : tf === 'This Month'
              ? 'Bulan Ini'
              : 'Tahun Ini'}
          </button>
        ))}

        <input
          type="date"
          value={customDate}
          onChange={(e) => setCustomDate(e.target.value)}
          className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
        />
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-amber-500/40 ml-4 pl-5 space-y-6">
        {filteredMemories.map((mem) => (
          <div key={mem.id} className="relative space-y-2 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-amber-600 ring-4 ring-slate-50 dark:ring-slate-900 flex items-center justify-center text-white">
              <Clock className="w-2.5 h-2.5" />
            </div>

            {/* Date Badge */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900">
                {mem.date} • {mem.time || '12:00 WIB'}
              </span>
              <span className="text-[10px] text-slate-400 font-bold">{mem.category}</span>
            </div>

            {/* Card Content */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              {mem.coverUrl && (
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
                  <img src={mem.coverUrl} alt={mem.title} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleFavoriteMemory(mem)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-slate-900/60 text-white hover:text-rose-400"
                  >
                    <Heart className={`w-4 h-4 ${mem.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-900 dark:text-white">{mem.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{mem.description}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {mem.locationName}
                  </span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Oleh: {mem.familyMemberName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
