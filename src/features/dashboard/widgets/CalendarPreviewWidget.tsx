import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, ChevronRight, Plus } from 'lucide-react';

interface CalendarPreviewWidgetProps {
  onAddEventClick?: () => void;
}

export const CalendarPreviewWidget: React.FC<CalendarPreviewWidgetProps> = ({
  onAddEventClick,
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'tomorrow' | 'week'>('today');

  const events = {
    today: [
      { id: '1', title: 'Les Matematika Ahmad', time: '15:30 WIB', location: 'Bimbel RuangGuru' },
      { id: '2', title: 'Belanja Sembako Mingguan', time: '18:30 WIB', location: 'Supermarket lokal' },
    ],
    tomorrow: [
      { id: '3', title: 'Cek Tensi Kakek', time: '09:00 WIB', location: 'Klinik Sehat' },
      { id: '4', title: 'Makan Malam Keluarga', time: '19:00 WIB', location: 'Rumah Makan Padang' },
    ],
    week: [
      { id: '5', title: 'Arisan Keluarga Besar', time: 'Sabtu, 09:00 WIB', location: 'Rumah Ibu Siti' },
      { id: '6', title: 'Kerja Bakti Komplek', time: 'Minggu, 07:00 WIB', location: 'Lapangan RW' },
    ],
  };

  return (
    <div className="space-y-3">
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
            Pratinjau Kalender
          </span>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-[10px] font-bold">
          {(['today', 'tomorrow', 'week'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {tab === 'today' ? 'Hari Ini' : tab === 'tomorrow' ? 'Besok' : 'Minggu Ini'}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-2">
        {events[activeTab].map((evt) => (
          <div
            key={evt.id}
            className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs"
          >
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">{evt.title}</p>
              <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-500" /> {evt.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-indigo-500" /> {evt.location}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        ))}
      </div>

      {/* Add Schedule Trigger */}
      <button
        onClick={onAddEventClick}
        className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center gap-1.5 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Tambah Jadwal Baru
      </button>
    </div>
  );
};
