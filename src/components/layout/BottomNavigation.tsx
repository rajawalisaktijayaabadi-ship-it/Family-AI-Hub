import React from 'react';
import { Home, Bot, Smile, Brain, Baby, HeartPulse, Wallet, User } from 'lucide-react';
import { MainTab } from '../../types/navigation';

export interface BottomNavigationProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  notificationBadgeCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  notificationBadgeCount = 2,
}) => {
  const tabs: Array<{ id: MainTab; label: string; icon: React.ReactNode; badge?: number }> = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'finance', label: 'Keuangan', icon: <Wallet className="w-5 h-5" /> },
    { id: 'health', label: 'Health', icon: <HeartPulse className="w-5 h-5" /> },
    { id: 'parenting', label: 'Parenting', icon: <Baby className="w-5 h-5" /> },
    { id: 'ai', label: 'Family AI', icon: <Bot className="w-5 h-5" /> },
    { id: 'mood', label: 'Mood AI', icon: <Smile className="w-5 h-5" /> },
    { id: 'psychology', label: 'Psikologi', icon: <Brain className="w-5 h-5" /> },
    { id: 'profile', label: 'Profil', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-200/60 dark:border-slate-800/80 pb-safe transition-all">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all active-press touch-target ${
                isActive
                  ? 'text-blue-600 dark:text-teal-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              {/* Active Indicator Pillar */}
              {isActive && (
                <div className="absolute top-0 w-8 h-1 rounded-b-full bg-gradient-to-r from-blue-600 to-teal-400 shadow-sm" />
              )}

              <div className="relative">
                {tab.icon}
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] mt-1 tracking-tight leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
