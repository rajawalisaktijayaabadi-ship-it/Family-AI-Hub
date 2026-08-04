import React from 'react';
import { Sparkles, Crown, Bell } from 'lucide-react';

export type BadgeType = 'notification' | 'premium' | 'ai' | 'online' | 'offline' | 'default';

export interface BadgeProps {
  type?: BadgeType;
  count?: number;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  type = 'default',
  count,
  label,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
  };

  if (type === 'notification' && typeof count === 'number') {
    return (
      <span
        className={`inline-flex items-center justify-center font-bold rounded-full bg-rose-500 text-white ${sizeClasses[size]} ${className}`}
      >
        <Bell className="w-2.5 h-2.5 mr-0.5 inline" />
        {count > 99 ? '99+' : count}
      </span>
    );
  }

  if (type === 'premium') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-bold rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm ${sizeClasses[size]} ${className}`}
      >
        <Crown className="w-3 h-3 text-amber-200" />
        <span>{label || 'PRO'}</span>
      </span>
    );
  }

  if (type === 'ai') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-bold rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 shadow-sm ${sizeClasses[size]} ${className}`}
      >
        <Sparkles className="w-3 h-3" />
        <span>{label || 'AI Powered'}</span>
      </span>
    );
  }

  if (type === 'online') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 ${sizeClasses[size]} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>{label || 'Online'}</span>
      </span>
    );
  }

  if (type === 'offline') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 ${sizeClasses[size]} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span>{label || 'Offline Mode'}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 ${sizeClasses[size]} ${className}`}
    >
      {label}
    </span>
  );
};
