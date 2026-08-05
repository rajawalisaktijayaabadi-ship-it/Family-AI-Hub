import React, { useEffect, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Utensils,
  ShoppingBag,
  Users,
  BarChart3,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react';
import { useCalendarStore } from '../../stores/useCalendarStore';
import { OverviewPlannerTab } from './tabs/OverviewPlannerTab';
import { SmartCalendarTab } from './tabs/SmartCalendarTab';
import { MealPlannerTab } from './tabs/MealPlannerTab';
import { GroceryInventoryTab } from './tabs/GroceryInventoryTab';
import { FamilyEventsTab } from './tabs/FamilyEventsTab';
import { CalendarAnalyticsTab } from './tabs/CalendarAnalyticsTab';
import { CalendarModals } from './modals/CalendarModals';

export const CalendarHomeScreen: React.FC = () => {
  const { fetchData, isLoading } = useCalendarStore();

  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Calendar' | 'Meal' | 'Grocery' | 'Events' | 'Analytics'
  >('Overview');

  const [activeModal, setActiveModal] = useState<
    'event' | 'meal' | 'grocery' | 'familyEvent' | 'reminder' | 'recipe' | null
  >(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = (
    type: 'event' | 'meal' | 'grocery' | 'familyEvent' | 'reminder' | 'recipe'
  ) => {
    setActiveModal(type);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Feature Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Smart Calendar & Family Planner
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-extrabold tracking-wider rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Fase 12
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Jadwal harian, AI Meal Planner, daftar belanja, stok kulkas, dan event keluarga terpadu.
              </p>
            </div>
          </div>

          {/* Tab Navigation Controls */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl overflow-x-auto shrink-0">
            {[
              { id: 'Overview', label: 'Ringkasan', icon: LayoutDashboard },
              { id: 'Calendar', label: 'Kalender', icon: CalendarIcon },
              { id: 'Meal', label: 'Meal AI', icon: Utensils },
              { id: 'Grocery', label: 'Belanja & Stok', icon: ShoppingBag },
              { id: 'Events', label: 'Event', icon: Users },
              { id: 'Analytics', label: 'Analistik', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Memuat data Smart Calendar & Family Planner...
          </div>
        ) : (
          <>
            {activeTab === 'Overview' && <OverviewPlannerTab onOpenModal={handleOpenModal} />}
            {activeTab === 'Calendar' && <SmartCalendarTab onOpenModal={handleOpenModal} />}
            {activeTab === 'Meal' && <MealPlannerTab onOpenModal={handleOpenModal} />}
            {activeTab === 'Grocery' && <GroceryInventoryTab onOpenModal={handleOpenModal} />}
            {activeTab === 'Events' && <FamilyEventsTab onOpenModal={handleOpenModal} />}
            {activeTab === 'Analytics' && <CalendarAnalyticsTab />}
          </>
        )}

        {/* Unified Modals */}
        <CalendarModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
      </div>
    </div>
  );
};
