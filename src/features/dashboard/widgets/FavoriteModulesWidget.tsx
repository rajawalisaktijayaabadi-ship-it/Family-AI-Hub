import React from 'react';
import { FavoriteModuleModel } from '../../../types/dashboard';
import {
  Smile,
  Activity,
  Wallet,
  GraduationCap,
  Utensils,
  Calendar,
  Pin,
  PinOff,
  ChevronRight,
} from 'lucide-react';

interface FavoriteModulesWidgetProps {
  modules: FavoriteModuleModel[];
  onTogglePin: (id: string) => void;
  onNavigateModule?: (route: string) => void;
}

const getModuleIcon = (iconName: string) => {
  switch (iconName) {
    case 'Smile':
      return Smile;
    case 'Activity':
      return Activity;
    case 'Wallet':
      return Wallet;
    case 'GraduationCap':
      return GraduationCap;
    case 'Utensils':
      return Utensils;
    case 'Calendar':
    default:
      return Calendar;
  }
};

export const FavoriteModulesWidget: React.FC<FavoriteModulesWidgetProps> = ({
  modules,
  onTogglePin,
  onNavigateModule,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
          Modul Tersemat (Favorite Modules)
        </span>
        <span className="text-[10px] text-slate-400 font-semibold">
          Klik pin untuk ubah posisi
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {modules.map((mod) => {
          const Icon = getModuleIcon(mod.icon);

          return (
            <div
              key={mod.id}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                mod.isPinned
                  ? 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-800 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-70'
              }`}
            >
              <button
                onClick={() => onNavigateModule?.(mod.route)}
                className="flex items-center gap-2.5 min-w-0 text-left flex-1"
              >
                <div className={`p-2 rounded-xl border ${mod.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {mod.title}
                </span>
              </button>

              <button
                onClick={() => onTogglePin(mod.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  mod.isPinned
                    ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title={mod.isPinned ? 'Lepas Sematan' : 'Sematkan Modul'}
              >
                {mod.isPinned ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
