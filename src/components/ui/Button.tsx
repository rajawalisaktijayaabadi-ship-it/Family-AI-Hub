import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'gradient'
  | 'floating';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 active-press select-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 touch-target';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[38px]',
    md: 'px-4 py-2.5 text-sm gap-2 min-h-[48px]',
    lg: 'px-6 py-3.5 text-base gap-2.5 min-h-[56px]',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 dark:bg-blue-600 dark:hover:bg-blue-500',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
    outline:
      'border-2 border-slate-300 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800',
    ghost:
      'text-slate-700 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-800/80',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-500/20 dark:bg-rose-600 dark:hover:bg-rose-500',
    gradient:
      'bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 text-white shadow-lg shadow-blue-500/25 hover:opacity-95',
    floating:
      'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-xl shadow-teal-500/30 rounded-full hover:scale-105',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
