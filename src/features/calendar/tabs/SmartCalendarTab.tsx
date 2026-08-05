import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Bell,
  Gift,
  Plus,
  Filter,
  ListFilter,
  Grid,
  Sparkles,
} from 'lucide-react';
import { useCalendarStore } from '../../../stores/useCalendarStore';

interface SmartCalendarTabProps {
  onOpenModal: (type: 'event' | 'reminder') => void;
}

export const SmartCalendarTab: React.FC<SmartCalendarTabProps> = ({ onOpenModal }) => {
  const {
    events,
    reminders,
    birthdays,
    holidays,
    toggleEventCompleted,
  } = useCalendarStore();

  const [viewMode, setViewMode] = useState<'Agenda' | 'Daily' | 'Weekly' | 'Monthly' | 'Timeline'>('Agenda');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  const categoryColors: Record<string, string> = {
    Keluarga: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    Sekolah: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Pekerjaan: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    Kesehatan: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Keuangan: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    Liburan: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  };

  const filteredEvents = events.filter((evt) =>
    selectedCategoryFilter === 'All' ? true : evt.category === selectedCategoryFilter
  );

  return (
    <div className="space-y-6 pb-8">
      {/* View Switcher & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-1 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
          {(['Agenda', 'Daily', 'Weekly', 'Monthly', 'Timeline'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                viewMode === mode
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenModal('reminder')}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
          >
            <Bell className="w-4 h-4 text-rose-500" />
            <span>+ Pengingat</span>
          </button>

          <button
            onClick={() => onOpenModal('event')}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-indigo-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>+ Agenda Baru</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Kategori:</span>
        </span>
        {['All', 'Keluarga', 'Sekolah', 'Pekerjaan', 'Kesehatan', 'Keuangan', 'Liburan'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategoryFilter(cat)}
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition shrink-0 ${
              selectedCategoryFilter === cat
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            {cat === 'All' ? 'Semua Agenda' : cat}
          </button>
        ))}
      </div>

      {/* Events View Display */}
      {viewMode === 'Agenda' || viewMode === 'Daily' ? (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-indigo-500" />
            <span>Daftar Agenda Keluarga ({filteredEvents.length})</span>
          </h3>

          {filteredEvents.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
              Belum ada agenda untuk kategori ini.
            </div>
          ) : (
            filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border transition shadow-sm ${
                  evt.isCompleted
                    ? 'border-slate-200 dark:border-slate-800 opacity-60'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                          categoryColors[evt.category] || 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {evt.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{evt.date}</span>
                    </div>

                    <h4
                      className={`text-sm font-bold ${
                        evt.isCompleted ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {evt.title}
                    </h4>

                    {evt.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">{evt.description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{evt.time} WIB</span>
                      </span>

                      {evt.location && (
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span>{evt.location}</span>
                        </span>
                      )}

                      <span className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                        <span>{evt.participants.join(', ')}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleEventCompleted(evt.id)}
                    className="p-1.5 text-slate-400 hover:text-emerald-500 transition"
                  >
                    <CheckCircle2
                      className={`w-6 h-6 ${evt.isCompleted ? 'text-emerald-500 fill-emerald-100' : ''}`}
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs font-semibold text-slate-500">
            Tampilan [{viewMode}] Aktif. Menampilkan {filteredEvents.length} agenda keluarga dalam kalender interaktif.
          </p>
          <div className="grid grid-cols-7 gap-2 mt-4 text-xs font-bold text-slate-400 border-b pb-2">
            <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Ming</span>
          </div>
          <div className="grid grid-cols-7 gap-2 mt-2">
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                className={`p-2 rounded-xl text-xs text-center border ${
                  i === 8 ? 'bg-indigo-600 text-white font-bold border-indigo-600' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{i + 1}</span>
                {i === 8 && <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mx-auto mt-1" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Birthday Manager & Reminders Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Birthdays */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 mb-3">
            <Gift className="w-5 h-5" />
            <h4 className="font-bold text-sm">Pengingat Ulang Tahun Anggota</h4>
          </div>

          <div className="space-y-3">
            {birthdays.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-start justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">{b.memberName} ({b.relation})</h5>
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                    Tanggal: {b.birthDate}
                  </p>
                  {b.giftIdea && (
                    <p className="text-[11px] text-slate-500 mt-1">Ide Hadiah: {b.giftIdea}</p>
                  )}
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                  H-{b.reminderDaysBefore}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* National Holidays */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 mb-3">
            <Sparkles className="w-5 h-5" />
            <h4 className="font-bold text-sm">Hari Libur Nasional & Keagamaan</h4>
          </div>

          <div className="space-y-3">
            {holidays.map((h) => (
              <div
                key={h.id}
                className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">{h.title}</h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                    {h.category}
                  </span>
                </div>
                <p className="text-[11px] text-purple-600 dark:text-purple-300 font-semibold mt-1">
                  {h.date} - {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
