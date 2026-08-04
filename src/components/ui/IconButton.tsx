import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  badgeCount?: number;
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  variant = 'secondary',
  badgeCount,
  ariaLabel,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800',
    ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
    glass: 'glass-panel text-slate-800 dark:text-slate-100 hover:bg-white/90 dark:hover:bg-slate-800/90 shadow-sm',
  };

  return (
    <button
      aria-label={ariaLabel}
      className={`relative inline-flex items-center justify-center rounded-2xl transition active-press focus:outline-none focus:ring-2 focus:ring-blue-500/50 touch-target ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon}
      {typeof badgeCount === 'number' && badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      )}
    </button>
  );
};
