import React from 'react';
import { useSmartHomeStore } from '../../stores/useSmartHomeStore';
import { Thermometer, Droplets, Users, Cpu, ShieldAlert } from 'lucide-react';

export const RoomsTab: React.FC = () => {
  const { rooms, setSelectedRoomFilter } = useSmartHomeStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Denah Ruangan & Sensor IoT
        </h3>
        <span className="text-[10px] text-slate-500 font-semibold">{rooms.length} Ruangan Terdaftar</span>
      </div>

      <div className="space-y-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200/80 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">{room.name}</h4>
                <p className="text-xs text-slate-500">{room.deviceCount} Perangkat Terhubung</p>
              </div>
              <button
                onClick={() => setSelectedRoomFilter(room.name)}
                className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
              >
                Lihat Perangkat
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 bg-slate-50 rounded-2xl p-2.5">
                <Thermometer className="h-4 w-4 text-rose-500" />
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Suhu</p>
                  <p className="font-black text-slate-800">{room.temperature ? `${room.temperature}°C` : '-'}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 rounded-2xl p-2.5">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Kelembaban</p>
                  <p className="font-black text-slate-800">{room.humidity ? `${room.humidity}%` : '-'}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 rounded-2xl p-2.5">
                <Users className={`h-4 w-4 ${room.isOccupied ? 'text-emerald-500' : 'text-slate-400'}`} />
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Gerakan</p>
                  <p className={`font-black ${room.isOccupied ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {room.isOccupied ? 'Ada Orang' : 'Kosong'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
