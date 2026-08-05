import React from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { Map, MapPin, Compass, Navigation, Sun, Sparkles } from 'lucide-react';

export const MemoryMapTab: React.FC = () => {
  const { memories } = useMemoryStore();

  const vacationMemories = memories.filter(
    (m) => m.category === 'Vacation' || m.locationName?.toLowerCase().includes('bali')
  );

  return (
    <div className="space-y-4">
      {/* Map Interactive Simulation Container */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white min-h-[320px] shadow-lg flex flex-col justify-between p-4">
        {/* Mock Map Tiles Background Styling */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Floating Top Controls */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700">
            <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span className="text-xs font-black text-white">Peta Kenangan Wisata & Perjalanan</span>
          </div>

          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold border border-emerald-500/30">
            GPS Geotag Active
          </span>
        </div>

        {/* Map Pins Simulation */}
        <div className="relative z-10 my-8 space-y-4">
          <div className="p-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-amber-500/40 max-w-xs mx-auto shadow-xl space-y-1 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-black">
              <MapPin className="w-4 h-4" />
              <span>Pantai Kuta, Bali</span>
            </div>
            <p className="text-[10px] text-slate-300">
              5 Kenangan Foto & Video • Liburan Musim Panas 2026
            </p>
          </div>

          <div className="flex justify-around text-center text-[10px]">
            <div className="p-2 bg-slate-800/80 rounded-xl border border-slate-700 space-y-0.5">
              <p className="font-extrabold text-amber-300">Jakarta Pusat</p>
              <p className="text-slate-400">28 Kenangan</p>
            </div>
            <div className="p-2 bg-slate-800/80 rounded-xl border border-slate-700 space-y-0.5">
              <p className="font-extrabold text-amber-300">Yogyakarta</p>
              <p className="text-slate-400">12 Kenangan</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-[10px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
          <span>Total Pin Lokasi: 8 Destinasi</span>
          <span>OpenStreetMap Geotag Engine</span>
        </div>
      </div>

      {/* Travel Memories List */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Map className="w-4 h-4 text-amber-600" />
          <span>Daftar Kenangan Perjalanan Terkait ({vacationMemories.length})</span>
        </h4>

        <div className="space-y-2">
          {vacationMemories.map((m) => (
            <div
              key={m.id}
              className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={m.coverUrl}
                  alt={m.title}
                  className="w-12 h-12 rounded-xl object-cover shadow-sm"
                />
                <div>
                  <h5 className="text-xs font-black text-slate-900 dark:text-white">{m.title}</h5>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {m.locationName}
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-extrabold bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full">
                {m.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
