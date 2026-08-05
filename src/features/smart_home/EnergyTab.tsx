import React from 'react';
import { useSmartHomeStore } from '../../stores/useSmartHomeStore';
import { Zap, DollarSign, TrendingDown, Sparkles, Activity } from 'lucide-react';

export const EnergyTab: React.FC = () => {
  const { energyData } = useSmartHomeStore();

  if (!energyData) {
    return <div className="text-center py-8 text-xs text-slate-500">Memuat data konsumsi energi...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-wider opacity-90">Energi Hari Ini</span>
          </div>
          <p className="text-2xl font-black">{energyData.totalKwhToday} <span className="text-xs font-bold">kWh</span></p>
          <p className="text-[10px] opacity-80 mt-1">Sesuai target hemat energi keluarga</p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-wider opacity-90">Estimasi Biaya</span>
          </div>
          <p className="text-xl font-black">
            Rp {energyData.totalCostEstimate.toLocaleString('id-ID')}
          </p>
          <p className="text-[10px] opacity-80 mt-1">Tarif PLN Rp 1.444/kWh</p>
        </div>
      </div>

      {/* AI Energy Score Badge */}
      <div className="rounded-3xl bg-slate-900 p-4 text-white shadow-md flex items-center justify-between border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400 font-black text-lg border border-teal-500/40">
            {energyData.aiEfficiencyScore}
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Skor Efisiensi AI Smart Home
            </h4>
            <p className="text-[10px] text-slate-400 mt-0.5">88/100 (Kategori: Sangat Hemat)</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-extrabold text-emerald-400 border border-emerald-500/30">
          Optimal
        </span>
      </div>

      {/* Weekly Usage Chart Simulation */}
      <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-teal-600" /> Grafik Penggunaan Mingguan (kWh)
          </h4>
          <span className="text-[10px] text-slate-500 font-semibold">7 Hari Terakhir</span>
        </div>

        <div className="flex items-end justify-between h-28 pt-4 gap-1 px-1">
          {energyData.weeklyUsage.map((u, i) => {
            const heightPercent = Math.round((u.kwh / 25) * 100);
            return (
              <div key={i} className="flex flex-col items-center flex-1 gap-1">
                <span className="text-[9px] font-bold text-slate-600">{u.kwh}</span>
                <div className="w-full bg-slate-100 rounded-t-xl overflow-hidden flex items-end h-20">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-teal-600 rounded-t-xl transition-all hover:bg-teal-500"
                  />
                </div>
                <span className="text-[9px] text-slate-500 font-medium">{u.day.slice(0, 3)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Device Usage Breakdown */}
      <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200/80 space-y-3">
        <h4 className="text-xs font-bold text-slate-900">Konsumsi per Kategori Perangkat</h4>

        <div className="space-y-2.5">
          {energyData.deviceBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{item.name}</span>
                <span className="text-teal-700 font-bold">{item.kwh} kWh ({item.percentage}%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${item.percentage}%` }}
                  className="h-full bg-gradient-to-r from-teal-500 to-indigo-600 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
