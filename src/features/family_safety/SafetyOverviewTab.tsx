import React from 'react';
import { useFamilySafetyStore } from '../../stores/useFamilySafetyStore';
import { ShieldCheck, MapPin, Battery, Wifi, AlertTriangle, Sparkles, Navigation } from 'lucide-react';

interface SafetyOverviewTabProps {
  onOpenCheckIn: () => void;
  onOpenSOS: () => void;
}

export const SafetyOverviewTab: React.FC<SafetyOverviewTabProps> = ({
  onOpenCheckIn,
  onOpenSOS,
}) => {
  const { locations, recommendations, sosAlerts } = useFamilySafetyStore();

  const activeSOSCount = sosAlerts.filter((s) => s.status === 'Active').length;

  return (
    <div className="space-y-4">
      {/* Quick Action Buttons Header */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenCheckIn}
          className="flex items-center justify-center gap-2 rounded-2xl bg-teal-600 p-3.5 text-xs font-bold text-white shadow-md hover:bg-teal-700 transition"
        >
          <MapPin className="h-4 w-4" />
          <span>Check-In Lokasi Saya</span>
        </button>

        <button
          onClick={onOpenSOS}
          className="flex items-center justify-center gap-2 rounded-2xl bg-rose-600 p-3.5 text-xs font-bold text-white shadow-md hover:bg-rose-700 animate-pulse transition"
        >
          <AlertTriangle className="h-4 w-4" />
          <span>PANIC BUTTON (SOS)</span>
        </button>
      </div>

      {/* SOS Active Alert Banner */}
      {activeSOSCount > 0 && (
        <div className="rounded-3xl bg-rose-950 border border-rose-500/50 p-4 text-white shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-black text-rose-400 uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4 text-rose-500 animate-ping" /> Alert SOS Aktif!
            </span>
            <span className="text-[10px] bg-rose-600 px-2 py-0.5 rounded-full font-bold">
              {activeSOSCount} Sinyal
            </span>
          </div>
          <p className="text-xs text-rose-200">
            {sosAlerts[0].senderName}: {sosAlerts[0].notes}
          </p>
        </div>
      )}

      {/* Simulated Live GPS Map Visualizer Card */}
      <div className="rounded-3xl bg-slate-900 p-4 text-white shadow-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-teal-400" />
            <h4 className="text-xs font-bold text-white">Live GPS Location Tracking</h4>
          </div>
          <span className="text-[10px] text-emerald-400 font-extrabold flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> Real-time Simulation
          </span>
        </div>

        {/* Map Placeholder Canvas Design */}
        <div className="relative h-40 w-full rounded-2xl bg-slate-800/90 border border-slate-700 overflow-hidden flex items-center justify-center p-3">
          {/* Grid lines background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

          <div className="relative z-10 w-full grid grid-cols-2 gap-2">
            {locations.map((mem) => (
              <div
                key={mem.id}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-sm space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-white truncate max-w-[100px]">
                    {mem.memberName.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-extrabold text-teal-400 bg-teal-950 px-1.5 py-0.5 rounded">
                    {mem.currentStatus}
                  </span>
                </div>
                <p className="text-[9px] text-slate-300 truncate">{mem.locationName}</p>
                <div className="flex items-center justify-between text-[8px] text-slate-400 pt-1 border-t border-slate-800">
                  <span className="flex items-center gap-0.5">
                    <Battery className="h-2.5 w-2.5 text-emerald-400" /> {mem.batteryLevel}%
                  </span>
                  <span>{mem.lastCheckIn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Safety Assistant Advice */}
      {recommendations.length > 0 && (
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-teal-700">
            <Sparkles className="h-4 w-4 text-teal-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Rekomendasi Keamanan AI
            </h4>
          </div>
          <h5 className="text-xs font-extrabold text-slate-900">{recommendations[0].title}</h5>
          <p className="text-xs text-slate-600 leading-relaxed">{recommendations[0].description}</p>
          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-xl">
              Aksi: {recommendations[0].suggestedAction}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
