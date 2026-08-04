import React from 'react';
import { Sparkles, Bell, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../providers/AuthProvider';

export interface TopAppBarProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onOpenAI?: () => void;
  onOpenNotifications?: () => void;
  onOpenShowcase?: () => void;
  unreadCount?: number;
  showAIButton?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title = 'FamilyAI Hub',
  subtitle,
  onBack,
  onOpenAI,
  onOpenNotifications,
  onOpenShowcase,
  unreadCount = 2,
  showAIButton = true,
}) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-200/50 dark:border-slate-800/80 px-4 py-3 pt-safe transition-all">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Left: Back button or Logo */}
        <div className="flex items-center gap-2.5">
          {onBack ? (
            <IconButton
              icon={<ArrowLeft className="w-5 h-5" />}
              size="sm"
              variant="secondary"
              onClick={onBack}
              ariaLabel="Kembali"
            />
          ) : (
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold font-heading text-slate-900 dark:text-white leading-tight">
                {title}
              </h1>
              {!onBack && <Badge type="premium" size="sm" label="PRO" />}
            </div>
            {subtitle ? (
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{subtitle}</p>
            ) : !onBack && user ? (
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Halo, <span className="font-semibold text-teal-600 dark:text-teal-400">{user.displayName}</span> 👋
              </p>
            ) : null}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {onOpenShowcase && (
            <IconButton
              icon={<SlidersHorizontal className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
              size="sm"
              variant="ghost"
              onClick={onOpenShowcase}
              ariaLabel="Design System Showcase"
            />
          )}

          {showAIButton && onOpenAI && (
            <button
              onClick={onOpenAI}
              className="p-2 rounded-2xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 flex items-center gap-1 text-xs font-bold transition active-press"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI</span>
            </button>
          )}

          {onOpenNotifications && (
            <IconButton
              icon={<Bell className="w-4 h-4" />}
              size="sm"
              variant="ghost"
              badgeCount={unreadCount}
              onClick={onOpenNotifications}
              ariaLabel="Notifikasi"
            />
          )}
        </div>
      </div>
    </header>
  );
};
