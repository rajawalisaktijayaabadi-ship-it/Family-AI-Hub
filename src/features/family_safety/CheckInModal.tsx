import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { useFamilySafetyStore } from '../../stores/useFamilySafetyStore';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({ isOpen, onClose }) => {
  const { sendCheckIn, locations } = useFamilySafetyStore();

  const [memberName, setMemberName] = useState(locations[0]?.memberName || 'Hendra Wijaya');
  const [locationName, setLocationName] = useState('Rumah Utama - Kebayoran Baru');
  const [statusMessage, setStatusMessage] = useState('Sudah tiba dengan selamat dan dalam kondisi aman.');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendCheckIn(memberName, locationName, statusMessage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl space-y-4 animate-scale-up">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-teal-700">
            <MapPin className="h-5 w-5" />
            <h3 className="text-sm font-bold text-slate-900">Check-In Lokasi Saya</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Anggota Keluarga</label>
            <select
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
            >
              {locations.map((m) => (
                <option key={m.id} value={m.memberName}>
                  {m.memberName} ({m.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Nama Lokasi Terkini</label>
            <input
              type="text"
              required
              placeholder="Contoh: Sekolah SD Al-Azhar, Cafe Senopati"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Pesan Status / Catatan</label>
            <textarea
              rows={3}
              required
              placeholder="Contoh: Tiba aman, siap belajar!"
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md hover:bg-teal-700"
          >
            Kirim Check-In
          </button>
        </form>
      </div>
    </div>
  );
};
