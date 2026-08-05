import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { TrendingUp, Utensils, Calendar, ShoppingBag, PieChart as PieIcon } from 'lucide-react';
import { useCalendarStore } from '../../../stores/useCalendarStore';

export const CalendarAnalyticsTab: React.FC = () => {
  const { events, mealPlans, familyEvents, groceries } = useCalendarStore();

  const completedEvents = events.filter((e) => e.isCompleted).length;
  const pendingEvents = events.length - completedEvents;

  const eventCategoryData = [
    { name: 'Keluarga', value: events.filter((e) => e.category === 'Keluarga').length || 1 },
    { name: 'Kesehatan', value: events.filter((e) => e.category === 'Kesehatan').length || 1 },
    { name: 'Keuangan', value: events.filter((e) => e.category === 'Keuangan').length || 1 },
    { name: 'Sekolah', value: events.filter((e) => e.category === 'Sekolah').length || 1 },
  ];

  const mealCalorieData = [
    { day: 'Sen', calories: 1250 },
    { day: 'Sel', calories: 1380 },
    { day: 'Rab', calories: 1100 },
    { day: 'Kam', calories: 1420 },
    { day: 'Jum', calories: 1290 },
    { day: 'Sab', calories: 1550 },
    { day: 'Min', calories: 1400 },
  ];

  const shoppingBudgetData = [
    { month: 'Mei', budget: 1500000, actual: 1420000 },
    { month: 'Jun', budget: 1600000, actual: 1580000 },
    { month: 'Jul', budget: 1500000, actual: 1490000 },
    { month: 'Agu', budget: 1800000, actual: 1650000 },
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6 pb-8">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-semibold">Total Agenda</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{events.length}</p>
          <span className="text-[10px] text-emerald-500 font-bold">{completedEvents} Selesai</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 mb-1">
            <Utensils className="w-4 h-4" />
            <span className="text-xs font-semibold">Rencana Menu</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{mealPlans.length}</p>
          <span className="text-[10px] text-slate-400">Tergrafik Rapi</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold">Item Belanja</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{groceries.length}</p>
          <span className="text-[10px] text-amber-500 font-bold">
            {groceries.filter((g) => g.status === 'Belum Dibeli').length} Belum Dibeli
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-semibold">Family Events</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{familyEvents.length}</p>
          <span className="text-[10px] text-slate-400">Event Besar</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Meal Calorie Intake Trend */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center space-x-1.5">
            <Utensils className="w-4 h-4 text-emerald-500" />
            <span>Estimasi Asupan Kalori Harian (kcal)</span>
          </h4>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mealCalorieData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="calories" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Event Category Distribution */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center space-x-1.5">
            <PieIcon className="w-4 h-4 text-indigo-500" />
            <span>Distribusi Kategori Agenda Keluarga</span>
          </h4>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {eventCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend fontSize={11} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Shopping Budget vs Actual Spending */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center space-x-1.5">
            <ShoppingBag className="w-4 h-4 text-amber-500" />
            <span>Perbandingan Anggaran Belanja vs Realisasi (Rp)</span>
          </h4>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shoppingBudgetData}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" name="Anggaran Rencana" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                <Bar dataKey="actual" name="Realisasi Pengeluaran" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
