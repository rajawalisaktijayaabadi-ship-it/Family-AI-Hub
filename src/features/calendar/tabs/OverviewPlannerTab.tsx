import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Sunset,
  Moon,
  Clock,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Utensils,
  Plus,
  Calendar as CalendarIcon,
  ShoppingBag,
} from 'lucide-react';
import { useCalendarStore } from '../../../stores/useCalendarStore';

interface OverviewPlannerTabProps {
  onOpenModal: (type: 'event' | 'meal' | 'grocery' | 'familyEvent' | 'reminder') => void;
}

export const OverviewPlannerTab: React.FC<OverviewPlannerTabProps> = ({ onOpenModal }) => {
  const {
    planners,
    aiInsight,
    inventory,
    events,
    mealPlans,
    togglePlannerActivity,
    addPlannerActivity,
  } = useCalendarStore();

  const [newActivity, setNewActivity] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<'Morning' | 'Afternoon' | 'Evening' | 'Night'>('Morning');

  const lowStockItems = inventory.filter((i) => i.quantity <= i.lowStockThreshold);

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.trim()) return;
    addPlannerActivity({
      date: new Date().toISOString().split('T')[0],
      timeSlot: selectedSlot,
      activityTitle: newActivity,
      isDone: false,
    });
    setNewActivity('');
  };

  const slotIcons = {
    Morning: <Sun className="w-5 h-5 text-amber-500" />,
    Afternoon: <Sun className="w-5 h-5 text-orange-500" />,
    Evening: <Sunset className="w-5 h-5 text-rose-500" />,
    Night: <Moon className="w-5 h-5 text-indigo-400" />,
  };

  const slotTitles = {
    Morning: 'Pagi Hari (06.00 - 12.00)',
    Afternoon: 'Siang Hari (12.00 - 17.00)',
    Evening: 'Sore Hari (17.00 - 20.00)',
    Night: 'Malam Hari (20.00 - 23.00)',
  };

  return (
    <div className="space-y-6 pb-8">
      {/* AI Daily Assistant Header Insight */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900 border border-indigo-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-start space-x-3 z-10 relative">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-base text-indigo-200">AI Daily Planner & Family Assistant</h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                Mock AI
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {aiInsight?.dailySummary || 'Menganalisis jadwal harian dan menu masakan keluarga...'}
            </p>
            {aiInsight?.motivationQuote && (
              <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs italic text-indigo-100">
                "{aiInsight.motivationQuote}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Low Stock Food Inventory Alert */}
      {lowStockItems.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300">
              Peringatan Stok Bahan Makanan Menipis ({lowStockItems.length} Item)
            </h4>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              {lowStockItems.map((i) => `${i.itemName} (sisa ${i.quantity} ${i.unit})`).join(', ')}
            </p>
          </div>
          <button
            onClick={() => onOpenModal('grocery')}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition shrink-0"
          >
            Belanja Sekarang
          </button>
        </div>
      )}

      {/* AI Recommendations Cards */}
      {aiInsight && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 mb-3">
              <Utensils className="w-5 h-5" />
              <h4 className="font-bold text-sm">Rekomendasi Menu Makanan AI</h4>
            </div>
            <ul className="space-y-2">
              {aiInsight.mealSuggestions.map((m, idx) => (
                <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 mb-3">
              <Clock className="w-5 h-5" />
              <h4 className="font-bold text-sm">Saran Jadwal Keseimbangan AI</h4>
            </div>
            <ul className="space-y-2">
              {aiInsight.scheduleSuggestions.map((s, idx) => (
                <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Quick Action Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onOpenModal('event')}
          className="p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 flex items-center justify-center space-x-2 text-xs font-bold transition"
        >
          <CalendarIcon className="w-4 h-4" />
          <span>+ Agenda Baru</span>
        </button>
        <button
          onClick={() => onOpenModal('meal')}
          className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center space-x-2 text-xs font-bold transition"
        >
          <Utensils className="w-4 h-4" />
          <span>+ Rencana Menu</span>
        </button>
        <button
          onClick={() => onOpenModal('grocery')}
          className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 flex items-center justify-center space-x-2 text-xs font-bold transition"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>+ Item Belanja</span>
        </button>
        <button
          onClick={() => onOpenModal('familyEvent')}
          className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center space-x-2 text-xs font-bold transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Event Utama</span>
        </button>
      </div>

      {/* Daily Planner Slots */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Jadwal Aktivitas Harian</h3>
          <span className="text-xs text-slate-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>

        {/* Add Quick Activity Form */}
        <form onSubmit={handleAddActivity} className="flex gap-2">
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="Morning">Pagi</option>
            <option value="Afternoon">Siang</option>
            <option value="Evening">Sore</option>
            <option value="Night">Malam</option>
          </select>
          <input
            type="text"
            placeholder="Tambah rutinitas harian..."
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
          >
            Tambah
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['Morning', 'Afternoon', 'Evening', 'Night'] as const).map((slot) => {
            const slotPlanners = planners.filter((p) => p.timeSlot === slot);
            return (
              <div
                key={slot}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                  {slotIcons[slot]}
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    {slotTitles[slot]}
                  </h4>
                </div>

                {slotPlanners.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">Belum ada rencana di sesi ini.</p>
                ) : (
                  <div className="space-y-2">
                    {slotPlanners.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => togglePlannerActivity(p.id)}
                        className={`flex items-center space-x-2.5 p-2 rounded-xl text-xs cursor-pointer transition ${
                          p.isDone
                            ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 line-through'
                            : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {p.isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span className="flex-1">{p.activityTitle}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
