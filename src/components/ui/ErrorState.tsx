import React from 'react';
import { AlertOctagon, Lock, Server, RefreshCw, WifiOff } from 'lucide-react';
import { Button } from './Button';

export type ErrorStateType = '404' | '500' | 'unauthorized' | 'offline' | 'general';

export interface ErrorStateProps {
  type?: ErrorStateType;
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  type = 'general',
  title,
  description,
  onRetry,
  className = '',
}) => {
  const defaults: Record<
    ErrorStateType,
    { icon: React.ReactNode; defaultTitle: string; defaultDesc: string }
  > = {
    '404': {
      icon: <AlertOctagon className="w-10 h-10 text-rose-500" />,
      defaultTitle: 'Halaman Tidak Ditemukan (404)',
      defaultDesc: 'Halaman yang Anda cari mungkin telah dipindahkan atau dihapus.',
    },
    '500': {
      icon: <Server className="w-10 h-10 text-rose-500" />,
      defaultTitle: 'Gangguan Server (500)',
      defaultDesc: 'Terjadi kendala pada sistem. Tim kami sedang menanganinya.',
    },
    unauthorized: {
      icon: <Lock className="w-10 h-10 text-amber-500" />,
      defaultTitle: 'Akses Ditolak',
      defaultDesc: 'Anda memerlukan izin atau login ulang untuk mengakses modul ini.',
    },
    offline: {
      icon: <WifiOff className="w-10 h-10 text-slate-400" />,
      defaultTitle: 'Mode Luring Aktif',
      defaultDesc: 'Fitur ini membutuhkan koneksi internet untuk melakukan sinkronisasi.',
    },
    general: {
      icon: <AlertOctagon className="w-10 h-10 text-rose-500" />,
      defaultTitle: 'Terjadi Kesalahan',
      defaultDesc: 'Mohon muat ulang aplikasi atau periksa kembali data Anda.',
    },
  };

  const config = defaults[type];

  return (
    <div
      className={`glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-3 ${className}`}
    >
      <div className="p-4 rounded-full bg-rose-50 dark:bg-rose-950/50">{config.icon}</div>
      <div className="space-y-1 max-w-xs">
        <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
          {title || config.defaultTitle}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {description || config.defaultDesc}
        </p>
      </div>
      {onRetry && (
        <Button
          size="sm"
          variant="danger"
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          onClick={onRetry}
          className="mt-2"
        >
          Muat Ulang
        </Button>
      )}
    </div>
  );
};
