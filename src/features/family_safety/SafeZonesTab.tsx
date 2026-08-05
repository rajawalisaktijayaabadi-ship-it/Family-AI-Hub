import React from 'react';
import { useFamilySafetyStore } from '../../stores/useFamilySafetyStore';
import { MapPin, ShieldCheck, Bell, Building, Home, GraduationCap, Heart } from 'lucide-react';

export const SafeZonesTab: React.FC = () => {
  const { safeZones } = useFamilySafetyStore();

  const getZoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="h-5 w-5 text-emerald-600" />;
      case 'GraduationCap':
        return <GraduationCap className="h-5 w-5 text-blue-600" />;
      case 'Building':
        return <Building className="h-5 w-5 text-purple-600" />;
      case 'Heart':
        return <Heart className="h-5 w-5 text-amber-600" />;
      default:
        return <MapPin className="h-5 w-5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Zona Aman & Geofencing (Safe Zones)
        </h3>
        <span className="text-[10px] text-slate-500 font-semibold">{safeZones.length} Zona Terdaftar</span>
      </div>

      <div className="space-y-3">
        {safeZones.map((zone) => (
          <div
            key={zone.id}
            className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200/80 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-100">{getZoneIcon(zone.icon)}</div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{zone.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{zone.address}</p>
                </div>
              </div>
              <span className="rounded-full bg-teal-100 px-2.5 py-1 text-[10px] font-extrabold text-teal-800">
                Radius {zone.radiusMeters}m
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Bell className="h-3.5 w-3.5 text-teal-600" />
                <span>Notif Masuk: {zone.notifyOnEnter ? 'Aktif' : 'Nonaktif'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                <span>Notif Keluar: {zone.notifyOnExit ? 'Aktif' : 'Nonaktif'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
