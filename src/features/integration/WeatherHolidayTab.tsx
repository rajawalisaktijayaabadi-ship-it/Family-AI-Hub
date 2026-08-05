import React, { useEffect, useState } from 'react';
import { useIntegrationStore } from '../../stores/useIntegrationStore';
import {
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  Sun,
  Calendar,
  Sparkles,
  MapPin,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

export const WeatherHolidayTab: React.FC = () => {
  const { weather, fetchWeather, holidays } = useIntegrationStore();
  const [selectedCity, setSelectedCity] = useState('Jakarta Selatan');

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity, fetchWeather]);

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* City Weather Card */}
      <div className="p-4 bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white rounded-3xl space-y-3 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-sky-100 font-extrabold text-[11px]">
            <MapPin className="w-3.5 h-3.5" /> BMKG Open Data • {weather?.province || 'Indonesia'}
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl text-[10px] font-bold focus:outline-hidden"
          >
            <option value="Jakarta Selatan" className="text-slate-900">
              Jakarta Selatan
            </option>
            <option value="Bandung" className="text-slate-900">
              Bandung
            </option>
            <option value="Surabaya" className="text-slate-900">
              Surabaya
            </option>
            <option value="Yogyakarta" className="text-slate-900">
              Yogyakarta
            </option>
            <option value="Medan" className="text-slate-900">
              Medan
            </option>
          </select>
        </div>

        {weather && (
          <div className="flex justify-between items-center pt-1">
            <div>
              <span className="text-3xl font-black block">{weather.temperatureC}°C</span>
              <span className="text-xs font-bold text-sky-100">{weather.condition}</span>
            </div>

            <CloudSun className="w-12 h-12 text-amber-200" />
          </div>
        )}

        {/* Environmental Metrics (Humidity, UV Index, AQI) */}
        {weather && (
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px]">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 space-y-0.5">
              <span className="text-sky-200 block">Kelembapan</span>
              <span className="font-extrabold text-white text-xs">{weather.humidity}%</span>
            </div>

            <div className="p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 space-y-0.5">
              <span className="text-sky-200 block">Indeks UV</span>
              <span className="font-extrabold text-amber-300 text-xs">UV {weather.uvIndex}</span>
            </div>

            <div className="p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 space-y-0.5">
              <span className="text-sky-200 block">Polusi AQI</span>
              <span className="font-extrabold text-emerald-300 text-xs">{weather.airQualityAQI} (Baik)</span>
            </div>
          </div>
        )}
      </div>

      {/* 7-Days Forecast */}
      {weather?.forecast7Days && (
        <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-2.5">
          <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <CloudRain className="w-4 h-4 text-sky-500" /> Prakiraan Cuaca 7 Hari BMKG
          </h4>

          <div className="grid grid-cols-7 gap-1 text-center text-[9px]">
            {weather.forecast7Days.map((f, idx) => (
              <div
                key={idx}
                className="p-1.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 font-bold"
              >
                <span className="text-slate-500 block">{f.day}</span>
                <span className="text-slate-900 dark:text-white block text-[10px]">{f.tempHigh}°</span>
                <span className="text-slate-400 block text-[8px]">{f.tempLow}°</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Indonesia National Holidays & Cuti Bersama */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-rose-500" /> Hari Libur Nasional & Cuti Bersama Indonesia
        </h4>

        <div className="space-y-2">
          {holidays.map((h, i) => (
            <div
              key={i}
              className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center"
            >
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white text-xs block">
                  {h.name}
                </span>
                <span className="text-[9px] text-slate-500">{h.description}</span>
              </div>

              <div className="text-right shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold block mb-0.5 ${
                    h.type === 'Hari Libur Nasional'
                      ? 'bg-rose-500/10 text-rose-600'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}
                >
                  {h.type}
                </span>
                <span className="text-[9px] font-mono font-bold text-slate-600 dark:text-slate-300">
                  {h.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
