import React, { useState } from 'react';
import { useIntegrationStore } from '../../stores/useIntegrationStore';
import {
  MapPin,
  ShieldCheck,
  Battery,
  Navigation,
  Globe,
  Layers,
  Search,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { GoogleMapsAdapter, OpenStreetMapAdapter } from '../../services/integration/MapAdapter';

export const MapLocationHubTab: React.FC = () => {
  const { familyLocations, selectedMapProvider, setMapProvider } = useIntegrationStore();
  const [activeMemberId, setActiveMemberId] = useState<string>(familyLocations[0]?.id || '');

  const activeMember = familyLocations.find((m) => m.id === activeMemberId) || familyLocations[0];

  const mapAdapter =
    selectedMapProvider === 'google_maps' ? new GoogleMapsAdapter() : new OpenStreetMapAdapter();

  const embedMapUrl = mapAdapter.getEmbedUrl({
    latitude: activeMember ? activeMember.latitude : -6.2088,
    longitude: activeMember ? activeMember.longitude : 106.8456,
  });

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* Provider Selector Banner */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Live Location & Safe Zone Geofence
              </h3>
              <p className="text-[10px] text-slate-500">
                Lacak lokasi real-time anggota keluarga & area aman sekolah/rumah
              </p>
            </div>
          </div>
        </div>

        {/* Map Adapter Toggle Switch */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-[11px] font-bold">
          <button
            onClick={() => setMapProvider('openstreetmap')}
            className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              selectedMapProvider === 'openstreetmap'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> OpenStreetMap (Free)
          </button>

          <button
            onClick={() => setMapProvider('google_maps')}
            className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              selectedMapProvider === 'google_maps'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Google Maps API
          </button>
        </div>
      </div>

      {/* Embedded Map Display */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 h-56 bg-slate-200 shadow-inner">
        <iframe
          src={embedMapUrl}
          className="w-full h-full border-0"
          title="Family Member GPS Location"
          loading="lazy"
        />

        {/* Safe Zone Geofence Overlay Badge */}
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-[10px] font-extrabold text-emerald-600 flex items-center gap-1.5 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Safe Zone Active (Radius 500m)
        </div>
      </div>

      {/* Family Members Location Cards */}
      <div className="space-y-2">
        <span className="font-extrabold text-slate-800 dark:text-slate-200 block px-1">
          Anggota Keluarga Terhubung GPS ({familyLocations.length})
        </span>

        {familyLocations.map((member) => (
          <div
            key={member.id}
            onClick={() => setActiveMemberId(member.id)}
            className={`p-3.5 rounded-2xl border transition cursor-pointer space-y-2 ${
              member.id === activeMember.id
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 dark:border-emerald-600 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 font-extrabold text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs">
                  {member.memberName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs flex items-center gap-1">
                    {member.memberName}
                    {member.isSafeZone && (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" title="In Safe Zone" />
                    )}
                  </h4>
                  <span className="text-[9px] text-slate-500 block">{member.role}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 justify-end">
                  <Battery className="w-3 h-3 text-emerald-500" /> {member.batteryLevel}%
                </span>
                <span className="text-[9px] text-slate-400 block">{member.lastUpdated}</span>
              </div>
            </div>

            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-[10px] text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between">
              <span className="truncate pr-2">📍 {member.address}</span>
              <button
                className="text-emerald-600 font-extrabold flex items-center gap-1 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${member.latitude},${member.longitude}`,
                    '_blank'
                  );
                }}
              >
                <Navigation className="w-3 h-3" /> Navigasi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
