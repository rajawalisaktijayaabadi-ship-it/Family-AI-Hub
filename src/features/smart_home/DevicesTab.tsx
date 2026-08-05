import React from 'react';
import { useSmartHomeStore } from '../../stores/useSmartHomeStore';
import {
  Lightbulb,
  Fan,
  Lock,
  Video,
  Tv,
  Volume2,
  Wind,
  Power,
  Plus,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { DeviceType } from '../../types/smart_home';

interface DevicesTabProps {
  onOpenAddDevice: () => void;
}

export const DevicesTab: React.FC<DevicesTabProps> = ({ onOpenAddDevice }) => {
  const { devices, toggleDevice, updateDeviceValue, rooms, selectedRoomFilter, setSelectedRoomFilter, insights } =
    useSmartHomeStore();

  const filteredDevices =
    selectedRoomFilter === 'All'
      ? devices
      : devices.filter((d) => d.room === selectedRoomFilter);

  const getDeviceIcon = (type: DeviceType, isOn: boolean) => {
    const iconClass = `h-5 w-5 ${isOn ? 'text-amber-500' : 'text-slate-400'}`;
    switch (type) {
      case 'Light':
        return <Lightbulb className={iconClass} />;
      case 'AC':
        return <Wind className={`h-5 w-5 ${isOn ? 'text-blue-500' : 'text-slate-400'}`} />;
      case 'DoorLock':
        return <Lock className={`h-5 w-5 ${isOn ? 'text-emerald-500' : 'text-slate-400'}`} />;
      case 'Camera':
        return <Video className={`h-5 w-5 ${isOn ? 'text-rose-500' : 'text-slate-400'}`} />;
      case 'TV':
        return <Tv className={iconClass} />;
      case 'Speaker':
        return <Volume2 className={iconClass} />;
      case 'AirPurifier':
        return <Fan className={`h-5 w-5 ${isOn ? 'text-teal-500' : 'text-slate-400'}`} />;
      default:
        return <Power className={iconClass} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* AI Home Insight Banner */}
      {insights.length > 0 && (
        <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 p-4 text-white shadow-xl border border-teal-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
              AI Smart Home Recommendation
            </span>
          </div>
          <h4 className="text-sm font-bold">{insights[0].title}</h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{insights[0].description}</p>
          <button className="mt-3 rounded-xl bg-emerald-500 px-3.5 py-1.5 text-[11px] font-extrabold text-slate-950 shadow hover:bg-emerald-400">
            {insights[0].actionLabel}
          </button>
        </div>
      )}

      {/* Room Filter Pills & Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-[280px]">
          <button
            onClick={() => setSelectedRoomFilter('All')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition ${
              selectedRoomFilter === 'All'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Semua ({devices.length})
          </button>
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoomFilter(room.name)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition ${
                selectedRoomFilter === room.name
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenAddDevice}
          className="flex items-center gap-1 rounded-2xl bg-teal-600 px-3 py-1.5 text-xs font-bold text-white shadow-md hover:bg-teal-700"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah</span>
        </button>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className={`relative rounded-3xl p-4 transition-all border shadow-sm ${
              device.isOn
                ? 'bg-white border-teal-500/40 shadow-teal-500/5'
                : 'bg-slate-50/80 border-slate-200 opacity-80'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-2xl ${device.isOn ? 'bg-slate-100' : 'bg-slate-200/60'}`}>
                {getDeviceIcon(device.type, device.isOn)}
              </div>
              <button
                onClick={() => toggleDevice(device.id)}
                className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                  device.isOn
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-2 ring-teal-300'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                <Power className="h-4 w-4" />
              </button>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{device.name}</h5>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5">{device.room}</p>
            </div>

            {/* Slider / Value Adjuster if applicable */}
            {device.isOn && device.value !== undefined && (
              <div className="mt-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-1">
                  <span>
                    {device.type === 'AC' ? 'Suhu AC' : device.type === 'Light' ? 'Kecerahan' : 'Level'}
                  </span>
                  <span className="text-teal-700 font-extrabold">
                    {device.value}
                    {device.unit || ''}
                  </span>
                </div>
                <input
                  type="range"
                  min={device.type === 'AC' ? 16 : 0}
                  max={device.type === 'AC' ? 30 : 100}
                  value={device.value}
                  onChange={(e) => updateDeviceValue(device.id, Number(e.target.value))}
                  className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[9px] text-slate-400">
              <span>{device.powerWatt} Watt</span>
              <span className="truncate max-w-[80px]">{device.brand || 'Smart IoT'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
