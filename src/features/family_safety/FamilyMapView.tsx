import React, { useState } from 'react';
import { useFamilyLocationStore } from '../../stores/useFamilyLocationStore';
import {
  MapPin,
  Navigation,
  Battery,
  ShieldCheck,
  RefreshCw,
  Sun,
  Moon,
  Layers,
  Compass,
  AlertTriangle,
  Radio,
  User,
  Zap,
} from 'lucide-react';
import { LiveLocationModel } from '../../types/family_location';

export const FamilyMapView: React.FC = () => {
  const {
    liveLocations,
    safeZones,
    selectedMemberId,
    setSelectedMemberId,
    mapStyle,
    setMapStyle,
    mapProvider,
    setMapProvider,
    simulateLocationMovement,
    myConsent,
    updateMyLocation,
  } = useFamilyLocationStore();

  const [activeZoom, setActiveZoom] = useState(14);
  const [isUpdatingGPS, setIsUpdatingGPS] = useState(false);

  const selectedMember = liveLocations.find((l) => l.id === selectedMemberId) || liveLocations[0];

  const handleSimulateUpdate = () => {
    setIsUpdatingGPS(true);
    simulateLocationMovement();
    setTimeout(() => {
      setIsUpdatingGPS(false);
    }, 600);
  };

  const handleManualGPSFix = () => {
    setIsUpdatingGPS(true);
    // Simulate updating user position near Jakarta pusat
    const randomLat = -6.2088 + (Math.random() - 0.5) * 0.01;
    const randomLng = 106.8456 + (Math.random() - 0.5) * 0.01;
    updateMyLocation(randomLat, randomLng, 'Posisi Terkini GPS (Manual Fix)');
    setTimeout(() => {
      setIsUpdatingGPS(false);
    }, 600);
  };

  const getMovementBadge = (status: LiveLocationModel['movementStatus']) => {
    switch (status) {
      case 'Driving':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">🚗 Menyetir</span>;
      case 'Walking':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">🚶 Jalan Kaki</span>;
      case 'Traveling':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">🚌 Perjalanan</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">📍 Diam</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Control Toolbar */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMapStyle(mapStyle === 'Light' ? 'Dark' : 'Light')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          >
            {mapStyle === 'Light' ? <Moon className="w-3.5 h-3.5 text-indigo-600" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            <span>Mode {mapStyle === 'Light' ? 'Gelap' : 'Terang'}</span>
          </button>

          <button
            onClick={() => setMapProvider(mapProvider === 'OpenStreetMap' ? 'GoogleMaps' : 'OpenStreetMap')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>{mapProvider}</span>
          </button>
        </div>

        <button
          onClick={handleSimulateUpdate}
          disabled={isUpdatingGPS}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold rounded-xl bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 active:scale-95 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isUpdatingGPS ? 'animate-spin' : ''}`} />
          <span>Simulasi GPS</span>
        </button>
      </div>

      {/* Interactive Map Canvas Container */}
      <div
        className={`relative w-full h-[360px] rounded-3xl overflow-hidden shadow-inner border transition-all ${
          mapStyle === 'Dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'
        }`}
      >
        {/* OpenStreetMap Tile Background Simulation */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              mapStyle === 'Dark'
                ? 'radial-gradient(#334155 1px, transparent 1px), radial-gradient(#1e293b 1px, #0f172a 1px)'
                : 'radial-gradient(#cbd5e1 1px, transparent 1px), radial-gradient(#f1f5f9 1px, #e2e8f0 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Vector Grid & Map Roads Simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path
            d="M -10,120 Q 150,80 300,180 T 500,240"
            fill="none"
            stroke={mapStyle === 'Dark' ? '#38bdf8' : '#0284c7'}
            strokeWidth="6"
            strokeDasharray="4 2"
          />
          <path
            d="M 120,-10 Q 180,180 220,400"
            fill="none"
            stroke={mapStyle === 'Dark' ? '#34d399' : '#059669'}
            strokeWidth="5"
          />
          <path
            d="M 50,280 Q 220,200 400,320"
            fill="none"
            stroke={mapStyle === 'Dark' ? '#f43f5e' : '#e11d48'}
            strokeWidth="4"
          />

          {/* Safe Zone Geofence Circles */}
          {safeZones.map((zone, idx) => {
            const cx = 100 + idx * 120;
            const cy = 120 + idx * 80;
            return (
              <g key={zone.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={zone.radiusMeters / 4}
                  fill={zone.color === 'emerald' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)'}
                  stroke={zone.color === 'emerald' ? '#10b981' : '#3b82f6'}
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                <text x={cx - 30} y={cy - (zone.radiusMeters / 4 + 6)} fontSize="10" fill={mapStyle === 'Dark' ? '#94a3b8' : '#475569'} fontWeight="bold">
                  🛡 {zone.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Family Member Markers on Map */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          {/* Top Status Banner */}
          <div className="flex items-center justify-between">
            <div className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-slate-700 shadow-md">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="font-bold">{liveLocations.length} Anggota Terhubung</span>
            </div>

            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xl shadow border border-slate-200 dark:border-slate-700">
              Provider: {mapProvider} ({activeZoom}x Zoom)
            </div>
          </div>

          {/* Map Marker Positions (Simulated Layout positions) */}
          <div className="relative w-full h-48 my-auto">
            {liveLocations.map((member, index) => {
              const isSelected = selectedMember?.id === member.id;
              // Simple relative positioning logic for map representation
              const positions = [
                { top: '25%', left: '30%' },
                { top: '60%', left: '65%' },
                { top: '40%', left: '75%' },
                { top: '70%', left: '25%' },
              ];
              const pos = positions[index % positions.length];

              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                >
                  {/* Accuracy Ring */}
                  <div
                    className={`absolute -inset-3 rounded-full animate-ping opacity-30 ${
                      member.role === 'Father'
                        ? 'bg-blue-500'
                        : member.role === 'Mother'
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                    }`}
                  />

                  {/* Marker Pin */}
                  <div
                    className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-2xl shadow-lg border-2 transition-all transform hover:scale-110 active:scale-95 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-amber-400 ring-4 ring-amber-400/30 scale-105'
                        : `${member.avatarBg} text-white border-white`
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-black whitespace-nowrap">
                      {member.memberName.split(' ')[0]}
                    </span>
                    <span className="text-[9px] bg-black/30 px-1 rounded font-mono">
                      {member.batteryLevel}%
                    </span>
                  </div>

                  {/* Small Tooltip popup */}
                  {isSelected && (
                    <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] p-2 rounded-xl shadow-xl w-36 text-center border border-slate-700 z-20 animate-in fade-in zoom-in-95">
                      <p className="font-extrabold truncate">{member.memberName}</p>
                      <p className="text-[9px] text-slate-300 truncate">{member.address}</p>
                      <div className="mt-1 flex justify-center">{getMovementBadge(member.movementStatus)}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Quick Controls & My Location Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleManualGPSFix}
              className="bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white text-xs font-bold px-3 py-2 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 hover:bg-slate-100 transition active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Lokasi Saya</span>
            </button>

            <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-800/90 p-1 rounded-2xl shadow border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveZoom((z) => Math.min(z + 1, 18))}
                className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white font-extrabold text-xs flex items-center justify-center hover:bg-slate-200"
              >
                +
              </button>
              <button
                onClick={() => setActiveZoom((z) => Math.max(z - 1, 10))}
                className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white font-extrabold text-xs flex items-center justify-center hover:bg-slate-200"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Member Detail Drawer Card */}
      {selectedMember && (
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${selectedMember.avatarBg} text-white font-black text-sm shadow-sm`}>
                {selectedMember.memberName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-slate-900">{selectedMember.memberName}</h4>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                    {selectedMember.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                  <span className="line-clamp-1">{selectedMember.address}</span>
                </p>
              </div>
            </div>

            {getMovementBadge(selectedMember.movementStatus)}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
            <div className="bg-slate-50 p-2 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Baterai HP</p>
              <p className="text-xs font-black text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                <Battery className="w-3.5 h-3.5 text-emerald-600" />
                <span>{selectedMember.batteryLevel}%</span>
              </p>
            </div>

            <div className="bg-slate-50 p-2 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Akurasi GPS</p>
              <p className="text-xs font-black text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>±{selectedMember.accuracyMeters}m</span>
              </p>
            </div>

            <div className="bg-slate-50 p-2 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Safe Zone</p>
              <p className="text-xs font-black text-slate-800 flex items-center justify-center gap-1 mt-0.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate">{selectedMember.safeZoneName || 'Luar Zone'}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
