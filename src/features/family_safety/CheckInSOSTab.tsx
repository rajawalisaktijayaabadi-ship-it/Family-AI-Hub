import React from 'react';
import { useFamilySafetyStore } from '../../stores/useFamilySafetyStore';
import { MapPin, AlertTriangle, Clock, UserCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface CheckInSOSTabProps {
  onOpenCheckIn: () => void;
  onOpenSOS: () => void;
}

export const CheckInSOSTab: React.FC<CheckInSOSTabProps> = ({ onOpenCheckIn, onOpenSOS }) => {
  const { checkIns, sosAlerts } = useFamilySafetyStore();

  return (
    <div className="space-y-4">
      {/* Action Banner */}
      <div className="rounded-3xl bg-slate-900 p-4 text-white shadow-xl space-y-3 border border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <UserCheck className="h-4 w-4 text-teal-400" /> Pusat Check-In & Sinyal Darurat
          </h4>
          <span className="text-[10px] text-teal-400 font-black">AI Safe Check Engine</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onOpenCheckIn}
            className="rounded-2xl bg-teal-600 py-2.5 text-xs font-bold text-white shadow hover:bg-teal-500"
          >
            + Check-In Baru
          </button>
          <button
            onClick={onOpenSOS}
            className="rounded-2xl bg-rose-600 py-2.5 text-xs font-bold text-white shadow hover:bg-rose-500 animate-pulse"
          >
            ! Pancarkan SOS
          </button>
        </div>
      </div>

      {/* SOS History */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Riwayat Sinyal Darurat SOS
        </h4>
        {sosAlerts.map((sos) => (
          <div
            key={sos.id}
            className={`rounded-2xl p-3.5 border ${
              sos.status === 'Active'
                ? 'bg-rose-50 border-rose-300 text-rose-900'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-rose-600" />
                <span className="text-xs font-bold">{sos.senderName}</span>
              </div>
              <span
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                  sos.status === 'Active'
                    ? 'bg-rose-600 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {sos.status}
              </span>
            </div>
            <p className="text-xs mt-1 text-slate-600">{sos.notes}</p>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1 border-t border-slate-100">
              <span>{sos.locationAddress}</span>
              <span>{sos.triggerTime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Check-In Feed */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Feed Check-In Anggota Keluarga
        </h4>
        <div className="space-y-2.5">
          {checkIns.map((chk) => (
            <div
              key={chk.id}
              className="rounded-2xl bg-white p-3.5 shadow-sm border border-slate-200 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{chk.memberName}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{chk.timestamp}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-teal-700 font-medium">
                <MapPin className="h-3.5 w-3.5" />
                <span>{chk.locationName}</span>
              </div>
              <p className="text-xs text-slate-600 pt-1 border-t border-slate-100">
                "{chk.statusMessage}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
