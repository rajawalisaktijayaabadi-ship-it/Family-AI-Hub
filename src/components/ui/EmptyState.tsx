import React from 'react';
import { Inbox, WifiOff, SearchX, Clock, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export type EmptyStateType = 'noData' | 'noInternet' | 'noResult' | 'comingSoon';

export interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'noData',
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  const defaults: Record<
    EmptyStateType,
    { icon: React.ReactNode; defaultTitle: string; defaultDesc: string }
  > = {
    noData: {
      icon: <Inbox className="w-10 h-10 text-slate-400" />,
      defaultTitle: 'Belum Ada Data',
      defaultDesc: 'Data atau riwayat aktivitas belum tersedia saat ini.',
    },
    noInternet: {
      icon: <WifiOff className="w-10 h-10 text-amber-500" />,
      defaultTitle: 'Tidak Ada Koneksi Internet',
      defaultDesc: 'Periksa koneksi Anda. Fitur offline terbatas dapat tetap diakses.',
    },
    noResult: {
      icon: <SearchX className="w-10 h-10 text-slate-400" />,
      defaultTitle: 'Pencarian Tidak Ditemukan',
      defaultDesc: 'Coba gunakan kata kunci lain atau bersihkan filter pencarian.',
    },
    comingSoon: {
      icon: <Clock className="w-10 h-10 text-teal-500" />,
      defaultTitle: 'Segera Hadir',
      defaultDesc: 'Modul ini sedang dikembangkan untuk pengalaman yang lebih komprehensif.',
    },
  };

  const config = defaults[type];

  return (
    <div
      className={`glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-3 ${className}`}
    >
      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800">{config.icon}</div>
      <div className="space-y-1 max-w-xs">
        <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
          {title || config.defaultTitle}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {description || config.defaultDesc}
        </p>
      </div>
      {onAction && (
        <Button
          size="sm"
          variant="outline"
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          onClick={onAction}
          className="mt-2"
        >
          {actionText || 'Coba Lagi'}
        </Button>
      )}
    </div>
  );
};
