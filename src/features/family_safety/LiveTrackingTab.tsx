import React, { useState } from 'react';
import { useFamilyLocationStore } from '../../stores/useFamilyLocationStore';
import {
  MapPin,
  Clock,
  Battery,
  Wifi,
  Navigation,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Activity,
  History,
  ShieldAlert,
} from 'lucide-react';

export const LiveTrackingTab: React.FC = () => {
  const { liveLocations, locationHistory, activeSOS, triggerSOS, resolveSOS } = useFamilyLocationStore();
  const [selectedDateFilter, setSelectedDateFilter] = useState<'today' | 'yesterday' | '7days'>('today');
  const [searchMember, setSearchMember] = useState('');

  const filteredLocations = liveLocations.filter((m) =>
    m.memberName.toLowerCase().includes(searchMember.toLowerCase()) ||
    m.role.toLowerCase().includes(searchMember.toLowerCase()) ||
    m.address.toLowerCase().includes(searchMember.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Active SOS Emergency Banner if Active */}
      {activeSOS ? (
        <div className="bg-rose-600 text-white p-4 rounded-3xl shadow-lg border border-rose-700 animate-pulse space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-yellow-300" />
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider">🚨 SOS DARURAT AKTIF</h3>
                <p className="text-xs text-rose-100">Dikirim oleh: <strong>{activeSOS.senderName}</strong></p>
              </div>
            </div>
            <button
              onClick={resolveSOS}
              className="bg-white text-rose-700 text-xs font-black px-3 py-1.5 rounded-xl shadow hover:bg-rose-50 transition"
            >
              Selesaikan
            </button>
          </div>
          <p className="text-xs text-rose-100 bg-rose-700/60 p-2 rounded-xl border border-rose-500/50">
            📍 Lokasi: {activeSOS.address} ({activeSOS.timestamp})
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 rounded-3xl shadow-sm">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">Sistem SOS Siaga</span>
            <h3 className="text-sm font-black">Family Safety Tracking</h3>
            <p className="text-xs text-emerald-100">Pantau lokasi & keamanan seluruh keluarga secara real-time</p>
          </div>
          <button
            onClick={() => triggerSOS('Tombol darurat ditekan dari Family Tracking!')}
            className="bg-rose-600 hover:bg-rose-700 text-white font-black text-xs px-3.5 py-2 rounded-2xl shadow-md active:scale-95 transition flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>SOS</span>
          </button>
        </div>
      )}

      {/* Member Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari anggota (Bapak, Ibu, Rizky, Senopati...)"
          value={searchMember}
          onChange={(e) => setSearchMember(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
        />
      </div>

      {/* Live Member Status Cards */}
      <div className="space-y-2">
        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider px-1">
          Status Lokasi Anggota Keluarga ({filteredLocations.length})
        </h4>

        {filteredLocations.map((loc) => (
          <div key={loc.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${loc.avatarBg} text-white font-black text-xs shadow-sm`}>
                  {loc.memberName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-slate-900">{loc.memberName}</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                      {loc.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span>{loc.address}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  loc.isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {loc.isOnline ? 'Online' : 'Offline'}
                </span>
                <p className="text-[9px] text-slate-400 mt-1 font-mono">{loc.lastSeen}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[10px] text-center">
              <div className="bg-slate-50 p-1.5 rounded-xl">
                <span className="text-slate-400 font-bold block">Status Gerak</span>
                <span className="font-extrabold text-slate-800">{loc.movementStatus}</span>
              </div>

              <div className="bg-slate-50 p-1.5 rounded-xl">
                <span className="text-slate-400 font-bold block">Sisa Baterai</span>
                <span className="font-extrabold text-slate-800 flex items-center justify-center gap-1">
                  <Battery className="w-3 h-3 text-emerald-600" />
                  {loc.batteryLevel}%
                </span>
              </div>

              <div className="bg-slate-50 p-1.5 rounded-xl">
                <span className="text-slate-400 font-bold block">GEOFENCE</span>
                <span className="font-extrabold text-emerald-700 truncate block">
                  {loc.safeZoneName || 'Zona Aman'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Location History Timeline */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Riwayat & Timeline Perjalanan</h3>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['today', 'yesterday', '7days'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedDateFilter(filter)}
                className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg capitalize transition ${
                  selectedDateFilter === filter
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {filter === 'today' ? 'Hari Ini' : filter === 'yesterday' ? 'Kemarin' : '7 Hari'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {locationHistory.map((item, idx) => (
            <div key={item.id} className="relative pl-6 pb-3 border-l-2 border-emerald-200 last:border-0 last:pb-0">
              <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {item.timestamp}
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">
                  {item.memberName}
                </span>
              </div>

              <p className="text-xs font-extrabold text-slate-900 mt-1">{item.address}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Kecepatan: {item.speedKmH} km/h • Status: {item.movementStatus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
