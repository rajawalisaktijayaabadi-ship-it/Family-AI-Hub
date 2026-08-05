import React, { useState } from 'react';
import { X, Plus, Cpu } from 'lucide-react';
import { useSmartHomeStore } from '../../stores/useSmartHomeStore';
import { DeviceType } from '../../types/smart_home';

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ isOpen, onClose }) => {
  const { addDevice, rooms } = useSmartHomeStore();

  const [name, setName] = useState('');
  const [type, setType] = useState<DeviceType>('Light');
  const [room, setRoom] = useState(rooms[0]?.name || 'Ruang Tamu');
  const [brand, setBrand] = useState('Bardi / Tuya Smart');
  const [powerWatt, setPowerWatt] = useState(15);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addDevice({
      name,
      type,
      room,
      isOn: false,
      status: 'online',
      powerWatt: Number(powerWatt),
      lastActive: 'Baru saja ditambahkan',
      brand,
      value: type === 'AC' ? 24 : type === 'Light' ? 100 : undefined,
      unit: type === 'AC' ? '°C' : type === 'Light' ? '%' : undefined,
    });

    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl space-y-4 animate-scale-up">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-teal-700">
            <Cpu className="h-5 w-5" />
            <h3 className="text-sm font-bold text-slate-900">Tambah Perangkat IoT Baru</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Nama Perangkat</label>
            <input
              type="text"
              required
              placeholder="Contoh: Lampu Tidur Anak, AC Ruang Kerja"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tipe Perangkat</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as DeviceType)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
              >
                {[
                  'Light',
                  'AC',
                  'DoorLock',
                  'Camera',
                  'TV',
                  'Speaker',
                  'AirPurifier',
                  'Curtain',
                  'Sensor',
                  'Plug',
                ].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Ruangan</label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Merek / Protokol</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Daya (Watt)</label>
              <input
                type="number"
                value={powerWatt}
                onChange={(e) => setPowerWatt(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md hover:bg-teal-700"
          >
            Hubungkan ke IoT Mesh Hub
          </button>
        </form>
      </div>
    </div>
  );
};
