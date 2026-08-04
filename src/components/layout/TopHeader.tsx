import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { Sparkles, Smile, ShieldCheck } from 'lucide-react';

interface TopHeaderProps {
  onOpenAI: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenAI }) => {
  const { user } = useAuth();

  const familyName = user?.familyName || 'Keluarga Pratama';
  const displayName = user?.displayName || 'Ayah Pratama';
  const photoURL =
    user?.photoURL ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  const todayStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="px-4 pt-4 pb-3 sticky top-0 z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/60">
      <div className="flex items-center justify-between gap-3">
        {/* User & Family Avatar & Greeting */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={photoURL}
              alt={displayName}
              className="w-11 h-11 rounded-2xl object-cover ring-2 ring-blue-500/30 shadow-md"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold font-heading text-slate-900 dark:text-slate-100 leading-tight">
                {familyName}
              </h2>
              <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
              Halo, {displayName} 👋
            </p>
          </div>
        </div>

        {/* Quick AI Trigger Button */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white rounded-2xl shadow-md shadow-blue-500/20 active-press transition text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Tanya AI</span>
        </button>
      </div>

      {/* Sub Header Status Row */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/40 dark:border-slate-800/40">
        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
          <Smile className="w-3.5 h-3.5" />
          <span>Mood: Harmonis & Bahagia (94%)</span>
        </div>
        <span className="truncate">{todayStr}</span>
      </div>
    </header>
  );
};
