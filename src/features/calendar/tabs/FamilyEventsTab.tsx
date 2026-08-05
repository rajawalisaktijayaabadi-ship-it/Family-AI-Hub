import React from 'react';
import { Users, Plus, Calendar, MapPin, DollarSign, Sparkles } from 'lucide-react';
import { useCalendarStore } from '../../../stores/useCalendarStore';

interface FamilyEventsTabProps {
  onOpenModal: (type: 'familyEvent') => void;
}

export const FamilyEventsTab: React.FC<FamilyEventsTabProps> = ({ onOpenModal }) => {
  const { familyEvents } = useCalendarStore();

  const categoryBadgeColors: Record<string, string> = {
    Vacation: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    'Family Gathering': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    Meeting: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    'School Event': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    'Religious Event': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header & Add Button */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-500" />
            <span>Family Event Center</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola acara besar keluarga, liburan, rapat rutin, dan syukuran bersama.
          </p>
        </div>

        <button
          onClick={() => onOpenModal('familyEvent')}
          className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-purple-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Family Event</span>
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {familyEvents.map((fe) => (
          <div
            key={fe.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                    categoryBadgeColors[fe.category] || 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {fe.category}
                </span>

                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                  {fe.title}
                </h4>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400">Estimasi Biaya:</span>
                <p className="text-sm font-extrabold text-purple-600 dark:text-purple-400">
                  Rp {fe.budgetEstimate.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {fe.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>{fe.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{fe.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                <span>{fe.participantsCount} Peserta</span>
              </div>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>Panitia: {fe.organizer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
