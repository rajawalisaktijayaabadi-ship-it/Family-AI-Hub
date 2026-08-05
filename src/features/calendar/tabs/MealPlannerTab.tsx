import React, { useState } from 'react';
import {
  Utensils,
  Plus,
  Clock,
  Flame,
  ChefHat,
  Filter,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { useCalendarStore } from '../../../stores/useCalendarStore';

interface MealPlannerTabProps {
  onOpenModal: (type: 'meal' | 'recipe') => void;
}

export const MealPlannerTab: React.FC<MealPlannerTabProps> = ({ onOpenModal }) => {
  const { mealPlans, recipes } = useCalendarStore();

  const [selectedRecipeFilter, setSelectedRecipeFilter] = useState<string>('All');
  const [activeSubTab, setActiveSubTab] = useState<'Jadwal Menu' | 'Koleksi Resep'>('Jadwal Menu');

  const filteredRecipes = recipes.filter((r) =>
    selectedRecipeFilter === 'All' ? true : r.category === selectedRecipeFilter
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Sub Tab Switcher & Add Actions */}
      <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['Jadwal Menu', 'Koleksi Resep'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeSubTab === tab
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {activeSubTab === 'Jadwal Menu' ? (
            <button
              onClick={() => onOpenModal('meal')}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>+ Plan Menu</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenModal('recipe')}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-teal-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>+ Resep Baru</span>
            </button>
          )}
        </div>
      </div>

      {activeSubTab === 'Jadwal Menu' ? (
        /* Meal Plan Timeline View */
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
            <Utensils className="w-4 h-4 text-emerald-500" />
            <span>Rencana Menu Makanan Mingguan ({mealPlans.length})</span>
          </h3>

          <div className="space-y-3">
            {mealPlans.map((mp) => (
              <div
                key={mp.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {mp.mealType}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{mp.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {mp.recipeName}
                  </h4>

                  <div className="flex items-center space-x-4 pt-1 text-xs text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>{mp.caloriesEstimate} kcal</span>
                    </span>
                    {mp.assignedMember && (
                      <span className="flex items-center space-x-1">
                        <ChefHat className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Koki: {mp.assignedMember}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Recipe Collection View */
        <div className="space-y-4">
          {/* Recipe Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {['All', 'Healthy Menu', 'Family Menu', 'Kids Menu', 'Budget Menu', 'Quick Meal'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedRecipeFilter(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition shrink-0 ${
                  selectedRecipeFilter === cat
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat === 'All' ? 'Semua Resep' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecipes.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                      {r.category}
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{r.durationMinutes} mnt</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>{r.calories} kcal</span>
                      </span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{r.name}</h4>

                  <div className="space-y-1 mb-3">
                    <p className="text-[11px] font-bold text-slate-500">Bahan Utama:</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{r.ingredients.join(', ')}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {r.steps.length} Langkah Memasak
                  </span>
                  <button
                    onClick={() => onOpenModal('meal')}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-lg text-xs font-bold transition"
                  >
                    + Masukkan Jadwal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
