import React from 'react';
import {
  Smile,
  Sparkles,
  CalendarPlus,
  FilePlus,
  Wallet,
  Utensils,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { QuickActionModel } from '../../../types/dashboard';

interface QuickActionWidgetProps {
  quickActions: QuickActionModel[];
  onActionClick: (actionKey: string, title: string) => void;
}

const getActionIcon = (iconName: string) => {
  switch (iconName) {
    case 'Smile':
      return Smile;
    case 'Sparkles':
      return Sparkles;
    case 'CalendarPlus':
      return CalendarPlus;
    case 'FilePlus':
      return FilePlus;
    case 'Wallet':
      return Wallet;
    case 'Utensils':
      return Utensils;
    case 'ShieldAlert':
      return ShieldAlert;
    case 'Users':
    default:
      return Users;
  }
};

export const QuickActionWidget: React.FC<QuickActionWidgetProps> = ({
  quickActions,
  onActionClick,
}) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
      {quickActions.map((qa) => {
        const IconComponent = getActionIcon(qa.icon);
        const isEmergency = qa.category === 'emergency';

        return (
          <button
            key={qa.id}
            onClick={() => onActionClick(qa.actionKey, qa.title)}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all active:scale-95 text-center group"
          >
            <div
              className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${qa.gradient} text-white flex items-center justify-center shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform relative ${
                isEmergency ? 'animate-pulse' : ''
              }`}
            >
              <IconComponent className="w-5 h-5" />
              {qa.isPopular && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white dark:border-slate-900" />
              )}
            </div>
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 line-clamp-1 leading-tight">
              {qa.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};
