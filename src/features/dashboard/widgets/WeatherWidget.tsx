import React from 'react';
import { CloudSun, MapPin, Droplets, Wind } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  return (
    <div className="p-4 rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-lg relative overflow-hidden flex flex-col justify-between h-full min-h-[140px]">
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5 text-xs text-sky-100 font-bold">
          <MapPin className="w-3.5 h-3.5 text-sky-200" />
          <span>Jakarta, Indonesia</span>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-extrabold bg-white/20 backdrop-blur-md rounded-full">
          Live Weather
        </span>
      </div>

      <div className="flex items-center justify-between my-2 relative z-10">
        <div>
          <span className="text-3xl font-extrabold tracking-tight">29°C</span>
          <p className="text-xs text-sky-100 font-semibold">Cerah Berawan</p>
        </div>
        <CloudSun className="w-12 h-12 text-amber-300 drop-shadow-md" />
      </div>

      <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-sky-100 relative z-10 font-medium">
        <div className="flex items-center gap-1">
          <Droplets className="w-3.5 h-3.5 text-sky-200" />
          <span>Kelembapan: 68%</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind className="w-3.5 h-3.5 text-sky-200" />
          <span>Angin: 12 km/jam</span>
        </div>
      </div>
    </div>
  );
};
