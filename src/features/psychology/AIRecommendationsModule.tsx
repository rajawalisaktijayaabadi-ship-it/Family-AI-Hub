import React, { useState } from 'react';
import { useMoodStore } from '../../stores/useMoodStore';
import { RecommendationCategory } from '../../types/psychology';
import { Sparkles, Activity, Moon, Users, Wind, Music, Clock } from 'lucide-react';

const CATEGORIES: (RecommendationCategory | 'Semua')[] = [
  'Semua',
  'Olahraga',
  'Istirahat',
  'Quality Time',
  'Meditasi',
  'Musik',
];

export const AIRecommendationsModule: React.FC = () => {
  const { getFilteredRecommendations } = useMoodStore();
  const [selectedCat, setSelectedCat] = useState<RecommendationCategory | 'Semua'>('Semua');

  const recs = getFilteredRecommendations(
    selectedCat === 'Semua' ? undefined : selectedCat
  );

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Olahraga':
        return <Activity className="w-4 h-4 text-emerald-500" />;
      case 'Istirahat':
        return <Moon className="w-4 h-4 text-purple-500" />;
      case 'Quality Time':
        return <Users className="w-4 h-4 text-amber-500" />;
      case 'Meditasi':
        return <Wind className="w-4 h-4 text-blue-500" />;
      case 'Musik':
        return <Music className="w-4 h-4 text-teal-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-2xl text-[11px] font-bold whitespace-nowrap transition ${
              selectedCat === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recommendation List */}
      <div className="space-y-2.5">
        {recs.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-2xs">
                  {getIcon(item.category)}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white font-heading mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </div>

              <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> {item.durationMinutes} Menit
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>

            <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] font-bold text-slate-400">
              <span>Rekomendasi untuk: {item.targetRole}</span>
              <span className="text-teal-600 dark:text-teal-400">Saran AI Family</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
