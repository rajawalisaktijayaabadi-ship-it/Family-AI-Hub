import React from 'react';
import { Check, X } from 'lucide-react';

export type ChipVariant = 'status' | 'category' | 'filter' | 'selection';

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  selected?: boolean;
  statusType?: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  onSelect?: () => void;
  onRemove?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'category',
  selected = false,
  statusType = 'info',
  icon,
  onSelect,
  onRemove,
  className = '',
}) => {
  const statusStyles = {
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    error: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800',
  };

  const getVariantStyles = () => {
    if (variant === 'status') {
      return `border text-xs font-semibold ${statusStyles[statusType]}`;
    }

    if (selected) {
      return 'bg-blue-600 text-white border-blue-600 shadow-sm';
    }

    return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700';
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-medium transition active-press border select-none ${getVariantStyles()} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
      {selected && variant === 'selection' && <Check className="w-3.5 h-3.5" />}
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
        >
          <X className="w-3 h-3" />
        </span>
      )}
    </button>
  );
};
