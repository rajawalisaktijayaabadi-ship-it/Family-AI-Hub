import React, { useState } from 'react';
import { X, AlertTriangle, Siren, ShieldAlert } from 'lucide-react';
import { useFamilySafetyStore } from '../../stores/useFamilySafetyStore';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose }) => {
  const { triggerSOS, locations } = useFamilySafetyStore();

  const [senderName, setSenderName] = useState(locations[0]?.memberName || 'Hendra Wijaya');
  const [notes, setNotes] = useState('Butuh bantuan darurat! Mohon periksa lokasi saya segera.');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await triggerSOS(senderName, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-rose-500/50 p-6 shadow-2xl space-y-4 animate-scale-up text-white">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-rose-500">
            <Siren className="h-6 w-6 animate-pulse" />
            <h3 className="text-base font-black tracking-tight">PANIC BUTTON (SOS)</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-xs text-rose-200 leading-relaxed">
          <p className="font-bold flex items-center gap-1 text-rose-400 mb-1">
            <ShieldAlert className="h-4 w-4" /> PERINGATAN SOS DARURAT
          </p>
          Sinyal SOS akan dikirimkan ke seluruh HP anggota keluarga dan nomor darurat terdaftar
          berserta koordinat GPS live.
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Pengirim Sinyal SOS</label>
            <select
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-2.5 text-xs text-white"
            >
              {locations.map((m) => (
                <option key={m.id} value={m.memberName}>
                  {m.memberName} ({m.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Pesan Darurat Singkat</label>
            <textarea
              rows={2}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-2.5 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-rose-600 py-3.5 text-xs font-black text-white shadow-lg shadow-rose-600/40 hover:bg-rose-500 active:scale-95 transition"
          >
            PANCARKAN SINYAL SOS SEKARANG!
          </button>
        </form>
      </div>
    </div>
  );
};
